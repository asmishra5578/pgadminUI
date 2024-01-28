import { lazy } from 'react'
const PGRoutes = [
  // {
  //     path: '/pg/refund',
  //     component: lazy(() => import('../../views/pages/analytic-payout/payouts/index'))
  //   },
  //   {
  //     path: '/pg/setting',
  //     component: lazy(() => import('../../views/pages/analytic-payout/payouts/index'))
  //   },
  {
    path: '/pg/settlement',
    component: lazy(() => import('../../views/pages/analytic-pg/settlements/index'))
  },
  {
    path: '/pg/unsettlement',
    component: lazy(() => import('../../views/pages/analytic-pg/settlements/unsettlemrnt'))
  },
  {
    path: '/pg/support',
    component: lazy(() => import('../../views/pages/analytic-pg/support/index'))
  },
  {
    path: '/pg/pgdetails',
    component: lazy(() => import('../../views/pages/analytic-pg/PGManagement/PGDetails/index'))
  },
  {
    path: '/forms/pgconfiguration',
    component: lazy(() => import('../../views/pages/analytic-pg/PGManagement/CreatePG/index'))
  },
  {
    path: '/forms/updatePG',
    component: lazy(() => import('../../views/pages/analytic-pg/PGManagement/UpdatePG/index'))
  },
  {
    path: '/pg/merchantdetails',
    component: lazy(() => import('../../views/pages/analytic-pg/paymentrequest/index'))
  },
  {
    path: '/forms/mercahntconfiguration',
    component: lazy(() => import('../../views/forms/wizard'))
  },
  {
    path: '/pg/updatemerchantkyc',
    component: lazy(() => import('../../views/pages/mercahntmanagement/Updatemercahnt/updatemerchantkyc'))
  },
  {
    path: '/forms/updatemerchant',
    component: lazy(() => import('../../views/pages/mercahntmanagement/Updatemercahnt/index'))
  },
  {
    path: '/forms/merchantpayout',
    component: lazy(() => import('../../views/pages/mercahntmanagement/MerchantPayout/index'))
  },
  {
    path: '/pg/merchantsettlecommession',
    component: lazy(() => import('../../views/pages/settelementmanagement/MerchantList/index'))
  },
  {
    path: '/pg/transfersettelement',
    component: lazy(() => import('../../views/pages/settelementmanagement/TransferSettlement/index'))
  },
  {
    path: '/pg/transactionstatus',
    component: lazy(() => import('../../views/pages/settelementmanagement/TransactionStatus/index'))
  },
  {
    path: '/pg/settlementreport',
    component: lazy(() => import('../../views/pages/settelementmanagement/SettlementReport/index'))
  },
  {
    path: '/pg/nodaltransfer',
    component: lazy(() => import('../../views/pages/payoutmanagement/NodalTransfer/index'))
  },
  {
    path: '/pg/walletmanagement',
    component: lazy(() => import('../../views/pages/payoutmanagement/WalletManagement/index'))
  },
  {
    path: '/pg/fraudpreventionsystem',
    component: lazy(() => import('../../views/pages/adminmanagement/index'))
  },
  {
    path: '/pg/ComplaintRequest',
    component: lazy(() => import('../../views/pages/analytic-pg/complaint/index'))
  },
  {
    path: '/pg/refund',
    component: lazy(() => import('../../views/pages/analytic-pg/refund/index'))
  },
  {
    path: '/payin/banklist',
    component: lazy(() => import('../../views/pages/analytic-pg/AddBankList/index'))
  },
  {
    path: '/payin/walletlist',
    component: lazy(() => import('../../views/pages/analytic-pg/AddWalletList/index'))
  },
  {
    path: '/pg/alltransactionreport',
    component: lazy(() => import('../../views/pages/transactionReport/index'))
  },
  {
    path: '/pg/updatepglimitpolicy',
    component: lazy(() => import('../../views/pages/analytic-pg/updatepglimit/updatepglimit'))
  },
  // {
  //   path: '/pg/getByMerchantWisePgWiseSum',
  //   component: lazy(() => import('../../views/pages/getByMerchantWisePgWiseSum/index'))
  // },
  // {
  //   path: '/pg/getMinuteandCountByStatus',
  //   component: lazy(() => import('../../views/pages/getMinuteandCountByStatus/index'))
  // },
  // {
  //   path: '/pg/getHourandCountStatusAndDate',
  //   component: lazy(() => import('../../views/pages/getHourandCountStatusAndDate/index'))
  // },
  // {
  //   path: '/pg/getPgTypeAndCountByStatusAndDate',
  //   component: lazy(() => import('../../views/pages/getPgTypeAndCountByStatusAndDate/index'))
  // },
  {
    path: '/downloadReports',
    component: lazy(() => import('../../views/pages/DownloadsReport/index'))
  },
  {
    path: '/payout/transactionReport',
    component: lazy(() => import('../../views/pages/analytic-payout/TransactionreportPayout/index'))
  },
  // {
  //   path: '/payout/merchantwisereport',
  //   component: lazy(() => import('../../views/pages/analytic-payout/merchantwisereport/index'))
  // },
  {
    path: '/payout/walletReport',
    component: lazy(() => import('../../views/pages/analytic-payout/WalletreportPayout/index'))
  },
  {
    path: '/payout/walletlist',
    component: lazy(() => import('../../views/pages/analytic-payout/payoutwalletlist/index'))
  },
  {
    path: '/payout/commessionmanagement',
    component: lazy(() => import('../../views/pages/analytic-payout/commissionstructure/index'))
  },
  {
    path: '/payout/bulkreversal',
    component: lazy(() => import('../../views/pages/analytic-payout/bulkreversal/index'))
  },
  {
    path: '/payout/IPmanagement',
    component: lazy(() => import('../../views/pages/analytic-payout/ipmanagement/index'))
  },
  {
    path: '/payout/wallerRecharge',
    component: lazy(() => import('../../views/pages/analytic-payout/Walletmanagement/WalletRecharge/index'))
  },
  {
    path: '/payout/RechargeRequest',
    component: lazy(() => import('../../views/pages/analytic-payout/Walletmanagement/RechargeRequest/index'))
  },
  {
    path: '/payout/bulkupdate',
    component: lazy(() => import('../../views/pages/analytic-payout/TransactionManagement/BulkTransactionUpdate/index'))
  },
  {
    path: '/payin/bulkupdate',
    component: lazy(() => import('../../views/pages/analytic-pg/BulkTransactionUpdate/index'))
  },
  {
    path: '/payin/transactionupdate',
    component: lazy(() => import('../../views/pages/analytic-pg/BulkTransactionUpdate/transactionupdate/index'))
  },
  {
    path: '/payout/bulkupdate',
    component: lazy(() => import('../../views/pages/analytic-payout/TransactionManagement/BulkTransactionUpdate/index'))
  },
  {
    path: '/payout/transactionupdate',
    component: lazy(() => import('../../views/pages/analytic-payout/TransactionManagement/BulkTransactionUpdate/transactionupdate/index'))
  },
  {
    path: '/payout/createuser',
    component: lazy(() => import('../../views/pages/analytic-payout/payoutusercreation/index'))
  },
  {
    path: '/payout/pgdetails',
    component: lazy(() => import('../../views/pages/analytic-payout/PGManagement/PGDetails/index'))
  },
  {
    path: '/payout/createpg',
    component: lazy(() => import('../../views/pages/analytic-payout/PGManagement/CreatePG/index'))
  },
  {
    path: '/payout/updatepg',
    component: lazy(() => import('../../views/pages/analytic-payout/PGManagement/UpdatePG/index'))
  },
  {
    path: '/payout/merchantlist',
    component: lazy(() => import('../../views/pages/analytic-payout/Merchantmanagement/merchantlist/index'))
  },
  {
    path: '/payout/updatemerchant',
    component: lazy(() => import('../../views/pages/analytic-payout/Merchantmanagement/updatepgandservices/index'))
  },
  {
    path: '/payout/downloadReportsmerchantwise',
    component: lazy(() => import('../../views/pages/analytic-payout/DownloadReportPayout/DownloadsReportbymerchant/index'))
  },
  {
    path: '/payout/pgwisedownloadreport',
    component: lazy(() => import('../../views/pages/analytic-payout/DownloadReportPayout/Downloadreportbypgwise/index'))
  },
  {
    path: '/payout/wallettransactionreportmerchantwise',
    component: lazy(() => import('../../views/pages/analytic-payout/DownloadReportPayout/Walletreportbymerchantwise/index'))
  },
  {
    path: '/payin/downloadReportsmerchantwise',
    component: lazy(() => import('../../views/pages/analytic-pg/DownloadReport/DownloadsReportbymerchant/index'))
  },
  {
    path: '/payin/pgwisedownloadreport',
    component: lazy(() => import('../../views/pages/analytic-pg/DownloadReport/Downloadreportbypgwise/index'))
  },
  {
    path: '/createAdmin',
    component: lazy(() => import('../../views/pages/AdminManagement/CreateAdmin/payoutusercreation'))
  }
]
export default PGRoutes