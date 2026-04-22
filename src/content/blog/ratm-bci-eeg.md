---
title: "Rage Against The Machine: Teaching a $250 Headband to Read Your Mind for Pong"
date: "2026-02-28"
tags: [ai, healthcare, hackathon]
category: ai
excerpt: "How I spent 12 hours trying to decode motor imagery from a consumer EEG headset, why a 12-layer transformer lost to a tiny CNN, and what 65% accuracy actually feels like when you're playing Pong with your brain."
coverImage: "/img/blog/ratm-codex/presentation.jpeg"
splash: true
splashPosition: "50%"
wip: true
---

Imagine playing Pong with just your brain.

That's the herculean task my team picked up during the [OpenAI Codex Hackathon Singapore 2026](https://luma.com/fbhtrppu?tk=3UI0NL), building a brain-computer interface powered by an old [Muse headband](https://choosemuse.com/) and an AI model that barely worked.

You simply put on the headband, imagine moving your left or right hand, and a paddle automatically moves on the screen. No keyboard. No controller. Literally just the electrical activity leaking from your motor cortex through your skull, picked up by four electrodes pressed against your forehead and behind your ears.

I worked on the ML side, paired with Codex as my coding partner for the day. Here's a post-mortem of everything I built in that 12 hour period, including the slow exploration across different model architectures in search for the optimal model for EEG motor imagery classification. (Spoiler Alert: We didn't find one.)

## The signal we were working with

As part of this hackathon, I borrowed an old Muse 1 headband from [Dr Aung Aung Phyo Wai](https://scholar.google.com.sg/citations?user=MdrjFJEAAAAJ&hl=en). This headband is so old that it's not even listed on the company's website, but what we gathered from the limited documentation is this: the headband gives us four channels of EEG at about 250 Hz. For reference, a clinical EEG setup uses 64 or 128 channels. We just had four:

```muse-placement
``` The signal is measured in microvolts, buried under eye blinks, jaw clenches, and the 50 Hz hum from every power outlet in the room.

The useful information lives in the 8-30 Hz band, spanning the alpha and beta rhythms. When you imagine moving your left hand, the beta power over your right motor cortex drops briefly. This is called event-related desynchronisation (ERD), and it's the entire physiological basis for motor imagery BCIs. You're trying to detect a subtle power dip in a specific frequency band, on the wrong side of the head, through four electrodes that aren't even over motor cortex.

I want to be clear about this because it sets the ceiling for everything that follows. We are not working with clean data. We are not working with many channels. We are working with a $250 consumer headband and the faintest neural signature that exists.

## Starting point: PhysioNet and EEGNet

We needed a baseline before touching the Muse. Our starting point was [NeuralFlight](https://github.com/dronefreak/NeuralFlight), an open-source BCI project that already had a working motor imagery pipeline: the [PhysioNet MMIDB](https://physionet.org/content/eegmmidb/1.0.0/) dataset and an [EEGNet](https://arxiv.org/abs/1611.08024) classifier. We inherited both. Here's what we were working with:

```dataset-profile
```

You can see that the channels differ quite heavily, but lucky for us, there was overlap!

Codex quickly remapped the channels to pull out solely the four Muse-compatible positions from the full montage, throwing away 60 channels of perfectly good data so that the model could learn how to classify with the limited electrode geometry it would see at inference time. No point training on motor cortex electrodes we don't have.

Codex implemented the training loop and bandpass filtering pipeline:

```training-run
```

Not spectacular, but meaningfully above the 50% chance line. This was the floor.

## The ambitious detour: LaBraM

With a baseline in hand, I did what any self-respecting ML person at a hackathon would totally do: I reached for the biggest model I could find.

The idea was straightforward: if language models can transfer across tasks, maybe brain models could too.

```model-comparison
```

Well, turns out it couldn't. Click through the three attempts Codex came up and built entirely from scratch:

```labram-attempts
```

### Why did this fail?

I spent time diagnosing this properly rather than just moving on, because the failure mode is instructive. Codex helped with the formal analysis here, running the PCA/t-SNE projections and computing the diagnostic metrics that made the failure legible.

**Token budget.** LaBraM tokenises EEG into patches of 200 samples. A 3-second epoch at 160 Hz is 601 samples, giving $\lfloor 601/200 \rfloor = 3$ patches per channel. Three tokens. Even with the long-context resampling to 1600 samples, you only get 8 patches. For reference, a typical language model sees hundreds of tokens per input. The model simply didn't have enough resolution to work with.

**Embedding geometry.** I ran PCA and t-SNE on the LaBraM embeddings from the frozen encoder. The explained variance in 2D was [0.19, 0.11], and the Silhouette score was 0.01. For context, a Silhouette score ranges from -1 to 1, and 0.01 means the classes are completely overlapping in the learned representation space. There is no decision boundary to find.

<img src="/img/blog/ratm-codex/pca_tsne_labram.png" alt="PCA and t-SNE projections of LaBraM embeddings showing complete class overlap" style="width:100%;margin:1rem 0" />

**Distribution shift.** LaBraM was pre-trained on different EEG datasets, different tasks, different electrode montages. The features it learned were not the features we needed. And with only 4 channels, there wasn't enough signal to steer the 12-layer transformer toward motor imagery representations.

Codex and I wrote this up with formal propositions in our research paper. Proposition 2 proves that under class collapse, the maximum achievable accuracy is bounded by the majority class prior: $\max_j \pi_j = 450/900 = 0.5$. Proposition 4 bounds the token count as $P = \min(\lfloor SL/T \rfloor, 16)$. These aren't deep results, but writing them down made it impossible to hand-wave past the failure.

The conclusion was unambiguous: **LaBraM transfer did not reliably surpass the compact EEGNet baseline.** A 130 KB CNN beat a pre-trained transformer. Sometimes the right model is the small one.

## The real win: personalisation

Cross-subject models are hard because everyone's brain is different. The spatial layout of motor cortex varies, skull thickness varies, electrode contact varies, and the subjective experience of "imagining moving your left hand" varies enormously between people. A model trained on subjects 1-40 is trying to learn a universal motor imagery signature, but that signature might not be very universal at all.

The fix was obvious in hindsight: collect a few minutes of calibration data from the actual user wearing the actual headband, and fine-tune.

We recorded six calibration sessions on the Muse: three left hand, three right hand. Each session was a continuous recording where the user sat still and imagined the movement. Codex wrote the entire fine-tuning pipeline: CSV ingestion, windowing into 3-second non-overlapping epochs, resampling from the Muse's native ~250 Hz down to 160 Hz, the stratified splitting logic, automatic checkpoint format detection (inferring EEGNet vs EEGNetResidual from the saved state dict keys), and the ablation sweep harness. I pointed it at the problem and it built the tooling.

Total data: 247 epochs. That's about 12 minutes of calibration. Not a lot.

### The ablation sweep

With so little data, every design choice mattered. I ran a systematic sweep:

| Configuration | Val Accuracy | What it tested |
|---|---|---|
| Random train/val split | 57.14% | Baseline fine-tuning |
| **Stratified split, no overlap** | **65.31%** | Proper evaluation |
| Stratified + freeze early layers | 63.27% | Whether pre-trained features help |
| Stratified + overlapping windows | 62.24% | Data augmentation via overlap |
| Stratified + class-weighted loss | 60.20% | Handling class imbalance |

Every intuition from standard deep learning was wrong here:

**Freezing early layers hurt.** In transfer learning, you typically freeze the pre-trained feature extractor and only train the head. Here, unfreezing everything was better. The pre-trained features were learned on 40 other people's brains. This user's brain is different enough that even the low-level temporal filters needed to adapt.

**Overlapping windows hurt.** Sliding windows with 50% overlap doubled the dataset from 247 to 490 epochs, which should help with a data-scarce regime. Instead, it made things worse. The overlapping windows from the same continuous recording share signal, so a model can "cheat" by memorising recording-specific noise patterns that leak between train and val.

**Class-weighted loss hurt.** The classes were already roughly balanced (left and right imagery), so the weighting added noise without solving a real problem.

**Stratified splitting was the single biggest win.** A random 80/20 split can accidentally put all of one class in training. Stratifying by class label ensured both left and right imagery were represented in validation. This alone jumped accuracy from 57.14% to 65.31%.

The best configuration: no overlap, no freezing, no class weighting, stratified split, learning rate 1e-4, standard cross-entropy. The simplest possible fine-tuning setup. The 65.31% was achieved at epoch 63 of 247 max epochs.

For deployment, I retrained on all 247 epochs with the best hyperparameters (no validation holdout) and saved that as the final checkpoint.

Here's the full progression. Click any row to see the config and verdict:

```results-ladder
```

## Active motor tuning: the frontier

The calibration approach had a flaw. During calibration, the user sits still and imagines movement. During gameplay, they're engaged, stressed, reacting to a ball flying across the screen. The EEG signatures are different.

So Codex wrote a script that captured EEG during actual Pong gameplay, which I designed around a key insight: when a player presses a key, the motor preparation signal in their brain starts 50-650 ms *before* the keypress. The script labelled these "intent windows" by working backwards from each timestamped keypress event, with grouped stratification to keep windows from the same keypress together.

```py
# For each keypress at time t, extract windows at:
# t - 650ms, t - 550ms, ..., t - 50ms (intent phase)
# optionally t + 0ms (motor execution phase)
for offset in range(50, 650, 100):
    window_end = onset_sample - int(offset * fs / 1000)
    window_start = window_end - window_length
```

This was more ecologically valid but harder to work with. Same-timestamp collisions (user pressing left and right simultaneously), ambiguous rest periods, and the need for grouped stratification (windows from the same keypress must stay together in either train or val, never split across both).

We got this running but didn't have time to fully evaluate it. The active motor checkpoints exist in the repo, and the pipeline works, but I'd want a proper evaluation protocol before quoting numbers. Hackathon time pressure meant we shipped the calibration-tuned model for the demo.

## How it all plugs together

The ML model is one piece of a real-time pipeline:

1. **Muse headband** streams 4 channels at ~250 Hz over Bluetooth
2. **Backend** buffers 250 samples (1 second of data), resamples to 160 Hz, applies bandpass filter
3. **EEGNet** classifies the window as left or right imagery in under 5 ms
4. **WebSocket** pushes the prediction to the frontend
5. **Pong** moves the paddle, with hysteresis filtering to reduce jitter from noisy predictions

On top of this, we built an adaptive AI opponent that monitors the player's "stress" (computed from EEG signal variance) and adjusts difficulty accordingly. When stress spikes, the AI gets easier. It also generates personality-driven taunts via OpenAI that play as synthesised speech. The AI trash-talks you while you try to control a game with your thoughts. Hence: Rage Against The Machine.

## What 65% accuracy actually feels like

65% sounds bad. In a machine learning paper, you wouldn't publish it. But this isn't a paper. This is a game.

Every second, the model makes a prediction. 65% of the time, the paddle moves the way you're thinking. 35% of the time, it doesn't. The experience is like driving on ice. You have influence but not control. You're constantly compensating, adjusting the intensity of your imagery, trying to think harder about your left hand. And then the paddle moves left and you feel a genuine jolt of "it worked".

This is, in a weird way, the right difficulty. If accuracy were 95%, it would just be Pong with extra steps. At 65%, the BCI itself is the game. You're playing against the machine in two ways: the AI opponent on screen, and the decoder in the headband that you're trying to train to understand you.

We could have faked higher accuracy. A hidden keyboard fallback, a wider paddle, slower ball. We didn't. The demo was honest. Sometimes the paddle went the wrong way. The judges could see it. And they could see the player learning to control it anyway.

## The meta-lesson

I went into this hackathon thinking that foundation model transfer was the move. Pre-trained on lots of EEG data, fine-tune on our task, done. Instead, I spent a good chunk of those 12 hours proving to myself that a 12-layer transformer with 200-dimensional embeddings couldn't beat a CNN that fits in 130 KB.

The reason is specific to the domain. EEG motor imagery is:

- **Low-channel**: 4 electrodes, not 64. The spatial resolution is so poor that attention mechanisms have almost nothing to attend over.
- **Low-token**: At 200 samples per patch, a 3-second epoch produces 3 tokens. Transformers need sequence length to shine.
- **High-variance across subjects**: The same imagined action looks different in every brain. Pre-training on other brains doesn't help as much as you'd expect.
- **Low-SNR**: The signal-to-noise ratio is abysmal. The model needs aggressive priors (like EEGNet's hardcoded temporal-spatial-separable decomposition) rather than the flexibility to learn arbitrary attention patterns.

The compact CNN worked because it encoded the right inductive biases: temporal filtering at the right frequency resolution, spatial filtering across the small number of channels, and not much else. It didn't have the capacity to overfit on 247 calibration epochs. It didn't need thousands of tokens to work. It just needed the user to sit still for 12 minutes and imagine moving their hands.

Sometimes the right model is the one that can't learn anything except the thing you want it to learn.

## Credits

I'd like to thank `@panshul`, `@chuping` and `@jiajie` for roping me in last minute to their hackathon team. Before this hackathon, I was really hesitant to start using agentic coding tools like Codex or Claude Code, and I think building AI with Codex showed me just how powerful these tools have become. Codex wrote nearly all the ML code: the model architectures, the training loops, the fine-tuning pipelines, the diagnostic tooling and even the full research papers!

In addition, thank you so much to Gabriel Chua, 65 Labs and the rest of the Codex Hackathon Team for organising such a fun event. The food was very nice 😋. A large part of the credit also goes to the open source foundations built in [`dronefreak/NeuralFlight`](https://github.com/dronefreak/NeuralFlight), and `@enjia` for building an amazing system in [Thonk](https://github.com/aether-raid/thonk) during her time at AETHER.

The codebase is open sourced at [`ThePyProgrammer/RageAgainstTheMachine`](https://github.com/ThePyProgrammer/RageAgainstTheMachine).

Here's the final product video that we put together:

<div style="position:relative;width:100%;padding-bottom:75%;margin:1.5rem 0">
<iframe src="https://drive.google.com/file/d/1J-riHC9NfRaA8wP0i1BCO3__e0ejagWs/preview" width="100%" height="100%" style="position:absolute;top:0;left:0;border:none" allow="autoplay"></iframe>
</div>
