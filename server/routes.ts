import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";

// In-memory rate limiting: max 5 submissions per IP per hour
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now - record.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

// In-memory submission stores (survive process lifetime)
const flowcellSubmissions: object[] = [];
const sequencerSubmissions: object[] = [];

// Validation schemas
const flowcellSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email address required"),
  organization: z.string().min(1, "Organization is required"),
  quantity: z.number().int().min(1, "Must request at least 1 flowcell"),
  intendedUse: z.string().min(1, "Intended use is required"),
  labGroup: z.string().optional(),
  requestedDate: z.string().optional(),
  deliveryPreference: z.string().optional(),
  notes: z.string().optional(),
  website: z.string().max(0).optional(), // honeypot — must be empty
});

const sequencerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email address required"),
  organization: z.string().min(1, "Organization is required"),
  location: z.string().min(1, "Location is required"),
  whatYouWantToDo: z.string().min(1, "Please describe what you want to do"),
  projectDescription: z.string().optional(),
  platform: z.enum(["Illumina", "Oxford Nanopore", "PacBio", "Other", "Not sure"]).optional(),
  otherPlatform: z.string().optional(),
  sampleType: z.string().optional(),
  approximateSamples: z.string().optional(),
  desiredTimeline: z.string().optional(),
  hasEquipmentAccess: z.enum(["Yes", "No", "Limited access", "Not sure"]).optional(),
  city: z.string().optional(),
  stateRegion: z.string().optional(),
  country: z.string().optional(),
  preferredTravelDistance: z.string().optional(),
  collaborationInterest: z.string().optional(),
  fundingStatus: z.string().optional(),
  additionalNotes: z.string().optional(),
  website: z.string().max(0).optional(), // honeypot — must be empty
});

export async function registerRoutes(app: Express): Promise<Server> {

  // POST /api/forms/flowcell-request
  app.post("/api/forms/flowcell-request", (req, res) => {
    const ip = req.ip ?? "unknown";
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ error: "Too many submissions. Please try again later." });
    }

    // Honeypot check
    if (req.body?.website) {
      return res.status(200).json({ success: true }); // silently ignore bots
    }

    const result = flowcellSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: "Validation failed", issues: result.error.issues });
    }

    const { website, ...data } = result.data;
    const submission = {
      ...data,
      type: "flowcell-request",
      submittedAt: new Date().toISOString(),
      id: Math.random().toString(36).slice(2),
    };

    flowcellSubmissions.push(submission);

    // Log submission server-side.
    // Configure FLOWCELL_REQUEST_RECIPIENT env var with the recipient email address.
    const recipient = process.env.FLOWCELL_REQUEST_RECIPIENT ?? "[set FLOWCELL_REQUEST_RECIPIENT env var]";
    const estimatedTotal = data.quantity * 50;
    console.log("\n=== NEW FLOWCELL REQUEST ===");
    console.log(`To:      ${recipient}`);
    console.log(`Subject: New flowcell request — ${data.fullName} — ${data.quantity} flowcell(s)`);
    console.log(`Name:    ${data.fullName}`);
    console.log(`Email:   ${data.email}`);
    console.log(`Org:     ${data.organization}`);
    console.log(`Qty:     ${data.quantity} × $50 = $${estimatedTotal} estimated`);
    console.log(`Use:     ${data.intendedUse}`);
    if (data.labGroup) console.log(`Lab:     ${data.labGroup}`);
    if (data.requestedDate) console.log(`Date:    ${data.requestedDate}`);
    if (data.deliveryPreference) console.log(`Delivery: ${data.deliveryPreference}`);
    if (data.notes) console.log(`Notes:   ${data.notes}`);
    console.log(`Submitted: ${submission.submittedAt}`);
    console.log("===========================\n");

    return res.status(201).json({ success: true, id: (submission as any).id });
  });

  // POST /api/forms/sequencer-request
  // Routed to Kunal — set SEQUENCER_REQUEST_RECIPIENT to kpandit@nygenome.org (or Kunal's verified address)
  app.post("/api/forms/sequencer-request", (req, res) => {
    const ip = req.ip ?? "unknown";
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ error: "Too many submissions. Please try again later." });
    }

    // Honeypot check
    if (req.body?.website) {
      return res.status(200).json({ success: true });
    }

    const result = sequencerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: "Validation failed", issues: result.error.issues });
    }

    const { website, ...data } = result.data;
    const submission = {
      ...data,
      type: "sequencer-request",
      submittedAt: new Date().toISOString(),
      id: Math.random().toString(36).slice(2),
    };

    sequencerSubmissions.push(submission);

    // Log submission server-side.
    // SEQUENCER_REQUEST_RECIPIENT should be set to Kunal's verified email address (kpandit@nygenome.org).
    const recipient = process.env.SEQUENCER_REQUEST_RECIPIENT ?? "[set SEQUENCER_REQUEST_RECIPIENT env var to Kunal's email]";
    const locationStr = [data.city, data.stateRegion, data.country].filter(Boolean).join(", ") || data.location;
    console.log("\n=== NEW SEQUENCER HELP REQUEST ===");
    console.log(`To:      ${recipient}`);
    console.log(`Subject: Sequencer help request — ${data.fullName} — ${locationStr}`);
    console.log("--- Who ---");
    console.log(`Name:    ${data.fullName}`);
    console.log(`Email:   ${data.email}`);
    console.log(`Org:     ${data.organization}`);
    console.log("--- Where ---");
    console.log(`Location: ${locationStr}`);
    if (data.preferredTravelDistance) console.log(`Travel:  ${data.preferredTravelDistance}`);
    console.log("--- What ---");
    console.log(`Goal:    ${data.whatYouWantToDo}`);
    if (data.projectDescription) console.log(`Project: ${data.projectDescription}`);
    if (data.sampleType) console.log(`Sample:  ${data.sampleType}`);
    if (data.platform) console.log(`Platform: ${data.platform}${data.otherPlatform ? ` (${data.otherPlatform})` : ""}`);
    if (data.approximateSamples) console.log(`Samples: ${data.approximateSamples}`);
    if (data.desiredTimeline) console.log(`Timeline: ${data.desiredTimeline}`);
    console.log("--- Additional context ---");
    if (data.hasEquipmentAccess) console.log(`Has equipment: ${data.hasEquipmentAccess}`);
    if (data.collaborationInterest) console.log(`Collaboration: ${data.collaborationInterest}`);
    if (data.fundingStatus) console.log(`Funding: ${data.fundingStatus}`);
    if (data.additionalNotes) console.log(`Notes:   ${data.additionalNotes}`);
    console.log(`Submitted: ${submission.submittedAt}`);
    console.log("==================================\n");

    return res.status(201).json({ success: true, id: (submission as any).id });
  });

  const httpServer = createServer(app);
  return httpServer;
}
