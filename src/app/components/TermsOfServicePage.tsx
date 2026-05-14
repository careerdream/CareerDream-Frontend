import { Link } from 'react-router';

export function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Last updated: April 2026 | Please read these terms carefully before using CareerDream.in
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
                '1. Acceptance of Terms',
                '2. User Eligibility & Registration',
                '3. User Accounts',
                '4. User Responsibilities',
                '5. Acceptable Use Policy',
                '6. Content & Intellectual Property',
                '7. User Generated Content',
                '8. Limitations of Liability',
                '9. Disclaimers',
                '10. Indemnification',
                '11. Termination & Suspension',
                '12. Third-Party Services',
                '13. Dispute Resolution',
                '14. Changes to Terms',
                '15. Contact Us'
              ].map((item, idx) => (
                <li key={idx}>
                  <a href={`#section-${idx + 1}`} className="text-primary hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 1. Acceptance of Terms */}
          <section id="section-1" className="space-y-4">
            <h2 className="text-3xl font-bold">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing, browsing, or using CareerDream.in (the "Platform"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ("Terms"), along with our Privacy Policy and any other applicable policies. If you do not agree to these Terms, you must discontinue use of the Platform immediately.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              CareerDream.in ("Company," "we," "us," "our") reserves the right to modify these Terms at any time. Continued use of the Platform following any such modifications constitutes your acceptance of the updated Terms.
            </p>
          </section>

          {/* 2. User Eligibility & Registration */}
          <section id="section-2" className="space-y-4">
            <h2 className="text-3xl font-bold">2. User Eligibility & Registration</h2>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">2.1 Age Requirement</h3>
              <p className="text-muted-foreground leading-relaxed">
                You must be at least 13 years of age to use CareerDream.in. For users under 18, parental or guardian consent is required. By registering, you represent and warrant that you meet these age requirements and have the legal capacity to enter into a binding agreement.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2.2 Account Registration</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">You are responsible for providing accurate, complete, and truthful information during registration.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">You agree to update your information to maintain accuracy.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Registration using false information, duplicate accounts, or accounts on behalf of others is prohibited.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Each user is responsible for one account only. Multiple accounts by the same individual are not permitted.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 3. User Accounts */}
          <section id="section-3" className="space-y-4">
            <h2 className="text-3xl font-bold">3. User Accounts</h2>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">3.1 Account Security</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You are solely responsible for maintaining the confidentiality of your account credentials, including username and password. You agree to:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Protect your password and not share it with others</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Notify us immediately of unauthorized access or security breaches</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Accept all activities that occur under your account</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">3.2 Account Termination</h3>
              <p className="text-muted-foreground leading-relaxed">
                You may delete your account at any time through account settings. CareerDream.in may suspend or terminate your account if you violate these Terms or engage in prohibited activities.
              </p>
            </div>
          </section>

          {/* 4. User Responsibilities */}
          <section id="section-4" className="space-y-4">
            <h2 className="text-3xl font-bold">4. User Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree to use CareerDream.in responsibly and in compliance with all applicable laws and regulations. You are responsible for:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Compliance',
                  items: ['Following all platform rules', 'Adhering to local laws', 'Respecting intellectual property', 'Complying with regulations']
                },
                {
                  title: 'Professional Conduct',
                  items: ['Using accurate information', 'Maintaining professionalism', 'No harassment or abuse', 'Honest job applications']
                },
                {
                  title: 'Data Protection',
                  items: ['Protecting confidential info', 'No data collection', 'Respecting privacy', 'No unauthorized sharing']
                },
                {
                  title: 'Security',
                  items: ['Securing your login', 'Reporting breaches', 'Protecting credentials', 'Safe usage practices']
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

          {/* 5. Acceptable Use Policy */}
          <section id="section-5" className="space-y-4">
            <h2 className="text-3xl font-bold">5. Acceptable Use Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree NOT to use CareerDream.in for any of the following prohibited activities:
            </p>

            <ul className="space-y-3 ml-4">
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-muted-foreground"><strong>Illegal Activities:</strong> Any activity that violates local, national, or international laws.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-muted-foreground"><strong>Harassment & Abuse:</strong> Threatening, harassing, bullying, or abusing other users or company staff.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-muted-foreground"><strong>Discrimination:</strong> Content promoting discrimination based on race, color, religion, caste, gender, sexual orientation, or other protected characteristics.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-muted-foreground"><strong>Hate Speech:</strong> Any form of hate speech, abusive language, or violent content.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-muted-foreground"><strong>Spam:</strong> Posting repetitive, unsolicited, or commercial content.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-muted-foreground"><strong>Fraud & Deception:</strong> Misrepresenting yourself, your qualifications, or your experience.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-muted-foreground"><strong>Hacking & Security Breaches:</strong> Attempting to gain unauthorized access to accounts, systems, or data.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-muted-foreground"><strong>Malware & Virus Distribution:</strong> Uploading or sharing malicious code or software.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-muted-foreground"><strong>Intellectual Property Violation:</strong> Uploading copyrighted material without authorization.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-muted-foreground"><strong>Scraping & Automated Access:</strong> Using bots or automated tools to collect data without permission.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-muted-foreground"><strong>Impersonation:</strong> Pretending to be someone else or misrepresenting affiliation.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-muted-foreground"><strong>Adult Content:</strong> Posting sexually explicit or adult content.</span>
              </li>
            </ul>
          </section>

          {/* 6. Content & Intellectual Property */}
          <section id="section-6" className="space-y-4">
            <h2 className="text-3xl font-bold">6. Content & Intellectual Property</h2>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">6.1 Platform Ownership</h3>
              <p className="text-muted-foreground leading-relaxed">
                All content on CareerDream.in, including text, graphics, logos, images, videos, and software ("Platform Content"), is the exclusive property of CareerDream.in or its licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">6.2 Limited License</h3>
              <p className="text-muted-foreground leading-relaxed">
                We grant you a limited, non-exclusive, non-transferable, revocable license to access and use Platform Content solely for personal, non-commercial purposes. You may not:
              </p>
              <ul className="space-y-2 ml-4 mt-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Reproduce, modify, or create derivative works</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Distribute, sell, or license the content</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Use content for commercial purposes</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Remove copyright or proprietary notices</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">6.3 Job Listings & Course Content</h3>
              <p className="text-muted-foreground leading-relaxed">
                Job listings and course descriptions are provided by third parties (employers and course providers). CareerDream.in does not warrant the accuracy, completeness, or legality of such content. Users should verify information directly with the source.
              </p>
            </div>
          </section>

          {/* 7. User Generated Content */}
          <section id="section-7" className="space-y-4">
            <h2 className="text-3xl font-bold">7. User Generated Content</h2>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">7.1 Your Content Rights</h3>
              <p className="text-muted-foreground leading-relaxed">
                By uploading, posting, or submitting content to CareerDream.in (including profiles, resumes, comments, and messages), you retain ownership of your content but grant CareerDream.in a worldwide, royalty-free, perpetual license to use, reproduce, modify, adapt, publish, and distribute your content for operating and improving the Platform.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">7.2 Content Standards</h3>
              <p className="text-muted-foreground leading-relaxed">
                You warrant that your content:
              </p>
              <ul className="space-y-2 ml-4 mt-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Does not infringe on third-party intellectual property rights</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Is accurate and truthful</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Does not contain illegal or harmful material</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Respects the rights and privacy of others</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">7.3 Content Moderation</h3>
              <p className="text-muted-foreground leading-relaxed">
                CareerDream.in reserves the right to review, remove, or modify any user-generated content that violates these Terms or our policies, without notice or liability.
              </p>
            </div>
          </section>

          {/* 8. Limitations of Liability */}
          <section id="section-8" className="space-y-4">
            <h2 className="text-3xl font-bold">8. Limitations of Liability</h2>
            
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg mb-4">
              <p className="text-sm text-muted-foreground">
                <strong>IMPORTANT:</strong> To the maximum extent permitted by law, CareerDream.in and its officers, directors, employees, and agents are not liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, data loss, or business interruption, arising from your use of or inability to use the Platform, even if we have been advised of the possibility of such damages.
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Our total liability to you for any claim arising from these Terms or your use of the Platform shall not exceed the total amount paid by you to CareerDream.in in the 12 months preceding the claim, or USD 100, whichever is greater.
            </p>
          </section>

          {/* 9. Disclaimers */}
          <section id="section-9" className="space-y-4">
            <h2 className="text-3xl font-bold">9. Disclaimers</h2>
            
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg mb-4">
              <p className="text-sm text-muted-foreground">
                <strong>"AS IS" AND "AS AVAILABLE":</strong> CareerDream.in is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, express or implied.
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-4">We disclaim all warranties, including:</p>
            
            <ul className="space-y-2 ml-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">Implied warranties of merchantability or fitness for a particular purpose</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">Warranties regarding uninterrupted or error-free service</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">Warranties regarding the accuracy, completeness, or reliability of content</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">Warranties that jobs or courses posted exist or are legitimate</span>
              </li>
            </ul>
          </section>

          {/* 10. Indemnification */}
          <section id="section-10" className="space-y-4">
            <h2 className="text-3xl font-bold">10. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify, defend, and hold harmless CareerDream.in, its officers, directors, employees, agents, and successors from any claims, damages, losses, liabilities, and expenses (including attorney's fees) arising from:
            </p>
            <ul className="space-y-2 ml-4 mt-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">Your violation of these Terms</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">Your use of the Platform</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">Your user-generated content</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">Your violation of any applicable laws or third-party rights</span>
              </li>
            </ul>
          </section>

          {/* 11. Termination & Suspension */}
          <section id="section-11" className="space-y-4">
            <h2 className="text-3xl font-bold">11. Termination & Suspension</h2>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">11.1 Termination by You</h3>
              <p className="text-muted-foreground leading-relaxed">
                You may terminate your account and access to CareerDream.in at any time by contacting us or through account settings. Upon termination, your right to use the Platform ceases immediately.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">11.2 Termination by CareerDream.in</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may suspend or terminate your account, access, or use of the Platform immediately and without notice if we reasonably believe you have:
              </p>
              <ul className="space-y-2 ml-4 mt-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Violated these Terms</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Engaged in fraudulent or illegal activities</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Harassed or abused other users or staff</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Posed a security or legal risk</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">11.3 Effects of Termination</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upon termination, all rights and licenses granted to you are revoked. CareerDream.in may delete your account and associated content. Your obligations under these Terms survive termination.
              </p>
            </div>
          </section>

          {/* 12. Third-Party Services */}
          <section id="section-12" className="space-y-4">
            <h2 className="text-3xl font-bold">12. Third-Party Services</h2>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">12.1 External Links</h3>
              <p className="text-muted-foreground leading-relaxed">
                CareerDream.in may contain links to third-party websites and services. We are not responsible for the content, accuracy, or practices of third-party sites. Your access to and use of third-party services are at your own risk and subject to their terms.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">12.2 Employers & Course Providers</h3>
              <p className="text-muted-foreground leading-relaxed">
                Job postings and course listings are provided by employers and educational institutions. CareerDream.in does not endorse, guarantee, or assume liability for the legitimacy, fairness, or legality of such postings or institutions. Users should conduct independent verification.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">12.3 Third-Party Integrations</h3>
              <p className="text-muted-foreground leading-relaxed">
                If you connect your CareerDream.in account to third-party services (e.g., social media), you do so at your own risk. CareerDream.in is not responsible for third-party service security or data practices.
              </p>
            </div>
          </section>

          {/* 13. Dispute Resolution */}
          <section id="section-13" className="space-y-4">
            <h2 className="text-3xl font-bold">13. Dispute Resolution</h2>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">13.1 Governing Law</h3>
              <p className="text-muted-foreground leading-relaxed">
                These Terms are governed by the laws of India, without regard to its conflict of laws principles. You irrevocably consent to the exclusive jurisdiction of courts located in Bengaluru, India.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">13.2 Grievance Resolution</h3>
              <p className="text-muted-foreground leading-relaxed">
                For grievances or complaints, please contact our support team at <strong>support@careerdream.in</strong> with detailed information. We aim to respond within 5 business days and resolve issues within 30 days.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">13.3 Arbitration</h3>
              <p className="text-muted-foreground leading-relaxed">
                Any dispute that cannot be resolved through negotiation may be subject to binding arbitration under Indian Arbitration Act, 1996, or pursued in court if arbitration is not permitted by applicable law.
              </p>
            </div>
          </section>

          {/* 14. Changes to Terms */}
          <section id="section-14" className="space-y-4">
            <h2 className="text-3xl font-bold">14. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              CareerDream.in reserves the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Platform. Your continued use following any modifications constitutes acceptance of the updated Terms. We encourage you to review these Terms periodically to stay informed of changes.
            </p>
          </section>

          {/* 15. Contact Us */}
          <section id="section-15" className="space-y-4">
            <h2 className="text-3xl font-bold">15. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              If you have questions, concerns, or wish to report a violation of these Terms, please contact us:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-semibold mb-4">CareerDream.in Support</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li><strong>Email:</strong> <a href="mailto:support@careerdream.in" className="text-primary hover:underline">support@careerdream.in</a></li>
                  <li><strong>Terms Inquiry:</strong> <a href="mailto:legal@careerdream.in" className="text-primary hover:underline">legal@careerdream.in</a></li>
                  <li><strong>General:</strong> <a href="mailto:info@careerdream.in" className="text-primary hover:underline">info@careerdream.in</a></li>
                </ul>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-semibold mb-4">Office Address</h3>
                <p className="text-sm text-muted-foreground">
                  CareerDream.in<br/>
                  Bengaluru, India<br/><br/>
                  San Francisco, CA<br/>
                  United States
                </p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mt-6">
              Response time: We aim to respond to all inquiries within 10 business days.
            </p>
          </section>

          {/* Footer Notice */}
          <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Important Notice:</strong> These Terms constitute the entire agreement between you and CareerDream.in regarding your use of the Platform. If any provision is found invalid or unenforceable, the remaining provisions shall continue in full force. CareerDream.in's failure to enforce any right or provision does not constitute a waiver of that right or provision.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <section className="mt-20 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Understand Our Terms?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Questions about our Terms of Service? Contact our support team or review our Privacy Policy for data handling practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:legal@careerdream.in"
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors inline-block"
            >
              Contact Legal Team
            </a>
            <Link
              to="/privacy-policy"
              className="px-8 py-3 rounded-lg border border-primary/30 text-foreground font-semibold hover:border-primary/60 hover:bg-primary/5 transition-colors inline-block"
            >
              View Privacy Policy
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
