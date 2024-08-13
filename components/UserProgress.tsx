import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { Heart, InfinityIcon } from "lucide-react";



type Props = {
    activeCourse: { title: string, imageSrc: string};
    hearts: number;
    points: number;
    hasActiveSubscribtion: boolean;
}

export const UserProgress = ({
    activeCourse,
    hasActiveSubscribtion,
    hearts,
    points
}:Props) => {
  return (    
    <div className=" flex items-center justify-between gap-x-2 w-full">
        <Link href="/courses">
            <Button variant="ghost">
                <Image
                    src={activeCourse.imageSrc}
                    alt={activeCourse.title}
                    className="rounded-md border"
                    width={32}
                    height={32}
                />
            </Button>
        </Link>
        <Link href="/shop">
            <Button variant="ghost" className="text-orange-500">
                <Image
                    src="/points.png"
                    alt="points"
                    className="mr-2"
                    width={28}
                    height={28}
                />
                {points}
            </Button>
        </Link>
        <Link href="/shop">
            <Button variant="ghost" className="text-rose-500">
                <Image
                    src="/heart.png"
                    alt="Hearts"
                    className="mr-2"
                    width={28}
                    height={28}
                />
                { hasActiveSubscribtion ? <InfinityIcon className="h-4 w-4 stroke-[3]"/> : hearts }
            </Button>
        </Link>
    </div>
  )
}
