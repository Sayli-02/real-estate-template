import { useState, useEffect, useRef, useCallback } from "react";
import {
  MapPin, ArrowUpRight, ArrowRight, Star,
  ChevronLeft, ChevronRight, Phone, Menu, X,
  ChevronDown, ArrowUp,
} from "lucide-react";
import {
  brand, navLinks, contact, socialLinks,
  hero as heroContent,
  clientLogos,
  about as aboutContent,
  portfolioFilters, projects,
  services,
  awardsSection, awards,
  testimonials,
  insightsSection, posts,
  footer as footerContent,
} from "../content";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const GOLD    = "#C9A96E";
const GOLD_LT = "#E8D5B0";
const DARK    = "#0D0D0D";
const CHAR    = "#1A1A1A";
const OFF_W   = "#FAF8F4";

const FONT_DISPLAY  = "'Bebas Neue', sans-serif";
const FONT_EDITORIAL = "'Cormorant Garamond', serif";
const FONT_BODY     = "'Inter', sans-serif";

// ─── Data ─── (all data is now imported from src/content.ts) ─────────────────
const FILTERS = portfolioFilters;

// ─── Global keyframes injected via <style> ────────────────────────────────────
const GLOBAL_CSS = `
  @keyframes marquee   { to { transform: translateX(-50%); } }
  @keyframes fadeUp    { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
  @keyframes scaleIn   { from { opacity:0; transform:scale(0.94);     } to { opacity:1; transform:scale(1);     } }
  @keyframes clipReveal{ from { clip-path:inset(0 100% 0 0); }          to { clip-path:inset(0 0% 0 0);         } }
  @keyframes bounceDot { 0%,100%{transform:translateY(0);opacity:.8;} 50%{transform:translateY(7px);opacity:.3;} }
  @keyframes spinSlow  { to { transform:rotate(360deg); } }
  @keyframes goldPulse { 0%,100%{box-shadow:0 0 0 0 rgba(201,169,110,.35);} 60%{box-shadow:0 0 0 10px rgba(201,169,110,0);} }

  .rv   { opacity:0; transform:translateY(60px) scale(0.96); transition:opacity 1.2s cubic-bezier(.16,1,.3,1), transform 1.2s cubic-bezier(.16,1,.3,1); }
  .rv.on{ opacity:1; transform:translateY(0) scale(1); }
  .rvL  { opacity:0; transform:translateX(-60px) scale(0.98); transition:opacity 1.2s cubic-bezier(.16,1,.3,1), transform 1.2s cubic-bezier(.16,1,.3,1); }
  .rvL.on{ opacity:1; transform:translateX(0) scale(1); }
  .rvR  { opacity:0; transform:translateX(60px) scale(0.98); transition:opacity 1.2s cubic-bezier(.16,1,.3,1), transform 1.2s cubic-bezier(.16,1,.3,1); }
  .rvR.on{ opacity:1; transform:translateX(0) scale(1); }
  .d1{transition-delay:.08s} .d2{transition-delay:.16s} .d3{transition-delay:.24s} .d4{transition-delay:.32s}

  .rv-skew { opacity:0; transform:translateY(80px) skewY(3deg); transition:opacity 1.4s cubic-bezier(.16,1,.3,1), transform 1.4s cubic-bezier(.16,1,.3,1); }
  .rv-skew.on { opacity:1; transform:translateY(0) skewY(0); }

  .clip-reveal { clip-path:inset(100% 0 0 0); transition:clip-path 1.4s cubic-bezier(.16,1,.3,1); }
  .clip-reveal.on { clip-path:inset(0 0 0 0); }
  .clip-reveal img { transform:scale(1.18); transition:transform 1.6s cubic-bezier(.16,1,.3,1); }
  .clip-reveal.on img { transform:scale(1); }

  .hl::after{ content:''; position:absolute; bottom:-2px; left:0; width:0; height:1.5px; background:currentColor; transition:width .3s cubic-bezier(.16,1,.3,1); }
  .hl:hover::after{ width:100%; }
  .hl{ position:relative; }
`;

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOn(true);
        obs.disconnect();
      }
    }, { 
      threshold,
      rootMargin: "0px 0px -120px 0px" // Triggers when element is 120px into the viewport
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, on };
}

function useCountUp(target: number, duration = 1800, active = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let t0: number | null = null;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return n;
}

// ─── Shared Components ────────────────────────────────────────────────────────

/** Gold-accented section label */
function Label({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: FONT_BODY, color: GOLD, letterSpacing: "0.22em" }}
       className="mb-3 text-[10px] font-semibold uppercase">
      ◆ {children}
    </p>
  );
}

/** Primary CTA button — gold border + fill on hover */
function GoldButton({ children, onClick, outline = false }: { children: React.ReactNode; onClick?: () => void; outline?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center gap-3 px-7 py-3.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
      style={{
        fontFamily: FONT_BODY,
        background: outline ? "transparent" : GOLD,
        color: outline ? GOLD : DARK,
        border: `1.5px solid ${GOLD}`,
        letterSpacing: "0.18em",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = outline ? GOLD : "transparent";
        (e.currentTarget as HTMLButtonElement).style.color      = outline ? DARK : GOLD;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = outline ? "transparent" : GOLD;
        (e.currentTarget as HTMLButtonElement).style.color      = outline ? GOLD : DARK;
      }}
    >
      <span>{children}</span>
      <ArrowRight size={13} strokeWidth={2.5} />
    </button>
  );
}

/** Animated counter */
function Counter({ value, suffix = "", label, active }: { value: number; suffix?: string; label: string; active: boolean }) {
  const n = useCountUp(value, 1800, active);
  return (
    <div className="flex flex-col gap-1.5">
      <span style={{ fontFamily: FONT_DISPLAY, color: GOLD, fontSize: "clamp(2.5rem,4vw,3.5rem)", letterSpacing:"0.03em" }}>
        {n}{suffix}
      </span>
      <span style={{ fontFamily: FONT_BODY, color: "#666", letterSpacing:"0.18em" }} className="text-[10px] uppercase">{label}</span>
    </div>
  );
}

// ─── Scroll helper (accounts for fixed header height) ───────────────────────
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 80; // fixed header height
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

const NAV_LINKS = navLinks;

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60);
      const d = document.documentElement;
      setProgress((window.scrollY / (d.scrollHeight - d.clientHeight)) * 100 || 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Gold progress bar */}
      <div style={{ position:"fixed", top:0, left:0, height:"2.5px", width:`${progress}%`, background:`linear-gradient(90deg,${GOLD},${GOLD_LT})`, zIndex:100, transition:"width .1s linear" }} />

      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:50,
        background: scrolled ? "rgba(13,13,13,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(201,169,110,.12)` : "none",
        transition: "all .4s ease",
      }}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-5">
          <a href="#" style={{ fontFamily: FONT_DISPLAY, color: scrolled ? "#fff" : "#fff", letterSpacing:"0.2em", fontSize:"1.5rem", fontWeight:400 }}
             className="hover:opacity-70 transition-opacity">
            {brand.name}
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                className="hl text-[11px] font-semibold uppercase tracking-widest transition-colors duration-200"
                style={{ fontFamily: FONT_BODY, color: scrolled ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.85)", letterSpacing:"0.18em" }}
                onClick={e => { e.preventDefault(); scrollToSection(id); }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = GOLD}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = scrolled ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.85)"}
              >{label}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full cursor-pointer transition-all duration-300"
                 style={{ background: GOLD, color: DARK }}
                 onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "#fff"; }}
                 onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = GOLD; }}>
              <Phone size={14} />
            </div>
            <span style={{ fontFamily: FONT_BODY, color: "rgba(255,255,255,.55)", letterSpacing:"0.05em" }} className="text-xs">
              {contact.phone}
            </span>
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu"
                  style={{ color: "#fff" }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div style={{
          maxHeight: open ? "280px" : "0",
          overflow: "hidden",
          transition: "max-height .4s cubic-bezier(.16,1,.3,1)",
          background: DARK,
          borderTop: open ? `1px solid rgba(201,169,110,.15)` : "none",
        }}>
          <div className="px-8 py-6 flex flex-col gap-5">
            {NAV_LINKS.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                style={{ fontFamily: FONT_BODY, color: "rgba(255,255,255,.7)", letterSpacing:"0.18em" }}
                className="text-sm font-bold uppercase hover:opacity-60 transition-opacity"
                onClick={e => { e.preventDefault(); scrollToSection(id); setOpen(false); }}
              >{label}</a>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => { const t = setTimeout(() => setReady(true), 120); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const fn = () => { if (imgRef.current) imgRef.current.style.transform = `translateY(${window.scrollY * 0.32}px)`; };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[700px] overflow-hidden" style={{ background: DARK }}>
      {/* Parallax bg */}
      <div ref={imgRef} className="absolute inset-0 scale-110">
        <img src={heroContent.image}
             alt={heroContent.imageAlt} className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(13,13,13,.85) 0%, rgba(13,13,13,.35) 50%, rgba(13,13,13,.2) 100%)" }} />
      </div>

      {/* Watermark */}
      <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden pointer-events-none select-none">
        <div style={{
          fontFamily: FONT_DISPLAY,
          fontSize: "clamp(80px,14vw,220px)",
          color: "rgba(201,169,110,0.08)",
          lineHeight: 0.85,
          letterSpacing: "-0.02em",
          paddingLeft: "1.5rem",
          animation: ready ? "clipReveal 1.4s cubic-bezier(.16,1,.3,1) .5s both" : "none",
        }}>{brand.heroWatermark}</div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col justify-end pb-20 px-8 md:px-16 max-w-[1400px] mx-auto">
        {/* Gold thin line accent */}
        <div style={{ width:"40px", height:"2px", background:GOLD, marginBottom:"1.5rem",
                      animation: ready ? "scaleIn .8s cubic-bezier(.16,1,.3,1) .2s both" : "none" }} />

        <p style={{
          fontFamily: FONT_EDITORIAL, color:"rgba(255,255,255,.75)", fontSize:"1rem",
          fontStyle:"italic", lineHeight:1.8, maxWidth:"520px", marginBottom:"2rem",
          animation: ready ? "fadeUp 1s cubic-bezier(.16,1,.3,1) .35s both" : "none",
        }}>
          {heroContent.subheadline}
        </p>

        <div style={{ animation: ready ? "fadeUp 1s cubic-bezier(.16,1,.3,1) .5s both" : "none" }}>
          <GoldButton onClick={() => scrollToSection("portfolio")}>{heroContent.ctaLabel}</GoldButton>
        </div>

        {/* Floating card */}
        <div className="absolute bottom-16 right-8 md:right-16 hidden md:block"
             style={{ animation: ready ? "scaleIn 1s cubic-bezier(.16,1,.3,1) .8s both" : "none" }}>
          <div style={{
            background:"rgba(13,13,13,.7)", backdropFilter:"blur(12px)",
            border:`1px solid rgba(201,169,110,.25)`, padding:"1.25rem", width:"230px",
          }}>
            <p style={{ fontFamily:FONT_BODY, color:GOLD, fontSize:"9px", letterSpacing:"0.22em" }} className="uppercase mb-2">◆ {heroContent.featuredCard.label}</p>
            <p style={{ fontFamily:FONT_DISPLAY, color:"#fff", fontSize:"1.1rem", letterSpacing:"0.08em" }}>{heroContent.featuredCard.title}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={10} style={{ color: GOLD }} />
              <span style={{ fontFamily:FONT_BODY, color:"rgba(255,255,255,.5)", fontSize:"11px" }}>{heroContent.featuredCard.location}</span>
            </div>
            <a href="#portfolio" onClick={e => { e.preventDefault(); scrollToSection("portfolio"); }} className="mt-3 flex items-center gap-2 group"
               style={{ fontFamily:FONT_BODY, color:GOLD, fontSize:"11px", fontWeight:600, letterSpacing:"0.1em" }}>
              {heroContent.featuredCard.linkLabel} <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5">
        <span style={{ fontFamily:FONT_BODY, color:"rgba(255,255,255,.4)", fontSize:"9px", letterSpacing:"0.22em" }} className="uppercase">Scroll</span>
        {[0,1,2].map(i => (
          <div key={i} style={{ width:"1.5px", height:"6px", background: GOLD, borderRadius:"2px", opacity:0.6,
                                animation:`bounceDot 1.4s ease-in-out ${i*0.18}s infinite` }} />
        ))}
        <ChevronDown size={14} style={{ color: GOLD, animation:"bounceDot 1.4s ease-in-out .54s infinite" }} />
      </div>
    </section>
  );
}

// ─── Client Logos ─────────────────────────────────────────────────────────────
function ClientLogos() {
  const doubled = [...clientLogos, ...clientLogos];
  return (
    <section style={{ background: CHAR, borderTop:`1px solid rgba(201,169,110,.12)`, borderBottom:`1px solid rgba(201,169,110,.12)` }}
             className="py-6 overflow-hidden">
      <div className="flex items-center gap-0">
        <div className="shrink-0 pl-8 pr-10" style={{ borderRight:`1px solid rgba(201,169,110,.2)` }}>
          <p style={{ fontFamily:FONT_BODY, color:GOLD, fontSize:"9px", letterSpacing:"0.25em" }} className="uppercase whitespace-nowrap">Trusted By</p>
        </div>
        <div className="relative overflow-hidden flex-1">
          <div style={{ display:"flex", gap:"4rem", whiteSpace:"nowrap", width:"max-content",
                        animation:"marquee 22s linear infinite" }}>
            {doubled.map((logo, i) => (
              <span key={i} style={{ fontFamily:FONT_DISPLAY, color:"rgba(255,255,255,.2)", fontSize:"0.85rem", letterSpacing:"0.25em" }}
                    className="cursor-default transition-all duration-300"
                    onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.color = GOLD}
                    onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,.2)"}>
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const { ref, on } = useReveal(0.2);
  const [statsOn, setStatsOn] = useState(false);
  const sRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsOn(true); obs.disconnect(); } }, { threshold:0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section id="about" style={{ background: OFF_W }} className="py-32">
      <div className="mx-auto max-w-[1400px] px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div className={`flex flex-col gap-10 rvL ${on?"on":""}`}>
            <div>
              <Label>{aboutContent.label}</Label>
              <h2 style={{ fontFamily:FONT_DISPLAY, fontSize:"clamp(52px,6vw,96px)", color:DARK, lineHeight:0.9, letterSpacing:"0.02em" }}>
                {aboutContent.headingLine1}<br/>{aboutContent.headingLine2}<br/>
                <span style={{ color:GOLD }}>{aboutContent.headingGold}</span>
              </h2>
            </div>
            <p style={{ fontFamily:FONT_BODY, color:"#555", lineHeight:1.9, fontSize:"0.875rem", maxWidth:"380px" }}>
              {aboutContent.body}
            </p>
            <a href="#" className="hl inline-flex items-center gap-2 w-fit"
               style={{ fontFamily:FONT_BODY, color:GOLD, fontSize:"11px", fontWeight:700, letterSpacing:"0.18em" }}
               onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity="0.6"}
               onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity="1"}>
              MORE ABOUT US <ArrowUpRight size={14} />
            </a>

            {/* Stats */}
            <div ref={sRef as React.RefObject<HTMLDivElement>}
                 className="grid grid-cols-3 gap-8 pt-8"
                 style={{ borderTop:`1px solid rgba(0,0,0,.1)` }}>
              {aboutContent.stats.map((s, i) => (
                <Counter key={i} value={s.value} suffix={s.suffix} label={s.label} active={statsOn} />
              ))}
            </div>
          </div>

          {/* Right */}
          <div className={`relative flex flex-col gap-4 rvR ${on?"on":""}`}>
            {/* Est badge */}
            <div style={{ position:"absolute", top:"-1.5rem", left:"-1.5rem", zIndex:10,
                          width:"80px", height:"80px", borderRadius:"50%", background:GOLD,
                          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                          border:`4px solid ${OFF_W}`, animation:"goldPulse 2.5s infinite" }}>
              <span style={{ fontFamily:FONT_BODY, color:DARK, fontSize:"8px", letterSpacing:"0.1em", fontWeight:600 }}>Est.</span>
              <span style={{ fontFamily:FONT_DISPLAY, color:DARK, fontSize:"1.3rem" }}>{aboutContent.estYear}</span>
            </div>

            <div className={`clip-reveal group relative ${on ? "on" : ""}`}>
              <img src={aboutContent.images.top.src}
                   alt={aboutContent.images.top.alt} className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                   style={{ height:"320px" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{ background:"linear-gradient(to top,rgba(13,13,13,.5),transparent)" }} />
            </div>
            <div className={`clip-reveal group relative ml-12 ${on ? "on" : ""}`}>
              <img src={aboutContent.images.bottom.src}
                   alt={aboutContent.images.bottom.alt} className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                   style={{ height:"220px" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{ background:"linear-gradient(to top,rgba(13,13,13,.5),transparent)" }} />
              <button className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                      style={{ background:"#fff", color:DARK }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background=GOLD; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background="#fff"; }}>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
function Portfolio() {
  const [filter, setFilter] = useState("All");
  const { ref, on } = useReveal(0.1);
  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" style={{ background:"#fff" }} className="py-32 overflow-hidden">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="mx-auto max-w-[1400px] px-8">
        {/* Header */}
        <div className={`flex items-end justify-between mb-10 rv-skew ${on ? "on" : ""}`}>
          <div>
            <Label>Selected Work</Label>
            <h2 style={{ fontFamily:FONT_DISPLAY, fontSize:"clamp(48px,5.5vw,84px)", color:DARK, lineHeight:0.9, letterSpacing:"0.02em" }}>
              Port<span style={{ color:GOLD }}>folio</span>
            </h2>
          </div>
          <a href="#" className="hl hidden md:inline-flex items-center gap-2"
             style={{ fontFamily:FONT_BODY, color:GOLD, fontSize:"11px", fontWeight:700, letterSpacing:"0.18em" }}>
            View All <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
                    style={{
                      fontFamily:FONT_BODY, fontSize:"11px", fontWeight:700, letterSpacing:"0.16em",
                      padding:"0.5rem 1.25rem", borderRadius:"2px",
                      border:`1.5px solid ${filter===f ? GOLD : "rgba(0,0,0,.15)"}`,
                      background: filter===f ? GOLD : "transparent",
                      color: filter===f ? DARK : "#666",
                      transition:"all .25s ease",
                    }}
                    onMouseEnter={e => { if (filter!==f) { (e.currentTarget as HTMLButtonElement).style.borderColor=GOLD; (e.currentTarget as HTMLButtonElement).style.color=GOLD; } }}
                    onMouseLeave={e => { if (filter!==f) { (e.currentTarget as HTMLButtonElement).style.borderColor="rgba(0,0,0,.15)"; (e.currentTarget as HTMLButtonElement).style.color="#666"; } }}>
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
             style={{ gap:"1px", background:"rgba(0,0,0,.08)" }}>
          {filtered.map((p, i) => (
            <div key={p.id}
                 className={`group relative overflow-hidden rv ${on?"on":""} d${Math.min(i+1,4)} ${i===0 && filter==="All" ? "lg:col-span-2":""}`}
                 style={{ background:OFF_W }}>
              <div className={`clip-reveal ${on ? "on" : ""}`} style={{ height: i===0 && filter==="All" ? "380px" : "270px" }}>
                <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                     style={{ background:"rgba(13,13,13,.72)" }}>
                  <span style={{ fontFamily:FONT_BODY, color:GOLD, fontSize:"10px", letterSpacing:"0.22em",
                                 border:`1px solid ${GOLD}`, padding:"0.3rem 1rem" }} className="uppercase">
                    {p.category}
                  </span>
                  <a href="#" style={{ fontFamily:FONT_DISPLAY, color:"#fff", fontSize:"1.1rem", letterSpacing:"0.1em" }}
                     className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                    View Project <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
              <div className="p-5 flex items-start justify-between" style={{ borderTop:"1px solid rgba(0,0,0,.08)" }}>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin size={11} style={{ color:GOLD }} />
                    <span style={{ fontFamily:FONT_BODY, color:"#888", fontSize:"11px" }}>{p.location}</span>
                  </div>
                  <h3 style={{ fontFamily:FONT_BODY, color:DARK, fontWeight:700, fontSize:"13px", letterSpacing:"0.05em", textTransform:"uppercase" }}>{p.title}</h3>
                  <span style={{ fontFamily:FONT_BODY, color:GOLD, fontSize:"10px", letterSpacing:"0.15em" }} className="uppercase mt-1 block">{p.category}</span>
                </div>
                <a href="#" style={{ fontFamily:FONT_BODY, color:GOLD, fontSize:"10px", fontWeight:700, letterSpacing:"0.15em" }}
                   className="hl uppercase hover:opacity-60 transition-opacity">See Project</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  const [active, setActive] = useState(0);
  const { ref, on } = useReveal(0.1);

  const imgs = services.map(s => s.image);

  return (
    <section id="services" style={{ background: DARK }} className="py-32">
      <div className="mx-auto max-w-[1400px] px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left */}
          <div className={`rvL ${on?"on":""}`}>
            <Label>What We Do</Label>
            <h2 style={{ fontFamily:FONT_DISPLAY, fontSize:"clamp(48px,5vw,76px)", color:"#fff", lineHeight:0.9, letterSpacing:"0.02em", marginBottom:"3rem" }}>
              Our<br/><span style={{ color:GOLD }}>Services</span>
            </h2>

            <div className="flex flex-col">
              {services.map((svc, i) => {
                const isActive = i === active;
                return (
                  <button key={svc.num} onClick={() => setActive(i)}
                          className="text-left w-full"
                          style={{
                            borderTop:`1px solid ${isActive ? GOLD+"55" : "rgba(255,255,255,.08)"}`,
                            padding:"1.5rem 0",
                            background:"transparent",
                          }}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-5 flex-1">
                        {/* Number */}
                        <span style={{ fontFamily:FONT_DISPLAY, fontSize:"1.6rem", color: isActive ? GOLD : "rgba(255,255,255,.2)", letterSpacing:"0.05em", minWidth:"2.5rem" }}>
                          {svc.num}
                        </span>
                        <div className="flex-1">
                          {/* Title — always visible */}
                          <h3 style={{ fontFamily:FONT_BODY, fontWeight:700, fontSize:"0.9rem", letterSpacing:"0.08em",
                                       color: isActive ? "#fff" : "rgba(255,255,255,.45)", textTransform:"uppercase",
                                       marginBottom:"0.75rem", transition:"color .3s" }}>
                            {svc.title}
                          </h3>

                          {/* Description — ALWAYS VISIBLE, just dimmed when inactive */}
                          <p style={{ fontFamily:FONT_BODY, fontSize:"0.8rem", lineHeight:1.75,
                                      color: isActive ? "rgba(255,255,255,.65)" : "rgba(255,255,255,.25)",
                                      maxWidth:"340px", marginBottom:"1rem", transition:"color .3s" }}>
                            {svc.description}
                          </p>

                          {/* Tags — always visible, styled by active state */}
                          <div className="flex flex-wrap gap-2">
                            {svc.tags.map(tag => (
                              <span key={tag} style={{
                                fontFamily:FONT_BODY, fontSize:"10px", letterSpacing:"0.12em",
                                border:`1px solid ${isActive ? GOLD+"60" : "rgba(255,255,255,.1)"}`,
                                color: isActive ? GOLD : "rgba(255,255,255,.25)",
                                padding:"0.2rem 0.75rem", borderRadius:"2px",
                                transition:"all .3s",
                              }} className="uppercase">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight size={16} style={{
                        color: isActive ? GOLD : "rgba(255,255,255,.2)",
                        transform: isActive ? "rotate(0deg)" : "rotate(-45deg)",
                        transition:"all .3s", flexShrink:0, marginTop:"0.125rem",
                      }} />
                    </div>
                  </button>
                );
              })}
              <div style={{ borderTop:"1px solid rgba(255,255,255,.08)" }} />
            </div>
          </div>

          {/* Right: crossfade image */}
          <div className={`hidden lg:block rvR ${on?"on":""}`}>
            <div className={`clip-reveal sticky top-28 ${on ? "on" : ""}`} style={{ height:"620px" }}>
              {imgs.map((src, i) => (
                <img key={i} src={src} alt={services[i].title}
                     className="absolute inset-0 h-full w-full object-cover"
                     style={{ opacity: i===active ? 1 : 0, transition:"opacity .7s ease" }} />
              ))}
              <div className="absolute inset-0 pointer-events-none"
                   style={{ background:"linear-gradient(to top, rgba(13,13,13,.6) 0%, transparent 50%)" }} />
              {/* Active label on image */}
              <div className="absolute bottom-6 left-6">
                <p style={{ fontFamily:FONT_BODY, color:GOLD, fontSize:"9px", letterSpacing:"0.22em" }} className="uppercase mb-1">◆ Active</p>
                <p style={{ fontFamily:FONT_DISPLAY, color:"#fff", fontSize:"1.4rem", letterSpacing:"0.06em" }}>
                  {services[active].title}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Awards ───────────────────────────────────────────────────────────────────
function Awards() {
  const { ref, on } = useReveal(0.1);

  return (
    <section id="awards" style={{ background:"#111", borderTop:`1px solid rgba(201,169,110,.12)` }} className="py-32">
      <div className="mx-auto max-w-[1400px] px-8">
        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div className={`flex flex-col gap-4 rvL ${on?"on":""}`}>
            <div className={`clip-reveal group ${on ? "on" : ""}`}>
              <img src={awardsSection.images.top.src}
                   alt={awardsSection.images.top.alt}
                   className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                   style={{ height:"260px" }} />
            </div>
            <div className={`clip-reveal ml-16 group ${on ? "on" : ""}`}>
              <img src={awardsSection.images.bottom.src}
                   alt={awardsSection.images.bottom.alt}
                   className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                   style={{ height:"180px" }} />
            </div>

            {/* Spinning badge */}
            <div className="flex items-center gap-5 mt-4 ml-4">
              <div style={{ position:"relative", width:"80px", height:"80px", flexShrink:0 }}>
                <svg className="absolute inset-0 w-full h-full" style={{ animation:"spinSlow 10s linear infinite" }} viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="36" fill="none" stroke={GOLD} strokeWidth="1" strokeDasharray="5 9" strokeLinecap="round" strokeOpacity="0.5" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span style={{ fontFamily:FONT_DISPLAY, color:GOLD, fontSize:"1.6rem", lineHeight:1 }}>{awardsSection.badgeYears}</span>
                  <span style={{ fontFamily:FONT_BODY, color:"rgba(255,255,255,.4)", fontSize:"8px", letterSpacing:"0.15em" }} className="uppercase">Yrs</span>
                </div>
              </div>
              <p style={{ fontFamily:FONT_EDITORIAL, color:"rgba(255,255,255,.55)", fontSize:"0.9rem", fontStyle:"italic", lineHeight:1.7 }}>
                {awardsSection.quote.text}
                <br/>
                <span style={{ fontFamily:FONT_BODY, color:"rgba(255,255,255,.3)", fontSize:"10px", letterSpacing:"0.15em", fontStyle:"normal" }}>
                  {awardsSection.quote.attribution}
                </span>
              </p>
            </div>
          </div>

          {/* Right */}
          <div className={`rvR ${on?"on":""}`}>
            <Label>{awardsSection.label}</Label>
            <h2 style={{ fontFamily:FONT_DISPLAY, fontSize:"clamp(48px,5vw,76px)", color:"#fff", lineHeight:0.9, letterSpacing:"0.02em", marginBottom:"3rem" }}>
              {awardsSection.headingLine1}<br/><span style={{ color:GOLD }}>{awardsSection.headingGold}</span>
            </h2>

            <div className="flex flex-col">
              {awards.map((aw, i) => (
                <div key={i}
                     className="group grid items-center gap-6 -mx-4 px-4 rounded-sm cursor-default transition-all duration-200"
                     style={{
                       gridTemplateColumns:"1fr auto auto",
                       padding:"1.25rem 1rem",
                       borderTop:"1px solid rgba(255,255,255,.07)",
                       opacity: on ? 1 : 0,
                       transform: on ? "translateX(0)" : "translateX(24px)",
                       transition:`opacity .6s cubic-bezier(.16,1,.3,1) ${.1+i*.09}s, transform .6s cubic-bezier(.16,1,.3,1) ${.1+i*.09}s, background .2s`,
                     }}
                     onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background="rgba(201,169,110,.05)"}
                     onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background="transparent"}>
                  <span style={{ fontFamily:FONT_BODY, color:"rgba(255,255,255,.75)", fontSize:"13px", fontWeight:500 }}
                        className="group-hover:text-white transition-colors">{aw.name}</span>
                  <span style={{ fontFamily:FONT_BODY, color:"rgba(255,255,255,.3)", fontSize:"12px" }}>{aw.year}</span>
                  <span style={{ fontFamily:FONT_BODY, color:GOLD, fontSize:"9px", letterSpacing:"0.15em",
                                 border:`1px solid ${GOLD}40`, padding:"0.2rem 0.7rem" }} className="uppercase">
                    {aw.category}
                  </span>
                </div>
              ))}
              <div style={{ borderTop:"1px solid rgba(255,255,255,.07)" }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const [cur, setCur] = useState(0);
  const [fading, setFading] = useState(false);
  const { ref, on } = useReveal(0.15);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((next: number) => {
    if (fading) return;
    setFading(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    setTimeout(() => { setCur(next); setFading(false); }, 320);
  }, [fading]);

  useEffect(() => {
    timerRef.current = setTimeout(() => go((cur + 1) % testimonials.length), 5500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [cur, go]);

  const t = testimonials[cur];

  return (
    <section style={{ background: OFF_W }} className="py-32">
      <div className="mx-auto max-w-[1400px] px-8">
        <Label>Client Voices</Label>

        <div ref={ref as React.RefObject<HTMLDivElement>}
             className={`grid grid-cols-1 lg:grid-cols-2 overflow-hidden rv ${on?"on":""}`}
             style={{ border:`1px solid rgba(0,0,0,.08)` }}>
          {/* Image */}
          <div className={`clip-reveal ${on ? "on" : ""}`} style={{ height:"380px" }}>
            <img src={t.image} alt={t.name}
                 className="h-full w-full object-cover object-center"
                 style={{ opacity: fading ? 0 : 1, transform: fading ? "scale(1.04)" : "scale(1)", transition:"opacity .35s ease, transform .35s ease" }} />
          </div>

          {/* Quote panel */}
          <div className="flex flex-col justify-between p-10 lg:p-14" style={{ background:"#fff" }}>
            {/* Decorative " */}
            <div style={{ fontFamily:FONT_EDITORIAL, fontSize:"9rem", lineHeight:1, color:GOLD+"18",
                          position:"absolute", top:"1rem", right:"2.5rem", pointerEvents:"none", userSelect:"none" }}>
              "
            </div>

            <div style={{ position:"relative" }}>
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} style={{ fill:GOLD, stroke:"none" }} />
                ))}
              </div>
              <p style={{
                fontFamily:FONT_EDITORIAL, fontSize:"clamp(1rem,1.4vw,1.2rem)", lineHeight:1.8,
                fontStyle:"italic", color:DARK, marginBottom:"2rem",
                opacity: fading ? 0 : 1, transform: fading ? "translateY(8px)" : "translateY(0)",
                transition:"opacity .3s ease, transform .3s ease",
              }}>
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover object-center"
                     style={{ boxShadow:`0 0 0 2px ${GOLD}` }} />
                <div>
                  <p style={{ fontFamily:FONT_BODY, fontWeight:700, fontSize:"13px", letterSpacing:"0.06em", color:DARK, textTransform:"uppercase" }}>{t.name}</p>
                  <p style={{ fontFamily:FONT_BODY, color:GOLD, fontSize:"11px", letterSpacing:"0.1em" }}>{t.role}</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 mt-10">
              <button onClick={() => go((cur - 1 + testimonials.length) % testimonials.length)}
                      className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200"
                      style={{ border:`1.5px solid rgba(0,0,0,.15)` }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor=GOLD; (e.currentTarget as HTMLButtonElement).style.background=GOLD; (e.currentTarget as HTMLButtonElement).style.color=DARK; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor="rgba(0,0,0,.15)"; (e.currentTarget as HTMLButtonElement).style.background="transparent"; (e.currentTarget as HTMLButtonElement).style.color="inherit"; }}>
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => go((cur + 1) % testimonials.length)}
                      className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200"
                      style={{ background:GOLD, color:DARK, border:`1.5px solid ${GOLD}` }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="transparent"; (e.currentTarget as HTMLButtonElement).style.color=GOLD; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background=GOLD; (e.currentTarget as HTMLButtonElement).style.color=DARK; }}>
                <ChevronRight size={18} />
              </button>

              {/* Dots */}
              <div className="flex gap-2 ml-1">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => go(i)}
                          style={{
                            width: i===cur ? "20px" : "6px", height:"6px", borderRadius:"3px",
                            background: i===cur ? GOLD : "rgba(0,0,0,.15)",
                            border:"none", padding:0, cursor:"pointer", transition:"all .3s",
                          }} />
                ))}
              </div>

              <span style={{ fontFamily:FONT_BODY, color:"#bbb", fontSize:"11px", marginLeft:"auto" }}>
                {String(cur+1).padStart(2,"0")} / {String(testimonials.length).padStart(2,"0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Insights ─────────────────────────────────────────────────────────────────
function Insights() {
  const { ref, on } = useReveal(0.1);

  return (
    <section id="journal" style={{ background:"#fff" }} className="py-32 overflow-hidden">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="mx-auto max-w-[1400px] px-8">
        {/* Overlapping heading */}
        <div className={`relative mb-16 rv-skew ${on ? "on" : ""}`}>
          <div className={`clip-reveal mb-[-40px] ${on ? "on" : ""}`} style={{ height:"180px" }}>
            <img src={insightsSection.bannerImage.src}
                 alt={insightsSection.bannerImage.alt} className="w-full h-full object-cover opacity-50" />
          </div>
          <div className="relative z-10 inline-block pt-4 pb-2 pr-8" style={{ background:"#fff" }}>
            <Label>{insightsSection.label}</Label>
            <h2 style={{ fontFamily:FONT_DISPLAY, fontSize:"clamp(48px,5.5vw,84px)", color:DARK, lineHeight:0.9, letterSpacing:"0.02em" }}>
              {insightsSection.headingLine1}<br/>{insightsSection.headingLine2} <span style={{ color:GOLD }}>{insightsSection.headingGold}</span>
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <article key={i} className={`group cursor-pointer rv ${on?"on":""} d${i+1}`}>
              <div className={`clip-reveal mb-5 relative ${on ? "on" : ""}`} style={{ height:"220px" }}>
                <img src={post.image} alt={post.title}
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                     style={{ background:"rgba(13,13,13,.6)" }}>
                  <span style={{ fontFamily:FONT_BODY, color:GOLD, fontSize:"10px", letterSpacing:"0.22em",
                                 border:`1px solid ${GOLD}`, padding:"0.3rem 1rem" }} className="uppercase">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontFamily:FONT_BODY, color:"#aaa", fontSize:"11px" }}>{post.date}</span>
                <span style={{ width:"3px", height:"3px", borderRadius:"50%", background:"#ddd", flexShrink:0 }} />
                <span style={{ fontFamily:FONT_BODY, color:GOLD, fontSize:"11px" }}>{post.readTime}</span>
                <span style={{ fontFamily:FONT_BODY, background:GOLD, color:DARK, fontSize:"9px", letterSpacing:"0.15em",
                               padding:"0.2rem 0.65rem", marginLeft:"auto", fontWeight:700 }} className="uppercase">
                  {post.category}
                </span>
              </div>

              <h3 style={{ fontFamily:FONT_BODY, fontWeight:700, fontSize:"13px", letterSpacing:"0.04em",
                           textTransform:"uppercase", lineHeight:1.6, color:DARK }}
                  className="group-hover:opacity-50 transition-opacity duration-200 mb-4">
                {post.title}
              </h3>

              <a href="#" className="hl inline-flex items-center gap-2"
                 style={{ fontFamily:FONT_BODY, color:GOLD, fontSize:"11px", fontWeight:700, letterSpacing:"0.18em" }}>
                Read More <ArrowUpRight size={12} />
              </a>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <GoldButton outline>See All Articles</GoldButton>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Back to top */}
      <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
              aria-label="Back to top"
              style={{
                position:"fixed", bottom:"2rem", right:"2rem", zIndex:50,
                width:"48px", height:"48px", borderRadius:"2px",
                background: GOLD, color: DARK, border:"none", cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center",
                opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(16px)",
                pointerEvents: show ? "auto" : "none",
                transition:"opacity .3s, transform .3s",
                boxShadow:`0 4px 20px rgba(201,169,110,.4)`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = GOLD; }}>
        <ArrowUp size={16} />
      </button>

      <footer id="contact" style={{ background: DARK, borderTop:`1px solid rgba(201,169,110,.15)` }} className="relative overflow-hidden pt-24 pb-10">
        {/* Watermark */}
        <div style={{ fontFamily:FONT_DISPLAY, fontSize:"clamp(120px,20vw,300px)", color:"rgba(201,169,110,.04)",
                      position:"absolute", bottom:0, right:0, lineHeight:1,
                      transform:"translate(5%,15%)", pointerEvents:"none", userSelect:"none" }}>
          {brand.name}
        </div>

        {/* BG tint */}
        <div className="absolute inset-0 opacity-10" style={{ zIndex:0 }}>
          <img src={footerContent.bgImage}
               alt="" aria-hidden className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16"
               style={{ borderBottom:"1px solid rgba(201,169,110,.12)" }}>
            {/* Brand */}
            <div>
              <p style={{ fontFamily:FONT_DISPLAY, color:"#fff", fontSize:"2rem", letterSpacing:"0.15em", marginBottom:"1rem" }}>{brand.name}</p>
              <div style={{ width:"32px", height:"2px", background:GOLD, marginBottom:"1rem" }} />
              <p style={{ fontFamily:FONT_BODY, color:"rgba(255,255,255,.4)", fontSize:"12px", lineHeight:1.8, maxWidth:"240px" }}>
                {brand.tagline}
              </p>
            </div>

            {/* Quick links */}
            <div>
              <p style={{ fontFamily:FONT_BODY, color:GOLD, fontSize:"9px", letterSpacing:"0.22em", marginBottom:"1.25rem" }} className="uppercase">◆ Quick Links</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Home", id: "home" },
                  { label: "About", id: "about" },
                  { label: "Services", id: "services" },
                  { label: "Portfolio", id: "portfolio" },
                  { label: "Awards", id: "awards" },
                  { label: "Journal", id: "journal" },
                  { label: "Contact", id: "contact" }
                ].map(link => (
                  <a key={link.id} href={`#${link.id}`} className="hl w-fit"
                     style={{ fontFamily:FONT_BODY, color:"rgba(255,255,255,.45)", fontSize:"11px", letterSpacing:"0.15em" }}
                     onClick={e => { e.preventDefault(); scrollToSection(link.id); }}
                     onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = GOLD}
                     onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.45)"}
                  >{link.label}</a>
                ))}
              </div>
            </div>

            {/* Visit */}
            <div>
              <p style={{ fontFamily:FONT_BODY, color:GOLD, fontSize:"9px", letterSpacing:"0.22em", marginBottom:"1.25rem" }} className="uppercase">◆ Visit</p>
              <address style={{ fontFamily:FONT_BODY, color:"rgba(255,255,255,.45)", fontSize:"12px", lineHeight:1.9, fontStyle:"normal", whiteSpace:"pre-line" }}>
                {contact.address}
              </address>
              <a href={contact.phoneHref}
                 style={{ fontFamily:FONT_BODY, color:"rgba(255,255,255,.45)", fontSize:"12px", display:"block", marginTop:"0.75rem" }}
                 onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = GOLD}
                 onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.45)"}>
                {contact.phone}
              </a>
            </div>

            {/* Connect + Newsletter */}
            <div>
              <p style={{ fontFamily:FONT_BODY, color:GOLD, fontSize:"9px", letterSpacing:"0.22em", marginBottom:"1.25rem" }} className="uppercase">◆ Connect</p>
              <div className="flex flex-col gap-3 mb-8">
                {socialLinks.map(p => (
                  <a key={p} href="#" className="hl w-fit"
                     style={{ fontFamily:FONT_BODY, color:"rgba(255,255,255,.45)", fontSize:"11px", letterSpacing:"0.15em" }}
                     onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = GOLD}
                     onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.45)"}>{p}</a>
                ))}
              </div>
              <p style={{ fontFamily:FONT_BODY, color:"rgba(255,255,255,.3)", fontSize:"9px", letterSpacing:"0.22em", marginBottom:"0.75rem" }} className="uppercase">Newsletter</p>
              <div className="flex">
                <input type="email" placeholder="your@email.com"
                       style={{ flex:1, background:"rgba(255,255,255,.06)", border:`1px solid rgba(201,169,110,.2)`,
                                padding:"0.65rem 0.75rem", fontSize:"11px", color:"#fff", outline:"none",
                                fontFamily:FONT_BODY }}
                       onFocus={e => (e.currentTarget as HTMLInputElement).style.borderColor=GOLD}
                       onBlur={e => (e.currentTarget as HTMLInputElement).style.borderColor="rgba(201,169,110,.2)"}
                />
                <button style={{ background:GOLD, color:DARK, padding:"0 1rem", border:`1px solid ${GOLD}`,
                                 fontWeight:700, fontSize:"14px", cursor:"pointer", transition:"all .2s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background=DARK; (e.currentTarget as HTMLButtonElement).style.color=GOLD; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background=GOLD; (e.currentTarget as HTMLButtonElement).style.color=DARK; }}>
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p style={{ fontFamily:FONT_BODY, color:"rgba(255,255,255,.2)", fontSize:"11px" }}>{brand.copyright}</p>
            <div className="flex gap-6">
              {footerContent.legalLinks.map(t => (
                <a key={t} href="#"
                   style={{ fontFamily:FONT_BODY, color:"rgba(255,255,255,.2)", fontSize:"11px" }}
                   onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = GOLD}
                   onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.2)"}>{t}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ fontFamily: FONT_BODY }}>
      <style>{GLOBAL_CSS}</style>
      <Header open={open} setOpen={setOpen} />
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
