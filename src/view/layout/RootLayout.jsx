"use client";
import { useState } from "react";

import SidebarModeDesktop from "./_SidebarModeDesktop";
import SidebarModeMobile from "./_SidebarModeMobile";
import Header from "./_Header";

function RootLayout({ children }) {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);
    const closeSideMenu = () => setIsSideMenuOpen(false);

    return (
        <>
            <div
                className={`
					${isSideMenuOpen ? "overflow-hidden" : ""}
					flex h-screen
				`}
                // class:overflow-hidden={isSideMenuOpen}
                // in:fade={{ duration: 200, delay: 250 }}
                // out:fade={{ duration: 200 }}
            >
                <SidebarModeDesktop />

                {isSideMenuOpen && (
                    <SidebarModeMobile closeSideMenu={closeSideMenu} />
                )}

                <div className="flex flex-col flex-1">
                    <Header toggleSideMenu={toggleSideMenu} />
                    <main className="h-full overflow-y-auto bg-neutral">
                        <div
                            // in:fly={{ y: 25, duration: 200, delay: 250 }}
                            // out:fly={{ y: 25, duration: 200 }}
                            // key={location.pathname}
                            className="container p-10 mx-auto"
                        >
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default RootLayout;
