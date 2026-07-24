import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Features", href: "/#features" },
  { label: "Team", href: "/#team" },
  { label: "Resources", href: "/#resources" },
  { label: "Papers", href: "/#papers" },
  { label: "Community", href: "/#community" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = (e?: Event) => {
      const scrollContainer = document.querySelector('[class*="overflow-y-scroll"]') as HTMLElement;
      const scrollY = scrollContainer?.scrollTop || window.scrollY;
      setIsScrolled(scrollY > 20);
    };
    
    // Listen to both window and container scroll events
    const scrollContainer = document.querySelector('[class*="overflow-y-scroll"]');
    window.addEventListener("scroll", handleScroll);
    scrollContainer?.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.querySelector('[class*="overflow-y-scroll"]') as HTMLElement;
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    // Extract the hash portion (e.g. "/#about" → "#about")
    const hash = href.includes("#") ? "#" + href.split("#")[1] : href;
    const sectionId = hash.slice(1); // strip leading #

    const scrollToSection = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    if (!scrollToSection()) {
      // Section not on this page — navigate to homepage first, then scroll
      navigate("/");
      // Poll until the element appears in the DOM after the route change
      let attempts = 0;
      const interval = setInterval(() => {
        if (scrollToSection() || ++attempts >= 20) {
          clearInterval(interval);
        }
      }, 50);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        isScrolled ? "bg-white dark:bg-slate-950 backdrop-blur-sm border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="font-bold text-xl text-foreground hover-elevate px-2 py-1 rounded-lg"
              data-testid="button-logo"
            >
              RegenSeq
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                  data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
