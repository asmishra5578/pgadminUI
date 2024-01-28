import axios from 'axios'
import eazyDefaultConfig from './eazyConfig'
import  st  from '../../secureStore/useSecure'

export default class EazyService {
econfig = {...eazyDefaultConfig}

isAlreadyFetchingAccessToken = false
constructor() {
    // ** Request Interceptor
    
     axios.interceptors.request.use(
      config => {
        // ** Get token from localStorage
        const accessToken = this.getToken()

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.econfig.tokenType} ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    axios.interceptors.response.use( 
      response => {
      // Do something with response data
      if (response.data.exception !== undefined) {
        if ((response.data.exception === 'JWT_EXPIRED') || (response.data.exception === 'IDEAL_SESSION_EXPIRED')) {
          this.logout()          
        }
      }
      return response
    }, error => {
      // Do something with response error
      return Promise.reject(error)
    })
}

  getToken() {
   return st.get(this.econfig.storageTokenKeyName)
   // return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }
  login(...args) {
    return axios.post(this.econfig.userloginEndpoint, ...args)
  }

  setotpdata(...otpdata) {
    return st.set(this.econfig.verifyotpdata, ...otpdata)
  }
  
  otpverify(otp) {
    const data = st.get(this.econfig.verifyotpdata)
    return axios.put(`${this.econfig.otploginverify}${otp}`,  JSON.parse(data))
  }
  setToken(...data) {
    return st.set(this.econfig.storageTokenKeyName, ...data)
  }
  getLoginData() {
  return st.get(this.econfig.userdatakey)
  }
  resendotp() {
    const data = st.get(this.econfig.verifyotpdata)
    return axios.put(`${this.econfig.resendotp}${JSON.parse(data).userNameOrEmail}`)
  }
  logout() {
    st.removeAll()
  }
  checkPayoutFlag() {
    if (this.getLoginData()) {    
     return JSON.parse(this.getLoginData()).extraData.LoginData.payoutFlag
    }
  }
  getMerchantUuid() {
    if (this.getLoginData()) {    
     return JSON.parse(this.getLoginData()).extraData.LoginData.uuid
    }
  }
}