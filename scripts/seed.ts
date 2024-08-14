import { neon } from '@neondatabase/serverless'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'

import * as schema from "../db/schema"

const sql = neon(process.env.DATABASE_URL!)

const db = drizzle(sql, { schema })

const main = async( ) => {
    try {
        console.log('seed database')

        await db.delete(schema.courses)
        await db.delete(schema.userProgress)

        await db.insert(schema.courses).values([
            {
                id:1,
                title: "Spanish",
                imageSrc: '/Spain.svg'
            },
            {
                id:2,
                title: "Arabic",
                imageSrc: '/Algeria.svg'
            },
            {
                id:3,
                title: "English",
                imageSrc: '/United-Kingdom.svg'
            },
            {
                id:4,
                title: "French",
                imageSrc: '/France.svg'
            },
            {
                id:5,
                title: "Portuguese",
                imageSrc: '/Portugal.svg'
            },
        ])

        console.log("seeding finished")
    } catch (error) {
        throw new Error("failed to seed databse")
    }
}

main();