const FORM_BASE_URL = process.env.NEXT_PUBLIC_FORM_BASE_URL || "";

const FORM_ENDPOINTS: Record<string, string> = {
  contact: `${FORM_BASE_URL}/aethon-contact`,
  consultation: `${FORM_BASE_URL}/aethon-consultation`,
  newsletter: `${FORM_BASE_URL}/aethon-newsletter`,
  "job-application": `${FORM_BASE_URL}/aethon-job-application`,
};

export interface FormSubmitResult {
  success: boolean;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateForm(
  data: Record<string, string>,
  formType: string
): string | null {
  if (formType === "newsletter") {
    if (!data.email?.trim()) return "Email is required.";
    if (!EMAIL_RE.test(data.email)) return "Please enter a valid email address.";
    return null;
  }

  if (!data.name?.trim()) return "Name is required.";
  if (!data.email?.trim()) return "Email is required.";
  if (!EMAIL_RE.test(data.email)) return "Please enter a valid email address.";
  return null;
}

export async function submitForm(
  data: Record<string, string>,
  formType: string
): Promise<FormSubmitResult> {
  if (data._honeypot) {
    return { success: true };
  }

  const validationError = validateForm(data, formType);
  if (validationError) {
    return { success: false, error: validationError };
  }

  const { _honeypot: _, ...rest } = data;
  const payload = { ...rest, _formType: formType };

  const endpoint = FORM_ENDPOINTS[formType];
  if (!endpoint || !FORM_BASE_URL) {
    return {
      success: false,
      error: "Form submission is not configured. Please contact us directly at info@aethonautomation.com.",
    };
  }

  try {
    const res = await fetch(endpoint, {
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
