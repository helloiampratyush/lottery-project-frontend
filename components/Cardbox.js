import React, { useEffect, useState } from 'react';
import networkMapping from "../constants/mylotteryAddress.json";
import { useMoralis, useWeb3Contract } from "react-moralis";
import ContractAbi from "../constants/lotteryAbi.json";
import { Card, useNotification } from "web3uikit";
import moment from "moment";

export default function CARDBox({
    counterNo,
    minplayers,
    entranceFee,
    endTime,
    timeStamp
}) {
    const { chainId } = useMoralis();
    const chainString = chainId ? parseInt(chainId).toString() : "11155111";
    const lotteryAddress = networkMapping[chainString].lottery[0];
    const { runContractFunction } = useWeb3Contract();
    const [isActive, setIsActive] = useState(true);
    const [isStatusActive,setStatusActive]=useState(true);
    const dispatch=useNotification();
    const updatedStatus=async()=>{
        const chaeckStatus=await runContractFunction({
           params:{ abi: ContractAbi,
            contractAddress: lotteryAddress,
            functionName: "checkLotteryStatus",
            params:{
                _lotteryCounter:counterNo
            } 
         }
    }
)           
if(chaeckStatus){
                setStatusActive(chaeckStatus);
} 
       
        }
    
   

    const handleClick = async () => {
        if (!isActive) {
            // Show message that lottery has ended
            return;
        }
        const enterlottery = {
            abi: ContractAbi,
            contractAddress: lotteryAddress,
            msgValue: entranceFee,
            functionName: "enterLottery",
            params: {
                _lotteryCounter: counterNo
            }
        };
        await runContractFunction({
            params: enterlottery,
            onSuccess: handleSuccess,
            onError: (error) => console.log(error)
        });
    };

    const handleSuccess = async (tx) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "entered to lottery",
            title: "welcome",
            position: "topR",
        })
        
    };
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const isLotteryActive = endTime * 1000 > currentTime;
            setIsActive(isLotteryActive);
        }, 1000);
        updatedStatus()
        return () => clearInterval(interval)
       
    }, [endTime,counterNo]);

    return (
        <div className="my-4 mx-auto"> {isStatusActive ?
            (<Card title={''} description={''} onClick={handleClick} className="w-full md:w-96">
                <div className="p-4">
                    <div className="flex flex-col gap-2">
                        <div>Counter No. {counterNo}</div>
                        <div className="my-2">
                            <div className="my-2 text-green-700">
                                Start Time (IST): {moment.unix(timeStamp).format("DD-MM-YYYY HH:mm:ss")}
                            </div>
                            <div className="my-2 text-red-900">
                                End Time (IST): {moment.unix(endTime).format("DD-MM-YYYY HH:mm:ss")}
                            </div>
                        </div>
                        <div>**************************</div>
                        <div className="text-xl font-bold text-red-800">Condition</div>
                        <div className="font-bold">Minimum Players Requirement: {minplayers}</div>
                        <div>**************************</div>
                        <div className="font-bold">Participants Reward: 5 Token</div>
                        <div className="font-bold">Entrance Fee: {entranceFee / 1e18} ETH</div>
                        <div className="font-bold">{isActive ? "Active" : "Ended"}</div>
                    </div>
                </div>
            </Card>):(<div></div>)}
        </div>
    );
}
