"use client"

import { challengeOptions, challenges } from "@/db/schema";
import { useState, useTransition } from "react";
import { Header } from "./Header";
import { QuestionBubble } from "./QuestionBubble";
import { Challenge } from "./Challenge";
import { Footer } from "./Footer";
import { upserChallengeProgress } from "@/actions/challenge_progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";




type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[]
    })[];
    userSubscription: any;
};


export const Quiz = ({
    initialHearts,
    initialLessonChallenges,
    initialLessonId,
    initialPercentage,
    userSubscription,
}:Props) => {

    const [pending, startTransition] = useTransition()

    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(()=> {
        const uncompletedIndex = challenges.findIndex(c => !c.completed)
        return uncompletedIndex === -1 ? 0 : uncompletedIndex
    });

    const [selectedOption, setSelectedOption ]= useState<number>();
    const [status, setStatus ]= useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex]
    const Options = challenge.challengeOptions;

    const onNext = () => {
        setActiveIndex((current) => current + 1)
    }

    const onSelect = (id:number) => {
        if(status !== "none") return;

        setSelectedOption(id)

    };

    const onContinue = () => {
        if(!selectedOption) return ;
        // console.log(selectedOption);

        if(status === "wrong"){
            setStatus("none")
            setSelectedOption(undefined)
            return;
        };

        if(status === "correct"){
            onNext()
            setStatus("none")
            setSelectedOption(undefined)
            return
        };

        const correctOption = Options.find((option) => option.correct);
        // console.log(correctOption)
        if(!correctOption){
            return
        };

        if(correctOption.id === selectedOption){
            startTransition(()=> {
                upserChallengeProgress(challenge.id)
                .then((res) => {
                    if(res?.error === 'hearts'){
                        console.log("Missing hearts")
                        return
                    }

                    setStatus("correct")
                    setPercentage((prev) => prev + 100 / challenges.length)

                    if(initialPercentage === 100){
                        setHearts((prev)=> Math.min(prev + 1, 5))
                    }
                })
                .catch(()=> toast.error("Somthing went wrong. Please try again"))
            })
        } else {
            startTransition(()=> {
                reduceHearts(challenge.id)
                .then((res) => {
                    if(res?.error === 'hearts'){
                        console.log("Missing hearts")
                        return
                    }

                    setStatus("wrong")

                    if(!res?.error){
                        setHearts((prev)=> Math.max(prev - 1, 0))
                    }
                })
                .catch(()=> toast.error("Somthing went wrong. Please try again"))
            })
        }
    };

    const title = challenge.type === "ASSIST" 
    ? "Select the correct meaning" 
    : challenge.question;

  return (
    <>
        <Header 
            hearts={hearts}
            percentage={percentage}
            hasActiveSubscription={!!userSubscription?.isActive}
        />
        <div className="flex-1">
            <div className="h-full flex items-center justify-center">
                <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12 ">
                    <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                        {title}
                    </h1>
                    <div className="">
                        {challenge.type === "ASSIST" && (
                            <QuestionBubble question={challenge.question} />
                        )}
                        <Challenge 
                            options={Options}
                            onSelect={onSelect}
                            status={status}
                            selectOption={selectedOption}
                            disabled={pending}
                            type={challenge.type}
                        />
                    </div>
                </div>
            </div>
        </div>
        <Footer
            disabled={pending || !selectedOption}
            status={status}
            onCheck={onContinue}
        />
    </>
  )
}
