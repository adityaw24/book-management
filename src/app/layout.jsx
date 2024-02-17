import { Inter } from "next/font/google";
import "./globals.css";
import { RootLayout as Layout } from "~/view/layout";
import Link from "next/link";
import { Button } from "~/component";
import { Menu } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Book Management",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Layout>{children}</Layout>
                {/* <div className="sticky drawer">
                    <input
                        id="my-drawer-3"
                        type="checkbox"
                        className="drawer-toggle"
                    />
                    <div className="flex flex-col h-screen drawer-content">
                        <div className="w-full navbar bg-base-300">
                            <div className="flex-none lg:hidden">
                                <Button
                                    Icon={Menu}
                                    aria-label="open sidebar"
                                    className="btn btn-square btn-ghost"
                                />
                            </div>
                            <div className="items-center justify-center flex-1 hidden gap-12 lg:flex">
                                <Link href="/">User</Link>
                                <Link href="/">Blog Post</Link>
                            </div>
                        </div>
                        <main className="flex-1 h-full pb-16 overflow-y-auto">
                            <div className="container px-6 mx-auto">
                                {children}
                            </div>
                        </main>
                    </div>
                    <div className="drawer-side">
                        <label
                            htmlFor="my-drawer-3"
                            aria-label="close sidebar"
                            className="drawer-overlay"
                        ></label>
                        <div className="flex flex-col min-h-full gap-6 p-4 menu w-80 bg-base-200">
                            <Link href="/">User</Link>
                            <Link href="/">Blog Post</Link>
                        </div>
                    </div>
                </div> */}
            </body>
        </html>
    );
}
