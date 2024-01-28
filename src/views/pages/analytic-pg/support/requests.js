import axios from 'axios'
import useEazy from '@src/auth/eazy/useEazy'


const config = useEazy.econfig
const data = () => {
  const UserData = useEazy.getLoginData()
  const uuid = JSON.parse(UserData).extraData.LoginData.uuid
  // console.log("userdata---------->", JSON.parse(UserData).extraData.LoginData.uuid, useEazy.getToken())
 return axios({
      method: "GET",
      url: `${config.pggetTransaction}?uuid=${uuid}`
    })
}

export default data
// ** Get initial Data
