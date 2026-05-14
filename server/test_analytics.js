import fetch from 'node-fetch';

async function testAnalytics() {
  const endpoints = [
    '/api/admin/analytics/overview',
    '/api/admin/analytics/users',
    '/api/admin/analytics/jobs',
    '/api/admin/analytics/courses',
    '/api/admin/analytics/assessments',
    '/api/admin/analytics/system'
  ];

  console.log('Testing Analytics Endpoints...');
  
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

testAnalytics();
