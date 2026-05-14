import { Link } from 'react-router';
import { Shield, Lock, AlertTriangle, Eye, Wifi, KeyRound } from 'lucide-react';

export function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-12 h-12 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Security
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Your security and privacy are our top priorities. Learn how we protect your data and account.
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
                '1. Security Overview',
                '2. Data Encryption',
                '3. Account Security',
                '4. Password Security',
                '5. Two-Factor Authentication',
                '6. Vulnerability Disclosure',
                '7. Incident Response',
                '8. Compliance & Certifications',
                '9. Third-Party Security',
                '10. Security Best Practices',
                '11. Report a Security Issue',
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

          {/* 1. Security Overview */}
          <section id="section-1" className="space-y-4">
            <h2 className="text-3xl font-bold">1. Security Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              CareerDream.in is committed to maintaining the highest security standards to protect user data, prevent unauthorized access, and ensure service integrity. Our security infrastructure is built on industry best practices, regular audits, and continuous monitoring.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We employ multiple layers of security controls including encryption, firewalls, intrusion detection, access controls, and regular security assessments to safeguard against threats.
            </p>
          </section>

          {/* 2. Data Encryption */}
          <section id="section-2" className="space-y-4">
            <h2 className="text-3xl font-bold">2. Data Encryption</h2>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                In-Transit Encryption
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                All data transmitted between your device and our servers is encrypted using TLS 1.2 or higher encryption protocols. This ensures that sensitive information such as passwords, personal data, and payment information cannot be intercepted during transmission.
              </p>
              <p className="text-sm text-muted-foreground mt-2 ml-7">
                <strong>Technology:</strong> HTTPS, TLS 1.2+, AES-256
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                At-Rest Encryption
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Personal information stored in our databases is encrypted at rest using industry-standard encryption algorithms. This protects your data in case of unauthorized physical access to our servers.
              </p>
              <p className="text-sm text-muted-foreground mt-2 ml-7">
                <strong>Technology:</strong> AES-256 encryption, Database-level encryption
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-primary" />
                Key Management
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Encryption keys are managed securely with restricted access. We rotate encryption keys regularly and maintain separate keys for different data categories.
              </p>
            </div>
          </section>

          {/* 3. Account Security */}
          <section id="section-3" className="space-y-4">
            <h2 className="text-3xl font-bold">3. Account Security</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Login Security',
                  items: ['Secure authentication', 'CAPTCHA verification', 'Abnormal login detection', 'Device fingerprinting']
                },
                {
                  title: 'Account Protection',
                  items: ['Account deactivation option', 'Login history tracking', 'Active sessions management', 'Unauthorized access alerts']
                },
                {
                  title: 'Session Management',
                  items: ['Automatic timeout', 'Secure session tokens', 'Session binding to device', 'Immediate logout on password change']
                },
                {
                  title: 'Password Handling',
                  items: ['Bcrypt hashing (12 rounds)', 'Salted passwords', 'No plaintext storage', 'Secure password reset']
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

          {/* 4. Password Security */}
          <section id="section-4" className="space-y-4">
            <h2 className="text-3xl font-bold">4. Password Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Strong passwords are the first line of defense against unauthorized access. We enforce the following password requirements:
            </p>

            <div className="bg-card rounded-lg p-6 border border-border space-y-3">
              <p className="text-muted-foreground"><strong>Minimum Length:</strong> 8 characters (recommended 12+)</p>
              <p className="text-muted-foreground"><strong>Complexity:</strong> Combination of uppercase, lowercase, numbers, and special characters</p>
              <p className="text-muted-foreground"><strong>No Common Patterns:</strong> Password cannot match username or previous passwords</p>
              <p className="text-muted-foreground"><strong>Expiration:</strong> We recommend changing passwords every 90 days</p>
              <p className="text-muted-foreground"><strong>Storage:</strong> Passwords are securely hashed with bcrypt (12 rounds) and never stored in plaintext</p>
              <p className="text-muted-foreground"><strong>Transmission:</strong> Passwords are transmitted only over encrypted HTTPS connections</p>
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary">💡</span>
                <span><strong>Tip:</strong> Use unique, complex passwords for your CareerDream.in account. Avoid reusing passwords from other platforms.</span>
              </p>
            </div>
          </section>

          {/* 5. Two-Factor Authentication */}
          <section id="section-5" className="space-y-4">
            <h2 className="text-3xl font-bold">5. Two-Factor Authentication (2FA)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Two-Factor Authentication adds an extra layer of security to your account by requiring a second verification method beyond your password.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-semibold mb-4">Supported Methods</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">SMS - 6-digit code via text message</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Authenticator App - Time-based codes (Google, Microsoft)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Email - One-time password via email</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-semibold mb-4">Benefits</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Protects against password breaches</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Prevents unauthorized account access</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Recommended for all users</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mt-6">
              We strongly recommend enabling 2FA, especially for accounts with sensitive information such as resumes or payment details. You can enable 2FA in your Account Security settings.
            </p>
          </section>

          {/* 6. Vulnerability Disclosure */}
          <section id="section-6" className="space-y-4">
            <h2 className="text-3xl font-bold">6. Vulnerability Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We value the security research community and welcome responsible disclosure of security vulnerabilities. If you discover a security vulnerability, please report it securely rather than publicly disclosing it.
            </p>

            <div className="bg-card rounded-lg p-6 border border-border space-y-4">
              <h3 className="font-semibold">How to Report</h3>
              <p className="text-muted-foreground">
                Email <strong>security@careerdream.in</strong> with:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Detailed description of the vulnerability</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Steps to reproduce the issue</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Potential impact assessment</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Your contact information and PGP key (if available)</span>
                </li>
              </ul>

              <div className="mt-4 pt-4 border-t border-border">
                <h3 className="font-semibold mb-2">Our Commitment</h3>
                <p className="text-sm text-muted-foreground">
                  We commit to acknowledging reports within 48 hours, providing updates on our investigation, and working toward a responsible disclosure timeline (typically 90 days).
                </p>
              </div>
            </div>
          </section>

          {/* 7. Incident Response */}
          <section id="section-7" className="space-y-4">
            <h2 className="text-3xl font-bold">7. Incident Response</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In the event of a security incident, we have a comprehensive incident response plan:
            </p>

            <ul className="space-y-3 ml-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold">1.</span>
                <div>
                  <span className="text-muted-foreground"><strong>Detection:</strong> Continuous monitoring detects suspicious activities within minutes</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">2.</span>
                <div>
                  <span className="text-muted-foreground"><strong>Containment:</strong> We immediately isolate affected systems to prevent further damage</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">3.</span>
                <div>
                  <span className="text-muted-foreground"><strong>Investigation:</strong> Forensic analysis determines the scope and cause of the incident</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">4.</span>
                <div>
                  <span className="text-muted-foreground"><strong>Notification:</strong> Affected users are notified within 72 hours as per legal requirements</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">5.</span>
                <div>
                  <span className="text-muted-foreground"><strong>Recovery:</strong> Systems are restored from secure backups and stabilized</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">6.</span>
                <div>
                  <span className="text-muted-foreground"><strong>Prevention:</strong> Measures are implemented to prevent similar incidents in the future</span>
                </div>
              </li>
            </ul>
          </section>

          {/* 8. Compliance & Certifications */}
          <section id="section-8" className="space-y-4">
            <h2 className="text-3xl font-bold">8. Compliance & Certifications</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              CareerDream.in complies with major international security and data protection standards:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'GDPR', desc: 'EU General Data Protection Regulation - Data protection for EU residents' },
                { title: 'CCPA', desc: 'California Consumer Privacy Act - Privacy rights for California residents' },
                { title: 'ISO 27001', desc: 'Information Security Management System certification' },
                { title: 'SOC 2 Type II', desc: 'Security, availability, processing integrity, confidentiality' },
                { title: 'Data Localization', desc: 'Compliance with India\'s data residency requirements' },
                { title: 'PCI DSS', desc: 'Payment Card Industry Data Security Standard for payment processing' }
              ].map((cert, idx) => (
                <div key={idx} className="bg-card rounded-lg p-6 border border-border">
                  <h4 className="font-semibold text-primary mb-2">{cert.title}</h4>
                  <p className="text-sm text-muted-foreground">{cert.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 9. Third-Party Security */}
          <section id="section-9" className="space-y-4">
            <h2 className="text-3xl font-bold">9. Third-Party Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We carefully vet and monitor all third-party vendors who have access to our infrastructure:
            </p>

            <ul className="space-y-2 ml-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Vendor Assessment:</strong> All vendors undergo security assessments before onboarding</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Data Protection Agreements:</strong> Vendors sign Data Processing Agreements (DPA) with strict confidentiality clauses</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Access Control:</strong> Third parties have minimal, role-based access to data</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground"><strong>Continuous Monitoring:</strong> We audit vendor compliance regularly</span>
              </li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-4">
              Key vendors include cloud infrastructure providers (AWS, Google Cloud), payment processors (Stripe, Razorpay), and monitoring tools (Datadog, New Relic).
            </p>
          </section>

          {/* 10. Security Best Practices */}
          <section id="section-10" className="space-y-4">
            <h2 className="text-3xl font-bold">10. Security Best Practices for Users</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              While we protect your account from our end, you can take additional steps to enhance security:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Password Management',
                  items: ['Use strong, unique passwords', 'Change passwords regularly', 'Never share your password', 'Use password managers']
                },
                {
                  title: 'Device Security',
                  items: ['Keep software updated', 'Enable device lock', 'Use antivirus software', 'Avoid public WiFi']
                },
                {
                  title: 'Account Management',
                  items: ['Enable 2FA immediately', 'Review login history', 'Keep email updated', 'Log out when done']
                },
                {
                  title: 'Vigilance',
                  items: ['Ignore phishing emails', 'Check URL before login', 'Don\'t click suspicious links', 'Report threats to us']
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

          {/* 11. Report a Security Issue */}
          <section id="section-11" className="space-y-4">
            <h2 className="text-3xl font-bold">11. Report a Security Issue</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you notice suspicious activity or suspect a security breach:
            </p>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Immediate Actions
              </h3>
              <ol className="space-y-2 ml-4">
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">1.</span>
                  <span className="text-muted-foreground">Change your password immediately</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">2.</span>
                  <span className="text-muted-foreground">Disable active sessions from your account settings</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">3.</span>
                  <span className="text-muted-foreground">Enable 2FA if not already enabled</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">4.</span>
                  <span className="text-muted-foreground">Contact our support team immediately</span>
                </li>
              </ol>
            </div>

            <p className="text-muted-foreground leading-relaxed mt-6">
              Contact: <strong>security@careerdream.in</strong> or <strong>support@careerdream.in</strong>
            </p>
          </section>

          {/* 12. Contact Us */}
          <section id="section-12" className="space-y-4">
            <h2 className="text-3xl font-bold">12. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              For security concerns, questions, or incident reporting:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-semibold mb-4">Security & Privacy</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li><strong>Security Incidents:</strong> <a href="mailto:security@careerdream.in" className="text-primary hover:underline">security@careerdream.in</a></li>
                  <li><strong>Privacy Questions:</strong> <a href="mailto:privacy@careerdream.in" className="text-primary hover:underline">privacy@careerdream.in</a></li>
                  <li><strong>General Support:</strong> <a href="mailto:support@careerdream.in" className="text-primary hover:underline">support@careerdream.in</a></li>
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
              <strong>Security is a continuous process.</strong> We regularly update our security measures to address emerging threats and vulnerabilities. Thank you for helping us keep CareerDream.in secure.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <section className="mt-20 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Your Security Matters</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Questions about security? Enable 2FA on your account and practice security best practices to protect yourself online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:security@careerdream.in"
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors inline-block"
            >
              Report a Security Issue
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
