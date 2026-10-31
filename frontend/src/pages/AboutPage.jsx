import PageMeta from "@/components/PageMeta";
import { COMPANY } from "@/lib/site-data";
import { CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <PageMeta title="About | Shan Brothers Manpower Consultants" />
      <section className="bg-navy text-white py-24 md:py-32 relative overflow-hidden grain">
        <div className="container-x mx-auto max-w-[1400px]">
          <span className="overline text-red-brand inline-flex items-center gap-3">
            <span className="divider-red" /> About Shan Brothers
          </span>
          <h1 className="mt-6 font-heading font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[0.92] max-w-4xl">
            Building Singapore, one skilled worker at a time.
          </h1>
          <p className="mt-8 text-lg lg:text-xl text-white/80 max-w-3xl leading-relaxed">
            Founded in {COMPANY.founded}, Shan Brothers Manpower Consultants was born from a
            simple frustration — Singapore's job sites needed reliable workers, and India's
            skilled tradespeople needed a fair, transparent path abroad. So we built the
            bridge ourselves.
          </p>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-x mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="overline text-red-brand">Our Mission</span>
            <h2 className="mt-4 font-heading font-black text-3xl lg:text-4xl text-navy tracking-tight leading-tight">
              To supply Singapore with work-ready manpower — ethically, compliantly, on time.
            </h2>
            <p className="mt-6 text-slate-700 leading-relaxed">
              We believe recruitment is not about numbers. It's about the right person, on
              the right site, at the right time — with dignity intact on both sides of the
              transaction.
            </p>
          </div>
          <div>
            <span className="overline text-red-brand">Our Values</span>
            <ul className="mt-4 space-y-4">
              {[
                { k: "Ethical Recruitment", v: "Workers pay only regulated costs. Employers pay the recruitment fee." },
                { k: "MOM Compliance", v: "Every deployment follows Ministry of Manpower rules to the letter." },
                { k: "Trade Testing", v: "No candidate is shortlisted without a hands-on skills verification." },
                { k: "Long-term Aftercare", v: "We stay involved after deployment. Worker welfare is not optional." },
              ].map((v) => (
                <li key={v.k} className="flex gap-4">
                  <CheckCircle2 size={22} className="flex-none text-red-brand mt-1" />
                  <div>
                    <p className="font-heading font-bold text-navy text-lg tracking-tight">
                      {v.k}
                    </p>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">{v.v}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F4] py-24 md:py-32">
        <div className="container-x mx-auto max-w-[1400px]">
          <span className="overline text-red-brand">Our Offices</span>
          <h2 className="mt-4 font-heading font-black text-4xl lg:text-5xl text-navy tracking-tighter">
            Two offices. One team.
          </h2>
          <div className="mt-12 grid md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
            {[COMPANY.hq, COMPANY.branch].map((office, i) => (
              <div key={i} className="bg-white p-10">
                <span className="overline text-red-brand">
                  {i === 0 ? "Headquarters" : "Sourcing Office"}
                </span>
                <h3 className="mt-3 font-heading font-black text-3xl text-navy tracking-tight">
                  {office.city}
                </h3>
                {office.entity && (
                  <p className="mt-2 text-sm font-semibold text-red-brand">{office.entity}</p>
                )}
                <p className="mt-4 text-slate-600 leading-relaxed">{office.address}</p>
                <div className="mt-6 space-y-1 text-sm">
                  <p><span className="text-slate-500">Phone:</span> <a href={`tel:${office.phone}`} className="text-navy font-semibold hover:text-red-brand">{office.phone}</a></p>
                  <p><span className="text-slate-500">Email:</span> <a href={`mailto:${office.email}`} className="text-navy font-semibold hover:text-red-brand">{office.email}</a></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
