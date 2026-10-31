import { useState } from "react";
import PageMeta from "@/components/PageMeta";
import { apiClient, formatApiError } from "@/lib/api";
import { toast } from "sonner";
import { CheckCircle2, Upload } from "lucide-react";
import { TRADES } from "@/lib/site-data";

const TRADE_OPTIONS = [
  "Welder (6G/MIG/TIG)",
  "Electrician / Wireman",
  "Plumber / Pipefitter",
  "Construction Worker",
  "Rebar / Steel Fixer",
  "Formwork Carpenter",
  "Driver (Class 3/4/5)",
  "Airport Ground Staff",
  "MRT / Railway Worker",
  "Roadworks / Signalman",
  "Housemaid / Domestic Helper",
  "Fabricator / Rigger",
  "General Labour",
  "Other",
];

const COUNTRIES = ["India", "Bangladesh", "Sri Lanka", "Myanmar", "Nepal", "Philippines", "Other"];

export default function ApplyPage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    country: "India",
    trade: "Welder (6G/MIG/TIG)",
    experience_years: 0,
    passport_available: false,
    resume_url: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [k]: v });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...form, experience_years: Number(form.experience_years) || 0 };
      if (!payload.resume_url) delete payload.resume_url;
      await apiClient.post("/candidates", payload);
      setDone(true);
      toast.success("Application submitted. Our recruiter will contact you soon.");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <>
        <PageMeta title="Application Received | Shan Brothers" />
        <section className="bg-white py-32 min-h-[70vh] flex items-center">
          <div className="container-x mx-auto max-w-2xl text-center">
            <CheckCircle2 size={64} className="mx-auto text-red-brand" />
            <h1 className="mt-6 font-heading font-black text-4xl lg:text-5xl text-navy tracking-tighter">
              Application received.
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              Thank you, <strong className="text-navy">{form.full_name}</strong>. Our
              recruitment team will review your profile and contact you on{" "}
              <strong className="text-navy">{form.phone}</strong> within 2-3 working days.
            </p>
            <p className="mt-8 overline text-red-brand">Reference · {new Date().toLocaleDateString()}</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageMeta title="Apply for Jobs in Singapore | Shan Brothers" />
      <section className="bg-navy text-white py-20 md:py-24 grain relative overflow-hidden">
        <div className="container-x mx-auto max-w-[1400px]">
          <span className="overline text-red-brand inline-flex items-center gap-3">
            <span className="divider-red" /> For Job Seekers
          </span>
          <h1 className="mt-4 font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-[0.95] max-w-3xl">
            Work in Singapore.<br />Start with one form.
          </h1>
          <p className="mt-6 text-white/80 text-lg max-w-2xl">
            Fill in your details below. If your profile matches a live requirement, our
            recruiter will call you within 2-3 working days. No fees to apply.
          </p>
        </div>
      </section>

      <section className="bg-[#F7F7F4] py-16 md:py-24">
        <div className="container-x mx-auto max-w-3xl">
          <form
            data-testid="apply-form"
            onSubmit={submit}
            className="bg-white p-8 md:p-12 border border-slate-200"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Full Name *">
                <input
                  data-testid="apply-full-name"
                  required
                  minLength={2}
                  value={form.full_name}
                  onChange={update("full_name")}
                  className="input-brand"
                  placeholder="As per passport"
                />
              </Field>
              <Field label="Email *">
                <input
                  data-testid="apply-email"
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  className="input-brand"
                  placeholder="you@email.com"
                />
              </Field>
              <Field label="Phone (with country code) *">
                <input
                  data-testid="apply-phone"
                  required
                  value={form.phone}
                  onChange={update("phone")}
                  className="input-brand"
                  placeholder="+91 98400 12345"
                />
              </Field>
              <Field label="Country of Origin *">
                <select
                  data-testid="apply-country"
                  value={form.country}
                  onChange={update("country")}
                  className="input-brand"
                >
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Trade / Skill *">
                <select
                  data-testid="apply-trade"
                  value={form.trade}
                  onChange={update("trade")}
                  className="input-brand"
                >
                  {TRADE_OPTIONS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Years of Experience *">
                <input
                  data-testid="apply-experience"
                  type="number"
                  min="0"
                  max="60"
                  required
                  value={form.experience_years}
                  onChange={update("experience_years")}
                  className="input-brand"
                />
              </Field>
              <Field label="Resume / CV URL (optional)" className="sm:col-span-2">
                <div className="flex items-center gap-3">
                  <Upload size={18} className="text-red-brand flex-none" />
                  <input
                    data-testid="apply-resume"
                    type="url"
                    value={form.resume_url}
                    onChange={update("resume_url")}
                    className="input-brand"
                    placeholder="Paste Google Drive / Dropbox link to your CV"
                  />
                </div>
              </Field>
              <Field label="Message (optional)" className="sm:col-span-2">
                <textarea
                  data-testid="apply-message"
                  rows={4}
                  value={form.message}
                  onChange={update("message")}
                  className="input-brand resize-none"
                  placeholder="Any additional details — certifications, availability, preferred deployment date..."
                />
              </Field>
            </div>

            <label className="flex items-start gap-3 mt-8 cursor-pointer">
              <input
                data-testid="apply-passport"
                type="checkbox"
                checked={form.passport_available}
                onChange={update("passport_available")}
                className="mt-1 h-5 w-5 accent-red-600"
              />
              <span className="text-sm text-slate-700">
                I have a valid passport ready for immediate visa processing.
              </span>
            </label>

            <button
              type="submit"
              data-testid="apply-submit"
              disabled={submitting}
              className="btn-primary mt-8 w-full sm:w-auto"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>

            <p className="mt-6 text-xs text-slate-500">
              By submitting, you agree to be contacted by Shan Brothers regarding job
              opportunities. We do not charge candidates for recruitment.
            </p>
          </form>
        </div>
      </section>

      <style>{`
        .input-brand {
          width: 100%;
          border: none;
          border-bottom: 2px solid #E2E8F0;
          background: transparent;
          padding: 0.75rem 0;
          font-size: 1rem;
          color: #0B1F4D;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-brand:focus { border-color: #C8102E; }
        .input-brand::placeholder { color: #94A3B8; }
      `}</style>
    </>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-bold text-navy uppercase tracking-widest mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}
