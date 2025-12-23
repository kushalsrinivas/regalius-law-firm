import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Create the connection
const connectionString = process.env.POSTGRES_URL || '';

if (!connectionString) {
  throw new Error('POSTGRES_URL environment variable is not set');
}

// Create postgres client for migrations
export const migrationClient = postgres(connectionString, { max: 1 });

// For query purposes
const queryClient = postgres(connectionString);
export const db = drizzle(queryClient, { schema });

// Export schema for convenience
export { schema };

