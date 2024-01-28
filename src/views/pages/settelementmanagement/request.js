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
}