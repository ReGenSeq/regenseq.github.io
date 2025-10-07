# PySeq Open Source Community - Design Guidelines

## Design Approach: Open Source Science Aesthetic

**Reference Inspiration:** Drawing from successful open source and scientific platforms including GitHub, Python.org, Mozilla, Nature journal, and Jupyter - emphasizing clarity, accessibility, and technical credibility while maintaining visual appeal.

**Core Principles:**
- Scientific credibility through clean, professional design
- Open source community warmth through approachable typography and spacing
- Technical precision with well-structured information hierarchy
- Accessibility-first with strong contrast and readable type scales

---

## Color Palette

### Light Mode
- **Primary:** 217 91% 25% (Deep scientific blue - trust, precision)
- **Primary Variant:** 217 85% 35% (Lighter blue for interactive states)
- **Secondary:** 187 75% 40% (Teal - innovation, biotechnology)
- **Accent:** 142 76% 45% (Vibrant green - open source, growth)
- **Background:** 0 0% 100% (Pure white)
- **Surface:** 220 14% 96% (Light gray for cards/sections)
- **Text Primary:** 220 15% 15% (Almost black)
- **Text Secondary:** 220 10% 45% (Medium gray)

### Dark Mode
- **Primary:** 217 85% 65% (Lighter blue for dark backgrounds)
- **Secondary:** 187 70% 55% (Lighter teal)
- **Accent:** 142 70% 55% (Lighter green)
- **Background:** 220 15% 10% (Deep dark blue-gray)
- **Surface:** 220 14% 15% (Elevated dark surface)
- **Text Primary:** 0 0% 95% (Off-white)
- **Text Secondary:** 220 10% 70% (Light gray)

---

## Typography

**Font Families:**
- **Headings:** 'Inter', system-ui, sans-serif (700, 600, 500 weights)
- **Body:** 'Inter', system-ui, sans-serif (400, 500 weights)
- **Code/Technical:** 'JetBrains Mono', 'Fira Code', monospace (for repository links, technical specs)

**Scale:**
- Hero Headline: text-5xl md:text-6xl lg:text-7xl (bold)
- Section Headings: text-3xl md:text-4xl (semibold)
- Subsection Headings: text-xl md:text-2xl (medium)
- Body: text-base md:text-lg (regular)
- Small Text/Captions: text-sm (regular)

---

## Layout System

**Spacing Primitives:** Primarily using multiples of 4 (p-4, p-8, p-12, p-16, p-24, p-32)
- Section Padding: py-16 md:py-24 lg:py-32
- Card/Component Spacing: p-6 md:p-8
- Element Gaps: gap-4, gap-6, gap-8, gap-12

**Container Widths:**
- Full-width sections: w-full with max-w-7xl mx-auto px-4 md:px-8
- Content sections: max-w-6xl
- Text-heavy content: max-w-4xl

**Multi-Column Strategy:**
- Team cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Feature highlights: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Impact points: grid-cols-1 md:grid-cols-2
- Mobile: Always single column

---

## Section Structure

### 1. Hero Section (80vh)
Large hero image showing microscopy/sequencer imagery or abstract DNA/cellular visualization with gradient overlay (from primary blue with 70% opacity to transparent). Centered content with project title, tagline, NSF badge, and prominent CTAs (GitHub + Paper).

### 2. About PySeq Section
Two-column layout (text + visual): Left explains repurposing DNA sequencers, right shows sequencer/workflow diagram. Background: subtle surface color.

### 3. Technical Capabilities Section
Three-column grid of feature cards with icons: 4-channel imaging, temperature control, automated fluidics, Python-based, custom flow cells, multi-day workflows.

### 4. NSF POSE Grant Section  
Highlighted banner with grant details, broader impacts in a 2-column grid format.

### 5. Team Section
Four-column grid (stacks to 2 then 1) with team member cards: photo, name, role, expertise. Equal height cards with hover elevation.

### 6. Resources & Links Section
Prominent cards for GitHub repository and Nature paper, plus additional documentation/community resources.

### 7. Impact & Vision Section
Four impact points (accessibility, democratization, sustainability, transparency) in 2x2 grid, each with icon and description.

### 8. Community & Get Involved Section
Call-to-action focused on contributing, joining discussions, with clear next steps. Background: subtle gradient.

### 9. Footer
Multi-column footer with quick links, contact info (NYGC attribution), social/GitHub links, NSF acknowledgment.

---

## Component Library

**Buttons:**
- Primary: bg-primary with white text, rounded-lg, px-6 py-3
- Secondary: bg-secondary with white text
- Outline (on images): border-2 border-white text-white backdrop-blur-md bg-white/10

**Cards:**
- White/surface background, rounded-xl, p-6 md:p-8
- Subtle shadow: shadow-sm hover:shadow-xl transition
- Border: border border-gray-200 dark:border-gray-700

**Badges/Tags:**
- Rounded-full px-4 py-1.5 text-sm
- NSF badge: bg-accent/10 text-accent border border-accent/20

**Links:**
- Inline: underline decoration-2 decoration-primary/30 hover:decoration-primary/100
- Card links: entire card clickable with hover state

---

## Images & Media

**Hero Image:** Large microscopy image showing fluorescent cells/tissue imaging or abstract DNA sequencing visualization - placed as background with gradient overlay for text readability.

**Section Supporting Images:** 
- Sequencer hardware photo in About section
- Workflow diagrams/schematics where technical
- Team member professional headshots (circular or rounded square)
- Icon illustrations for features (minimal line-art style)

**Image Treatment:** Rounded corners (rounded-lg to rounded-xl), subtle shadows, ensure high resolution for scientific credibility.

---

## Animation & Interactions

**Minimal & Purposeful:**
- Smooth scroll between sections
- Fade-in on scroll for section content (intersection observer)
- Card hover: subtle elevation increase (shadow transition)
- Button hover: slight brightness increase
- No distracting animations - maintain scientific professionalism

---

## Accessibility & Responsiveness

- WCAG AA contrast ratios minimum (AAA preferred)
- Focus states: 2px ring in accent color with offset
- Semantic HTML throughout
- All interactive elements minimum 44px touch target
- Responsive images with srcset
- Consistent dark mode implementation including form elements
- Skip navigation link for keyboard users