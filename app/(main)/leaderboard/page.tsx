import { FeedWrapper } from "@/components/FeedWrapper"
import { Promo } from "@/components/Promo"
import { Quests } from "@/components/quests"
import { StickyWrapper } from "@/components/StickyWrapper"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { UserProgress } from "@/components/UserProgress"
import { getTopTenUsers, getUserProgress, getUserSubscription } from "@/db/queries"
import Image from "next/image"
import { redirect } from "next/navigation"


const LeaderboardPage = async() => {

    const userProgress = await getUserProgress();
    const userSubscription = await getUserSubscription()
    const topTenUser = await getTopTenUsers();

    if(!userProgress || !userProgress.activeCourse) {
        redirect('/learn')
    };


    const isPro = !!userSubscription?.isActive

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6 ">
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
            <div className="w-full flex flex-col items-center">
                <Image
                    src='/leaderboard.png'
                    alt="leaderboard"
                    width={90}
                    height={90}
                />
                <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                    Leaderboard
                </h1>
                <p className="text-muted-foreground text-center text-lg mb-6">
                    See wher you stand among other learners in the community.
                </p>
                <Separator className="mb-4 h-0.5 rounded-full"/>
                {topTenUser.map((userProgress, index) => (
                    <div   
                        key={userProgress.userId}
                        className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-neutral-200/50"
                    >
                        <p className="font-bold text-lime-700 mr-4"> 
                            {index + 1}
                        </p>
                        <Avatar
                            className="border bg-green-500 h-12 w-12 ml-3 mr-6"
                        >
                            <AvatarImage
                                src={userProgress.userImageSrc}
                                className="object-cover"
                            />
                        </Avatar>
                        <p className="font-bold text-neutral-800 flex-1">
                            {userProgress.userName}
                        </p>
                        <p className="text-muted-foreground">
                            {userProgress.points} XP
                        </p>
                    </div>
                ))}
            </div>
        </FeedWrapper>
    </div>
  )
}

export default LeaderboardPage