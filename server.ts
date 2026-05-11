import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { initializeApp, applicationDefault, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import type { Firestore } from 'firebase-admin/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseConfigPath = path.join(process.cwd(), 'firebase-applet-config.json');

type FirebaseAppletConfig = {
  projectId: string;
  firestoreDatabaseId?: string;
};

function loadFirebaseConfig(): FirebaseAppletConfig | null {
  if (!fs.existsSync(firebaseConfigPath)) {
    console.warn(`[server] Missing ${firebaseConfigPath} — Firebase Admin disabled.`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf-8')) as FirebaseAppletConfig;
  } catch (e) {
    console.warn('[server] Could not parse firebase config:', e);
    return null;
  }
}

/** Same credential model as `backend/main.py` (GCP ADC / GOOGLE_APPLICATION_CREDENTIALS). */
function initFirebaseAdmin(): Firestore | null {
  const cfg = loadFirebaseConfig();
  if (!cfg?.projectId) return null;

  try {
    if (getApps().length === 0) {
      initializeApp({
        credential: applicationDefault(),
        projectId: cfg.projectId,
      });
    }
    const app = getApps()[0];
    if (!app) return null;

    if (cfg.firestoreDatabaseId) {
      return getFirestore(app, cfg.firestoreDatabaseId);
    }
    return getFirestore(app);
  } catch (err) {
    console.warn(
      '[server] Firebase Admin init failed. For local dev set GOOGLE_APPLICATION_CREDENTIALS to a service account JSON, or use gcloud auth application-default login:',
      err,
    );
    return null;
  }
}

const db = initFirebaseAdmin();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      firebase: db ? 'connected' : 'disabled',
      credential: 'application-default',
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[server] Vite + Express on http://localhost:${PORT}`);
    console.log(`[server] Firebase Admin: ${db ? 'Firestore ready (ADC)' : 'not initialized'}`);
  });
}

startServer();
