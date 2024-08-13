import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Sidebar } from "./Sidebar"
  

export const MobileSideBar = () => {
  return (
    <div>
        <Sheet>
            <SheetTrigger>
                <Menu className="text-white" />
            </SheetTrigger>
            <SheetContent className="p-0 z-[100]" side="left">
                <Sidebar/>
            </SheetContent>
        </Sheet>
    </div>
  )
}
