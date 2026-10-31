import PageMeta from "@/components/PageMeta";
import { TradesBand, IndustriesBand } from "@/components/HomeSections";

export default function TradesPage() {
  return (
    <>
      <PageMeta title="Trades & Job Categories | Shan Brothers Manpower" />
      <section className="bg-navy text-white py-24 md:py-32 grain relative overflow-hidden">
        <div className="container-x mx-auto max-w-[1400px]">
          <span className="overline text-red-brand inline-flex items-center gap-3">
            <span className="divider-red" /> Trades & Job Categories
          </span>
          <h1 className="mt-6 font-heading font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[0.92] max-w-4xl">
            Every trade Singapore needs.<br />We mobilise.
          </h1>
          <p className="mt-8 text-lg text-white/80 max-w-3xl">
            From certified 6G structural welders to Class 4 lorry drivers, from ramp
            agents at Changi to housemaids for HDB households — we recruit, test and
            deploy across the full blue-collar spectrum.
          </p>
        </div>
      </section>
      <TradesBand />
      <IndustriesBand />
    </>
  );
}
