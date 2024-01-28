import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, CreditCard, DollarSign, Database, Download } from 'react-feather'

export default [
  {
    header: 'Merchant Management'
  },
  
  //  {
  //   id: 'ComplaintRequest',
  //   title: 'ComplaintRequest',
  //   icon: <Calendar size={20} />,
  //   navLink: '/pg/ComplaintRequest'
  // },
  // {
  //   id: 'refund',
  //   title: 'Refund',
  //   icon: <Calendar size={20} />,
  //   navLink: '/pg/refund'
  // },
  // {
  //   id: 'eCommerce2',
  //   title: 'PG Management',
  //   icon: <User size={20} />,
  //   children: [
  //     {
  //       id: 'PGDetails',
  //       title: 'PG Details',
  //       icon: <Circle size={12} />,
  //       navLink: '/pg/pgdetails'
  //     },
  //     {
  //       id: 'CreatePG',
  //       title: 'Create PG',
  //       icon: <Circle size={20} />,
  //       navLink: '/forms/pgconfiguration'
  //     },
  //     {
  //       id: 'updatepg',
  //       title: 'Update PG',
  //       icon: <Circle size={20} />,
  //       navLink: '/forms/updatePG'
  //     }
  //   ]
  // },
    {
    id: 'eCommerce',
    title: 'Merchant Management',
    icon: <User size={20} />,
    children: [
      {
        id: 'wishList',
        title: 'Merchant Details',
        icon: <Circle size={12} />,
        navLink: '/pg/merchantdetails'
      },
      {
        id: 'checkout',
        title: 'Create Merchant',
        icon: <Circle size={20} />,
        navLink: '/forms/mercahntconfiguration'
      },
      {
        id: 'updatemerchant',
        title: 'Update Merchant',
        icon: <Circle size={20} />,
        navLink: '/forms/updatemerchant'
      }
    ]
  },
 
  {
    header: 'Payin'
  },
  {
    id: 'banklist',
    title: 'Bank List',
    icon: <Calendar size={20} />,
    navLink: '/payin/banklist'
  },
  {
    id: 'walletlistpayin',
    title: 'Wallet List',
    icon: <Calendar size={20} />,
    navLink: '/payin/walletlist'
  },
  {
    id: 'updatepglimitpolicy',
    title: 'Update PG Limit Policy',
    icon: <Calendar size={20} />,
    navLink: '/pg/updatepglimitpolicy'
  },
  {
    id: 'payintransactionmanage',
    title: 'Transaction Update',
    icon: <CreditCard size={20} />,
    children: [
      {
        id: 'payinmercssshantwise',
        title: 'Update Transaction',
        icon: <CreditCard size={20} />,
        navLink: '/payin/transactionupdate'
      },
      {
        id: 'payinpgwissssedownloadreport',
        title: 'Bulk Updation',
        icon: <CreditCard size={20} />,
        navLink: '/payin/bulkupdate'
      }
    ]
  },
  // {
  //   id: 'payintransactionmanage',
  //   title: 'Bulk Update',
  //   icon: <Circle size={20} />,
  //   navLink: '/payin/bulkupdate'
  // },
  {
    id: 'eCommerce2',
    title: 'PG Management',
    icon: <User size={20} />,
    children: [
      {
        id: 'PGDetails',
        title: 'PG Details',
        icon: <Circle size={12} />,
        navLink: '/pg/pgdetails'
      },
      {
        id: 'CreatePG',
        title: 'Create PG',
        icon: <Circle size={20} />,
        navLink: '/forms/pgconfiguration'
      },
      {
        id: 'updatepg',
        title: 'Update PG',
        icon: <Circle size={20} />,
        navLink: '/forms/updatePG'
      }
    ]
  },
  {
    id: 'alltransactionreport',
    title: 'Transaction Report',
    icon: <Calendar size={20} />,
    navLink: '/pg/alltransactionreport'
  },
  // { 
  //   id: 'getByMerchantWisePgWiseSum',
  //   title: 'Sum PG Merchant Wise',
  //   icon: <Calendar size={20} />,
  //   navLink: '/pg/getByMerchantWisePgWiseSum'
  // },
  // { 
  //   id: 'getMinuteandCountByStatus',
  //   title: 'Minutes&CountbyStatus',
  //   icon: <Calendar size={20} />,
  //   navLink: '/pg/getMinuteandCountByStatus'
  // },
  //  { 
  //   id: 'getHourandCountStatusAndDate',
  //   title: 'Hour&CountbyStatus&Date',
  //   icon: <Calendar size={20} />,
  //   navLink: '/pg/getHourandCountStatusAndDate'
  // }, 
  // { 
  //   id: 'getPgTypeAndCountByStatusAndDate',
  //   title: 'PGType&CountbyStatus&Date',
  //   icon: <Calendar size={20} />,
  //   navLink: '/pg/getPgTypeAndCountByStatusAndDate'
  // },
  {
    id: 'payinreportdownloadfile',
    title: 'Download Report',
    icon: <Download size={20} />,
    children: [
      {
        id: 'payinmerchantwise',
        title: 'Merchant Wise',
        icon: <Download size={20} />,
        navLink: '/payin/downloadReportsmerchantwise'
      },
      {
        id: 'payinpgwisedownloadreport',
        title: 'PG Wise',
        icon: <Download size={20} />,
        navLink: '/payin/pgwisedownloadreport'
      }
    ]
  }


  // below code is unuseable it may use when updating is requires
    // {
  //   id: 'pgdetails',
  //   title: 'PG Details',
  //   icon: <Calendar size={20} />,
  //   navLink: '/pg/pgdetails'
  // },
  // {
  //   header: 'Merchant Management'
  // },
  // {
  //   id: 'alltransactionreport',
  //   title: 'Transaction Report',
  //   icon: <Calendar size={20} />,
  //   navLink: '/pg/alltransactionreport'
  // },
  // {
  //   id: 'fraudpreventionsystem',
  //   title: 'Fraud Prevention System',
  //   icon: <Calendar size={20} />,
  //   navLink: '/pg/fraudpreventionsystem'
  // },  {
  //   id: 'ComplaintRequest',
  //   title: 'ComplaintRequest',
  //   icon: <Calendar size={20} />,
  //   navLink: '/pg/ComplaintRequest'
  // },
  // {
  //   id: 'refund',
  //   title: 'Refund',
  //   icon: <Calendar size={20} />,
  //   navLink: '/pg/refund'
  // },
  // {
  //   id: 'pgdetails',
  //   title: 'PG Details',
  //   icon: <Calendar size={20} />,
  //   navLink: '/pg/pgdetails'
  // },  
  // {
  //   id: 'eCommerce',
  //   title: 'Mercahant Management',
  //   icon: <User size={20} />,
  //   children: [
  //     {
  //       id: 'wishList',
  //       title: 'Merchant Details',
  //       icon: <Circle size={12} />,
  //       navLink: '/pg/merchantdetails'
  //     },
  //     {
  //       id: 'checkout',
  //       title: 'Create Merchant',
  //       icon: <Circle size={20} />,
  //       navLink: '/forms/mercahntconfiguration'
  //     },
  //     {
  //       id: 'updatemerchant',
  //       title: 'Update Merchant',
  //       icon: <Circle size={20} />,
  //       navLink: '/forms/updatemerchant'
  //     },
  //     {
  //       id: 'updatekyc',
  //       title: 'KYC Details',
  //       icon: <Circle size={12} />,
  //        navLink: '/pg/updatemerchantkyc'
  //     },
  //     {
  //       id: 'merchantpayout',
  //       title: 'Merchant Payout',
  //       icon: <Circle size={20} />,
  //       navLink: '/forms/merchantpayout'
  //     }
  //   ]
  // }
  // {
  //   id: 'settlementmanagement',
  //   title: 'Settlement Management',
  //   icon: <CreditCard size={20} />,
  //   children: [
  //     {
  //       id: 'merchantslists',
  //       title: 'Merchants Settlement',
  //       icon: <Circle size={20} />,
  //       navLink: '/pg/merchantsettlecommession'
  //     },
  //     {
  //       id: 'transfersettlement',
  //       title: 'Transfer Settlement',
  //       icon: <Circle size={20} />,
  //       navLink: '/pg/transfersettelement'
  //     },
  //     {
  //       id: 'transactionstatus',
  //       title: 'Transaction Status',
  //       icon: <Circle size={20} />,
  //       navLink: '/pg/transactionstatus'
  //     },
  //     {
  //       id: 'settlementreport',
  //       title: 'Settlement Report',
  //       icon: <Circle size={20} />,
  //       navLink: '/pg/settlementreport'
  //     }
  //   ]
  // },

    // {
      //   id: 'updatekyc',
      //   title: 'KYC Details',
      //   icon: <Circle size={12} />,
      //    navLink: '/pg/updatemerchantkyc'
      // },
      // {
      //   id: 'merchantpayout',
      //   title: 'Merchant Payout',
      //   icon: <Circle size={20} />,
      //   navLink: '/forms/merchantpayout'
      // }
  // {
  //   id: 'settlementmanagement',
  //   title: 'Settlement Management',
  //   icon: <CreditCard size={20} />,
  //   children: [
  //     {
  //       id: 'merchantslists',
  //       title: 'Merchants Settlement',
  //       icon: <Circle size={20} />,
  //       navLink: '/pg/merchantsettlecommession'
  //     },
  //     {
  //       id: 'transfersettlement',
  //       title: 'Transfer Settlement',
  //       icon: <Circle size={20} />,
  //       navLink: '/pg/transfersettelement'
  //     },
  //     {
  //       id: 'transactionstatus',
  //       title: 'Transaction Status',
  //       icon: <Circle size={20} />,
  //       navLink: '/pg/transactionstatus'
  //     },
  //     {
  //       id: 'settlementreport',
  //       title: 'Settlement Report',
  //       icon: <Circle size={20} />,
  //       navLink: '/pg/settlementreport'
  //     }
  //   ]
  // },

  // {
  //   id: 'payoutmanagement',
  //   title: 'Payout Management',
  //   icon: <Database size={20} />,
  //   children: [
  //     {
  //       id: 'nodaltransfer',
  //       title: 'Nodal Transfer',
  //       icon: <Circle size={20} />,
  //       navLink: '/pg/nodaltransfer'
  //     },
  //     {
  //       id: 'walletmanagement',
  //       title: 'Wallet Management',
  //       icon: <Circle size={20} />,
  //       navLink: '/pg/walletmanagement'
  //     }
  //   ]
  // }
  // {
  //   id: 'users',
  //   title: 'User',
  //   icon: <User size={20} />,
  //   children: [
  //     {
  //       id: 'list',
  //       title: 'List',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/user/list'
  //     },
  //     {
  //       id: 'view',
  //       title: 'View',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/user/view'
  //     },
  //     {
  //       id: 'edit',
  //       title: 'Edit',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/user/edit'
  //     }
  //   ]
  // }
  // {
  //   id: 'fraudpreventionsystem',
  //   title: 'Fraud Prevention System',
  //   icon: <Calendar size={20} />,
  //   navLink: '/pg/fraudpreventionsystem'
  // }, 
]
