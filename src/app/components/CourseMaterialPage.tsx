import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, BookOpen, Clock, Award, CheckCircle, Play, Download, Share2, Bookmark, ThumbsUp, MessageCircle, ChevronRight } from 'lucide-react';
import { courseDatabase } from '../data/courseContent';
import { useApp } from '../context/AppContext';

export function CourseMaterialPage() {
  const { courseId } = useParams();
  const { isLoggedIn, courseProgress, updateCourseProgress } = useApp();
  const [expandedLesson, setExpandedLesson] = useState<number | null>(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set([]));

  const course = courseDatabase[courseId as keyof typeof courseDatabase];

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link to="/learn" className="text-primary hover:underline">Back to Learning Hub</Link>
        </div>
      </div>
    );
  }

  const allLessons = course.modules.flatMap(m => m.lessons);
  const completionPercentage = isLoggedIn 
    ? Math.round((completedLessons.size / allLessons.length) * 100) 
    : 0;

  // Initialize completed lessons based on global progress if available
  useEffect(() => {
    if (isLoggedIn && courseProgress[course.id]) {
      const targetCount = Math.floor((courseProgress[course.id] / 100) * allLessons.length);
      const initialSet = new Set<number>();
      for (let i = 0; i < targetCount; i++) {
        if (allLessons[i]) initialSet.add(allLessons[i].id);
      }
      if (initialSet.size > 0 && completedLessons.size === 0) {
        setCompletedLessons(initialSet);
      }
    }
  }, [isLoggedIn, courseProgress, course.id, allLessons.length]);

  const toggleLesson = (lessonId: number) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  const markComplete = (lessonId: number) => {
    if (!isLoggedIn) {
      alert('Please log in to track your progress.');
      return;
    }
    const newCompleted = new Set(completedLessons);
    if (newCompleted.has(lessonId)) {
      newCompleted.delete(lessonId);
    } else {
      newCompleted.add(lessonId);
    }
    setCompletedLessons(newCompleted);
    
    const newPercentage = Math.round((newCompleted.size / allLessons.length) * 100);
    updateCourseProgress(course.id, newPercentage);
  };

  const handleDownload = () => {
    const content = `Course Materials for ${course.title}\n\n` + allLessons.map(l => `${l.title}\n${l.content}`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course.title.replace(/\s+/g, '_')}_Materials.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: course.title,
      text: `I'm learning ${course.title} on CareerDream!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Course link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <Link to="/learn" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Learning Hub
          </Link>
          
          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">{course.icon}</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" /> {course.level}
                </div>
                <div className="flex items-center gap-1">
                  ⭐ {course.rating} ({course.students.toLocaleString()} students)
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {isLoggedIn && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">Your Progress</span>
                <span className="text-primary">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {course.modules.map(module => (
              <div key={module.id} className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{module.id}. {module.title}</h2>
                <div className="space-y-3">
                  {module.lessons.map(lesson => (
                    <div key={lesson.id} className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
                      <button
                        onClick={() => toggleLesson(lesson.id)}
                        className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 text-left flex-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markComplete(lesson.id);
                            }}
                            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              completedLessons.has(lesson.id)
                                ? 'bg-primary border-primary'
                                : 'border-border hover:border-primary'
                            }`}
                          >
                            {completedLessons.has(lesson.id) && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </button>
                          <div>
                            <h3 className="font-semibold">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                              <BookOpen className="w-3 h-3" /> {lesson.duration}

                            </p>
                          </div>
                        </div>
                        <div className="text-muted-foreground">
                          {expandedLesson === lesson.id ? '▼' : '▶'}
                        </div>
                      </button>

                      {/* Lesson Content */}
                      {expandedLesson === lesson.id && (
                        <div className="border-t border-border p-6 bg-muted/20 prose dark:prose-invert max-w-none">
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {lesson.content.split('\n').map((paragraph, idx) => {
                              if (paragraph.startsWith('#')) {
                                const level = paragraph.match(/^#+/)?.[0].length || 1;
                                const text = paragraph.replace(/^#+\s*/, '');
                                const className = {
                                  1: 'text-2xl font-bold mt-6 mb-3',
                                  2: 'text-xl font-bold mt-4 mb-2',
                                  3: 'text-lg font-semibold mt-3 mb-2'
                                }[level] || 'text-base font-medium';
                                return <div key={idx} className={className}>{text}</div>;
                              }
                              if (paragraph.startsWith('```')) return null;
                              if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                                return <div key={idx} className="ml-4 my-1">• {paragraph.replace(/^[-*]\s*/, '')}</div>;
                              }
                              if (paragraph.match(/^\d+\.\s/)) {
                                return <div key={idx} className="ml-4 my-1">{paragraph}</div>;
                              }
                              if (paragraph.trim()) {
                                return <p key={idx} className="my-2 text-slate-700 dark:text-slate-300">{paragraph}</p>;
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Course Info */}
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> Course Details
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Instructor</p>
                  <p className="font-medium">{course.instructor}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Lessons</p>
                  <p className="font-medium">{allLessons.length} total</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium">{course.duration}</p>
                </div>
              </div>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-semibold mb-4">What You'll Learn</h3>
              <ul className="space-y-2 text-sm">
                {[
                  `Master ${course.title.split(' ')[0]} fundamentals`,
                  'Build production-ready systems',
                  'Solve real-world problems',
                  'Industry best practices',
                  'Advanced optimization techniques'
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                <Download className="w-4 h-4" /> Download Materials
              </button>
              <button onClick={handleShare} className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-semibold">
                <Share2 className="w-4 h-4" /> Share Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
