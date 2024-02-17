import SidebarMenu from "./_SidebarMenu";

function SidebarModeDesktop() {
    return (
        <aside className="z-20 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block">
            <div className="py-4 text-gray-500 dark:text-gray-400">
                <a
                    className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
                    href="/"
                >
                    Book Management
                </a>
                <SidebarMenu />
            </div>
        </aside>
    );
}

export default SidebarModeDesktop;
