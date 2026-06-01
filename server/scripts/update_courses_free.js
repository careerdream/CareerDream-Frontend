import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const courseData = {
  "Advanced Machine Learning with Python": {
    videoUrl: "https://www.youtube.com/embed/7eh4d6sabA0",
    instructor: "Programming with Mosh",
    instructorBio: "Mosh Hamedani is a software engineer with over 20 years of experience, known for his clear, concise, and practical coding tutorials. His channel provides no-fluff, professional-grade training for both beginners and experienced developers."
  },
  "Natural Language Processing Masterclass": {
    videoUrl: "https://www.youtube.com/embed/CMrHM8a3hqw",
    instructor: "Simplilearn",
    instructorBio: "Simplilearn is a leading online bootcamp provider that offers comprehensive training in digital skills like Data Science, Cloud Computing, and AI. Their channel features expert-led tutorials designed to help professionals master in-demand technologies and advance their careers."
  },
  "AWS Solutions Architect Professional (SAP-C02)": {
    videoUrl: "https://www.youtube.com/embed/hyEw7dQ9-JE",
    instructor: "Andrew Brown (freeCodeCamp.org)",
    instructorBio: "Andrew Brown is a cloud educator and Co-Founder of ExamPro. He specializes in deep-dive, hands-on certification training for AWS, Azure, and GCP, helping thousands of students pass professional-level cloud exams."
  },
  "Kubernetes for DevOps Engineers": {
    videoUrl: "https://www.youtube.com/embed/VnvRFRk_51k",
    instructor: "TechWorld with Nana",
    instructorBio: "Nana Janashia is a DevOps expert and educator who simplifies complex cloud technologies like Kubernetes, Docker, and CI/CD. Her channel provides practical, beginner-friendly tutorials aimed at helping developers master DevOps tools and practices."
  },
  "React: Build Modern Web Apps": {
    videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8",
    instructor: "freeCodeCamp.org",
    instructorBio: "freeCodeCamp.org is a non-profit organization that provides thousands of hours of free programming education through their YouTube channel and website. Their content covers everything from basic HTML to advanced machine learning and data science."
  },
  "Full Stack Development with MERN": {
    videoUrl: "https://www.youtube.com/embed/7CqJlxBYj-M",
    instructor: "freeCodeCamp.org",
    instructorBio: "freeCodeCamp.org is a non-profit organization that provides thousands of hours of free programming education through their YouTube channel and website. Their content covers everything from basic HTML to advanced machine learning and data science."
  },
  "Data Science with Python": {
    videoUrl: "https://www.youtube.com/embed/ua-CiDNNj30",
    instructor: "freeCodeCamp.org",
    instructorBio: "freeCodeCamp.org is a non-profit organization that provides thousands of hours of free programming education through their YouTube channel and website. Their content covers everything from basic HTML to advanced machine learning and data science."
  },
  "SQL for Data Analysis": {
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    instructor: "freeCodeCamp.org",
    instructorBio: "freeCodeCamp.org is a non-profit organization that provides thousands of hours of free programming education through their YouTube channel and website. Their content covers everything from basic HTML to advanced machine learning and data science."
  }
};

async function main() {
  const courses = await prisma.course.findMany();
  
  for (const course of courses) {
    let info = courseData[course.title];
    
    // Handle title change for AWS
    if (!info && course.title === "AWS Solutions Architect Professional") {
      info = courseData["AWS Solutions Architect Professional (SAP-C02)"];
    }

    if (!info) {
      info = {
        videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
        instructor: "CareerDream Faculty",
        instructorBio: "Our expert faculty brings years of industry experience to help you master the latest technologies and advance your career in the IT industry."
      };
    }
    
    const updateData = {
      price: "Free",
      originalPrice: "Free",
      videoUrl: info.videoUrl,
      instructor: info.instructor,
      instructorBio: info.instructorBio
    };

    // Specifically update AWS title and description if it matches
    if (course.title === "AWS Solutions Architect Professional") {
      updateData.title = "AWS Solutions Architect Professional (SAP-C02)";
      updateData.description = "Master advanced AWS architecture and prepare for the SAP-C02 certification with this comprehensive hands-on course.";
      updateData.duration = "70 hours";
    }
    
    await prisma.course.update({
      where: { id: course.id },
      data: updateData
    });
    console.log(`Updated course: ${course.title} to ${updateData.title || course.title}`);
  }
  
  console.log("All courses updated successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
