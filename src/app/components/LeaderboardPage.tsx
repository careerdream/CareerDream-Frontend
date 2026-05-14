import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Trophy, Medal, Crown, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';

interface LeaderboardEntry {
  rank: number;
  userId: number;
  userName: string;
  userAvatar: string | null;
  score: number;
  completedAt: string;
}

const RANK_STYLES = [
  { bg: 'bg-yellow-500/10 border-yellow-500/30', text: 'text-yellow-400', icon: Crown },
  { bg: 'bg-gray-400/10 border-gray-400/30', text: 'text-gray-400', icon: Medal },
  { bg: 'bg-amber-700/10 border-amber-700/30', text: 'text-amber-600', icon: Medal },
];

export function LeaderboardPage() {
  const { id } = useParams();
  const assessmentId = Number(id);
  const { assessments, user: currentUser } = useApp();
  const assessment = assessments.find(a => a.id === assessmentId) ?? null;

  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        const data = await api.get(`/assessments/${assessmentId}/leaderboard`);
        setEntries(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
        setError('Could not load leaderboard. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (assessmentId) fetchLeaderboard();
  }, [assessmentId]);

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="rounded-[2.5rem] border border-border bg-card overflow-hidden shadow-xl">
          {/* Header */}
          <div className="p-8 bg-gradient-to-br from-primary to-accent text-white flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Top Performers</h1>
              <p className="opacity-90 text-sm mt-1">
                {assessment ? assessment.title : 'Assessment'} — Live Leaderboard
              </p>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="py-8 text-center text-red-400 text-sm">{error}</div>
            ) : entries.length === 0 ? (
              <div className="py-12 rounded-2xl bg-muted/20 text-center">
                <Trophy className="w-10 h-10 mx-auto mb-4 text-muted-foreground opacity-30" />
                <p className="font-semibold text-muted-foreground">No entries yet</p>
                <p className="text-sm text-muted-foreground mt-1">Be the first to complete this assessment!</p>
              </div>
            ) : (
              <div className="space-y-3 mt-2">
                {entries.map((e, idx) => {
                  const style = RANK_STYLES[idx] || { bg: 'bg-card border-border', text: 'text-muted-foreground', icon: null };
                  const RankIcon = style.icon;
                  const isCurrentUser = currentUser && String(e.userId) === String(currentUser.id);

                  return (
                    <motion.div
                      key={e.userId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className={`flex items-center gap-4 p-4 rounded-2xl border ${style.bg} ${isCurrentUser ? 'ring-2 ring-primary/50' : ''}`}
                    >
                      {/* Rank */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${style.text}`}>
                        {RankIcon && idx < 3 ? <RankIcon className="w-5 h-5" /> : `#${e.rank}`}
                      </div>

                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg font-bold shrink-0">
                        {e.userAvatar && (e.userAvatar.startsWith('http') || e.userAvatar.startsWith('data:')) ? (
                          <img src={e.userAvatar} alt={e.userName} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          e.userName.charAt(0).toUpperCase()
                        )}
                      </div>

                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate">
                          {e.userName}
                          {isCurrentUser && (
                            <span className="ml-2 text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-black uppercase tracking-widest">You</span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(e.completedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>

                      {/* Score */}
                      <div className="text-right shrink-0">
                        <div className={`text-2xl font-black ${style.text}`}>{e.score}%</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
              <span>Showing top {entries.length} performers</span>
              <Link to="/assessments" className="text-primary font-bold hover:underline underline-offset-4">
                ← Back to Assessments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
