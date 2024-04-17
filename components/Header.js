import { ConnectButton } from "web3uikit";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            setVisible(
                (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10
            );
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos, visible]);

    return (
        <>
            <nav
                className={`p-2 bg-yellow-500 border-b-2 flex fixed top-0 w-full z-10 transition-all ${
                    visible ? "" : "-translate-y-full"
                }`}
            >
                <h1 className="py-4 px-4 font-bold text-3xl">Lottery</h1>
                <Link href="/">
                    <button className="mr-4 p-6 mx-9 hover:text-slate-100 focus:ring focus:ring-violet-300 hover:bg-sky-700 active:bg-violet-700">HOME</button>
                </Link>
                <div className="flex flex-grow mr-4 justify-end">
                    <ConnectButton moralisAuth={false} />
                </div>
            </nav>
            <div className="h-20"></div> {/* Placeholder to prevent content from being obscured by fixed navbar */}
        </>
    );
}
