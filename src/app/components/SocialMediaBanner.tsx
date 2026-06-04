import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61572023950143', color: 'hover:text-[#1877F2]' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/careerdream.in/', color: 'hover:text-[#E4405F]' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/careerdream.in', color: 'hover:text-[#0A66C2]' },
  { name: 'X', icon: Twitter, href: 'https://x.com/CDream85874', color: 'hover:text-[#000000] dark:hover:text-white' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@careerdream365', color: 'hover:text-[#FF0000]' },
];

export function SocialMediaBanner() {
  return (
    <section className="py-12 bg-white dark:bg-[#030213] border-b border-border/50">
      <div className="container mx-auto px-6 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-black uppercase tracking-[0.3em] text-foreground mb-12 leading-relaxed"
        >
          GET INSTANT JOB ALERTS
        </motion.p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {socialLinks.map((social, idx) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -8, scale: 1.1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: idx * 0.1,
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
                className={`group flex flex-col items-center gap-4 transition-colors ${social.color}`}
              >
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-white/5 transition-colors duration-300 relative"
                  animate={{
                    boxShadow: [
                      "0px 0px 0px 0px rgba(79, 70, 229, 0)",
                      "0px 0px 25px 10px rgba(79, 70, 229, 0.5)",
                      "0px 0px 0px 0px rgba(79, 70, 229, 0)"
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Icon className="w-8 h-8 transition-transform group-hover:scale-110" />
                </motion.div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 group-hover:text-foreground transition-colors">
                  {social.name}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
