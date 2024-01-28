import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid
// console.log("uuid", uuid)

export default class requests  {
    payoutwalletFilterReport(startdate, enddate, merchantid, creditdebit, walletid, transactionid, statuss, transactiontype) {
        return axios({
            method: "GET",
            url: `${config.payoutwalletFilterReport}?uuid=${uuid}&fromDate=${startdate}&toDate=${enddate}&merchantId=${merchantid}&credit_debit=${creditdebit}&walletId=${walletid}&transactionId=${transactionid}&status=${statuss}&transactionType=${transactiontype}`
          })
    }
}