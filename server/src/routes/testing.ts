import express from 'express';
import { initializeDB } from '../config/dbconfig';

const router = express.Router();

router.post('/resetdb', async (_req, res) => {
  try {
    await initializeDB();
    res.status(200).end();
  } catch (e) {
    res.status(400).send({ error: (e as Error).message });
  }
});

router.get('/health', (_req, res) => {
  res.status(200).send('ok');
});

export default router;
