import { execSync, spawn } from 'child_process';
import http from 'http';

const TARGET_URL = 'http://localhost:3000';
const APP_DIR = './fable-and-fact';

function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve(res.statusCode === 200);
      res.resume();
    }).on('error', () => resolve(false));
  });
}

async function deploy() {
  console.log("🚀 Starting Atomic Production Deployment...");

  try {
    // 1. Build the production app
    console.log("📦 Building optimized production bundle...");
    execSync('npm run build', { cwd: APP_DIR, stdio: 'inherit' });

    // 2. Kill any existing instances on port 3000
    console.log("🧹 Clearing port 3000...");
    try {
      if (process.platform === 'win32') {
        execSync('stop-process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess', { shell: 'powershell.exe' });
      } else {
        execSync('lsof -ti:3000 | xargs kill -9');
      }
    } catch (e) {
      // Port might already be clear
    }

    // 3. Start the production server in the background
    console.log("⚡ Starting production server...");
    const prodProcess = spawn('npm', ['run', 'start'], {
      cwd: APP_DIR,
      detached: true,
      stdio: 'ignore'
    });
    prodProcess.unref();

    // 4. Verification Loop
    console.log("🔍 Verifying production health...");
    let retries = 20;
    while (retries > 0) {
      if (await checkUrl(TARGET_URL)) {
        console.log("✅ PRODUCTION DEPLOYMENT SUCCESSFUL.");
        console.log(`🔗 Interface live at ${TARGET_URL}`);
        process.exit(0);
      }
      retries--;
      await new Promise(r => setTimeout(r, 1000));
    }

    console.error("🚨 Production server failed to respond.");
    process.exit(1);

  } catch (error) {
    console.error("❌ Deployment failed:", error.message);
    process.exit(1);
  }
}

deploy();
