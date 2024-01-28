import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import { useForm, Controller } from 'react-hook-form'
import {
  Label, Input, FormGroup, Row, Col, Button, Form, Modal,
  ModalHeader, CardTitle, CardBody,
  ModalBody
} from 'reactstrap'
import { Fragment, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import UILoader from '@components/ui-loader'
import { useHistory } from 'react-router-dom'

// import { columns } from './merchantdata'
import Datatablecomponent from '../../../../layouts/components/Datatablecomponent'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import DataTable from 'react-data-table-component'
import requestsApi from './request'
import st from '../../../../@core/secureStore/useSecure'
import Badge from 'reactstrap/lib/Badge'
import Swal from 'sweetalert2'
import { X } from 'react-feather'
import Select from 'react-select'

const requestsApidata = new requestsApi()

const InfoTabContent = ({ }) => {
  const [block, setBlock] = useState(true)
  const [Bankinfo, setBankinfo] = useState([])
  const [modal, setModal] = useState(false)
  const handleModal = () => setModal(!modal)
  const onSubmit = data => trigger()
  const [searchValue, setSearchValue] = useState('')
  const history = useHistory()
  const [buttondisabled, setbuttondisabled] = useState(false)
  const [PayoutEnabledmerchantID, setPayoutEnabledmerchantID] = useState('')
  const [data, setdata] = useState([])
  const [mainwalletlistdata, setmainwalletlistdata] = useState([])
  const [selectmainwalltetValue, setselectmainwalltetValue] = useState('Select')
  const [walletnameenablepayout, setwalletnameenablepayout] = useState('')
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  const getallmerchant = () => {
    setBlock(true)
    requestsApidata.allMerchantDetailsReport().then(res => {
      // console.log("final resonse", res.data)
      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        // toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        // toast.error('Session Expired Login again!')
        history.push('/')
      } else {
        setdata(res.data.extraData.merchantDetails)
        setBlock(false)
        setSearchValue('')
      }
    })
  }
  const selectmainwalletHandler = (e) => {
    setselectmainwalltetValue(e)
  }
  const blockmerchanthandler = (e) => {
    // console.log('id', e.target.id)
    setBlock(true)
    requestsApidata.updateMerchantStatus(e.target.id, "BLOCKED").then(res => {
      // console.log('res update merchant', res.data)
      if (res.data.merchantStatus === "BLOCKED") {
        getallmerchant()
        toast.success('Merchant Blocked Successfully')
      } else {
        toast.warning(res.data.msg[0])
      }
    })
  }
  const searchalldataHandler = (e) => {
    console.log("e.target.value", e.target.value.length)
    setSearchValue(e.target.value)
    if (e.target.value.length) {
      const updatedData = data.filter(item => {
        const startsWith =
          item.merchantId.startsWith(e.target.value) ||
          item.merchantName.startsWith(e.target.value) ||
          item.merchantEMail.startsWith(e.target.value) ||
          item.phoneNumber.startsWith(e.target.value) ||
          item.merchantAppId.startsWith(e.target.value)
        // item.merchantSecretKey.startsWith(e.target.value)
        // ||
        // item.pgType.startsWith(e.target.value) ||
        // item.merchantId.startsWith(e.target.value) ||
        // item.pgOrderID.startsWith(e.target.value) ||
        // item.status.startsWith(e.target.value) ||
        // item.emailId.startsWith(e.target.value) ||
        // item.paymentOption.startsWith(e.target.value) ||
        // item.orderID.startsWith(e.target.value)  ||
        // item.pgId.startsWith(e.target.value) ||
        // item.amount.startsWith(e.target.value) 

        const includes =
          item.merchantId.includes(e.target.value) ||
          item.merchantName.includes(e.target.value) ||
          item.merchantEMail.includes(e.target.value) ||
          item.phoneNumber.includes(e.target.value) ||
          item.merchantAppId.includes(e.target.value)
        // item.merchantSecretKey.includes(e.target.value)
        // ||
        // item.pgType.includes(e.target.value) ||
        // item.merchantId.includes(e.target.value) ||
        // item.pgOrderID.includes(e.target.value) ||
        // item.status.includes(e.target.value)  ||
        // item.emailId.includes(e.target.value) ||
        // item.paymentOption.includes(e.target.value) ||
        // item.orderID.includes(e.target.value) ||
        // item.pgId.includes(e.target.value) ||
        // item.amount.includes(e.target.value)

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setdata(updatedData)
      setSearchValue(e.target.value)
    } else {
      getallmerchant()
    }
  }
  const activemerchanthandler = (e) => {
    // console.log('id', e.target.id)
    setBlock(true)
    requestsApidata.updateMerchantStatus(e.target.id, "ACTIVE").then(res => {
      // console.log('res update merchant', res.data)
      if (res.data.merchantStatus === "ACTIVE") {
        getallmerchant()
        toast.success('Merchant Active Successfully')
      } else {
        toast.warning(res.data.msg[0])
      }
    })
  }
  const changepasswordhandler = (e) => {
    console.log('id', e.target.id)
    requestsApidata.adminchangemerchantpassword(e.target.id).then(res => {
      console.log('adminchangemerchantpassword', res.data)
      if (res.data.statusCode === 200) {
        Swal.fire({
          title: 'Password changed successfully, Password is',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          icon: 'success',
          confirmButtonText: 'Done',
          text: res.data.extraData.MerchantDetailsKey.merchantDetails.password
        })
      }
    })
  }
  const showsecretkeyhandler = (e) => {
    // console.log("eeeee", e.target.id)
    setbuttondisabled(true)
    requestsApidata.getAppIdAndSecretByMerchantDetails(e.target.id).then((res) => {
      console.log('data', res.data)
      Swal.fire({ text: res.data.secret_id, title: 'Merchant Secret Key', icon: 'success', allowEnterKey: false, allowOutsideClick: false }).then(() => {
        setbuttondisabled(false)
      })
    })
  }
  const openModalEnabledPayout = (e) => {
    console.log('eeeeeee', e.target.id)
    setPayoutEnabledmerchantID(e.target.id)
    requestsApidata.getMainWalletList().then(res => {
      // console.log('getMainWalletList', res.data)

      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else {
        console.log('getMainWalletList', res.data[0].walletid)
        setmainwalletlistdata(res.data)
        handleModal()

      }
    })
  }
  const finalsubmitEnabledPayout = () => {
    console.log('PayoutEnabledmerchantID', PayoutEnabledmerchantID, walletnameenablepayout, selectmainwalltetValue.value)
    if (walletnameenablepayout === "") {
      toast.warning('Wallet name can not be empty')
    } else if (selectmainwalltetValue === "Select") {
      toast.warning('Select Main Wallet ID')
    } else {
      requestsApidata.WalletCreationforpayin(PayoutEnabledmerchantID, walletnameenablepayout, selectmainwalltetValue.value).then((res) => {
        if (res.data.responseStatus === "SUCCESS") {
          Swal.fire({ allowEnterKey: false, allowOutsideClick: false, allowEscapeKey: false, text: 'Wallet Created Sucessfully' }).then(() => {
            // history.push('/payout/walletlist')
            handleModal()
          })
        } else {
          toast.warning(res.data.msg[0])
        }
      })
    }
  }
  const disabledcommissionHandler = (e) => {
    console.log('disabledcommissionHandler', e.target.id)
    setBlock(true)
    requestsApidata.updatemerchantcommissionautoenable(e.target.id, "BLOCKED").then(res => {
      // console.log('res update merchant', res.data)
      if (res.data.successCode === "API_SUCCESS") {
        getallmerchant()
        toast.success('Merchant Auto Payout Recharge Disabled')
      } else {
        toast.warning(res.data.msg[0])
      }
    })
  }
  const enablecommissionHandler = (e) => {
    console.log('enablecommissionHandler', e.target.id)
    setBlock(true)
    requestsApidata.updatemerchantcommissionautoenable(e.target.id, "ACTIVE").then(res => {
      // console.log('res update merchant', res.data)
      if (res.data.successCode === "API_SUCCESS") {
        getallmerchant()
        toast.success('Merchant Auto Payout Recharge Enabled')
      } else {
        toast.warning(res.data.msg[0])
      }
    })
  }
  const columns = [
    {
      name: 'Merchant ID',
      selector: 'merchantId',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Merchant Email',
      selector: 'merchantEMail',
      sortable: true,
      minWidth: '250px'
    },
    {
      name: 'merchantAppId',
      selector: 'merchantAppId',
      sortable: true,
      minWidth: '300px'
    },
    {
      name: 'Merchant Salt Key',
      selector: 'saltKey',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'Merchant SecretKey',
      // selector: 'merchantSecretKey',
      sortable: true,
      minWidth: '10px',
      cell: (row) => <Badge disabled={buttondisabled} style={{ cursor: 'pointer' }} color='primary' id={row.merchantId} onClick={showsecretkeyhandler}>View</Badge>
    },
    {
      name: 'Phone Number',
      selector: 'phoneNumber',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Merchant Status',
      selector: 'merchantStatus',
      sortable: true,
      minWidth: '10px'
      // cell: row => {
      //   return (
      //   row.kycStatus === "ACTIVE" ? "YES" : row.kycStatus === "Yes" ? "YES" : row.kycStatus === "BLOCKED" ? "NO" : null
      //   )
      // }
    },
    {
      name: 'Payout Status',
      sortable: true,
      selector: 'payoutFlag',
      minWidth: '150px',
      cell: (row) => { return row.payoutFlag === "ACTIVE" ? <Badge color='success'>ACTIVE</Badge> : <span>Not Enabled</span> }
    },
    {
      name: 'ACTION',
      sortable: true,
      cell: row => {
        return <div style={{ display: 'flex' }}>
          <div>{row.payoutFlag === null ? <Badge color='success' id={row.merchantId} onClick={openModalEnabledPayout}>Enable Payout</Badge> : null}</div>
          <div> {row.merchantStatus === "ACTIVE" ? <Badge color='danger' style={{ marginLeft: 10, cursor: 'pointer' }} id={row.merchantId} onClick={blockmerchanthandler}>BLOCK Merchant</Badge> : row.merchantStatus === "PENDING" ? <Badge color='danger' style={{ cursor: 'pointer', marginLeft: 10 }} id={row.merchantId} onClick={blockmerchanthandler}>BLOCK Merchant</Badge> : row.merchantStatus === "BLOCKED" ? <Badge color='success' style={{ cursor: 'pointer', marginLeft: 10 }} id={row.merchantId} onClick={activemerchanthandler}>ACTIVE Merchant</Badge> : null}</div>
          <div> <Badge color='info' style={{ cursor: 'pointer', marginLeft: 10 }} id={row.merchantId} onClick={changepasswordhandler}>Change Password</Badge></div>
          <div> {row.commProcessAuto === "ACTIVE" ? <Badge color='danger' style={{ marginLeft: 10, cursor: 'pointer' }} id={row.merchantId} onClick={disabledcommissionHandler}>Disabled Auto Payout Recharge</Badge> : row.commProcessAuto === "BLOCKED"  || row.commProcessAuto === null ? <Badge color='success' style={{ cursor: 'pointer', marginLeft: 10 }} id={row.merchantId} onClick={enablecommissionHandler}>Enable Auto Payout Recharge</Badge> : null}</div>

          {/* {row.merchantStatus === "BLOCKED" ? <Badge color='success' style={{cursor:'pointer'}} id={row.merchantId} onClick={activemerchanthandler}>ACTIVE</Badge> : row.kycStatus === "ACTIVE" || row.kycStatus === "PENDING" ? <Badge color='danger' style={{cursor:'pointer'}} id={row.merchantId} onClick={blockmerchanthandler}>BLOCK</Badge> : null}   */}
        </div>
      }
    }
  ]

  useEffect(() => {
    getallmerchant()
  }, [])
  const selectmainwalletoptions =
    mainwalletlistdata.map((v) => {
      return { value: v.walletid, label: `${v.walletid} (${v.name}) ` }
    })
  // const sendmerchantid = st.get('merchantid')
  return (
    <Fragment>
      <p></p>
      <UILoader blocking={block}>
        <Datatablecomponent data={data} isaddrefresh isaddfilter searchValue={searchValue} searchFilter={searchalldataHandler}
          refreshdata={getallmerchant} coloumnsprops={columns} routename="Merchant List" />
      </UILoader>
      <Modal
        isOpen={modal}
        toggle={handleModal}
        className='sidebar-sm'
        modalClassName='modal-slide-in'
        contentClassName='pt-0'
      >
        <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
          <h5 className='modal-title'>New Record</h5>
        </ModalHeader>
        <ModalBody className='flex-grow-1'>
          <CardTitle tag='h4'>Account Transfer</CardTitle>
          <div style={{marginTop:10}}>
            <Label className='form-label' for={`bankName`}>
              Select Main Wallet Id <span style={{ color: 'red', fontWeight: 'bold' }}>*</span>
            </Label>
            <Select
              isClearable={false}
              id='kycStatus'
              className='react-select'
              classNamePrefix='select'
              options={selectmainwalletoptions}
              onChange={selectmainwalletHandler}
              value={selectmainwalltetValue}
            />
          </div>
          <div style={{marginTop:10}}>
            <Label className='form-label' for={`walletname`}>
              Wallet Name<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
            </Label>
            <Input
              name={`walletname`}
              id={`walletname`}
              placeholder='Wallet Name'
             onChange={(e) => setwalletnameenablepayout(e.target.value)}
             value={walletnameenablepayout}
            />
          </div>
          <div style={{marginTop:10}}>
          <Button className='mr-1' color='primary' onClick={finalsubmitEnabledPayout}>
            Submit
          </Button>
          <Button color='secondary' onClick={handleModal} outline>
            Cancel
          </Button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default InfoTabContent
