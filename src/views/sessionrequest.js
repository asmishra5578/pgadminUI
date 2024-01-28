import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid
const sessionToken = JSON.parse(UserData).sessionToken
export default class requests {
 
    // session check
    getAdminDetailsSessionCheck() {
        const data = {
         uuid,
         sessionToken
        }
        return axios({
            method: "POST",
            url: `${config.checksessionapi}`,
            data
        })
    }
}
