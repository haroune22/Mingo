import { getLesson, getUserProgress } from '@/db/queries'
import { redirect } from 'next/navigation';
import React from 'react'
import { Quiz } from './Quiz';

const LessonPage = async() => {

    const lesson = await getLesson();
    const userProgress = await getUserProgress();

    if(!lesson || !userProgress) {
        redirect("/learn")
    };

    const initialPercentage = lesson.challenges
        .filter((challenge) => challenge.completed)
        .length / lesson.challenges.length * 100

  return (
    <Quiz 
        initialLessonId={lesson.id}
        initialLessonChallenges={lesson.challenges}
        initialHearts={userProgress.hearts}
        initialPercentage={initialPercentage}
        userSubscription={undefined}
    />
  )
}

export default LessonPage