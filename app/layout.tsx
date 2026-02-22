import type { Metadata } from "next";
import { Poppins, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        </ThemeProvider>
      </body>
    </html>
  );
}
