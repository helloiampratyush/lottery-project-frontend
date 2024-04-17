import { ConnectButton } from "web3uikit";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false); // State to track if the mobile menu is open

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

    // Function to toggle mobile menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <nav
                className={`items-center p-2 bg-yellow-500 border-b-2 flex flex-row fixed top-0 w-full z-10 transition-all ${
                    visible ? "" : "-translate-y-full"
                }`}
            >
                <h1 className="py-4 px-4 font-bold text-3xl">Lottery</h1>
                <button className="mr-4 p-6 mx-9 hover:text-slate-100 focus:ring focus:ring-violet-300 hover:bg-sky-700 active:bg-violet-700" onClick={toggleMenu}>MENU</button>
                <div className="flex flex-grow mr-4 justify-end">
                    <ConnectButton moralisAuth={false} />
                </div>
            </nav>
            {/* Collapsible mobile menu */}
            <div className={`fixed top-0 left-0 h-full w-full bg-yellow-500 transition-all ${menuOpen ? "visible" : "invisible"}`}>
                <div className="flex flex-col items-center justify-center h-full">
                    <Link href="/">
                        <button className="my-4 p-6 mx-9 hover:text-slate-100 focus:ring focus:ring-violet-300 hover:bg-sky-700 active:bg-violet-700" onClick={toggleMenu}>HOME</button>
                    </Link>
                    {/* Add more menu items as needed */}
                </div>
            </div>
            <div className="h-20"></div> {/* Placeholder to prevent content from being obscured by fixed navbar */}
        </>
    );
}

