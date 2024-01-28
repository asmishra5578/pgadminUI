import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import moment from "moment"
const config = useEazy.econfig

export default class requests {

    getpayoutwallettransfer(data) {
        return axios({
            method: "POST",
            headers: { 
                merchantid: useEazy.getMerchantUuid()
              },
            url: `${config.payoutwallettransfer}`,
            data
        })
    }
    getpayouttransactionReport(fromDate, toDate) {
        return axios({
            method: "POST",
            headers: { 
                      merchantid: useEazy.getMerchantUuid()
                    },
            url: `${config.payouttransactionReport}`,
            data: {
                 fromDate,
                 toDate
            }
        })
    }
    getpayoutaccountTransfer(data) {
        return axios({
            method: "POST",
            headers: { 
                merchantid: useEazy.getMerchantUuid()
              },
            url: `${config.payoutaccountTransfer}`,
            data
        })
    }
    getpayouttransactionStatus(data) {
        return axios({
            method: "POST",
            headers: { 
                merchantid: useEazy.getMerchantUuid()
              },
            url: `${config.payouttransactionStatus}`,
            data: {orderId:data}
        })
    }
    getpayoutbalanceCheck() {
        return axios({
            method: "GET",
            headers: { 
                merchantid: useEazy.getMerchantUuid()
              },
            url: `${config.payoutbalanceCheck}`
        })
    }
}