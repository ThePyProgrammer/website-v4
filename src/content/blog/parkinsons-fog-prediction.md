---
title: "A Picture Is Worth A Thousand Steps: Predicting Freezing of Gait in Parkinson's Disease Patients"
date: "2023-12-09"
tags: [ai, healthcare, research, computer-vision]
category: research
excerpt: "How we went from signal processing to CNNs to predict Freezing of Gait in Parkinson's patients, winning Gold at SSEF (twice.) and 1st Place at ISSF along the way."
coverImage: "/img/research/parkinsons-nush.jpg"
splash: true
splashPosition: "15%"
---

## How it started

This project started in 2020, when I was in my third year at NUS High. Through the [Science Mentorship Programme (SMP)](https://sites.google.com/site/scimphome/about-smp), our team was paired with [Prof Arthur Tay](https://cde.nus.edu.sg/ece/staff/arthur-tay/) from the NUS ECE Department to work on predicting Freezing of Gait (FoG) in Parkinson's Disease patients.

FoG is a debilitating symptom where patients suddenly feel as if their feet are glued to the ground, often mid-stride. It's one of the leading causes of falls in Parkinson's patients, and being able to predict it in real-time could genuinely save lives. We started by looking at existing work from [Moore et al](https://www.sciencedirect.com/science/article/abs/pii/S0165027007004281) and [Bachlin et al](https://ieeexplore.ieee.org/document/5325884), and used the publicly available [DaphNET dataset](https://archive.ics.uci.edu/dataset/245/daphnet+freezing+of+gait) of accelerometer readings from patients experiencing FoG episodes.

## Phase 1: SVMs and the Freeze Index

Our first approach used the Moore-Bachlin Algorithm, which computes a "Freeze Index" from the power spectral density of accelerometer signals. The idea is simple: during a freeze episode, the frequency profile of a patient's leg movement shifts in a measurable way.

Where we differed from the original work was in the classification step. Instead of setting a fixed threshold on the freeze index (which is fragile and patient-dependent), we trained a Support Vector Machine (SVM) to learn the decision boundary in 3D freeze-index space. This turned out to work pretty well.

We then deployed the best-performing SVM model onto an Arduino Nano 33 BLE Board, using its onboard accelerometers for real-time inference. The idea was a wearable device that could alert patients or caregivers when a freeze was about to happen.

## Building a mobile app

In parallel, as part of the CS4131 Mobile Application Development module at NUS High, I built an Android app in Kotlin to interface with the Arduino sensor via Bluetooth. The app stored logs in Firebase Cloud Firestore and could trigger emergency alerts if a fall was detected. We kept developing this prototype well beyond the module.

## The competition circuit

We submitted the SVM-based system to a number of research fairs:

- **SSEF 2021**: Gold Award
- **HCI International Science Youth Forum (ISYF) 2021**: 2nd Place for Poster Presentation
- **Global Youth Science and Technology Bowl (GYSTB) 2021** in Hong Kong: Third Prize (we couldn't attend physically due to COVID, but still presented remotely)

We also presented at the [IRC Conference on Science, Engineering and Technology (IRC-SET) 2021](https://ircset.org/main/conference-2021/), where we won the Best Presenters' Award. Our paper was [published in Springer Nature](https://link.springer.com/chapter/10.1007/978-981-16-9869-9_21) as a chapter in the conference proceedings.

![Representing SG at GYSTB 2021](/img/research/parkinsons-gystb.jpeg)

## Phase 2: rethinking the approach

About a year later, we came back to the project wanting to push further. The SVM approach worked, but we'd only scratched the surface. Could we do better than the Moore-Bachlin freeze index entirely?

We experimented with a few things that didn't pan out: Google Cloud's AutoML service couldn't really handle the data well, and traditional ML algorithms (tested via cuml) didn't reveal much beyond what the freeze index already captured.

## The CNN breakthrough

Then we had an idea: what if we mapped the raw accelerometer data into a 16x16 image and used a convolutional neural network to classify it directly?

![Project overview diagram](/img/research/parkinsons-cover.jpg)

Instead of computing the freeze index first and then classifying, we let the CNN learn its own features from the raw signal, represented as a small image. The results were dramatic: the CNN classified freeze vs. non-freeze episodes with near-perfect accuracy, vastly outperforming the SVM approach. It turns out CNNs are remarkably effective for this kind of signal processing task, even at tiny resolutions.

We deployed this CNN into the mobile app as well, so the full pipeline went from wearable sensor to Bluetooth to on-device inference.

## The results

We submitted [the full body of work](/papers/parkinsons.pdf) to SSEF 2023, where we won:

- **Gold Award** (our second Gold at SSEF for this project)
- **SUTD Research and Innovation Award in Healthcare**

We were then selected to present at the [International Student Science Fair (ISSF) 2023](https://issf2023.com/) in Brisbane, where we won **1st Place in the Computing & Mathematics category**.

![Representing NUSH at ISSF 2023](/img/research/parkinsons-nush.jpg)

## What I took away

This project spanned nearly four years of my time at NUS High, and it shaped how I think about research. A few things I learned:

- Start simple. The SVM approach gave us something concrete to build on and compete with while we figured out the harder problems.
- The right representation matters more than the right model. Mapping accelerometer data to images unlocked CNN-level performance that no amount of hyperparameter tuning on the raw signal could match.
- Research at the intersection of tech and healthcare is deeply rewarding. Knowing that the work could eventually help real patients made the late nights worth it.

I'm grateful to my two teammates who stuck with this project through all its iterations, and to Prof Tay for his guidance throughout.
