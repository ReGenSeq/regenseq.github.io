/**
 * Single source of truth for RegenSeq team member data.
 *
 * Both the TeamSection UI component and the Person JSON-LD structured data
 * (injected into index.html at build time via the Vite plugin in vite.config.ts)
 * are generated from this file.  Update here — the UI and search-engine metadata
 * stay in sync automatically.
 */

export interface TeamMember {
  /** Full display name */
  name: string;
  /** Project role / title shown on the card */
  role: string;
  /** Two-letter avatar fallback */
  initials: string;
  /** Affiliation / employer name */
  org: string;
  /** URL of the affiliation organisation */
  orgUrl: string;
  /** Public contact e-mail */
  email: string;
  /** Bio shown on the team card and in the JSON-LD description */
  description: string;
  /**
   * External image URL used for both the avatar and the JSON-LD `image` field.
   * Leave undefined for members whose photo is a local asset — the component
   * resolves local assets separately via `localImages` in TeamSection.tsx.
   */
  imageUrl?: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Dr. Kunal Pandit",
    role: "Technical Lead",
    initials: "KP",
    org: "New York Genome Center",
    orgUrl: "https://www.nygenome.org/",
    email: "kpandit@nygenome.org",
    description:
      "Senior Research Engineer at the New York Genome Center and principal author of RegenSeq's open-source PySeq2500 control software. Dr. Pandit leads hardware integration and instrument control development, enabling researchers to run custom spatial biology protocols on repurposed Illumina HiSeq 2500 sequencers.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/627e96178e8a965a2a04b415/1654954748529-MO49MWUTEGCT6O7ZEJ48/20201026_153623.jpg",
  },
  {
    name: "Dr. Maros Pleska",
    role: "Co-Technical Lead",
    initials: "MP",
    org: "New York Genome Center",
    orgUrl: "https://www.nygenome.org/",
    email: "mpleska@nygenome.org",
    description:
      "Research Scientist at the New York Genome Center specializing in spatial transcriptomics and proteomics. Dr. Pleska applies RegenSeq workflows to multiplexed imaging experiments and contributes expertise in image processing and single-cell data analysis to the project.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/627e96178e8a965a2a04b415/73655136-cdf7-4826-a2fb-3780555fefd2/Maros+Pleska.jpg",
  },
  {
    name: "Dr. Daniel Domovic",
    role: "Entrepreneurial Lead",
    initials: "DD",
    org: "New York Genome Center",
    orgUrl: "https://www.nygenome.org/",
    email: "ddomovic@nygenome.org",
    description:
      "Scientific Program Manager at the New York Genome Center with a computer science background. Dr. Domovic drives community outreach, partnership development, and stakeholder coordination, helping transition RegenSeq from a single-lab tool into a sustainable open-source ecosystem.",
    // Local asset — resolved in TeamSection.tsx via localImages
  },
  {
    name: "Kaspar Bumke",
    role: "Industry Mentor",
    initials: "KB",
    org: "Kitspace",
    orgUrl: "https://kitspace.org/",
    email: "kaspar@kitspace.org",
    description:
      "Electronic engineer and software developer at Kitspace, an open-source platform for sharing electronics designs. Kaspar brings deep expertise in open hardware community building and has made major contributions to the OpenFlexure microscope project, advising RegenSeq on ecosystem governance and open-source best practices.",
    // Local asset — resolved in TeamSection.tsx via localImages
  },
];
