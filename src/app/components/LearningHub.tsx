import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Star, Clock, Award, TrendingUp, BookOpen, Play, ChevronRight, Filter, Users } from 'lucide-react';
import { courses } from '../data/courses';
import { useApp } from '../context/AppContext';

const CATEGORIES = ['All', 'AI/ML', 'Cloud', 'Full Stack', 'Data Science', 'DevOps', 'Cybersecurity', 'Data Engineering', 'Mobile'];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const learningPaths = [
  { name: 'Data Scientist', courses: 8, duration: '6 months', icon: '📊', color: 'from-blue-500 to-cyan-500', skills: ['Python', 'Statistics', 'ML', 'SQL'] },
  { name: 'Cloud Architect', courses: 6, duration: '4 months', icon: '☁️', color: 'from-orange-400 to-yellow-400', skills: ['AWS', 'Azure', 'K8s', 'Terraform'] },
  { name: 'Full Stack Engineer', courses: 10, duration: '8 months', icon: '💻', color: 'from-green-500 to-teal-500', skills: ['React', 'Node', 'DBs', 'DevOps'] },
  { name: 'ML Engineer', courses: 7, duration: '5 months', icon: '🤖', color: 'from-violet-500 to-purple-600', skills: ['Python', 'PyTorch', 'MLOps', 'AWS'] },
];

export function LearningHub() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const { enrolledCourseIds, enrollInCourse, courseProgress } = useApp();

  const filtered = courses.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || c.category === category;
    const matchLevel = level === 'All' || c.level === level;
    return matchSearch && matchCat && matchLevel;
  });

  const levelBadge = { Beginner: 'bg-green-500/20 text-green-600 dark:text-green-400', Intermediate: 'bg-yellow-500/20 text-yellow-600', Advanced: 'bg-red-500/20 text-red-500' };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-3">Learning Hub</h1>
          <p className="text-muted-foreground mb-6">Master cutting-edge IT skills from world-class instructors</p>

          <div className="flex gap-3 max-w-2xl mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses, instructors or skills..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 px-5 py-3.5 rounded-xl border-2 border-border bg-background hover:border-primary transition-colors font-medium">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${category === cat ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-background/80 border border-border hover:border-primary hover:text-primary'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 space-y-14">
        {/* Learning Paths */}
        <section>
          <div className="flex items-end justify-between mb-7">
            <div>
              <h2 className="text-2xl font-bold mb-1">Learning Paths</h2>
              <p className="text-muted-foreground text-sm">Structured roadmaps curated by industry experts</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {learningPaths.map(path => (
              <div key={path.name} className="group p-6 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {path.icon}
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{path.name}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{path.courses} courses</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{path.duration}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {path.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">{s}</span>
                  ))}
                </div>
                <button className="w-full py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-sm font-medium flex items-center justify-center gap-1">
                  View Path <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Enrolled Courses (if any) */}
        {enrolledCourseIds.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses.filter(c => enrolledCourseIds.includes(c.id)).map(course => {
                const progress = courseProgress[course.id] ?? 0;
                return (
                  <Link key={course.id} to={`/learn/${course.id}`}
                    className="group rounded-2xl border border-border bg-card hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all overflow-hidden">
                    <div className={`h-32 bg-gradient-to-br ${course.color} flex items-center justify-center text-5xl relative`}>
                      {course.image}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                        <div className="h-full bg-white transition-all" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors truncate">{course.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{progress}% complete</p>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* All Courses */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                {category === 'All' ? 'All Courses' : `${category} Courses`}
                <span className="ml-2 text-base font-normal text-muted-foreground">({filtered.length})</span>
              </h2>
            </div>
            <div className="flex gap-2">
              {LEVELS.map(l => (
                <button key={l} onClick={() => setLevel(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${level === l ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">📚</p>
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(course => {
                const isEnrolled = enrolledCourseIds.includes(course.id);
                const progress = courseProgress[course.id];
                return (
                  <Link key={course.id} to={`/learn/${course.id}`}
                    className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                    {/* Thumbnail */}
                    <div className={`relative h-48 bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                      <div className="text-6xl group-hover:scale-110 transition-transform duration-300">{course.image}</div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-xl">
                          <Play className="w-6 h-6 text-primary ml-1" />
                        </div>
                      </div>
                      {course.bestseller && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 bg-accent text-accent-foreground rounded-full text-xs font-bold shadow-md">Bestseller</div>
                      )}
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-background/90 backdrop-blur rounded-lg text-xs font-semibold">
                        {course.level}
                      </div>
                      {isEnrolled && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-green-500 text-white rounded-full text-xs font-bold">Enrolled</div>
                      )}
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-base group-hover:text-primary transition-colors leading-snug">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.instructor}</p>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-bold text-sm">{course.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">({course.reviews.toLocaleString()})</span>
                        <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />{(course.students / 1000).toFixed(0)}k
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {course.skills.slice(0, 3).map(s => (
                          <span key={s} className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">{s}</span>
                        ))}
                      </div>

                      {isEnrolled && progress !== undefined && (
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{progress}%</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                          {course.certificate && <span className="flex items-center gap-1"><Award className="w-3 h-3" />Certificate</span>}
                        </div>
                        <div className="text-right">
                          {isEnrolled ? (
                            <span className="text-sm font-bold text-green-500">Enrolled ✓</span>
                          ) : (
                            <span className="text-lg font-bold text-primary">{course.price}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="py-12 px-8 rounded-2xl bg-gradient-to-br from-primary to-accent text-white text-center">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-3">Ready to Accelerate Your Career?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto">Access 1,500+ courses, structured learning paths, and industry certifications.</p>
          <button className="px-10 py-4 bg-white text-primary rounded-xl hover:bg-white/90 font-bold text-lg shadow-xl hover:shadow-2xl transition-all">
            Explore All Courses
          </button>
        </section>
      </div>
    </div>
  );
}
