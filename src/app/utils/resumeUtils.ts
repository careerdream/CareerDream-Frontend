// Client-side TF-IDF style resume matching utilities

const IT_SKILLS = [
  'Python', 'JavaScript', 'TypeScript', 'Java', 'Go', 'Rust', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin',
  'React', 'Vue', 'Angular', 'Next.js', 'Svelte', 'Node.js', 'Express', 'NestJS', 'Django', 'FastAPI', 'Flask',
  'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'Hugging Face', 'LangChain', 'OpenCV',
  'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Reinforcement Learning', 'MLOps',
  'AWS', 'Azure', 'GCP', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'Ansible', 'Helm',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'DynamoDB', 'Snowflake', 'Elasticsearch',
  'Apache Spark', 'Kafka', 'Airflow', 'dbt', 'Hadoop', 'Hive', 'Flink',
  'CI/CD', 'Jenkins', 'GitHub Actions', 'GitLab CI', 'ArgoCD', 'Git',
  'SQL', 'NoSQL', 'GraphQL', 'REST', 'gRPC', 'Microservices',
  'Linux', 'Bash', 'PowerShell', 'Shell Scripting',
  'Penetration Testing', 'SIEM', 'Cybersecurity', 'Network Security', 'Firewall', 'OWASP',
  'Agile', 'Scrum', 'Kanban', 'JIRA', 'Confluence',
  'Data Science', 'Data Engineering', 'Data Analysis', 'Tableau', 'Power BI', 'Matplotlib',
  'React Native', 'Flutter', 'iOS', 'Android', 'SwiftUI', 'UIKit',
  'HTML', 'CSS', 'Tailwind CSS', 'SASS', 'Bootstrap',
  'Statistics', 'Mathematics', 'Pandas', 'NumPy', 'R',
  'Leadership', 'Project Management', 'Communication', 'Mentoring', 'Problem Solving',
  'Teamwork', 'Critical Thinking', 'Adaptability', 'Time Management', 'Conflict Resolution',
  'PMP', 'PRINCE2', 'CISSP', 'CEH', 'OSCP', 'AWS Certified',
];

export interface ResumeDetails {
  skills: string[];
  education: string[];
  experience: string[];
  achievements: string[];
  summary: string;
}

export function extractSkillsFromText(text: string): string[] {
  const normalized = text.toLowerCase();
  return IT_SKILLS.filter(skill => 
    normalized.includes(skill.toLowerCase())
  );
}

export function parseResumeDetails(text: string): ResumeDetails {
  const lines = text.split('\n');
  const details: ResumeDetails = {
    skills: extractSkillsFromText(text),
    education: [],
    experience: [],
    achievements: [],
    summary: '',
  };

  let currentSection = '';

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase().includes('education:')) {
      details.education.push(trimmed.replace(/education:/i, '').trim());
      currentSection = 'education';
    } else if (trimmed.toLowerCase().includes('experience:')) {
      details.experience.push(trimmed.replace(/experience:/i, '').trim());
      currentSection = 'experience';
    } else if (trimmed.toLowerCase().includes('projects:') || trimmed.toLowerCase().includes('achievements:')) {
      details.achievements.push(trimmed.replace(/(projects|achievements):/i, '').trim());
      currentSection = 'achievements';
    } else if (trimmed.toLowerCase().includes('summary:') || (currentSection === '' && trimmed.length > 50)) {
      if (trimmed.toLowerCase().includes('summary:')) {
        details.summary = trimmed.replace(/summary:/i, '').trim();
      } else if (!details.summary) {
        details.summary = trimmed;
      }
      currentSection = 'summary';
    } else if (currentSection === 'education' && details.education.length > 0) {
      // Potentially append more lines or handle multi-line
    }
  });

  // Fallback summary if none found
  if (!details.summary && lines.length > 0) {
    details.summary = lines[0].trim();
  }

  return details;
}

export function computeMatchScore(resumeSkills: string[], jobSkills: string[]): number {
  if (!resumeSkills.length || !jobSkills.length) return 0;
  const resumeSet = new Set(resumeSkills.map(s => s.toLowerCase()));
  const matched = jobSkills.filter(s => resumeSet.has(s.toLowerCase()));
  return Math.round((matched.length / jobSkills.length) * 100);
}

export function getMissingSkills(resumeSkills: string[], jobSkills: string[]): string[] {
  const resumeSet = new Set(resumeSkills.map(s => s.toLowerCase()));
  return jobSkills.filter(s => !resumeSet.has(s.toLowerCase()));
}

export interface MatchedJob {
  jobId: number;
  title: string;
  company: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export function matchJobsToResume(resumeSkills: string[], jobs: Array<{id: number; title: string; company: string; skills: string[]}>): MatchedJob[] {
  return jobs
    .map(job => {
      const score = computeMatchScore(resumeSkills, job.skills);
      const resumeSet = new Set(resumeSkills.map(s => s.toLowerCase()));
      return {
        jobId: job.id,
        title: job.title,
        company: job.company,
        matchScore: score,
        matchedSkills: job.skills.filter(s => resumeSet.has(s.toLowerCase())),
        missingSkills: getMissingSkills(resumeSkills, job.skills),
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

// Simulated resume text parsing — extracts text from a File
export async function simulateResumeParse(file: File): Promise<string> {
  // In a real app, we'd send this to a backend PDF/DOCX parser
  // Here we simulate parsing delay and return a template with random skills
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate extracting text based on file name hints
  const randomSkills = shuffleArray([...IT_SKILLS]).slice(0, 8 + Math.floor(Math.random() * 6));
  const fileName = file.name.toLowerCase();
  
  let role = "Software Engineer";
  if (fileName.includes("data")) role = "Data Scientist";
  else if (fileName.includes("devops")) role = "DevOps Engineer";
  else if (fileName.includes("frontend")) role = "Frontend Developer";

  return `
Summary: Experienced ${role} with a strong background in ${randomSkills[0]} and ${randomSkills[1]}.
Skills: ${randomSkills.join(', ')}, REST API, GitHub, Agile
Experience: 4 years of experience in developing scalable applications. Worked at TechFlow and CloudLink.
Education: Bachelor of Science in Computer Science from Global University.
Achievements: Optimized database performance by 40%. Led a team of 5 developers for a major project launch.
  `;
}

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function getCareerInsights(skills: string[]): { category: string; level: string; icon: string }[] {
  const categoryMap: Record<string, { icon: string; keywords: string[] }> = {
    'AI/ML Engineer': { icon: '🤖', keywords: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'Scikit-learn'] },
    'Full Stack Developer': { icon: '💻', keywords: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'REST'] },
    'Cloud Architect': { icon: '☁️', keywords: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform', 'Docker'] },
    'Data Engineer': { icon: '📊', keywords: ['Apache Spark', 'Kafka', 'Airflow', 'dbt', 'SQL', 'Python'] },
    'DevOps Engineer': { icon: '⚙️', keywords: ['CI/CD', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Linux'] },
    'Cybersecurity Analyst': { icon: '🔒', keywords: ['Penetration Testing', 'SIEM', 'OWASP', 'Network Security', 'Firewall'] },
  };

  const skillSet = new Set(skills.map(s => s.toLowerCase()));
  return Object.entries(categoryMap)
    .map(([category, { icon, keywords }]) => {
      const matched = keywords.filter(k => skillSet.has(k.toLowerCase())).length;
      const pct = (matched / keywords.length) * 100;
      return {
        category,
        icon,
        level: pct >= 70 ? 'Expert' : pct >= 40 ? 'Intermediate' : pct >= 20 ? 'Beginner' : 'Learning',
        score: pct,
      };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ category, icon, level }) => ({ category, level, icon }));
}
