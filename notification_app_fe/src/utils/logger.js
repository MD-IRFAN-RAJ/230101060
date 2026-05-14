import axios from 'axios';

const LOG_URL = 'http://4.224.186.213/evaluation-service/logs';

export async function Log(stack, level, pkg, msg) {
  try {
    await axios.post(LOG_URL, {
      timestamp: new Date().toISOString(),
      stack,
      level: level.toUpperCase(),
      packageName: pkg,
      message: msg,
      userAgent: navigator.userAgent,
      url: window.location.href,
    }, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
    });
    console.log(`[${level}] ${pkg} - ${msg}`);
  } catch (e) {
    console.log(`[${level}] ${pkg} - ${msg}`);
  }
}

export default Log;
