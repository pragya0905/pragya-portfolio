import { useState } from "react";
import clsx from "clsx";
import { CONTACT_METRIC_URL, SOCIAL_LINKS, WEB3FORMS_ACCESS_KEY } from "../../data/content";
import { trackEvent } from "../../lib/analytics";
import { Button } from "../ui/Button";

const FIELD_CLASS =
  "w-full rounded-lg border border-line bg-surface/60 px-4 py-2.5 text-ink placeholder:text-faint transition-colors duration-200 focus:border-accent focus:outline-none";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Fire-and-forget — a metrics hiccup should never affect the actual
// contact-form UX, so failures are swallowed silently.
function reportContactMetric(status) {
  fetch(CONTACT_METRIC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  }).catch(() => {});
}

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState("idle");
  const [emailTouched, setEmailTouched] = useState(false);

  const emailValid = EMAIL_PATTERN.test(form.email);
  const showEmailError = emailTouched && form.email.length > 0 && !emailValid;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Honeypot: real visitors never see or fill this field, so a checked
    // value means a bot filled every field programmatically. Silently drop
    // it rather than calling Web3Forms at all.
    if (botcheck) {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setEmailTouched(false);
      return;
    }

    if (!emailValid) {
      setEmailTouched(true);
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      const subject = encodeURIComponent(`Portfolio contact from ${form.name || "a visitor"}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${SOCIAL_LINKS.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...form, botcheck }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setEmailTouched(false);
      reportContactMetric("success");
      trackEvent("contact_form_submitted", { status: "success" });
    } catch {
      setStatus("error");
      reportContactMetric("error");
      trackEvent("contact_form_submitted", { status: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl space-y-4 text-left">
      {/* Honeypot: invisible to real visitors, catches bots that fill every
          form field programmatically. See Web3Forms' honeypot convention —
          field must be named "botcheck". */}
      <input
        type="checkbox"
        name="botcheck"
        checked={botcheck}
        onChange={(event) => setBotcheck(event.target.checked)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />

      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm text-muted">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className={FIELD_CLASS}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm text-muted">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          onBlur={() => setEmailTouched(true)}
          aria-invalid={showEmailError}
          aria-describedby={showEmailError ? "contact-email-error" : undefined}
          placeholder="you@example.com"
          className={clsx(
            FIELD_CLASS,
            showEmailError && "border-red-400 [[data-theme=light]_&]:!border-red-600",
          )}
        />
        {showEmailError && (
          <p
            id="contact-email-error"
            className="mt-1.5 text-sm text-red-400 [[data-theme=light]_&]:!text-red-600"
          >
            Enter a valid email address.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm text-muted">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="What would you like to talk about?"
          className={clsx(FIELD_CLASS, "resize-none")}
        />
      </div>

      <Button as="button" type="submit" variant="primary" disabled={status === "sending"} className="w-full">
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>

      {status === "sent" && (
        <p className="text-center text-sm text-accent" role="status">
          Message sent — thank you!
        </p>
      )}
      {status === "error" && (
        <p
          className="text-center text-sm text-red-400 [[data-theme=light]_&]:!text-red-600"
          role="alert"
        >
          Something went wrong — email {SOCIAL_LINKS.email} directly instead.
        </p>
      )}
    </form>
  );
}
