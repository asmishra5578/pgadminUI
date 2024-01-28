import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid
// console.log("uuid", uuid)

export default class requests  {
    getByMerchantWisePgWiseSum(startdate, enddate, states) {
        return axios({
            method: "GET",
            url: `${config.getByMerchantWisePgWiseSum}?uuid=${uuid}&start_date=${startdate}&end_date=${enddate}&status=${states}`
            // url:`${config.dateWiseTxnWithParameters}?uuid=${uuid}&start_date=2021-06-25&end_date=2021-07-17&merchant_id=624651865043&pgType=LETZPAY&payment_option=upi&merchant_order_id=16246527235863&trId=1&pg_id=2`
          })
    }
}