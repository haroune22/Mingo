import { getLesson, getUserProgress } from '@/db/queries'
import { redirect } from 'next/navigation';
import React from 'react'
import { Quiz } from '../Quiz';

type Props = {
  params: {
    lessonId: number
  }
}

const LessonIdPage = async({
  params
}:Props) => {

    const lesson = await getLesson(params.lessonId);
    const userProgress = await getUserProgress();

    if(!lesson || !userProgress) {
        redirect("/learn")
    };

    const initialPercentage = lesson.challenges
        .filter((challenge) => challenge.completed)
        .length / lesson.challenges.length * 100;
        

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

export default LessonIdPage