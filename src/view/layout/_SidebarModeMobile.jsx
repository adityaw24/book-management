"use client";
import { usePathname } from "next/navigation";
import SidebarMenu from "./_SidebarMenu";
import { useEffect, useState } from "react";

function SidebarModeMobile({ closeSideMenu }) {
    const pathname = usePathname();
    const [isRenderFirstTime, setIsRenderFirstTime] = useState(true);

    useEffect(() => {
        if (isRenderFirstTime) setIsRenderFirstTime(false);
        else closeSideMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <>
            <div
                // transition:fade={{ duration: 200 }}
                className="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
            />
            <aside
                // use:clickOutside
                // on:click_outside={closeSideMenu}
                // transition:fly={{ duration: 200, x: '-2rem' }}
                className="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden"
            >
                <div className="py-4 text-gray-500 dark:text-gray-400">
                    <a
                        href="/"
                        className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
                    >
                        Book Management
                    </a>

                    <SidebarMenu />
                </div>
            </aside>
        </>
    );
}

export default SidebarModeMobile;
