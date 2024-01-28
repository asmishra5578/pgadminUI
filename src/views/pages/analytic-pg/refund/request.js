import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid

export default class requests  {
    getRefundDetails(fromdate, todate, refundID) {
        return axios({
            method: "GET",
            url: `${config.getRefundDetails}?uuid=${uuid}&start_date=${fromdate}&end_date=${todate}&refundId=${refundID}`
          })
    }
    refundUpdate(merchantid, merchantorderid, status, refundtext) {
        return axios({
            method: "PUT",
            url: `${config.refundUpdate}?uuid=${uuid}&merchantId=${merchantid}&merchantOrderId=${merchantorderid}&status=${status}&refundText=${refundtext}`
          })
    }
    getRefundByMerchantIdOrStatus(merchantorderid) {
        return axios({
            method: "GET",
            url: `${config.getRefundByMerchantIdOrStatus}?uuid=${uuid}&merchantOrderId=${merchantorderid}&status`
          })
    }
    CreateRefundRequestByAdmin(merchantID, merchantorderid) {
        return axios({
            method: "POST",
            url: `${config.CreateRefundRequestByAdmin}?uuid=${uuid}&merchantOrderId=${merchantorderid}&merchantId=${merchantID}`
          })
    }
    updateComplaintType(complainttype, statuss) {
        return axios({
            method: "PUT",
            url: `${config.updateComplaintType}?uuid=${uuid}&complaintType=${complainttype}&status=${statuss}`
          })
    }
    updateComplaintSubType(compalinttype, complaintsubtype, statu) {
        return axios({
            method: "PUT",
            url: `${config.updateComplaintSubType}?uuid=${uuid}&complaintType=${compalinttype}&status=${statu}&subType=${complaintsubtype}`
          })
    }
    complaintDetailWithTicketId(ticketid) {
        return axios({
            method: "GET",
            url: `${config.complaintDetailWithTicketId}?uuid=${uuid}&ticketId=${ticketid}`
          })
    }
    dateWiseTxnWithParameters(merchantorderid) {
        return axios({
            method: "GET",
            url: `${config.dateWiseTxnWithParameters}?uuid=${uuid}&start_date&end_date&merchant_id=&pgType=&payment_option&merchant_order_id=${merchantorderid}&trId&pg_id`
            // url:`${config.dateWiseTxnWithParameters}?uuid=${uuid}&start_date=2021-06-25&end_date=2021-07-17&merchant_id=624651865043&pgType=LETZPAY&payment_option=upi&merchant_order_id=16246527235863&trId=1&pg_id=2`
          })
    }

}