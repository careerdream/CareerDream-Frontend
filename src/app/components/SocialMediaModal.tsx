import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface SocialMediaModalProps {
  onClose: () => void;
}

export function SocialMediaModal({ onClose }: SocialMediaModalProps) {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: '👍',
      url: 'https://www.facebook.com/profile.php?id=61572023950143',
      color: 'from-blue-600 to-blue-400',
      hoverColor: 'hover:from-blue-500 hover:to-blue-300',
    },
    {
      name: 'Twitter',
      icon: '𝕏',
      url: 'https://twitter.com/careerdream_in',
      color: 'from-slate-700 to-slate-500',
      hoverColor: 'hover:from-slate-600 hover:to-slate-400',
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://linkedin.com/company/careerdream',
      color: 'from-blue-700 to-blue-500',
      hoverColor: 'hover:from-blue-600 hover:to-blue-400',
    },
    {
      name: 'Instagram',
      icon: '📸',
      url: 'https://instagram.com/careerdream.in',
      color: 'from-pink-600 to-purple-600',
      hoverColor: 'hover:from-pink-500 hover:to-purple-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2a] to-[#0a0a1a] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Join Our Community</h2>
            <p className="text-gray-400 text-sm mt-1">Follow us for daily career tips and updates</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-br ${social.color} ${social.hoverColor} text-white font-semibold transition-all duration-300 group cursor-pointer`}
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{social.icon}</span>
              <span className="text-sm text-center">{social.name}</span>
            </motion.a>
          ))}
        </div>

        {/* Benefits List */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-8">
          <p className="text-sm font-semibold text-white mb-3">Stay Connected:</p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Daily career tips & opportunities
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Exclusive job listings & updates
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Networking with professionals
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Industry insights & trends
            </li>
          </ul>
        </div>

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
        >
          Maybe Later
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
