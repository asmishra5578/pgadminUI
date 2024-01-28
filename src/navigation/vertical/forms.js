import { Copy, Circle, Box, Package, CheckCircle, RotateCw, Database, CreditCard, User, Download } from 'react-feather'

export default [
  {
    header: 'Payout'
  },
  {
    id: 'CommessionManagement',
    title: 'Commession Management',
    icon: <CheckCircle size={20} />,
    navLink: '/payout/commessionmanagement'
  },
  {
    id: 'BulkReversal',
    title: 'Bulk Reversal',
    icon: <CheckCircle size={20} />,
    navLink: '/payout/bulkreversal'
  },
  {
    id: 'payouttransactionmanage',
    title: 'Transaction Update',
    icon: <CreditCard size={20} />,
    children: [
      {
        id: 'payoutmercssshantwise',
        title: 'Update Transaction',
        icon: <CreditCard size={20} />,
        navLink: '/payout/transactionupdate'
      },
      {
        id: 'paypoutpgwissssedownloadreport',
        title: 'Bulk Updation',
        icon: <CreditCard size={20} />,
        navLink: '/payout/bulkupdate'
      }
    ]
  },
  { 
    id: 'payoutpgmanage',
    title: 'PG Management',
    icon: <User size={20} />,
    children: [
      {
        id: 'PayoutPGDetails',
        title: 'PG Details',
        icon: <Circle size={12} />,
        navLink: '/payout/pgdetails'
      },
      {
        id: 'PayoutCreatePG',
        title: 'Create PG',
        icon: <Circle size={20} />,
        navLink: '/payout/createpg'
      }
    ]
  },
  {
    id: 'createpayoutuser',
    title: 'Enable Payout',
    icon: <CheckCircle size={20} />,
    navLink: '/payout/createuser'
  },
  {
    id: 'payoutwalletlist',
    title: 'Wallet List',
    icon: <CheckCircle size={20} />,
    navLink: '/payout/walletlist'
  },
  {
    id: 'walletrecharge',
    title: 'Wallet Recharge',
    icon: <Circle size={20} />,
    navLink: '/payout/wallerRecharge'
  },
  {
    id: 'rechargerequest',
    title: 'Recharge Request',
    icon: <Circle size={20} />,
    navLink: '/payout/RechargeRequest'
  },
  {
    id: 'payoutreport',
    title: 'Report',
    icon: <Database size={20} />,
    children: [
      {
        id: 'alltransactionreport',
        title: 'Transaction Report',
        icon: <Circle size={20} />,
        navLink: '/payout/transactionReport'
      },
      {
        id: 'fraudpreventionsystem',
        title: 'Wallet Report',
        icon: <Circle size={20} />,
        navLink: '/payout/walletReport'
      }
      // {
      //   id: 'merchantwisereport',
      //   title: 'Merchant Wise',
      //   icon: <Circle size={20} />,
      //   navLink: '/payout/merchantwisereport'
      // }
    ]
  },
  {
    id: 'merchantmanage',
    title: 'Merchant Management',
    icon: <User size={20} />,
    children: [
      {
        id: 'payoutmerchantlist',
        title: 'Merchant Details',
        icon: <Circle size={12} />,
        navLink: '/payout/merchantlist'
      },
      {
        id: 'updatemerchantpayout',
        title: 'Update Merchant',
        icon: <Circle size={20} />,
        navLink: '/payout/updatemerchant'
      },
      {
        id: 'ipmanagemrnt',
        title: 'IP Manage',
        // icon: <CheckCircle size={20} />,
        icon: <Circle size={20} />,
        navLink: '/payout/IPmanagement'
      }
    ]
  },
  {
    id: 'payoutreportdownloadfile',
    title: 'Download Report',
    icon: <Download size={20} />,
    children: [
      {
        id: 'merchantwise',
        title: 'Merchant Wise',
        icon: <Download size={20} />,
        navLink: '/payout/downloadReportsmerchantwise'
      },
      {
        id: 'wallettransactionreportmerchantwise',
        title: 'Wallet Merchant Wise',
        icon: <Download size={20} />,
        navLink: '/payout/wallettransactionreportmerchantwise'
      },
      {
        id: 'pgwisedownloadreport',
        title: 'PG Wise',
        icon: <Download size={20} />,
        navLink: '/payout/pgwisedownloadreport'
      }
    ]
  }
  // {
  //   id: 'payoutwalletmanage',
  //   title: 'Wallet Management',
  //   icon: <CreditCard size={20} />,
  //   children: [
  //     {
  //       id: 'walletrecharge',
  //       title: 'Wallet Recharge',
  //       icon: <Circle size={20} />,
  //       navLink: '/payout/wallerRecharge'
  //     },
  //     {
  //       id: 'rechargerequest',
  //       title: 'Recharge Request',
  //       icon: <Circle size={20} />,
  //       navLink: '/payout/RechargeRequest'
  //     }
  //   ]
  // },
  // {
  //   id: 'payouttransactionmanage',
  //   title: 'Transaction Management',
  //   icon: <CreditCard size={20} />,
  //   children: [
  //     {
  //       id: 'payouttransactionmanage',
  //       title: 'Bulk Update',
  //       icon: <Circle size={20} />,
  //       navLink: '/payout/bulkupdate'
  //     }
  //   ]
  // },
 
  // {
  //   id: 'ipmanagemrnt',
  //   title: 'IP Manage',
  //   icon: <CheckCircle size={20} />,
  //   navLink: '/payout/IPmanagement'
  // },

  // below code is unuseable it may use when updating is requires

   // {
      //   id: 'Payoutupdatepg',
      //   title: 'Update PG',
      //   icon: <Circle size={20} />,
      //   navLink: '/payout/updatepg'
      // }
  // {
  //   id: 'payouts',
  //   title: 'Payouts',
  //   icon: <Box size={20} />,
  //   navLink: '/payout'
  //   // action: 'manage',
  //   // resource: 'ACL'
  // }
  // {
  //   id: 'formElements',
  //   title: 'Form Elements',
  //   icon: <Copy size={20} />,
  //   children: [
  //     {
  //       id: 'input',
  //       title: 'Input',
  //       icon: <Circle size={12} />,
  //       navLink: '/forms/elements/input'
  //     },
  //     {
  //       id: 'inputGroup',
  //       title: 'Input Groups',
  //       icon: <Circle size={12} />,
  //       navLink: '/forms/elements/input-group'
  //     },
  //     {
  //       id: 'inputMask',
  //       title: 'Input Mask',
  //       icon: <Circle size={12} />,
  //       navLink: '/forms/elements/input-mask'
  //     },
  //     {
  //       id: 'textarea',
  //       title: 'Textarea',
  //       icon: <Circle size={12} />,
  //       navLink: '/forms/elements/textarea'
  //     },
  //     {
  //       id: 'checkbox',
  //       title: 'Checkbox',
  //       icon: <Circle size={12} />,
  //       navLink: '/forms/elements/checkbox'
  //     },
  //     {
  //       id: 'radio',
  //       title: 'Radio',
  //       icon: <Circle size={12} />,
  //       navLink: '/forms/elements/radio'
  //     },
  //     {
  //       id: 'switch',
  //       title: 'Switch',
  //       icon: <Circle size={12} />,
  //       navLink: '/forms/elements/switch'
  //     },
  //     {
  //       id: 'select',
  //       title: 'Select',
  //       icon: <Circle size={12} />,
  //       navLink: '/forms/elements/select'
  //     },
  //     {
  //       id: 'numberInput',
  //       title: 'Number Input',
  //       icon: <Circle size={12} />,
  //       navLink: '/forms/elements/number-input'
  //     },
  //     {
  //       id: 'fileUploader',
  //       title: 'File Uploader',
  //       icon: <Circle size={12} />,
  //       navLink: '/forms/elements/file-uploader'
  //     },
  //     {
  //       id: 'quillEditor',
  //       title: 'Editor',
  //       icon: <Circle size={12} />,
  //       navLink: '/forms/elements/editor'
  //     },
  //     {
  //       id: 'date_&_timePicker',
  //       title: 'Date & Time Picker',
  //       icon: <Circle size={12} />,
  //       navLink: '/forms/elements/pickers'
  //     }
  //   ]
  // },
  // {
  //   id: 'formLayouts',
  //   title: 'Form Layout',
  //   icon: <Box size={20} />,

  //   navLink: '/forms/layout/form-layout'
  // },
  // {
  //   id: 'wizard',
  //   title: 'Form Wizard',
  //   icon: <Package size={20} />,

  //   navLink: '/forms/wizard'
  // },
  // {
  //   id: 'formValidation',
  //   title: 'Form Validation',
  //   icon: <CheckCircle size={20} />,
  //   children: [
  //     {
  //       id: 'reactHookForm',
  //       title: 'React Hook Form',
  //       icon: <Circle size={12} />,
  //       navLink: '/forms/react-hook-form'
  //     },
  //     {
  //       id: 'reactstrapVal',
  //       title: 'Reactstrap',
  //       icon: <Circle size={12} />,
  //       navLink: '/forms/reactstrap-validation'
  //     }
  //   ]
  // },
  // {
  //   id: 'formRepeater',
  //   title: 'Form Repeater',
  //   icon: <RotateCw size={20} />,
  //   navLink: '/forms/form-repeater'
  // }
]