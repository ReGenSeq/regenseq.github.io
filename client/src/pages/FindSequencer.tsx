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
import { CheckCircle2, Loader2, Search } from "lucide-react";
import { submitToFormspree } from "@/lib/formspree";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().min(1, "Organization or institution is required"),
  location: z.string().min(1, "Location is required"),
  whatYouWantToDo: z.string().min(10, "Please describe what you want to accomplish (at least 10 characters)"),
  city: z.string().optional(),
  stateRegion: z.string().optional(),
  country: z.string().optional(),
  preferredTravelDistance: z.string().optional(),
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

export default function FindSequencer() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      organization: "",
      location: "",
      whatYouWantToDo: "",
      city: "",
      stateRegion: "",
      country: "",
      preferredTravelDistance: "",
      website: "",
    },
  });

  async function onSubmit(values: FormValues) {
    if (values.website) return; // honeypot
    const locationStr = [values.city, values.stateRegion, values.country]
      .filter(Boolean).join(", ") || values.location;
    try {
      await submitToFormspree(import.meta.env.VITE_FORMSPREE_SEQUENCER_ID, {
        _subject: `Sequencer help request — ${values.fullName} — ${locationStr}`,
        _replyto: values.email,
        "Full name": values.fullName,
        "Email": values.email,
        "Organization": values.organization,
        "Location": locationStr,
        ...(values.preferredTravelDistance && { "Preferred travel distance": values.preferredTravelDistance }),
        "Goal": values.whatYouWantToDo,
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
              Thank you. Your information has been passed to the team and someone will be in touch to explore suitable options.
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
              <Search className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Help Find a Sequencer</h1>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Tell us who you are, where you are located, and what you want to accomplish.
            We will use this information to help identify a suitable sequencer or sequencing resource.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-8">

            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <input {...form.register("website")} tabIndex={-1} autoComplete="off" />
            </div>

            {/* About you */}
            <fieldset className="space-y-5">
              <legend className="text-base font-semibold text-foreground">About you</legend>

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
            </fieldset>

            <hr className="border-border" />

            {/* Location */}
            <fieldset className="space-y-5">
              <legend className="text-base font-semibold text-foreground">Where are you located?</legend>

              <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem>
                  <FormLabel>Location <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="City, State, Country" data-testid="input-location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem>
                    <FormLabel>City <span className="text-muted-foreground font-normal text-xs">(optional)</span></FormLabel>
                    <FormControl><Input placeholder="Boston" data-testid="input-city" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="stateRegion" render={({ field }) => (
                  <FormItem>
                    <FormLabel>State / region <span className="text-muted-foreground font-normal text-xs">(optional)</span></FormLabel>
                    <FormControl><Input placeholder="Massachusetts" data-testid="input-stateRegion" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="country" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country <span className="text-muted-foreground font-normal text-xs">(optional)</span></FormLabel>
                    <FormControl><Input placeholder="United States" data-testid="input-country" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="preferredTravelDistance" render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred travel distance <span className="text-muted-foreground font-normal text-xs">(optional)</span></FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Within 50 miles, open to remote collaboration" data-testid="input-travelDistance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </fieldset>

            <hr className="border-border" />

            {/* Goal */}
            <fieldset className="space-y-5">
              <legend className="text-base font-semibold text-foreground">What do you want to accomplish?</legend>

              <FormField control={form.control} name="whatYouWantToDo" render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Briefly describe what you are trying to accomplish..."
                      rows={4}
                      data-testid="input-goal"
                      {...field}
                    />
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
              data-testid="button-submit-sequencer"
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
