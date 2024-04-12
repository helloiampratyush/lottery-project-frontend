import networkMapping from "../constants/mylotteryAddress.json";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import ContractAbi from "../constants/lotteryAbi.json";
import { Form, Input, useNotification, Button, Information } from "web3uikit";
import moment from "moment";

export default function token() {
    const { chainId,account, isWeb3Enabled } = useMoralis();
    const chainString = chainId ? parseInt(chainId).toString() : "11155111";
    const lotteryContractAddress = networkMapping[chainString].lottery[0];
    const { runContractFunction } = useWeb3Contract();
    const [tokenBalance, setTokenBalance] = useState("0");
    const [Streak, setStreak] = useState("0");
    const [lastloginTime, setLastLoginTime] = useState("0");
   const dispatch=useNotification();
    async function setupUITokinBalance() {
        const returnProceed = await runContractFunction({
            params: {
                abi: ContractAbi,
                contractAddress: lotteryContractAddress,
                functionName: "getTokenBalance",
            },
        });

        if (returnProceed) {
            setTokenBalance(returnProceed.toString());
        }
    }

    async function newBieBonus() {
        const newBieBonus = {
            abi: ContractAbi,
            contractAddress: lotteryContractAddress,
            functionName: "newBieBonus",
        };
        await runContractFunction({
            params: newBieBonus,
            onSuccess: handleSuccess,
            onError: (error) => console.log(error),
        });
    }

    async function login() {
        const loginhere = {
            abi: ContractAbi,
            contractAddress: lotteryContractAddress,
            functionName: "loginManagement1",
        };
        await runContractFunction({
            params: loginhere,
            onSuccess: handleSuccess,
            onError: (error) => console.log(error),
        });
    }
    const handleSuccess = async (tx) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "bonus claimed",
            title: "welcome",
            position: "topR",
        })
    }

    async function setupUIStreak() {
        const returnStreak = await runContractFunction({
            params: {
                abi: ContractAbi,
                contractAddress: lotteryContractAddress,
                functionName: "getYourStreak",
            },
        });

        if (returnStreak) {
            setStreak(returnStreak.toString());
        }
    }

    async function setupUILastTimeLog() {
        const returnLastLoginTime = await runContractFunction({
            params: {
                abi: ContractAbi,
                contractAddress: lotteryContractAddress,
                functionName: "getlatestLoginTime",
            },
        });

        if (returnLastLoginTime) {
            setLastLoginTime(returnLastLoginTime.toLocaleString());
        }
    }

    useEffect(() => {
        setupUITokinBalance();
        setupUIStreak();
        setupUILastTimeLog();
    }, [tokenBalance, Streak, lastloginTime,account, chainId, isWeb3Enabled,login,newBieBonus]);

    return (
        <div className="container mx-auto mt-24 items-center">
            <p className="text-center">🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊</p>
            <div className="text-4xl text-center my-2 font-bold">Welcome to the Token Management</div>
            
            <div className="text-fuchsia-900 my-6 mx-6 text-center text-2xl">
                <Information information={tokenBalance} topic="Your total token balance is" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center">
                <div className="text-2xl text-center my-4 text-lime-800">
                    If you are here for the first time, get a special token bonus by clicking&nbsp;
                    <button
                        onClick={newBieBonus}
                        type="button"
                        className="text-white my-3 mx-0 md:mx-2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        WELCOME BONUS
                    </button>
                </div>
                <div className="text-2xl text-center my-4 text-green-700">
                    If you have already claimed your newbie bonus, claim your daily login token bonus here&nbsp;
                    <button
                        onClick={login}
                        type="button"
                        className="text-white bg-gradient-to-r mx-0 md:mx-2 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        LOGIN BONUS
                    </button>
                </div>
            </div>
            <div className="my-6 mx-6 text-center">
                <Information information={Streak} topic="Your current streak is" />
            </div>
            <div className="my-4 text-3xl text-red-800 font-extrabold text-center">IMPORTANT</div>
            <div className="text-2xl text-emerald-800 text-center">
                Exchange your token to ETH (it will only execute if your token balance is greater than 100, please avoid
                clicking if less) 👇
            </div>
            <div className="flex justify-center">
                <button
                    type="button"
                    className="text-white bg-gradient-to-r my-4 from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                    EXCHANGE
                </button>
            </div>
            
            <div className="my-6 mx-6 text-center">
                <Information information={moment.unix(lastloginTime).format("DD-MM-YYYY HH:mm:ss")} topic="Your last bonus claiming time was" />
            </div>
        </div>
    );
}
