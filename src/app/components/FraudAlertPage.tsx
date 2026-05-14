import { AlertTriangle, Shield, Lock, CheckCircle, Eye, Phone, Mail, FileText } from "lucide-react";

export function FraudAlertPage() {
  const tocItems = [
    "What is Fraud",
    "Types of Fraud",
    "Our Fraud Prevention Measures",
    "Common Scams & Warning Signs",
    "User Responsibilities",
    "How to Recognize Phishing",
    "Reporting Fraud",
    "Compensation Policy",
    "Security Best Practices",
    "Fraud FAQs",
    "Support Resources",
    "Contact Information"
  ];

  const fraudTypes = [
    { title: "Phishing Attacks", description: "Fraudulent emails, messages, or websites designed to steal personal information" },
    { title: "Account Takeover", description: "Unauthorized access to user accounts through stolen credentials or security breaches" },
    { title: "Payment Fraud", description: "Unauthorized transactions, fake payment methods, or stolen payment information" },
    { title: "Identity Theft", description: "Unauthorized use of personal/financial information to create accounts or make purchases" },
    { title: "Job Scams", description: "Fake job postings requiring upfront payments or personal information" },
    { title: "Course Credential Fraud", description: "Sale of fake certificates or unauthorized course access" },
    { title: "Romance Scams", description: "Deceptive relationships built to manipulate victims into sending money or personal info" },
    { title: "Impersonation", description: "Scammers posing as CareerDream.in staff or legitimate employers" }
  ];

  const preventionMeasures = [
    { title: "SSL/TLS Encryption", description: "All data transmitted using 256-bit encryption" },
    { title: "Two-Factor Authentication", description: "Optional 2FA for enhanced account security" },
    { title: "Real-time Monitoring", description: "AI-powered fraud detection systems monitoring all transactions" },
    { title: "IP Verification", description: "Tracking unusual login locations and device changes" },
    { title: "PCI Compliance", description: "Full PCI DSS compliance for payment processing" },
    { title: "Regular Security Audits", description: "Third-party penetration testing and vulnerability assessments" }
  ];

  const commonScams = [
    {
      title: "Fake Job Offers",
      signs: [
        "Immediate offer without proper interview",
        "Request for upfront payment or personal banking details",
        "Poor grammar and spelling in communications",
        "Job description is vague or too good to be true",
        "Communication through personal email instead of official domain"
      ]
    },
    {
      title: "Credential Scams",
      signs: [
        "Offers to obtain certifications without completing courses",
        "Requests to pay for 'verified badges' or 'premium certificates'",
        "Claims to provide guaranteed job placements",
        "Selling illegally accessed course content"
      ]
    },
    {
      title: "Phishing Emails",
      signs: [
        "Urgent requests to verify account or update payment info",
        "Links that don't match legitimate CareerDream.in domains",
        "Grammar mistakes or suspicious formatting",
        "Threats to close your account if you don't act immediately",
        "Requests for passwords or 2FA codes via email"
      ]
    },
    {
      title: "Payment Fraud",
      signs: [
        "Unexpected charges on your account",
        "Multiple failed payment attempts from unknown sources",
        "Requests to pay via untraceable methods (gift cards, wire transfers)",
        "Price changes after item selection",
        "Requests for payment outside the platform"
      ]
    }
  ];

  const phishingTips = [
    "Never click links in unsolicited emails - navigate directly to website instead",
    "Verify sender email address carefully - scammers use similar-looking domains",
    "CareerDream.in will never ask for passwords, OTPs, or full credit card details via email",
    "Check for HTTPS lock icon and valid SSL certificate before entering sensitive data",
    "Hover over links (don't click) to see the actual destination URL",
    "Be suspicious of urgent language or threats in emails",
    "Enable email filtering and spam detection in your email client"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-900 dark:to-orange-900 text-white py-20 px-4 md:px-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-20"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fraud Alert & Safety Center</h1>
          <p className="text-lg md:text-xl text-red-100">
            Protecting your account and personal information is our highest priority. Learn how to recognize and prevent fraud.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        {/* Table of Contents */}
        <section className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            Table of Contents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tocItems.map((item, idx) => (
              <a
                key={idx}
                href={`#section-${idx + 1}`}
                className="text-primary hover:underline flex items-center gap-2 p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="text-sm font-semibold">{idx + 1}.</span>
                {item}
              </a>
            ))}
          </div>
        </section>

        {/* Section 1: What is Fraud */}
        <section id="section-1" className="space-y-4 mb-12">
          <h2 className="text-3xl font-bold">1. What is Fraud</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Fraud is any intentional deception or dishonest action designed to unlawfully obtain money, property, or sensitive information. On CareerDream.in, fraud can include unauthorized account access, payment fraud, identity theft, and scams targeting our users.
          </p>
          <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 rounded">
            <p className="text-sm text-red-900 dark:text-red-200">
              <strong>⚠️ Important:</strong> If you believe you've been a victim of fraud, report it immediately to our support team and your financial institution.
            </p>
          </div>
        </section>

        {/* Section 2: Types of Fraud */}
        <section id="section-2" className="space-y-6 mb-12">
          <h2 className="text-3xl font-bold">2. Types of Fraud We Protect Against</h2>
          <p className="text-slate-700 dark:text-slate-300">
            Understanding common fraud types helps you recognize and avoid them:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fraudTypes.map((fraud, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  {fraud.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{fraud.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Our Fraud Prevention Measures */}
        <section id="section-3" className="space-y-6 mb-12">
          <h2 className="text-3xl font-bold">3. Our Fraud Prevention Measures</h2>
          <p className="text-slate-700 dark:text-slate-300">
            We implement multiple layers of security to protect your account and data:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {preventionMeasures.map((measure, idx) => (
              <div key={idx} className="bg-green-50 dark:bg-green-950/30 p-5 rounded-lg border border-green-200 dark:border-green-900">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  {measure.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{measure.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Common Scams */}
        <section id="section-4" className="space-y-6 mb-12">
          <h2 className="text-3xl font-bold">4. Common Scams & Warning Signs</h2>
          <p className="text-slate-700 dark:text-slate-300">
            Be alert to these common fraud schemes and their warning signs:
          </p>
          <div className="space-y-4">
            {commonScams.map((scam, idx) => (
              <details key={idx} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden group">
                <summary className="p-5 cursor-pointer font-semibold text-slate-900 dark:text-white flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <Eye className="w-5 h-5 text-orange-500" />
                  {scam.title}
                  <span className="ml-auto text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 space-y-3 bg-slate-50 dark:bg-slate-900/50">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Warning signs:</p>
                  <ul className="space-y-2">
                    {scam.signs.map((sign, sidx) => (
                      <li key={sidx} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="text-red-500 font-bold">✗</span>
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Section 5: User Responsibilities */}
        <section id="section-5" className="space-y-4 mb-12">
          <h2 className="text-3xl font-bold">5. User Responsibilities</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            While we employ advanced security measures, you play a crucial role in protecting your account:
          </p>
          <ul className="space-y-3">
            {[
              "Keep your password strong, unique, and confidential",
              "Enable two-factor authentication (2FA) on your account",
              "Never share your OTP, password, or recovery codes with anyone",
              "Log out after each session, especially on shared devices",
              "Use secure internet connections (avoid public WiFi for sensitive transactions)",
              "Update your device's operating system and security software regularly",
              "Monitor your account activity and report suspicious transactions immediately",
              "Use verified email addresses and phone numbers for account recovery",
              "Review and update your privacy settings regularly",
              "Be cautious of unsolicited requests for personal or financial information"
            ].map((item, idx) => (
              <li key={idx} className="flex gap-3 text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 6: How to Recognize Phishing */}
        <section id="section-6" className="space-y-4 mb-12">
          <h2 className="text-3xl font-bold">6. How to Recognize Phishing</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Phishing is one of the most common fraud tactics. Here's how to protect yourself:
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-950/30 border-l-4 border-yellow-500 p-6 rounded space-y-3">
            {phishingTips.map((tip, idx) => (
              <div key={idx} className="flex gap-3 text-sm text-yellow-900 dark:text-yellow-200">
                <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Reporting Fraud */}
        <section id="section-7" className="space-y-6 mb-12">
          <h2 className="text-3xl font-bold">7. Reporting Fraud</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            If you suspect fraud or have been a victim, take immediate action:
          </p>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg border border-blue-200 dark:border-blue-900">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Immediate Steps to Take
              </h3>
              <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                <li><strong>1. Change Your Password:</strong> Update your CareerDream.in password immediately with a strong, unique password</li>
                <li><strong>2. Enable 2FA:</strong> Activate two-factor authentication on your account if not already enabled</li>
                <li><strong>3. Review Activity:</strong> Check your account activity log for unauthorized actions</li>
                <li><strong>4. Report to Us:</strong> Contact our fraud team with details of the incident</li>
                <li><strong>5. Contact Your Bank:</strong> Notify your financial institution of any unauthorized transactions</li>
                <li><strong>6. Monitor Credit:</strong> Consider placing a fraud alert with credit bureaus if identity theft occurred</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Section 8: Compensation Policy */}
        <section id="section-8" className="space-y-4 mb-12">
          <h2 className="text-3xl font-bold">8. Fraud Victim Compensation Policy</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            CareerDream.in is committed to protecting our users from fraud-related financial losses:
          </p>
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Eligible Cases:</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  Unauthorized transactions on verified payment methods within 30 days of reporting
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  Account takeover with evidence of unauthorized access
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  Payment fraud where you were not negligent in account security
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Non-Eligible Cases:</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  Cases where you shared your password or 2FA codes
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  Transactions reported more than 30 days after discovery
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  Cases where user authorized payment but disputes legitimacy
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 9: Security Best Practices */}
        <section id="section-9" className="space-y-6 mb-12">
          <h2 className="text-3xl font-bold">9. Security Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                Password Security
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>• Minimum 12 characters with mixed case, numbers, and symbols</li>
                <li>• Use unique passwords for each important account</li>
                <li>• Change passwords every 90 days</li>
                <li>• Don't use personal information (birthdate, pet names)</li>
                <li>• Use a password manager for secure storage</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Device Security
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>• Keep OS and software updated</li>
                <li>• Install reputable antivirus software</li>
                <li>• Use firewall protection</li>
                <li>• Install security updates promptly</li>
                <li>• Use secure, password-protected WiFi</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 10: Fraud FAQs */}
        <section id="section-10" className="space-y-4 mb-12">
          <h2 className="text-3xl font-bold">10. Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              {
                q: "What should I do if I receive a suspicious email claiming to be from CareerDream.in?",
                a: "Do not click any links or provide information. Forward the email to security@careerdream.in and delete it. CareerDream.in never asks for passwords or sensitive information via email."
              },
              {
                q: "Is my payment information safe on CareerDream.in?",
                a: "Yes. We use PCI DSS level compliance, SSL/TLS encryption, and tokenization. We never store full credit card details on our servers."
              },
              {
                q: "How can I enable two-factor authentication?",
                a: "Go to Settings → Security → Two-Factor Authentication. Choose between SMS, Authenticator App, or Email verification methods."
              },
              {
                q: "What should I do if I suspect my account has been compromised?",
                a: "Change your password immediately, enable 2FA, review login activity, and contact our support team at security@careerdream.in within 24 hours."
              },
              {
                q: "Are job postings on CareerDream.in verified?",
                a: "All employer accounts are verified during registration. However, always use caution: legitimate employers never ask for money upfront or sensitive personal information during the hiring process."
              }
            ].map((faq, idx) => (
              <details key={idx} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 group">
                <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer flex items-center gap-2 hover:text-primary transition-colors">
                  <span className="text-primary">Q:</span> {faq.q}
                  <span className="ml-auto text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm ml-6">
                  <span className="text-primary font-semibold">A:</span> {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Section 11: Support Resources */}
        <section id="section-11" className="space-y-4 mb-12">
          <h2 className="text-3xl font-bold">11. Support Resources</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Additional resources to help you stay safe:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Security Learning Center", desc: "Access tutorials and guides on account security" },
              { title: "Identity Theft Resources", desc: "Information on how to recover from identity theft" },
              { title: "Report Illegal Listings", desc: "Report suspicious job postings or courses" },
              { title: "Terms of Service", desc: "Review our full terms and acceptable use policy" },
              { title: "Privacy Policy", desc: "Learn how we protect your personal information" },
              { title: "Cookie Policy", desc: "Understand how we use cookies and tracking" }
            ].map((resource, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{resource.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{resource.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 12: Contact Information */}
        <section id="section-12" className="space-y-4 mb-12">
          <h2 className="text-3xl font-bold">12. Get Help</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Our security and support teams are here to help you stay safe:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 p-6 rounded-lg border border-blue-200 dark:border-blue-900">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-slate-900 dark:text-white">Report Fraud</h3>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                Report any suspicious activity or fraud attempt
              </p>
              <a href="mailto:security@careerdream.in" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors">
                security@careerdream.in
              </a>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 p-6 rounded-lg border border-green-200 dark:border-green-900">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-slate-900 dark:text-white">24/7 Support</h3>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                Contact our support team anytime
              </p>
              <a href="tel:+919876543210" className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors">
                +91-9876-543-210
              </a>
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 rounded mt-6">
            <p className="text-sm text-red-900 dark:text-red-200">
              <strong>Emergency:</strong> If you've lost money due to fraud, file a complaint with your financial institution immediately and report to local law enforcement.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Stay Safe & Secure</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Your security is our priority. By staying informed and vigilant, you can protect yourself from fraud. If you have any concerns, don't hesitate to reach out to our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:support@careerdream.in" className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors">
              Contact Support
            </a>
            <a href="/security" className="border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              Security Center
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
