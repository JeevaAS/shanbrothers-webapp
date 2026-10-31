import { Link } from "react-router-dom";
import {
  Users,
  ClipboardCheck,
  FileCheck,
  Stethoscope,
  Plane,
  Handshake,
  ArrowUpRight,
} from "lucide-react";
import { SERVICES, PROCESS_STEPS, TRADES, TESTIMONIALS, INDUSTRIES_SERVED, COMPANY } from "@/lib/site-data";

const ICONS = {
  Users, ClipboardCheck, FileCheck, Stethoscope, Plane, HandshakeIcon: Handshake,
};

export function AboutBand() {
  return (
    <section data-testid="about-band" className="bg-white py-24 md:py-32 relative">
      <div className="container-x mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-14 items-start">
        <div className="lg:col-span-5">
          <span className="overline text-red-brand inline-flex items-center gap-3">
            <span className="divider-red" /> About Us
          </span>
          <h2 className="mt-6 font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-navy tracking-tighter leading-[0.95]">
            Two countries.<br />One promise.
          </h2>
        </div>
        <div className="lg:col-span-7 space-y-6 text-slate-700 text-lg leading-relaxed">
          <p>
            <strong className="text-navy">Shan Brothers Manpower Consultants</strong> is a
            Singapore-headquartered recruitment consultancy specialising in blue-collar and
            skilled trades manpower. Since {COMPANY.founded}, we've helped Singapore's most
            demanding employers — shipyards, construction majors, MEP contractors and
            facilities operators — find the workers they need, on time and to spec.
          </p>
          <p>
            Our India sourcing office in Hosur, Tamil Nadu runs a continuous pipeline of trade-tested
            candidates from Tamil Nadu, Andhra Pradesh, Bihar and beyond. We handle every
            step — interview, medical, visa, ticket, airport pickup — so employers get
            work-ready teams and candidates get a safe, transparent path abroad.
          </p>
          <div className="pt-4 grid sm:grid-cols-3 gap-6 border-t border-slate-200">
            {[
              { k: "Ethical", v: "No worker-side recruitment fees beyond regulated costs." },
              { k: "Compliant", v: "MOM Work Permit / S-Pass documentation done right." },
              { k: "Reliable", v: "Replacement guarantee and long-term aftercare." },
            ].map((x) => (
              <div key={x.k} className="pt-6">
                <p className="font-heading font-bold text-navy text-xl">{x.k}</p>
                <p className="mt-2 text-sm text-slate-600">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesBand() {
  return (
    <section data-testid="services-band" className="bg-[#F7F7F4] py-24 md:py-32 relative">
      <div className="container-x mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <span className="overline text-red-brand inline-flex items-center gap-3">
              <span className="divider-red" /> Our Services
            </span>
            <h2 className="mt-6 font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-navy tracking-tighter leading-[0.95]">
              End-to-end. No handoffs. No surprises.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-slate-600 text-lg">
              From the first requirement briefing to the worker's first day on site — we own the entire pipeline.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || Users;
            return (
              <div
                key={s.id}
                data-testid={`service-card-${s.id}`}
                className="group bg-white p-8 lg:p-10 hover:bg-navy transition-colors duration-300 cursor-default relative"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="font-heading font-black text-red-brand text-2xl">
                    0{i + 1}
                  </span>
                  <div className="h-14 w-14 border-2 border-navy group-hover:border-red-brand flex items-center justify-center transition-colors">
                    <Icon size={22} className="text-navy group-hover:text-red-brand transition" />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-2xl text-navy group-hover:text-white transition-colors tracking-tight leading-tight">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm text-slate-600 group-hover:text-white/70 transition-colors leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProcessBand() {
  return (
    <section data-testid="process-band" className="bg-white py-24 md:py-32">
      <div className="container-x mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <span className="overline text-red-brand inline-flex items-center gap-3">
              <span className="divider-red" /> Our Process
            </span>
            <h2 className="mt-6 font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-navy tracking-tighter leading-[0.95]">
              From requirement to<br />deployment.
            </h2>
          </div>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-slate-200" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 relative">
            {PROCESS_STEPS.map((step) => (
              <div key={step.n} data-testid={`process-step-${step.n}`} className="relative">
                <div className="h-20 w-20 bg-navy text-white flex items-center justify-center font-heading font-black text-3xl relative z-10">
                  {step.n}
                </div>
                <h4 className="mt-6 font-heading font-bold text-lg text-navy tracking-tight">
                  {step.title}
                </h4>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TradesBand() {
  return (
    <section data-testid="trades-band" className="bg-navy text-white py-24 md:py-32 relative overflow-hidden grain">
      <div className="container-x mx-auto max-w-[1400px] relative">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <span className="overline text-red-brand inline-flex items-center gap-3">
              <span className="divider-red" /> Trades We Supply
            </span>
            <h2 className="mt-6 font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-[0.95]">
              Skilled hands.<br />Every trade.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-white/70 text-lg">
              From Class 3 drivers to 6G structural welders — if the job is on a Singapore site, we can staff it.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRADES.map((t, i) => (
            <Link
              to="/trades"
              key={t.title}
              data-testid={`trade-card-${i}`}
              className="group block relative overflow-hidden aspect-[4/5] border border-white/10"
            >
              <img
                src={t.image}
                alt={t.title}
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,31,77,0.15) 0%, rgba(11,31,77,0.85) 70%, rgba(11,31,77,0.95) 100%)",
                }}
              />
              <div className="relative h-full flex flex-col justify-end p-6">
                <span className="overline text-red-brand mb-3">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-heading font-black text-2xl leading-tight tracking-tight">
                  {t.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.65rem] uppercase tracking-wider font-semibold px-2 py-1 bg-white/10 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight
                  size={22}
                  className="absolute top-6 right-6 text-white/50 group-hover:text-red-brand transition"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IndustriesBand() {
  return (
    <section data-testid="industries-band" className="bg-[#F7F7F4] py-20">
      <div className="container-x mx-auto max-w-[1400px]">
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-10">
          <span className="overline text-red-brand inline-flex items-center gap-3">
            <span className="divider-red" /> Industries we serve
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
          {INDUSTRIES_SERVED.map((ind, i) => (
            <div
              key={ind}
              data-testid={`industry-${i}`}
              className="bg-white p-6 hover:bg-navy hover:text-white transition-colors group cursor-default"
            >
              <p className="font-heading font-bold text-base text-navy group-hover:text-white transition-colors">
                {ind}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsBand() {
  return (
    <section data-testid="testimonials-band" className="bg-white py-24 md:py-32">
      <div className="container-x mx-auto max-w-[1400px]">
        <div className="mb-16">
          <span className="overline text-red-brand inline-flex items-center gap-3">
            <span className="divider-red" /> Client & Candidate Voices
          </span>
          <h2 className="mt-6 font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-navy tracking-tighter leading-[0.95] max-w-3xl">
            Trusted by shipyards, contractors and workers alike.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} data-testid={`testimonial-${i}`} className="bg-white p-8 lg:p-10">
              <span className="font-heading font-black text-6xl text-red-brand leading-none">
                &ldquo;
              </span>
              <p className="mt-4 text-slate-700 leading-relaxed">
                {t.quote}
              </p>
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="font-heading font-bold text-navy">{t.name}</p>
                <p className="text-sm text-slate-600">{t.role}</p>
                <p className="text-xs uppercase tracking-wider text-red-brand mt-1 font-semibold">
                  {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
