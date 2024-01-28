import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid
// console.log("uuid", uuid)

export default class requests  {
    pgdetailsApi() {
        return axios({
          method: "GET", 
          url: `${config.payoutgetpglist}?uuid=${uuid}`
        })
      }
    reportgetAllPayoutReportDetails() {
        return axios({
            method: "GET",
            url: `${config.reportgetAllPayoutReportDetails}`
            // url:`${config.dateWiseTxnWithParameters}?uuid=${uuid}&start_date=2021-06-25&end_date=2021-07-17&merchant_id=624651865043&pgType=LETZPAY&payment_option=upi&merchant_order_id=16246527235863&trId=1&pg_id=2`
          })
    }
    reportgetAllPayoutReportTransactionDownloadLinkList() {
        return axios({
            method: "GET",
            url: `${config.reportgetAllPayoutReportTransactionDownloadLinkList}`
            // url:`${config.dateWiseTxnWithParameters}?uuid=${uuid}&start_date=2021-06-25&end_date=2021-07-17&merchant_id=624651865043&pgType=LETZPAY&payment_option=upi&merchant_order_id=16246527235863&trId=1&pg_id=2`
          })
    }
    reportgetAllReportTrListreportName(reportname) {
        return axios({
            method: "GET",
            url: `${config.reportgetAllReportTrListreportName}?reportName=${reportname}`
            // url:`${config.dateWiseTxnWithParameters}?uuid=${uuid}&start_date=2021-06-25&end_date=2021-07-17&merchant_id=624651865043&pgType=LETZPAY&payment_option=upi&merchant_order_id=16246527235863&trId=1&pg_id=2`
          })
    }
    payoutgeneratertransactionReport(reportname, datefrom, dateto, byname) {
       const senddata = {
        reportName: reportname,
        reportParam1: datefrom,
        reportParam2: dateto,
        reportParam3: byname
       }
        return axios({
            method: "POST",
            url: `${config.payoutgeneratertransactionReport}?uuid=${uuid}`,
            data:senddata
            // url:`${config.dateWiseTxnWithParameters}?uuid=${uuid}&start_date=2021-06-25&end_date=2021-07-17&merchant_id=624651865043&pgType=LETZPAY&payment_option=upi&merchant_order_id=16246527235863&trId=1&pg_id=2`
          })
    }
    payoutreportdownloadfileName(filenames) {
        return axios({
            method: "GET",
            url: `${config.payoutreportdownloadfileName}?fileName=${filenames}`
          })
    }
    merchantReport(startdate, enddate) {
        return axios({
            method: "GET",
            url: `${config.merchantReport}?uuid=${uuid}&start_date=${startdate}&end_date=${enddate}`
          })  
    }
    downloadFile(filename) {
        return axios({
            method: "GET",
            url: `${config.downloadFile}/${filename}?uuid=${uuid}`
          }) 
    }
}