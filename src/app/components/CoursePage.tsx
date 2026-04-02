import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Play, CheckCircle, Lock, Star, Users, Clock, Award, BookOpen, ChevronDown, ChevronUp, Download } from 'lucide-react';
import { courses } from '../data/courses';
import { useApp } from '../context/AppContext';

export function CoursePage() {
  const { id } = useParams();
  const course = courses.find(c => c.id === Number(id)) ?? courses[0];
  const { enrolledCourseIds, enrollInCourse, courseProgress, updateCourseProgress } = useApp();

  const isEnrolled = enrolledCourseIds.includes(course.id);
  const progress = courseProgress[course.id] ?? 0;

  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [activeLesson, setActiveLesson] = useState<{ moduleId: number; lessonId: number } | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

  const markComplete = (lessonId: number) => {
    const next = new Set(completedLessons).add(lessonId);
    setCompletedLessons(next);
    const newProgress = Math.round((next.size / totalLessons) * 100);
    updateCourseProgress(course.id, newProgress);
  };

  const levelBadge = {
    Beginner: 'bg-green-500/20 text-green-600 dark:text-green-400',
    Intermediate: 'bg-yellow-500/20 text-yellow-600',
    Advanced: 'bg-red-500/20 text-red-500',
  }[course.level];

  const typeIcon = { video: Play, reading: BookOpen, quiz: Award };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${course.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 py-10">
          <Link to="/learn" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Learning Hub
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${levelBadge} bg-opacity-80`}>{course.level}</span>
              {course.bestseller && <span className="px-2.5 py-1 bg-accent/90 text-white rounded-full text-xs font-bold">Bestseller</span>}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">{course.title}</h1>
            <p className="text-white/80 mb-5 text-base leading-relaxed">{course.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm mb-6">
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><strong className="text-white">{course.rating}</strong> ({course.reviews.toLocaleString()} reviews)</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{course.students.toLocaleString()} students</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{course.duration}</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />{totalLessons} lessons</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">{course.instructorAvatar}</div>
                <div>
                  <p className="text-white font-semibold text-sm">{course.instructor}</p>
                  <p className="text-white/60 text-xs">{course.language} • Updated {course.lastUpdated}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player Placeholder */}
            {activeLesson ? (
              <div className="rounded-2xl overflow-hidden border border-border bg-card">
                <div className={`h-64 md:h-80 bg-gradient-to-br ${course.color} flex items-center justify-center relative`}>
                  <div className="text-center text-white">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition-colors
">
                      <Play className="w-10 h-10 ml-2" />
                    </div>
                    <p className="font-semibold text-lg">
                      {course.modules.find(m => m.id === activeLesson.moduleId)?.lessons.find(l => l.id === activeLesson.lessonId)?.title}
                    </p>
                    <p className="text-white/70 text-sm mt-1">Click to play video</p>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <p className="font-semibold">
                    {course.modules.find(m => m.id === activeLesson.moduleId)?.lessons.find(l => l.id === activeLesson.lessonId)?.title}
                  </p>
                  {!completedLessons.has(activeLesson.lessonId) && (
                    <button
                      onClick={() => markComplete(activeLesson.lessonId)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors text-sm font-medium"
                    >
                      <CheckCircle className="w-4 h-4" /> Mark Complete
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className={`rounded-2xl overflow-hidden border border-border h-64 md:h-80 bg-gradient-to-br ${course.color} flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity`}
                onClick={() => setActiveLesson({ moduleId: course.modules[0].id, lessonId: course.modules[0].lessons[0].id })}>
                <div className="text-center text-white">
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Play className="w-10 h-10 ml-2" />
                  </div>
                  <p className="font-bold text-xl">Start the Course</p>
                  <p className="text-white/70 text-sm mt-1">Click to begin your first lesson</p>
                </div>
              </div>
            )}

            {/* Progress bar (if enrolled) */}
            {isEnrolled && (
              <div className="p-5 rounded-2xl border border-border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Your Progress</h3>
                  <span className="text-primary font-bold">{progress}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{completedLessons.size} of {totalLessons} lessons completed</p>
              </div>
            )}

            {/* What You'll Learn */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.whatYouLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold">Course Curriculum</h2>
                <p className="text-muted-foreground text-sm mt-1">{course.modules.length} modules • {totalLessons} lessons • {course.duration}</p>
              </div>
              <div>
                {course.modules.map((module, mIdx) => {
                  const isOpen = expandedModule === mIdx;
                  const moduleCompleted = module.lessons.every(l => completedLessons.has(l.id));
                  return (
                    <div key={module.id} className="border-b border-border last:border-0">
                      <button
                        onClick={() => setExpandedModule(isOpen ? null : mIdx)}
                        className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          {moduleCompleted && <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />}
                          <div>
                            <p className="font-semibold">{module.title}</p>
                            <p className="text-xs text-muted-foreground">{module.lessons.length} lessons</p>
                          </div>
                        </div>
                        {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                      </button>
                      {isOpen && (
                        <div className="pb-2">
                          {module.lessons.map(lesson => {
                            const TypeIcon = typeIcon[lesson.type];
                            const isDone = completedLessons.has(lesson.id) || lesson.completed;
                            const isActive = activeLesson?.lessonId === lesson.id;
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => isEnrolled && setActiveLesson({ moduleId: module.id, lessonId: lesson.id })}
                                disabled={!isEnrolled}
                                className={`w-full flex items-center gap-4 px-5 py-3 text-left transition-colors ${
                                  isActive ? 'bg-primary/10' : 'hover:bg-muted/30'
                                } ${!isEnrolled ? 'opacity-70' : ''}`}
                              >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                  isDone ? 'bg-green-500/20 text-green-500' :
                                  isActive ? 'bg-primary text-white' :
                                  'bg-muted text-muted-foreground'
                                }`}>
                                  {isDone ? <CheckCircle className="w-4 h-4" /> : !isEnrolled && mIdx > 0 ? <Lock className="w-3.5 h-3.5" /> : <TypeIcon className="w-4 h-4" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm font-medium truncate ${isActive ? 'text-primary' : ''}`}>{lesson.title}</p>
                                  <p className="text-xs text-muted-foreground capitalize">{lesson.type}</p>
                                </div>
                                <span className="text-xs text-muted-foreground shrink-0">{lesson.duration}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-xl font-bold mb-4">Prerequisites</h2>
              <ul className="space-y-2">
                {course.prerequisites.map((p, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructor */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-xl font-bold mb-4">About the Instructor</h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl shrink-0">{course.instructorAvatar}</div>
                <div>
                  <h3 className="font-bold text-lg">{course.instructor}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-1">{course.instructorBio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Enroll Card */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden sticky top-24">
              <div className={`h-40 bg-gradient-to-br ${course.color} flex items-center justify-center text-6xl`}>{course.image}</div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-3xl font-bold text-primary">{course.price}</span>
                  {course.originalPrice && <span className="text-muted-foreground line-through">{course.originalPrice}</span>}
                  {course.originalPrice && <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-500 text-xs font-bold">SALE</span>}
                </div>
                {isEnrolled ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500/20 text-green-600 dark:text-green-400 font-semibold">
                      <CheckCircle className="w-5 h-5" /> Enrolled
                    </div>
                    <button className="w-full py-3 rounded-xl border border-border hover:border-primary transition-colors text-sm font-medium flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" /> Download Resources
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => enrollInCourse(course.id)}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-primary/30"
                    >
                      Enroll Now
                    </button>
                    <button className="w-full py-3 rounded-xl border-2 border-primary/30 text-primary hover:bg-primary/10 transition-colors font-semibold">
                      Try Free Preview
                    </button>
                  </div>
                )}
                <p className="text-center text-xs text-muted-foreground mt-3">30-day money-back guarantee</p>

                <div className="mt-5 pt-5 border-t border-border space-y-3">
                  {[
                    { icon: Clock, text: `${course.duration} on-demand` },
                    { icon: BookOpen, text: `${totalLessons} lessons` },
                    { icon: Award, text: course.certificate ? 'Certificate of completion' : 'No certificate' },
                    { icon: Users, text: `${course.students.toLocaleString()} students` },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm">
                      <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
