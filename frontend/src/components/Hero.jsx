import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { COMPANY } from "@/lib/site-data";

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative overflow-hidden bg-navy text-white"
      style={{ minHeight: "88vh" }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg"
          alt="Singapore skyline"
          className="w-full h-full object-cover opacity-30"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(11,31,77,0.94) 0%, rgba(11,31,77,0.78) 55%, rgba(11,31,77,0.55) 100%)",
          }}
        />
      </div>

      <div className="relative container-x mx-auto max-w-[1400px] pt-20 pb-24 lg:pt-32 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Text */}
          <div className="lg:col-span-7 anim-fade-up">
            <span
              className="overline text-red-brand inline-flex items-center gap-3"
              data-testid="hero-overline"
            >
              <span className="divider-red" /> Singapore · India · Since {COMPANY.founded}
            </span>
            <h1 className="mt-6 font-heading font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] tracking-tighter">
              Right Talent.<br />
              Right Time.<br />
              <span className="text-red-brand">Right Place.</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              We supply skilled blue-collar workers — welders, electricians, drivers,
              construction crews and more — from India to Singapore's most demanding job
              sites. Interviews, visas, tickets — handled end-to-end.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/hire" data-testid="hero-hire-btn" className="btn-primary">
                Hire Manpower <ArrowRight size={18} />
              </Link>
              <Link
                to="/apply"
                data-testid="hero-apply-btn"
                className="btn-outline border-white text-white hover:bg-white hover:text-navy"
                style={{ borderColor: "#fff", color: "#fff" }}
              >
                Apply for a Job <ArrowUpRight size={18} />
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80">
              {["MOM-compliant", "Trade-tested workers", "Zero-delay deployment"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-red-brand" />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Right: Stats card */}
          <div className="lg:col-span-5 anim-fade-up delay-2">
            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
              {[
                { k: "4,200+", v: "Workers Deployed" },
                { k: "180+", v: "Partner Companies" },
                { k: "6", v: "Source Countries" },
                { k: `${COMPANY.stats.years}+`, v: "Years in Business" },
              ].map((s, i) => (
                <div
                  key={i}
                  data-testid={`hero-stat-${i}`}
                  className="bg-navy p-8 lg:p-10 hover:bg-[#0d2757] transition-colors"
                >
                  <p className="font-heading font-black text-4xl lg:text-5xl text-red-brand tracking-tighter">
                    {s.k}
                  </p>
                  <p className="mt-2 text-sm text-white/70">{s.v}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-6 bg-red-brand text-white">
              <p className="overline text-white/80">Now Mobilising</p>
              <p className="mt-2 font-heading font-bold text-lg leading-snug">
                200+ welders & fitters ready for immediate deployment to Singapore
                shipyards & construction projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative border-t border-white/10 bg-navy overflow-hidden">
        <div className="flex whitespace-nowrap marquee-track py-4">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex items-center gap-10 pr-10">
              {[
                "Welders",
                "Electricians",
                "Plumbers",
                "Drivers",
                "Construction Workers",
                "Airport Ground Staff",
                "MRT & Rail Workers",
                "Domestic Helpers",
                "Fabricators",
                "Roadworks Crew",
              ].map((t) => (
                <span key={t + k} className="flex items-center gap-10">
                  <span className="font-heading font-bold text-2xl text-white/40 tracking-tight">
                    {t}
                  </span>
                  <span className="h-1.5 w-1.5 bg-red-brand rounded-full" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
