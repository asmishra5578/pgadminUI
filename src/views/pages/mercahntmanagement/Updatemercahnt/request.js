import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid
export default class requests  {
    allMerchantDetailsReport() {
        return axios({ 
            method: "GET",
            url: `${config.allMerchantDetailsReport}?uuid=${uuid}`
          })
    }
    merchantserach(merchantid) {
        return axios({
            method: "GET",
            url: `${config.searchmerchantListByName}?uuid=${uuid}&merchantId=${merchantid}`
          })
    }
    updateMerchantStatus(merchantId, status) {
        return axios({
            method: "PUT",
            url: `${config.updateMerchantStatus}?uuid=${uuid}&merchantID=${merchantId}&status=${status}`
          })
    }
    UpdateMerchantPGStatus(merchantid, pgstatus, pguuid) {
        return axios({
            method: "PUT",
            url: `${config.UpdateMerchantPGStatus}?uuid=${uuid}&merchantId=${merchantid}&status=${pgstatus}&pgUuid=${pguuid}`
          })
    }
    UpdateMerchantService(mercahntid, pguuid, pgstatus, pgservice) {
        return axios({
            method: "PUT",
            url: `${config.UpdateMerchantService}?uuid=${uuid}&merchantId=${mercahntid}&pgUuid=${pguuid}&status=${pgstatus}&service=${pgservice}`
          })
    }
    pgdetailslinkmerchant() {
        return axios({
          method: "GET",
          url: `${config.pgdetailsall}?uuid=${uuid}`
        })
      }
      MerchantPGServiceAssociation(pguuid, mercahntservice, merchantid) {
        return axios({
            method: "POST",
            url: `${config.MerchantPGServiceAssociation}?uuid=${uuid}&pgUuid=${pguuid}&merchantService=${mercahntservice}&merchantId=${merchantid}`
          })
    }
    MerchantPGDetailsAsociation(pguuid, merchantId) {
        return axios({
            method: "POST",
            url: `${config.MerchantPGDetailsAsociation}?uuid=${uuid}&pgUuid=${pguuid}&merchantId=${merchantId}`
          })
    }
     admingetmercahntbankdetails(merchantId) {
        return axios({
            method: "GET",
            url: `${config.admingetmercahntbankdetails}?uuid=${uuid}&merchantId=${merchantId}`
          })
    }
    adminupdatemerchbankdetails(data, merchantId) {
        return axios({
            method: "PUT",
            url: `${config.adminupdatemerchbankdetails}?uuid=${uuid}&merchantId=${merchantId}`,
            data
          })
    }
    getBankList() {
      return axios({
          method: "GET",
          url: `${config.getBankList}?uuid=${uuid}`
        })
  } 
    createBankDetails(data, merchantId, alreadykyc) {
      console.log('alreay kyc', alreadykyc)
      return axios({
          method: alreadykyc === "no" ? "POST" : "PUT",
          url: `${alreadykyc === "no" ? config.createBankDetails : config.adminupdatemerchbankdetails}?uuid=${uuid}&merchantId=${merchantId}`,
          data
        })
  }
  adminchangemerchantpassword(merchantid) {
    return axios({
      method: "PUT",
      url: `${config.adminchangemerchantpassword}?merchantId=${merchantid}&uuid=${uuid}`
    })
  }
  getAppIdAndSecretByMerchantDetails(merchaid) {
    return axios({
        method: "GET",
        url: `${config.getAppIdAndSecretByMerchantDetails}?uuid=${uuid}&merchantId=${merchaid}`
      })
}
WalletCreationforpayin(merchantidd, walletnamem, mainwalletid) {
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
updatemerchantcommissionautoenable(merchantids, statuss) {
  return axios({
    method: "PUT",
    url: `${config.updatemerchantcommissionautoenable}?adminUuid=${uuid}&merchantId=${merchantids}&status=${statuss}`
  })
}
 }