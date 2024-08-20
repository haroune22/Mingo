"use client"

import Image from "next/image"
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "../ui/dialog"
import { useHeartsModal } from "@/store/use-hearts-modal"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export const HeartsModal = () => {
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const { isOpen, close } = useHeartsModal()

    useEffect(() => setIsClient(true), [])

    if(!isClient){
        return null
    }

    const onClick = () => {
        close(),
        router.push("/store")
    };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="max-w-md">
            <div className="flex items-center w-full justify-center">
                <Image 
                    src="/mascot_bad.png"
                    alt="mascot_bad"
                    height={150}
                    width={150}
                />
            </div>
            <DialogTitle className="text-center font-bold text-2xl">
                You ran out of hearts 
            </DialogTitle>
            <DialogDescription className="text-center">
                Get pro for unlimated hearts or pusrchase them in the store
            </DialogDescription>
            <DialogFooter className="mb-4">
                <div className="flex flex-col gap-y-4 w-full">
                    <Button 
                        variant="primary" 
                        className="w-full"
                        size="lg"
                        onClick={onClick}
                    >
                        Get unlimated hearts
                    </Button>
                    <Button 
                        variant="primaryOutline" 
                        className="w-full"
                        size="lg"
                        onClick={close}
                    >
                        No thanks
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
