# Aethon Site

A modern corporate website for Aethon, built with Next.js 16 and React 19. Features smooth animations, 3D shader gradients, and a comprehensive page structure covering products, solutions, case studies, and insights.

## Features

- **Homepage** — Hero section with shader gradient backgrounds (Three.js) and capability showcase
- **Products** — Product catalog with dynamic detail pages (`/products/[slug]`)
- **Solutions** — Solutions directory with individual solution pages (`/solutions/[slug]`)
- **Case Studies** — Portfolio of case studies with filterable listings
- **Insights** — Blog/article section with individual post pages (`/insights/[slug]`)
- **About** — Company values, capabilities, and team information
- **Careers** — Job listings and career information
- **Contact** — Contact form with toast notifications (Sonner)
- **Smooth Scrolling** — Lenis-powered smooth scroll experience
- **Animations** — Motion (Framer Motion) for page transitions and scroll animations
- **Credibility Marquee** — Scrolling partner/client logo marquee
- **Responsive Design** — Tailwind CSS with mobile-first approach

## Tech Stack

- **Framework:** Next.js 16.1 (App Router)
- **UI:** React 19, Tailwind CSS 4, Radix UI primitives
- **Components:** shadcn/ui (via class-variance-authority + tailwind-merge)
- **3D Graphics:** Three.js + @react-three/fiber, @shadergradient/react
- **Animations:** Motion (Framer Motion), Lenis smooth scroll
- **Notifications:** Sonner toast notifications
- **Drag & Drop:** Swapy
- **Icons:** Lucide React
- **TypeScript:** Full type safety

## Getting Started

```bash
# Clone the repository
git clone https://github.com/mhmalvi/aethon-site.git
cd aethon-site

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Start the production server
npm start
```

## Project Structure

```
app/
├── page.tsx                # Homepage
├── layout.tsx              # Root layout
├── globals.css             # Global styles
├── about/                  # About page
├── careers/                # Careers page
├── case-studies/           # Case studies listing
├── contact/                # Contact page
├── insights/[slug]/        # Blog posts with dynamic routing
├── products/[slug]/        # Product detail pages
└── solutions/[slug]/       # Solution detail pages
components/
├── sections/navbar.tsx     # Site navigation
└── sections/v2/            # Section components
    ├── about/              # About page sections
    ├── careers/            # Career sections
    ├── case-studies/       # Case study sections
    ├── contact/            # Contact form sections
    ├── capabilities-grid   # Services/capabilities
    ├── credibility-marquee # Client logos
    └── cta-v2              # Call-to-action blocks
```

## License

MIT
