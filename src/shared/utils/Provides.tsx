"use client";

import { HeroUIProvider } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import DashboardSideBar from "@/shared/widgets/dashboard/layout/sidebar/dashboard.sidebar";
import { Toaster } from "react-hot-toast";
import { addStripe } from "@/actions/add.stripe";
import { useEffect } from "react";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    const pathname = usePathname();
    const { isLoaded, user } = useUser();

    // Call Stripe setup only when user is loaded and available
    useEffect(() => {
        if (isLoaded && user) {
            addStripe();
        }
    }, [isLoaded, user]);

    if (!isLoaded) {
        return null; // avoid rendering until user data is ready
    }

    const isSpecialRoute = [
        "/dashboard/new-email",
        "/",
        "/sign-up",
        "/subscribe",
        "/sign-in",
    ].includes(pathname);

    return (
        <HeroUIProvider>
            {isSpecialRoute ? (
                children
            ) : (
                <div className="w-full flex">
                    <div className="w-[290px] h-screen overflow-y-scroll">
                        <DashboardSideBar />
                    </div>
                    <div className="flex-1">{children}</div>
                </div>
            )}
            <Toaster position="top-center" reverseOrder={false} />
        </HeroUIProvider>
    );
}
