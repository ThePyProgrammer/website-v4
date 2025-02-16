import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="#" className="text-xl font-bold">
          ThePyProgrammer
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <NavLinks />
        </div>

        {/* Mobile Menu Button */}
        {/* <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button> */}
      </div>

      {/* Mobile Menu */}
      {/* {isMobileMenuOpen && (
        <div className="absolute w-full bg-background/95 backdrop-blur-md md:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <NavLinks />
            </div>
          </div>
        </div>
      )} */}
    </nav>
  );
}

function NavLinks() {
  return (
    <>
      {/* <a href="/blog" className="text-muted-foreground hover:text-foreground">
        Blog
      </a>
      <a href="/projects" className="text-muted-foreground hover:text-foreground">
        Projects
      </a> */}
      {/* <Button variant="default" size="sm">
        Resume
      </Button> */}
    </>
  );
}