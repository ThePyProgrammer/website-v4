import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import { ReactTyped } from "react-typed";
// import cernUrl from "../../assets/img/cern.jpg";

export function Hero() {

  return (
    <section className="relative min-h-screen w-full">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-right bg-no-repeat"
        style={{
          backgroundImage: `url(/img/cern.jpg)`,
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Hero Content */}
      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-left justify-center px-4 md:px-12 text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
            My name is{' '}
            <span className="bg-clip-text">
              Prannaya Gupta
            </span>
          </h1>
          <p className="mb-8 text-3xl tracking-tight text-muted-foreground" id="hero-subtitle">
            I'm a <ReactTyped strings={["Student", "Developer", "Engineer", "Researcher"]} typeSpeed={100} backSpeed={50} backDelay={2000} loop />
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-8"
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}