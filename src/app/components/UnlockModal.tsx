import { Sparkles, Zap, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function UnlockModal() {
  const { isUnlockModalOpen, setUnlockModalOpen, setAuthOpen, setAuthTab } = useApp();

  if (!isUnlockModalOpen) return null;

  const handleExplore = () => {
    setUnlockModalOpen(false);
    setAuthTab('login'); // or signup, whatever makes sense
    setAuthOpen(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setUnlockModalOpen(false)} />
      <div className="relative w-full max-w-sm bg-[#111118] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={() => setUnlockModalOpen(false)}
          className="absolute right-4 top-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 pt-12 flex flex-col items-center text-center">
          {/* Sparkles Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-6 shadow-xl shadow-orange-500/20">
            <Sparkles className="w-8 h-8 text-white fill-white/20" />
          </div>

          <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
            Unlock Your Potential
          </h2>
          
          <p className="text-[15px] text-slate-400 leading-relaxed mb-8 max-w-[280px]">
            Sign in to access your AI-powered career dashboard, track skill growth, and connect with top IT employers.
          </p>

          <button 
            onClick={handleExplore}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-bold text-base hover:opacity-90 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
          >
            Explore Opportunities <Zap className="w-4 h-4 fill-white/20" />
          </button>
        </div>
      </div>
    </div>
  );
}
