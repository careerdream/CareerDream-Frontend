import fs from 'fs';

async function fetchProbs() {
  const res = await fetch('http://localhost:5000/api/playground/problems');
  const text = await res.text();
  console.log("Raw response:", text);
}

fetchProbs();
