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
        await db.delete(schema.units)
        await db.delete(schema.lessons)
        await db.delete(schema.challenges)
        await db.delete(schema.challengeOptions)
        await db.delete(schema.challengeOptions)
        await db.delete(schema.userSubscription)
        

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
        ]);

        await db.insert(schema.units).values([
            {
                id:1,
                courseId: 1,
                title: "Unit 1",
                description: "Learn the basics of spanish",
                order:1,
            }
        ])

        await db.insert(schema.lessons).values([
            {
                id:1,
                unitId: 1,
                title: "Nouns",
                order:1,
            },
            {
                id:2,
                unitId: 1,
                title: "Verbs",
                order:2,
            },
            {
                id:3,
                unitId: 1,
                title: "Verbs",
                order:3,
            },
            {
                id:4,
                unitId: 1,
                title: "Verbs",
                order:4,
            },
            {
                id:5,
                unitId: 1,
                title: "Verbs",
                order:5,
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id:1,
                lessonId: 1,
                question: 'wich one of this is the "man" ?',
                type: "SELECT",
                order:1,
            },
            {
                id:2,
                lessonId: 1,
                question: 'the "man" ?',
                type: "ASSIST",
                order:2,
            },
            {
                id:3,
                lessonId: 1,
                question: 'wich on of this is the "robot" ?',
                type: "SELECT",
                order:3,
            },
            
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1,
                imageSrc: '/man.png',
                correct: true,
                text: "el homber",
                audioSrc: "/spanish_man.mp3",
            },
            {
                challengeId: 1,
                imageSrc: '/women.png',
                correct: false,
                text: "la mujer",
                audioSrc: "/spanish_women.mp3",
            },
            {
                challengeId: 1,
                imageSrc: '/robot.png',
                correct: false,
                text: "el robot",
                audioSrc: "/spanish_robot.mp3",
            },
            {
                challengeId: 2,
                correct: true,
                text: "el homber",
                audioSrc: "/spanish_man.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "la mujer",
                audioSrc: "/spanish_women.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "el robot",
                audioSrc: "/spanish_robot.mp3",
            },
            {
                challengeId: 3,
                imageSrc: '/man.png',
                correct: false,
                text: "el homber",
                audioSrc: "/spanish_man.mp3",
            },
            {
                challengeId: 3,
                imageSrc: '/women.png',
                correct: false,
                text: "la mujer",
                audioSrc: "/spanish_women.mp3",
            },
            {
                challengeId: 3,
                imageSrc: '/robot.png',
                correct: true,
                text: "el robot",
                audioSrc: "/spanish_robot.mp3",
            },
        ])
//challenge 2
        await db.insert(schema.challenges).values([
            {
                id:4,
                lessonId: 2,
                question: 'wich one of this is the "man" ?',
                type: "SELECT",
                order:1,
            },
            {
                id:5,
                lessonId: 2,
                question: 'the "man" ?',
                type: "ASSIST",
                order:2,
            },
            {
                id:6,
                lessonId: 2,
                question: 'wich on of this is the "robot" ?',
                type: "SELECT",
                order:3,
            },
            
        ]);

        console.log("seeding finished")
    } catch (error) {
        throw new Error("failed to seed databse")
    }
}

main();