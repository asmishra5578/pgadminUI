import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
import { Phone } from 'react-feather'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid
// console.log("uuid", uuid)

export default class requests {
    adminCreate(data) {
        return axios({
            method: "POST",
            url: `${config.adminCreate}?uuid=${uuid}`,
            data
        })
    }
}