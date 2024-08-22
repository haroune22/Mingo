"use client"

import { RefillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import { response } from "express";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    hearts: number;
    points: number;
    hasActiveSubscribtion: boolean;
};

const POINTS_TO_REFILL = 10;

export const Items = ({
    hasActiveSubscribtion,
    hearts,
    points
}: Props) => {

    const [pending, startTransition] = useTransition()

    const onRefillHearts = () => {
        if(pending || hearts === 5 || points < POINTS_TO_REFILL){
            return;
        };

        startTransition(()=>{
            RefillHearts()
            .catch(()=> toast.error("Somthing went wrong"))
        })
    };

    const onUpgrade = () => {
        startTransition(()=>{  
            createStripeUrl()
                .then((response) => {
                    if(response.data){
                        window.location.href = response.data
                    }
                })
                .catch(()=> toast.error("Somthing went wrong"))
        })
    };

  return (
    <ul className="w-full">
        <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
            <Image
                src="/heart.png"
                alt="heart"
                width={60}
                height={60}
            />
            <div className="flex-1">
                <p className="text-neutral-700 text-base lg:text-xl font-bold">
                    Refil hearts
                </p>
            </div>
            <Button
                onClick={onRefillHearts}
                disabled={hearts === 5 || points < POINTS_TO_REFILL || pending} 
            >
                {hearts === 5
                    ? "full"
                    : (
                        <div className="flex items-center">
                            <Image 
                             src="/points.png"
                             alt="points"
                             height={20}
                             width={20}
                             />
                             <p className="">
                                {POINTS_TO_REFILL}
                             </p>
                        </div>
                )}
            </Button>
        </div>
        <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
            <Image 
                src="/unlimited.png"
                alt="unlimated"
                height={60}
                width={60}
            />
            <div className="flex-1">
                <p className="text-neutral-700 text-base lg:text-xl font-bold">
                    Unlimited hearts
                </p>
            </div>
            <Button
                onClick={onUpgrade}
                disabled={pending}
            >
                {hasActiveSubscribtion ? "settings" : "upgrade"}
            </Button>
        </div>
    </ul>
  )
}
