// ** Auth Endpoints
import { verify } from 'jsonwebtoken'
import {roolink} from '../../../configs/linkConfigs'
export default {
    payoutwallettransfer: `${roolink}api/payout/walletTransfer`,
    payouttransactionReport: `${roolink}api/payout/transactionReport`,
    payoutaccountTransfer: `${roolink}api/payout/accountTransfer`,
    payouttransactionStatus: `${roolink}api/payout/transactionStatus`,
    payoutbalanceCheck: `${roolink}api/payout/balanceCheck`,

    // ** This will be prefixed in authorization header with token
    // ? e.g. Authorization: Bearer <token>
    tokenType: 'Token',
  
    // ** Value of this property will be used as key to store JWT token in storage
    storageTokenKeyName: 'accessToken',
    verifyotpdata : 'otpuser',
    userdatakey : 'userdatakey'
  }
  