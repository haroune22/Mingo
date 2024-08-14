import { FeedWrapper } from '@/components/FeedWrapper'
import { StickyWrapper } from '@/components/StickyWrapper'
import { UserProgress } from '@/components/UserProgress';
import { Header } from './Header'
import { getUserProgress } from '@/db/queries';
import { redirect } from 'next/navigation';


const LearnPage = async() => {

  const userProgress = await getUserProgress()

  if(!userProgress || !userProgress.activeCourse) {
    redirect("/courses")
  }

  return (
    <div className='flex flex-row-reverse gap-[48px] px-6  '>
        <StickyWrapper>
            <UserProgress 
                activeCourse={ userProgress.activeCourse } 
                hearts={userProgress.hearts} 
                points={userProgress.points}  
                hasActiveSubscribtion={false}
            /> 
        </StickyWrapper>
        <FeedWrapper>
            <Header title={userProgress.activeCourse.title}/>
        </FeedWrapper>
    </div>
  );
};

export default LearnPage