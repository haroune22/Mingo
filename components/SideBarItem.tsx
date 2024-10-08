"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";


type Props = {
    label: string,
    iconSrc: string,
    href: string
}

export const SideBarItem = ({
    href,
    iconSrc,
    label
}: Props) => {

    const pathname = usePathname();
    const active = pathname === href

  return (
    <Button 
        variant={active ? "sidebarOutline" : "sidebar"} 
        className="justify-start h-[52px]"
    >
        <Link href={href} className="flex items-center justify-center">
        <Image 
            src={iconSrc} 
            alt={label} 
            className="mr-5"
            height={34}
            width={34}
        />
            {label}
        </Link>
    </Button>
  )
}
