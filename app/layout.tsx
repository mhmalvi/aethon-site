import type { Metadata } from "next";
import { Poppins, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { CookieConsent } from "@/components/ui/cookie-consent";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aethonautomation.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aethon — Digital Systems & Automation Partner",
    template: "%s — Aethon",
  },
  description:
    "We design, build, and run reliable business systems — combining automation, AI, software, and security.",
  icons: {
    icon: "/aethon-icon.png",
    apple: "/aethon-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Aethon",
    title: "Aethon — Digital Systems & Automation Partner",
    description:
      "We design, build, and run reliable business systems — combining automation, AI, software, and security.",
    images: [{ url: "/aethon-og.png", width: 1200, height: 630, alt: "Aethon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aethon — Digital Systems & Automation Partner",
    description:
      "We design, build, and run reliable business systems — combining automation, AI, software, and security.",
    images: ["/aethon-og.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://analytics.muhammadhmalvi.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
                  "@id": "https://aethonautomation.com/#organization",
                  "name": "Aethon",
                  "alternateName": "Aethon Automation Solutions",
                  "url": "https://aethonautomation.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://aethonautomation.com/aethon-logo-full.png",
                    "width": 512,
                    "height": 512
                  },
                  "image": "https://aethonautomation.com/aethon-og.png",
                  "description": "We design, build, and run reliable business systems — from intelligent automation and AI integration to secure, scalable platforms.",
                  "priceRange": "$$",
                  "areaServed": [
                    { "@type": "City", "name": "Denver" },
                    { "@type": "State", "name": "Colorado" },
                    { "@type": "Country", "name": "US" }
                  ],
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Denver",
                    "addressRegion": "CO",
                    "postalCode": "80203",
                    "addressCountry": "US"
                  },
                  "contactPoint": [
                    {
                      "@type": "ContactPoint",
                      "email": "info@aethonautomation.com",
                      "contactType": "sales",
                      "availableLanguage": "English"
                    }
                  ],
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Aethon Services",
                    "itemListElement": [
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Process Automation" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Integration & Solutions" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Software Development" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cybersecurity & Compliance" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Data Analytics & BI" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT Consulting & Strategy" } }
                    ]
                  },
                  "sameAs": [
                    "https://www.linkedin.com/company/aethon-automation-solutions/",
                    "https://www.instagram.com/aethonautomation/",
                    "https://x.com/Aethon_Auto",
                    "https://www.facebook.com/profile.php?id=61571456545546"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://aethonautomation.com/#website",
                  "name": "Aethon",
                  "url": "https://aethonautomation.com",
                  "publisher": { "@id": "https://aethonautomation.com/#organization" },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://aethonautomation.com/insights?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${poppins.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {/* Skip to content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>

        <noscript>
          <div style={{ padding: "2rem", textAlign: "center", fontFamily: "system-ui" }}>
            <p>This site requires JavaScript to function properly. Please enable JavaScript in your browser settings.</p>
          </div>
        </noscript>

        <ThemeProvider>
          <SmoothScrollProvider>
            <div vaul-drawer-wrapper="">{children}</div>
          </SmoothScrollProvider>
          <Toaster
            theme="system"
            position="top-right"
            toastOptions={{
              style: {
                background: "var(--background)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
              },
            }}
          />
          <CookieConsent />
        </ThemeProvider>
        {/* Google Tag (GTM + GA4 + Ads) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GT-PLW2FMTZ"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GT-PLW2FMTZ');
            gtag('config', 'G-V27R05QCRP');
            gtag('config', 'AW-499054723');
          `}
        </Script>
        {/* Umami Analytics */}
        <Script
          defer
          src="https://analytics.muhammadhmalvi.com/script.js"
          data-website-id="03553259-a18e-451e-8b9f-c4523b2a5505"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
