"use client";
import { LogOut, Settings, User } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "~/store/auth-store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import iconConf from "~/libs/iconConf";

function Header({ toggleSideMenu }) {
    const router = useRouter();
    const resetAuthState = useAuthStore((state) => state.resetState);

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    function toggleProfileMenu() {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    }

    function closeProfileMenu() {
        setIsProfileMenuOpen(false);
    }

    function logoutProcess() {
        resetAuthState();
        router.replace("/");
    }

    return (
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
            <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 md:flex-row-reverse dark:text-purple-300">
                {/* Mobile hamburger */}
                <button
                    className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
                    onClick={toggleSideMenu}
                    aria-label="Menu"
                >
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                <ul className="flex items-center flex-shrink-0 space-x-6">
                    {/* Profile menu */}
                    <li className="relative">
                        <button
                            className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                            onClick={toggleProfileMenu}
                            aria-label="Account"
                            aria-haspopup="true"
                        >
                            <Image
                                className="object-cover w-8 h-8 rounded-full"
                                src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                                alt=""
                                aria-hidden="true"
                                width={30}
                                height={30}
                            />
                        </button>

                        {isProfileMenuOpen && (
                            <ul
                                // use:clickOutside
                                // onClick_outside={closeProfileMenu}
                                // transition:flyAndScale
                                className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 transition duration-200 ease-out bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
                                aria-label="submenu"
                            >
                                <li className="flex">
                                    <a
                                        className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                        href="/"
                                    >
                                        <User {...iconConf} />
                                        <span className="ml-4">Profile</span>
                                    </a>
                                </li>
                                <li className="flex">
                                    <a
                                        className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                        href="/"
                                    >
                                        <Settings {...iconConf} />
                                        <span className="ml-4">Settings</span>
                                    </a>
                                </li>
                                <li className="flex">
                                    <button
                                        onClick={logoutProcess}
                                        className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                    >
                                        <LogOut {...iconConf} />
                                        <span className="ml-4">Log out</span>
                                    </button>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
