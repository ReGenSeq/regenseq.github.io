import { useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowDown, Printer } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

type AgendaItem = {
  time: string;
  talkTitle?: string;
  speaker?: string;
  affiliation?: string;
  duration?: string;
  note?: string;
};

type AgendaGroup = {
  time: string;
  title: string;
  subtitle?: string;
  duration?: string;
  kind?: "session" | "break" | "opening" | "closing";
  items?: AgendaItem[];
};

const agenda: AgendaGroup[] = [
  { time: "11:30 – 11:45 AM", title: "WELCOME & OPENING REMARKS", duration: "15 min", kind: "opening" },
  {
    time: "11:45 AM – 12:35 PM",
    title: "SESSION 1",
    subtitle: "Multiplexed Immunofluorescence",
    kind: "session",
    items: [
      { time: "11:45 – 12:10 PM", speaker: "Kunal Pandit", affiliation: "RegenSeq", duration: "25 min" },
      { time: "12:10 – 12:35 PM", speaker: "Kyle Brandon & Maya Xia", affiliation: "Phatnani Lab, New York Genome Center", duration: "25 min", note: "Co-presenting" },
    ],
  },
  { time: "12:35 – 1:25 PM", title: "PIZZA LUNCH & NETWORKING", duration: "50 min", kind: "break" },
  {
    time: "1:25 – 2:40 PM",
    title: "SESSION 2",
    subtitle: "Spatial Transcriptomics",
    kind: "session",
    items: [
      { time: "1:25 – 1:50 PM", speaker: "Silas Maniatis", affiliation: "New York Genome Center", duration: "25 min" },
      { time: "1:50 – 2:15 PM", speaker: "Jiwoon Park", affiliation: "Mason Lab, Weill Cornell Medicine", duration: "25 min" },
      { time: "2:15 – 2:40 PM", talkTitle: "Sponsor Presentation", speaker: "Speaker to be announced", duration: "25 min" },
    ],
  },
  { time: "2:40 – 3:00 PM", title: "COFFEE BREAK & NETWORKING", duration: "20 min", kind: "break" },
  {
    time: "3:00 – 4:15 PM",
    title: "SESSION 3",
    subtitle: "Optical Pooled Screens",
    kind: "session",
    items: [
      { time: "3:00 – 3:25 PM", speaker: "Kaden / Deirdre", affiliation: "Norman Lab, Memorial Sloan Kettering Cancer Center", duration: "25 min" },
      { time: "3:25 – 3:50 PM", speaker: "Speaker to be announced", duration: "25 min" },
      { time: "3:50 – 4:15 PM", talkTitle: "Sponsor Presentation", speaker: "Speaker to be announced", affiliation: "Genovis", duration: "25 min" },
    ],
  },
  { time: "4:15 – 4:30 PM", title: "CLOSING REMARKS", duration: "15 min", kind: "closing" },
  { time: "4:30 – 5:45 PM", title: "HAPPY HOUR & NETWORKING", duration: "75 min", kind: "break" },
];

const scrollToAgenda = () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("agenda")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
};

function AgendaRow({ item }: { item: AgendaItem }) {
  return (
    <li className="meeting-agenda-row grid gap-2 border-t border-border py-4 sm:grid-cols-[10rem_1fr_auto] sm:items-start sm:gap-6">
      <time className="text-sm font-medium tabular-nums text-muted-foreground">{item.time}</time>
      <div className="min-w-0">
        {item.talkTitle && <p className="mb-1 text-sm text-primary">{item.talkTitle}</p>}
        <p className="font-medium text-foreground">{item.speaker}</p>
        {item.affiliation && <p className="mt-1 text-sm text-muted-foreground">{item.affiliation}</p>}
        {item.note && <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{item.note}</p>}
      </div>
      {item.duration && <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground sm:pt-1">{item.duration}</span>}
    </li>
  );
}

export default function Meeting() {
  const handlePrint = useCallback(() => window.print(), []);

  return (
    <div className="meeting-page min-h-screen bg-background text-foreground">
      <Helmet>
        <title>RegenSeq Community Meeting 2026 | RegenSeq</title>
        <meta name="description" content="Agenda for the RegenSeq Community Meeting 2026 at the New York Genome Center in New York City." />
        <link rel="canonical" href="https://regenseq.github.io/meeting" />
        <meta property="og:title" content="RegenSeq Community Meeting 2026" />
        <meta property="og:description" content="Agenda for the RegenSeq Community Meeting 2026." />
        <meta property="og:url" content="https://regenseq.github.io/meeting" />
        <meta property="og:type" content="event" />
        <meta property="og:site_name" content="RegenSeq" />
        <meta property="og:image" content="https://regenseq.github.io/og-image.png" />
        <meta property="og:image:width" content="1408" />
        <meta property="og:image:height" content="768" />
        <meta property="og:image:alt" content="RegenSeq Community Meeting 2026" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RegenSeq Community Meeting 2026" />
        <meta name="twitter:description" content="Agenda for the RegenSeq Community Meeting 2026." />
        <meta name="twitter:image" content="https://regenseq.github.io/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "RegenSeq Community Meeting 2026",
          description: "A RegenSeq community meeting sharing emerging applications, workflows, and ideas across multiplexed imaging, spatial transcriptomics, and optical pooled screening.",
          url: "https://regenseq.github.io/meeting",
          location: { "@type": "Place", name: "New York Genome Center", address: { "@type": "PostalAddress", addressLocality: "New York City" } },
          organizer: { "@type": "Organization", name: "RegenSeq Open Source Community", url: "https://regenseq.github.io/" },
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
        })}</script>
      </Helmet>

      <div className="meeting-site-chrome"><Navigation /></div>
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 md:px-8">
        <header className="meeting-hero max-w-4xl border-b border-border pb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">REGENSeq COMMUNITY MEETING</p>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-5xl">RegenSeq Community Meeting 2026</h1>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <span>[DATE TO BE CONFIRMED]</span><span>New York Genome Center</span><span>New York City</span>
          </div>
          <p className="meeting-hero-description mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Bringing together the RegenSeq community to share emerging applications, workflows, and ideas across multiplexed imaging, spatial transcriptomics, and optical pooled screening.
          </p>
          <div className="meeting-actions mt-7 flex flex-wrap gap-3">
            <Button onClick={scrollToAgenda} className="gap-2">View Agenda <ArrowDown aria-hidden="true" /></Button>
            <Button variant="outline" onClick={handlePrint} className="gap-2"><Printer aria-hidden="true" /> Print / Save Agenda</Button>
          </div>
        </header>

        <section id="agenda" className="scroll-mt-24 pt-12" aria-labelledby="agenda-heading">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">PROGRAM</p><h2 id="agenda-heading" className="mt-2 text-2xl font-semibold sm:text-3xl">Agenda</h2></div>
            <p className="meeting-agenda-description max-w-md text-sm leading-relaxed text-muted-foreground">Talks, community discussions, and networking around emerging RegenSeq applications.</p>
          </div>
          <div className="meeting-agenda border-y border-border">
            {agenda.map((group) => (
              <article key={`${group.time}-${group.title}`} className={`meeting-agenda-group ${group.kind === "break" ? "meeting-break" : ""} ${group.kind === "session" ? "meeting-session" : ""}`}>
                <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr_auto] sm:gap-6">
                  <time className="text-sm font-medium tabular-nums text-muted-foreground">{group.time}</time>
                  <div>
                    <h3 className={`text-sm font-semibold tracking-[0.08em] ${group.kind === "session" ? "text-primary" : "text-foreground"}`}>{group.title}</h3>
                    {group.subtitle && <p className="mt-2 text-lg font-medium">{group.subtitle}</p>}
                    {group.items && <ul className="mt-3"><>{group.items.map((item) => <AgendaRow key={`${item.time}-${item.speaker}`} item={item} />)}</></ul>}
                  </div>
                  {group.duration && <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground sm:pt-1">{group.duration}</span>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="meeting-support mt-14 border-t border-border pt-8" aria-labelledby="support-heading">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">COMMUNITY PARTNERS</p>
          <h2 id="support-heading" className="mt-2 text-xl font-semibold">Event Support</h2>
          <div className="mt-5 flex min-h-20 items-center rounded-md border border-dashed border-border px-5 text-sm text-muted-foreground">Event supporters will be announced as details are confirmed.</div>
        </section>
      </main>
      <div className="meeting-site-chrome"><Footer /></div>
    </div>
  );
}