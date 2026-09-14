import { useCallback, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowDown, CalendarPlus, ExternalLink, MapPin, Printer } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

type AgendaCategory = "talks" | "sessions" | "breaks" | "networking" | "sponsor";

type AgendaItem = {
  time: string;
  title?: string;
  talkTitle?: string;
  speaker?: string;
  affiliation?: string;
  duration: string;
  note?: string;
  subtitle?: string;
  kind?: "session" | "break" | "opening" | "closing";
  categories: AgendaCategory[];
};

const agenda: AgendaItem[] = [
  { time: "11:30 – 11:45 AM", title: "WELCOME & OPENING REMARKS", duration: "15 min", kind: "opening", categories: ["sessions"] },
  { time: "11:45 AM – 12:35 PM", title: "SESSION 1", subtitle: "Multiplexed Immunofluorescence", duration: "50 min", kind: "session", categories: ["sessions"] },
  { time: "11:45 – 12:10 PM", speaker: "Kunal Pandit", affiliation: "RegenSeq", duration: "25 min", categories: ["talks"] },
  { time: "12:10 – 12:35 PM", speaker: "Kyle Brandon & Maya Xia", affiliation: "Phatnani Lab, New York Genome Center", duration: "25 min", note: "Co-presenting", categories: ["talks"] },
  { time: "12:35 – 1:25 PM", title: "PIZZA LUNCH & NETWORKING", duration: "50 min", kind: "break", categories: ["breaks", "networking"] },
  { time: "1:25 – 2:40 PM", title: "SESSION 2", subtitle: "Spatial Transcriptomics", duration: "75 min", kind: "session", categories: ["sessions"] },
  { time: "1:25 – 1:50 PM", speaker: "Silas Maniatis", affiliation: "New York Genome Center", duration: "25 min", categories: ["talks"] },
  { time: "1:50 – 2:15 PM", speaker: "Jiwoon Park", affiliation: "Mason Lab, Weill Cornell Medicine", duration: "25 min", categories: ["talks"] },
  { time: "2:15 – 2:40 PM", talkTitle: "Sponsor Presentation", speaker: "Speaker to be announced", duration: "25 min", categories: ["sponsor"] },
  { time: "2:40 – 3:00 PM", title: "COFFEE BREAK & NETWORKING", duration: "20 min", kind: "break", categories: ["breaks", "networking"] },
  { time: "3:00 – 4:15 PM", title: "SESSION 3", subtitle: "Optical Pooled Screens", duration: "75 min", kind: "session", categories: ["sessions"] },
  { time: "3:00 – 3:25 PM", speaker: "Kaden / Deirdre", affiliation: "Norman Lab, Memorial Sloan Kettering Cancer Center", duration: "25 min", categories: ["talks"] },
  { time: "3:25 – 3:50 PM", speaker: "Speaker to be announced", duration: "25 min", categories: ["talks"] },
  { time: "3:50 – 4:15 PM", talkTitle: "Sponsor Presentation", speaker: "Speaker to be announced", affiliation: "Genovis", duration: "25 min", categories: ["sponsor"] },
  { time: "4:15 – 4:30 PM", title: "CLOSING REMARKS", duration: "15 min", kind: "closing", categories: ["sessions"] },
  { time: "4:30 – 5:45 PM", title: "HAPPY HOUR & NETWORKING", duration: "75 min", kind: "break", categories: ["networking"] },
];

const filters: { label: string; value: "all" | AgendaCategory }[] = [
  { label: "All", value: "all" },
  { label: "Talks", value: "talks" },
  { label: "Sessions", value: "sessions" },
  { label: "Breaks", value: "breaks" },
  { label: "Networking", value: "networking" },
  { label: "Sponsor", value: "sponsor" },
];

const registrationUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeNf6wEDJiQIxeC5YHyYY34IOkrSxRlvBZg3yXYP3qR1r4NZw/viewform";
const eventLocation = "New York Genome Center, 101 Avenue of the Americas, New York, NY 10013";
const eventDetails = `Talks in the Auditorium. Lunch, coffee, and happy hour in the Atrium.\n\nRegister: ${registrationUrl}`;
const googleCalendarUrl = `https://calendar.google.com/calendar/render?${new URLSearchParams({
  action: "TEMPLATE",
  text: "RegenSeq Community Meeting 2026",
  dates: "20261013T153000Z/20261013T214500Z",
  details: eventDetails,
  location: eventLocation,
}).toString()}`;

const scrollToAgenda = () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("agenda")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
};

const downloadCalendarEvent = () => {
  const escapeIcsText = (value: string) => value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RegenSeq//Community Meeting 2026//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:regenseq-community-meeting-2026@regenseq.github.io",
    "DTSTAMP:20260914T000000Z",
    "DTSTART:20261013T153000Z",
    "DTEND:20261013T214500Z",
    `SUMMARY:${escapeIcsText("RegenSeq Community Meeting 2026")}`,
    `DESCRIPTION:${escapeIcsText(eventDetails)}`,
    `LOCATION:${escapeIcsText(eventLocation)}`,
    "URL:https://regenseq.github.io/meeting",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([calendar], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "regenseq-community-meeting-2026.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

function AgendaRow({ item, isVisible }: { item: AgendaItem; isVisible: boolean }) {
  return (
    <li className={`meeting-agenda-row grid gap-2 border-b border-border py-4 last:border-b-0 sm:grid-cols-[10rem_minmax(0,1fr)_4.5rem] sm:items-start sm:gap-6 ${item.kind === "break" ? "meeting-break" : ""} ${item.kind === "session" ? "meeting-session" : ""} ${isVisible ? "" : "is-filtered-out"}`}>
      <time className="text-sm font-medium tabular-nums text-muted-foreground">{item.time}</time>
      <div className="min-w-0">
        {item.title && <h3 className={`text-sm font-semibold tracking-[0.08em] ${item.kind === "session" ? "text-primary" : "text-foreground"}`}>{item.title}</h3>}
        {item.subtitle && <p className="mt-1 text-base font-medium">{item.subtitle}</p>}
        {item.talkTitle && <p className="mb-1 text-sm text-primary">{item.talkTitle}</p>}
        {item.speaker && <p className="font-medium text-foreground">{item.speaker}</p>}
        {item.affiliation && <p className="mt-1 text-sm text-muted-foreground">{item.affiliation}</p>}
        {item.note && <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{item.note}</p>}
      </div>
      <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground sm:pt-1 sm:text-right">{item.duration}</span>
    </li>
  );
}

export default function Meeting() {
  const [activeFilter, setActiveFilter] = useState<"all" | AgendaCategory>("all");
  const handlePrint = useCallback(() => window.print(), []);
  const visibleCount = agenda.filter((item) => activeFilter === "all" || item.categories.includes(activeFilter)).length;

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
        <meta property="og:image" content="https://regenseq.github.io/meeting-2026-preview.png" />
        <meta property="og:image:width" content="2266" />
        <meta property="og:image:height" content="1183" />
        <meta property="og:image:alt" content="Fluorescence microscopy image for the RegenSeq Community Meeting 2026" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RegenSeq Community Meeting 2026" />
        <meta name="twitter:description" content="Agenda for the RegenSeq Community Meeting 2026." />
        <meta name="twitter:image" content="https://regenseq.github.io/meeting-2026-preview.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "RegenSeq Community Meeting 2026",
          description: "A RegenSeq community meeting sharing emerging applications, workflows, and ideas across multiplexed imaging, spatial transcriptomics, and optical pooled screening.",
          url: "https://regenseq.github.io/meeting",
          startDate: "2026-10-13T11:30:00-04:00",
          endDate: "2026-10-13T17:45:00-04:00",
          location: {
            "@type": "Place",
            name: "New York Genome Center",
            address: {
              "@type": "PostalAddress",
              streetAddress: "101 Avenue of the Americas",
              addressLocality: "New York",
              addressRegion: "NY",
              postalCode: "10013",
              addressCountry: "US",
            },
          },
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
          <div className="mt-6 grid max-w-3xl gap-4 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <CalendarPlus className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <time dateTime="2026-10-13">Tuesday, October 13, 2026</time>
                <p className="mt-1">11:30 AM – 5:45 PM ET</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p>New York Genome Center</p>
                <p className="mt-1">101 Avenue of the Americas, New York, NY 10013</p>
                <p className="mt-1 text-xs">Talks in the Auditorium · Lunch, coffee &amp; happy hour in the Atrium</p>
              </div>
            </div>
          </div>
          <p className="meeting-hero-description mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Bringing together the RegenSeq community to share emerging applications, workflows, and ideas across multiplexed imaging, spatial transcriptomics, and optical pooled screening.
          </p>
          <div className="meeting-actions mt-7 flex flex-wrap gap-3">
            <Button onClick={scrollToAgenda} className="gap-2">View Agenda <ArrowDown aria-hidden="true" /></Button>
            <Button variant="outline" onClick={handlePrint} className="gap-2"><Printer aria-hidden="true" /> Print / Save Agenda</Button>
          </div>
        </header>

        <section className="meeting-registration mt-8 max-w-4xl overflow-hidden rounded-xl border border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/10" aria-labelledby="registration-heading">
          <div className="p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">Registration open</p>
              <h2 id="registration-heading" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Register for the RegenSeq Community Meeting</h2>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80 sm:text-base">Save your spot and help us plan food and seating. Registration takes about 30 seconds.</p>
            </div>
            <Button asChild size="lg" className="mt-6 w-full shrink-0 border-white bg-white px-7 text-primary shadow-md hover:bg-white sm:mt-0 sm:w-auto">
              <a href={registrationUrl} target="_blank" rel="noopener noreferrer">
                Register now <ExternalLink aria-hidden="true" />
                <span className="sr-only">(opens Google Form in a new tab)</span>
              </a>
            </Button>
          </div>
          <div className="border-t border-primary-foreground/20 bg-black/10 px-6 py-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-8">
            <div>
              <p className="font-medium">Already registered?</p>
              <p className="mt-1 text-sm text-primary-foreground/70">Add the event to your calendar so you don’t miss it.</p>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:mt-0 sm:flex-row">
              <Button asChild variant="outline" size="sm" className="border-primary-foreground/35 text-primary-foreground [--button-outline:hsl(var(--primary-foreground)/0.35)] hover:border-primary-foreground/60">
                <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer">
                  <CalendarPlus aria-hidden="true" /> Google Calendar
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={downloadCalendarEvent} className="border-primary-foreground/35 text-primary-foreground [--button-outline:hsl(var(--primary-foreground)/0.35)] hover:border-primary-foreground/60">
                <CalendarPlus aria-hidden="true" /> Apple / Outlook
              </Button>
            </div>
          </div>
        </section>

        <section id="agenda" className="scroll-mt-24 pt-12" aria-labelledby="agenda-heading">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">PROGRAM</p><h2 id="agenda-heading" className="mt-2 text-2xl font-semibold sm:text-3xl">Agenda</h2></div>
            <p className="meeting-agenda-description max-w-md text-sm leading-relaxed text-muted-foreground">Talks, community discussions, and networking around emerging RegenSeq applications.</p>
          </div>
          <div className="meeting-agenda-filters mb-5" role="group" aria-label="Filter agenda">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={activeFilter === filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`min-h-10 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${activeFilter === filter.value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <p className="sr-only" aria-live="polite">{visibleCount} agenda items shown.</p>
          </div>
          <div className="meeting-agenda border-y border-border">
            <ol>
              {agenda.map((item) => (
                <AgendaRow
                  key={`${item.time}-${item.title ?? item.speaker}`}
                  item={item}
                  isVisible={activeFilter === "all" || item.categories.includes(activeFilter)}
                />
              ))}
            </ol>
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