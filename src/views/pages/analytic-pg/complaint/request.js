import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid

export default class requests  {
    complaintDetails() {
        return axios({
            method: "GET",
            url: `${config.complaintDetails}?uuid=${uuid}`
          })
    }
    createComplaintType(complainttype) {
        return axios({
            method: "POST",
            url: `${config.createComplaintType}?uuid=${uuid}&complaintType=${complainttype}`
          })
    }
    createComplaintSubType(complainttype, complaintsubtype) {
        return axios({
            method: "POST",
            url: `${config.createComplaintSubType}?uuid=${uuid}&complaintType=${complainttype}&complaintSubType=${complaintsubtype}`
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
            url: `${config.complaintDetailWithTicketId}?uuid=${uuid}&complaintId=${ticketid}`
          })
    }
    updateTicket(complaintid, complaintTexta, statuss) {
        return axios({
            method: "PUT",
            url: `${config.updateTicket}?uuid=${uuid}`,
            data:{
                complaintId : complaintid,
                complaintText : complaintTexta,
                status : statuss
            }
          })
    }
    getComplaintTypeAndComplaintSubTpye() {
        return axios({
            method: "GET",
            url: `${config.getComplaintTypeAndComplaintSubTpye}?uuid=${uuid}`
          })
    }
}