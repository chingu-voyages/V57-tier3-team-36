import { loadEnvConfig } from '@next/env';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './db/schema'

const projectDir = process.cwd();
loadEnvConfig(projectDir)

if (!process.env.DEV_DATABASE_URL) throw new Error('DB is not set in .env.local')

export const db = drizzle(process.env.DEV_DATABASE_URL, { schema });