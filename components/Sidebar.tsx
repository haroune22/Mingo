import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { SideBarItem } from "./SideBarItem"
import { 
  ClerkLoaded, 
  ClerkLoading, 
  UserButton 
} from "@clerk/nextjs"
import { Loader } from "lucide-react"

type Props = {
    className?: string
}
export const Sidebar = ({
    className
}: Props) => {
  return (
    <div className={cn(
        'flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-2 flex-col',
        className
    )}>
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
            <Image 
              alt="mascot"
              src="/mascot.png"
              width={40}
              height={40}
            />
            <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
              Mingo
            </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SideBarItem
          label="learn"
          href="/learn"
          iconSrc="/learn.png"
        />
        <SideBarItem
          label="leaderBoard"
          href="/leaderboard"
          iconSrc="/leaderBoard.png"
        />
        <SideBarItem
          label="quests"
          href="/quests"
          iconSrc="/quests.png"
        />
        <SideBarItem
          label="shop"
          href="/shop"
          iconSrc="/shop.png"
        />
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/"/>
        </ClerkLoaded>
      </div>
    </div>
  )
}
