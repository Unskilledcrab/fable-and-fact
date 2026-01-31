import http from 'http';

const TARGET_URL = 'http://localhost:3000';
const MAX_RETRIES = 5;
const RETRY_DELAY = 2000;

function checkUrl(url, retries) {
  return new Promise((resolve) => {
    console.log(`Checking ${url} (Attempt ${MAX_RETRIES - retries + 1})...`);
    http.get(url, (res) => {
      const { statusCode } = res;
      if (statusCode === 200) {
        console.log('✅ Health check passed!');
        resolve(true);
      } else {
        console.log(`❌ Health check failed with status: ${statusCode}`);
        resolve(false);
      }
      res.resume();
    }).on('error', (err) => {
      console.log(`❌ Connection error: ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  let retries = MAX_RETRIES;
  while (retries > 0) {
    const success = await checkUrl(TARGET_URL, retries);
    if (success) process.exit(0);
    retries--;
    if (retries > 0) {
      console.log(`Retrying in ${RETRY_DELAY/1000}s...`);
      await new Promise(r => setTimeout(r, RETRY_DELAY));
    }
  }
  console.error('🚨 Health check failed after maximum retries.');
  process.exit(1);
}

run();
