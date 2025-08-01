"use client";

import { HeroUIProvider } from "@heroui/react";
import { usePathname } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import Dashboard from "@/modules/dashboard";
import DashboardSideBar from "@/shared/widgets/dashboard/layout/sidebar/dashboard.sidebar";
import { Toaster } from "react-hot-toast";
interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    const pathname = usePathname();
    const { isLoaded, user } = useUser();

    const isSpecialRoute =
        pathname === "/dashboard/new-email" ||
        pathname === "/" ||
        pathname === "/sign-up" ||
        pathname === "/subscribe" ||
        pathname === "/sign-in";

    return (
        <HeroUIProvider>
            {isSpecialRoute ? (
                children
            ) : (
                <div className="w-full flex">
                    <div className="w-[290px] h-screen overflow-y-scroll">
                        <DashboardSideBar />
                    </div>
                    {children}
                </div>
            )}
            <Toaster position="top-center" reverseOrder={false} />
        </HeroUIProvider>
    );
}
