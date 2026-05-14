/**
 * Resume Quality Scoring System
 * Analyzes resume across 6 dimensions:
 * - Completeness (20%)
 * - Content Quality (25%)
 * - ATS Compatibility (20%)
 * - Relevance (15%)
 * - Professionalism (10%)
 * - Online Presence (10%)
 */

/**
 * Analyze resume quality and provide score + recommendations
 * @param {Object} parsedResume - Resume data parsed from file
 * @returns {Object} Comprehensive analysis with scores and recommendations
 */
export function analyzeResume(parsedResume) {
  try {
    if (!parsedResume) {
      return { overallScore: 0, breakdown: {}, strengths: [], weaknesses: [], recommendations: [] };
    }

    const scores = {
      completeness: scoreCompleteness(parsedResume),
      contentQuality: scoreContentQuality(parsedResume),
      atsCompatibility: scoreATSCompatibility(parsedResume),
      relevance: scoreRelevance(parsedResume),
      professionalism: scoreProfessionalism(parsedResume),
      onlinePresence: scoreOnlinePresence(parsedResume)
    };
    
    const weights = {
      completeness: 0.20,
      contentQuality: 0.25,
      atsCompatibility: 0.20,
      relevance: 0.15,
      professionalism: 0.10,
      onlinePresence: 0.10
    };
    
    // Calculate weighted overall score
    const overallScore = Object.keys(scores).reduce((sum, key) => {
      return sum + (scores[key] * weights[key]);
    }, 0);
    
    return {
      overallScore: Math.round(overallScore),
      breakdown: scores,
      scoreLevel: getScoreLevel(overallScore),
      strengths: getStrengths(parsedResume, scores),
      weaknesses: getWeaknesses(parsedResume, scores),
      recommendations: getRecommendations(parsedResume, scores),
      parseQuality: 0.9 // Default quality
    };
  } catch (error) {
    console.error('Resume analysis error:', error);
    return {
      overallScore: 50,
      breakdown: {},
      scoreLevel: 'Error',
      strengths: [],
      weaknesses: ['Unable to analyze resume'],
      recommendations: [],
      parseQuality: 0.5
    };
  }
}

/**
 * Score completeness: 20% weight
 * Checks presence of key sections: name, email, experience, education, skills, summary
 */
function scoreCompleteness(resume) {
  let score = 0;
  
  // Personal info (25 points)
  if (resume.personalInfo?.name) score += 10;
  if (resume.personalInfo?.email) score += 10;
  if (resume.personalInfo?.phone) score += 5;
  
  // Professional summary (15 points)
  if (resume.summary && resume.summary.length > 50) score += 15;
  else if (resume.summary) score += 8;
  
  // Experience (25 points)
  if (resume.experience?.length >= 3) score += 20;
  else if (resume.experience?.length === 2) score += 12;
  else if (resume.experience?.length === 1) score += 8;
  
  // Education (20 points)
  if (resume.education?.length > 0) score += 15;
  else if (resume.certifications?.length > 0) score += 8;
  
  // Skills (15 points)
  if (resume.skills?.length >= 10) score += 15;
  else if (resume.skills?.length >= 5) score += 10;
  else if (resume.skills?.length > 0) score += resume.skills.length * 1.5;
  
  return Math.min(score, 100);
}

/**
 * Score content quality: 25% weight
 * Evaluates description quality, quantifiable results, action verbs
 */
function scoreContentQuality(resume) {
  let score = 0;
  
  // Experience descriptions quality (40 points)
  if (resume.experience && resume.experience.length > 0) {
    const experienceQuality = resume.experience.reduce((acc, exp) => {
      let expScore = 0;
      
      // Achievement mentions
      if (hasAchievements(exp)) expScore += 15;
      
      // Quantifiable results
      if (hasQuantifiableResults(exp)) expScore += 15;
      
      // Action verbs
      if (hasActionVerbs(exp)) expScore += 10;
      
      return acc + Math.min(expScore, 40);
    }, 0) / resume.experience.length;
    
    score += Math.min(experienceQuality, 40);
  }
  
  // Achievements section (20 points)
  if (resume.achievements && resume.achievements.length > 0) {
    score += Math.min(resume.achievements.length * 5, 20);
  }
  
  // Technical specificity (20 points)
  const techKeywords = ['api', 'database', 'deployment', 'architecture', 'integration', 'optimization'];
  const resumeText = JSON.stringify(resume).toLowerCase();
  const techMentions = techKeywords.filter(kw => resumeText.includes(kw)).length;
  score += Math.min(techMentions * 3, 20);
  
  // Skills presentation (20 points)
  if (resume.skills && resume.skills.length >= 5) {
    score += 20;
  } else if (resume.skills && resume.skills.length > 0) {
    score += resume.skills.length * 3;
  }
  
  return Math.min(score, 100);
}

/**
 * Score ATS compatibility: 20% weight
 * Checks for ATS-friendly formatting
 */
function scoreATSCompatibility(resume) {
  let score = 90;
  
  // Deductions for ATS issues
  if (!resume.personalInfo?.email) score -= 15;
  if (!resume.personalInfo?.phone) score -= 10;
  if (!resume.experience || resume.experience.length === 0) score -= 15;
  if (!resume.skills || resume.skills.length === 0) score -= 10;
  
  // No special characters or formatting that confuses ATS
  const resumeText = JSON.stringify(resume);
  if (hasSpecialCharacters(resumeText)) score -= 10;
  
  // Has standard sections
  const hasStandardSections = 
    (resume.experience && resume.experience.length > 0) &&
    (resume.education && resume.education.length > 0 || resume.certifications?.length > 0) &&
    (resume.skills && resume.skills.length > 0);
  
  if (!hasStandardSections) score -= 15;
  
  return Math.max(score, 0);
}

/**
 * Score relevance: 15% weight
 * Checks for IT/tech skills alignment
 */
function scoreRelevance(resume) {
  const IT_SKILLS = [
    'python', 'javascript', 'typescript', 'java', 'golang', 'rust', 'c++', 'c#', 'ruby', 'php',
    'react', 'vue', 'angular', 'next.js', 'svelte', 'node.js', 'express', 'nestjs', 'django', 'fastapi',
    'aws', 'azure', 'gcp', 'kubernetes', 'docker', 'terraform', 'ansible',
    'postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch',
    'machine learning', 'tensorflow', 'pytorch', 'sklearn', 'nlp', 'data science',
    'api', 'rest', 'graphql', 'microservices', 'agile', 'devops', 'ci/cd'
  ];
  
  const resumeText = JSON.stringify(resume).toLowerCase();
  let relevantCount = 0;
  
  IT_SKILLS.forEach(skill => {
    if (resumeText.includes(skill)) {
      relevantCount++;
    }
  });
  
  // Score: (relevant skills / total tech skills) * 100
  return Math.min((relevantCount / 15) * 100, 100);
}

/**
 * Score professionalism: 10% weight
 * Checks for grammar, tone, and formatting
 */
function scoreProfessionalism(resume) {
  let score = 100;
  
  // Deductions for informal language
  const informalWords = ['gonna', 'wanna', 'kinda', 'basically', 'like', 'literally'];
  const resumeText = JSON.stringify(resume).toLowerCase();
  
  informalWords.forEach(word => {
    if (resumeText.includes(word)) {
      score -= 15;
    }
  });
  
  // Deductions for special characters
  if (hasSpecialCharacters(resumeText)) {
    score -= 10;
  }
  
  // Check for proper capitalization in company names
  if (resume.experience && resume.experience.length > 0) {
    const hasCapitalization = resume.experience.some(exp => 
      exp.company && exp.company[0] === exp.company[0].toUpperCase()
    );
    
    if (!hasCapitalization) score -= 5;
  }
  
  return Math.max(score, 0);
}

/**
 * Score online presence: 10% weight
 * GitHub, portfolio, LinkedIn links
 */
function scoreOnlinePresence(resume) {
  let score = 0;
  
  const urls = resume.personalInfo?.urls || {};
  
  if (urls.github) score += 40;
  if (urls.portfolio || urls.website) score += 35;
  if (urls.linkedin) score += 25;
  
  return Math.min(score, 100);
}

/**
 * Determine score level description
 */
function getScoreLevel(score) {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Fair';
  if (score >= 40) return 'Weak';
  return 'Poor';
}

/**
 * Extract key strengths from resume
 */
function getStrengths(resume, scores) {
  const strengths = [];
  
  if (scores.completeness > 80) {
    strengths.push('✓ Well-organized and complete resume structure');
  }
  
  if (scores.contentQuality > 80) {
    strengths.push('✓ Strong quantifiable achievements and metrics');
  }
  
  if (scores.atsCompatibility > 85) {
    strengths.push('✓ ATS-friendly format, easy for systems to parse');
  }
  
  if (scores.onlinePresence > 60) {
    strengths.push('✓ Good online presence (GitHub, Portfolio, LinkedIn)');
  }
  
  if (resume.skills && resume.skills.length > 15) {
    strengths.push('✓ Comprehensive skill set');
  }
  
  return strengths.slice(0, 3);
}

/**
 * Extract key weaknesses from resume
 */
function getWeaknesses(resume, scores) {
  const weaknesses = [];
  
  if (scores.completeness < 70) {
    weaknesses.push('⚠ Missing key sections or information');
  }
  
  if (scores.contentQuality < 70) {
    weaknesses.push('⚠ Weak descriptions - add more metrics and achievements');
  }
  
  if (scores.atsCompatibility < 75) {
    weaknesses.push('⚠ ATS compatibility issues - some systems may misread it');
  }
  
  if (scores.professionalism < 80) {
    weaknesses.push('⚠ Tone or formatting could be more professional');
  }
  
  if (!resume.personalInfo?.urls?.github && !resume.personalInfo?.urls?.portfolio) {
    weaknesses.push('⚠ No portfolio or GitHub link to showcase work');
  }
  
  return weaknesses.slice(0, 3);
}

/**
 * Generate actionable recommendations
 */
function getRecommendations(resume, scores) {
  const recommendations = [];
  
  // Priority 1: Critical issues
  if (scores.completeness < 75) {
    recommendations.push({
      priority: 1,
      category: 'Completeness',
      issue: 'Missing professional summary',
      suggestion: 'Add a 2-3 line professional summary highlighting key strengths',
      estimatedImpact: '+10 points'
    });
  }
  
  if (!resume.achievements || resume.achievements.length === 0) {
    recommendations.push({
      priority: 1,
      category: 'Content Quality',
      issue: 'No quantifiable achievements',
      suggestion: 'Add specific metrics to each job (e.g., "Increased performance by 40%")',
      estimatedImpact: '+15 points'
    });
  }
  
  // Priority 2: Important improvements
  if (!resume.personalInfo?.urls?.github) {
    recommendations.push({
      priority: 2,
      category: 'Online Presence',
      issue: 'No GitHub link',
      suggestion: 'Add your GitHub profile URL to showcase your code',
      estimatedImpact: '+40 points'
    });
  }
  
  if (scores.contentQuality < 75) {
    recommendations.push({
      priority: 2,
      category: 'Content Quality',
      issue: 'Weak action verbs',
      suggestion: 'Replace "Responsible for" with "Led", "Architected", "Developed"',
      estimatedImpact: '+8 points'
    });
  }
  
  // Priority 3: Nice to have
  if (!resume.personalInfo?.urls?.portfolio) {
    recommendations.push({
      priority: 3,
      category: 'Online Presence',
      issue: 'No portfolio website',
      suggestion: 'Create a portfolio site showcasing your best projects',
      estimatedImpact: '+35 points'
    });
  }
  
  if (resume.skills && resume.skills.length < 10) {
    recommendations.push({
      priority: 3,
      category: 'Completeness',
      issue: 'Limited skills listed',
      suggestion: 'Add 5-10 more relevant technical and soft skills',
      estimatedImpact: '+5 points'
    });
  }
  
  return recommendations.slice(0, 5);
}

/**
 * Helper functions
 */
function hasAchievements(experience) {
  const text = JSON.stringify(experience).toLowerCase();
  const keywords = ['achieved', 'accomplished', 'delivered', 'won', 'award', 'recognition', 'increased', 'improved'];
  return keywords.some(kw => text.includes(kw));
}

function hasQuantifiableResults(experience) {
  const text = JSON.stringify(experience).toLowerCase();
  return /\d+%|\$\d+|times faster|x increase|improved by|\d+ years/.test(text);
}

function hasActionVerbs(experience) {
  const text = JSON.stringify(experience).toLowerCase();
  const verbs = ['led', 'managed', 'developed', 'architected', 'designed', 'implemented', 'created', 'built', 'engineered', 'optimized'];
  return verbs.some(v => text.includes(v));
}

function hasSpecialCharacters(text) {
  // Check for unusual Unicode or special characters (excluding common punctuation)
  return /[^\x00-\x7F]|[<>{}[\]^`|\\]/.test(text);
}

export default {
  analyzeResume,
  analyzeResumeQuality: analyzeResume // Alias for clarity
};
