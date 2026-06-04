import { SEO } from "./SEO";
import { Link } from 'react-router';

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Privacy Policy | CareerDream" description="Read the Privacy Policy of CareerDream. Learn how we handle your data securely." keywords="Privacy Policy, Data Protection" />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Last updated: April 2026 | We are committed to protecting your privacy and ensuring you have a clear understanding of our data practices.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Table of Contents */}
          <div className="bg-card rounded-lg p-8 border border-border">
            <h2 className="text-2xl font-bold mb-6">Table of Contents</h2>
            <ul className="space-y-2">
              {[
                '1. Introduction',
                '2. Information We Collect',
                '3. How We Use Your Information',
                '4. Data Security',
                '5. Cookies and Tracking Technologies',
                '6. Third-Party Sharing',
                '7. Your Rights and Choices',
                '8. Data Retention',
                '9. Children\'s Privacy',
                '10. International Data Transfers',
                '11. Changes to Privacy Policy',
                '12. Contact Us'
              ].map((item, idx) => (
                <li key={idx}>
                  <a href={`#section-${idx + 1}`} className="text-primary hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 1. Introduction */}
          <section id="section-1" className="space-y-4">
            <h2 className="text-3xl font-bold">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              CareerDream.in ("we," "us," "our," or "Company") is committed to protecting your privacy and ensuring you have a transparent understanding of how we collect, use, and protect your personal information. This Privacy Policy ("Policy") describes our practices regarding personal data collection and usage on our website, mobile applications, and services (collectively, the "Services").
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using CareerDream.in, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our practices, please do not use our Services.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section id="section-2" className="space-y-4">
            <h2 className="text-3xl font-bold">2. Information We Collect</h2>
            <div className="space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold mb-3">2.1 Information You Provide Directly</h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground"><strong>Registration Information:</strong> When creating an account, we collect your name, email address, password, phone number, location, educational background, and professional experience.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground"><strong>Profile Information:</strong> Skills, work history, resume, profile picture, bio, certifications, and other details you voluntarily provide.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground"><strong>Application Data:</strong> Information submitted when applying for jobs, courses, or internships, including cover letters and supplementary documents.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground"><strong>Communication Data:</strong> Messages, inquiries, support requests, and feedback you send to us through email, chat, or contact forms.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground"><strong>Payment Information:</strong> For premium services, we collect billing address, payment method details (processed securely through third-party payment gateways), and transaction history.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">2.2 Information Collected Automatically</h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground"><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers, and hardware model.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground"><strong>Usage Data:</strong> Pages visited, time spent, links clicked, search queries, features used, and interaction patterns on our platform.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground"><strong>Location Data:</strong> Approximate location based on IP address (not GPS coordinates unless explicitly granted).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground"><strong>Cookies and Tracking:</strong> Information from cookies, web beacons, pixels, and similar technologies.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">2.3 Third-Party Information</h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground"><strong>Social Media Data:</strong> If you sign up using a social media account (Facebook, Google, LinkedIn), we collect publicly available information from your profile.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground"><strong>Background Information:</strong> For job matching purposes, we may seek information from employers and educational institutions with your consent.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. How We Use Your Information */}
          <section id="section-3" className="space-y-4">
            <h2 className="text-3xl font-bold">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">We use the information we collect for the following purposes:</p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {[
                {
                  title: 'Service Delivery',
                  items: ['Account creation and management', 'Job listings and applications', 'Course recommendations', 'Assessments and skill testing']
                },
                {
                  title: 'Personalization',
                  items: ['Tailored job recommendations', 'Customized learning paths', 'Personalized content delivery', 'Improved user experience']
                },
                {
                  title: 'Communication',
                  items: ['Job alerts and notifications', 'Course updates and reminders', 'Platform announcements', 'Customer support']
                },
                {
                  title: 'Analytics & Improvement',
                  items: ['Platform analytics', 'User behavior analysis', 'A/B testing', 'Service optimization']
                },
                {
                  title: 'Legal & Compliance',
                  items: ['Fraud prevention', 'Legal compliance', 'Terms enforcement', 'Security monitoring']
                },
                {
                  title: 'Marketing',
                  items: ['Promotional emails', 'Feature announcements', 'Special offers', 'Survey invitations']
                }
              ].map((section, idx) => (
                <div key={idx} className="bg-card rounded-lg p-6 border border-border">
                  <h4 className="font-semibold mb-4">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-primary">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Data Security */}
          <section id="section-4" className="space-y-4">
            <h2 className="text-3xl font-bold">4. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement comprehensive security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>SSL/TLS Encryption:</strong> All data transmitted between your browser and our servers is encrypted using HTTPS.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Database Security:</strong> Personal data is stored in secure, access-controlled databases with encryption at rest.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Access Controls:</strong> Only authorized employees and contractors with a legitimate business need can access personal information.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Regular Audits:</strong> We conduct regular security audits and vulnerability assessments.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Incident Response:</strong> We have protocols in place to respond to and investigate security breaches.</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> While we strive to protect your information, no security system is impenetrable. We cannot guarantee absolute security of your data.
              </p>
            </div>
          </section>

          {/* 5. Cookies and Tracking Technologies */}
          <section id="section-5" className="space-y-4">
            <h2 className="text-3xl font-bold">5. Cookies and Tracking Technologies</h2>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">5.1 What Are Cookies?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files stored on your device that help us recognize you and enhance your experience on our platform.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">5.2 Types of Cookies We Use</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground"><strong>Essential Cookies:</strong> Required for core functionality, login, and security features.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground"><strong>Performance Cookies:</strong> Help us understand how users interact with our platform for optimization.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground"><strong>Marketing Cookies:</strong> Used to personalize content and track campaigns (requires consent).</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground"><strong>Analytics Cookies:</strong> Enable us to analyze user behavior and improve services.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">5.3 Managing Cookies</h3>
              <p className="text-muted-foreground leading-relaxed">
                You can control cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. However, blocking essential cookies may affect your ability to use certain features.
              </p>
            </div>
          </section>

          {/* 6. Third-Party Sharing */}
          <section id="section-6" className="space-y-4">
            <h2 className="text-3xl font-bold">6. Third-Party Sharing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may share your information with third parties in the following circumstances:
            </p>

            <ul className="space-y-3 ml-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Service Providers:</strong> Hosting providers, payment processors, email services, analytics platforms, and other vendors who assist in operating our platform.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Employers & Recruiters:</strong> With your consent, we share your profile information with hiring companies for job matching and recruitment purposes.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Educational Institutions:</strong> Course information and progress may be shared with course providers.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Legal Compliance:</strong> When required by law, court order, or governmental authority.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets, your data may be transferred as part of the business transaction.</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Important:</strong> We do not sell your personal information for marketing purposes. Third parties are required to maintain confidentiality and use data only for specified purposes.
              </p>
            </div>
          </section>

          {/* 7. Your Rights and Choices */}
          <section id="section-7" className="space-y-4">
            <h2 className="text-3xl font-bold">7. Your Rights and Choices</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>

            <ul className="space-y-3 ml-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Right to Access:</strong> You can request a copy of all personal information we hold about you.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Right to Correction:</strong> You can update or correct inaccurate information through your account settings.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Right to Deletion:</strong> You can request deletion of your account and associated data (subject to legal retention requirements).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Right to Data Portability:</strong> You can request your data in a portable, machine-readable format.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Right to Opt-Out:</strong> You can unsubscribe from marketing communications anytime.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Right to Restriction:</strong> You can request limiting how we use your information for certain purposes.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Right to Object:</strong> You can object to certain types of processing, including profiling.</span>
              </li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-6">
              To exercise any of these rights, please contact us at <strong>privacy@careerdream.in</strong> with your request and proof of identity.
            </p>
          </section>

          {/* 8. Data Retention */}
          <section id="section-8" className="space-y-4">
            <h2 className="text-3xl font-bold">8. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We retain personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy:
            </p>

            <ul className="space-y-2 ml-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Active Accounts:</strong> Data is retained during the active use of your account.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>After Deletion:</strong> Most data is deleted within 30 days of account closure, except where required by law.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Legal Compliance:</strong> We retain data as required by applicable laws, regulations, and legal holds.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Analytics Data:</strong> Anonymized aggregated data may be retained indefinitely for analytics purposes.</span>
              </li>
            </ul>
          </section>

          {/* 9. Children's Privacy */}
          <section id="section-9" className="space-y-4">
            <h2 className="text-3xl font-bold">9. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              CareerDream.in is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will take steps to delete such information promptly.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For users between 13-18 years old, we provide additional protections and parental consent mechanisms where required by law. If you are a parent or guardian and believe your child has provided information to us, please contact us immediately.
            </p>
          </section>

          {/* 10. International Data Transfers */}
          <section id="section-10" className="space-y-4">
            <h2 className="text-3xl font-bold">10. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              CareerDream.in operates primarily in India. However, your information may be transferred to, processed in, and accessed from countries other than your country of residence due to our global server infrastructure and partnerships. These countries may have data protection laws different from your home country.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When we transfer data internationally, we use legal mechanisms such as Standard Data Protection Clauses or adequacy decisions to ensure appropriate safeguards are in place.
            </p>
          </section>

          {/* 11. Changes to Privacy Policy */}
          <section id="section-11" className="space-y-4">
            <h2 className="text-3xl font-bold">11. Changes to Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. We will notify you of material changes by posting the updated policy on our website and updating the "Last Updated" date.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Your continued use of CareerDream.in after changes constitutes your acceptance of the updated Privacy Policy. We encourage you to review this policy regularly.
            </p>
          </section>

          {/* 12. Contact Us */}
          <section id="section-12" className="space-y-4">
            <h2 className="text-3xl font-bold">12. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-semibold mb-4">CareerDream.in Privacy Team</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li><strong>Email:</strong> <a href="mailto:privacy@careerdream.in" className="text-primary hover:underline">privacy@careerdream.in</a></li>
                  <li><strong>Email (Support):</strong> <a href="mailto:support@careerdream.in" className="text-primary hover:underline">support@careerdream.in</a></li>
                  <li><strong>Email (General):</strong> <a href="mailto:info@careerdream.in" className="text-primary hover:underline">info@careerdream.in</a></li>
                </ul>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-semibold mb-4">Mailing Address</h3>
                <p className="text-sm text-muted-foreground">
                  CareerDream.in<br/>
                  Bengaluru, India<br/><br/>
                  San Francisco, CA<br/>
                  United States
                </p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mt-6">
              Response time: We aim to respond to all privacy inquiries within 10 business days.
            </p>
          </section>

          {/* Footer Notice */}
          <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm text-muted-foreground">
              This Privacy Policy is aligned with GDPR (General Data Protection Regulation), CCPA (California Consumer Privacy Act), and other international data protection standards. If you have questions about how your data is handled under these regulations, please contact our Privacy Team.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <section className="mt-20 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Our Privacy Practices?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're here to help. Contact our Privacy Team or visit our Help Center for more information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:privacy@careerdream.in"
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors inline-block"
            >
              Contact Privacy Team
            </a>
            <Link
              to="/"
              className="px-8 py-3 rounded-lg border border-primary/30 text-foreground font-semibold hover:border-primary/60 hover:bg-primary/5 transition-colors inline-block"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
