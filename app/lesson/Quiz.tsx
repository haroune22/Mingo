"use client"

import { Header } from "./Header";
import { QuestionBubble } from "./QuestionBubble";
import { Challenge } from "./Challenge";
import { Footer } from "./Footer";
import { ResultCard } from "./ResultCard";
import Confetti from "react-confetti"

import { upserChallengeProgress } from "@/actions/challenge_progress";
import { challengeOptions, challenges } from "@/db/schema";
import { reduceHearts } from "@/actions/user-progress";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useAudio, useMount, useWindowSize } from "react-use";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";




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

    const { open: openHeartModal, } = useHeartsModal();
    const { open: openPracticeModal, } = usePracticeModal();

    useMount(()=> {
        if(initialPercentage === 100){
            openPracticeModal()
        }
    });
    
    const { width, height } = useWindowSize();

    const [pending, startTransition] = useTransition();

    const [correctAudio, _c, correctControls] = useAudio({src: "/correct.mp3" });
    const [incorrecttAudio, _i, incorrecttControls] = useAudio({src: "/incorrect.wav" });

    const [lessonId] = useState(initialLessonId);

    const router = useRouter();

    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(()=> initialPercentage === 100 ? 0 : initialPercentage);

    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(()=> {
        const uncompletedIndex = challenges.findIndex(c => !c.completed)
        return uncompletedIndex === -1 ? 0 : uncompletedIndex
    });

    const [selectedOption, setSelectedOption ]= useState<number>();
    const [status, setStatus ]= useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex]
    const Options = challenge?.challengeOptions;

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
                        openHeartModal()
                        return
                    };

                    setStatus("correct")
                    correctControls.play()

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
                        openHeartModal()
                        return
                    }

                    setStatus("wrong")
                    incorrecttControls.play()
                    if(!res?.error){
                        setHearts((prev)=> Math.max(prev - 1, 0))
                    }
                })
                .catch(()=> toast.error("Somthing went wrong. Please try again"))
            })
        }
    };

    if(!challenge){
        return (
            <>
            <Confetti 
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={500}
                tweenDuration={1000}
            />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto items-center justify-center text-center h-full ">
                    <Image 
                        src='/finish.png'
                        alt="finish"
                        height={100}
                        width={100}
                        className="hidden lg:block"
                    />
                    <Image 
                        src='/finish.png'
                        alt="finish"
                        height={50}
                        width={50}
                        className="block lg:hidden"
                    />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                        Great job <br/> You&apos;ve completed the lesson.
                    </h1>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard
                            variant='points'
                            value={challenges.length * 10}
                        />
                        <ResultCard
                            variant='hearts'
                            value={hearts}
                        />
                    </div>
                </div>
                <Footer
                    disabled={pending}
                    status="completed"
                    lessonId={lessonId}
                    onCheck={()=>{router.push('/learn')}}
                />
            </>
        )
    }

    const title = challenge.type === "ASSIST" 
    ? "Select the correct meaning" 
    : challenge.question;

  return (
    <>
        {incorrecttAudio}
        {correctAudio}
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
