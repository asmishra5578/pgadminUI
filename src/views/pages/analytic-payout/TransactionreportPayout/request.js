import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid
// console.log("uuid", uuid)

export default class requests {
    payouttransactionFilterReport(
        fromDate,
        toDate,
        merchantId,
        bankaccount,
        beneficiaryName,
        ifsc,
        orderId,
        status,
        transactionType) {
        return axios({
            method: "GET",
            url: `${config.payouttransactionFilterReport}?uuid=${uuid}&fromDate=${fromDate}&toDate=${toDate}&merchantId=${merchantId}&bankaccount=${bankaccount}&beneficiaryName=${beneficiaryName}&ifsc=${ifsc}&orderId=${orderId}&status=${status}&transactionType=${transactionType}`
        })
    }
}