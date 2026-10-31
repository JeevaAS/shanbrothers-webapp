import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight, Linkedin, Facebook } from "lucide-react";
import { COMPANY, LOGO_URL } from "@/lib/site-data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-testid="site-footer" className="bg-navy text-white relative overflow-hidden grain">
      <div className="container-x mx-auto max-w-[1400px] pt-20 pb-8">
        {/* CTA band */}
        <div className="border-b border-white/10 pb-16 mb-14 grid lg:grid-cols-2 gap-10 items-end">
          <div>
            <span className="overline text-red-brand">Let's talk manpower</span>
            <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.95] mt-4 tracking-tighter">
              Ready to hire<br />
              <span className="text-red-brand">the right team?</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
            <Link to="/hire" data-testid="footer-hire-cta" className="btn-primary">
              Request Manpower <ArrowUpRight size={18} />
            </Link>
            <Link
              to="/apply"
              data-testid="footer-apply-cta"
              className="btn-outline border-white text-white hover:bg-white hover:text-navy"
              style={{ borderColor: "#fff", color: "#fff" }}
            >
              Apply for Job <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <img src={LOGO_URL} alt="Shan Brothers" className="h-20 w-20 object-contain bg-white p-1.5" width="256" height="256" decoding="async" />
              <div>
                <p className="font-heading font-black text-xl leading-tight">SHAN BROTHERS</p>
                <p className="overline text-red-brand text-[0.6rem]">Manpower Consultants</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Bridging skilled hands from India to Singapore since {COMPANY.founded}. Ethical recruitment, MOM-compliant, on-time deployment.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href={COMPANY.socials.linkedin}
                data-testid="footer-linkedin"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="h-10 w-10 border border-white/20 flex items-center justify-center hover:bg-red-brand hover:border-red-brand transition"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={COMPANY.socials.facebook}
                data-testid="footer-facebook"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="h-10 w-10 border border-white/20 flex items-center justify-center hover:bg-red-brand hover:border-red-brand transition"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Singapore HQ */}
          <div>
            <p className="overline text-red-brand mb-4">Singapore · HQ</p>
            <div className="space-y-3 text-sm text-white/80">
              <p className="font-semibold text-white">{COMPANY.hq.entity}</p>
              <p className="flex gap-3">
                <MapPin size={16} className="mt-0.5 flex-none text-red-brand" />
                <span>{COMPANY.hq.address}</span>
              </p>
              <a href={`tel:${COMPANY.hq.phone}`} className="flex gap-3 hover:text-white">
                <Phone size={16} className="mt-0.5 flex-none text-red-brand" />
                <span>{COMPANY.hq.phone}</span>
              </a>
              <a href={`mailto:${COMPANY.hq.email}`} className="flex gap-3 hover:text-white">
                <Mail size={16} className="mt-0.5 flex-none text-red-brand" />
                <span>{COMPANY.hq.email}</span>
              </a>
            </div>
          </div>

          {/* India Branch */}
          <div>
            <p className="overline text-red-brand mb-4">India · Sourcing Office</p>
            <div className="space-y-3 text-sm text-white/80">
              <p className="flex gap-3">
                <MapPin size={16} className="mt-0.5 flex-none text-red-brand" />
                <span>{COMPANY.branch.address}</span>
              </p>
              <a href={`tel:${COMPANY.branch.phone}`} className="flex gap-3 hover:text-white">
                <Phone size={16} className="mt-0.5 flex-none text-red-brand" />
                <span>{COMPANY.branch.phone}</span>
              </a>
              <a href={`mailto:${COMPANY.branch.email}`} className="flex gap-3 hover:text-white">
                <Mail size={16} className="mt-0.5 flex-none text-red-brand" />
                <span>{COMPANY.branch.email}</span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="overline text-red-brand mb-4">Quick Links</p>
            <ul className="space-y-3 text-sm text-white/80">
              {[
                { to: "/about", label: "About Us" },
                { to: "/services", label: "Our Services" },
                { to: "/trades", label: "Trades & Job Categories" },
                { to: "/apply", label: "Apply for a Job" },
                { to: "/hire", label: "Hire Manpower" },
                { to: "/contact", label: "Contact" },
                { to: "/admin/login", label: "Admin Portal" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-red-brand transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/60">
          <p>© {year} Shan Brothers Management Pte Ltd. All rights reserved.</p>
          <p className="overline text-white/60 text-[0.6rem]">
            EA Licence · MOM Compliant · Ethical Recruitment
          </p>
        </div>
      </div>
    </footer>
  );
}
