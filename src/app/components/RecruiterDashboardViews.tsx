import { useState } from 'react';
import { Briefcase, Users, CheckCircle, ChevronDown, ChevronUp, MapPin, Search } from 'lucide-react';

export function ActiveJobsView({ postedJobs, globalApplications, onBack }: { postedJobs: any[], globalApplications: any[], onBack: () => void }) {
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const [expandedStatus, setExpandedStatus] = useState<string | null>(null);

  const getAppsByStatus = (jobId: number, status: string) => {
    return globalApplications.filter(app => app.jobId === jobId && app.status === status);
  };

  const handleExpand = (jobId: number, status: string) => {
    if (expandedJobId === jobId && expandedStatus === status) {
      setExpandedJobId(null);
      setExpandedStatus(null);
    } else {
      setExpandedJobId(jobId);
      setExpandedStatus(status);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Active Jobs Overview</h3>
        <button onClick={onBack} className="text-sm font-medium text-muted-foreground hover:text-foreground">← Back to Dashboard</button>
      </div>
      
      {postedJobs.length === 0 ? (
        <p className="text-muted-foreground">No active jobs.</p>
      ) : (
        <div className="space-y-4">
          {postedJobs.map(job => {
            const applied = getAppsByStatus(job.id, 'Applied');
            const shortlisted = getAppsByStatus(job.id, 'Shortlisted');
            const interviewing = getAppsByStatus(job.id, 'Interviewing');
            const hired = getAppsByStatus(job.id, 'Hired');
            const rejected = getAppsByStatus(job.id, 'Rejected');

            return (
              <div key={job.id} className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-4 bg-muted/10">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{job.title}</h4>
                    <p className="text-sm text-muted-foreground">{job.location} • {job.type || job.locationType}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <StatusPill label="Applied" count={applied.length} color="bg-blue-500/10 text-blue-500 border-blue-500/20" onClick={() => handleExpand(job.id, 'Applied')} active={expandedJobId === job.id && expandedStatus === 'Applied'} />
                    <StatusPill label="Shortlisted" count={shortlisted.length} color="bg-amber-500/10 text-amber-500 border-amber-500/20" onClick={() => handleExpand(job.id, 'Shortlisted')} active={expandedJobId === job.id && expandedStatus === 'Shortlisted'} />
                    <StatusPill label="Interviewing" count={interviewing.length} color="bg-purple-500/10 text-purple-500 border-purple-500/20" onClick={() => handleExpand(job.id, 'Interviewing')} active={expandedJobId === job.id && expandedStatus === 'Interviewing'} />
                    <StatusPill label="Hired" count={hired.length} color="bg-green-500/10 text-green-500 border-green-500/20" onClick={() => handleExpand(job.id, 'Hired')} active={expandedJobId === job.id && expandedStatus === 'Hired'} />
                    <StatusPill label="Rejected" count={rejected.length} color="bg-red-500/10 text-red-500 border-red-500/20" onClick={() => handleExpand(job.id, 'Rejected')} active={expandedJobId === job.id && expandedStatus === 'Rejected'} />
                  </div>
                </div>

                {expandedJobId === job.id && expandedStatus && (
                  <div className="p-5 border-t border-border bg-muted/5 animate-in slide-in-from-top-2">
                    <h5 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Candidates in {expandedStatus}</h5>
                    <CandidateList applications={getAppsByStatus(job.id, expandedStatus)} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function TotalApplicationsView({ postedJobs, globalApplications, onBack }: { postedJobs: any[], globalApplications: any[], onBack: () => void }) {
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Total Applications Overview</h3>
        <button onClick={onBack} className="text-sm font-medium text-muted-foreground hover:text-foreground">← Back to Dashboard</button>
      </div>

      <div className="space-y-4">
        {postedJobs.map(job => {
          const apps = globalApplications.filter(a => a.jobId === job.id);
          const isExpanded = expandedJobId === job.id;

          return (
            <div key={job.id} className="bg-card border border-border rounded-xl overflow-hidden">
              <button 
                onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                className="w-full p-5 flex justify-between items-center bg-muted/10 hover:bg-muted/30 transition-colors text-left"
              >
                <div>
                  <h4 className="font-bold text-lg">{job.title}</h4>
                  <p className="text-sm text-muted-foreground">{apps.length} Total Applications</p>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
              </button>
              
              {isExpanded && (
                <div className="p-5 border-t border-border bg-muted/5 animate-in slide-in-from-top-2">
                  <CandidateList applications={apps} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function HiredView({ postedJobs, globalApplications, onBack }: { postedJobs: any[], globalApplications: any[], onBack: () => void }) {
  const hiredApps = globalApplications.filter(a => a.status === 'Hired');
  const hiredJobIds = new Set(hiredApps.map(a => a.jobId));
  const hiredJobs = postedJobs.filter(j => hiredJobIds.has(j.id));
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold">Hired Candidates</h3>
          <p className="text-sm text-muted-foreground">{hiredJobs.length} Jobs resulted in {hiredApps.length} hires</p>
        </div>
        <button onClick={onBack} className="text-sm font-medium text-muted-foreground hover:text-foreground">← Back to Dashboard</button>
      </div>

      <div className="space-y-4">
        {hiredJobs.length === 0 ? (
          <div className="text-center p-12 bg-muted/10 rounded-xl border border-dashed border-border">
            <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
            <p className="text-muted-foreground">No hires made yet.</p>
          </div>
        ) : (
          hiredJobs.map(job => {
            const apps = hiredApps.filter(a => a.jobId === job.id);
            const isExpanded = expandedJobId === job.id;

            return (
              <div key={job.id} className="bg-card border border-border rounded-xl overflow-hidden">
                <button 
                  onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                  className="w-full p-5 flex justify-between items-center bg-green-500/5 hover:bg-green-500/10 transition-colors text-left"
                >
                  <div>
                    <h4 className="font-bold text-lg text-green-600 dark:text-green-400">{job.title}</h4>
                    <p className="text-sm text-muted-foreground">{apps.length} Candidate{apps.length !== 1 && 's'} Hired</p>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </button>
                
                {isExpanded && (
                  <div className="p-5 border-t border-border bg-muted/5 animate-in slide-in-from-top-2">
                    <CandidateList applications={apps} isHiredView={true} />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export function AnalyticsView({ postedJobs, globalApplications, onBack }: { postedJobs: any[], globalApplications: any[], onBack: () => void }) {
  const totalJobs = postedJobs.length;
  const totalApps = globalApplications.length;
  const interviewed = globalApplications.filter(a => a.status === 'Interviewing' || a.status === 'Hired' || a.status === 'Rejected').length; // Anyone who reached interview phase
  const rejected = globalApplications.filter(a => a.status === 'Rejected').length;
  const hired = globalApplications.filter(a => a.status === 'Hired').length;

  const [activeMetric, setActiveMetric] = useState<'jobs' | 'applications' | 'interviewed' | 'rejected' | 'hired' | null>(null);
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  const getFilteredApps = (jobId: number, metric: string | null) => {
    if (!metric) return [];
    if (metric === 'applications') return globalApplications.filter(a => a.jobId === jobId);
    if (metric === 'interviewed') return globalApplications.filter(a => a.jobId === jobId && (a.status === 'Interviewing' || a.status === 'Hired' || a.status === 'Rejected'));
    if (metric === 'rejected') return globalApplications.filter(a => a.jobId === jobId && a.status === 'Rejected');
    if (metric === 'hired') return globalApplications.filter(a => a.jobId === jobId && a.status === 'Hired');
    return [];
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Recruitment Analytics Funnel</h3>
        <button onClick={onBack} className="text-sm font-medium text-muted-foreground hover:text-foreground">← Back to Dashboard</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <FunnelMetric label="Jobs Posted" value={totalJobs} color="bg-blue-500" onClick={() => setActiveMetric(activeMetric === 'jobs' ? null : 'jobs')} active={activeMetric === 'jobs'} />
        <FunnelMetric label="Applications" value={totalApps} color="bg-purple-500" onClick={() => setActiveMetric(activeMetric === 'applications' ? null : 'applications')} active={activeMetric === 'applications'} />
        <FunnelMetric label="Interviewed" value={interviewed} color="bg-amber-500" onClick={() => setActiveMetric(activeMetric === 'interviewed' ? null : 'interviewed')} active={activeMetric === 'interviewed'} />
        <FunnelMetric label="Rejected" value={rejected} color="bg-red-500" onClick={() => setActiveMetric(activeMetric === 'rejected' ? null : 'rejected')} active={activeMetric === 'rejected'} />
        <FunnelMetric label="Hired" value={hired} color="bg-green-500" onClick={() => setActiveMetric(activeMetric === 'hired' ? null : 'hired')} active={activeMetric === 'hired'} />
      </div>

      {!activeMetric ? (
        <div className="bg-card border border-border p-8 rounded-xl flex flex-col items-center justify-center relative min-h-[300px]">
          {/* Simple Funnel Visual */}
          <div className="w-full max-w-md flex flex-col items-center gap-2">
            <FunnelBar width="100%" label="Applications" count={totalApps} color="bg-purple-500" />
            <div className="w-0.5 h-6 bg-border"></div>
            <FunnelBar width="60%" label="Interviewed" count={interviewed} color="bg-amber-500" />
            <div className="w-0.5 h-6 bg-border"></div>
            <FunnelBar width="25%" label="Hired" count={hired} color="bg-green-500" />
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in">
          {postedJobs.map(job => {
            const apps = getFilteredApps(job.id, activeMetric);
            if (activeMetric !== 'jobs' && apps.length === 0) return null; // Don't show jobs with no matching candidates unless in 'jobs' view
            
            const isExpanded = expandedJobId === job.id;

            return (
              <div key={job.id} className="bg-card border border-border rounded-xl overflow-hidden">
                <button 
                  onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                  className="w-full p-5 flex justify-between items-center bg-muted/10 hover:bg-muted/30 transition-colors text-left"
                >
                  <div>
                    <h4 className="font-bold text-lg">{job.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {activeMetric === 'jobs' 
                        ? `${globalApplications.filter(a => a.jobId === job.id).length} Total Applications` 
                        : `${apps.length} Candidate${apps.length !== 1 ? 's' : ''} ${activeMetric}`}
                    </p>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </button>
                
                {isExpanded && (
                  <div className="p-5 border-t border-border bg-muted/5 animate-in slide-in-from-top-2">
                    {activeMetric === 'jobs' ? (
                      <div className="text-sm text-muted-foreground">
                        <p><strong>Location:</strong> {job.location}</p>
                        <p><strong>Type:</strong> {job.type || job.locationType}</p>
                        <p className="mt-2 text-xs opacity-70">Expand 'Applications' metric to see candidates.</p>
                      </div>
                    ) : (
                      <CandidateList applications={apps} isHiredView={activeMetric === 'hired'} />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Subcomponents

function StatusPill({ label, count, color, onClick, active }: { label: string, count: number, color: string, onClick: () => void, active: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 transition-all ${color} ${active ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105' : 'hover:scale-105'} cursor-pointer`}
    >
      <span>{label}</span>
      <span className="bg-background/50 px-1.5 rounded-full">{count}</span>
    </button>
  );
}

function CandidateList({ applications, isHiredView = false }: { applications: any[], isHiredView?: boolean }) {
  if (applications.length === 0) return <p className="text-muted-foreground text-sm">No candidates found.</p>;

  return (
    <div className="space-y-3">
      {applications.map(app => (
        <div key={app.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-card border border-border rounded-lg gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <img 
              src={app.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(app.user?.name || 'U')}&background=random`} 
              className="w-10 h-10 rounded-full object-cover" 
              alt=""
            />
            <div>
              <h5 className="font-bold text-sm">{app.user?.name}</h5>
              <p className="text-xs text-muted-foreground">{app.user?.title}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-center">
              <span className="block text-[10px] font-bold text-muted-foreground uppercase mb-0.5">Match Score</span>
              <span className="text-sm font-bold text-primary">{app.matchPercentage || 'N/A'}%</span>
            </div>
            
            {isHiredView && (
              <div className="text-center">
                <span className="block text-[10px] font-bold text-muted-foreground uppercase mb-0.5">Hire Date (Applied)</span>
                <span className="text-xs font-medium">{new Date(app.applied_at).toLocaleDateString()}</span>
              </div>
            )}
            
            <button className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 transition-colors rounded-md text-xs font-bold">
              View Profile
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function FunnelMetric({ label, value, color, onClick, active }: { label: string, value: number, color: string, onClick?: () => void, active?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`bg-card border ${active ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-border hover:border-primary/50 hover:scale-105'} transition-all rounded-xl p-4 w-full text-center flex flex-col items-center justify-center cursor-pointer`}
    >
      <div className={`w-8 h-8 rounded-full ${color} text-white flex items-center justify-center font-bold mb-2`}>
        {value}
      </div>
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</span>
    </button>
  );
}

function FunnelBar({ width, label, count, color }: { width: string, label: string, count: number, color: string }) {
  return (
    <div className="w-full flex flex-col items-center relative group">
      <div 
        className={`h-12 rounded-t-lg rounded-b-md ${color} flex items-center justify-center text-white font-bold transition-all group-hover:scale-[1.02]`}
        style={{ width }}
      >
        <span className="drop-shadow-md">{label}: {count}</span>
      </div>
    </div>
  );
}
