import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid
// console.log("uuid", uuid)

export default class requests {
    getPayoutUserWithDetails(merchanttid) {
        return axios({
            method: "GET",
            url: `${config.getPayoutUserWithDetails}?uuid=${uuid}&merchantId=${merchanttid}`
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
    PayoutWalletlist() {
        return axios({
            method: "GET",
            url: `${config.PayoutWalletlist}?uuid=${uuid}`
        })
    }

}