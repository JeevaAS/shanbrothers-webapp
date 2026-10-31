import PageMeta from "@/components/PageMeta";
import { ServicesBand, ProcessBand, IndustriesBand } from "@/components/HomeSections";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ServicesPage() {
  return (
    <>
      <PageMeta title="Services | Shan Brothers Manpower Consultants" />
      <section className="bg-navy text-white py-24 md:py-32 grain relative overflow-hidden">
        <div className="container-x mx-auto max-w-[1400px]">
          <span className="overline text-red-brand inline-flex items-center gap-3">
            <span className="divider-red" /> What we do
          </span>
          <h1 className="mt-6 font-heading font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[0.92] max-w-4xl">
            The full pipeline.<br />From CV to construction site.
          </h1>
          <p className="mt-8 text-lg text-white/80 max-w-3xl">
            Six services, one continuous handoff-free workflow. Whether you need 3 electricians
            or 300 shipyard welders — the process is the same.
          </p>
        </div>
      </section>
      <ServicesBand />
      <ProcessBand />
      <IndustriesBand />
      <section className="bg-white py-24">
        <div className="container-x mx-auto max-w-[1200px] text-center">
          <h2 className="font-heading font-black text-3xl lg:text-5xl text-navy tracking-tighter">
            Ready to brief us?
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            Share your project requirements — we'll respond with a manpower plan within 24 hours.
          </p>
          <Link to="/hire" data-testid="services-cta" className="btn-primary mt-8">
            Request Manpower <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
