import axios from 'axios'
import useEazy from '@src/auth/eazy/useEazy'


const config = useEazy.econfig
const UserData = useEazy.getLoginData()
const uuid = JSON.parse(UserData).uuid
export default class requests {
  transactionfilterApi(fromDate, toDate) {
    return axios({
      method: "GET",
      url: `${config.transactionfilter}?uuid=${uuid}&dateFrom=${fromDate}&dateTo=${toDate}`
    })
  }
  pgdetailsApi() {
    return axios({
      method: "GET",
      url: `${config.pgdetailsall}?uuid=${uuid}`
    })
  }
  updatePgConfigurationDetails(data) {
    const senddata = {
      pgName: data.pgName,
      pgAppId: data.pgAppId,
      pgSecretKey: data.pgSecretKey,
      pgSaltKey: data.pgSaltKey,
      pgAddInfo1: data.pgAddInfo1,
      pgAddInfo2: data.pgAddInfo2,
      pgAddInfo3: data.pgAddInfo3
    }
    return axios({
      method: "PUT",
      url: `${config.updatePgConfigurationDetails}?uuid=${uuid}`,
      data: senddata
    })
  }
  CreatePGDetails(data) {
    console.log("CreatePGDetails", data)
    const senddata = {
      pgName: data.pgName,
      pgAppId: data.pgAppId,
      pgSecretKey: data.pgSecretKey,
      pgSaltKey: data.pgSaltKey,
      pgAddInfo1: data.pgAddInfo1,
      pgAddInfo2: data.pgAddInfo2,
      pgAddInfo3: data.pgAddInfo3
    }
    return axios({
      method: "POST",
      url: `${config.CreatePGDetails}?uuid=${uuid}`,
      data: senddata
    })
  }
  UpdatePgDetailsStatus(pguuid) {
    return axios({
      method: "PUT",
      url: `${config.UpdatePgDetailsStatus}?uuid=${uuid}&pgUuid=${pguuid}&status=ACTIVE`
    })
  }
  blockpgdetails(pguuid) {
    return axios({
      method: "PUT",
      url: `${config.UpdatePgDetailsStatus}?uuid=${uuid}&pgUuid=${pguuid}&status=BLOCKED`
    })
  }
  PGServiceCreation(pguuid, pgservice) {
    return axios({
      method: "POST",
      url: `${config.PGServiceCreation}?uuid=${uuid}&pgUuid=${pguuid}&pgServices=${pgservice}&defaultTag=N&thresoldMonth=0&thresoldDay=0&thresoldWeek=0&thresold3Month=0&thresold6Month=0&thresoldYear=0`
    })
  }
  UpdatePGService(pguuid, pgservice) {
    return axios({
      method: "PUT",
      url: `${config.UpdatePGService}?uuid=${uuid}&pgUuid=${pguuid}&service=${pgservice}&status=ACTIVE`
    })
  }
  BlockPGService(pguuid, pgservice) {
    return axios({
      method: "PUT",
      url: `${config.UpdatePGService}?uuid=${uuid}&pgUuid=${pguuid}&service=${pgservice}&status=BLOCKED`
    })
  }
  tgepgDetailByPGNameAndPgId(pguuid) {
    return axios({
        method: "GET",
        url: `${config.pgDetailByPGNameAndPgId}?uuid=${uuid}&pguuid=${pguuid}`
      })
}
// distributor
findAllMerchantsAssociatedWithADistributor(distributorID) {
  return axios({
    method: "GET",
    url: `${config.findAllMerchantsAssociatedWithADistributor}?uuid=${uuid}&distributorID=${distributorID}`
  })
}
getdistrubutorlistbyadmin() {
  return axios({
    method: "GET",
    url: `${config.getdistrubutorlistbyadmin}?uuid=${uuid}`
  })
}
updateDistributorMerchantDetailsStatus(merchantid, distributorid, status) {
  return axios({
    method: "PUT",
    url: `${config.updateDistributorMerchantDetailsStatus}?uuid=${uuid}&merchantID=${merchantid}&distributorID=${distributorid}&status=${status}`
  })
}
createMerchantbydistributoridBYadmin(data, distributorid) {
  return axios({
    method: "POST",
    url: `${config.createMerchantbydistributoridBYadmin}?uuid=${uuid}&distributorID=${distributorid}`,
    data
  })
}
}

// const data = () => {

//   // console.log("userdata---------->", JSON.parse(UserData).extraData.LoginData.uuid, useEazy.getToken())
//  return axios({
//       method: "GET",
//       url: `${config.pggetTransaction}?uuid=${uuid}`
//     })
// }

// export default data
// ** Get initial Data
