import { gql } from "@apollo/client";

const GET_LOTTERY_WINNER_ANNOUNCEMENT = gql`
{
    winnerPickeds(first : 5){
        id
        lotteryCounter
        winner
      }
  
    }
`
export default GET_LOTTERY_WINNER_ANNOUNCEMENT;