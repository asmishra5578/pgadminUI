import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid

export default class requests  {
    getBankList() {
        return axios({
            method: "GET",
            url: `${config.getBankList}?uuid=${uuid}`
          })
    }
    payingaddmodifybank(data) {
        data.adminUuid = uuid
        return axios({
           method: "POST",
           url: `${config.payingaddmodifybank}`,
           data
         })
       }
       getAllPGDetails() {
         return axios({
             method: "GET",
             url: `${config.getAllPGDetails}?uuid=${uuid}`
           })
     }
     allMerchantDetailsReport() {
       return axios({ 
           method: "GET",
           url: `${config.allMerchantDetailsReport}?uuid=${uuid}`
         })
   }
}