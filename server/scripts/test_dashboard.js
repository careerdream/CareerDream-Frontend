import fetch from 'node-fetch';

async function testDashboard() {
  const endpoints = [
    '/api/admin/dashboard/stats',
    '/api/admin/dashboard/activity',
    '/api/admin/dashboard/charts/user-growth',
    '/api/admin/dashboard/charts/job-applications'
  ];

  console.log('Testing Dashboard Endpoints...');
  
  for (const endpoint of endpoints) {
    const url = 'http://localhost:5000' + endpoint;
    try {
      const res = await fetch(url);
      console.log(endpoint + ': ' + res.status + ' ' + res.statusText);
      if (res.status === 500) {
        const text = await res.text();
        console.error('Error Body:', text);
      }
    } catch (e) {
      console.error('Failed to hit ' + url + ': ' + e.message);
    }
  }
}

testDashboard();
