import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LOGO_URL, COMPANY } from "@/lib/site-data";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/trades", label: "Trades" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200"
          : "bg-white/80 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="container-x mx-auto max-w-[1400px] flex items-center justify-between h-24">
        <Link to="/" data-testid="header-logo-link" className="flex items-center gap-4 group">
          <img
            src={LOGO_URL}
            alt="Shan Brothers Manpower Consultants"
            className="h-20 w-20 md:h-24 md:w-24 object-contain"
            width="256"
            height="256"
            loading="eager"
            decoding="async"
          />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-heading font-black text-navy text-xl md:text-2xl tracking-tight">
              SHAN BROTHERS
            </span>
            <span className="overline text-red-brand" style={{ fontSize: "0.6rem" }}>
              Manpower Consultants · Singapore
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              data-testid={`nav-${item.label.toLowerCase()}`}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
                  isActive ? "text-red-brand" : "text-navy hover:text-red-brand"
                }`
              }
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/apply"
            data-testid="nav-apply-btn"
            className="text-sm font-semibold text-navy hover:text-red-brand transition"
          >
            Apply for Jobs
          </Link>
          <Link to="/hire" data-testid="nav-hire-btn" className="btn-primary text-sm px-6 py-3">
            Hire Talent
          </Link>
        </div>

        <button
          type="button"
          data-testid="mobile-menu-toggle"
          className="lg:hidden text-navy p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div data-testid="mobile-menu" className="lg:hidden border-t border-slate-200 bg-white">
          <div className="container-x mx-auto py-6 flex flex-col gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-3 py-3 text-base font-semibold border-b border-slate-100 ${
                    isActive ? "text-red-brand" : "text-navy"
                  }`
                }
                end={item.to === "/"}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex gap-3 mt-4">
              <Link to="/apply" data-testid="mobile-apply-btn" className="btn-outline flex-1 text-sm">
                Apply
              </Link>
              <Link to="/hire" data-testid="mobile-hire-btn" className="btn-primary flex-1 text-sm">
                Hire Talent
              </Link>
            </div>
            <p className="mt-4 overline text-red-brand text-[0.6rem]">
              {COMPANY.hq.phone} · {COMPANY.branch.phone}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
