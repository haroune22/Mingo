"use server"

import db from "@/db/drizzle"
import { getCourseById, getUserProgress } from "@/db/queries"
import { challengeProgress, challenges, userProgress } from "@/db/schema"
import { auth, currentUser } from "@clerk/nextjs"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const POINTS_TO_REFILL = 10;

export const upserUserProgress = async (courseId: number) => {

    const { userId } = await auth();
    const user = await currentUser();

    if(!userId || !user){
        throw new Error("Unauthorized")
    };

    const course = await getCourseById(courseId);

    if(!course){
        throw new Error("Course not found")
    };

    //create units and lessons for the course
    // if(!course.units.length || !course.units[0].lessons.length){
    //     throw new Error("Course is empty")
    // }

    const existingUserProgress = await getUserProgress();
    // console.log(existingUserProgress)
    
    if(existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || '/mascot.png'
        });

        revalidatePath('/courses')
        revalidatePath('/learn')
        redirect("/learn")
    };

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || '/mascot.png'
    });

    revalidatePath('/courses');
    revalidatePath('/learn');
    redirect("/learn");

}

export const reduceHearts = async (challengeId: number) => {
    const { userId } = await auth();

    if(!userId){
        throw new Error("unauthorized")
    };

    const currentUserProgress = await getUserProgress();

    if(!currentUserProgress){
        throw new Error("User progress not found")
    };

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    });

    if(!challenge){
        throw new Error("challenge not found")
    };

    const lessonId = challenge.lessonId;

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId)
        )
    });

    const isPractice = !!existingChallengeProgress;

    if(isPractice){
        return { error: "practice"}
    };

    //not if user has a subscription
    if(currentUserProgress.hearts === 0){
        return { error: "hearts"}
    };

    await db.update(userProgress).set({
        hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(
        eq(userProgress.userId, userId)
    );

    revalidatePath('/learn')
    revalidatePath('/shop')
    revalidatePath('/lesson')
    revalidatePath('/quests')
    revalidatePath('/leaderboard')
    revalidatePath(`/lesson/${lessonId}`)
    
}

export const RefillHearts = async () => {
    
    const { userId } = await auth();

    if(!userId){
        throw new Error("unauthorized")
    };

    const currentUserProgress = await getUserProgress();

    if(!currentUserProgress){
        throw new Error("User progress not found")
    };

    if(currentUserProgress.hearts === 5){
        throw new Error("Hearts are already fill")
    };

    if(currentUserProgress.points < POINTS_TO_REFILL){
        throw new Error("You don't have enough points to purcahase hearts")
    };

    await db.update(userProgress).set({
        hearts:5,
        points:currentUserProgress.points - POINTS_TO_REFILL, 
    })
    .where(
        eq(userProgress.userId, currentUserProgress.userId)
    );

    revalidatePath('/learn')
    revalidatePath('/shop')
    revalidatePath('/quests')
    revalidatePath('/leaderboard')

}