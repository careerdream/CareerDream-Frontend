import { useParams, Link } from 'react-router';
import { ChevronLeft, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { courses } from '../data/courses';

export function CertificatePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useApp();
  
  const isSample = courseId === 'sample';
  const course = isSample ? null : (courses.find(c => c.id.toString() === courseId) || courses[0]);
  
  const recipientName = isSample ? "Recipient Name" : (user?.name || 'Jane Doe');
  const courseTitle = isSample ? "Course Title" : (course?.title || 'React.js');
  
  const date = isSample ? '[DATE]' : new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-900 print:bg-white print:block flex flex-col items-center justify-center p-4 md:p-8 print:p-0 font-sans">
      {/* Controls (Hidden on Print) */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-6 print:hidden">
        <Link to="/assessments" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" /> Back to Assessments
        </Link>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#D4AF37] text-gray-900 rounded-xl font-bold shadow-lg hover:shadow-[#D4AF37]/20 hover:-translate-y-0.5 transition-all"
        >
          <Download className="w-5 h-5" /> Export PDF / Print
        </button>
      </div>

      {/* Certificate Container - White & Gold Theme matching reference */}
      <div className="print-cert relative w-full md:w-[120vh] max-w-full lg:max-w-5xl bg-white aspect-[1.414/1] shadow-2xl overflow-hidden">
        
        {/* Background Waves (Website Theme Inspired) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.20]">
           <svg width="100%" height="100%" viewBox="0 0 1000 700" preserveAspectRatio="none">
             <path d="M0,700 Q150,500 300,700 T700,700 T1000,500 L1000,700 Z" fill="url(#theme-grad-1)"/>
             <path d="M0,700 Q200,600 400,500 T900,400 T1000,200 L1000,700 L0,700 Z" fill="url(#theme-grad-2)"/>
             <path d="M0,0 Q300,100 500,0 T1000,100 L1000,0 Z" fill="url(#theme-grad-1)"/>
             
             <defs>
               <linearGradient id="theme-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
                 <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.2" />
               </linearGradient>
               <linearGradient id="theme-grad-2" x1="100%" y1="100%" x2="0%" y2="0%">
                 <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6" />
                 <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
               </linearGradient>
             </defs>
           </svg>
        </div>

        {/* Floating Icons Watermark */}
        <div className="absolute top-2/3 left-2 md:left-8 -translate-y-1/2 opacity-[0.15] pointer-events-none z-0">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-[1.5rem] md:rounded-[2.5rem] bg-accent -rotate-12 flex items-center justify-center text-3xl md:text-5xl text-white shadow-xl">💎</div>
        </div>
        <div className="absolute top-1/3 right-12 md:right-24 -translate-y-1/2 opacity-[0.15] pointer-events-none z-0">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-[1.5rem] md:rounded-[2rem] bg-primary rotate-12 flex items-center justify-center text-2xl md:text-4xl text-white shadow-xl">🚀</div>
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col items-center py-10 md:py-16 px-12 md:px-24 z-10">
          
          {/* Logo (Top Center) */}
          <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
             <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
               <span className="text-white font-bold text-lg md:text-xl">CD</span>
             </div>
             <span className="font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#333333]">CareerDream</span>
          </div>

          {/* Header */}
          <div className="w-full text-center">
            <h1 className="text-3xl md:text-5xl lg:text-[60px] tracking-[0.15em] text-[#333333] uppercase font-bold mb-1 md:mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Certificate
            </h1>
            <h2 className="text-sm md:text-lg lg:text-xl font-extrabold tracking-[0.4em] text-[#333333] uppercase">
              Of Completion
            </h2>
          </div>

          {/* Presented To */}
          <div className="text-center mt-6 md:mt-12">
            <p className="text-[#555555] italic text-sm md:text-lg mb-6 md:mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              This Certificate is given to :
            </p>
            
            {/* Recipient Name (Handwriting Font) */}
            <div className="relative inline-block w-full max-w-2xl">
              <h2 className="text-3xl md:text-5xl lg:text-[60px] text-[#222222] font-normal italic px-8 pb-2" style={{ fontFamily: '"Great Vibes", cursive' }}>
                {recipientName}
              </h2>
              {/* Line under name */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#999999]" />
            </div>
            
            {/* Reason */}
            <p className="text-[#777777] italic mt-6 md:mt-8 text-xs md:text-base lg:text-lg max-w-3xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
              for successfully completing the rigorous requirements and demonstrating exceptional theoretical and practical expertise in
            </p>

            {/* Course Title */}
            <h3 className="text-xl md:text-3xl lg:text-4xl text-[#333333] font-bold mt-3 md:mt-6 uppercase tracking-[0.15em]" style={{ fontFamily: 'Georgia, serif' }}>
              {courseTitle}
            </h3>
          </div>

          {/* Bottom Footer Section */}
          <div className="w-full flex-1 flex items-end justify-between relative z-20 mt-12 md:mt-16 pb-4 md:pb-8">
            
            {/* Left Signature (CEO) */}
            <div className="text-center flex flex-col items-center w-32 md:w-48">
               <div className="w-full h-[1px] bg-[#999999] mb-2 md:mb-3" />
               <p className="text-[9px] md:text-xs text-[#555555] font-semibold uppercase tracking-widest">CEO</p>
            </div>

            {/* Center Issued Date */}
            <div className="text-center flex flex-col items-center justify-end pb-1">
               <p className="text-[9px] md:text-xs text-[#777777] font-semibold uppercase tracking-widest mb-1">Date of Issue</p>
               <p className="text-xs md:text-base text-[#333333] font-bold" style={{ fontFamily: 'Georgia, serif' }}>{date}</p>
            </div>

            {/* Right Signature (Vice President) */}
            <div className="text-center flex flex-col items-center w-32 md:w-48">
               <div className="w-full h-[1px] bg-[#999999] mb-2 md:mb-3" />
               <p className="text-[9px] md:text-xs text-[#555555] font-semibold uppercase tracking-widest">Vice President</p>
            </div>

          </div>
        </div>
      </div>
      
      {/* Global Styles (Google Fonts + Print) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        
        @media print {
          @page { size: A4 landscape; margin: 0; }
          html, body { 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            background: white !important; 
            margin: 0 !important;
            padding: 0 !important;
            width: 100%;
            height: 100%;
            overflow: hidden !important;
          }
          #root { 
            background: white !important; 
            width: 100%;
            height: 100%;
            overflow: hidden !important;
          }
          .print-cert {
            width: 100vw !important;
            height: 100vh !important;
            max-width: none !important;
            max-height: none !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            aspect-ratio: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
