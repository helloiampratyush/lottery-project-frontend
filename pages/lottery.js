import networkMapping from "../constants/mylotteryAddress.json";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useQuery } from "@apollo/client";
import GET_LOTTERY_ANNOUNCEMENT from "../constants/graphQuery1";
import CARDBox from "../components/Cardbox";
import { Input, useNotification } from "web3uikit";
import { useState } from "react";
import ContractAbi from "../constants/lotteryAbi.json";
import GET_LOTTERY_WINNER_ANNOUNCEMENT from "../constants/graphquery2";

export default function Lottery() {
    const { chainId, isWeb3Enabled } = useMoralis();
    const [number, setNumber] = useState('0');
    const chainString = chainId ? parseInt(chainId).toString() : "11155111";
    const lotteryAddress = networkMapping[chainString]?.lottery[0]; // Added null check for lotteryAddress
    const { loading, error, data: data1 } = useQuery(GET_LOTTERY_ANNOUNCEMENT);
    const { loading: loading1, error: error1, data: data2 } = useQuery(GET_LOTTERY_WINNER_ANNOUNCEMENT);
    const { runContractFunction } = useWeb3Contract();
    const handleRefund = async () => {
        const refund = {
            abi: ContractAbi,
            contractAddress: lotteryAddress,
            functionName: "getYourRefund",
            params: {
                _lotteryCounter: number
            }
        };
        await runContractFunction({
            params: refund,
            onSuccess: (tx) => console.log("refund claimed"),
            onError: (error) => console.log(error),
        });
    };

    return (
        <div className="container mx-auto mt-24">
            <h1 className="py-4 px-4 font-bold text-2xl text-center"> CURRENT LOTTERY</h1>

            <div className="flex flex-wrap my-2 justify-center"style={{ margin: "-0.5rem" }} > {/* Adjust gap-4 to control the spacing */}
                {loading || !data1 ? (
                    <div>Loading...</div>
                ) : ( 
                    data1.lotteryAnnounceMents.map((lottery) => {
                        const { counterNo, minplayers, entranceFee, endTime, timeStamp } = lottery;
                        return lotteryAddress ? (
                            <CARDBox
                                counterNo={counterNo}
                                minplayers={minplayers}
                                entranceFee={entranceFee}
                                endTime={endTime}
                                timeStamp={timeStamp}
                                key={`${counterNo}${entranceFee}`}
                            />
                        ) : (
                            <div key={counterNo}>Network error, please switch to a supported network. </div>
                        );
                    })
                )}
            </div>

            <div className="bg-stone-200 my-3">
                <div className="text-2xl text-red-900 my-5 mx-3">
                    Refunding of a particular lottery counter will only work if the condition has not been fulfilled, and the refund will be available after 24 hours after the deadline of the particular lottery.
                </div>
            </div>

            <div className="flex justify-center  my-10">
                <Input
                    label="Lottery Counter"
                    name="Test text Input"
                    type="number"
                    onChange={(event) => {
                        setNumber(event.target.value)
                    }}
                />
            </div>

            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={handleRefund}
                    className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                    Apply
                </button>
            </div>

            <div className="my-8 text-slate-600 text-2xl text-center">
                Watch Winner announced  👇
            </div>

            {!loading1 && data2 ? (
                data2.winnerPickeds.map((announcing) => {
                    const { lotteryCounter, winner } = announcing;

                    return (
                        <div key={lotteryCounter} className="bg-gray-500 text-center my-3 p-2">
                            <p>Lottery Counter: {lotteryCounter}</p>
                            <p>Winner: {winner}</p>
                        </div>
                    );
                })
            ) : (
                <div className="text-center">No winner announced yet or data not available.</div>
            )}
        </div>
    );
}
