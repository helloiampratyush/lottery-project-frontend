import { gql } from "@apollo/client";

const GET_LOTTERY_ANNOUNCEMENT = gql`
{

  lotteryAnnounceMents(first: 5) {
        id
        counterNo
        minplayers
        entranceFee
        endTime
        timeStamp
      }
    }
`
export default GET_LOTTERY_ANNOUNCEMENT;