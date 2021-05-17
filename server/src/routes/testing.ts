import express from 'express';
import { resetDatabase } from '../config/dbconfig';

const router = express.Router();

// Deletes all rows from the database tables
router.post('/resetdb', async (_req, res) => {
  try {
    await resetDatabase();
    res.status(200).end();
  } catch (e) {
    res.status(400).send({ error: (e as Error).message });
  }
});

router.get('/health', (_req, res) => {
  res.status(200).send('ok');
});

export default router;
