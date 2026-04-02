import { Link } from 'react-router';
import { Trophy, Target, Clock, TrendingUp, Star, Users, CheckCircle, Lock } from 'lucide-react';
import { assessments } from '../data/assessments';
import { useApp } from '../context/AppContext';

const leaderboard = [
  { rank: 1, name: 'Arjun Mehta', score: 98, tests: 15, badge: '🏆', country: '🇮🇳' },
  { rank: 2, name: 'Sarah Chen', score: 96, tests: 18, badge: '🥈', country: '🇺🇸' },
  { rank: 3, name: 'Carlos Rivera', score: 94, tests: 12, badge: '🥉', country: '🇧🇷' },
  { rank: 4, name: 'Emma Wilson', score: 92, tests: 14, badge: null, country: '🇬🇧' },
  { rank: 5, name: 'Kenji Tanaka', score: 90, tests: 16, badge: null, country: '🇯🇵' },
];

export function AssessmentsPage() {
  const { testResults } = useApp();

  const avgScore = testResults.length
    ? Math.round(testResults.reduce((s, r) => s + r.score, 0) / testResults.length)
    : 0;

  const difficultyConfig = {
    Beginner: { cls: 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/20', label: 'Beginner' },
    Intermediate: { cls: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/20', label: 'Intermediate' },
    Advanced: { cls: 'bg-red-500/20 text-red-500 border-red-500/20', label: 'Advanced' },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold">Skill Assessments</h1>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Test your knowledge, earn certifications, and showcase your expertise to top employers. Over 50,000 professionals have already been certified.
          </p>

          {/* My Stats */}
          {testResults.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 max-w-lg">
              {[
                { icon: Target, label: 'Tests Taken', value: testResults.length, color: 'text-primary' },
                { icon: Trophy, label: 'Average Score', value: `${avgScore}%`, color: 'text-accent' },
                { icon: TrendingUp, label: 'Global Ranking', value: 'Top 15%', color: 'text-primary' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="p-5 rounded-2xl bg-card border border-border">
                  <Icon className={`w-7 h-7 ${color} mb-3`} />
                  <div className="text-2xl font-bold mb-1">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-card border border-dashed border-border inline-block">
              <p className="text-muted-foreground text-sm">Take your first assessment to see your stats!</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Assessment Grid */}
          <div className="lg:col-span-2 space-y-8">
            {/* Available Assessments */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Available Assessments</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {assessments.map(a => {
                  const diff = difficultyConfig[a.difficulty];
                  const myResult = testResults.find(r => r.assessmentId === a.id);
                  return (
                    <Link
                      key={a.id}
                      to={`/assessments/${a.id}`}
                      className="group relative p-6 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden"
                    >
                      {/* Background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${a.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                      <div className="relative">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                            {a.badge}
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${diff.cls}`}>{diff.label}</span>
                            {myResult && (
                              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-600 dark:text-green-400 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> {myResult.score}%
                              </span>
                            )}
                          </div>
                        </div>

                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{a.title}</h3>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {a.skills.slice(0, 3).map(skill => (
                            <span key={skill} className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">{skill}</span>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border text-sm">
                          <div>
                            <p className="text-muted-foreground text-xs flex items-center gap-1 mb-0.5"><Clock className="w-3 h-3" /> Duration</p>
                            <p className="font-semibold">{a.duration} min</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs flex items-center gap-1 mb-0.5"><Target className="w-3 h-3" /> Questions</p>
                            <p className="font-semibold">{a.questions.length}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="w-3 h-3" />
                            {a.attempts.toLocaleString()} attempts
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            Avg: {a.avgScore}%
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* My Test History */}
            {testResults.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-5">My Results</h2>
                <div className="space-y-4">
                  {testResults.map((result, i) => {
                    const assessment = assessments.find(a => a.id === result.assessmentId);
                    return (
                      <div key={i} className="p-5 rounded-2xl border border-border bg-card flex items-center gap-5">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl shrink-0">
                          {assessment?.badge ?? '📝'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold truncate">{result.title}</h3>
                          <p className="text-sm text-muted-foreground">{result.date}</p>
                          <div className="h-2 bg-muted rounded-full mt-2 overflow-hidden w-full max-w-xs">
                            <div
                              className={`h-full rounded-full ${result.score >= 80 ? 'bg-green-500' : result.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${result.score}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className={`text-3xl font-bold ${result.score >= 80 ? 'text-green-500' : result.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {result.score}%
                          </div>
                          {result.score >= 70 && (
                            <div className="text-xs text-green-500 flex items-center gap-1 justify-end mt-1">
                              <CheckCircle className="w-3 h-3" /> Certified
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Certificate CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-accent text-white">
              <Trophy className="w-12 h-12 mb-4 opacity-90" />
              <h3 className="text-xl font-bold mb-2">Earn Certificates</h3>
              <p className="text-sm opacity-90 mb-5">Score 70%+ to earn a shareable certificate. Add it to LinkedIn and stand out to employers.</p>
              <div className="space-y-2 mb-5">
                {['Shareable on LinkedIn', 'Industry recognized', 'Lifetime validity'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm opacity-90">
                    <CheckCircle className="w-4 h-4 shrink-0" /> {f}
                  </div>
                ))}
              </div>
              <Link to="/assessments/1" className="block w-full py-3 text-center bg-white text-primary rounded-xl hover:bg-white/90 transition-all font-bold shadow-lg">
                Start a Test Now
              </Link>
            </div>

            {/* Leaderboard */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-bold">Top Performers</h3>
              </div>
              <div className="space-y-3">
                {leaderboard.map(entry => (
                  <div key={entry.rank} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                      entry.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                      entry.rank === 3 ? 'bg-orange-500/20 text-orange-500' :
                      'bg-muted text-muted-foreground border border-border'
                    }`}>
                      {entry.badge ?? entry.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{entry.name} {entry.country}</p>
                      <p className="text-xs text-muted-foreground">{entry.tests} tests</p>
                    </div>
                    <span className="font-bold text-primary text-sm shrink-0">{entry.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Breakdown (if results exist) */}
            {testResults.length > 0 && (
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="font-bold mb-4">Skill Scores</h3>
                <div className="space-y-4">
                  {testResults.map((r, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium">{r.title}</span>
                        <span className="font-bold">{r.score}%</span>
                      </div>
                      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${r.score >= 80 ? 'bg-green-500' : r.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${r.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
