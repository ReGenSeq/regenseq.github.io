import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  { id: "python-conventions", title: "1. General Python Conventions" },
  { id: "instruments", title: "2. Instruments" },
  { id: "systems", title: "3. Systems" },
  { id: "system-queues", title: "4. System Queues" },
  { id: "user-interfaces", title: "5. User Interfaces" },
  { id: "hardware-settings", title: "6. Hardware Settings" },
  { id: "experiment-settings", title: "7. Experiment and Software Settings" },
  { id: "recipes", title: "8. Recipes" },
  { id: "how-to-contribute", title: "9. How to Contribute" },
  { id: "setting-up-environment", title: "10. Setting Up Your Environment" },
  { id: "contributing-improvements", title: "11. Contributing Improvements" },
];

function Code({ children }: { children: string }) {
  return (
    <code className="bg-muted text-foreground px-1.5 py-0.5 rounded text-[0.85em] font-mono">
      {children}
    </code>
  );
}

function CodeBlock({ children, lang = "" }: { children: string; lang?: string }) {
  return (
    <pre className={`bg-muted rounded-md p-4 overflow-x-auto text-sm font-mono leading-relaxed my-4 border border-border`}>
      <code>{children.trim()}</code>
    </pre>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-foreground">
      <span className="font-semibold text-primary">Note: </span>{children}
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-foreground">
      <span className="font-semibold text-destructive">Warning: </span>{children}
    </div>
  );
}

function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-md border border-border bg-muted/40 px-4 py-3 text-sm text-foreground">
      <p className="font-semibold mb-1">{title}</p>
      {children}
    </div>
  );
}

function SectionDivider() {
  return <hr className="my-10 border-border" />;
}

function HeadingAnchor({ id, level, children }: { id: string; level: 2 | 3 | 4; children: React.ReactNode }) {
  const Tag = `h${level}` as "h2" | "h3" | "h4";
  const cls =
    level === 2
      ? "text-xl sm:text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-20"
      : level === 3
      ? "text-base sm:text-lg font-semibold text-foreground mt-7 mb-3 scroll-mt-20"
      : "text-sm sm:text-base font-semibold text-muted-foreground mt-5 mb-2 scroll-mt-20";
  return (
    <Tag id={id} className={cls}>
      <a href={`#${id}`} className="no-underline hover:underline decoration-muted-foreground/50">
        {children}
      </a>
    </Tag>
  );
}

export default function CommunityGuidelines() {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headings = document.querySelectorAll("[data-toc-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setTocOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
          <Link href="/#community" className="hover:text-foreground transition-colors">Community</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">Community Guidelines</span>
        </nav>

        {/* Page header */}
        <div className="mb-8 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Community Guidelines</h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            These guidelines establish shared conventions for building reliable, understandable, and extensible
            laboratory automation software. Following them helps contributors work consistently across instruments,
            systems, interfaces, experiment configurations, and recipes.
          </p>
        </div>

        {/* Mobile TOC toggle */}
        <div className="lg:hidden mb-6 border border-border rounded-md">
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-expanded={tocOpen}
            aria-controls="mobile-toc"
          >
            <span>On this page</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
          </button>
          {tocOpen && (
            <div id="mobile-toc" className="border-t border-border px-4 py-3 flex flex-col gap-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`text-left text-sm py-1 transition-colors ${
                    activeSection === s.id ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Two-column layout */}
        <div className="flex gap-12 items-start">
          {/* Main content */}
          <article ref={contentRef} className="min-w-0 flex-1 prose-neutral max-w-none">

            {/* ── Section 1 ── */}
            <HeadingAnchor id="python-conventions" level={2}>
              <span data-toc-section>1. General Python Conventions</span>
            </HeadingAnchor>
            <div id="python-conventions" data-toc-section className="scroll-mt-20" />

            <HeadingAnchor id="params" level={3}>Use <Code>params</Code> for User-Provided Configuration</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Use <Code>params</Code> to validate and represent information supplied by the user, including experiment
              configuration files, machine configuration files, recipes, and other user-defined runtime inputs.
              Clearly distinguish user-provided configuration from internal application state.
            </p>
            <CodeBlock lang="python">{`
from pydantic import BaseModel


class ExperimentConfig(BaseModel):
    name: str
    cycles: int
    output_dir: str
    channels: list[str]
`}</CodeBlock>
            <Note>The examples on this page are illustrative. Adapt them to the project's actual implementation rather than introducing incompatible abstractions.</Note>

            <HeadingAnchor id="attrs" level={3}>Use <Code>attrs</Code> for Structured Internal Data</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Use <Code>attrs</Code> to define and format structured internal data, including imaging parameters,
              regions of interest, pumping parameters, stage positions, and other internal data models.
            </p>
            <CodeBlock lang="python">{`
import attrs


@attrs.define
class RegionOfInterest:
    x: float
    y: float
    width: float
    height: float
    label: str = ""
`}</CodeBlock>

            <HeadingAnchor id="type-annotations" level={3}>Use Type Annotations</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Use Python type annotations throughout the codebase. Annotations make interfaces self-documenting,
              clarify expected inputs and outputs, improve editor and static-analysis support, and reduce ambiguity
              between components. All public functions, methods, configuration objects, queue tasks, and communication
              interfaces should be typed.
            </p>

            <HeadingAnchor id="abstract-base-classes" level={3}>Use Abstract Base Classes</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Use abstract base classes to define shared interfaces for instruments, systems, protocols, and
              configuration models. Concrete implementations should inherit from these interfaces rather than
              recreating incompatible APIs.
            </p>
            <CodeBlock lang="python">{`
from abc import ABC, abstractmethod


class Instrument(ABC):
    @abstractmethod
    async def _connect(self) -> None:
        ...

    @abstractmethod
    async def _disconnect(self) -> None:
        ...
`}</CodeBlock>

            <SectionDivider />

            {/* ── Section 2 ── */}
            <div id="instruments" data-toc-section className="scroll-mt-20" />
            <HeadingAnchor id="instruments-heading" level={2}>2. Instruments</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              All instruments should inherit from the shared <Code>Instrument</Code> abstract base class.
            </p>

            <HeadingAnchor id="communication-protocols" level={3}>Communication Protocols</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Instrument implementations should use the appropriate communication-protocol mixin. Supported
              protocols include Serial, TCP/IP, USB, HTTP, vendor SDK, and simulated or mock communication.
              The communication layer should remain separate from instrument-specific behavior wherever practical.
            </p>

            <HeadingAnchor id="async-communication" level={3}>Asynchronous Communication</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              All commands that communicate with physical hardware must be asynchronous. This includes connecting,
              disconnecting, sending commands, reading responses, moving hardware, starting or stopping acquisition,
              and waiting for hardware state changes.
            </p>

            <HeadingAnchor id="naming-async" level={3}>Naming Asynchronous Hardware Commands</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Low-level asynchronous commands that communicate directly with an instrument should use a leading
              underscore. The leading underscore identifies low-level internal hardware operations. Public methods
              should generally validate the request and add the corresponding operation to the system queue rather
              than bypassing queue management.
            </p>
            <CodeBlock lang="python">{`
async def _move_to(self, position: float) -> None:
    ...

async def _set_temperature(self, temperature: float) -> None:
    ...

async def _capture_image(self) -> Image:
    ...
`}</CodeBlock>

            <SectionDivider />

            {/* ── Section 3 ── */}
            <div id="systems" data-toc-section className="scroll-mt-20" />
            <HeadingAnchor id="systems-heading" level={2}>3. Systems</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              All systems should inherit from the shared <Code>System</Code> abstract base class. Systems coordinate
              multiple instruments and expose higher-level workflows.
            </p>

            <HeadingAnchor id="system-composition" level={3}>System Composition</HeadingAnchor>
            <CodeBlock>{`
Flowcell
├── Pumps
├── Valves
└── Temperature controller

Microscope
├── Stages
├── Cameras
├── Lasers
└── Optical components
    ├── Shutters
    └── Filters

Sequencer
├── Flowcells
└── Microscopes
`}</CodeBlock>

            <HeadingAnchor id="high-level-operations" level={3}>High-Level Asynchronous Operations</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Systems should provide asynchronous high-level commands for pumping, imaging, synchronizing instruments,
              temperature control, coordinating fluidics and imaging, and executing experiment steps.
              Low-level asynchronous methods use the underscore naming convention. Public methods act as wrappers
              around low-level asynchronous commands and add tasks to the appropriate queue.
            </p>
            <CodeBlock lang="python">{`
async def _pump_reagent(
    self,
    reagent: str,
    volume_ul: float,
) -> None:
    ...


def pump_reagent(
    self,
    reagent: str,
    volume_ul: float,
) -> TaskId:
    return self.queue.add(
        self._pump_reagent(
            reagent=reagent,
            volume_ul=volume_ul,
        )
    )
`}</CodeBlock>

            <SectionDivider />

            {/* ── Section 4 ── */}
            <div id="system-queues" data-toc-section className="scroll-mt-20" />
            <HeadingAnchor id="system-queues-heading" level={2}>4. System Queues</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Each system should maintain a task queue.
            </p>

            <HeadingAnchor id="queue-behavior" level={3}>Queue Behavior</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-2">
              System queues must:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base text-muted-foreground space-y-1 mb-4 pl-2">
              <li>Process tasks in FIFO order by default</li>
              <li>Assign a unique ID to every task</li>
              <li>Support pausing and resuming</li>
              <li>Allow queued tasks to be reordered</li>
              <li>Allow queued tasks to be deleted</li>
              <li>Expose task status clearly</li>
            </ul>

            <HeadingAnchor id="task-immutability" level={3}>Task Immutability</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Once created, a queued task may be reordered, deleted before execution, paused as part of the queue,
              or inspected. A queued task must not be modified in place. To change an operation, delete the original
              task and create a new one.
            </p>
            <Callout title="Why this matters">
              <p className="text-muted-foreground">
                Immutable tasks improve reproducibility, auditability, and debugging. They also ensure that the
                parameters displayed to the user are always identical to those that will be executed — preventing
                a class of subtle bugs where displayed state diverges from actual state.
              </p>
            </Callout>

            <SectionDivider />

            {/* ── Section 5 ── */}
            <div id="user-interfaces" data-toc-section className="scroll-mt-20" />
            <HeadingAnchor id="user-interfaces-heading" level={2}>5. User Interfaces</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              User interfaces should clearly separate machine-level settings from experiment-level settings.
              Whenever possible, users should interact with safe, validated controls rather than editing low-level
              hardware values directly.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-2">The interface should:</p>
            <ul className="list-disc list-inside text-sm sm:text-base text-muted-foreground space-y-1 mb-4 pl-2">
              <li>Validate configuration before execution</li>
              <li>Show clear validation errors</li>
              <li>Display queued and active tasks</li>
              <li>Show task IDs and statuses</li>
              <li>Allow supported queue operations</li>
              <li>Prevent unsupported changes to running or completed tasks</li>
              <li>Make the source of each setting understandable</li>
            </ul>

            <SectionDivider />

            {/* ── Section 6 ── */}
            <div id="hardware-settings" data-toc-section className="scroll-mt-20" />
            <HeadingAnchor id="hardware-settings-heading" level={2}>6. Hardware Settings</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Hardware settings that cannot or should not be changed frequently must be stored in{" "}
              <Code>machine_settings.yaml</Code>. Examples include hardware addresses, communication ports, device
              identifiers, axis limits, calibration constants, safety limits, installed hardware capabilities, and
              machine-specific mappings.
            </p>
            <Warning>
              Machine settings describe the physical system. They should be changed only by users who understand
              the hardware and the consequences of the change.
            </Warning>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Do not place ordinary experiment parameters in <Code>machine_settings.yaml</Code>.
            </p>

            <SectionDivider />

            {/* ── Section 7 ── */}
            <div id="experiment-settings" data-toc-section className="scroll-mt-20" />
            <HeadingAnchor id="experiment-settings-heading" level={2}>7. Experiment and Software Settings</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Experiment and software settings that users need to change easily should be stored in{" "}
              <Code>default_config.toml</Code>. Experiment settings should model the parameters required for region
              of interest selection, stage movement, focusing, imaging, exposure, fluidics, and reagent handling.
            </p>

            <HeadingAnchor id="reagents" level={3}>Reagents</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Reagents should be defined in a dedicated TOML section, mapping each reagent name to its assigned port.
            </p>
            <CodeBlock lang="toml">{`
[method.reagent]
wash_buffer = 1
stain = 2
imaging_buffer = 3
`}</CodeBlock>

            <HeadingAnchor id="fluidics-defaults" level={3}>Fluidics Defaults</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Reagent operations should use the relevant parameters defined under <Code>[method.fluidics]</Code>.
              These may include default flow rate, pumping volume, pause duration, incubation duration, wash
              behavior, and other fluidics defaults.
            </p>
            <CodeBlock lang="toml">{`
[method.fluidics]
default_flow_rate_ul_min = 250
default_pause_seconds = 5
default_incubation_seconds = 60
`}</CodeBlock>
            <Note>
              Reagent definitions identify what is connected and where. Fluidics settings define how those
              reagents are handled.
            </Note>

            <SectionDivider />

            {/* ── Section 8 ── */}
            <div id="recipes" data-toc-section className="scroll-mt-20" />
            <HeadingAnchor id="recipes-heading" level={2}>8. Recipes</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Recipes should begin with a simple, readable YAML format designed for humans to author. The application
              then validates and transforms that input into a more structured and annotated internal representation.
            </p>

            <HeadingAnchor id="authoring-format" level={3}>Authoring Format</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              The user-facing recipe format should prioritize readability, a clear order of operations, minimal
              repetition, simple parameter overrides, and helpful validation messages.
            </p>
            <CodeBlock lang="yaml">{`
steps:
  - pump:
      reagent: wash_buffer
      volume_ul: 500

  - wait:
      seconds: 30

  - image:
      region: roi_1
      channel: fluorescence
`}</CodeBlock>

            <HeadingAnchor id="structured-representation" level={3}>Structured Representation</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              The processed representation may add task IDs, resolved defaults, validated units, reagent ports,
              timing information, source metadata, annotations, and dependency information.
            </p>
            <Callout title="Recommendation">
              <p className="text-muted-foreground">
                Users should normally edit the simple source recipe rather than the generated structured
                representation. The structured representation is an internal artifact produced by the application.
              </p>
            </Callout>

            <SectionDivider />

            {/* ── How to Contribute ── */}
            <div id="how-to-contribute" data-toc-section className="scroll-mt-20" />
            <HeadingAnchor id="how-to-contribute-heading" level={2}>9. How to Contribute</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Start by searching through the{" "}
              <a href="https://github.com/ReGenSeq/PySeq2500/pulls" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:no-underline">pull requests</a>
              {" "}and{" "}
              <a href="https://github.com/ReGenSeq/PySeq2500/issues" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:no-underline">issues</a>
              {" "}to see whether someone else has raised a similar idea or question.
              If you don't see your idea listed and it fits the goals of the PySeq ecosystem, open a pull request.
            </p>
            <Note>
              A pull request doesn't have to represent finished work. Open it early as a draft or mark it as WIP so others can watch or give feedback on your progress.
            </Note>
            <HeadingAnchor id="submitting-a-pr" level={3}>Submitting a pull request</HeadingAnchor>
            <ol className="space-y-3 text-sm sm:text-base text-muted-foreground mb-4 list-none">
              {([
                <>
                  <a href="https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:no-underline">Fork the repository</a>
                  {" "}and clone it locally. Connect your local clone to the original repository by adding it as a remote called <Code>upstream</Code> and pull in changes often so that merge conflicts are less likely when you submit.
                </>,
                <>
                  <a href="https://docs.github.com/en/get-started/using-github/github-flow" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:no-underline">Create a branch</a>
                  {" "}for your edits.
                </>,
                <>Reference any relevant issues or supporting documentation in your PR (for example: <Code>Closes #37</Code>).</>,
                "Test your changes against any existing tests and create new ones when needed. Make sure your changes don't break the existing project.",
              ] as React.ReactNode[]).map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">{i + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <SectionDivider />

            {/* ── Setting Up Your Environment ── */}
            <div id="setting-up-environment" data-toc-section className="scroll-mt-20" />
            <HeadingAnchor id="setting-up-environment-heading" level={2}>10. Setting Up Your Environment</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              The PySeq ecosystem uses{" "}
              <a href="https://docs.astral.sh/uv/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:no-underline">uv</a>
              {" "}for package and project management.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-2">
              Once you have uv set up, forked a repository, and cloned it locally, run:
            </p>
            <CodeBlock lang="bash">{`uv sync
uv run pre-commit install`}</CodeBlock>

            <SectionDivider />

            {/* ── Contributing Improvements ── */}
            <div id="contributing-improvements" data-toc-section className="scroll-mt-20" />
            <HeadingAnchor id="contributing-improvements-heading" level={2}>11. Contributing Improvements</HeadingAnchor>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              These guidelines define the project's current architectural conventions. When a use case does not fit
              them, contributors should document the limitation and discuss the proposed change before introducing a
              new pattern. Improvements to the guidelines are welcome when they make the system safer, clearer, or
              easier to extend.
            </p>
            <div className="mt-6">
              <a
                href="https://github.com/ReGenSeq/PySeq2500/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  Open a discussion on GitHub
                </Button>
              </a>
            </div>

          </article>

          {/* Desktop sticky TOC */}
          <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">On this page</p>
            <nav className="flex flex-col gap-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`text-left text-sm py-1 px-2 rounded transition-colors leading-snug ${
                    activeSection === s.id
                      ? "text-primary font-medium bg-primary/5"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
