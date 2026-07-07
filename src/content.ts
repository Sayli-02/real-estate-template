// -----------------------------------------------------------------------------
//  content.ts
//  ? Single source of truth for ALL website content and images.
//  ? Edit any value here and the website will automatically reflect the change.
//  ? Images should be absolute URLs (Unsplash, your CDN, etc.) or relative
//    paths to files inside /public (e.g. "/images/hero.jpg").
// -----------------------------------------------------------------------------

// --- Brand / Site Identity ---------------------------------------------------

export const brand = {
  /** Studio name shown in the nav-bar and footer watermark */
  name: "OPTIK",

  /** Watermark text displayed behind the hero headline */
  heroWatermark: "DREAM\u00a0STUDIO",

  /** Short one-liner shown in the footer's brand column */
  tagline:
    "An architecture and design studio working across residential, commercial, cultural, and urban projects worldwide.",

  /** Copyright line in the footer */
  copyright: "� 2026 Optik Studio Ltd. All rights reserved.",
};

// --- Navigation --------------------------------------------------------------

/** Links shown in the top navigation bar (label ? section ID). */
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

// --- Social Links -------------------------------------------------------------

/** Labels shown in the footer "Connect" column. */
export const socialLinks = ["Instagram", "LinkedIn", "Pinterest", "Behance"];

// --- Hero Section -------------------------------------------------------------

export const hero = {
  /** Large background image (parallax) */
  image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&h=1200&fit=crop&auto=format",
  imageAlt: "Hero architecture photograph",

  /** Italic sub-headline below the gold line accent */
  subheadline:
    "We are an architecture and design studio that shapes spaces with intention � from intimate residences to landmark cultural buildings.",

  /** CTA button text */
  ctaLabel: "Explore Our Work",

  /** Floating card in the bottom-right corner */
  featuredCard: {
    label: "Featured Project",
    title: "Horizon Residence",
    location: "Goa, India",
    linkLabel: "View Project",
  },
};

// --- Client Logos (Marquee) ---------------------------------------------------

/** Company names that scroll across the "Trusted By" marquee bar */
export const clientLogos = [
  "VANTA",
  "MERIDIAN",
  "HELIX CO.",
  "SOLVARA",
  "ARCFORM",
  "VEXA",
  "NORDHAUS",
  "STRATO",
];

// --- About Section ------------------------------------------------------------

export const about = {
  label: "About Us",
  headingLine1: "Building",
  headingLine2: "Ideas Into",
  headingGold: "Reality",
  body:
    "Founded in 2007, Optik has grown from a two-person practice into a studio of over sixty designers, architects, and urban thinkers. We are drawn to complexity projects that require invention, not formula.",
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

// --- Portfolio Section --------------------------------------------------------

export const portfolioFilters = ["All", "Residential", "Commercial", "Cultural"];

export interface Project {
  id: number;
  title: string;
  location: string;
  category: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Horizon Villa",
    location: "Goa, India",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=700&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "The Meridian Tower",
    location: "Mumbai, India",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=700&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "The Courtyard House",
    location: "Alibaug, India",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=700&fit=crop&auto=format",
  },
  {
    id: 4,
    title: "Vault Arts Centre",
    location: "New Delhi, India",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=700&fit=crop&auto=format",
  },
  {
    id: 5,
    title: "Glass Retreat",
    location: "Karjat, India",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1549517045-bc93de075e53?w=1200&h=700&fit=crop&auto=format",
  },
];

// --- Services Section ---------------------------------------------------------

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
      "We shape spaces from the inside out � materiality, light, proportion, and detail considered as one unified composition.",
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

// --- Awards Section -----------------------------------------------------------

export const awardsSection = {
  label: "Recognition",
  headingLine1: "Awards &",
  headingGold: "Honours",

  quote: {
    text: '"Architecture is not about buildings. It is about people and how they inhabit space."',
    attribution: "� Kabir Sharma, Founder",
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
  { name: "AZ Award � Best New Global Voice", year: "2018", category: "Emerging"   },
];

// --- Testimonials Section -----------------------------------------------------

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
      "Optik transformed our brief into something we never could have imagined ourselves � a home that feels both extraordinary and completely natural to live in.",
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

// --- Insights / Journal Section -----------------------------------------------

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

// --- Footer -------------------------------------------------------------------

export const footer = {
  bgImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&h=600&fit=crop&auto=format",
  legalLinks: ["Privacy Policy", "Terms of Use"],
};
