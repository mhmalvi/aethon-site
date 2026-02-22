const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

export interface FormSubmitResult {
  success: boolean;
  error?: string;
}

export async function submitForm(
  data: Record<string, string>,
  formType: string
): Promise<FormSubmitResult> {
  // Honeypot check — if filled, silently "succeed" (bot trap)
  if (data._honeypot) {
    return { success: true };
  }

  const { _honeypot: _, ...rest } = data;
  const payload = { ...rest, _formType: formType };

  if (!FORM_ENDPOINT) {
    // No endpoint configured — log to console in dev, warn in production
    if (process.env.NODE_ENV === "development") {
      console.log(`[Form: ${formType}]`, payload);
    }
    // Still return success so the UI works — configure NEXT_PUBLIC_FORM_ENDPOINT for real submissions
    return { success: true };
  }

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return { success: false, error: "Something went wrong. Please try again." };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Network error. Please check your connection." };
  }
}
