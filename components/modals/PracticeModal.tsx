"use client"

import Image from "next/image"
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle
} from "../ui/dialog"
import { usePracticeModal } from "@/store/use-practice-modal"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"

export const PracticeModal = () => {

    const [isClient, setIsClient] = useState(false)
    const { isOpen, close } = usePracticeModal()

    useEffect(() => setIsClient(true), [])

    if(!isClient){
        return null
    }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="max-w-md">
            <div className="flex items-center w-full justify-center">
                <Image 
                    src="/heart.png"
                    alt="heart"
                    height={100}
                    width={100}
                />
            </div>
            <DialogTitle className="text-center font-bold text-2xl">
                Practice Lessons
            </DialogTitle>
            <DialogDescription className="text-center">
                Use practice lessons to regain hearts and points. You cannot loose hearts or points in practice lessons.
            </DialogDescription>
            <DialogFooter className="mb-4">
                <div className="flex flex-col gap-y-4 w-full">
                    <Button 
                        variant="primary" 
                        className="w-full"
                        size="lg"
                        onClick={close}
                    >
                        I Understand
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
