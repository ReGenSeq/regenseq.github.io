// Formspree submission helper
// Formspree forwards each submission to the email address configured on the form.
// Endpoint format: https://formspree.io/f/{FORM_ID}
// Form IDs are set via VITE_FORMSPREE_FLOWCELL_ID and VITE_FORMSPREE_SEQUENCER_ID.

export async function submitToFormspree(
  formId: string | undefined,
  data: Record<string, unknown>,
): Promise<void> {
  if (!formId) {
    throw new Error(
      "Formspree form ID is not configured. " +
      "Set VITE_FORMSPREE_FLOWCELL_ID or VITE_FORMSPREE_SEQUENCER_ID in your environment.",
    );
  }

  const res = await fetch(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok || !json.ok) {
    const msg = json?.errors?.[0]?.message ?? "Submission failed. Please try again.";
    throw new Error(msg);
  }
}
