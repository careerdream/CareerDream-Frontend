import { Mail, Instagram, Send, Facebook, Twitter, Youtube, Linkedin, Globe, MessageCircle } from 'lucide-react';

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

const socialMediaLinks: SocialLink[] = [
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://whatsapp.com/channel/0029VbCUhAq2kNFsL5vFwE1N' },
  { icon: Mail, label: 'Email', href: 'mailto:info@careerdream.in' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/careerdream.in/' },
  { icon: Send, label: 'Telegram', href: 'https://t.me/careerdream365' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61572023950143' },
  { icon: Twitter, label: 'Twitter', href: 'https://x.com/CDream85874' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@careerdream365' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/careerdream.in' },
];

interface SocialLinksProps {
  variant?: 'icon' | 'card';
  size?: 'sm' | 'md' | 'lg';
}

export function SocialLinks({ variant = 'icon', size = 'md' }: SocialLinksProps) {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const iconSizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  if (variant === 'card') {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialMediaLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== 'Email' ? '_blank' : undefined}
              rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
              className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 hover:bg-card/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">{link.label}</h3>
                  <p className="text-sm font-medium text-foreground break-words">
                    {link.label === 'Email' && 'info@careerdream.in'}
                    {link.label === 'Instagram' && '@careerdream.in'}
                    {link.label === 'Telegram' && 'CareerDream365 Community'}
                    {link.label === 'Facebook' && 'CareerDream.in'}
                    {link.label === 'Twitter' && '@CareerDream_in'}
                    {link.label === 'YouTube' && 'CareerDream365'}
                    {link.label === 'LinkedIn' && 'CareerDream.in'}
                    {link.label === 'WhatsApp' && 'WhatsApp Channel'}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-muted-foreground">
      {socialMediaLinks.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target={label !== 'Email' ? '_blank' : undefined}
          rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
          aria-label={label}
          className={`${sizeClasses[size]} rounded-lg border border-border hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center`}
          title={label}
        >
          <Icon className={iconSizeClasses[size]} />
        </a>
      ))}
    </div>
  );
}
