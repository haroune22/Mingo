import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";



type Porps = {
    title: string;
    description: string;
}


export const UnitBanner = ({
    description,
    title
}:Porps) => {
  return (
    <div className="w-full rounded-lg bg-green-500 p-5 text-white flex items-center justify-between">
        <div className="space-y-2.5">
            <h3 className="text-2xl font-bold">
                {title}
            </h3>
            <p className="text-lg">
                {description}
            </p>
        </div>
        <Link href="/lesson" >
            <Button 
                variant="secondary" 
                size="lg"
                className="hidden xl:flex border-2 border-b-4 active:border-b-2"
            >
                <NotebookText className="mr-2"/>
                Continue
            </Button>
        </Link>
    </div>
  )
}
