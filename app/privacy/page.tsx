import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/navbar";

const CtaV2 = dynamic(() =>
  import("@/components/sections/v2/cta-v2").then((mod) => mod.CtaV2)
);
const FooterV2 = dynamic(() =>
  import("@/components/sections/v2/footer-v2").then((mod) => mod.FooterV2)
);

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Aethon collects, uses, and protects your personal information when you visit our website or use our services.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — Aethon",
    description:
      "How Aethon collects, uses, and protects your personal information when you visit our website or use our services.",
  },
  twitter: {
    title: "Privacy Policy — Aethon",
    description:
      "How Aethon collects, uses, and protects your personal information when you visit our website or use our services.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="px-6 sm:px-8 lg:px-16 xl:px-24 pt-32 sm:pt-40 pb-24 sm:pb-32">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-3xl">
              <span className="text-xs tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-4">
                Legal
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                Privacy Policy
              </h1>
              <p className="text-secondary/60 text-sm">
                Last updated: February 2026
              </p>
            </div>

            <div className="v2-divider mt-12 mb-16" />

            <div className="max-w-3xl space-y-16">
              {/* Introduction */}
              <div>
                <p className="text-secondary/70 text-base leading-relaxed">
                  Aethon (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), based in Denver, CO, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit aethonautomation.com or engage with our services. By using our website, you consent to the practices described in this policy.
                </p>
              </div>

              {/* Information Collection */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  1. Information We Collect
                </h2>
                <div className="space-y-4 text-secondary/70 text-base leading-relaxed">
                  <p>
                    We collect information in the following ways:
                  </p>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      Information You Provide
                    </h3>
                    <p>
                      When you submit a contact form, request a consultation, apply for a position, or otherwise communicate with us, we collect the information you voluntarily provide, such as your name, email address, company name, phone number, and message content.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      Automatically Collected Information
                    </h3>
                    <p>
                      When you visit our website, we automatically collect certain technical information through analytics tools, including your IP address (anonymized where possible), browser type and version, operating system, referring URL, pages visited, time spent on pages, and general geographic location.
                    </p>
                  </div>
                </div>
              </div>

              {/* How We Use Information */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  2. How We Use Your Information
                </h2>
                <div className="space-y-3 text-secondary/70 text-base leading-relaxed">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>Respond to your inquiries and provide requested services</li>
                    <li>Improve our website performance, content, and user experience</li>
                    <li>Analyze website traffic and usage patterns</li>
                    <li>Measure the effectiveness of our marketing campaigns</li>
                    <li>Prevent fraud and ensure website security</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </div>

              {/* Cookies & Tracking */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  3. Cookies and Tracking Technologies
                </h2>
                <div className="space-y-4 text-secondary/70 text-base leading-relaxed">
                  <p>
                    Our website uses cookies and similar tracking technologies to collect analytics data and improve your experience. The specific tools we use include:
                  </p>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      Google Analytics (GA4)
                    </h3>
                    <p>
                      We use Google Analytics to understand how visitors interact with our website. Google Analytics collects data such as pages visited, session duration, and traffic sources. This data is processed by Google in accordance with their privacy policy.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      Google Tag Manager
                    </h3>
                    <p>
                      We use Google Tag Manager to manage and deploy tracking scripts on our website. Google Tag Manager itself does not collect personal data, but it facilitates the deployment of tags that may.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      Google Ads
                    </h3>
                    <p>
                      We use Google Ads conversion tracking to measure the effectiveness of our advertising campaigns. This may involve placing cookies on your device when you interact with our ads.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      Umami Analytics
                    </h3>
                    <p>
                      We use Umami, a privacy-focused analytics platform, as a supplementary analytics tool. Umami does not use cookies and does not collect personally identifiable information. All data is anonymized and aggregated.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Sharing */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  4. Data Sharing
                </h2>
                <div className="space-y-3 text-secondary/70 text-base leading-relaxed">
                  <p>
                    We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following circumstances:
                  </p>
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>
                      <span className="font-semibold text-foreground/80">Analytics Providers:</span> We share anonymized usage data with Google Analytics and Umami for website analytics purposes.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground/80">Service Providers:</span> We may share information with trusted service providers who assist us in operating our website and delivering our services, subject to confidentiality agreements.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground/80">Legal Requirements:</span> We may disclose your information if required by law, regulation, or legal process.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  5. Data Security
                </h2>
                <div className="space-y-3 text-secondary/70 text-base leading-relaxed">
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our website uses HTTPS encryption for all data transmitted between your browser and our servers.
                  </p>
                  <p>
                    While we strive to protect your information, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security of your data.
                  </p>
                </div>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  6. Your Rights
                </h2>
                <div className="space-y-3 text-secondary/70 text-base leading-relaxed">
                  <p>You have the following rights regarding your personal information:</p>
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>
                      <span className="font-semibold text-foreground/80">Opt Out of Cookies:</span> You can manage or disable cookies through our cookie consent banner or your browser settings. Disabling cookies may affect your experience on our website.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground/80">Access and Correction:</span> You may request access to the personal information we hold about you and ask us to correct any inaccuracies.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground/80">Deletion:</span> You may request that we delete your personal information, subject to any legal obligations requiring us to retain it.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground/80">Opt Out of Marketing:</span> If you receive marketing communications from us, you can opt out at any time by following the unsubscribe instructions in the communication or by contacting us directly.
                    </li>
                  </ul>
                  <p>
                    To exercise any of these rights, please contact us using the information provided below.
                  </p>
                </div>
              </div>

              {/* Third-Party Links */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  7. Third-Party Links
                </h2>
                <p className="text-secondary/70 text-base leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </div>

              {/* Changes */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  8. Changes to This Policy
                </h2>
                <p className="text-secondary/70 text-base leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. When we make changes, we will update the &quot;Last updated&quot; date at the top of this page. We encourage you to review this policy periodically.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  9. Contact Us
                </h2>
                <div className="text-secondary/70 text-base leading-relaxed space-y-3">
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="rounded-2xl border border-border p-6 sm:p-8 mt-4">
                    <p className="font-heading font-semibold text-foreground text-lg mb-1">Aethon</p>
                    <p className="text-secondary/60 text-sm">Denver, CO</p>
                    <a
                      href="mailto:info@aethonautomation.com"
                      className="text-accent hover:text-accent/80 transition-colors duration-200 text-sm font-semibold mt-3 inline-block"
                    >
                      info@aethonautomation.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CtaV2 />
      </main>
      <FooterV2 />
    </>
  );
}
