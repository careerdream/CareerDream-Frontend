import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Clock, AlertCircle, CheckCircle2, XCircle, ArrowLeft, ChevronRight, Trophy, Target, BarChart2, Loader2 } from 'lucide-react';
import { assessments } from '../data/assessments';
import { useApp } from '../context/AppContext';

export function TestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addTestResult } = useApp();
  const assessment = assessments.find(a => a.id === Number(id)) ?? assessments[0];

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(assessment.duration * 60);
  const [submitted, setSubmitted] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    if (!started || submitted) return;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeTaken(elapsed);
      setTimeLeft(prev => {
        if (prev <= 1) { handleSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, submitted]);

  const handleAnswer = (qId: number, idx: number) => setAnswers(prev => ({ ...prev, [qId]: idx }));

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    addTestResult({
      assessmentId: assessment.id,
      title: assessment.title,
      score,
      date: 'Just now',
      timeTaken: Math.floor(timeTaken / 60),
    });
  };

  const calculateScore = () => {
    let correct = 0;
    assessment.questions.forEach(q => { if (answers[q.id] === q.correct) correct++; });
    return Math.round((correct / assessment.questions.length) * 100);
  };

  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

  const diffBadge = {
    Beginner: 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/20',
    Intermediate: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/20',
    Advanced: 'bg-red-500/20 text-red-500 border-red-500/20',
  }[assessment.difficulty];

  if (!started) {
    return (
      <div className="min-h-screen bg-background py-10">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link to="/assessments" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Assessments
          </Link>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {/* Header */}
            <div className={`p-8 bg-gradient-to-br ${assessment.color} text-white text-center`}>
              <div className="text-6xl mb-4">{assessment.badge}</div>
              <h1 className="text-3xl font-bold mb-2">{assessment.title}</h1>
              <p className="opacity-90 mb-4">{assessment.description}</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {assessment.skills.map(s => (
                  <span key={s} className="px-3 py-1 rounded-full bg-white/20 text-sm">{s}</span>
                ))}
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Clock, label: 'Duration', value: `${assessment.duration} min` },
                  { icon: Target, label: 'Questions', value: assessment.questions.length },
                  { icon: BarChart2, label: 'Avg Score', value: `${assessment.avgScore}%` },
                  { icon: Trophy, label: 'Difficulty', value: assessment.difficulty },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="p-4 rounded-xl bg-muted/30 text-center">
                    <Icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground mb-1">{label}</p>
                    <p className="font-bold text-sm">{value}</p>
                  </div>
                ))}
              </div>

              {/* Instructions */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Before you start</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• {assessment.questions.length} questions, {assessment.duration} minutes total</li>
                      <li>• Each question has exactly one correct answer</li>
                      <li>• You can navigate between questions freely</li>
                      <li>• Test auto-submits when time expires</li>
                      <li>• You'll receive a detailed score breakdown after submission</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStarted(true)}
                className={`w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r ${assessment.color} hover:opacity-90 transition-all shadow-lg text-lg`}
              >
                Start Assessment →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    const score = calculateScore();
    const correct = assessment.questions.filter(q => answers[q.id] === q.correct).length;
    const incorrect = assessment.questions.length - correct;
    const passed = score >= 70;

    return (
      <div className="min-h-screen bg-background py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {/* Score Header */}
            <div className={`p-10 text-center ${passed ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-orange-500 to-red-500'} text-white`}>
              <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white/40 bg-white/20`}>
                {passed ? <Trophy className="w-12 h-12" /> : <Target className="w-12 h-12" />}
              </div>
              <h1 className="text-4xl font-bold mb-1">{score}%</h1>
              <p className="text-xl font-semibold mb-1">{passed ? 'Excellent Work!' : 'Keep Practicing!'}</p>
              <p className="opacity-90">{assessment.title} Assessment</p>
              {passed && (
                <div className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-white/20 border border-white/30 text-sm font-semibold">
                  🏆 Certificate Earned!
                </div>
              )}
            </div>

            <div className="p-8 space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-5 rounded-xl bg-primary/5">
                  <div className="text-3xl font-bold text-primary mb-1">{score}%</div>
                  <div className="text-sm text-muted-foreground">Score</div>
                </div>
                <div className="text-center p-5 rounded-xl bg-green-500/10">
                  <div className="text-3xl font-bold text-green-500 mb-1">{correct}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                <div className="text-center p-5 rounded-xl bg-red-500/10">
                  <div className="text-3xl font-bold text-red-500 mb-1">{incorrect}</div>
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                </div>
              </div>

              {/* Review */}
              <div>
                <h2 className="font-bold text-xl mb-4">Answer Review</h2>
                <div className="space-y-4">
                  {assessment.questions.map((q, i) => {
                    const isCorrect = answers[q.id] === q.correct;
                    const notAnswered = answers[q.id] === undefined;
                    return (
                      <div key={q.id} className={`p-5 rounded-xl border ${isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          {isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" /> : <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />}
                          <div className="flex-1">
                            <p className="font-semibold mb-1">Q{i + 1}. {q.question}</p>
                            <p className="text-sm text-muted-foreground">
                              Your answer: <span className={isCorrect ? 'text-green-600 dark:text-green-400 font-medium' : 'text-red-500 font-medium'}>
                                {notAnswered ? '(Not answered)' : q.options[answers[q.id]]}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-muted-foreground">
                                Correct: <span className="text-green-600 dark:text-green-400 font-medium">{q.options[q.correct]}</span>
                              </p>
                            )}
                            <div className="mt-2 p-2.5 rounded-lg bg-background/50 text-xs text-muted-foreground">
                              💡 {q.explanation}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Link to="/assessments" className="flex-1 py-3 rounded-xl border border-border hover:border-primary transition-all text-center font-medium">
                  ← All Assessments
                </Link>
                <Link to="/dashboard" className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-center font-semibold hover:opacity-90 transition-all">
                  View Dashboard →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Test
  const q = assessment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;
  const isLowTime = timeLeft < 300;

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Progress Bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{assessment.badge}</div>
              <div>
                <p className="font-semibold text-sm">{assessment.title}</p>
                <p className="text-xs text-muted-foreground">Question {currentQuestion + 1} of {assessment.questions.length}</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold ${isLowTime ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-primary/10 text-primary'}`}>
              <Clock className="w-4 h-4" />
              {formatTime(timeLeft)}
            </div>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Question Card */}
        <div className="p-8 rounded-2xl border border-border bg-card mb-5">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
            Question {currentQuestion + 1}
          </div>
          <h2 className="text-xl font-bold mb-8 leading-relaxed whitespace-pre-line">{q.question}</h2>

          <div className="space-y-3">
            {q.options.map((option, idx) => {
              const isSelected = answers[q.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(q.id, idx)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-150 ${
                    isSelected
                      ? 'border-primary bg-primary/10 shadow-md shadow-primary/20'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-3 rounded-xl border border-border hover:border-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed font-medium"
            >
              ← Previous
            </button>
            {currentQuestion === assessment.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:opacity-90 transition-all shadow-lg"
              >
                Submit Test ✓
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <div className="p-5 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Question Navigator</h3>
            <p className="text-xs text-muted-foreground">Answered: {Object.keys(answers).length}/{assessment.questions.length}</p>
          </div>
          <div className="grid grid-cols-10 gap-1.5">
            {assessment.questions.map((qs, idx) => (
              <button
                key={qs.id}
                onClick={() => setCurrentQuestion(idx)}
                className={`aspect-square rounded-lg text-xs font-bold transition-all ${
                  currentQuestion === idx ? 'bg-primary text-primary-foreground shadow-md' :
                  answers[qs.id] !== undefined ? 'bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/20' :
                  'border border-border hover:border-primary'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-primary" /> Current</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-green-500/30" /> Answered</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded border border-border" /> Not answered</span>
          </div>
        </div>
      </div>
    </div>
  );
}
