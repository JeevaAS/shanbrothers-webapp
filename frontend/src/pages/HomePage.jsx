import Hero from "@/components/Hero";
import {
  AboutBand,
  ServicesBand,
  ProcessBand,
  TradesBand,
  IndustriesBand,
  TestimonialsBand,
} from "@/components/HomeSections";
import PageMeta from "@/components/PageMeta";
import FAQBand from "@/components/FAQBand";

export default function HomePage() {
  return (
    <>
      <PageMeta
        title="Shan Brothers Manpower Consultants | Singapore & India"
        description="Skilled blue-collar manpower supply from India to Singapore. Welders, electricians, drivers, construction workers. MOM-compliant, end-to-end recruitment."
      />
      <Hero />
      <AboutBand />
      <ServicesBand />
      <TradesBand />
      <ProcessBand />
      <IndustriesBand />
      <TestimonialsBand />
      <FAQBand />
    </>
  );
}
