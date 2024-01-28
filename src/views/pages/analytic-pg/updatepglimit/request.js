import axios from 'axios'
import useEazy from '@src/auth/eazy/useEazy'


const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid
export default class requests {
 
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
  tgepgDetailByPGNameAndPgId(pguuid) {
    return axios({
        method: "GET",
        url: `${config.pgDetailByPGNameAndPgId}?uuid=${uuid}&pguuid=${pguuid}`
      })
} 
payingupdatelimitpolicy(data) {
  data.adminUuid = uuid
  return axios({
    method: "PUT",
    url: `${config.payingupdatelimitpolicy}`,
    data
  })
}
}
