/**
 * Skill Gap Analysis & Learning Path Recommender
 * Analyzes missing skills for specific job and recommends courses from existing platform
 */

/**
 * Analyze skill gaps and recommend courses
 * @param {Object} resumeData - Parsed resume data
 * @param {Object} job - Job object
 * @param {Array} allCourses - All available courses in platform
 * @returns {Object} Gap analysis with recommended learning path
 */
export function analyzeSkillGaps(resumeData, job, allCourses = []) {
  try {
    const userSkills = new Set((resumeData.skills || []).map(s => s.toLowerCase()));
    const jobSkills = new Set((job.skills || []).map(s => s.toLowerCase()));
    
    // Identify missing skills
    const missingSkills = Array.from(jobSkills).filter(s => !userSkills.has(s));
    const matchedSkills = Array.from(jobSkills).filter(s => userSkills.has(s));
    
    // Categorize missing skills
    const criticalSkills = missingSkills.slice(0, 3); // Top 3 priority
    const niceToHaveSkills = missingSkills.slice(3); // Rest
    
    // Get recommended courses
    const recommendedCourses = getCoursesForSkills(criticalSkills, allCourses);
    
    // Calculate learning timeline
    const totalLearningHours = recommendedCourses.reduce((sum, c) => {
      const hours = parseCourseDuration(c.duration) || 30;
      return sum + hours;
    }, 0);
    
    const estimatedWeeks = Math.ceil(totalLearningHours / 15); // Assuming 15 hours/week
    
    return {
      matchedSkills,
      missingSkills: {
        critical: criticalSkills,
        niceToHave: niceToHaveSkills
      },
      skillGapPercentage: Math.round((matchedSkills.length / (matchedSkills.length + missingSkills.length)) * 100) || 0,
      recommendedCourses: recommendedCourses,
      learningPath: {
        estimatedWeeks,
        estimatedHours: totalLearningHours,
        sequencedCourses: recommendedCourses.map((c, i) => ({
          sequence: i + 1,
          courseId: c.id,
          title: c.title,
          skills: c.skills.filter(s => 
            criticalSkills.some(cs => s.toLowerCase().includes(cs.toLowerCase()))
          ),
          duration: c.duration,
          level: c.level
        }))
      },
      skillGapScore: calculateGapScore(matchedSkills, missingSkills),
      roadmap: generateLearningRoadmap(criticalSkills, recommendedCourses)
    };
  } catch (error) {
    console.error('Skill gap analysis error:', error);
    return {
      matchedSkills: [],
      missingSkills: { critical: [], niceToHave: [] },
      skillGapPercentage: 0,
      recommendedCourses: [],
      learningPath: { estimatedWeeks: 0, estimatedHours: 0, sequencedCourses: [] },
      skillGapScore: 0,
      roadmap: []
    };
  }
}

/**
 * Find courses that cover missing skills
 * @param {Array} skills - Skills to find courses for
 * @param {Array} courses - All available courses
 * @returns {Array} Matched courses sorted by relevance
 */
function getCoursesForSkills(skills, courses) {
  if (!skills || skills.length === 0 || !courses || courses.length === 0) {
    return [];
  }
  
  // Score each course based on skill match
  const scoredCourses = courses
    .map(course => {
      const courseSkills = (course.skills || []).map(s => s.toLowerCase());
      
      // Count how many missing skills this course covers
      const skillsMatched = skills.filter(skill => 
        courseSkills.some(cs => cs.includes(skill) || skill.includes(cs))
      ).length;
      
      const relevanceScore = skillsMatched > 0 ? skillsMatched * 10 : 0;
      
      return {
        ...course,
        relevanceScore,
        skillsMatched
      };
    })
    .filter(c => c.relevanceScore > 0) // Only courses that match
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 5); // Top 5 courses
  
  return scoredCourses;
}

/**
 * Calculate skill gap score (0-100)
 * 100 = all skills matched, 0 = no skills matched
 */
function calculateGapScore(matched, missing) {
  const total = matched.length + missing.length;
  if (total === 0) return 100;
  
  return Math.round((matched.length / total) * 100);
}

/**
 * Generate sequential learning roadmap
 */
function generateLearningRoadmap(skills, courses) {
  const roadmap = [];
  
  // Prerequisite mapping
  const prerequisites = {
    'kubernetes': ['docker', 'linux'],
    'graphql': ['javascript', 'rest'],
    'machine learning': ['python', 'mathematics'],
    'terraform': ['cloud', 'devops'],
    'react': ['javascript', 'html', 'css'],
    'docker': ['linux', 'devops'],
    'fastapi': ['python'],
    'django': ['python'],
    'kubernetes': ['docker'],
    'typescript': ['javascript'],
    'pytorch': ['python', 'machine learning'],
    'tensorflow': ['python', 'machine learning']
  };
  
  let weekCounter = 1;
  
  skills.forEach((skill, index) => {
    const prereqs = prerequisites[skill.toLowerCase()] || [];
    const foundCourse = courses.find(c => 
      c.skills?.some(s => s.toLowerCase().includes(skill.toLowerCase()))
    );
    
    if (foundCourse) {
      roadmap.push({
        phase: index + 1,
        week: weekCounter,
        skill: skill,
        course: {
          id: foundCourse.id,
          title: foundCourse.title,
          level: foundCourse.level,
          duration: foundCourse.duration
        },
        prerequisites: prereqs,
        estimatedCompletion: `Week ${weekCounter + Math.ceil(parseCourseDuration(foundCourse.duration) / 15)}`
      });
      
      weekCounter += Math.ceil(parseCourseDuration(foundCourse.duration) / 15);
    }
  });
  
  return roadmap;
}

/**
 * Parse course duration to hours
 * Handles formats like "4 weeks", "30 hours", "8 weeks"
 */
function parseCourseDuration(duration) {
  if (!duration) return 30; // Default 30 hours
  
  const durationLower = duration.toLowerCase();
  
  // Parse numbers
  const match = durationLower.match(/(\d+)/);
  const number = match ? parseInt(match[0]) : 0;
  
  // If it's weeks, multiply by ~7.5 hours per week
  if (durationLower.includes('week')) {
    return number * 7.5;
  }
  
  // If it's hours, use directly
  if (durationLower.includes('hour')) {
    return number;
  }
  
  // If it's months, multiply by 30 hours per month
  if (durationLower.includes('month')) {
    return number * 30;
  }
  
  return 30; // Default
}

/**
 * Get salary impact of specific skill
 * Estimates salary increase potential
 */
export function getSkillSalaryImpact(skill) {
  const salaryImpactMap = {
    'kubernetes': { impact: 18000, frequency: 45, trend: 'Very High' },
    'graphql': { impact: 8000, frequency: 32, trend: 'High' },
    'docker': { impact: 5000, frequency: 67, trend: 'High' },
    'aws': { impact: 12000, frequency: 78, trend: 'Very High' },
    'terraform': { impact: 10000, frequency: 28, trend: 'High' },
    'typescript': { impact: 7000, frequency: 72, trend: 'High' },
    'rust': { impact: 15000, frequency: 18, trend: 'Medium' },
    'golang': { impact: 14000, frequency: 22, trend: 'High' },
    'machine learning': { impact: 20000, frequency: 35, trend: 'Very High' },
    'fastapi': { impact: 9000, frequency: 24, trend: 'High' },
    'next.js': { impact: 8000, frequency: 45, trend: 'High' },
    'postgresql': { impact: 6000, frequency: 55, trend: 'Medium' },
    'mongodb': { impact: 5000, frequency: 48, trend: 'Medium' },
    'react': { impact: 7000, frequency: 80, trend: 'High' },
    'node.js': { impact: 8000, frequency: 75, trend: 'High' }
  };
  
  const skillLower = skill.toLowerCase();
  return salaryImpactMap[skillLower] || { impact: 0, frequency: 0, trend: 'Unknown' };
}

/**
 * Get trending skills in job market
 */
export function getTrendingSkills(job) {
  const trendingMap = {
    'kubernetes': 'Very High',
    'graphql': 'High',
    'typescript': 'Very High',
    'machine learning': 'Very High',
    'terraform': 'High',
    'docker': 'Very High',
    'rust': 'High',
    'golang': 'High',
    'fastapi': 'High',
    'next.js': 'High'
  };
  
  const jobSkills = (job.skills || []).map(s => s.toLowerCase());
  
  return jobSkills
    .filter(skill => trendingMap[skill])
    .map(skill => ({
      skill: skill.charAt(0).toUpperCase() + skill.slice(1),
      demand: trendingMap[skill],
      salaryBonus: getSkillSalaryImpact(skill).impact
    }))
    .sort((a, b) => {
      const demandOrder = { 'Very High': 3, 'High': 2, 'Medium': 1 };
      return (demandOrder[b.demand] || 0) - (demandOrder[a.demand] || 0);
    });
}

/**
 * Calculate learning path priority based on job requirements and market demand
 */
export function prioritizeLearningPath(missingSkills, allCourses) {
  return missingSkills
    .map(skill => {
      const salaryImpact = getSkillSalaryImpact(skill);
      const relevantCourse = allCourses.find(c => 
        c.skills?.some(s => s.toLowerCase().includes(skill.toLowerCase()))
      );
      
      return {
        skill,
        priority: calculatePriority(salaryImpact.frequency, salaryImpact.impact),
        salaryBoost: salaryImpact.impact,
        timeToLearn: relevantCourse ? parseCourseDuration(relevantCourse.duration) : 30,
        course: relevantCourse?.id || null
      };
    })
    .sort((a, b) => b.priority - a.priority);
}

/**
 * Calculate priority score (0-100)
 * Based on job frequency demand and salary impact
 */
function calculatePriority(frequency, salaryImpact) {
  // Frequency weight (60%) + Salary weight (40%)
  const frequencyScore = (frequency / 100) * 100;
  const salaryScore = Math.min((salaryImpact / 20000) * 100, 100);
  
  return Math.round((frequencyScore * 0.6) + (salaryScore * 0.4));
}

export default {
  analyzeSkillGaps,
  getSkillSalaryImpact,
  getTrendingSkills,
  prioritizeLearningPath
};
