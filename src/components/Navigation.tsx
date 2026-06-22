import { Button } from "@/components/ui/button";
import { Menu, X, FileText, Download } from "lucide-react";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
    setIsOpen(false);
    setActiveSection(sectionId);
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 sm:pt-6 px-4 pointer-events-none">
      {/* Pill-shaped navbar */}
      <div className={`pointer-events-auto transition-all duration-500 ${
        isScrolled 
          ? 'glass-card shadow-lg' 
          : 'bg-background-secondary/80 backdrop-blur-md'
      } rounded-full px-2 sm:px-4`}>
        <div className="flex items-center justify-center h-12 sm:h-14">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 lg:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'text-primary bg-primary/10' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* CV Split Button */}
            <div className="flex items-center ml-2 border-l border-white/10 pl-2">
              <a 
                href={`${import.meta.env.BASE_URL}uploads/Ziad_ELkholy_CV.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-l-full text-sm font-medium transition-all duration-300 text-primary bg-primary/10 hover:bg-primary/20"
              >
                <FileText className="w-4 h-4" />
                CV
              </a>
              <a 
                href={`${import.meta.env.BASE_URL}uploads/Ziad_ELkholy_CV.pdf`}
                download
                className="flex items-center justify-center px-3 py-2 rounded-r-full transition-all duration-300 text-primary bg-primary/10 hover:bg-primary/20 border-l border-primary/20"
                title="Download CV"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white/80 hover:text-white transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute inset-x-4 top-20 glass-card rounded-2xl shadow-xl animate-fade-in pointer-events-auto">
          <div className="py-4 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'text-primary bg-primary/10' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile CV Button */}
            <div className="px-4 py-3 flex gap-2">
              <a 
                href={`${import.meta.env.BASE_URL}uploads/Ziad_ELkholy_CV.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 text-primary bg-primary/10 hover:bg-primary/20"
              >
                <FileText className="w-4 h-4" />
                View CV
              </a>
              <a 
                href={`${import.meta.env.BASE_URL}uploads/Ziad_ELkholy_CV.pdf`}
                download
                className="flex items-center justify-center px-4 py-2 rounded-full transition-all duration-300 text-primary bg-primary/10 hover:bg-primary/20"
                title="Download CV"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>

            <div className="px-4 pt-2">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="w-full bg-primary hover:bg-primary-glow text-primary-foreground rounded-full"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
