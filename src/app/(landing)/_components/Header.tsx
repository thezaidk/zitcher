"use client"

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { links } from "@/lib/data"
import Link from "next/link";
import clsx from "clsx";

export const Header = () => {
    const pathname = usePathname();

    return (
        <header className="flex justify-center items-center z-[999] relative">
            <motion.div 
                className="fixed top-0 h-[4rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full"
                initial={{ y: -100, x: "0%", opacity: 0 }}
                animate={{ y: 0, x: "0%", opacity: 1 }}
            >
                <nav className="flex h-full justify-between items-center px-4">
                    <div 
                        className="flex items-center"
                    >
                        <h1><Link href={"/"} className="text-lg text-gray-900">ZITCHER</Link></h1>
                    </div>
                    <ul className="flex h-full items-center justify-center gap-y-1 font-medium text-gray-500 sm:flex-nowrap sm:gap-5">
                        {links.map(link => (
                            <motion.li
                                className="flex items-center justify-center relative"
                                key={link.path}
                                initial={{ y: -30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                            >
                                <Link 
                                    href={link.path}
                                    className={clsx(
                                        "flex w-full items-center justify-center px-3 py-1 text-xs md:text-base hover:text-gray-950 transition",
                                        {
                                            "text-gray-950": pathname === link.path,
                                        }
                                    )}
                                >
                                    {link.name}
                                    {link.path === pathname && (
                                    <motion.span
                                        className="bg-purple-100 rounded-full absolute inset-0 -z-10"
                                        layoutId="activeSection"
                                        transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30,
                                        }}
                                    ></motion.span>
                                    )}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                    <div className="flex items-center border rounded-lg px-2 py-1">
                        <Link href="/auth/signin">
                            <span className="text-sm font-semibold">
                                Signin
                            </span>
                        </Link>
                    </div>
                </nav>
            </motion.div>
        </header>
    );
};
