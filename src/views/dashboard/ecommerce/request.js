import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid

export default class requests {
    adminDetails() {
        return axios({
            method: "GET",
            url: `${config.adminDetails}?uuid=${uuid}`
        })
    }
    merchantTransactionLastDay() {
        return axios({
            method: "GET",
            url: `${config.merchantTransactionLastDay}?uuid=${uuid}`
        })
    }
    merchantTransactionToday() {
        return axios({
            method: "GET",
            url: `${config.merchantTransactionToday}?uuid=${uuid}`
        })
    }
    merchantTransactionCurrMonth() {
        return axios({
            method: "GET",
            url: `${config.merchantTransactionCurrMonth}?uuid=${uuid}`
        })
    }
    merchantTransactionLastMonth() {
        return axios({
            method: "GET",
            url: `${config.merchantTransactionLastMonth}?uuid=${uuid}`
        })
    }
    getAllTopMerchantTxn() {
        return axios({
            method: "GET",
            url: `${config.getAllTopMerchantTxn}?uuid=${uuid}`
        })
    }
    getTotalNoOfMerchants() {
        return axios({
            method: "GET",
            url: `${config.getTotalNoOfMerchants}?uuid=${uuid}`
        })
    }
    merchantStatus() {
        return axios({
            method: "GET",
            url: `${config.merchantStatus}?uuid=${uuid}`
        })
    }
    getNumberOfTxnWithStatus(statuss) {
        return axios({
            method: "GET",
            url: `${config.getNumberOfTxnWithStatus}?uuid=${uuid}&status=${statuss}`
        })
    }
    getComplaintDasboard(fromdate, todate) {
        return axios({
            method: "GET",
            url: `${config.getComplaintDasboard}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}&status=&complaintid`
        })
    }
    getTotalCancelledTransaction(fromdate, todate) {
        return axios({
            method: "GET",
            url: `${config.getTotalCancelledTransaction}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}`
        })
    }
    getTotalRefund(fromdate, todate) {
        return axios({
            method: "GET",
            url: `${config.getTotalRefund}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}`
        })
    }
    getTotalCaptured(fromdate, todate) {
        return axios({
            method: "GET",
            url: `${config.getTotalCaptured}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}`
        })
    }
    getTotalHitTransaction(fromdate, todate) {
        return axios({
            method: "GET",
            url: `${config.getTotalHitTransaction}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}`
        })
    }
    getTotalTransaction(fromdate, todate) {
        return axios({
            method: "GET",
            url: `${config.getTotalTransaction}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}`
        })
    }
    getTotalUnSettledAmount(fromDate, todate) {
        return axios({
            method: "GET",
            url: `${config.getTotalUnSettledAmount}?uuid=${uuid}&start_date=${fromDate}&end_date=${todate}`
        })
    }
    getTotalSettledAmount(fromDate, todate) {
        return axios({
            method: "GET",
            url: `${config.getTotalSettledAmount}?uuid=${uuid}&start_date=${fromDate}&end_date=${todate}`
        })
    }
    getTotalPayOptionTransaction(fromdate, todate) {
        const endpoints = [
            `${config.getTotalPayOptionTransaction}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}&payment_option=UPI`,
            `${config.getTotalPayOptionTransaction}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}&payment_option=WALLET`,
            `${config.getTotalPayOptionTransaction}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}&payment_option=CARD`,
            `${config.getTotalPayOptionTransaction}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}&payment_option=NB`
        ]
      return  axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
        // return axios({
        //     method: "GET",
        //     url: `${config.getTotalPayOptionTransaction}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}&payment_option=${paymentoption}`
        // })
    }
    getHourandCountStatusAndDate(startdate) {
        return axios({
            method: "GET",
            url: `${config.getHourandStatusWiseCountAndDate}?uuid=${uuid}&start_date=${startdate}`
            // url:`${config.dateWiseTxnWithParameters}?uuid=${uuid}&start_date=2021-06-25&end_date=2021-07-17&merchant_id=624651865043&pgType=LETZPAY&payment_option=upi&merchant_order_id=16246527235863&trId=1&pg_id=2`
          })
    }
    getMinuteandCountByStatus(states) {
        return axios({
            method: "GET",
            url: `${config.getMinuteandCountByStatus}?uuid=${uuid}&status=${states}`
            // url:`${config.dateWiseTxnWithParameters}?uuid=${uuid}&start_date=2021-06-25&end_date=2021-07-17&merchant_id=624651865043&pgType=LETZPAY&payment_option=upi&merchant_order_id=16246527235863&trId=1&pg_id=2`
          })
    }
    getStatusAndMinuteWiseCount() {
        return axios({
            method: "GET",
            url: `${config.getStatusAndMinuteWiseCount}?uuid=${uuid}`
          })
    }
    getByMerchantWisePgWiseSum(startdate, enddate, states) {
        return axios({
            method: "GET",
            url: `${config.getByMerchantWisePgWiseSum}?uuid=${uuid}&start_date=${startdate}&end_date=${enddate}&status=${states}`
            // url:`${config.dateWiseTxnWithParameters}?uuid=${uuid}&start_date=2021-06-25&end_date=2021-07-17&merchant_id=624651865043&pgType=LETZPAY&payment_option=upi&merchant_order_id=16246527235863&trId=1&pg_id=2`
          })
    }
    getPgTypeAndCountByStatusAndDate(startdate, enddate, states) {
        return axios({
            method: "GET",
            url: `${config.getPgTypeAndCountByStatusAndDate}?uuid=${uuid}&start_date=${startdate}&end_date=${enddate}&status=${states}`
            // url:`${config.dateWiseTxnWithParameters}?uuid=${uuid}&start_date=2021-06-25&end_date=2021-07-17&merchant_id=624651865043&pgType=LETZPAY&payment_option=upi&merchant_order_id=16246527235863&trId=1&pg_id=2`
          })
    }
    getTotalSettledAndUnsettledAmount(fromdate, todate, statusss) {
        return axios({
            method: "GET",
            url: `${config.getTotalSettledAndUnsettledAmount}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}&status=${statusss}`
        })
    }
    merchantTransactionDayDatewise(fromdate, todate) {
        return axios({
            method: "GET",
            url: `${config.merchantTransactionDayDatewise}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}`
        })
    }
    dashboardgetStatusCount(fromdate, todate) {
        return axios({
            method: "GET",
            url: `${config.dashboardgetStatusCount}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}`
        })
    }
    getAllSumByPaymentOption(fromdate, todate) {
        return axios({
            method: "GET",
            url: `${config.getAllSumByPaymentOption}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}`
        })
    }
    getTrxTopReport() {
        return axios({
            method: "GET",
            url: `${config.getTrxTopReport}?uuid=${uuid}`
        })
    }
    getLastTrxMerchList(fromdate) {
        return axios({
            method: "GET",
            url: `${config.getLastTrxMerchList}?uuid=${uuid}&start_date=${fromdate}`
        })
    }
    // session check
    getAdminDetailsSessionCheck() {
        return axios({
            method: "GET",
            url: `${config.getAdminDetailsSessionCheck}?uuid=${uuid}`
        })
    }
    getPGWiseMerchantList(pguuid) {
        return axios({
            method: "GET",
            url: `${config.getPGWiseMerchantList}?uuid=${uuid}&pgId=${pguuid}`
        })
    }
    getAllPGDetails() {
        return axios({
          method: "GET",
          url: `${config.getAllPGDetails}?uuid=${uuid}`
        })
      }
      getHourandStatusWiseCountAndDateAndSum() {
         return axios({
            method: "GET",
            url: `${config.getHourandStatusWiseCountAndDateAndSum}?uuid=${uuid}`
          })
      }
    //   payout
      getLastTrxMerchListPayOut(fromdate) {
        return axios({
            method: "GET",
            url: `${config.getLastTrxMerchListPayOut}?uuid=${uuid}&start_date=${fromdate}`
        })
    }
    getPgTypeAndCountByStatusAndDatePayOut(fromdate, todate, statuss) {
        return axios({
            method: "GET",
            url: `${config.getPgTypeAndCountByStatusAndDatePayOut}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}&status=${statuss}`
        })
    }
    getStatusCountPayOut(fromdate, todate) {
        return axios({
            method: "GET",
            url: `${config.getStatusCountPayOut}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}`
        })
    }

    getStatusAndMinuteWiseCountPayOut(statuss) {
        return axios({
            method: "GET",
            url: `${config.getStatusAndMinuteWiseCountPayOut}?uuid=${uuid}&status=${statuss}`
        })
    }

    getHourandStatusWiseCountAndDatePayOut(fromdate, statuss) {
        return axios({
            method: "GET",
            url: `${config.getHourandStatusWiseCountAndDatePayOut}?uuid=${uuid}&start_date=${fromdate}&status=${statuss}`
        })
    }

}
