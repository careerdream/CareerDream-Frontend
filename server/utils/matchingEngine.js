/**
 * Advanced Multi-Factor Job Matching Engine
 * Calculates comprehensive match scores using:
 * - Skill matching (40%)
 * - Experience level (25%)
 * - Location (15%)
 * - Education (10%)
 * - Salary expectations (10%)
 */

/**
 * Calculate comprehensive job match score
 * @param {Object} userProfile - User profile with skills, experience, location, etc.
 * @param {Object} job - Job object with skills, requirements, experience, location, salary
 * @returns {Object} Match score breakdown and details
 */
export function calculateMatchScore(userProfile, job) {
  try {
    const userSkills = new Set((userProfile.skills || []).map(s => s.toLowerCase()));
    const jobSkills = new Set((job.skills || []).map(s => s.toLowerCase()));
    
    // Calculate individual scores
    const skillScore = calculateSkillMatch(userSkills, jobSkills);
    const experienceScore = calculateExperienceMatch(userProfile, job);
    const locationScore = calculateLocationMatch(userProfile, job);
    const educationScore = calculateEducationMatch(userProfile, job);
    const salaryScore = calculateSalaryMatch(userProfile, job);
    
    // Calculate weighted total (0-100)
    const baseScore = (
      skillScore * 0.40 +
      experienceScore * 0.25 +
      locationScore * 0.15 +
      educationScore * 0.10 +
      salaryScore * 0.10
    );
    
    // Add bonuses
    let bonusPoints = 0;
    
    // Tech stack bonus (trending skills)
    if (hasTrendingTechStack(userSkills)) {
      bonusPoints += 5;
    }
    
    // Remote work bonus if job is remote
    if (job.type === 'Remote') {
      bonusPoints += 2;
    }
    
    // Perfect match bonus
    if (skillScore >= 90 && experienceScore >= 80) {
      bonusPoints += 3;
    }
    
    const finalScore = Math.min(baseScore + bonusPoints, 115);
    
    return {
      matchScore: Math.round(finalScore),
      breakdown: {
        skillScore: Math.round(skillScore),
        experienceScore: Math.round(experienceScore),
        locationScore: Math.round(locationScore),
        educationScore: Math.round(educationScore),
        salaryScore: Math.round(salaryScore)
      },
      bonusPoints,
      matchedSkills: Array.from(userSkills).filter(s => jobSkills.has(s)),
      missingSkills: Array.from(jobSkills).filter(s => !userSkills.has(s)),
      matchConfidence: Math.round(baseScore) >= 70 ? 'High' : (Math.round(baseScore) >= 50 ? 'Medium' : 'Low'),
      recommendation: getRecommendation(Math.round(finalScore))
    };
  } catch (error) {
    console.error('Error calculating match score:', error);
    return {
      matchScore: 0,
      breakdown: { skillScore: 0, experienceScore: 0, locationScore: 0, educationScore: 0, salaryScore: 0 },
      bonusPoints: 0,
      matchedSkills: [],
      missingSkills: [],
      matchConfidence: 'Low',
      recommendation: 'Unable to calculate match'
    };
  }
}

/**
 * Calculate skill match score (40% weight)
 * Considers exact matches and similar skills
 */
function calculateSkillMatch(userSkills, jobSkills) {
  if (userSkills.size === 0 || jobSkills.size === 0) return 0;
  
  // Count exact matches
  const exactMatches = Array.from(userSkills).filter(s => jobSkills.has(s)).length;
  
  // Count partial/similar matches
  const partialMatches = findSimilarSkills(userSkills, jobSkills);
  
  // Score: (exact + partial*0.5) / total required skills * 100
  const score = ((exactMatches + partialMatches * 0.5) / jobSkills.size) * 100;
  return Math.min(score, 100);
}

/**
 * Find similar/related skills
 * e.g., Python matches with Django, Flask, etc.
 */
function findSimilarSkills(userSkills, jobSkills) {
  const similarityMap = {
    'python': ['django', 'flask', 'fastapi', 'scipy', 'numpy'],
    'react': ['vue', 'angular', 'svelte', 'next.js', 'gatsby'],
    'node.js': ['express', 'nestjs', 'fastify', 'koa', 'hapi'],
    'javascript': ['typescript', 'node', 'react', 'vue', 'angular'],
    'aws': ['azure', 'gcp', 'google cloud', 'docker', 'kubernetes'],
    'docker': ['kubernetes', 'container', 'helm', 'podman'],
    'kubernetes': ['docker', 'container', 'helm', 'openshift'],
    'sql': ['mysql', 'postgresql', 'sqlite', 'nosql', 'mongodb'],
    'mongodb': ['mongoose', 'firebase', 'dynamodb'],
    'typescript': ['javascript', 'node.js', 'react'],
    'java': ['spring', 'maven', 'gradle', 'kotlin'],
    'golang': ['rust', 'c++', 'c#'],
    'machine learning': ['tensorflow', 'pytorch', 'scikit-learn', 'keras', 'nlp', 'deep learning'],
    'tensorflow': ['pytorch', 'keras', 'machine learning', 'deep learning'],
    'pytorch': ['tensorflow', 'keras', 'machine learning', 'deep learning']
  };
  
  let similarCount = 0;
  
  for (const userSkill of userSkills) {
    const userSkillLower = userSkill.toLowerCase();
    const similarSkills = similarityMap[userSkillLower] || [];
    
    if (similarSkills.some(s => jobSkills.has(s))) {
      similarCount++;
    }
  }
  
  return similarCount;
}

/**
 * Calculate experience match score (25% weight)
 */
function calculateExperienceMatch(userProfile, job) {
  try {
    const userYOE = userProfile.yearsOfExperience || 0;
    const jobExperienceText = job.experience || '';
    
    // Parse required years from job description
    const requiredYOE = parseExperienceLevel(jobExperienceText);
    
    if (userYOE >= requiredYOE) {
      // User has enough or more experience
      const excessYears = userYOE - requiredYOE;
      // Score increases with more experience, capped at 100
      return Math.min(100, 50 + excessYears * 10);
    } else {
      // User lacks experience
      const gapYears = requiredYOE - userYOE;
      const reduction = gapYears * 20; // 20% per missing year
      return Math.max(50 - reduction, 0);
    }
  } catch (error) {
    return 50; // Default score if unable to parse
  }
}

/**
 * Calculate location match score (15% weight)
 */
function calculateLocationMatch(userProfile, job) {
  try {
    // Remote jobs are always 100% match
    if (job.type && job.type.toLowerCase() === 'remote') {
      return 100;
    }
    
    const userLocation = userProfile.location || '';
    const jobLocation = job.location || '';
    
    if (!userLocation || !jobLocation) {
      return 50; // Unknown - neutral score
    }
    
    // Same city = 100
    const userCity = userLocation.split(',')[0].toLowerCase();
    const jobCity = jobLocation.split(',')[0].toLowerCase();
    
    if (userCity === jobCity) {
      return 100;
    }
    
    // Same state/region = 60
    const userState = userLocation.split(',')[1]?.trim().toLowerCase();
    const jobState = jobLocation.split(',')[1]?.trim().toLowerCase();
    
    if (userState && jobState && userState === jobState) {
      return 60;
    }
    
    // Different location but willingness to relocate = 40
    return 40;
  } catch (error) {
    return 50;
  }
}

/**
 * Calculate education match score (10% weight)
 */
function calculateEducationMatch(userProfile, job) {
  try {
    const education = userProfile.education || {};
    const certifications = userProfile.certifications || [];
    
    // Has bachelor's or higher degree
    if (education.degree) {
      const degreeLower = education.degree.toLowerCase();
      if (degreeLower.includes('master') || degreeLower.includes('phd')) {
        return 100;
      }
      if (degreeLower.includes('bachelor')) {
        return 90;
      }
      if (degreeLower.includes('diploma') || degreeLower.includes('associate')) {
        return 60;
      }
    }
    
    // Alternative: multiple certifications (bootcamp equivalent)
    if (certifications.length >= 3) {
      return 75;
    }
    
    if (certifications.length >= 1) {
      return 50;
    }
    
    // No formal education mentioned
    return 40;
  } catch (error) {
    return 50;
  }
}

/**
 * Calculate salary match score (10% weight)
 */
function calculateSalaryMatch(userProfile, job) {
  try {
    const userExpectation = userProfile.salaryExpectation || 0;
    const jobSalary = job.salary || '';
    
    // If no salary info, neutral
    if (userExpectation === 0 || !jobSalary) {
      return 70;
    }
    
    // Parse job salary
    const salaryRange = parseSalaryRange(jobSalary);
    
    if (!salaryRange) {
      return 70; // Can't parse
    }
    
    const { min, max } = salaryRange;
    
    // Perfect match: user expectation within range
    if (userExpectation >= min && userExpectation <= max) {
      return 100;
    }
    
    // User asking less than minimum (great for employer)
    if (userExpectation < min) {
      return 85;
    }
    
    // User asking more than maximum
    const overage = userExpectation - max;
    const reduction = Math.min((overage / (max * 0.1)) * 30, 50);
    return Math.max(70 - reduction, 0);
  } catch (error) {
    return 70;
  }
}

/**
 * Parse experience level from job description
 * e.g., "3-5 years" -> 3, "5+ years" -> 5
 */
function parseExperienceLevel(experienceText) {
  if (!experienceText) return 0;
  
  const match = experienceText.match(/(\d+)/);
  return match ? parseInt(match[0]) : 0;
}

/**
 * Parse salary range from job salary field
 * Handles formats like "₹50-70 LPA", "$100k-150k", etc.
 */
function parseSalaryRange(salaryText) {
  if (!salaryText) return null;
  
  try {
    // Extract numbers
    const numbers = salaryText.match(/\d+/g);
    
    if (!numbers || numbers.length < 2) {
      return null;
    }
    
    let min = parseInt(numbers[0]);
    let max = parseInt(numbers[numbers.length - 1]);
    
    // Handle LPA (Lakhs Per Annum) - convert to base
    if (salaryText.toLowerCase().includes('lpa')) {
      min = min * 100000;
      max = max * 100000;
    }
    // Handle K suffix
    else if (salaryText.toLowerCase().includes('k')) {
      min = min * 1000;
      max = max * 1000;
    }
    
    return { min, max };
  } catch (error) {
    return null;
  }
}

/**
 * Check if user has trending tech stack
 */
function hasTrendingTechStack(userSkills) {
  const trendingSkills = [
    'kubernetes', 'graphql', 'typescript', 'rust', 'golang',
    'nextjs', 'fastapi', 'pytorch', 'terraform', 'docker'
  ];
  
  return trendingSkills.some(skill => userSkills.has(skill));
}

/**
 * Get recommendation based on match score
 */
function getRecommendation(score) {
  if (score >= 90) return '⭐⭐⭐⭐⭐ Perfect Match - Apply Immediately!';
  if (score >= 75) return '⭐⭐⭐⭐ Excellent Match - High Priority';
  if (score >= 60) return '⭐⭐⭐ Good Match - Consider Applying';
  if (score >= 50) return '⭐⭐ Fair Match - Requires Skill Development';
  return '⭐ Not Recommended - Major Skill Gaps';
}

export default {
  calculateMatchScore,
  calculateSkillMatch
};
