import { Link, useNavigate } from 'react-router';
import { Trophy, Download, AlertCircle, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { assessments } from '../data/assessments';
import { toast } from 'sonner';

export function CertificatesPage() {
  const { testResults, user } = useApp();
  const navigate = useNavigate();

  // Only consider tests passed if score is >= 70%
  const completedAssessments = testResults
    .filter(r => r.score >= 70)
    .map(result => {
      const assessmentData = assessments.find(a => a.id === result.assessmentId);
      return {
        ...result,
        assessmentData
      };
    });

  const handleDownload = (assessmentId: number) => {
    // In a real app, this might generate a PDF on the fly or download an image.
    // Here we navigate to the standalone certificate page which they can print/save.
    toast.success('Certificate ready! Generating high-resolution preview...', {
      description: 'You can save it as PDF or Print it from the next screen.',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />
    });
    
    // Simulate a slight delay for "generation"
    setTimeout(() => {
      navigate(`/certificate/${assessmentId}`);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-screen">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">My Certificates</h1>
          <p className="text-muted-foreground mt-1 font-medium">Manage and download your verified achievements.</p>
        </div>
      </div>

      {completedAssessments.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-3xl bg-card shadow-sm">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-10 h-10 text-muted-foreground opacity-50" />
          </div>
          <h2 className="text-2xl font-bold mb-3">No Certificates Yet</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Complete the assessments to unlock your certificates. Prove your skills and earn verified credentials to stand out to employers.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              to="/assessments" 
              className="flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              Start an Assessment Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedAssessments.map((item, index) => (
            <div key={index} className="flex flex-col rounded-3xl border border-border bg-card hover:border-primary/50 hover:shadow-xl transition-all overflow-hidden group">
              {/* Header/Logo section */}
              <div className="h-32 bg-gradient-to-br from-primary/10 to-accent/10 relative p-6 flex items-start justify-between">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl">
                  {item.assessmentData?.badge || '🏆'}
                </div>
                <div className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-bold text-green-600 flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                  {user?.name || 'Student'}
                </p>
                <h3 className="text-xl font-bold mb-2 line-clamp-2">
                  {item.title}
                </h3>
                
                <div className="mt-auto pt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Score</span>
                    <span className="font-bold text-green-500">{item.score}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-medium text-foreground">{item.date}</span>
                  </div>
                  
                  <button 
                    onClick={() => handleDownload(item.assessmentId)}
                    className="w-full flex items-center justify-center gap-2 mt-4 py-3 bg-muted hover:bg-primary hover:text-white text-foreground rounded-xl font-bold transition-colors group-hover:bg-primary group-hover:text-white"
                  >
                    <Download className="w-4 h-4" /> Download HD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
