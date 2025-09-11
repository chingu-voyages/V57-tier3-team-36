import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
// import { eq } from 'drizzle-orm';
// import { usersTable } from './db/schema';

const db = drizzle(process.env.DEV_DATABASE_URL || '');