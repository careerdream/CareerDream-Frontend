import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Plus, Edit, Trash2, Eye, Download, CheckCircle, 
  XCircle, Clock, Star, Users, BarChart2, MessageSquare, Megaphone, Loader2 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, LineChart, Line } from 'recharts';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { api } from '../utils/api';

export function AdminCourseManagement() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  // Views: 'list', 'edit', 'details'
  const [currentView, setCurrentView] = useState<'list' | 'edit' | 'details'>('list');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  
  useEffect(() => {
    if (currentView === 'list') {
      fetchCourses();
    }
  }, [page, statusFilter, currentView]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(search && { search })
      });
      const data = await api.get(`/admin/courses?${params}`);
      setCourses(data.data || data.courses || []);
      setTotalPages(data.totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseDetails = async (id: number) => {
    try {
      const [course, students, analytics] = await Promise.all([
        api.get(`/admin/courses/${id}`),
        api.get(`/admin/courses/${id}/students`),
        api.get(`/admin/courses/${id}/analytics`)
      ]);
      setSelectedCourse(course);
      setStudents(students || []);
      setAnalytics(analytics);
      setCurrentView('details');
    } catch (e) {
      console.error("Failed to load details");
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedIds.length} courses? This action cannot be undone.`)) return;
    try {
      await api.post('/admin/courses/bulk-delete', { ids: selectedIds });
      setSelectedIds([]);
      fetchCourses();
    } catch (e) {
      console.error(e);
    }
  };

  const toggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    await api.put(`/admin/courses/${id}/publish`, { status: newStatus });
    fetchCourses();
  };

  const deleteCourse = async (id: number) => {
    if (!window.confirm('Delete this course? WARNING: This will affect enrolled students.')) return;
    await api.delete(`/admin/courses/${id}`);
    if (currentView === 'details') setCurrentView('list');
    else fetchCourses();
  };

  const sendAnnouncement = async (id: number) => {
    const message = window.prompt('Enter your announcement message to all enrolled students:');
    if (!message) return;
    await api.post(`/admin/courses/${id}/announce`, { message });
    alert('Announcement sent!');
  };

  const StatusBadge = ({ status, bestseller }: { status: string, bestseller?: boolean }) => {
    const colors: Record<string, string> = {
      published: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-500/10 dark:text-green-400',
      archived: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400',
      draft: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400',
    };
    return (
      <div className="flex gap-2">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status] || colors.draft}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        {bestseller && (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 flex items-center">
            <Star size={12} className="mr-1 fill-amber-500" /> Bestseller
          </span>
        )}
      </div>
    );
  };

  // LIST VIEW
  if (currentView === 'list') {
    return (
      <div className="max-w-7xl mx-auto pb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Course Management</h1>
          <div className="flex space-x-3">
            {selectedIds.length > 0 && (
              <Button variant="destructive" onClick={handleBulkDelete}>
                <Trash2 size={16} className="mr-2" /> Delete Selected ({selectedIds.length})
              </Button>
            )}
            <Button variant="outline" onClick={() => api.download('/admin/courses/export', 'courses_export.csv')}>
              <Download size={16} className="mr-2" /> Export CSV
            </Button>
            <Button onClick={() => { setSelectedCourse(null); setCurrentView('edit'); }} className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" /> Create Course
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <Input 
                placeholder="Search title, instructor, category..." 
                className="pl-10" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && fetchCourses()}
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter size={16} className="mr-2 text-slate-400" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="p-4 w-12">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300"
                      onChange={(e) => {
                        if (e.target.checked) {
                          const newIds = courses.map(c => c.id).filter(id => !selectedIds.includes(id));
                          setSelectedIds([...selectedIds, ...newIds]);
                        } else {
                          const pageIds = courses.map(c => c.id);
                          setSelectedIds(selectedIds.filter(id => !pageIds.includes(id)));
                        }
                      }}
                      checked={courses.length > 0 && courses.every(c => selectedIds.includes(c.id))}
                    />
                  </th>
                  <th className="p-4 font-medium">Course Info</th>
                  <th className="p-4 font-medium">Instructor</th>
                  <th className="p-4 font-medium">Status & Level</th>
                  <th className="p-4 font-medium">Stats</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {loading ? (
                  <tr><td colSpan={7} className="p-8 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" /></td></tr>
                ) : courses.length === 0 ? (
                  <tr><td colSpan={7} className="p-8 text-center text-slate-500">No courses found.</td></tr>
                ) : courses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20">
                    <td className="p-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300"
                        checked={selectedIds.includes(course.id)}
                        onChange={(e) => setSelectedIds(e.target.checked ? [...selectedIds, course.id] : selectedIds.filter(id => id !== course.id))}
                      />
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-900 dark:text-white line-clamp-1">{course.title}</p>
                      <p className="text-xs text-slate-500">{course.category}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {course.instructorAvatar ? (
                          <img src={course.instructorAvatar} alt="Instructor" className="w-6 h-6 rounded-full object-cover" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                            {course.instructor.charAt(0)}
                          </div>
                        )}
                        <span className="text-xs font-medium">{course.instructor}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1.5 items-start">
                        <StatusBadge status={course.status || 'draft'} bestseller={course.bestseller} />
                        <span className="text-xs text-slate-500">{course.level}</span>
                      </div>
                    </td>
                    <td className="p-4 text-xs text-slate-600 dark:text-slate-400">
                      <div className="flex flex-col gap-1">
                        <span title="Enrolled Students"><Users size={12} className="inline mr-1" />{course._count?.enrolledUsers || 0}</span>
                        <span title="Rating"><Star size={12} className="inline mr-1 text-amber-500" />{course.rating} ({course.reviews})</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium">
                      {course.price === 'Free' ? (
                        <span className="text-green-600 dark:text-green-400">Free</span>
                      ) : (
                        <span>{course.price}</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => fetchCourseDetails(course.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded" title="View Analytics & Students"><BarChart2 size={18} /></button>
                        <button onClick={() => { setSelectedCourse(course); setCurrentView('edit'); }} className="p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded" title="Edit"><Edit size={18} /></button>
                        <button onClick={() => toggleStatus(course.id, course.status)} className="p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded" title={course.status === 'published' ? 'Unpublish' : 'Publish'}>
                          {course.status === 'published' ? <Eye size={18} /> : <Eye size={18} className="opacity-50" />}
                        </button>
                        <button onClick={() => deleteCourse(course.id)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded" title="Delete"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm">
            <p className="text-slate-500">Showing page {page} of {totalPages || 1}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
              <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DETAILS / ANALYTICS VIEW
  if (currentView === 'details' && selectedCourse && analytics) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setCurrentView('list')}>← Back to Courses</Button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex-1">{selectedCourse.title}</h1>
          <StatusBadge status={selectedCourse.status} bestseller={selectedCourse.bestseller} />
          <Button variant="outline" onClick={() => sendAnnouncement(selectedCourse.id)}><Megaphone size={16} className="mr-2" /> Announce</Button>
          <Button variant="outline" onClick={() => { setCurrentView('edit'); }}><Edit size={16} className="mr-2" /> Edit</Button>
        </div>

        {/* Analytics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-500 mb-2">Total Enrollments</h3>
            <p className="text-3xl font-bold text-blue-600">{analytics.totalEnrollments}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-500 mb-2">Completion Rate</h3>
            <p className="text-3xl font-bold text-emerald-600">{analytics.completionRate}%</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-500 mb-2">Average Rating</h3>
            <p className="text-3xl font-bold text-amber-500 flex items-center">
              {analytics.averageRating} <Star size={20} className="ml-2 fill-amber-500" />
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-500 mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {selectedCourse.price === 'Free' ? '$0' : `${parseFloat(selectedCourse.price.replace(/[^0-9.]/g, '')) * analytics.totalEnrollments}`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Student Demographics (By Country)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.demographics} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.2} />
                  <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="country" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={100} />
                  <RechartsTooltip cursor={{fill: '#334155', opacity: 0.1}} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Info */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Course Info</h3>
             <img src={selectedCourse.image || 'https://via.placeholder.com/400x200'} alt="Course" className="w-full h-32 object-cover rounded-lg mb-4" />
             <div className="space-y-3 text-sm">
               <div className="flex justify-between"><span className="text-slate-500">Level</span><span className="font-medium">{selectedCourse.level}</span></div>
               <div className="flex justify-between"><span className="text-slate-500">Duration</span><span className="font-medium">{selectedCourse.duration}</span></div>
               <div className="flex justify-between"><span className="text-slate-500">Language</span><span className="font-medium">{selectedCourse.language}</span></div>
               <div className="flex justify-between"><span className="text-slate-500">Modules</span><span className="font-medium">{Array.isArray(selectedCourse.modules) ? selectedCourse.modules.length : 0}</span></div>
               <div className="flex justify-between"><span className="text-slate-500">Certificate</span><span className="font-medium">{selectedCourse.certificate ? 'Yes' : 'No'}</span></div>
             </div>
          </div>
        </div>

        {/* Enrolled Students Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Enrolled Students ({(students || []).length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500">
                <tr>
                  <th className="p-4 font-medium">Student</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium">Enrollment Date</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Completed At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {(students || []).length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-slate-500">No students enrolled yet.</td></tr>
                ) : (students || []).map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20">
                    <td className="p-4">
                      <p className="font-semibold">{enrollment.user?.name || 'Unknown'}</p>
                      <p className="text-xs text-slate-500">{enrollment.user?.email}</p>
                    </td>
                    <td className="p-4">{enrollment.user?.location || 'N/A'}</td>
                    <td className="p-4">{new Date(enrollment.timestamp).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${enrollment.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                        {enrollment.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{enrollment.completed_at ? new Date(enrollment.completed_at).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // CREATE / EDIT FORM VIEW (Simplified Structure)
  if (currentView === 'edit') {
    const isEdit = !!selectedCourse;
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setCurrentView(isEdit && analytics ? 'details' : 'list')}>← Back</Button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{isEdit ? 'Edit Course' : 'Create New Course'}</h1>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-slate-500 mb-8">This is where the multi-step CourseFormModal and ModuleEditor are embedded. You can fully customize title, instructor details, price, modules JSON, and more here.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div><label className="text-sm font-medium">Course Title</label><Input defaultValue={selectedCourse?.title} className="mt-1" /></div>
            <div><label className="text-sm font-medium">Instructor</label><Input defaultValue={selectedCourse?.instructor} className="mt-1" /></div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select defaultValue={selectedCourse?.status || 'draft'}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><label className="text-sm font-medium">Price</label><Input defaultValue={selectedCourse?.price || 'Free'} className="mt-1" /></div>
            
            <div className="col-span-2 space-y-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked={selectedCourse?.bestseller} className="w-4 h-4 rounded" />
                <span className="text-sm font-medium">Mark as Bestseller</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked={selectedCourse?.certificate} className="w-4 h-4 rounded" />
                <span className="text-sm font-medium">Offer Certificate upon completion</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
             <Button variant="outline" onClick={() => setCurrentView(isEdit && analytics ? 'details' : 'list')}>Cancel</Button>
             <Button onClick={() => {
                // Simulate save and go back
                setCurrentView('list');
                fetchCourses();
             }}>Save Course</Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
