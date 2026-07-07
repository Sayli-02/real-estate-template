// -----------------------------------------------------------------------------
//  content.ts
//  Edit any value here and the website will automatically reflect the change.
//  Images: use absolute URLs (Unsplash / your CDN) or /public paths.
// -----------------------------------------------------------------------------

// --- Brand / Site Identity ---------------------------------------------------

export const brand = {
  name: "OPTIK",
  heroWatermark: "DREAM\u00a0STUDIO",
  tagline:
    "An architecture and design studio working across residential, commercial, cultural, and urban projects worldwide.",
  copyright: "© 2026 Optik Studio Ltd. All rights reserved.",
};

// --- Navigation --------------------------------------------------------------

export const navLinks: { label: string; id: string }[] = [
  { label: "Home",     id: "home"     },
  { label: "About",    id: "about"    },
  { label: "Services", id: "services" },
  { label: "Contact",  id: "contact"  },
];

// --- Contact -----------------------------------------------------------------

export const contact = {
  phone: "+91 22 6123 4567",
  phoneHref: "tel:+912261234567",
  address: "Level 5, Maker Maxity, Bandra Kurla Complex\nBandra East, Mumbai 400051\nMaharashtra, India",
};

// --- Social Links ------------------------------------------------------------

export const socialLinks = ["Instagram", "LinkedIn", "Pinterest", "Behance"];

// --- Hero Section ------------------------------------------------------------

export const hero = {
  image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&h=1200&fit=crop&auto=format",
  imageAlt: "Hero architecture photograph",
  subheadline:
    "We are an architecture and design studio that shapes spaces with intention — from intimate residences to landmark cultural buildings.",
  ctaLabel: "Explore Our Work",
  featuredCard: {
    label: "Featured Project",
    title: "Horizon Residence",
    location: "Goa, India",
    linkLabel: "View Project",
  },
};

// --- Client Logos (Marquee) --------------------------------------------------

export const clientLogos = [
  "VANTA", "MERIDIAN", "HELIX CO.", "SOLVARA",
  "ARCFORM", "VEXA", "NORDHAUS", "STRATO",
];

// --- About Section -----------------------------------------------------------

export const about = {
  label: "About Us",
  headingLine1: "Building",
  headingLine2: "Ideas Into",
  headingGold: "Reality",
  body:
    "Founded in 2007, Optik has grown from a two-person practice into a studio of over sixty designers, architects, and urban thinkers. We are drawn to complexity — projects that require invention, not formula.",
  estYear: "2007",
  stats: [
    { value: 17,  suffix: "",  label: "Years of practice" },
    { value: 67,  suffix: "+", label: "Studio members"   },
    { value: 120, suffix: "+", label: "Projects built"   },
  ] as { value: number; suffix: string; label: string }[],
  images: {
    top: {
      src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&h=450&fit=crop&auto=format",
      alt: "Studio interior",
    },
    bottom: {
      src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=700&h=350&fit=crop&auto=format",
      alt: "Architecture detail",
    },
  },
};

// --- Portfolio Section -------------------------------------------------------

export const portfolioFilters = ["All", "Residential", "Commercial", "Cultural"];

export interface Project {
  id: number;
  title: string;
  location: string;
  category: string;
  /** Main card thumbnail */
  image: string;
  /** Gallery images shown in the project detail modal */
  gallery: string[];
  /**
   * Wide panoramic image (3:1 aspect ratio ideal) for the interactive 360° viewer.
   * The viewer lets users drag left/right to pan across the image.
   */
  panoramaImage: string;
  /** Short project description */
  description: string;
  /** Sale / purchase price, e.g. "₹8.5 Cr" */
  price: string;
  /** Monthly rent, e.g. "₹2.5L / month" — set to "" to hide */
  rent: string;
  /** Total floor area, e.g. "6,200 sq.ft" */
  area: string;
  bedrooms?: number;
  bathrooms?: number;
  yearBuilt: string;
  /** "Available" | "Sold" | "For Rent" | "Operational" */
  status: string;
  /** Amenity chips shown in the modal */
  amenities: string[];
  architect?: string;
}

export const projects: Project[] = [
  // ── 1 ─ Horizon Villa ──────────────────────────────────────────────────────
  {
    id: 1,
    title: "Horizon Villa",
    location: "Goa, India",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=700&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1200&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&h=750&fit=crop&auto=format",
    ],
    panoramaImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=3000&h=1000&fit=crop&auto=format",
    description:
      "An ocean-facing private villa perched on the cliffs of North Goa. Designed to dissolve the boundary between interior and sea view, Horizon Villa is a testament to understated luxury — where every room frames the Arabian Sea at golden hour.",
    price: "₹8.5 Cr",
    rent: "₹2.5L / month",
    area: "6,200 sq.ft",
    bedrooms: 5,
    bathrooms: 6,
    yearBuilt: "2023",
    status: "Available",
    amenities: ["Infinity Pool", "Home Theatre", "Smart Home", "Private Garden", "3-Car Garage", "Sea View Terrace", "Staff Quarters"],
    architect: "Kabir Sharma",
  },

  // ── 2 ─ The Meridian Tower ─────────────────────────────────────────────────
  {
    id: 2,
    title: "The Meridian Tower",
    location: "Mumbai, India",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=700&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1462899006636-339e08d1844e?w=1200&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1200&h=750&fit=crop&auto=format",
    ],
    panoramaImage: "https://images.unsplash.com/photo-1545232979-8bf34eb9757b?w=3000&h=1000&fit=crop&auto=format",
    description:
      "A 32-storey commercial landmark in the heart of Mumbai's Bandra Kurla Complex. The Meridian Tower redefines Grade-A office space with its climate-responsive facade, sky gardens on every fourth floor, and a rooftop amenity deck with panoramic city views.",
    price: "₹45 Cr",
    rent: "₹8L / month",
    area: "28,000 sq.ft",
    yearBuilt: "2022",
    status: "For Rent",
    amenities: ["Rooftop Terrace", "Sky Gardens", "Concierge Lobby", "4-Level Car Park", "24×7 Security", "Conference Suites", "Café & Bistro"],
    architect: "Priya Agarwal",
  },

  // ── 3 ─ The Courtyard House ────────────────────────────────────────────────
  {
    id: 3,
    title: "The Courtyard House",
    location: "Alibaug, India",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=700&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=750&fit=crop&auto=format",
    ],
    panoramaImage: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=3000&h=1000&fit=crop&auto=format",
    description:
      "A serene weekend retreat organized around a central limestone courtyard that channels coastal breezes. The Courtyard House draws on Konkan vernacular architecture — thick walls, shaded verandas, and an outdoor bathing court — reinterpreted in a contemporary language.",
    price: "₹3.2 Cr",
    rent: "₹95K / month",
    area: "3,800 sq.ft",
    bedrooms: 4,
    bathrooms: 4,
    yearBuilt: "2022",
    status: "Available",
    amenities: ["Central Courtyard", "Swimming Pool", "Outdoor Kitchen", "Firepit Lounge", "Private Garden", "Bicycle Storage"],
    architect: "Kabir Sharma",
  },

  // ── 4 ─ Vault Arts Centre ──────────────────────────────────────────────────
  {
    id: 4,
    title: "Vault Arts Centre",
    location: "New Delhi, India",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=700&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=1200&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1543906965-f9520aa2ed8a?w=1200&h=750&fit=crop&auto=format",
    ],
    panoramaImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=3000&h=1000&fit=crop&auto=format",
    description:
      "A civic landmark for contemporary arts in Lutyens' Delhi. Vault's subterranean galleries create a world beneath the city, where natural light filters through a monumental skylight grid. The building is designed for permanence — its raw concrete shell expected to outlast several generations of exhibitions.",
    price: "Public Institution",
    rent: "",
    area: "45,000 sq.ft",
    yearBuilt: "2021",
    status: "Operational",
    amenities: ["3 Exhibition Halls", "Performance Theatre", "Sculpture Garden", "Archive Library", "Café & Reading Room", "Artist-in-Residence Studios"],
    architect: "Kabir Sharma & Ananya Bose",
  },

  // ── 5 ─ Glass Retreat ──────────────────────────────────────────────────────
  {
    id: 5,
    title: "Glass Retreat",
    location: "Karjat, India",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1549517045-bc93de075e53?w=1200&h=700&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1549517045-bc93de075e53?w=1200&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1601918774516-b0cb2cd08c10?w=1200&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=750&fit=crop&auto=format",
    ],
    panoramaImage: "https://images.unsplash.com/photo-1601918774516-b0cb2cd08c10?w=3000&h=1000&fit=crop&auto=format",
    description:
      "A high-altitude corporate retreat anchored in the Western Ghats. Floor-to-ceiling glass walls dissolve the boundary between boardroom and rainforest. Glass Retreat is designed for focused work — silent, distraction-free, and profoundly connected to the natural world.",
    price: "₹6.8 Cr",
    rent: "₹1.8L / month",
    area: "8,500 sq.ft",
    yearBuilt: "2023",
    status: "Available",
    amenities: ["360° Forest Views", "Helipad", "Outdoor Pavilion", "Spa & Wellness", "Conference Facilities", "Chef's Kitchen", "Hiking Trails"],
    architect: "Priya Agarwal",
  },
];

// --- Services Section --------------------------------------------------------

export interface Service {
  num: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

export const services: Service[] = [
  {
    num: "01",
    title: "Architectural Design",
    description:
      "From initial concept through to construction documentation, we craft buildings that balance beauty with structural integrity and long-term livability.",
    tags: ["Concept", "Schematic Design", "Documentation", "Site Supervision"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&h=600&fit=crop&auto=format",
  },
  {
    num: "02",
    title: "Interior Architecture",
    description:
      "We shape spaces from the inside out — materiality, light, proportion, and detail considered as one unified composition.",
    tags: ["Space Planning", "Materials", "Lighting Design", "Furniture"],
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&h=600&fit=crop&auto=format",
  },
  {
    num: "03",
    title: "Urban Strategy",
    description:
      "Large-scale thinking for cities and communities: master planning, public space design, and mixed-use development that adds genuine value.",
    tags: ["Master Planning", "Mixed-Use", "Public Space", "Zoning"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&h=600&fit=crop&auto=format",
  },
  {
    num: "04",
    title: "Heritage & Adaptive Reuse",
    description:
      "Breathing new life into existing buildings. We specialise in sensitive interventions that preserve what matters while enabling what is needed today.",
    tags: ["Conservation", "Adaptive Reuse", "Heritage", "Restoration"],
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=700&h=600&fit=crop&auto=format",
  },
];

// --- Awards Section ----------------------------------------------------------

export const awardsSection = {
  label: "Recognition",
  headingLine1: "Awards &",
  headingGold: "Honours",
  quote: {
    text: '"Architecture is not about buildings. It is about people and how they inhabit space."',
    attribution: "— Kabir Sharma, Founder",
  },
  badgeYears: 17,
  images: {
    top: {
      src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&h=420&fit=crop&auto=format",
      alt: "Award winning project",
    },
    bottom: {
      src: "https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=600&h=300&fit=crop&auto=format",
      alt: "Architecture detail",
    },
  },
};

export interface Award {
  name: string;
  year: string;
  category: string;
}

export const awards: Award[] = [
  { name: "European Architecture Prize",      year: "2023", category: "Residential" },
  { name: "Dezeen Awards Longlist",           year: "2022", category: "Interior"    },
  { name: "Architectural Review Award",       year: "2021", category: "Cultural"    },
  { name: "RIBA International Prize",         year: "2020", category: "Commercial"  },
  { name: "World Architecture Festival",      year: "2019", category: "Urban"       },
  { name: "AZ Award — Best New Global Voice", year: "2018", category: "Emerging"   },
];

// --- Testimonials Section ----------------------------------------------------

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating: number;
  image: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Optik transformed our brief into something we never could have imagined ourselves — a home that feels both extraordinary and completely natural to live in.",
    name: "Ananya Sen",
    role: "Private Residential Client (Goa)",
    rating: 5,
    image:  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop&crop=faces&auto=format",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces&auto=format",
  },
  {
    quote:
      "The team's understanding of how people actually use public spaces is unrivalled. The cultural centre they designed for us has become the heartbeat of our city.",
    name: "Kabir Mehta",
    role: "Director, Delhi Arts Trust",
    rating: 5,
    image:  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&h=500&fit=crop&crop=faces&auto=format",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=120&fit=crop&crop=faces&auto=format",
  },
  {
    quote:
      "Working with Optik was a masterclass in rigour. Every detail has a reason. Every space serves a purpose. We could not be prouder of what we built together.",
    name: "Vikram Malhotra",
    role: "CEO, Meridian Realty (Mumbai)",
    rating: 5,
    image:  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=500&fit=crop&crop=faces&auto=format",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces&auto=format",
  },
];

// --- Insights / Journal Section ----------------------------------------------

export const insightsSection = {
  label: "Ideas & Writing",
  headingLine1: "Latest Thought",
  headingLine2: "from the",
  headingGold: "Studio",
  bannerImage: {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=300&fit=crop&auto=format",
    alt: "Studio insights",
  },
};

export interface Post {
  date: string;
  category: string;
  readTime: string;
  title: string;
  image: string;
}

export const posts: Post[] = [
  {
    date: "June 12, 2026",
    category: "Material",
    readTime: "5 min",
    title: "Why Concrete Is Having Its Most Interesting Moment in Decades",
    image: "https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=600&h=400&fit=crop&auto=format",
  },
  {
    date: "May 28, 2026",
    category: "Process",
    readTime: "7 min",
    title: "The Brief That Changed How We Think About Natural Light",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&auto=format",
  },
  {
    date: "April 14, 2026",
    category: "Urban",
    readTime: "9 min",
    title: "Density Done Right: Lessons from Three Successful Mixed-Use Projects",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop&auto=format",
  },
];

// --- Footer ------------------------------------------------------------------

export const footer = {
  bgImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&h=600&fit=crop&auto=format",
  legalLinks: ["Privacy Policy", "Terms of Use"],
};
