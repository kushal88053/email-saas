"use client";

import { HeroUIProvider } from "@heroui/react";
import { usePathname } from 'next/navigation';

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    const pathname = usePathname();

    const isSpecialRoute =
        pathname == "/dasgboard/new-email" ||
        pathname === "/" ||
        pathname === "/singup" ||
        pathname === "/subscribe" ||
        pathname === "/sign-in";

    return (
        <HeroUIProvider>
            {isSpecialRoute ? (
                children
            ) : (
                <div className="w-full flex">
                    <div className="w-[290px] h-screen overflow-y-scroll"></div>
                </div>
            )}
        </HeroUIProvider>
    );
}
