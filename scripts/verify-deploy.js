import http from 'http';
import { execSync, spawn } from 'child_process';

const TARGET_URL = 'http://localhost:3000';
const MAX_RETRIES = 15; // Increased for cold starts
const RETRY_DELAY = 1000;

function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve(res.statusCode === 200);
      res.resume();
    }).on('error', () => resolve(false));
  });
}

async function verify() {
  console.log("🔍 Running pre-deployment build check...");
  try {
    execSync('npm run build', { cwd: './fable-and-fact', stdio: 'inherit' });
  } catch (e) {
    console.error("❌ Build failed. Deployment aborted.");
    process.exit(1);
  }

  console.log("✅ Build successful. Verifying live service...");
  let retries = MAX_RETRIES;
  while (retries > 0) {
    if (await checkUrl(TARGET_URL)) {
      console.log("✅ Service is live on port 3000.");
      process.exit(0);
    }
    retries--;
    if (retries > 0) await new Promise(r => setTimeout(r, RETRY_DELAY));
  }

  console.error("🚨 Service not detected on port 3000. Attempting auto-restart...");
  // Attempt to start it if it's down
  const devProcess = spawn('npm', ['run', 'dev'], { 
    cwd: './fable-and-fact',
    detached: true,
    stdio: 'ignore'
  });
  devProcess.unref();
  
  // Final check after attempt
  await new Promise(r => setTimeout(r, 5000));
  if (await checkUrl(TARGET_URL)) {
    console.log("✅ Service recovered and live.");
    process.exit(0);
  }

  console.error("❌ Deployment verification failed.");
  process.exit(1);
}

verify();
