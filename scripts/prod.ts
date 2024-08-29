import { neon } from '@neondatabase/serverless'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'

import * as schema from "../db/schema"

const sql = neon(process.env.DATABASE_URL!)

const db = drizzle(sql, { schema })

const main = async( ) => {
    try {
        console.log('prod database')

        await db.delete(schema.courses)
        await db.delete(schema.userProgress)
        await db.delete(schema.units)
        await db.delete(schema.lessons)
        await db.delete(schema.challenges)
        await db.delete(schema.challengeOptions)
        await db.delete(schema.challengeOptions)
        await db.delete(schema.userSubscription)
        
        const courses = await db.insert(schema.courses)
        .values([
            { title: "Spanish", imageSrc:'/Spain.svg'}
        ]).returning()

        for(const course of courses ) {
                const units = await db.insert(schema.units).values([
                {
                    courseId: course.id,
                    title: "Unit 1",
                    description: `Learn the basics of ${course.title}`,
                    order:1,
                },
                {
                    courseId: course.id,
                    title: "Unit 2",
                    description: `Learn the intermediate of ${course.title}`,
                    order:2,
                },
            ]
                ).returning()
            
            for(const unit of units){
                const lessons = await db.insert(schema.lessons).values([
                    { unitId:unit.id, title: "Nouns", order:1 },
                    { unitId:unit.id, title: "Verbs", order:2 },
                    { unitId:unit.id, title: "Adjectives", order:3 },
                    { unitId:unit.id, title: "Items", order:4 },
                ]).returning()
            for(const lesson of lessons){
                const challenges = await db.insert(schema.challenges).values([
                    {
                        lessonId: lesson.id,
                        question: 'wich one of this is the "man" ?',
                        type: "SELECT",
                        order:1,
                    },
                    {
                        lessonId: lesson.id,
                        question: 'wich one of this is the "woman" ?',
                        type: "ASSIST",
                        order:2,
                    },
                    {
                        lessonId: lesson.id,
                        question: 'wich on of this is the "boy" ?',
                        type: "SELECT",
                        order:3,
                    },
                    {
                        lessonId: lesson.id,
                        question: 'the "man" ?',
                        type: "ASSIST",
                        order:4,
                    },
                    {
                        lessonId: lesson.id,
                        question: 'the "zombie" ?',
                        type: "ASSIST",
                        order:5,
                    },
                    {
                        lessonId: lesson.id,
                        question: 'wich one of these is the "book" ?',
                        type: "SELECT",
                        order:6,
                    },
                    {
                        lessonId: lesson.id,
                        question: 'wich one of these is "Money" ?',
                        type: "SELECT",
                        order:7,
                    },
                    {
                        lessonId: lesson.id,
                        question: 'wich one these is the "pencil" ?',
                        type: "SELECT",
                        order:8,
                    },
                ]).returning()
                for(const challenge of challenges){
                    if(challenge.order === 1){
                        await db.insert(schema.challengeOptions).values([
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: 'el hombre',
                                imageSrc: "/man.png",
                                audioSrc:'/spanish_man.mp3',
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: 'la mujer',
                                imageSrc: "/women.png",
                                audioSrc:'/spanish_women.mp3',
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: 'el robot',
                                imageSrc: "/robot.png",
                                audioSrc:'/Spanish_robot.mp3',
                            },
                        ])
                    };
                    if(challenge.order === 2){
                        await db.insert(schema.challengeOptions).values([
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "la mujer",
                                audioSrc: '/spanish_women.mp3',
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "el chico",
                                audioSrc: '/spanish_boy.mp3',
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "el hombre",
                                audioSrc: '/spanish_man.mp3',
                            },
                        ])
                    }
                    if(challenge.order === 3){
                        await db.insert(schema.challengeOptions).values([
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "la mujer",
                                imageSrc:"/women.png",
                                audioSrc: '/spanish_women.mp3',
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "el hombre",
                                imageSrc:"/man.png",
                                audioSrc: '/spanish_man.mp3',
                            },
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "el chico",
                                imageSrc:"/boy.png",
                                audioSrc: '/spanish_boy.mp3',
                            },
                        ])
                    }
                    if(challenge.order === 4){
                        await db.insert(schema.challengeOptions).values([
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "la mujer",
                                audioSrc: '/spanish_women.mp3',
                            },
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "el hombre",
                                audioSrc: '/spanish_man.mp3',
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "el chico",
                                audioSrc: '/spanish_boy.mp3',
                            },
                        ])
                    }
                    if(challenge.order === 5){
                        await db.insert(schema.challengeOptions).values([
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "el zombie",
                                audioSrc: '/spanish_zombie.mp3',
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "la mujer",
                                audioSrc: '/spanish_women.mp3',
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "el chico",
                                audioSrc: '/spanish_boy.mp3',
                            },
                        ])
                    }
                    if(challenge.order === 6){
                        await db.insert(schema.challengeOptions).values([
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "el zombie",
                                imageSrc:"/zombie.png",
                                audioSrc: '/spanish_zombie.mp3',
                            },
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "libro",
                                imageSrc:"/book.png",
                                audioSrc: '/spanish_book.mp3',
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "billetera",
                                imageSrc:"/wallet.png",
                                audioSrc: '/spanish_wallet.mp3',
                            },
                        ])
                    }
                    if(challenge.order === 7){
                        await db.insert(schema.challengeOptions).values([
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "billetera",
                                imageSrc:'/wallet.png',
                                audioSrc: '/spanish_wallet.mp3',
                            },
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "dinero",
                                imageSrc: "/money.png",
                                audioSrc: '/spanish_money.mp3',
                            },
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "teléfono",
                                imageSrc:'/phone.png',
                                audioSrc: '/spanish_phone.mp3',
                            },
                        ])
                    }
                    if(challenge.order === 8){
                        await db.insert(schema.challengeOptions).values([
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "billetera",
                                imageSrc:"/wallet.png",
                                audioSrc: '/spanish_wallet.mp3',
                            },
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "lápiz",
                                imageSrc:"/pencil.png",
                                audioSrc: '/spanish_pencil.mp3',
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "dinero",
                                imageSrc:"/money.png",
                                audioSrc: '/spanish_money.mp3',
                            },
                        ])
                    }

                }
            }
        }
    }

        console.log("seeding finished")
    } catch (error) {
        throw new Error("failed to seed databse")
    }
}

main();