import axios from 'axios';

const LOG_URL = 'http://4.224.186.213/evaluation-service/logs';

export async function Log(stack, level, pkg, msg) {
  try {
    const token = process.env.access_token;
    if (!token) return;

    await axios.post(LOG_URL, {
      timestamp: new Date().toISOString(),
      stack,
      level: level.toUpperCase(),
      packageName: pkg,
      message: msg,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    });

    console.log(`[${level}] ${pkg} - ${msg}`);
  } catch (e) {
    console.log(`[${level}] ${pkg} - ${msg}`);
  }
}

export default function logger(req, res, next) {
  const t = Date.now();
  res.on('finish', () => {
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - t}ms`);
  });
  next();
}
