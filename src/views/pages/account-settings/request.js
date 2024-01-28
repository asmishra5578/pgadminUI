import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import moment from "moment"
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const emailid = JSON.parse(UserData).email
const uuid = JSON.parse(UserData).uuid

export default class requests {
    changepassword (newpassword) {
        console.log("dadtatataa newpassword---------->", newpassword)
        return axios({
            method: "PUT",
            url: `${config.changepassword}?uuid=${uuid}&userName=${emailid}&password=${newpassword}`
        })
    }
    createComplaintType (complaintype) {
        return axios({
            method: "POST",
            url: `${config.createComplaintType}?uuid=${uuid}&complaintType=${complaintype}`
        })
    }
    createComplaintSubType (complaintType, complaintSubType) {
        return axios({
            method: "POST",
            url: `${config.createComplaintSubType}?uuid=${uuid}&complaintType=${complaintType}&complaintSubType=${complaintSubType}`
        }) 
    }
    updateComplaintType (complaintType, status) {
        return axios({
            method: "PUT",
            url: `${config.updateComplaintType}?uuid=${uuid}&complaintType=${complaintType}&status=${status}`
        })
    }
    updateComplaintSubType (complaintType, status, subType) {
        return axios({
            method: "PUT",
            url: `${config.updateComplaintSubType}?uuid=${uuid}&complaintType=${complaintType}&status=${status}&subType=${subType}`
        })
    }
    complaintDetails () {
        return axios({
            method: "GET",
            url: `${config.complaintDetails}?uuid=${uuid}`
        })
    }
    updatebankdetails (data) {
        return axios({
            method: "PUT",
            url: `${config.updatebankdetails}?uuid=${uuid}`,
            data
        })
    }
    profiledetails () {
        return axios({
            method: "GET",
            url: `${config.profilrdetails}?uuid=${uuid}`
        })
    }
    enablepayoutcallback(orderidsdata) {
        const data = {
            adminUuid: uuid,
            orderIds:orderidsdata
        }
        return axios({
            method:'PUT',
            url: `${config.enablepayoutcallback}`,
            data
        })
    }
    enablepayincallBack(orderidsdata) {
        const data = {
            adminUuid: uuid,
            orderIds:orderidsdata
        }
        return axios({
            method:'PUT',
            url: `${config.enablepayincallBack}`,
            data
        })
    }
}