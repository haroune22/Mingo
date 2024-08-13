import { FeedWrapper } from '@/components/FeedWrapper'
import { StickyWrapper } from '@/components/StickyWrapper'
import { UserProgress } from '@/components/UserProgress';
import { Header } from './Header';


const LearnPage = () => {
  return (
    <div className='flex flex-row-reverse gap-[48px] px-6  '>
        <StickyWrapper>
            <UserProgress 
                activeCourse={{ title: 'spanish' , imageSrc: '/Spain.svg', }} 
                hearts={5} 
                points={100} 
                hasActiveSubscribtion={false}
            /> 
        </StickyWrapper>
        <FeedWrapper>
            <Header title='Spanish' />
        </FeedWrapper>
    </div>
  );
};

export default LearnPage