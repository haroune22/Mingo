"use client"

import { courses, userProgress } from "@/db/schema"
import { Card } from "./Card"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { upserUserProgress } from "@/actions/user-progress"
import { toast } from "sonner"


type Props = {
    courses: typeof courses.$inferSelect[],
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId,
}

export const List = ({
    activeCourseId,
    courses
}:Props) => {

    const router = useRouter();
    const [pending, startTransaction] = useTransition();

    const onClick = (id:number) => {

        if(pending) return;

        if(id === activeCourseId) {
            return router.push('/learn')
        };
        // console.log(id)

        startTransaction(()=> {
            upserUserProgress(id)
            .catch(() => toast.error("Somthing went wrong"))
        })

    };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 ">
        {courses.map((course) => (
            <Card 
                key={course.id}
                id={course.id}
                title={course.title}
                imageSrc={course.imageSrc}
                onClick={onClick}
                disabled={pending}
                active={course.id === activeCourseId}
            />
        ))}
    </div>
  );
};