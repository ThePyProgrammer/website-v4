import { ThemeProvider } from '@/components/ThemeProvider';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
// import { Contact } from '@/components/Contact';
import { Navigation } from '@/components/Navigation';
import { Experience } from './components/Experience';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navigation />
      <main className="bg-background text-foreground">
        <Hero />
        <About />
        <Experience />
        {/* <Projects /> */}
        {/* <Contact /> */}
      </main>
    </ThemeProvider>
  );
}

export default App;