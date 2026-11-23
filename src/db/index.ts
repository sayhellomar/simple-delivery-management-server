import { Pool } from "pg";
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default async function initDB() {
    try {
        // users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(30) DEFAULT 'sender',
                is_active BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now()
            )
        `);

        // Profile table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS user_profiles (
                id SERIAL PRIMARY KEY,
                user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
                address TEXT,
                phone VARCHAR(20),
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now()
            )
        `);

        console.log("Database Connected");
    } catch (error) {
        console.log(error);
    }
}
