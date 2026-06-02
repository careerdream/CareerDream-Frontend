import { useState } from 'react';
import { Mail, MessageSquare, MapPin, Clock, ArrowRight, Send, CheckCircle, Globe, Briefcase, HelpCircle } from 'lucide-react';
import { Link } from 'react-router';

const contactChannels = [
  {
    icon: Mail,
    title: 'Email Us',
    desc: 'For any general query, partnership, or support request.',
    value: 'info@careerdream.in',
    href: 'mailto:info@careerdream.in',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-500/10 border-blue-500/20',
    textColor: 'text-blue-500',
  },
  {
    icon: Briefcase,
    title: 'Career & Internship',
    desc: 'Interested in joining our team? Reach out directly.',
    value: 'info@careerdream.in',
    href: 'mailto:info@careerdream.in?subject=Career Opportunity',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    textColor: 'text-emerald-500',
  },
  {
    icon: Globe,
    title: 'Partnerships',
    desc: "Let's collaborate to empower more IT professionals.",
    value: 'info@careerdream.in',
    href: 'mailto:info@careerdream.in?subject=Partnership Inquiry',
    color: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-500/10 border-purple-500/20',
    textColor: 'text-purple-500',
  },
];

const faqs = [
  { q: 'How do I post a job on CareerDream?', a: 'Recruiters can sign up and post jobs via the Recruiter Portal. Email us at info@careerdream.in for enterprise plans.' },
  { q: 'How do I report a bug or issue?', a: 'Use the Report Issue page in the footer, or email info@careerdream.in with a screenshot.' },
  { q: 'Can I advertise my course on CareerDream?', a: 'Yes! We welcome course providers. Email us at info@careerdream.in with your course details.' },
  { q: 'How do I unsubscribe from newsletters?', a: 'Reply to any newsletter email with "Unsubscribe" or contact info@careerdream.in.' },
];

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    const mailtoLink = `mailto:info@careerdream.in?subject=${encodeURIComponent(subject || 'Contact from CareerDream')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Get In Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            We'd Love to
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Hear From You</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Whether you have a question, feedback, partnership idea, or just want to say hello — our team is here.
          </p>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-3 gap-5 mb-16">
            {contactChannels.map((ch) => (
              <a
                key={ch.title}
                href={ch.href}
                className={`group p-6 rounded-2xl border ${ch.bg} hover:scale-[1.02] transition-all duration-300`}
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${ch.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <ch.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold mb-1">{ch.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{ch.desc}</p>
                <span className={`text-sm font-semibold ${ch.textColor} flex items-center gap-1 group-hover:gap-2 transition-all`}>
                  {ch.value} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
              <p className="text-muted-foreground text-sm mb-6">Fill in the form below. Clicking "Send" will open your email client with the message pre-filled to <strong>info@careerdream.in</strong>.</p>

              {sent ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-1">Opening your email client...</h3>
                  <p className="text-muted-foreground text-sm">Your message is pre-filled to info@careerdream.in. Just hit Send!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Your Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:border-primary focus:outline-none transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="you@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:border-primary focus:outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Subject</label>
                    <input
                      required
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:border-primary focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell us more about your query..."
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:border-primary focus:outline-none transition-colors text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:shadow-lg hover:shadow-primary/30 transition-all"
                  >
                    <Send className="w-4 h-4" /> Send to info@careerdream.in
                  </button>
                </form>
              )}
            </div>

            {/* Info Panel */}
            <div className="space-y-6">
              {/* Info Card */}
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-bold mb-4">Quick Info</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <a href="mailto:info@careerdream.in" className="text-sm font-semibold text-primary hover:underline">info@careerdream.in</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-semibold">Bengaluru, India & Remote</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Response Time</p>
                      <p className="text-sm font-semibold">Within 24–48 business hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="p-6 rounded-2xl border border-border bg-card">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <h3 className="font-bold">FAQ</h3>
                </div>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.q} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <p className="text-sm font-semibold mb-1">{faq.q}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report Issue CTA */}
              <Link
                to="/report-issue"
                className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Report a Bug or Issue</p>
                    <p className="text-xs text-muted-foreground">Use our structured report form</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
