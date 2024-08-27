import { FeedWrapper } from '@/components/FeedWrapper'
import { StickyWrapper } from '@/components/StickyWrapper'
import { UserProgress } from '@/components/UserProgress';
import { Header } from './Header'
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from '@/db/queries';
import { redirect } from 'next/navigation';
import { Unit } from './Unit';
import { Promo } from '@/components/Promo';
import { Quests } from '@/components/quests';


const LearnPage = async() => {

  const userProgress = await getUserProgress()
  const UnitsData = await getUnits();
  const courseProgress = await getCourseProgress()
  const lessonPercentage = await getLessonPercentage()
  const userSubscription = await getUserSubscription()

  if(!userProgress || !userProgress.activeCourse) {
    redirect("/courses")
  }

  if(!courseProgress) {
    redirect("/courses")
  }

  const isPro = !!userSubscription?.isActive

  return (
    <div className='flex flex-row-reverse gap-[48px] px-6  '>
        <StickyWrapper>
            <UserProgress 
                activeCourse={userProgress.activeCourse} 
                hearts={userProgress.hearts} 
                points={userProgress.points}  
                hasActiveSubscribtion={isPro}
            /> 
            {!isPro && (
              <Promo/>
            )}
            <Quests points={userProgress.points} />
        </StickyWrapper>
        <FeedWrapper>
            <Header title={userProgress.activeCourse.title}/>
            {UnitsData.map((unit) => (
              <div key={unit.id} className="mb-10">
                <Unit
                  id={unit.id}
                  order={unit.order}
                  description={unit.description}
                  title={unit.title}
                  lessons={unit.lessons}
                  activeLesson={courseProgress.activeLesson}
                  activeLessonPercentage={lessonPercentage}
                />
              </div>
            ))}
        </FeedWrapper>
    </div>
  );
};

export default LearnPage