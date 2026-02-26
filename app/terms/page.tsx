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
  title: "Terms of Service",
  description:
    "Terms and conditions governing your use of the Aethon website and our digital systems, automation, and consulting services.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service — Aethon",
    description:
      "Terms and conditions governing your use of the Aethon website and our digital systems, automation, and consulting services.",
  },
  twitter: {
    title: "Terms of Service — Aethon",
    description:
      "Terms and conditions governing your use of the Aethon website and our digital systems, automation, and consulting services.",
  },
};

export default function TermsOfServicePage() {
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
                Terms of Service
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
                  These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website operated by Aethon (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) at aethonautomation.com, as well as any services we provide. By accessing or using our website and services, you agree to be bound by these Terms. If you do not agree, please do not use our website or services.
                </p>
              </div>

              {/* Acceptance of Terms */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  1. Acceptance of Terms
                </h2>
                <div className="space-y-3 text-secondary/70 text-base leading-relaxed">
                  <p>
                    By accessing this website, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you are using our website or services on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
                  </p>
                  <p>
                    We reserve the right to modify these Terms at any time. Your continued use of our website and services after any changes constitutes acceptance of the updated Terms.
                  </p>
                </div>
              </div>

              {/* Services Description */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  2. Description of Services
                </h2>
                <div className="space-y-3 text-secondary/70 text-base leading-relaxed">
                  <p>
                    Aethon is a digital systems and automation company based in Denver, CO. We provide a range of professional services, including but not limited to:
                  </p>
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>Business process automation and workflow design</li>
                    <li>Artificial intelligence integration and custom AI solutions</li>
                    <li>Custom software development and platform engineering</li>
                    <li>Cybersecurity assessments, compliance, and security architecture</li>
                    <li>Data analytics and business intelligence</li>
                    <li>IT consulting and digital strategy</li>
                  </ul>
                  <p>
                    Specific service engagements are governed by separate statements of work or service agreements between Aethon and the client. These Terms apply to your use of our website and general interactions with our company.
                  </p>
                </div>
              </div>

              {/* Intellectual Property */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  3. Intellectual Property
                </h2>
                <div className="space-y-3 text-secondary/70 text-base leading-relaxed">
                  <p>
                    All content on this website, including but not limited to text, graphics, logos, images, code, designs, and software, is the property of Aethon or its licensors and is protected by applicable copyright, trademark, and intellectual property laws.
                  </p>
                  <p>
                    You may not reproduce, distribute, modify, create derivative works from, publicly display, or otherwise exploit any content from this website without our prior written consent. Limited use for personal, non-commercial purposes such as viewing and bookmarking is permitted.
                  </p>
                  <p>
                    The Aethon name, logo, and all related marks are trademarks of Aethon. Nothing on this website grants you any license or right to use any trademarks without our prior written permission.
                  </p>
                </div>
              </div>

              {/* User Responsibilities */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  4. User Responsibilities
                </h2>
                <div className="space-y-3 text-secondary/70 text-base leading-relaxed">
                  <p>When using our website and services, you agree to:</p>
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>Provide accurate and complete information when submitting forms or communicating with us</li>
                    <li>Use our website and services only for lawful purposes and in compliance with all applicable laws and regulations</li>
                    <li>Not attempt to gain unauthorized access to any part of our website, systems, or networks</li>
                    <li>Not interfere with or disrupt the operation of our website or servers</li>
                    <li>Not use automated tools to scrape, crawl, or extract data from our website without prior written consent</li>
                    <li>Not transmit any malicious code, viruses, or harmful content through our website</li>
                  </ul>
                  <p>
                    We reserve the right to restrict or terminate access to our website for any user who violates these Terms.
                  </p>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  5. Limitation of Liability
                </h2>
                <div className="space-y-3 text-secondary/70 text-base leading-relaxed">
                  <p>
                    Our website and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                  </p>
                  <p>
                    To the fullest extent permitted by applicable law, Aethon shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or goodwill, arising out of or in connection with your use of our website or services, regardless of the cause of action or the theory of liability.
                  </p>
                  <p>
                    In no event shall our total liability to you exceed the amount you have paid to Aethon, if any, for services during the twelve (12) months preceding the claim.
                  </p>
                </div>
              </div>

              {/* Indemnification */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  6. Indemnification
                </h2>
                <p className="text-secondary/70 text-base leading-relaxed">
                  You agree to indemnify, defend, and hold harmless Aethon and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or related to your use of our website or services, your violation of these Terms, or your violation of any rights of a third party.
                </p>
              </div>

              {/* Governing Law */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  7. Governing Law
                </h2>
                <div className="space-y-3 text-secondary/70 text-base leading-relaxed">
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of the State of Colorado, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Denver, Colorado.
                  </p>
                </div>
              </div>

              {/* Changes to Terms */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  8. Changes to These Terms
                </h2>
                <p className="text-secondary/70 text-base leading-relaxed">
                  We reserve the right to update or modify these Terms at any time without prior notice. Changes will be effective immediately upon posting to this page. We will update the &quot;Last updated&quot; date at the top of this page when changes are made. Your continued use of our website after any modifications constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.
                </p>
              </div>

              {/* Severability */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  9. Severability
                </h2>
                <p className="text-secondary/70 text-base leading-relaxed">
                  If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                  10. Contact Us
                </h2>
                <div className="text-secondary/70 text-base leading-relaxed space-y-3">
                  <p>
                    If you have any questions about these Terms of Service, please contact us at:
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
