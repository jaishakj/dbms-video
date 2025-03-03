
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Button from './Button';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Listen for scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-foreground">
            CleverClip
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#process" className="text-foreground/80 hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#upload" className="text-foreground/80 hover:text-foreground transition-colors">
            Try It
          </a>
          <Button variant="primary">
            Get Started
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation Drawer */}
      <div 
        className={cn(
          'fixed inset-0 bg-white z-40 transform transition-transform duration-300 md:hidden pt-20',
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col items-center space-y-8 p-8">
          <a 
            href="#features" 
            className="text-lg font-medium text-foreground/80 hover:text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#process" 
            className="text-lg font-medium text-foreground/80 hover:text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            How It Works
          </a>
          <a 
            href="#upload" 
            className="text-lg font-medium text-foreground/80 hover:text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            Try It
          </a>
          <Button variant="primary" onClick={() => setMenuOpen(false)}>
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
