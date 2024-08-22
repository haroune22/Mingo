import { FeedWrapper } from "@/components/FeedWrapper"
import { StickyWrapper } from "@/components/StickyWrapper"
import { UserProgress } from "@/components/UserProgress"
import { getUserProgress, getUserSubscription } from "@/db/queries"
import Image from "next/image"
import { redirect } from "next/navigation"
import { Items } from "./Items"


const ShopPage = async() => {

    const userProgress = await getUserProgress();
    const userSubscription = await getUserSubscription()

    if(!userProgress || !userProgress.activeCourse) {
        redirect('/learn')
    };


  return (
    <div className="flex flex-row-reverse gap-[48px] px-6 ">
        
        <StickyWrapper>
            <UserProgress
                activeCourse={userProgress.activeCourse}
                hearts={userProgress.hearts}
                points={userProgress.points}
                hasActiveSubscribtion={!!userSubscription?.isActive}
            />
        </StickyWrapper>
        <FeedWrapper>
            <div className="w-full flex flex-col items-center">
                <Image
                    src='/shop.png'
                    alt="shop"
                    width={90}
                    height={90}
                />
                <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                    Shop
                </h1>
                <p className="text-muted-foreground text-center text-lg mb-6">
                    Spend your points on cool stuff.
                </p>
                <Items
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscribtion={!!userSubscription?.isActive}
                />
            </div>
        </FeedWrapper>
    </div>
  )
}

export default ShopPage