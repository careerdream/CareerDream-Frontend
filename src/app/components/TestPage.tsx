import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Clock, AlertCircle, CheckCircle2, XCircle, ArrowLeft, ChevronRight, Trophy, Target, BarChart2, Loader2 } from 'lucide-react';
import { assessments as fallbackAssessments } from '../data/assessments';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';

export function TestPage() {
  const { id } = useParams();
  const { addTestResult, addCheckpointScore, user, isLoggedIn, setUnlockModalOpen } = useApp();
  
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [checkpointModal, setCheckpointModal] = useState<{ open: boolean; checkpoint: number; score: number } | null>(null);
  const [pendingNext, setPendingNext] = useState<number | null>(null);
  const [savedCheckpoints, setSavedCheckpoints] = useState<number[]>([]);

  // Phase 2 & 3 additions
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<Record<number, { options: string[], correct: number }>>({});
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        setIsLoadingData(true);
        const data = await api.get(`/assessments/${id}`);
        setAssessmentData(data);
        setTimeLeft(data.duration * 60);
      } catch (err) {
        console.error('Failed to fetch assessment:', err);
        const fallback = fallbackAssessments.find(a => a.id === Number(id)) ?? fallbackAssessments[0];
        setAssessmentData(fallback);
        setTimeLeft(fallback.duration * 60);
        setError('Using offline mode. Changes will not be saved.');
      } finally {
        setIsLoadingData(false);
      }
    };

    if (id) fetchAssessment();
  }, [id]);

  const handleDifficultyChange = (newDifficulty: string) => {
    if (!assessmentData) return;
    // Difficulty is a local UI filter only — no need to persist to DB
    setAssessmentData({ ...assessmentData, difficulty: newDifficulty });
  };

  const assessment = assessmentData;

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

  const handleStart = () => {
    // Filter questions based on selected difficulty
    let filteredQuestions = assessment.questions.filter((q: any) => q.difficulty === assessment.difficulty);
    
    // Fallback if no questions match (e.g. for "All Levels" or legacy data)
    if (filteredQuestions.length === 0) {
      filteredQuestions = [...assessment.questions];
    }

    const questions = [...filteredQuestions].sort(() => Math.random() - 0.5);
    const optionsMap: Record<number, { options: string[], correct: number }> = {};
    
    questions.forEach(q => {
      const qCorrect = q.correctAnswer !== undefined ? q.correctAnswer : q.correct;
      const opts = q.options.map((opt: any, idx: number) => ({ text: opt, isCorrect: idx === qCorrect }));
      opts.sort(() => Math.random() - 0.5);
      optionsMap[q.id] = {
        options: opts.map(o => o.text),
        correct: opts.findIndex(o => o.isCorrect)
      };
    });
    
    setShuffledQuestions(questions);
    setShuffledOptions(optionsMap);
    setStarted(true);
  };

  const handleNext = () => {
    const nextIndex = currentQuestion + 1;
    const humanIndex = currentQuestion + 1;
    if (humanIndex % 10 === 0) {
      const checkpoint = Math.floor(humanIndex / 10);
      saveCheckpointIfNeeded(checkpoint);
      const score = computeBlockScore(checkpoint);
      setPendingNext(nextIndex);
      setCheckpointModal({ open: true, checkpoint, score });
      return;
    }
    if (nextIndex < shuffledQuestions.length) {
      setCurrentQuestion(nextIndex);
    } else {
      handleSubmit();
    }
  };

  const handleAnswer = (qId: number, idx: number) => {
    if (showFeedback || answers[qId] !== undefined) return;
    setAnswers(prev => ({ ...prev, [qId]: idx }));
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      handleNext();
    }, 1500);
  };

  const computeBlockScore = (checkpoint: number) => {
    const start = (checkpoint - 1) * 10;
    const end = Math.min(checkpoint * 10, shuffledQuestions.length);
    let correctCount = 0;
    for (let i = start; i < end; i++) {
      const q = shuffledQuestions[i];
      if (answers[q.id] === shuffledOptions[q.id].correct) correctCount++;
    }
    const total = end - start;
    return total === 0 ? 0 : Math.round((correctCount / total) * 100);
  };

  const saveCheckpointIfNeeded = (checkpoint: number) => {
    if (!isLoggedIn || savedCheckpoints.includes(checkpoint)) return;
    const score = computeBlockScore(checkpoint);
    addCheckpointScore({
      assessmentId: assessment.id,
      checkpoint,
      score,
      date: new Date().toISOString(),
      timeTaken: Math.floor(timeTaken / 60),
      userId: user?.id,
      userName: user?.name,
    });
    setSavedCheckpoints(prev => [...prev, checkpoint]);
  };

  const handleSubmit = () => {
    const finalCheckpoint = Math.ceil(shuffledQuestions.length / 10);
    setSubmitted(true);
    const score = calculateScore();
    
    if (isLoggedIn) {
      saveCheckpointIfNeeded(finalCheckpoint);
      addTestResult({
        assessmentId: assessment.id,
        title: assessment.title,
        score,
        date: 'Just now',
        timeTaken: Math.floor(timeTaken / 60),
      });
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    shuffledQuestions.forEach(q => { if (answers[q.id] === shuffledOptions[q.id].correct) correctCount++; });
    return Math.round((correctCount / shuffledQuestions.length) * 100);
  };

  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

  const diffBadge = {
    Easy: 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/20',
    Medium: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/20',
    Hard: 'bg-red-500/20 text-red-500 border-red-500/20',
    Beginner: 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/20',
    Intermediate: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/20',
    Advanced: 'bg-red-500/20 text-red-500 border-red-500/20',
  }[assessment?.difficulty || 'Easy'];

  if (isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground animate-pulse">Preparing your assessment...</p>
        </div>
      </div>
    );
  }

  if (!assessment) return null;

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
              {/* Difficulty Toggle & Question Distribution */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Select Difficulty</p>
                  <div className="flex items-center gap-2 text-xs font-medium text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                    <Target className="w-3 h-3" />
                    Total: {assessment.questions?.length || 0} Questions
                  </div>
                </div>
                
                <div className="flex p-1 bg-muted/50 rounded-2xl border border-border">
                  {['Easy', 'Medium', 'Hard'].map((level) => {
                    const isActive = assessment.difficulty === level;
                    const count = assessment.questions?.filter((q: any) => q.difficulty === level).length || 0;
                    
                    return (
                      <button
                        key={level}
                        onClick={() => handleDifficultyChange(level)}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all relative group ${
                          isActive 
                            ? (level === 'Easy' ? 'bg-green-500 text-white shadow-lg' : 
                               level === 'Medium' ? 'bg-yellow-500 text-white shadow-lg' : 
                               'bg-red-500 text-white shadow-lg')
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-0.5">
                          <span>{level}</span>
                          <span className={`text-[10px] ${isActive ? 'text-white/80' : 'text-muted-foreground/70'}`}>
                            {count} Questions
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Clock, label: 'Duration', value: `${assessment.duration} min` },
                  { icon: Target, label: 'Current Filter', value: `${assessment.questions?.filter((q: any) => q.difficulty === assessment.difficulty).length || 0} Questions` },
                  { icon: BarChart2, label: 'Avg Score', value: `${assessment.avgScore}%` },
                  { icon: Trophy, label: 'Current Level', value: assessment.difficulty },
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
                      <li>• {assessment.questions?.filter((q: any) => q.difficulty === assessment.difficulty).length || 0} questions ({assessment.difficulty}), {assessment.duration} minutes total</li>
                      <li>• Each question has exactly one correct answer</li>
                      <li>• You can navigate between questions freely</li>
                      <li>• Test auto-submits when time expires</li>
                      <li>• You'll receive a detailed score breakdown after submission</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStart}
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
    const correct = shuffledQuestions.filter(q => answers[q.id] === shuffledOptions[q.id].correct).length;
    const incorrect = shuffledQuestions.length - correct;
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
              {passed && isLoggedIn && (
                <div className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-white/20 border border-white/30 text-sm font-semibold">
                  🏆 Certificate Earned!
                </div>
              )}
              {passed && !isLoggedIn && (
                <div className="mt-6 inline-flex flex-col items-center">
                  <div className="px-5 py-2.5 rounded-full bg-white/20 border border-white/30 text-sm font-semibold mb-3">
                    🎯 You passed!
                  </div>
                  <button onClick={() => setUnlockModalOpen(true)} className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:scale-105 transition-transform shadow-xl">
                    Log in to Save Score & Get Certificate
                  </button>
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
                  {shuffledQuestions.map((q, i) => {
                    const isCorrect = answers[q.id] === shuffledOptions[q.id].correct;
                    const notAnswered = answers[q.id] === undefined;
                    return (
                      <div key={q.id} className={`p-5 rounded-xl border ${isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          {isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" /> : <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />}
                          <div className="flex-1">
                            <p className="font-semibold mb-1">Q{i + 1}. {q.text || q.question}</p>
                            <p className="text-sm text-muted-foreground">
                              Your answer: <span className={isCorrect ? 'text-green-600 dark:text-green-400 font-medium' : 'text-red-500 font-medium'}>
                                {notAnswered ? '(Not answered)' : shuffledOptions[q.id].options[answers[q.id]]}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-muted-foreground">
                                Correct: <span className="text-green-600 dark:text-green-400 font-medium">{shuffledOptions[q.id].options[shuffledOptions[q.id].correct]}</span>
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
  const q = shuffledQuestions[currentQuestion];
  const qOptions = shuffledOptions[q?.id];
  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;
  const isLowTime = timeLeft < 300;

  if (!q) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Checkpoint Modal */}
      {checkpointModal?.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md p-6 rounded-xl bg-card border border-border">
            <h3 className="text-xl font-bold mb-2">Checkpoint {checkpointModal.checkpoint} Completed</h3>
            <p className="mb-4">Block Score: <span className="font-semibold">{checkpointModal.score}%</span></p>
            <p className="text-sm text-muted-foreground mb-4">Your checkpoint score was saved to the leaderboard.</p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  // continue to pending question
                  if (pendingNext !== null) setCurrentQuestion(pendingNext);
                  setPendingNext(null);
                  setCheckpointModal(null);
                }}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Progress Bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{assessment.badge}</div>
              <div>
                <p className="font-semibold text-sm">{assessment.title}</p>
                <p className="text-xs text-muted-foreground">Question {currentQuestion + 1} of {shuffledQuestions.length}</p>
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
        <div className="p-8 rounded-2xl border border-border bg-card mb-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Question {currentQuestion + 1}
            </div>
            {q.difficulty && (
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                q.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                q.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600' :
                'bg-red-500/10 text-red-500'
              }`}>
                {q.difficulty}
              </div>
            )}
          </div>
          <h2 className="text-xl font-bold mb-8 leading-relaxed whitespace-pre-line">{q.text || q.question}</h2>

          <div className="space-y-3">
            {qOptions.options.map((option, idx) => {
              const isSelected = answers[q.id] === idx;
              const isCorrectOption = idx === qOptions.correct;
              const hasAnswered = answers[q.id] !== undefined;
              
              let style = 'border-border hover:border-primary/50 hover:bg-muted/50';
              if (hasAnswered && showFeedback) {
                  if (isCorrectOption) style = 'border-green-500 bg-green-500/10 shadow-md shadow-green-500/20 text-green-700 dark:text-green-400';
                  else if (isSelected) style = 'border-red-500 bg-red-500/10 shadow-md shadow-red-500/20 text-red-700 dark:text-red-400';
              } else if (isSelected) {
                  style = 'border-primary bg-primary/10 shadow-md shadow-primary/20 text-primary';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(q.id, idx)}
                  disabled={hasAnswered}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-150 ${style}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        isSelected && (!showFeedback || isCorrectOption) ? 'border-primary bg-primary' : 
                        isSelected && showFeedback && !isCorrectOption ? 'border-red-500 bg-red-500' :
                        'border-muted-foreground'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                    {hasAnswered && showFeedback && isCorrectOption && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                    {hasAnswered && showFeedback && isSelected && !isCorrectOption && (
                        <XCircle className="w-5 h-5 text-red-500" />
                    )}
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
              {currentQuestion === shuffledQuestions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:opacity-90 transition-all shadow-lg"
              >
                Submit Test ✓
              </button>
            ) : (
              <button
                onClick={handleNext}
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
            <p className="text-xs text-muted-foreground">Answered: {Object.keys(answers).length}/{shuffledQuestions.length}</p>
          </div>
          <div className="grid grid-cols-10 gap-1">
            {shuffledQuestions.map((qs, idx) => (
              <button
                key={qs.id}
                onClick={() => setCurrentQuestion(idx)}
                className={`h-6 w-full rounded text-[10px] font-semibold transition-all ${
                  currentQuestion === idx ? 'bg-primary text-primary-foreground shadow-sm' :
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
