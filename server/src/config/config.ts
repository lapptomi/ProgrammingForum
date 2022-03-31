import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGODB_URI: string | null = process.env.MONGODB_URI || null;
const TEST_MONGODB_URI: string | null = process.env.TEST_MONGODB_URI || null;
const SECRET = process.env.SECRET || 'supersecretkey';
const NODE_ENV = process.env.NODE_ENV || 'development';

export {
  PORT,
  MONGODB_URI,
  TEST_MONGODB_URI,
  SECRET,
  NODE_ENV,
};
