// ** UseJWT import to get config
//import useJwt from '@src/auth/jwt/useJwt'
import useEazy from '@src/auth/eazy/useEazy'
import st from '@src/@core/secureStore/useSecure'

const config = useEazy.econfig

// ** Handle User Login
export const handleLogin = data => {
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data,
      config
    })
    st.set(config.userdatakey, JSON.stringify(data))
    // console.log(data.extraData.LoginData.jwtToken)
    st.set(config.storageTokenKeyName, data.jwtToken)
    // ** Add to user, accessToken & refreshToken to localStorage
    //localStorage.setItem('userData', JSON.stringify(data))
   // localStorage.setItem(config.storageTokenKeyName, JSON.stringify(data.accessToken))
  //  localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(data.refreshToken))
  }
}

export const handleOtpVerification = data => {
  return dispatch => {
    dispatch({
      type: 'VERIFYOTP',
      otppage: true
   }) 
  //  console.log(JSON.stringify(data))
     st.set(config.verifyotpdata, JSON.stringify(data))
  }
  
}
// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    dispatch({ 
      type: 'LOGOUT'
     })
    useEazy.logout()
    // ** Remove user, accessToken & refreshToken from localStorage
  //  localStorage.removeItem('userData')
   // localStorage.removeItem(config.storageTokenKeyName)
   // localStorage.removeItem(config.storageRefreshTokenKeyName)
  }
}
