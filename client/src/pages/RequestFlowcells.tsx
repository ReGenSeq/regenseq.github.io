import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, FlaskConical } from "lucide-react";
import { submitToFormspree } from "@/lib/formspree";
import { useToast } from "@/hooks/use-toast";

const PRICE = 50;

const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().min(1, "Organization or institution is required"),
  quantity: z.coerce
    .number({ invalid_type_error: "Please enter a number" })
    .int("Must be a whole number")
    .min(1, "Must request at least 1 flowcell"),
  intendedUse: z.string().min(10, "Please describe your intended use (at least 10 characters)"),
  labGroup: z.string().optional(),
  requestedDate: z.string().optional(),
  deliveryPreference: z.string().optional(),
  notes: z.string().optional(),
  website: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

function PrivacyNote() {
  return (
    <p className="text-xs text-muted-foreground border border-border rounded-md px-4 py-3">
      The information you submit will be used only to review your request and contact you about
      relevant resources or next steps.
    </p>
  );
}

export default function RequestFlowcells() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      organization: "",
      quantity: 1,
      intendedUse: "",
      labGroup: "",
      requestedDate: "",
      deliveryPreference: "",
      notes: "",
      website: "",
    },
  });

  const quantity = form.watch("quantity");
  const qty = Number(quantity);
  const validQty = Number.isInteger(qty) && qty >= 1;

  async function onSubmit(values: FormValues) {
    if (values.website) return; // honeypot
    const qty = Number(values.quantity);
    try {
      await submitToFormspree(import.meta.env.VITE_FORMSPREE_FLOWCELL_ID, {
        _subject: `New flowcell request — ${values.fullName} — ${qty} flowcell(s)`,
        _replyto: values.email,
        "Full name": values.fullName,
        "Email": values.email,
        "Organization": values.organization,
        "Quantity": `${qty} × $50 = $${qty * PRICE} estimated total`,
        "Intended use": values.intendedUse,
        ...(values.labGroup && { "Lab group": values.labGroup }),
        ...(values.requestedDate && { "Requested date": values.requestedDate }),
        ...(values.deliveryPreference && { "Delivery preference": values.deliveryPreference }),
        ...(values.notes && { "Notes": values.notes }),
      });
      setSubmitted(true);
    } catch (err: any) {
      toast({
        title: "Submission failed",
        description: err?.message ?? "Something went wrong. Please try again or contact the team directly.",
        variant: "destructive",
      });
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 pb-8">
          <div className="text-center py-16">
            <CheckCircle2 className="h-14 w-14 text-primary mx-auto mb-5" />
            <h1 className="text-2xl font-bold mb-3">Request Submitted</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Thank you. The RegenSeq team will follow up with availability and next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/community-guidelines">
                <Button variant="outline">Back to Community Guidelines</Button>
              </Link>
              <Link href="/#community">
                <Button variant="outline">Join the Community</Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-primary/10 w-10 h-10 shrink-0 flex items-center justify-center">
              <FlaskConical className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Request or Purchase Flowcells</h1>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Request flowcells for your project or purchase additional flowcells for ${PRICE} each.
            Submit the form below and the team will follow up with availability and next steps.
          </p>
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-md px-4 py-2 text-sm">
            <span className="font-semibold text-primary">Price:</span>
            <span className="text-foreground font-medium">${PRICE} per flowcell</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-8">

            {/* Honeypot — hidden from real users */}
            <div className="hidden" aria-hidden="true">
              <input {...form.register("website")} tabIndex={-1} autoComplete="off" />
            </div>

            {/* Contact information */}
            <fieldset className="space-y-5">
              <legend className="text-base font-semibold text-foreground">
                Contact information
              </legend>

              <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Smith" autoComplete="name" data-testid="input-fullName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jane@institution.edu" autoComplete="email" data-testid="input-email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="organization" render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization or institution <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="University of ..." autoComplete="organization" data-testid="input-organization" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="labGroup" render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Laboratory or research group{" "}
                    <span className="text-muted-foreground font-normal text-xs">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Smith Lab" data-testid="input-labGroup" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </fieldset>

            <hr className="border-border" />

            {/* Flowcell request details */}
            <fieldset className="space-y-5">
              <legend className="text-base font-semibold text-foreground">Flowcell request</legend>

              <FormField control={form.control} name="quantity" render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of flowcells <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
                  <FormControl>
                    <Input type="number" min={1} step={1} data-testid="input-quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                  {validQty && (
                    <p className="text-sm text-muted-foreground mt-1.5">
                      {qty} flowcell{qty !== 1 ? "s" : ""} × ${PRICE} ={" "}
                      <strong className="text-foreground">${qty * PRICE} estimated total</strong>
                    </p>
                  )}
                </FormItem>
              )} />

              <FormField control={form.control} name="intendedUse" render={({ field }) => (
                <FormItem>
                  <FormLabel>Intended use or project description <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your research project and how you plan to use the flowcells..."
                      rows={4}
                      data-testid="input-intendedUse"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="requestedDate" render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Requested date{" "}
                    <span className="text-muted-foreground font-normal text-xs">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="date" data-testid="input-requestedDate" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="deliveryPreference" render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Shipping or pickup preference{" "}
                    <span className="text-muted-foreground font-normal text-xs">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Shipping to US address, or can pick up in New York" data-testid="input-deliveryPreference" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="notes" render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Additional notes{" "}
                    <span className="text-muted-foreground font-normal text-xs">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any additional context, questions, or constraints..." rows={3} data-testid="input-notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </fieldset>

            <PrivacyNote />

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={form.formState.isSubmitting}
              data-testid="button-submit-flowcell"
            >
              {form.formState.isSubmitting
                ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Submitting…</>
                : "Submit Request"}
            </Button>
          </form>
        </Form>

        {/* Back links */}
        <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-2">
          <Link href="/community-guidelines">
            <Button variant="ghost" size="sm" data-testid="link-back-guidelines">← Community Guidelines</Button>
          </Link>
          <a href="/#community">
            <Button variant="ghost" size="sm" data-testid="link-back-community">← Join the Community</Button>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
