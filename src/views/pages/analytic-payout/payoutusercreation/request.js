import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid
// console.log("uuid", uuid)

export default class requests {
    payOutUserCreation(mercahntid, walletname) {
        const payoutusersenddta = {
            merchantId: mercahntid,
            whitelistedip: "172.31.255.251",
            walletCheck: "true",
            name: walletname,
            status: "ACTIVE",
            amount: "0.00",
            mainWalletid: "5c0385d0-f95c-4c89-ad5b-73199d947e58"
        }
        return axios({
            method: "POST",
            url: `${config.payOutUserCreation}?uuid=${uuid}`,
            data: payoutusersenddta
        })
    }
    WalletCreation(merchantidd, walletnamem, mainwalletid) {
        return axios({
            method: "POST",
            url: `${config.WalletCreation}?uuid=${uuid}&merchantId=${merchantidd}`,
            data: {
                name: walletnamem,
                status: "ACTIVE",
                amount: "0.00",
                mainWalletid: mainwalletid
            }
        })
    }
    getMainWalletList() {
        return axios({
            method: "GET",
            url: `${config.getMainWalletList}?uuid=${uuid}`
        })
    }

    CreatenewMerchant(data) {
        const senddata = {
            merchantName: data.merchantName,
            phoneNumber: data.phoneNumber,
            emailId: data.email,
            kycStatus: "Yes",
            companyName: data.companyName,
            merchantType: data.merchantType,
            supportEmailId: data.supportEmailId,
            supportPhoneNo: data.supportPhoneNo,
            logoUrl: data.logoUrl
        }
        return axios({
            method: "POST",
            url: `${config.CreatenewMerchant}?uuid=${uuid}`,
            data: senddata
        })
    }
}