import { useState } from "react";
import PageMeta from "@/components/PageMeta";
import { apiClient, formatApiError } from "@/lib/api";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

const TRADES = [
  "Welders", "Electricians", "Plumbers", "Construction Workers",
  "Drivers", "Airport Ground Staff", "Railway / MRT",
  "Domestic Helpers", "Roadworks Crew", "Fabricators", "General Labour", "Mixed - see message",
];
const TIMELINES = ["Within 4 weeks", "1-2 months", "2-3 months", "3+ months", "Ongoing / flexible"];

export default function HirePage() {
  const [form, setForm] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    country: "Singapore",
    workers_needed: 10,
    trade_needed: TRADES[0],
    deployment_timeline: TIMELINES[0],
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiClient.post("/employers", {
        ...form,
        workers_needed: Number(form.workers_needed) || 1,
      });
      setDone(true);
      toast.success("Enquiry received. We'll respond within 24 hours.");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <>
        <PageMeta title="Enquiry Received | Shan Brothers" />
        <section className="bg-white py-32 min-h-[70vh] flex items-center">
          <div className="container-x mx-auto max-w-2xl text-center">
            <CheckCircle2 size={64} className="mx-auto text-red-brand" />
            <h1 className="mt-6 font-heading font-black text-4xl lg:text-5xl text-navy tracking-tighter">
              Thanks, {form.contact_person}.
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              Your manpower enquiry for <strong className="text-navy">{form.company_name}</strong> has been received.
              A senior consultant will call you at <strong className="text-navy">{form.phone}</strong> within 24 hours.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageMeta title="Hire Manpower | Shan Brothers Consultants" />
      <section className="bg-navy text-white py-20 md:py-24 grain relative overflow-hidden">
        <div className="container-x mx-auto max-w-[1400px]">
          <span className="overline text-red-brand inline-flex items-center gap-3">
            <span className="divider-red" /> For Employers
          </span>
          <h1 className="mt-4 font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-[0.95] max-w-3xl">
            Tell us what you need.<br />We'll mobilise the team.
          </h1>
          <p className="mt-6 text-white/80 text-lg max-w-2xl">
            Submit your manpower requirement below. A senior consultant will contact you
            within 24 hours with candidate profiles and a deployment plan.
          </p>
        </div>
      </section>

      <section className="bg-[#F7F7F4] py-16 md:py-24">
        <div className="container-x mx-auto max-w-3xl">
          <form
            data-testid="hire-form"
            onSubmit={submit}
            className="bg-white p-8 md:p-12 border border-slate-200"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Company Name *">
                <input data-testid="hire-company" required value={form.company_name} onChange={update("company_name")} className="input-brand" placeholder="ACME Construction Pte Ltd" />
              </Field>
              <Field label="Contact Person *">
                <input data-testid="hire-contact" required value={form.contact_person} onChange={update("contact_person")} className="input-brand" placeholder="Your name" />
              </Field>
              <Field label="Business Email *">
                <input data-testid="hire-email" required type="email" value={form.email} onChange={update("email")} className="input-brand" placeholder="you@company.sg" />
              </Field>
              <Field label="Phone *">
                <input data-testid="hire-phone" required value={form.phone} onChange={update("phone")} className="input-brand" placeholder="+65 8123 4567" />
              </Field>
              <Field label="Country">
                <input data-testid="hire-country" value={form.country} onChange={update("country")} className="input-brand" />
              </Field>
              <Field label="Number of Workers Needed *">
                <input data-testid="hire-workers" required type="number" min="1" value={form.workers_needed} onChange={update("workers_needed")} className="input-brand" />
              </Field>
              <Field label="Trade / Category *">
                <select data-testid="hire-trade" value={form.trade_needed} onChange={update("trade_needed")} className="input-brand">
                  {TRADES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Deployment Timeline">
                <select data-testid="hire-timeline" value={form.deployment_timeline} onChange={update("deployment_timeline")} className="input-brand">
                  {TIMELINES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Project Details / Message" className="sm:col-span-2">
                <textarea
                  data-testid="hire-message"
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  className="input-brand resize-none"
                  placeholder="Project location, work permit availability, accommodation setup, specific certifications required..."
                />
              </Field>
            </div>

            <button type="submit" data-testid="hire-submit" disabled={submitting} className="btn-primary mt-8 w-full sm:w-auto">
              {submitting ? "Submitting..." : "Submit Enquiry"}
            </button>

            <p className="mt-6 text-xs text-slate-500">
              Your information is confidential and used only for this enquiry. No spam, ever.
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
