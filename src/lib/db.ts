import { Pool } from 'pg';

type PoolConfig = {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
  ssl?: { rejectUnauthorized: false };
  max?: number;
  idleTimeoutMillis?: number;
  connectionTimeoutMillis?: number;
};

const pool = new Pool({
  user: process.env.DB_USER!,
  host: process.env.DB_HOST!,
  database: process.env.DB_NAME!,
  password: process.env.DB_PASSWORD!,
  port: parseInt(process.env.DB_PORT!),
  ssl: { rejectUnauthorized: false }, // Required for AWS RDS
  max: 20, // Max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
} as PoolConfig);

export { pool };

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing pool');
  pool.end();
});

export default pool;
