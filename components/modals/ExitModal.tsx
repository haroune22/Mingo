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
import { useExitModal } from "@/store/use-exit-modal"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Close } from "@radix-ui/react-dialog"
import { Button } from "../ui/button"

export const ExitModal = () => {
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const { isOpen, close } = useExitModal()

    useEffect(() => setIsClient(true), [])

    if(!isClient){
        return null
    }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="max-w-md">
            <div className="flex items-center w-full justify-center mb-5">
                <Image 
                    src="/mascot_sad.png"
                    alt="mascot_sad"
                    height={80}
                    width={80}
                    className="rounded-lg"
                />
            </div>
            <DialogTitle className="text-center font-bold text-2xl">
                Wait, don&apos;t go
            </DialogTitle>
            <DialogDescription className="text-center">
                You&apos;re about to leave the lesson, Are you sure?
            </DialogDescription>
            <DialogFooter className="mb-4">
                <div className="flex flex-col gap-y-4 w-full">
                    <Button 
                        variant="primary" 
                        className="w-full"
                        size="lg"
                        onClick={close}
                    >
                        keep learning
                    </Button>
                    <Button 
                        variant="dangerOutline" 
                        className="w-full"
                        size="lg"
                        onClick={()=> {
                            close();
                            router.push('learn')
                        }}
                    >
                        End Session
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
