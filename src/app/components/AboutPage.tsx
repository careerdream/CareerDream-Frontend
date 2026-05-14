import { Link } from 'react-router';
import { SocialLinks } from './SocialLinks';

export function AboutPage() {
  const faqs = [
    {
      q: 'What is CareerDream.in?',
      a: 'CareerDream.in is a completely free career platform designed to empower fresh graduates, final-year students, and young professionals seeking IT jobs in India. It offers verified job listings, internships, learning resources, resume screening, and skill assessments to help candidates prepare effectively.'
    },
    {
      q: 'Who can use this platform?',
      a: 'This platform is ideal for 2024 and 2025 batch graduates, final-year students, and professionals with 0–2 years of experience. Regardless of your college tier, CareerDream.in provides daily opportunities from leading IT companies across India.'
    },
    {
      q: 'Is the platform free to use?',
      a: 'Yes, CareerDream.in is entirely free. You can access job listings, internships, and learning resources without any subscription or hidden charges.'
    },
    {
      q: 'How do I receive daily job alerts?',
      a: 'Follow our official Instagram page @careerdream.in for daily updates, join our free Telegram channel for instant notifications, or bookmark CareerDream.in to browse openings anytime.'
    },
    {
      q: 'What types of jobs are posted here?',
      a: 'CareerDream.in focuses on IT sector fresher roles, including software engineering, development, system analysis, internships, and training programs. Both work-from-home and on-site opportunities are regularly posted, with direct links to official company career pages for accuracy.'
    },
    {
      q: 'How can CareerDream.in help me prepare for job applications?',
      a: 'We provide resume screening, skill assessments, and curated learning resources to help you enhance your profile and increase your chances of landing your dream job.'
    },
    {
      q: 'Is there a community I can join for support and guidance?',
      a: 'Yes, CareerDream.in fosters a supportive community where job seekers and professionals share tips, success stories, and guidance to help each other succeed.'
    },
    {
      q: 'Can I trust the job listings on CareerDream.in?',
      a: 'Absolutely. All job listings link directly to official company career pages or verified course providers, ensuring transparency and authenticity.'
    },
    {
      q: 'How often is the platform updated?',
      a: 'We update our listings daily to ensure you never miss an opportunity in the fast-paced IT job market.'
    },
    {
      q: 'Who are the experts behind CareerDream.in?',
      a: 'Our platform is backed by IT industry experts with over a decade of experience in technology, recruitment, and career development, providing you with trust and reliable guidance.'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            CareerDream.in
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Your Partner in Building a Successful Career
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl">
            CareerDream.in is dedicated to empowering students, fresh graduates, and young professionals with the tools and opportunities they need to thrive in the IT industry and beyond.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* About Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              CareerDream.in is dedicated to empowering students, fresh graduates, and young professionals with the tools and opportunities they need to thrive in the IT industry and beyond.
            </p>
            <p>
              Our goal is to bridge the gap between education and employment by providing timely, verified job opportunities and skill-building resources.
            </p>
            <p>
              Our vision is to create a supportive community where every aspiring IT professional can access the guidance and tools necessary to build a successful career.
            </p>
            <p>
              Every day, we bring you the latest job openings, internships, off-campus drives, and curated learning resources. With added features like resume screening and skill assessments, CareerDream.in ensures that you are not only aware of opportunities but also prepared to seize them.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">🚀 Our Mission</h2>
          <ul className="grid md:grid-cols-1 gap-6 text-muted-foreground">
            <li className="flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              <span className="text-lg">To connect students and graduates with leading IT companies and career opportunities.</span>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              <span className="text-lg">To provide real-time updates on hiring drives, internships, and skill-building programs.</span>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              <span className="text-lg">To guide job seekers with assessments, resume insights, and curated resources that help them land their dream role.</span>
            </li>
          </ul>
        </section>

        {/* Founders Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">👨‍💻 About the Founders</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed bg-card rounded-xl p-8 border border-border">
            <p>
              CareerDream.in was established by renowned IT industry experts with over a decade of experience in technology, recruitment, and career development.
            </p>
            <p>
              With more than 10 years of hands-on expertise, our founders bring deep insights into IT hiring trends, skill requirements, and the evolving needs of fresh graduates.
            </p>
            <p>
              Their vision is to simplify the career journey for students and young professionals by combining verified job opportunities with practical tools like resume screening and skill assessments.
            </p>
            <p>
              Trusted by thousands of job seekers, CareerDream.in has become a reliable platform where industry knowledge meets community success.
            </p>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">✅ Why Choose CareerDream.in?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Transparency', desc: 'All job listings link directly to official company career pages or course providers.' },
              { title: 'Timeliness', desc: 'Daily updates ensure you never miss an opportunity.' },
              { title: 'Community Success', desc: 'Many of our users have secured roles at top IT firms such as Infosys, Wipro, TCS, Cognizant, HCL, and Accenture.' },
              { title: 'Comprehensive Tools', desc: 'Beyond job listings, CareerDream.in offers resume screening, skill assessments, and learning resources to help you stand out.' },
              { title: 'Expertise', desc: 'Backed by years of experience tracking IT recruitment trends and fresher hiring processes.' },
              { title: 'Completely Free', desc: 'We provide all resources, job alerts, and learning tools at no cost to you.' },
              { title: 'User-Friendly Platform', desc: 'Easy navigation and clear listings make your job search efficient and stress-free.' },
              { title: 'Community Support', desc: 'Join a growing network of job seekers and professionals sharing tips, success stories, and guidance.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Connect Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">📩 Connect With Us</h2>
          <p className="text-lg text-muted-foreground mb-10">
            We believe in open communication and community support. Explore the latest job listings, internships, and learning resources on our homepage, or reach out for queries and collaborations.
          </p>
          <SocialLinks variant="card" />
          <div className="mt-8 bg-card rounded-lg p-8 border border-border">
            <p className="text-lg text-muted-foreground">
              <span className="text-xl">✨</span> <strong>At CareerDream.in, we don't just share jobs</strong> — we provide opportunities, learning, assessments, and career-building tools to help you achieve your dreams.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="bg-card rounded-lg border border-border overflow-hidden group hover:border-primary/50 transition-colors"
              >
                <summary className="cursor-pointer p-6 font-semibold text-foreground hover:text-primary transition-colors flex items-center justify-between">
                  <span>{faq.q}</span>
                  <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
                </summary>
                <div className="px-6 pb-6 text-muted-foreground border-t border-border pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream roles through CareerDream.in. Start exploring opportunities today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/jobs"
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors inline-block"
            >
              Browse Jobs
            </Link>
            <Link
              to="/learn"
              className="px-8 py-3 rounded-lg border border-primary/30 text-foreground font-semibold hover:border-primary/60 hover:bg-primary/5 transition-colors inline-block"
            >
              Start Learning
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
