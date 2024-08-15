"use client"

type Props = {
    id:number;
    index:number;
    totalCount: number;
    locked?:boolean;
    current: boolean;
    percentage:number;
}

export const LessonButton = ({
    current,
    id,
    index,
    percentage,
    totalCount,
    locked
}:Props) => {
  return (
    <div>
        { id }
        
    </div>
  )
}
