import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/site-data";

export default function FAQBand() {
  const [open, setOpen] = useState(0);
  return (
    <section data-testid="faq-band" className="bg-white py-24 md:py-32 border-t border-slate-100">
      <div className="container-x mx-auto max-w-[1200px]">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <span className="overline text-red-brand inline-flex items-center gap-3">
              <span className="divider-red" /> Frequently Asked
            </span>
            <h2 className="mt-6 font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-navy tracking-tighter leading-[0.95]">
              Straight answers.<br />No fine print.
            </h2>
            <p className="mt-6 text-slate-600">
              Have another question? Reach us on WhatsApp or email — we usually reply
              within a few hours.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-slate-200">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={i} className="border-b border-slate-200">
                    <button
                      type="button"
                      data-testid={`faq-toggle-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="w-full flex items-center justify-between text-left py-6 group"
                    >
                      <span className="font-heading font-bold text-lg lg:text-xl text-navy tracking-tight pr-6">
                        {f.q}
                      </span>
                      <ChevronDown
                        size={22}
                        className={`text-red-brand flex-none transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen ? "max-h-96 pb-6" : "max-h-0"
                      }`}
                    >
                      <p className="text-slate-600 leading-relaxed pr-8">{f.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
