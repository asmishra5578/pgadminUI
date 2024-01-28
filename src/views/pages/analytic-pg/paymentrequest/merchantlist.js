// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import UILoader from '@components/ui-loader'
// ** Table Data & Columns
import moment from "moment"
import { useHistory } from 'react-router-dom'

// import { columns } from './data'
import requestsApi from '../requests'
// ** Add New Modal Component
import CreatemerchantModal from './paymentrequest'

// ** Third Party Components
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
// import Datatablecomponent from './datatablecomponent'
import Datatablecomponent from './datatablecomponent'

import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row,
  Col,
  Badge
} from 'reactstrap'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className='custom-control custom-checkbox'>
    <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    <label className='custom-control-label' onClick={onClick} />
  </div>
))
const requestsApidata = new requestsApi()

const DataTableWithButtons = () => {
  // console.log("response datad----->", data({}))
  const history = useHistory()

  // ** States
  const [startDate, setstartDate] = useState('')
  const [searchStartDate, setsearchStartDate] = useState('')
  const [endDate, setendDate] = useState('')
  const [searchEndDate, setsearchEndDate] = useState('')
  const [block, setBlock] = useState(true)
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setdata] = useState([])
  const [buttondisabled, setbuttondisabled] = useState(false)
  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)
  const getallmerchant = () => {
    setBlock(true)
    requestsApidata.allMerchantDetailsReport().then(res => {
      if (res.data.successCode === "API_SUCCESS") {
        setdata(res.data.extraData.merchantDetails)
        setBlock(false)
        setSearchValue('')
      } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      }
    })
  }
  useEffect(() => {
    getallmerchant()
  }, [])
  const createmerchantrequestdata = (data) => {
    console.log("createmerchantrequestdata", data)
    requestsApidata.paymentrequestApi(data.Name, data.phonenumber, data.email, data.amount, data.linkexpire, data.orderNote).then(res => {
      console.log("final resonse", res.data)
      // res.data.status === 'PENDING' ? toast.success(`Link has been send to ${res.data.custEmail}`) : toast.error(`Server error try again:`)
      if (res.data.status === 'PENDING') {
        toast.success(`Link has been send to ${res.data.custEmail}`)
        setModal(!modal)
      } else {
        toast.error(`Server error try again:`)
      }
    })
  }
  // ** Function to handle filter

  // ** Function to handle Pagination
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
  const showsecretkeyhandler = (e) => {
    console.log("eeeee", e.target.id)
    setbuttondisabled(true)
    requestsApidata.getAppIdAndSecretByMerchantDetails(e.target.id).then((res) => {
      console.log('data', res.data)
      Swal.fire({ text: res.data.secret_id, title: 'Merchant Secret Key', icon: 'success', allowEnterKey: false, allowOutsideClick: false }).then(() => {
        setbuttondisabled(false)
      })
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
      name: 'Merchant AppId',
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
      minWidth: '250px',
      cell: (row) => <Badge disabled={buttondisabled} style={{ cursor: 'pointer' }} color='primary' id={row.merchantId} onClick={showsecretkeyhandler}>View</Badge>
    },
    {
      name: 'Merchant Name',
      selector: 'merchantName',
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
      name: 'Phone Number',
      selector: 'phoneNumber',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'KYC Status',
      selector: 'kycStatus',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Payout Status',
      sortable: true,
      selector: 'payoutFlag',
      minWidth: '150px',
      cell: (row) => { return row.payoutFlag === "ACTIVE" ? <Badge color='success'>ACTIVE</Badge> : <span>Not Enabled</span> }
    },

    {
      name: 'Merchant Status',
      selector: 'merchantStatus',
      sortable: true,
      minWidth: '150px'
      // cell: (row) => <span>{ <Badge color={row.merchantStatus === "ACTIVE" ? "success" : row.merchantStatus === "PENDING" ? "warning" : "primary"}>{row.merchantStatus}</Badge>}</span>
    }
  ]
  return (
    <Fragment>
      <UILoader blocking={block}>

        <Datatablecomponent searchValue={searchValue} searchFilter={searchalldataHandler}
          data={data} isaddrefresh isaddfilter refreshdata={getallmerchant} handleModal={handleModal} coloumnsprops={columns} routename="Merchant List" />
      </UILoader>
      {/* <CreatemerchantModal open={modal} handleModal={handleModal} parentCallback={createmerchantrequestdata}/> */}
    </Fragment>
  )
}

export default DataTableWithButtons
