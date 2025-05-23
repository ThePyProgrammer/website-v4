import { ThemeProvider } from '@/components/ThemeProvider';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
// import { Contact } from '@/components/Contact';
import { Clubs } from '@/components/Clubs';
import { Navigation } from '@/components/Navigation';
import { Experience } from './components/Experience';
import { Research } from './components/Research';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navigation />
      <main className="bg-background text-foreground w-screen">
        <Hero />
        <About />
        <Experience />
        <Research />
        <Projects />
        <Clubs />
        {/* <Contact /> */}
      </main>
    </ThemeProvider>
  );
}

export default App;