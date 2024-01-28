import useEazy from '@src/auth/eazy/useEazy'
import axios from 'axios'
const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).extraData.LoginData.uuid
export default class requests  {
    getdashboardbalance() {
        return axios({
            method: "GET",
            url: `${config.GETdashBoardBalance}?uuid=${uuid}`
          })
    }
}