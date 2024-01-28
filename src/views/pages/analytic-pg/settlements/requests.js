import axios from 'axios'
import useEazy from '@src/auth/eazy/useEazy'


const config = useEazy.econfig
const settlementdata = () => {
  const UserData = useEazy.getLoginData()
  const uuid = JSON.parse(UserData).extraData.LoginData.uuid
  // console.log("userdata---------->", JSON.parse(UserData).extraData.LoginData.uuid, useEazy.getToken())
  return axios({
      method: "GET",
      url: `${config.getUnSettleDetails}?uuid=${uuid}`
    })
}

export default settlementdata
// ** Get initial Data
