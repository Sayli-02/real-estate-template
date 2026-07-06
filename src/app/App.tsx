import { useState, useEffect, useRef } from "react";
import { MapPin, ArrowUpRight, ArrowRight, Star, ChevronLeft, ChevronRight, Phone, Menu, X } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: "Horizon Residence",
    location: "Oslo, Norway",
    category: "Residential",
    size: "large",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "The Meridian Tower",
    location: "Berlin, Germany",
    category: "Commercial",
    size: "small",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "Cascade House",
    location: "Tokyo, Japan",
    category: "Residential",
    size: "small",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 4,
    title: "Vault Cultural Centre",
    location: "London, UK",
    category: "Cultural",
    size: "medium",
    image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=700&h=500&fit=crop&auto=format",
  },
  {
    id: 5,
    title: "Glass Pavilion",
    location: "Copenhagen, Denmark",
    category: "Commercial",
    size: "medium",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&h=500&fit=crop&auto=format",
  },
];

const services = [
  {
    num: "01",
    title: "Architectural Design",
    description: "From initial concept through to construction documentation, we craft buildings that balance beauty with structural integrity and long-term livability.",
    tags: ["Concept", "Schematic Design", "Documentation", "Site Supervision"],
  },
  {
    num: "02",
    title: "Interior Architecture",
    description: "We shape spaces from the inside out — materiality, light, proportion, and detail considered as one unified composition.",
    tags: ["Space Planning", "Materials", "Lighting Design", "Furniture"],
  },
  {
    num: "03",
    title: "Urban Strategy",
    description: "Large-scale thinking for cities and communities: master planning, public space design, and mixed-use development that adds genuine value.",
    tags: ["Master Planning", "Mixed-Use", "Public Space", "Zoning"],
  },
  {
    num: "04",
    title: "Heritage & Adaptive Reuse",
    description: "Breathing new life into existing buildings. We specialise in sensitive interventions that preserve what matters while enabling what is needed today.",
    tags: ["Conservation", "Adaptive Reuse", "Heritage", "Restoration"],
  },
];

const awards = [
  { name: "European Architecture Prize", year: "2023", category: "Residential" },
  { name: "Dezeen Awards Longlist", year: "2022", category: "Interior" },
  { name: "Architectural Review Award", year: "2021", category: "Cultural" },
  { name: "RIBA International Prize", year: "2020", category: "Commercial" },
  { name: "World Architecture Festival", year: "2019", category: "Urban" },
  { name: "AZ Award — Best New Global Voice", year: "2018", category: "Emerging" },
];

const testimonials = [
  {
    quote: "Optik transformed our brief into something we never could have imagined ourselves — a home that feels both extraordinary and completely natural to live in.",
    name: "Marta Lindqvist",
    role: "Private Residential Client",
    rating: 5,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&h=700&fit=crop&auto=format",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote: "The team's understanding of how people actually use public spaces is unrivalled. The cultural centre they designed for us has become the heartbeat of our city.",
    name: "Tomás Ferreira",
    role: "Director, Lisbon Cultural Trust",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop&auto=format",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote: "Working with Optik was a masterclass in rigour. Every detail has a reason. Every space serves a purpose. We could not be prouder of what we built together.",
    name: "Saoirse Brennan",
    role: "CEO, Meridian Developments",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=700&fit=crop&auto=format",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
  },
];

const posts = [
  {
    date: "June 12, 2026",
    category: "Material",
    title: "Why Concrete Is Having Its Most Interesting Moment in Decades",
    image: "https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=600&h=400&fit=crop&auto=format",
  },
  {
    date: "May 28, 2026",
    category: "Process",
    title: "The Brief That Changed How We Think About Natural Light",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&auto=format",
  },
  {
    date: "April 14, 2026",
    category: "Urban",
    title: "Density Done Right: Lessons from Three Successful Mixed-Use Projects",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop&auto=format",
  },
];

const clientLogos = ["VANTA", "MERIDIAN", "HELIX CO.", "SOLVARA", "ARCFORM"];

// ─── Components ───────────────────────────────────────────────────────────────

function PillButton({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <button
      className={`group inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 ${
        dark
          ? "bg-black text-white hover:bg-white hover:text-black border border-black"
          : "bg-black text-white hover:bg-white hover:text-black border border-black"
      }`}
    >
      <span>{children}</span>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
        <ArrowRight size={12} strokeWidth={2.5} />
      </span>
    </button>
  );
}

function StatCounter({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-display text-5xl font-black leading-none tracking-tight text-black">{value}</span>
      <span className="text-xs uppercase tracking-widest text-black/50">{label}</span>
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#f7f7f7]/95 backdrop-blur-sm shadow-[0_1px_0_rgba(0,0,0,0.1)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-5">
        {/* Logo */}
        <a href="#" className="font-display text-2xl font-black uppercase tracking-[0.15em] text-black">
          OPTIK
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {["Home", "About", "Services", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs uppercase tracking-widest text-black/70 hover:text-black transition-colors duration-200 font-medium"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 bg-black text-white">
            <Phone size={14} />
          </div>
          <span className="text-xs font-medium tracking-wide text-black/60">+44 20 7946 0321</span>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#f7f7f7] border-t border-black/10 px-8 py-6 flex flex-col gap-5">
          {["Home", "About", "Services", "Contact"].map((link) => (
            <a key={link} href="#" className="text-sm uppercase tracking-widest font-bold">
              {link}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-[#f7f7f7]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&h=1200&fit=crop&auto=format"
          alt="Optik featured architecture project"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Overlapping DREAM STUDIO title — behind the image via z-layering trick */}
      <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden pointer-events-none select-none">
        <h1
          className="font-display leading-[0.85] tracking-tighter text-white/10 uppercase text-[clamp(80px,14vw,200px)] whitespace-nowrap px-6"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          DREAM&nbsp;STUDIO
        </h1>
      </div>

      {/* Foreground content */}
      <div className="relative z-20 flex h-full flex-col justify-end pb-20 px-8 md:px-16 max-w-[1400px] mx-auto">
        <div className="max-w-xl mb-10">
          <p className="mb-8 text-sm leading-relaxed text-white/90 font-medium tracking-wide">
            We are an architecture and design studio that shapes spaces with intention — from intimate residences to landmark cultural buildings. Every project begins with listening.
          </p>
          <PillButton>Explore Our Work</PillButton>
        </div>
      </div>
    </section>
  );
}

function ClientLogos() {
  return (
    <section className="bg-black py-7">
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {clientLogos.map((logo) => (
            <span
              key={logo}
              className="font-display text-sm font-black uppercase tracking-[0.25em] text-white/30 hover:text-white/70 transition-colors duration-300 cursor-default"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-28 bg-[#f7f7f7]">
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-black/40 font-medium">About Us</p>
              <h2
                className="font-display text-[clamp(48px,6vw,90px)] leading-[0.9] tracking-tight uppercase text-black"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                Building<br />Ideas Into<br />Reality
              </h2>
            </div>
            <p className="text-sm leading-7 text-black/60 max-w-sm">
              Founded in 2007, Optik has grown from a two-person practice into a studio of over sixty designers, architects, and urban thinkers. We are drawn to complexity — projects that require invention, not formula.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 w-fit hover:opacity-50 transition-opacity"
            >
              More About Us <ArrowUpRight size={14} />
            </a>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-black/10">
              <StatCounter value="17" label="Years of practice" />
              <StatCounter value="67+" label="Studio members" />
              <StatCounter value="1M+" label="Clients worldwide" />
            </div>
          </div>

          {/* Right: stacked images */}
          <div className="relative flex flex-col gap-4">
            <div className="relative overflow-hidden bg-black/5">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&h=450&fit=crop&auto=format"
                alt="Studio interior"
                className="w-full object-cover h-64 lg:h-80"
              />
            </div>
            <div className="relative overflow-hidden bg-black/5 ml-12">
              <img
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=700&h=350&fit=crop&auto=format"
                alt="Architecture project detail"
                className="w-full object-cover h-48 lg:h-60"
              />
              {/* Expand icon */}
              <button className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:bg-black hover:text-white transition-colors duration-300">
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Heading */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-black/40 font-medium">Selected Work</p>
            <h2
              className="font-display text-[clamp(44px,5.5vw,80px)] leading-[0.9] tracking-tight uppercase"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              Portfolio
            </h2>
          </div>
          <a href="#" className="hidden md:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 hover:opacity-50 transition-opacity">
            View All Projects <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden bg-[#f7f7f7] ${i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}`}
            >
              <div className={`overflow-hidden ${i === 0 ? "h-72 lg:h-96" : "h-56 lg:h-72"}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex items-start justify-between border-t border-black/10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={11} className="text-black/40" />
                    <span className="text-xs text-black/40 tracking-wide">{project.location}</span>
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wide">{project.title}</h3>
                  <span className="text-xs text-black/40 mt-1 block">{project.category}</span>
                </div>
                <div className="flex flex-col gap-2 text-right">
                  <a href="#" className="text-xs font-bold uppercase tracking-widest underline underline-offset-2 hover:opacity-50 transition-opacity">
                    See Project
                  </a>
                  <a href="#" className="text-xs text-black/40 hover:text-black transition-colors">
                    About Us
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState(0);

  const serviceImages = [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=700&h=500&fit=crop&auto=format",
  ];

  return (
    <section className="py-28 bg-[#f7f7f7]">
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: rows */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-black/40 font-medium">What We Do</p>
            <h2
              className="font-display text-[clamp(44px,5vw,72px)] leading-[0.9] tracking-tight uppercase mb-12"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              Our<br />Services
            </h2>

            <div className="flex flex-col">
              {services.map((service, i) => (
                <button
                  key={service.num}
                  onClick={() => setActive(i)}
                  className={`group text-left border-t border-black/10 py-7 transition-all duration-300 ${
                    i === active ? "border-black/40" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-5">
                      <span className={`text-xs font-bold tracking-widest transition-colors duration-200 ${i === active ? "text-black" : "text-black/30"}`}>
                        {service.num}
                      </span>
                      <div>
                        <h3 className={`text-base font-bold uppercase tracking-wide mb-2 transition-colors ${i === active ? "text-black" : "text-black/50"}`}>
                          {service.title}
                        </h3>
                        {i === active && (
                          <div>
                            <p className="text-xs leading-6 text-black/50 mb-4 max-w-xs">{service.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {service.tags.map((tag) => (
                                <span key={tag} className="rounded-full border border-black/20 px-3 py-1 text-xs text-black/60 tracking-wide">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className={`shrink-0 mt-0.5 transition-all duration-300 ${i === active ? "opacity-100 rotate-0" : "opacity-20 -rotate-45"}`}
                    />
                  </div>
                </button>
              ))}
              <div className="border-t border-black/10" />
            </div>
          </div>

          {/* Right: rotating image */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28 overflow-hidden bg-black/5 h-[520px]">
              <img
                src={serviceImages[active]}
                alt={services[active].title}
                className="h-full w-full object-cover transition-opacity duration-500"
                key={active}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Awards() {
  return (
    <section className="py-28 bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: images */}
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&h=420&fit=crop&auto=format"
                alt="Award winning project"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="overflow-hidden ml-16">
              <img
                src="https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=600&h=300&fit=crop&auto=format"
                alt="Architecture detail"
                className="w-full h-44 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* 17 years badge */}
            <div className="flex items-center gap-5 mt-4 ml-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-white/20">
                <div className="text-center">
                  <div className="font-display text-2xl font-black leading-none" style={{ fontFamily: "'Anton', sans-serif" }}>17</div>
                  <div className="text-[9px] uppercase tracking-widest text-white/50 leading-tight">Years</div>
                </div>
              </div>
              <div>
                <p className="text-xs text-white/50 leading-relaxed italic">
                  "Architecture is not about buildings. It is about people and how they inhabit space."
                </p>
                <p className="mt-2 text-xs font-bold tracking-widest uppercase text-white/30">— K. Sørenssen, Founder</p>
              </div>
            </div>
          </div>

          {/* Right: table */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-white/30 font-medium">Recognition</p>
            <h2
              className="font-display text-[clamp(44px,5vw,72px)] leading-[0.9] tracking-tight uppercase mb-12"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              Awards &<br />Honours
            </h2>

            <div className="flex flex-col">
              {awards.map((award, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-6 py-5 border-t border-white/10 items-center">
                  <span className="text-sm font-medium leading-tight">{award.name}</span>
                  <span className="text-xs text-white/40 tabular-nums">{award.year}</span>
                  <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/40 tracking-wide">{award.category}</span>
                </div>
              ))}
              <div className="border-t border-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const t = testimonials[current];

  return (
    <section className="py-28 bg-[#f7f7f7]">
      <div className="mx-auto max-w-[1400px] px-8">
        <p className="mb-10 text-xs uppercase tracking-widest text-black/40 font-medium">Client Voices</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch overflow-hidden border border-black/10">
          {/* Image */}
          <div className="overflow-hidden bg-black/5 h-72 lg:h-auto">
            <img
              key={current}
              src={t.image}
              alt={t.name}
              className="h-full w-full object-cover object-top transition-opacity duration-500"
            />
          </div>

          {/* Quote */}
          <div className="flex flex-col justify-between p-10 lg:p-14 bg-white">
            <div>
              <div className="flex gap-1 mb-8">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="black" stroke="none" />
                ))}
              </div>
              <p className="text-base lg:text-lg leading-8 font-medium text-black mb-10">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover object-top" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide">{t.name}</p>
                  <p className="text-xs text-black/40 mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-12">
              <button
                onClick={prev}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white hover:bg-white hover:text-black border border-black transition-all duration-200"
              >
                <ChevronRight size={18} />
              </button>
              <span className="text-xs text-black/30 tracking-widest ml-2">{current + 1} / {testimonials.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Insights() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Overlapping heading block */}
        <div className="relative mb-16">
          <div className="overflow-hidden h-48 bg-black/5 mb-[-40px]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=300&fit=crop&auto=format"
              alt="Studio insights"
              className="w-full h-full object-cover object-center opacity-60"
            />
          </div>
          <div className="relative z-10 bg-white pt-4 pb-2 pr-8 inline-block">
            <p className="mb-2 text-xs uppercase tracking-widest text-black/40 font-medium">Ideas & Writing</p>
            <h2
              className="font-display text-[clamp(44px,5.5vw,80px)] leading-[0.9] tracking-tight uppercase"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              Latest Thought<br />from the Studio
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="overflow-hidden mb-5 bg-black/5">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-black/40 tabular-nums">{post.date}</span>
                <span className="rounded-full bg-black text-white px-3 py-0.5 text-xs font-bold uppercase tracking-widest">
                  {post.category}
                </span>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wide leading-6 group-hover:opacity-50 transition-opacity duration-200">
                {post.title}
              </h3>
              <a href="#" className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-black pb-0.5 hover:opacity-50 transition-opacity">
                Read More <ArrowUpRight size={12} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#141414] text-white pt-24 pb-10">
      {/* Large watermark logo */}
      <div
        className="pointer-events-none select-none absolute bottom-0 right-0 font-display text-[clamp(120px,20vw,280px)] leading-none tracking-tighter uppercase text-white/[0.04] translate-x-[5%] translate-y-[15%]"
        style={{ fontFamily: "'Anton', sans-serif" }}
      >
        OPTIK
      </div>

      {/* Background image tint */}
      <div className="absolute inset-0 -z-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&h=600&fit=crop&auto=format"
          alt=""
          aria-hidden
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-8">
        {/* Top: columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p
              className="font-display text-3xl font-black uppercase tracking-[0.15em] mb-4"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              OPTIK
            </p>
            <p className="text-xs leading-6 text-white/40 max-w-xs">
              An architecture and design studio working across residential, commercial, cultural, and urban projects worldwide.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-widest text-white/30 font-medium">Quick Links</p>
            <div className="flex flex-col gap-3">
              {["Home", "About", "Services", "Portfolio", "Awards", "Journal", "Contact"].map((link) => (
                <a key={link} href="#" className="text-xs text-white/50 hover:text-white transition-colors duration-200 uppercase tracking-widest">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Visit */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-widest text-white/30 font-medium">Visit</p>
            <address className="not-italic text-xs text-white/50 leading-7">
              12 Foundry Lane<br />
              London EC2A 4RT<br />
              United Kingdom
            </address>
            <a href="tel:+442079460321" className="mt-4 block text-xs text-white/50 hover:text-white transition-colors">
              +44 20 7946 0321
            </a>
          </div>

          {/* Connect */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-widest text-white/30 font-medium">Connect</p>
            <div className="flex flex-col gap-3">
              {["Instagram", "LinkedIn", "Pinterest", "Behance"].map((platform) => (
                <a key={platform} href="#" className="text-xs text-white/50 hover:text-white transition-colors duration-200 uppercase tracking-widest">
                  {platform}
                </a>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-xs text-white/30 mb-3 uppercase tracking-widest">Newsletter</p>
              <div className="flex gap-0">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 px-3 py-2.5 text-xs text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-colors"
                />
                <button className="bg-white text-black px-4 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white border border-white transition-all duration-200">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">© 2026 Optik Studio Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/20 hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-white/20 hover:text-white/50 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#f7f7f7]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <ClientLogos />
      <About />
      <Portfolio />
      <Services />
      <Awards />
      <Testimonials />
      <Insights />
      <Footer />
    </div>
  );
}
