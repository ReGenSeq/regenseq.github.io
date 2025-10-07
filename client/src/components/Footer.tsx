import { Github, ExternalLink } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setOffset(rect.top);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = offset < 0 ? Math.abs(offset) * 0.15 : 0;

  return (
    <footer 
      ref={sectionRef}
      className="border-t border-border snap-start snap-always h-screen flex items-center overflow-hidden"
    >
      <div 
        className="max-w-7xl mx-auto px-4 md:px-8 py-12 w-full"
        style={{
          transform: `translateY(${-parallaxOffset}px)`,
        }}
      >
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">RegenSeq</h3>
            <p className="text-sm text-muted-foreground">
              Open source ecosystem for repurposing DNA sequencers as automation platforms 
              for spatial biology research.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://github.com/nygctech/PySeq2500" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                  data-testid="link-footer-github"
                >
                  GitHub Repository <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.nature.com/articles/s41598-022-08740-w" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                  data-testid="link-footer-paper"
                >
                  Scientific Paper <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/nygctech/PySeq2500#readme" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                  data-testid="link-footer-docs"
                >
                  Documentation <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Developed at the Technology Innovation Laboratory, New York Genome Center (NYGC)
            </p>
            <p className="text-sm text-muted-foreground">
              Funded by NSF POSE Phase 1 Award
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RegenSeq Open Source Community. Open source under permissive license.
          </p>
          <a 
            href="https://github.com/nygctech/PySeq2500" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
            data-testid="link-footer-github-icon"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
