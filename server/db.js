// server/db.js
import { PrismaClient } from '@prisma/client'

// Import the adapter for your database
import { PrismaPg } from '@prisma/adapter-pg'   // PostgreSQL
// import { PrismaNeon } from '@prisma/adapter-neon'  // Neon
// import { PrismaD1 } from '@prisma/adapter-d1'      // Cloudflare D1, etc.

const connectionString = process.env.DATABASE_URL

const adapter = new PrismaPg({
  connectionString,
})

const prisma = new PrismaClient({ adapter })

export default prisma