import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid
export default class requests  {
    getsettledAPI(fromDate, toDate) {
        return axios({
            method: "GET",
            url: `${config.getSettleDetails}?uuid=${uuid}&dateFrom=${fromDate}&dateTo=${toDate}`
          })
    }
    getUnsettledAPI() {
        return axios({
            method: "GET",
            url: `${config.getUnSettleDetails}?uuid=${uuid}`
          })
    }
    createmerchantrequestApi(Name, Phone, Email, Amount, linkExpiry, orderNote) {
        return axios({
            method: "POST",
            url: `${config.createmerchantrequest}?uuid=${uuid}&custName=${Name}&custPhone=${Phone}&custEmail=${Email}&custAmount=${Amount}&linkExpiry=${linkExpiry}&orderNote=${orderNote}&returnUrl&source`
          })
    }
    allMerchantDetailsReport() {
        return axios({
            method: "GET",
            url: `${config.allMerchantDetailsReport}?uuid=${uuid}`
          })
    }
    getAppIdAndSecretByMerchantDetails(merchaid) {
        return axios({
            method: "GET",
            url: `${config.getAppIdAndSecretByMerchantDetails}?uuid=${uuid}&merchantId=${merchaid}`
          })
    }
}