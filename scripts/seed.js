const { db } = require('@vercel/postgres')

async function createUndanganTable(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS undangan (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          kehadiran VARCHAR(255) NOT NULL,
          ucapan TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
  
      console.log(`Created "undangan" table`);
  
      // Insert data into the "users" table
    //   const insertedUndangan = await Promise.all(
    //     users.map(async (user) => {
    //       return client.sql`
    //       INSERT INTO users (id, name, email, password)
    //       VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
    //       ON CONFLICT (id) DO NOTHING;
    //     `;
    //     }),
    //   );
  
    //   console.log(`Seeded ${insertedUsers.length} users`);
  
      return {
        createTable,
      };
    } catch (error) {
      console.error('Error seeding users:', error);
      throw error;
    }
}

async function main() {
    const client = await db.connect();

    await createUndanganTable(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});

