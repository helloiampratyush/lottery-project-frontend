import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="container mx-auto mt-24 items-center">
            {/* DApps Section */}
            <motion.div 
                className="my-8 px-4 py-6 bg-gray-100 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Decentralized Applications (DApps):</h2>
                <p className="text-lg text-gray-700 mb-2">
                    Decentralized applications (DApps) are applications that run on a decentralized network, such as a blockchain. They offer various advantages, including:
                </p>
                <ul className="list-disc ml-6">
                    <li className="text-gray-700 mb-2">
                        <strong>Transparency:</strong> DApps are transparent as all transactions and operations are recorded on a public ledger, providing accountability and trust.
                    </li>
                    <li className="text-gray-700 mb-2">
                        <strong>Security:</strong> Since DApps run on a decentralized network, they are less vulnerable to hacking and censorship.
                    </li>
                    <li className="text-gray-700 mb-2">
                        <strong>Trustless Transactions:</strong> DApps enable peer-to-peer transactions without the need for intermediaries, reducing transaction costs and increasing efficiency.
                    </li>
                </ul>
            </motion.div>
            <motion.div 
                className="my-8 px-4 py-6 bg-gray-100 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            > 
             <div className="flex justify-center">
                    <div className="flex flex-col">
                        <div className="text-2xl text-stone-600 m-6 text-center"> Short Tour</div>
                        <div className="flex flex-row justify-center">
                            <div className="m-4">
                                <video width="320" height="240" controls preload="none">
                                    <source src="/v1.mp4" type="video/mp4" />
                                </video>
                            </div>
                            <div className="m-4">
                                <video width="320" height="240" controls preload="none">
                                    <source src="/V2.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div> 
            </motion.div>

            {/* Flowchart Section */}
            <motion.div 
                className="my-8 px-4 py-6 bg-gray-100 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
            >
                <h1 className="bg-white my-5 font-bold text-3xl text-center">FLOWCHART</h1>
                <Image 
                    src="/flowchart.png"
                    width={1800}
                    height={600}
                    alt="Picture of the author"
                />
                <p className="text-center my-5">
                    flowchart of our backend
                </p>
            </motion.div>
            
            {/* Main Content */}
            <motion.div 
                className="my-8 px-4 py-6 bg-gray-100 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 1 }}
            >
                <h1 className="my-5 text-2xl font-bold text-red-500">Hi! To access every feature of the lottery app, you have to learn about wallets. Here's a setup link:</h1>
                <div className="flex flex-row items-center">
                    <div className="text-2xl text-violet-800">Account setup link: </div>
                    <a className="text-2xl ml-2" href="https://www.youtube.com/watch?v=Af_lQ1zUnoM">CLICK</a>
                </div>
                <div className="text-2xl my-4 font-bold text-center">Setup done! Click on connect wallet, set test network to sepolia and click the link below to enter lottery world</div>
                <div className="flex justify-center flex-row my-5">
                    <div className="text-3xl text-green-700">Go to the token management 👉 </div>
                    <a href="/token" className="text-3xl bg-orange-500 mx-5 "> Token</a>
                </div>
                <div className="flex justify-center flex-row">
                    <div className="text-3xl text-green-700">Go to lottery 👉 </div>
                    <a href="/lottery" className="text-3xl bg-red-800 mx-5 "> Lottery</a>  
                </div>  
            </motion.div>
            
            {/* Educational Content Section */}
            <motion.div 
                className="my-8 px-4 py-6 bg-gray-100 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.5, duration: 1 }}
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Educational Content:</h2>
                <p className="text-lg text-gray-700 mb-2">
                    Here are some resources to help you understand the basics of cryptocurrencies and blockchain technology:
                </p>
                <ul className="list-disc ml-6">
                    <li className="text-blue-600 cursor-pointer">
                        <a href="https://www.blockchain.com/learn/crypto101">Blockchain.com's Crypto 101</a> - A comprehensive guide to cryptocurrencies and blockchain technology.
                    </li>
                    <li className="text-blue-600 cursor-pointer">
                        <a href="https://www.coindesk.com/learn/bitcoin-101">CoinDesk's Bitcoin 101</a> - An introduction to Bitcoin, the first and most well-known cryptocurrency.
                    </li>
                    <li className="text-blue-600 cursor-pointer">
                        <a href="https://ethereum.org/en/learn/">Ethereum.org's Learn Section</a> - Resources to learn about Ethereum and smart contracts.
                    </li>
                </ul>
                <p className="text-lg text-gray-700 mt-4">
                    You can hover over complex terms or processes in the app to see tooltips with brief explanations.
                </p>
            </motion.div>
        </div>
    );
}
