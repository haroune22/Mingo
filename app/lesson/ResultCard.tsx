import { cn } from "@/lib/utils";
import Image from "next/image";




type Props = {
    value: number;
    variant: "points" | "hearts"
}


export const ResultCard = ({
    value,
    variant
}:Props) => {

  return (
    <div className={cn(
        'rounded-2xl border-2 w-full',
        variant === "points" && "bg-orange-400 border-orange-400",
        variant === "hearts" && "bg-rose-500 border-rose-500",
    )}>
        <div className={cn(
            "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
            variant === "points" && "bg-orange-400 ",
            variant === "hearts" && "bg-rose-500 ",
        )}>
            {variant === "hearts" ? "Hearts left" : "Total XP"}
        </div>
        <div className={cn(
            'rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg',
            variant === "hearts" && 'text-rose-500 ',
            variant === "points" && 'text-orange-500'
        )}>
                <Image
                    src={variant === "hearts" ? "/heart.png" :"/points.png"}
                    alt="Icon"
                    className="mr-2"
                    width={30}
                    height={30}
                />
                {value}
        </div>
    </div>
  )
}
