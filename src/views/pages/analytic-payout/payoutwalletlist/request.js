import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid
// console.log("uuid", uuid)

export default class requests {
    PayoutWalletlist() {
        return axios({
            method: "GET",
            url: `${config.PayoutWalletlist}?uuid=${uuid}`
        })
    }
    getMainWalletList() {
        return axios({
            method: "GET",
            url: `${config.getMainWalletList}?uuid=${uuid}`
        })
    }
    walletUpdate(merchantid, walletCallBackAPI, walletStatus) {
        return axios({
            method: "PUT",
            url: `${config.walletUpdateStatusAndHoldAmount}?uuid=${uuid}`,
            data:{
                merchantId:merchantid, 
                status:walletStatus,
                walletCallBackAPI:"",
                walletHoldAmount:"",
                instantReversal:""
            }
        })
    }
    getMainWalletBalance(walletid) {
        return axios({
            method: "GET",
            url: `${config.getMainWalletBalance}?uuid=${uuid}&walletId=${walletid}`
        })
    }
    WalletCreation(merchantidd, walletname, walletamount) {
        return axios({
            method: "POST",
            url: `${config.WalletCreation}?uuid=${uuid}&merchantId=${merchantidd}`,
            data: {
                name: walletname,
                status: "ACTIVE",
                amount: walletamount,
                mainWalletid: "5c0385d0-f95c-4c89-ad5b-73199d947e58"
            }
        })
    }
    WalletRecharge(merchantidd, walletamount, transactionttype, purposes, remarkss, refenceids) {
        return axios({
            method: "POST",
            url: `${config.WalletRecharge}?uuid=${uuid}&merchantId=${merchantidd}`,
            data:{
                amount:walletamount,
                transactionType:transactionttype,
                purpose:purposes,
                remarks:remarkss,
                referenceId:refenceids
            }
        })
    }
    mainWalletRecharge(walletid, amount, transactionttype, purposes, remarkss) {
        return axios({
            method: "POST",
            url: `${config.mainWalletRecharge}?uuid=${uuid}&walletId=${walletid}`,
            data:{
                amount,
                transactionType:transactionttype,
                purpose:purposes,
                remarks:remarkss
            }
        })
    }
    walletReversal(merchantidd, amount, transactionType, purpose, remarks, referenceId) {
        return axios({
            method: "POST",
            url: `${config.walletReversal}?uuid=${uuid}&merchantId=${merchantidd}    `,
            data:{
                amount, transactionType, purpose, remarks, referenceId
            }
        })
    }
    walletRefund(merchantidd, amount, transactionType, purpose, remarks, referenceId) {
        return axios({
            method: "POST",
            url: `${config.walletRefund}?uuid=${uuid}&merchantId=${merchantidd}    `,
            data:{
                amount, transactionType, purpose, remarks, referenceId
            }
        })
    }
    mainWalletReversal(walletiddd, amount, transactionType, purpose, remarks) {
        return axios({
            method: "POST",
            url: `${config.mainWalletReversal}?uuid=${uuid}&walletId=${walletiddd}    `,
            data:{
                amount, transactionType, purpose, remarks
            }
        })
    }
}