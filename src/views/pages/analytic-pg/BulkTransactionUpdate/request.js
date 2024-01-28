import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid
// console.log("uuid", uuid)

export default class requests {
    updateTransactionStatus(data) {
        const senddata = {
            uuid,
            updateDataDto:data
        }
        return axios({
            method: "PUT",
            url: `${config.updateTransactionStatuspayin}?uuid=${uuid}`,
            data:senddata
        })
    }
    getallTransactionChangeRequestPayout() {
        return axios({
            method: "GET",
            url: `${config.getallTransactionChangeRequestpayin}?uuid=${uuid}`
        })
    }
    getalltxnupdatefiles (filetypess) {
        return axios({
            method: "GET",
            url: `${config.getalltxnupdatefiles}?uuid=${uuid}&fileType=${filetypess}`
        })
    }
    payinupdatetxnStatusfileupload(data) {
        return axios({
            method: "POST",
            url: `${config.payinupdatetxnStatusfileupload}?uuid=${uuid}`,
            data
        })
    }
    checktxnfileparsingstaus(filenames) {
        return axios({
            method: "GET",
            url: `${config.checktxnfileparsingstaus}?fileName=${filenames}`
        })
    }
}