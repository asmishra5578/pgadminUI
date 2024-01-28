import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid
// console.log("uuid", uuid)

export default class requests {
    getUserIp(merchanttid) {
        return axios({
            method: "GET",
            url: `${config.getUserIp}?uuid=${uuid}&merchantId=${merchanttid}`
        })
    }
    updateUserIp(merchanttid, whitelistedipp) {
        return axios({
            method: "PUT",
            url: `${config.updateUserIp}?uuid=${uuid}`,
            data:{
                merchantId:merchanttid,
                whitelistedip:whitelistedipp
            }
        })
    }
    rechargeRequest(data) {
        return axios({
            method: "POST",
            url: `${config.rechargeRequest}?uuid=${uuid}`,
            data
        })
    }
    PayoutWalletlist() {
        return axios({
            method: "GET",
            url: `${config.PayoutWalletlist}?uuid=${uuid}`
        })
    }
    merchantwalletBalancecheck(merchantid) {
        return axios({
            method: "GET",
            url: `${config.merchantwalletBalancecheck}/${merchantid}?uuid=${uuid}`
        })
    }
    rechargeMainwalletBalance(merchantid) {
        return axios({
            method: "GET",
            url: `${config.rechargeMainwalletBalance}/${merchantid}?uuid=${uuid}`
        })
    }
    getAllByMerchantRecharge() {
        return axios({
            method: "GET",
            url: `${config.getAllByMerchantRecharge}?uuid=${uuid}`
        })
    }
}