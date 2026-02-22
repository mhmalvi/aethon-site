export const NAV_LINKS = [
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Intelligent Operations", href: "/solutions/intelligent-operations", icon: "Workflow" as const, tagline: "Workflows that run themselves." },
      { label: "AI in Production", href: "/solutions/ai-in-production", icon: "Brain" as const, tagline: "AI inside your business — not in demos." },
      { label: "Digital Platforms", href: "/solutions/digital-platforms", icon: "Code" as const, tagline: "Software built around your business model." },
      { label: "Security & Resilience", href: "/solutions/security-resilience", icon: "Shield" as const, tagline: "Security built in — not bolted on." },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Real-time Dashboards", href: "/products/real-time-dashboards", icon: "BarChart3" as const, tagline: "Live operational visibility." },
      { label: "Role-based Workflows", href: "/products/role-based-workflows", icon: "Users" as const, tagline: "Configurable task routing." },
      { label: "AI Decision Engine", href: "/products/ai-decision-engine", icon: "Sparkles" as const, tagline: "Governed AI for decisions." },
      { label: "API-first Architecture", href: "/products/api-first-architecture", icon: "Layers" as const, tagline: "Integrate anything, extend without limits." },
    ],
  },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
] as const;

export const HERO = {
  badge: "Digital Systems & Automation Partner",
  headline: "We engineer the systems that run your business.",
  subtext:
    "Automation. AI. Software. Security. Designed to work together, built to last, operated to evolve.",
  ctaPrimary: "Book a Consultation",
  ctaSecondary: "Explore Our Work",
  stats: [
    { value: "68%", label: "Avg. process time reduction" },
    { value: "50+", label: "Systems deployed" },
    { value: "12", label: "Industries served" },
  ],
} as const;

export const CREDIBILITY = {
  trustLine: "Engineering operational capability for forward-thinking companies",
  logos: [
    "TechCorp",
    "FinanceHub",
    "LogiFlow",
    "MedSecure",
    "RetailOS",
    "CloudNine",
  ],
} as const;

export const WHAT_WE_DO = {
  sectionLabel: "What We Build",
  headline: "Four pillars of operational capability",
  subtext:
    "We don't sell tools. We engineer systems that become the operational backbone of your business.",
  pillars: [
    {
      icon: "Workflow" as const,
      title: "Intelligent Operations",
      tagline: "Workflows that run themselves.",
      description:
        "Structured, automated operational systems that connect your tools, teams, and data into one reliable flow.",
      metric: "30–70%",
      metricLabel: "reduction in manual handling",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    },
    {
      icon: "Brain" as const,
      title: "AI in Production",
      tagline: "AI inside your business — not in demos.",
      description:
        "Governed AI systems, copilots, and agents operating securely within real workflows and compliance requirements.",
      metric: "Minutes",
      metricLabel: "not hours for decisions",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    },
    {
      icon: "Code" as const,
      title: "Digital Platforms",
      tagline: "Software built around your business model.",
      description:
        "Internal platforms, customer-facing applications, and SaaS products that become core operational infrastructure.",
      metric: "3×",
      metricLabel: "scalability increase",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    },
    {
      icon: "Shield" as const,
      title: "Security & Resilience",
      tagline: "Security built in — not bolted on.",
      description:
        "Access control, auditability, data protection, and infrastructure hardening as part of every system we design.",
      metric: "Zero",
      metricLabel: "trust architecture",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    },
  ],
} as const;

export const CASE_STUDIES = {
  sectionLabel: "Our Work",
  headline: "Systems that deliver measurable outcomes",
  subtext: "Real problems. Engineered solutions. Proven results.",
  studies: [
    {
      id: "automated-loan-processing",
      industry: "Financial Services",
      title: "Automated loan processing decision workflow",
      problem:
        "Manual document verification created multi-day turnaround times and high operational overhead.",
      solution:
        "We built an end-to-end document ingestion and decision workflow using OCR, rule-based validation, and AI-assisted risk scoring. The system automatically classifies incoming documents, extracts key data, runs compliance checks, and routes decisions to the right team — eliminating manual handoffs entirely.",
      approach: [
        "Mapped the existing 14-step manual review process and identified seven automation opportunities",
        "Built a document classification pipeline using fine-tuned models for financial document types",
        "Engineered a rules engine for compliance validation with audit trail logging",
        "Deployed an AI risk scoring model integrated into the existing loan management system",
        "Created real-time dashboards for operations managers to monitor pipeline health",
      ],
      results: [
        "Processing time reduced from 4.2 days to 1.3 days average",
        "Operational cost per application dropped by 45%",
        "Error rate decreased from 8.3% to under 1.5%",
        "Team capacity freed to handle 2× application volume",
      ],
      metric: "68%",
      metricLabel: "reduction in processing time",
      secondaryMetric: "45%",
      secondaryLabel: "lower cost per application",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
      tech: ["Python", "OCR Pipeline", "Rules Engine", "React Dashboard", "PostgreSQL"],
    },
    {
      id: "ai-shipment-copilot",
      industry: "Logistics & Supply Chain",
      title: "AI copilot for real-time shipment decisions",
      problem:
        "Dispatch teams relied on spreadsheets and manual coordination, causing delays and inconsistent decisions.",
      solution:
        "We designed and deployed an AI-powered dispatch copilot that ingests real-time data from GPS trackers, warehouse systems, and weather APIs. The system recommends optimal routing, flags potential delays before they happen, and automates routine dispatch decisions while escalating exceptions to human operators.",
      approach: [
        "Integrated data feeds from 6 source systems into a unified real-time event stream",
        "Built a predictive delay model trained on 18 months of historical shipment data",
        "Designed an operator interface with one-click accept/override for AI recommendations",
        "Implemented automated dispatch rules for routine shipments under defined thresholds",
        "Deployed monitoring dashboards with live fleet visibility and KPI tracking",
      ],
      results: [
        "Dispatch decision time reduced by 32% across all shipment types",
        "Delivery delays decreased by 22% in the first quarter",
        "Dispatcher workload reduced — team handles 40% more volume",
        "Customer satisfaction scores improved by 18 points",
      ],
      metric: "32%",
      metricLabel: "faster dispatch decisions",
      secondaryMetric: "22%",
      secondaryLabel: "fewer delivery delays",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
      tech: ["Event Streaming", "ML Pipeline", "Next.js", "Real-time APIs", "Kubernetes"],
    },
    {
      id: "multi-tenant-saas-platform",
      industry: "SaaS Platform",
      title: "Scalable multi-tenant customer platform",
      problem:
        "Legacy system could not support growth or new revenue models.",
      solution:
        "We re-architected the client's monolithic application into a modern multi-tenant platform with isolated data, role-based access, and usage-based billing. The new system supports white-label deployments, API-first integrations, and scales horizontally to handle 10× current load.",
      approach: [
        "Conducted a full architecture audit identifying scaling bottlenecks and security gaps",
        "Designed a multi-tenant data isolation strategy with per-tenant encryption keys",
        "Built a microservices backend with API gateway and event-driven communication",
        "Implemented role-based access control with tenant-scoped permissions",
        "Engineered a usage-based billing system integrated with Stripe",
      ],
      results: [
        "Platform now supports 3× more concurrent users without performance degradation",
        "Unlocked a new recurring revenue stream through tiered subscription pricing",
        "Deployment time for new tenants reduced from 2 weeks to under 4 hours",
        "Zero-downtime deployments achieved with blue-green release strategy",
      ],
      metric: "3×",
      metricLabel: "user growth capacity",
      secondaryMetric: "New",
      secondaryLabel: "recurring revenue stream",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      tech: ["TypeScript", "Microservices", "PostgreSQL", "Stripe", "Terraform"],
    },
  ],
} as const;

export const PRODUCTS = {
  sectionLabel: "Products",
  headline: "Built from real operational experience.",
  body: "Our platforms solve recurring business problems — engineered for security, scalability, and rapid deployment. Created from patterns we see across industries.",
  cta: "Explore Products",
  features: [
    {
      id: "real-time-dashboards",
      label: "Real-time Dashboards",
      icon: "BarChart3" as const,
      tagline: "Live operational visibility.",
      description:
        "Live operational dashboards that surface the metrics that matter. Monitor system health, team performance, and business KPIs with sub-second data refresh — all within a secure, role-aware interface.",
      capabilities: [
        "Sub-second data refresh across all metrics",
        "Role-aware views from C-suite to operations floor",
        "Custom widget builder with drag-and-drop layout",
        "Alert thresholds and anomaly detection",
        "Exportable reports and scheduled snapshots",
      ],
      metric: "< 1s",
      metricLabel: "data refresh latency",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    },
    {
      id: "role-based-workflows",
      label: "Role-based Workflows",
      icon: "Users" as const,
      tagline: "Configurable task routing.",
      description:
        "Configurable workflow engines that route tasks, approvals, and escalations based on team roles and permissions. Built for compliance-heavy environments where auditability is non-negotiable.",
      capabilities: [
        "Visual workflow builder with conditional logic",
        "Role-based approval chains and escalations",
        "Full audit trail for every action",
        "SLA tracking and deadline enforcement",
        "Integration with existing identity providers",
      ],
      metric: "100%",
      metricLabel: "audit trail coverage",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop",
    },
    {
      id: "ai-decision-engine",
      label: "AI Decision Engine",
      icon: "Sparkles" as const,
      tagline: "Governed AI for decisions.",
      description:
        "Production-grade AI that plugs into your decision workflows. From document classification to risk scoring, our engine handles the reasoning so your team can focus on judgment calls.",
      capabilities: [
        "Document classification and extraction",
        "Risk scoring with explainable outputs",
        "Human-in-the-loop review workflows",
        "Model versioning and A/B testing",
        "Compliance-ready governance controls",
      ],
      metric: "85%",
      metricLabel: "faster decision cycles",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
    },
    {
      id: "api-first-architecture",
      label: "API-first Architecture",
      icon: "Layers" as const,
      tagline: "Integrate anything, extend without limits.",
      description:
        "Every platform we build exposes clean, documented APIs from day one. Integrate with your existing stack, extend functionality, or build entirely new products on top of a proven foundation.",
      capabilities: [
        "RESTful and GraphQL endpoints",
        "Versioned APIs with backward compatibility",
        "Auto-generated SDK and documentation",
        "Webhook support for event-driven integration",
        "Rate limiting and usage analytics",
      ],
      metric: "∞",
      metricLabel: "integration possibilities",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop",
    },
  ],
} as const;

export const INDUSTRIES = {
  sectionLabel: "Industries",
  headline: "Deep expertise across regulated and complex sectors",
  items: [
    {
      id: "financial",
      icon: "Landmark" as const,
      label: "Financial Services",
      description: "Compliance-ready automation",
      longDescription:
        "We build automated compliance workflows, fraud detection pipelines, and secure document processing systems for banks, insurers, and fintechs operating under strict regulatory requirements.",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
    },
    {
      id: "healthcare",
      icon: "HeartPulse" as const,
      label: "Healthcare",
      description: "Secure patient data systems",
      longDescription:
        "From patient data integration to clinical workflow automation, we engineer systems that meet healthcare compliance standards while improving care coordination and operational efficiency.",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    },
    {
      id: "logistics",
      icon: "Truck" as const,
      label: "Logistics",
      description: "Real-time operations intelligence",
      longDescription:
        "Real-time tracking, AI-powered dispatch optimization, and end-to-end supply chain visibility systems that reduce delays and improve decision-making across your logistics network.",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
    },
    {
      id: "retail",
      icon: "ShoppingCart" as const,
      label: "Retail & E-commerce",
      description: "Scalable platform engineering",
      longDescription:
        "Scalable commerce platforms, inventory intelligence systems, and customer experience automation that grow with your business and adapt to seasonal demand patterns.",
      imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
    },
    {
      id: "professional",
      icon: "Briefcase" as const,
      label: "Professional Services",
      description: "Workflow transformation",
      longDescription:
        "Project management automation, resource allocation systems, and client delivery platforms that streamline operations for consulting firms, agencies, and managed service providers.",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    },
    {
      id: "technology",
      icon: "Cpu" as const,
      label: "Technology",
      description: "Infrastructure modernization",
      longDescription:
        "Legacy system modernization, cloud migration strategies, and developer platform engineering that accelerate your team's ability to ship reliable software at scale.",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    },
  ],
} as const;

export const HOW_WE_WORK = {
  sectionLabel: "Our Process",
  headline: "The Aethon Delivery Framework",
  subtext: "From operational challenge to dependable system.",
  phases: [
    {
      number: 1,
      title: "Discover",
      subtitle: "Understand before building",
      description:
        "We map workflows, data movement, decision points, and risk areas. Output: System audit + transformation roadmap.",
      icon: "Search" as const,
    },
    {
      number: 2,
      title: "Architect",
      subtitle: "Design the system",
      description:
        "System architecture, integration model, security structure, and governance controls. Output: Execution-ready blueprint.",
      icon: "PenTool" as const,
    },
    {
      number: 3,
      title: "Engineer",
      subtitle: "Build with precision",
      description:
        "Modular delivery, continuous validation, documentation from day one. Production-ready from the start.",
      icon: "Wrench" as const,
    },
    {
      number: 4,
      title: "Deploy",
      subtitle: "Launch without disruption",
      description:
        "Controlled rollout, team enablement, performance monitoring. Zero-downtime transitions.",
      icon: "Rocket" as const,
    },
    {
      number: 5,
      title: "Evolve",
      subtitle: "Continuously improve",
      description:
        "Ongoing optimization, capability expansion, managed reliability. Systems that get better over time.",
      icon: "TrendingUp" as const,
    },
  ],
} as const;

export const WHY_CHOOSE_US = {
  sectionLabel: "Why Aethon",
  headline: "A systems partner — not a project vendor",
  items: [
    {
      title: "Engineering-led",
      description:
        "Every engagement is architecture-first and outcome-driven. We start from operational challenges, not technologies.",
      icon: "Code2" as const,
    },
    {
      title: "Security by design",
      description:
        "Access, governance, and auditability are built into every system. Security is infrastructure, not an afterthought.",
      icon: "ShieldCheck" as const,
    },
    {
      title: "Vendor-neutral",
      description:
        "We choose the right tools for each problem. No platform lock-in, no forced stacks — the best engineering decision.",
      icon: "GitBranch" as const,
    },
    {
      title: "Built to last",
      description:
        "We create systems your team can run, extend, and scale. Our role continues beyond deployment into continuous improvement.",
      icon: "Infinity" as const,
    },
  ],
} as const;

export const FAQ = {
  sectionLabel: "FAQ",
  headline: "Questions we hear most",
  items: [
    {
      question: "How long does a typical engagement last?",
      answer:
        "Most initial engagements run 8–16 weeks from discovery through deployment. Complex enterprise systems may extend to 6 months. After launch, we offer ongoing optimization and managed operations retainers.",
    },
    {
      question: "Which industries do you specialize in?",
      answer:
        "We work across financial services, healthcare, logistics, retail, professional services, and technology. Our strength is in regulated and operationally complex environments where reliability, compliance, and security are non-negotiable.",
    },
    {
      question: "How do you handle security and compliance?",
      answer:
        "Security is built into every system from day one — not bolted on at the end. We implement zero-trust architecture, role-based access control, audit logging, and data encryption by default. We work within SOC 2, HIPAA, GDPR, and PCI-DSS requirements as needed.",
    },
    {
      question: "Can you integrate with our existing systems?",
      answer:
        "Yes. We design API-first architectures that connect with your existing tools, databases, and third-party services. Our discovery phase maps all integration points before any code is written.",
    },
    {
      question: "What does your support model look like after launch?",
      answer:
        "We offer tiered support from monitoring-only to fully managed operations. Every engagement includes a transition period with documentation, team training, and knowledge transfer. Our Evolve phase ensures systems improve continuously.",
    },
    {
      question: "Do you build custom software or use off-the-shelf tools?",
      answer:
        "Both — we're vendor-neutral and choose the right approach for each problem. When existing platforms fit, we integrate and extend them. When your requirements are unique, we engineer custom solutions designed to scale.",
    },
  ],
} as const;

export const FINAL_CTA = {
  headline: "Let's engineer your next system.",
  subtext:
    "We don't implement tools. We build dependable business systems that drive operational capability.",
  cta: "Start a Conversation",
} as const;

export const ABOUT = {
  hero: {
    badge: "About Aethon",
    headline: "We build systems that businesses depend on.",
    story:
      "Aethon was founded on a simple principle: businesses deserve technology partners who think in systems, not features. We combine deep engineering expertise with operational understanding to create digital infrastructure that lasts.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop",
  },
  values: [
    {
      title: "Precision",
      description:
        "Every system we build is architected with intent. No shortcuts, no bloat — only what serves the mission.",
      icon: "Crosshair" as const,
    },
    {
      title: "Ownership",
      description:
        "We operate what we build. Our commitment extends past deployment into continuous reliability and evolution.",
      icon: "Shield" as const,
    },
    {
      title: "Transparency",
      description:
        "Clear communication, honest timelines, and full visibility into how your systems are built and maintained.",
      icon: "Eye" as const,
    },
    {
      title: "Evolution",
      description:
        "Technology moves fast. We design systems that adapt, scale, and improve — not ones that need replacing.",
      icon: "TrendingUp" as const,
    },
  ],
  capabilities: [
    { value: "50+", label: "Systems deployed" },
    { value: "68%", label: "Avg. process time reduction" },
    { value: "Zero", label: "Trust architecture" },
    { value: "24/7", label: "Managed operations" },
  ],
} as const;

export const CONTACT = {
  headline: "Start a conversation.",
  subtext:
    "Tell us about your operational challenge. We'll get back to you within one business day.",
  form: {
    namePlaceholder: "Your name",
    emailPlaceholder: "Email address",
    companyPlaceholder: "Company",
    messagePlaceholder: "Tell us about your project or challenge...",
    submitLabel: "Send Message",
    successMessage: "Message sent. We'll be in touch shortly.",
  },
} as const;

export const INSIGHTS = {
  headline: "Insights & perspectives",
  subtext:
    "Practical thinking on systems engineering, AI in production, and building technology that lasts.",
  posts: [
    {
      title: "Why most AI projects fail before production",
      category: "AI Strategy",
      date: "2025-11-15",
      excerpt:
        "The gap between a working prototype and a production AI system is wider than most teams expect. Here's what separates the projects that ship from those that stall.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      readTime: "6 min read",
    },
    {
      title: "Zero-trust architecture for mid-market companies",
      category: "Security",
      date: "2025-10-22",
      excerpt:
        "You don't need enterprise-grade budgets to implement zero-trust. A practical framework for companies with 50–500 employees.",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
      readTime: "8 min read",
    },
    {
      title: "The real cost of manual operations at scale",
      category: "Automation",
      date: "2025-09-18",
      excerpt:
        "Manual processes that work at 10 employees break at 100. We break down the hidden costs and the inflection points where automation pays for itself.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      readTime: "5 min read",
    },
    {
      title: "Building internal platforms your team will actually use",
      category: "Engineering",
      date: "2025-08-30",
      excerpt:
        "The best internal tools are the ones nobody notices. Lessons from deploying developer and operational platforms across regulated industries.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
      readTime: "7 min read",
    },
    {
      title: "Compliance automation: beyond the checkbox",
      category: "Compliance",
      date: "2025-08-12",
      excerpt:
        "Automated compliance isn't about passing audits faster — it's about building systems where compliance is a natural byproduct of good architecture.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
      readTime: "6 min read",
    },
    {
      title: "From legacy to modern: migration without the midnight outages",
      category: "Modernization",
      date: "2025-07-25",
      excerpt:
        "A phased approach to replacing critical business systems that keeps operations running while you build what's next.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
      readTime: "9 min read",
    },
  ],
} as const;

export const CAREERS = {
  headline: "Build what matters.",
  subtext:
    "We're a small, focused team that ships real systems for real businesses. If you want to do meaningful engineering work without the noise, we'd like to hear from you.",
  culture: [
    {
      title: "Remote-first",
      description:
        "Work from wherever you do your best thinking. We coordinate across time zones, not office floors.",
      icon: "Globe" as const,
    },
    {
      title: "Engineering ownership",
      description:
        "You architect it, you build it, you own it. No handoffs to 'another team' — the work is yours end to end.",
      icon: "Code2" as const,
    },
    {
      title: "Client impact",
      description:
        "Every project ships to production. You'll see your work running inside real businesses, not languishing in staging.",
      icon: "Rocket" as const,
    },
    {
      title: "Continuous learning",
      description:
        "New industries, new challenges, new technologies. The work changes — which means you grow.",
      icon: "TrendingUp" as const,
    },
  ],
  openings: [
    {
      title: "Senior Full-Stack Engineer",
      type: "Full-time · Remote",
      description:
        "Build production systems across our client engagements. Strong TypeScript, React, Node.js, and cloud infrastructure experience required.",
    },
    {
      title: "AI/ML Engineer",
      type: "Full-time · Remote",
      description:
        "Design and deploy AI systems that operate inside real business workflows. Experience with LLMs, data pipelines, and production ML infrastructure.",
    },
    {
      title: "DevOps / Platform Engineer",
      type: "Full-time · Remote",
      description:
        "Build and maintain the infrastructure that powers our client deployments. Kubernetes, Terraform, CI/CD, and monitoring at scale.",
    },
  ],
} as const;

export const FOOTER = {
  company: "Aethon",
  tagline: "Designing, building, and running dependable business systems.",
  copyright: `© ${new Date().getFullYear()} Aethon. All rights reserved.`,
  links: {
    company: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    solutions: [
      { label: "Intelligent Operations", href: "/solutions/intelligent-operations" },
      { label: "AI in Production", href: "/solutions/ai-in-production" },
      { label: "Digital Platforms", href: "/solutions/digital-platforms" },
      { label: "Security & Resilience", href: "/solutions/security-resilience" },
    ],
    products: [
      { label: "Real-time Dashboards", href: "/products/real-time-dashboards" },
      { label: "Role-based Workflows", href: "/products/role-based-workflows" },
      { label: "AI Decision Engine", href: "/products/ai-decision-engine" },
      { label: "API-first Architecture", href: "/products/api-first-architecture" },
    ],
    resources: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Insights", href: "/insights" },
      { label: "How We Work", href: "/#process" },
    ],
  },
  contact: {
    email: "info@aethonautomation.com",
    phone: ["+1 (830) 754-4901", "+880 1710 895523"],
    address: "123 Denver, CO 80203, USA",
    location: "Denver, CO — Global Delivery",
  },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/aethonautomation/", icon: "Instagram" as const },
    { label: "X", href: "https://x.com/Aethon_Auto", icon: "Twitter" as const },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/aethon-automation-solutions/", icon: "Linkedin" as const },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61571456545546", icon: "Facebook" as const },
  ],
} as const;

export const SOLUTIONS = {
  sectionLabel: "Solutions",
  headline: "Systems engineered for real operational impact",
  subtext:
    "We build four types of systems — each designed to solve a distinct layer of your operational challenge.",
  pillars: [
    {
      id: "intelligent-operations",
      icon: "Workflow" as const,
      title: "Intelligent Operations",
      tagline: "Workflows that run themselves.",
      description:
        "Structured, automated operational systems that connect your tools, teams, and data into one reliable flow. We map your existing processes, identify bottlenecks, and engineer automated workflows that eliminate manual handoffs.",
      capabilities: [
        "End-to-end workflow automation",
        "Cross-system data orchestration",
        "Approval routing & escalation logic",
        "Real-time operational dashboards",
        "Exception handling & alerting",
      ],
      metric: "30–70%",
      metricLabel: "reduction in manual handling",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    },
    {
      id: "ai-in-production",
      icon: "Brain" as const,
      title: "AI in Production",
      tagline: "AI inside your business — not in demos.",
      description:
        "Governed AI systems, copilots, and agents operating securely within real workflows and compliance requirements. We bridge the gap between AI prototypes and production-grade systems your team can depend on.",
      capabilities: [
        "LLM-powered document processing",
        "Decision support copilots",
        "Predictive analytics pipelines",
        "AI governance & monitoring",
        "Secure model deployment",
      ],
      metric: "Minutes",
      metricLabel: "not hours for decisions",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
    },
    {
      id: "digital-platforms",
      icon: "Code" as const,
      title: "Digital Platforms",
      tagline: "Software built around your business model.",
      description:
        "Internal platforms, customer-facing applications, and SaaS products that become core operational infrastructure. We design API-first architectures that scale with your business and integrate with your existing stack.",
      capabilities: [
        "Multi-tenant SaaS architecture",
        "Internal tooling & admin systems",
        "Customer portals & dashboards",
        "API-first platform design",
        "Migration & modernization",
      ],
      metric: "3×",
      metricLabel: "scalability increase",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop",
    },
    {
      id: "security-resilience",
      icon: "Shield" as const,
      title: "Security & Resilience",
      tagline: "Security built in — not bolted on.",
      description:
        "Access control, auditability, data protection, and infrastructure hardening as part of every system we design. Security isn't a phase — it's embedded in our architecture from day one.",
      capabilities: [
        "Zero-trust architecture",
        "Role-based access control",
        "Audit logging & compliance",
        "Data encryption at rest & in transit",
        "Infrastructure hardening",
      ],
      metric: "Zero",
      metricLabel: "trust architecture",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop",
    },
  ],
} as const;
