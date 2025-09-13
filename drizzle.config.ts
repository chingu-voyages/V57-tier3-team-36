import { defineConfig } from 'drizzle-kit';
import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd();
loadEnvConfig(projectDir)

if (!process.env.DATABASE_URL) throw new Error('Db url is missing!')

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL
    }
})

