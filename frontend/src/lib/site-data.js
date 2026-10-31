export const LOGO_URL = "https://customer-assets.emergentagent.com/job_manpower-asia/artifacts/wrjte07s_d9e71110-de69-4bc0-be56-3e345234b122.png";

export const COMPANY = {
  name: "Shan Brothers Manpower Consultants",
  short: "Shan Brothers",
  tagline: "Right Talent. Right Time. Right Place.",
  hq: {
    city: "Singapore",
    entity: "Shan Brothers Management Pte Ltd",
    address: "WeWork, Bay Area, 15 Beach Road, Singapore 169187",
    phone: "+91 97862 45028",
    email: "hr@shanbrothersmanpower.com",
  },
  branch: {
    city: "Hosur, India",
    address: "Shan Brothers Consultants, Instant Spaces, 1st Floor, 2nd Cross, Kamaraj Colony, Hosur, Tamil Nadu — 635109",
    phone: "+91 97862 45028",
    email: "hr@shanbrothersmanpower.com",
  },
  founded: 2014,
  stats: {
    workers_deployed: 4200,
    partner_companies: 180,
    countries_sourced: 6,
    years: new Date().getFullYear() - 2014,
  },
  socials: {
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    whatsapp: "https://wa.me/919786245028",
  },
};

export const SERVICES = [
  {
    id: "recruitment",
    icon: "Users",
    title: "End-to-End Recruitment",
    desc: "From sourcing to on-site deployment — we handle every step so you don't have to.",
  },
  {
    id: "interviews",
    icon: "ClipboardCheck",
    title: "Trade Testing & Interviews",
    desc: "Skill-tested candidates. Video and on-site interviews arranged across India.",
  },
  {
    id: "visa",
    icon: "FileCheck",
    title: "Visa & Work Permit",
    desc: "IPA, S-Pass, Work Permit processing. MOM-compliant documentation, zero surprises.",
  },
  {
    id: "medical",
    icon: "Stethoscope",
    title: "Medical & Verification",
    desc: "Full medical clearance, police verification and passport authenticity checks.",
  },
  {
    id: "travel",
    icon: "Plane",
    title: "Ticketing & Travel",
    desc: "Flight bookings, airport pickup and orientation on arrival in Singapore.",
  },
  {
    id: "onboard",
    icon: "HandshakeIcon",
    title: "Onboarding & Aftercare",
    desc: "Accommodation guidance, SIM cards, banking help, ongoing worker welfare support.",
  },
];

export const TRADES = [
  { title: "Construction Workers", image: "https://images.pexels.com/photos/2058127/pexels-photo-2058127.jpeg", tags: ["Rebar", "Formwork", "General Labour"] },
  { title: "Welders & Fabricators", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80", tags: ["6G", "MIG", "TIG", "Structural"] },
  { title: "Electricians", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80", tags: ["Industrial", "Wireman", "Cable Jointer"] },
  { title: "Plumbers", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80", tags: ["Pipefitter", "Sanitary", "Gas"] },
  { title: "Drivers", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80", tags: ["Class 3/4/5", "PSV", "Lorry"] },
  { title: "Airport Ground Staff", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80", tags: ["Ramp", "Baggage", "Cabin Cleaning"] },
  { title: "Railway & MRT Workers", image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80", tags: ["Track", "Station", "Maintenance"] },
  { title: "Housemaids & Domestic Help", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80", tags: ["Filipino", "Indonesian", "Indian"] },
  { title: "Road & Infrastructure", image: "https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg", tags: ["Paver", "Roller", "Signalman"] },
];

export const PROCESS_STEPS = [
  { n: "01", title: "Requirement Intake", desc: "We understand your project, trades needed, timelines and budget." },
  { n: "02", title: "Sourcing in India", desc: "Our recruiters mobilise candidates from Tamil Nadu, Andhra, Bihar & beyond." },
  { n: "03", title: "Trade Testing", desc: "Physical skill test + interview. Only shortlisted profiles reach you." },
  { n: "04", title: "Documentation", desc: "Passport check, medical, PCC, contract signing — all boxes ticked." },
  { n: "05", title: "Visa & IPA", desc: "MOM applications filed. IPA delivered. Approvals tracked daily." },
  { n: "06", title: "Fly & Deploy", desc: "Flights booked, airport pickup, orientation, on-site deployment in Singapore." },
];

export const TESTIMONIALS = [
  {
    quote: "Shan Brothers deployed 40 welders for our shipyard project in under 6 weeks. Every worker was trade-tested and MOM-compliant. Rare reliability in this industry.",
    name: "Kumar R.",
    role: "Project Director, Marine Fabrication PL",
    location: "Tuas, Singapore",
  },
  {
    quote: "We rely on Shan Brothers for our M&E manpower. Electricians arrive with proper wireman certification and start work from day one. Zero delays.",
    name: "Melissa Tan",
    role: "HR Manager, MEP Contractor",
    location: "Kranji, Singapore",
  },
  {
    quote: "As a candidate flying from Chennai, they handled everything — visa, ticket, airport pickup, room. I only had to focus on my work. Very transparent about fees.",
    name: "Suresh V.",
    role: "6G Welder",
    location: "Deployed at Jurong Island",
  },
];

export const FAQS = [
  {
    q: "Which trades and job categories do you cover?",
    a: "Blue-collar and semi-skilled roles: construction, welding, electrical, plumbing, drivers, airport ground staff, railway/MRT workers, domestic helpers, and general labour. We do not currently place IT or white-collar professionals.",
  },
  {
    q: "Are you MOM-licensed to bring workers into Singapore?",
    a: "Yes. We operate as a MOM-compliant recruitment partner, working directly with employers who hold valid Work Permit / S-Pass quotas. All documentation is done through official MOM EP Online / WP Online portals.",
  },
  {
    q: "How long does it take to deploy a worker from India to Singapore?",
    a: "Typically 4-8 weeks from confirmed shortlist to arrival — this covers medical, PCC, passport verification, IPA approval and flight. Larger batches (50+) may take longer.",
  },
  {
    q: "What fees do candidates pay?",
    a: "We follow ethical recruitment principles. Candidates pay only regulated documentation costs (medical, PCC, passport). Recruitment fees are borne by the employer. Full transparency provided before signing.",
  },
  {
    q: "From which countries do you source workers?",
    a: "Primarily India (Tamil Nadu, Andhra, Bihar, UP, Odisha). We also mobilise from Bangladesh, Sri Lanka, Myanmar and Philippines for specific trades.",
  },
  {
    q: "Do you handle replacement if a worker doesn't work out?",
    a: "Yes. We offer a replacement guarantee window as part of every employer contract. Terms depend on the trade and duration of engagement.",
  },
];

export const INDUSTRIES_SERVED = [
  "Construction & Building",
  "Marine & Shipyard",
  "Oil, Gas & Petrochem",
  "MEP / M&E Contractors",
  "Facilities & Cleaning",
  "Logistics & Warehousing",
  "Airport & Aviation Ground",
  "Rail & MRT Infrastructure",
  "Landscaping & Roadworks",
  "Manufacturing",
  "Hospitality & F&B Support",
  "Domestic Households",
];
