import { useState } from "react";
import PageMeta from "@/components/PageMeta";
import { COMPANY } from "@/lib/site-data";
import { apiClient, formatApiError } from "@/lib/api";
import { Mail, Phone, MapPin, MessageCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...form };
      if (!payload.phone) delete payload.phone;
      await apiClient.post("/contacts", payload);
      setDone(true);
      toast.success("Message sent. We'll reply within 1 working day.");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || "Failed to send.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageMeta title="Contact | Shan Brothers Manpower Consultants" />
      <section className="bg-navy text-white py-24 md:py-32 grain relative overflow-hidden">
        <div className="container-x mx-auto max-w-[1400px]">
          <span className="overline text-red-brand inline-flex items-center gap-3">
            <span className="divider-red" /> Get in touch
          </span>
          <h1 className="mt-6 font-heading font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[0.92] max-w-3xl">
            Two offices.<br />One WhatsApp away.
          </h1>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-x mx-auto max-w-[1200px] grid lg:grid-cols-12 gap-16">
          {/* Info panel */}
          <aside className="lg:col-span-5 space-y-10">
            {[COMPANY.hq, COMPANY.branch].map((office, i) => (
              <div key={i} data-testid={`contact-office-${i}`}>
                <span className="overline text-red-brand">
                  {i === 0 ? "Singapore · HQ" : "India · Sourcing"}
                </span>
                <h2 className="mt-3 font-heading font-black text-3xl text-navy tracking-tight">
                  {office.city}
                </h2>
                {office.entity && (
                  <p className="mt-2 text-sm font-semibold text-red-brand">{office.entity}</p>
                )}
                <div className="mt-5 space-y-3 text-slate-700">
                  <p className="flex gap-3"><MapPin size={18} className="text-red-brand flex-none mt-1" />{office.address}</p>
                  <a href={`tel:${office.phone}`} className="flex gap-3 hover:text-red-brand"><Phone size={18} className="text-red-brand flex-none mt-1" />{office.phone}</a>
                  <a href={`mailto:${office.email}`} className="flex gap-3 hover:text-red-brand"><Mail size={18} className="text-red-brand flex-none mt-1" />{office.email}</a>
                </div>
              </div>
            ))}
            <a
              href={COMPANY.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              data-testid="whatsapp-cta"
              className="btn-primary w-full justify-center"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </aside>

          {/* Form */}
          <div className="lg:col-span-7">
            {done ? (
              <div data-testid="contact-success" className="bg-[#F7F7F4] border border-slate-200 p-10 text-center">
                <CheckCircle2 size={48} className="mx-auto text-red-brand" />
                <h2 className="mt-4 font-heading font-black text-3xl text-navy tracking-tighter">
                  Message sent.
                </h2>
                <p className="mt-3 text-slate-600">
                  Thank you, <strong className="text-navy">{form.name}</strong>. We'll reply
                  to <strong className="text-navy">{form.email}</strong> within 1 working day.
                </p>
              </div>
            ) : (
              <form data-testid="contact-form" onSubmit={submit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Your Name *">
                    <input data-testid="contact-name" required value={form.name} onChange={upd("name")} className="input-brand" />
                  </Field>
                  <Field label="Email *">
                    <input data-testid="contact-email" required type="email" value={form.email} onChange={upd("email")} className="input-brand" />
                  </Field>
                  <Field label="Phone (optional)">
                    <input data-testid="contact-phone" value={form.phone} onChange={upd("phone")} className="input-brand" />
                  </Field>
                  <Field label="Subject *">
                    <input data-testid="contact-subject" required value={form.subject} onChange={upd("subject")} className="input-brand" />
                  </Field>
                </div>
                <Field label="Message *">
                  <textarea data-testid="contact-message" required rows={6} value={form.message} onChange={upd("message")} className="input-brand resize-none" />
                </Field>
                <button data-testid="contact-submit" type="submit" disabled={submitting} className="btn-primary">
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .input-brand {
          width: 100%; border: none; border-bottom: 2px solid #E2E8F0;
          background: transparent; padding: 0.75rem 0; font-size: 1rem;
          color: #0B1F4D; outline: none; transition: border-color 0.2s;
        }
        .input-brand:focus { border-color: #C8102E; }
        .input-brand::placeholder { color: #94A3B8; }
      `}</style>
    </>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-navy uppercase tracking-widest mb-1">{label}</span>
      {children}
    </label>
  );
}
