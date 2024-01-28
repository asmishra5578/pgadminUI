import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { data } from 'jquery'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid
export default class requests  {
    CreatenewMerchant(data, pguuid, servicestatusflag) {
        const senddata = {
            merchantName: data.merchantName,
            phoneNumber: data.phoneNumber,
            emailId: data.email,
            kycStatus: "YES",
            companyName: data.companyName, 
            merchantType: data.merchantType,
            supportEmailId: data.supportEmailId,
            supportPhoneNo: data.supportPhoneNo,
            logoUrl: data.logoUrl
        }
        return axios({
            method: "POST",
            url: `${config.CreatenewMerchant}?uuid=${uuid}&pgId=${pguuid}&serviceFlag=${servicestatusflag}`,
            data: senddata
          })
    }
    MerchantPGDetailsAsociation(pguuid, merchantId) {
        return axios({
            method: "POST",
            url: `${config.MerchantPGDetailsAsociation}?uuid=${uuid}&pgUuid=${pguuid}&merchantId=${merchantId}`
          })
    }
    MerchantPGServiceAssociation(pguuid, mercahntservice, merchantid) {
        return axios({
            method: "POST",
            url: `${config.MerchantPGServiceAssociation}?uuid=${uuid}&pgUuid=${pguuid}&merchantService=${mercahntservice}&merchantId=${merchantid}`
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
      createBankDetails(data, merchantID) {
        return axios({
            method: "POST",
            url: `${config.createBankDetails}?uuid=${uuid}&merchantId=${merchantID}`,
            data
          })
    }
    getBankList() {
      return axios({
          method: "GET",
          url: `${config.getBankList}?uuid=${uuid}`
        })
  } 
}