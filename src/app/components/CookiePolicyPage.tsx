import { Link } from 'react-router';

export function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Cookie Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Last updated: April 2026 | Learn how CareerDream.in uses cookies to enhance your experience
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
                '1. What Are Cookies?',
                '2. Why We Use Cookies',
                '3. Types of Cookies We Use',
                '4. Cookie Duration',
                '5. Third-Party Cookies',
                '6. Cookie Management',
                '7. Contact Us'
              ].map((item, idx) => (
                <li key={idx}>
                  <a href={`#section-${idx + 1}`} className="text-primary hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 1. What Are Cookies? */}
          <section id="section-1" className="space-y-4">
            <h2 className="text-3xl font-bold">1. What Are Cookies?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files stored on your device (computer, smartphone, or tablet) when you visit our website or use our application. These files contain information about your browsing behavior and preferences. Cookies help websites recognize users, remember preferences, and track usage patterns.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When you revisit CareerDream.in, your browser sends the cookie back to our servers, allowing us to remember your previous activities and preferences. Cookies are essential for providing a personalized and efficient browsing experience.
            </p>
          </section>

          {/* 2. Why We Use Cookies */}
          <section id="section-2" className="space-y-4">
            <h2 className="text-3xl font-bold">2. Why We Use Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              CareerDream.in uses cookies for several important purposes:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Essential Features',
                  items: ['User authentication', 'Account security', 'Session management', 'Form data retention']
                },
                {
                  title: 'User Experience',
                  items: ['Language preferences', 'Theme selection', 'Bookmarks & saved items', 'Personal recommendations']
                },
                {
                  title: 'Analytics',
                  items: ['Usage statistics', 'Page performance', 'User behavior analysis', 'Improvement insights']
                },
                {
                  title: 'Marketing',
                  items: ['Campaign tracking', 'Lead attribution', 'Interest-based ads', 'Conversion monitoring']
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

          {/* 3. Types of Cookies We Use */}
          <section id="section-3" className="space-y-4">
            <h2 className="text-3xl font-bold">3. Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="text-green-500">✓</span> Essential Cookies
                </h3>
                <p className="text-muted-foreground leading-relaxed ml-7">
                  These cookies are strictly necessary for the operation of our Platform and cannot be disabled without affecting functionality. They include authentication cookies for login, CSRF protection tokens, and session identifiers. Essential cookies are set regardless of cookie consent.
                </p>
                <p className="text-sm text-muted-foreground ml-7 mt-2">
                  <strong>Examples:</strong> PHPSESSID, csrf_token, auth_token
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="text-blue-500">📊</span> Performance & Analytics Cookies
                </h3>
                <p className="text-muted-foreground leading-relaxed ml-7">
                  These cookies help us understand how users interact with our Platform. They collect anonymized data about page visits, time spent, features used, and user journeys. Analytics cookies help us identify performance bottlenecks and optimize the user experience. They do not personally identify users.
                </p>
                <p className="text-sm text-muted-foreground ml-7 mt-2">
                  <strong>Providers:</strong> Google Analytics, Mixpanel, Hotjar
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="text-purple-500">🎯</span> Functional Cookies
                </h3>
                <p className="text-muted-foreground leading-relaxed ml-7">
                  Functional cookies enable personalized features such as remembering your language preference, theme selection, browser settings, and saved items (bookmarks, favorites). These cookies enhance user convenience and customization but require explicit consent in some jurisdictions.
                </p>
                <p className="text-sm text-muted-foreground ml-7 mt-2">
                  <strong>Examples:</strong> language_pref, theme_mode, saved_filters
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="text-orange-500">📢</span> Marketing & Advertising Cookies
                </h3>
                <p className="text-muted-foreground leading-relaxed ml-7">
                  Marketing cookies track user behavior across websites to deliver personalized advertisements and measure campaign effectiveness. These cookies enable retargeting and interest-based advertising. They require explicit user consent before being set.
                </p>
                <p className="text-sm text-muted-foreground ml-7 mt-2">
                  <strong>Providers:</strong> Facebook Pixel, Google Ads, LinkedIn Ads
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="text-red-500">⚠️</span> Social Media Cookies
                </h3>
                <p className="text-muted-foreground leading-relaxed ml-7">
                  If you interact with social media plugins on our Platform (share buttons, embedded social feeds), social platforms may set cookies to track your activity and deliver personalized content. These are governed by the respective social platform's cookie policies.
                </p>
                <p className="text-sm text-muted-foreground ml-7 mt-2">
                  <strong>Platforms:</strong> Facebook, Twitter, Instagram, LinkedIn
                </p>
              </div>
            </div>
          </section>

          {/* 4. Cookie Duration */}
          <section id="section-4" className="space-y-4">
            <h2 className="text-3xl font-bold">4. Cookie Duration</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Cookies have different lifespans depending on their purpose:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 bg-muted/50 font-semibold">Cookie Type</th>
                    <th className="text-left p-3 bg-muted/50 font-semibold">Duration</th>
                    <th className="text-left p-3 bg-muted/50 font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: 'Session Cookies', duration: 'Until browser closes', purpose: 'Login, security, temporary preferences' },
                    { type: 'Persistent Cookies', duration: '1 - 24 months', purpose: 'Remember user preferences, analytics' },
                    { type: 'Analytics Cookies', duration: '1 - 2 years', purpose: 'Track user behavior and usage patterns' },
                    { type: 'Marketing Cookies', duration: '6 - 24 months', purpose: 'Targeted advertising and retargeting' },
                    { type: 'Functional Cookies', duration: '1 - 12 months', purpose: 'User preferences and customization' }
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-3">{row.type}</td>
                      <td className="p-3">{row.duration}</td>
                      <td className="p-3 text-muted-foreground text-xs">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Third-Party Cookies */}
          <section id="section-5" className="space-y-4">
            <h2 className="text-3xl font-bold">5. Third-Party Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              CareerDream.in uses third-party services that set their own cookies on your device:
            </p>

            <ul className="space-y-3 ml-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <div>
                  <span className="text-muted-foreground"><strong>Google Analytics:</strong> Tracks website traffic, user behavior, and conversion metrics. Visit <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google's Privacy Policy</a> to learn more.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <div>
                  <span className="text-muted-foreground"><strong>Facebook Pixel:</strong> Measures ad effectiveness and enables retargeting. Visit <a href="https://www.facebook.com/policies/cookies/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Facebook's Cookie Policy</a>.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <div>
                  <span className="text-muted-foreground"><strong>LinkedIn:</strong> For professional networking and analytics. Visit <a href="https://www.linkedin.com/legal/cookie-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn's Cookie Policy</a>.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <div>
                  <span className="text-muted-foreground"><strong>Payment Processors:</strong> Third-party payment gateways may set cookies for transaction processing.</span>
                </div>
              </li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-6">
              We are not responsible for third parties' cookie practices. We recommend reviewing their privacy policies for detailed information.
            </p>
          </section>

          {/* 6. Cookie Management */}
          <section id="section-6" className="space-y-4">
            <h2 className="text-3xl font-bold">6. Cookie Management</h2>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">6.1 Browser Controls</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Most browsers allow you to control cookies through settings:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground"><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground"><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground"><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground"><strong>Edge:</strong> Settings → Privacy and security → Clear browsing data</span>
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">6.2 Opt-Out Options</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You can opt out of specific cookie types:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground"><strong>Analytics Opt-Out:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-out Browser Add-on</a></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground"><strong>Advertising Opt-Out:</strong> Visit <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Digital Advertising Alliance</a></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground"><strong>Do Not Track:</strong> Enable "Do Not Track" in your browser preferences</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Important:</strong> Disabling essential cookies may impair your ability to log in or use certain Platform features. Non-essential cookies can be disabled without affecting core functionality.
              </p>
            </div>
          </section>

          {/* 7. Contact Us */}
          <section id="section-7" className="space-y-4">
            <h2 className="text-3xl font-bold">7. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              If you have questions about our cookie practices, please contact us:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-semibold mb-4">CareerDream.in Privacy Team</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li><strong>Email:</strong> <a href="mailto:privacy@careerdream.in" className="text-primary hover:underline">privacy@careerdream.in</a></li>
                  <li><strong>Support:</strong> <a href="mailto:support@careerdream.in" className="text-primary hover:underline">support@careerdream.in</a></li>
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
          </section>

          {/* Footer Notice */}
          <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm text-muted-foreground">
              This Cookie Policy is governed by EU GDPR and CCPA regulations. Users in the EU, UK, and California have additional cookie control rights. We comply with all applicable regulations regarding cookie consent and data protection.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <section className="mt-20 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Cookies?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            For more information about privacy and data handling, review our Privacy Policy or contact our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:privacy@careerdream.in"
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors inline-block"
            >
              Contact Privacy Team
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
