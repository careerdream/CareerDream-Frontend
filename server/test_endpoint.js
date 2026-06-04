import fs from 'fs';

async function run() {
  const formData = new FormData();
  formData.append('resume', new Blob(['Dummy resume content\nSkills: React, Node.js, Python'], { type: 'text/plain' }), 'resume.txt');
  
  try {
    const response = await fetch('http://localhost:5000/api/resume/analyze', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': 'Bearer DUMMY'
      }
    });
    
    console.log('Status:', response.status);
    console.log('Response:', await response.text());
  } catch(e) {
    console.error(e);
  }
}

run();
