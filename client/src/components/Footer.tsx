import { Github, ExternalLink, Linkedin, MessageSquare, Star, GitFork, Facebook } from "lucide-react";
import { SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function Footer() {
  const [githubStats, setGithubStats] = useState<{ stars: number; forks: number } | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/nygctech/PySeq2500')
      .then(res => res.json())
      .then(data => {
        setGithubStats({
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0
        });
      })
      .catch(() => {
        setGithubStats(null);
      });
  }, []);

  const shareUrl = 'https://regenseq.github.io/';
  const shareUrlEncoded = encodeURIComponent(shareUrl);
  const shareText = encodeURIComponent('Check out RegenSeq - repurposing DNA sequencers for spatial biology research!');

  return (
    <footer 
      className="border-t border-border min-h-screen md:h-screen flex items-center overflow-y-auto md:overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-12 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">RegenSeq</h3>
            <p className="text-sm text-muted-foreground">
              Open source ecosystem for repurposing DNA sequencers as automation platforms 
              for spatial biology research.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Resources</h3>
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
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">About</h3>
            <p className="text-sm text-muted-foreground mb-2 sm:mb-3">
              Developed at the Technology Innovation Laboratory, New York Genome Center (NYGC)
            </p>
            <p className="text-sm text-muted-foreground">
              Funded by NSF POSE Phase 1 Award
            </p>
          </div>
        </div>
        
        <div className="pt-6 sm:pt-8 border-t border-border">
          <div className="flex flex-wrap gap-2 justify-center items-center mb-6">
            {githubStats && (
              <>
                <a
                  href="https://github.com/nygctech/PySeq2500/stargazers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50 hover:bg-muted text-sm hover-elevate"
                  data-testid="link-github-stars"
                >
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-semibold">{githubStats.stars}</span>
                  <span className="text-muted-foreground">stars</span>
                </a>
                <a
                  href="https://github.com/nygctech/PySeq2500/network/members"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50 hover:bg-muted text-sm hover-elevate"
                  data-testid="link-github-forks"
                >
                  <GitFork className="h-4 w-4 text-primary" />
                  <span className="font-semibold">{githubStats.forks}</span>
                  <span className="text-muted-foreground">forks</span>
                </a>
                <div className="hidden sm:block w-px h-8 bg-border mx-1"></div>
              </>
            )}
            <span className="hidden sm:inline text-sm font-medium text-muted-foreground mr-1">Share on:</span>
            <Button
              size="sm"
              variant="outline"
              className="gap-1 sm:gap-2"
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrlEncoded}`, '_blank')}
              data-testid="button-share-x"
            >
              <SiX className="h-4 w-4" />
              <span className="hidden sm:inline">X</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1 sm:gap-2"
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrlEncoded}`, '_blank')}
              data-testid="button-share-linkedin"
            >
              <Linkedin className="h-4 w-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1 sm:gap-2"
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrlEncoded}`, '_blank')}
              data-testid="button-share-facebook"
            >
              <Facebook className="h-4 w-4" />
              <span className="hidden sm:inline">Facebook</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1 sm:gap-2"
              onClick={() => window.open(`https://reddit.com/r/bioinformatics/submit?url=${shareUrlEncoded}&title=${shareText}`, '_blank')}
              data-testid="button-share-reddit"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Reddit</span>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 pt-4 border-t border-border">
            <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
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
      </div>
    </footer>
  );
}
