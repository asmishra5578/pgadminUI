// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import UILoader from '@components/ui-loader'
// ** Table Data & Columns
import moment from "moment"

// import { columns } from './data'
import requestsApi from './request'
// ** Add New Modal Component
import PaymentrequestModal from './createrefundrequest'
import { useHistory } from 'react-router-dom'

// ** Third Party Components
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import Datatablecomponent from '../../../../layouts/components/Datatablecomponent'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'
import {
  Card, Badge,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row, Modal, ModalHeader, ModalBody, ModalFooter,
  Col
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
  // ** States 
  const history = useHistory()
  const [paymentreuestbtndisabled, setpaymentreuestbtndisabled] = useState(false)
  const [basicModal, setBasicModal] = useState(false)
  const [block, setBlock] = useState(true)
  const [modal, setModal] = useState(false)
  const [data, setdata] = useState([])
  const [getcompalinttype, setgetcompalinttype] = useState([])
  const [getticketdetails, setgetticketdetails] = useState([])
  const fromDate = moment().subtract(7, "days").format("YYYY-MM-DD")
  const toDate = moment().format("YYYY-MM-DD")
  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)
  const updatedata = () => {
    // console.log("final resonse")
    setBlock(true)
    requestsApidata.getRefundDetails(fromDate, toDate, "").then(res => {
      if (res.data.successCode === 'API_SUCCESS') {
        setdata(res.data.extraData.refundDetail)
        setBlock(false)
      } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session expired')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session expired')
        history.push('/')
      }
    })
  }
  useEffect(() => {
    requestsApidata.getRefundDetails(fromDate, toDate, "").then(res => {
      if (res.data.successCode === 'API_SUCCESS') {
        setdata(res.data.extraData.refundDetail)
        setBlock(false)
      } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session expired')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session expired')
        history.push('/')
      } else {
        toast.warning(res.data.msg[0])
      }
    })
  }, [])
  const paymentrequestsubmitdata = (data) => {
    //  console.log("submitticket", data)
    setpaymentreuestbtndisabled(true)
    requestsApidata.createComplaint(data).then(res => {
      // console.log("final resonse", res.data)
      if (res.data.successCode === 'API_SUCCESS') {
        setpaymentreuestbtndisabled(false)
        toast.success('Ticket Created Successfully')
        updatedata()
        setModal(!modal)
      } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session expired')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session expired')
        history.push('/')
      }
      // res.data.status === 'PENDING' ? toast.success(`Link has been send to ${res.data.custEmail}`) : toast.error(`Server error try again:`)
    })
  }
  const viewtickethandler = (e) => {
    console.log('viewtickethandler', e.target.id)
    requestsApidata.getRefundByMerchantIdOrStatus(e.target.id).then(res => {
      if (res.data.successCode === 'API_SUCCESS') {
        setgetticketdetails(res.data.extraData.refundDetail[0])
        setBasicModal(true)
      } else if (res.data.exception === "MERCHANT_ORDER_ID_VALIDATION") {
        toast.error(res.data.msg[0])
      } else if (res.data.exception === "REFUND_STATUS") {
        toast.error(res.data.msg[0])
      } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session expired')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session expired')
        history.push('/')
      }  else if (res.data.exception === "MERCHANT_ORDER_ID_NOT_FOUND") {
        toast.error(res.data.msg[0])
        // history.push('/')           
      }
    })
  }
  const columns = [
    {
      name: 'Merchant OrderID',
      selector: 'merchantOrderId',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Initiated By',
      selector: 'initiatedBy',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'Merchant ID',
      selector: 'merchantId',
      sortable: true
    },
    {
      name: 'Payment Option',
      selector: 'paymentOption',
      sortable: true
    },
    {
      name: 'Created At',
      selector: 'updated',
      sortable: true
    },
    {
      name: 'Amount',
      selector: 'amount',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true
    },
    {
      name: 'Action',
      cell: row => <span><Badge style={{ cursor: 'pointer' }} id={row.merchantOrderId} color="primary" onClick={viewtickethandler}>Show Ticket</Badge></span>
    }
  ]

  const approvedHandler = () => {
    Swal.fire({
      title: "Input Refund Text",
      // text: "Write something interesting:",
      input: 'text',
      showCancelButton: true
    }).then((result) => {
      // console.log('okji', result.value === "")
      if (result.value === "") {
        Swal.fire('Refund Text can not be empty')
      } else if (result.value) {
        console.log(result.value)
        // console.log('getticktdeeeee', getticketdetails)
        requestsApidata.refundUpdate(getticketdetails.merchantId, getticketdetails.merchantOrderId, "APPROVED", result.value).then(res => {
          if (res.data.successCode === 'API_SUCCESS') {
            Swal.fire({ text: 'Status updated Successfully', title: res.data.msg[0] }).then(() => {
              setBasicModal(!basicModal)
              updatedata()
            })
          } else if (res.data.exception === "REFUND_UPDATE_FAILED") {
            toast.warning(res.data.msg[0])
          }
        })
      }
    })
  }
  const rejectHandler = () => {
    Swal.fire({
      title: "Input Refund Text",
      // text: "Write something interesting:",
      input: 'text',
      showCancelButton: true
    }).then((result) => {
      // console.log('okji', result.value === "")
      if (result.value === "") {
        Swal.fire('Refund Text can not be empty')
      } else if (result.value) {
        console.log(result.value)
        // console.log('getticktdeeeee', getticketdetails)
        requestsApidata.refundUpdate(getticketdetails.merchantId, getticketdetails.merchantOrderId, "REJECTED", result.value).then(res => {
          if (res.data.successCode === 'API_SUCCESS') {
            Swal.fire({ text: 'Status updated Successfully', title: res.data.msg[0] }).then(() => {
              setBasicModal(!basicModal)
              updatedata()
            })
          } else if (res.data.exception === "REFUND_UPDATE_FAILED") {
            toast.warning(res.data.msg[0])
          }
        })
      }
    })
  }
  // ** Function to handle filter

  // ** Function to handle Pagination
  return (
    <Fragment>
      <UILoader blocking={block}>

        <Datatablecomponent data={data} handleModal={handleModal} coloumnsprops={columns} routename="List of Refund" isaddrefundrequest={true} updatedatahandler={updatedata} />
      </UILoader>
      <PaymentrequestModal open={modal} handleModal={handleModal} parentCallback={paymentrequestsubmitdata} paymentreuestbtndisabled={paymentreuestbtndisabled} complainttypedata={getcompalinttype} />
      <Modal isOpen={basicModal} toggle={() => setBasicModal(!basicModal)}>
        <ModalHeader toggle={() => setBasicModal(!basicModal)}>Merchant Order ID: {getticketdetails.merchantOrderId}</ModalHeader>
        <ModalBody>
          <div>
            <p style={{ fontWeight: 'bold' }}>Merchant ID: <span style={{ fontWeight: 'normal' }}>{getticketdetails.merchantId}</span></p>
            <p style={{ fontWeight: 'bold' }}>Amount: <span style={{ fontWeight: 'normal' }}>{getticketdetails.amount}</span></p>
            <p style={{ fontWeight: 'bold' }}>Payment Option: <span style={{ fontWeight: 'normal' }}>{getticketdetails.paymentOption}</span></p>
            <p style={{ fontWeight: 'bold' }}>Status: <span style={{ fontWeight: 'normal' }}>{getticketdetails.status}</span></p>
            {/* <p style={{fontWeight:'bold'}}><span style={{fontWeight:'normal'}}></span></p>
            <p style={{fontWeight:'bold'}}><span style={{fontWeight:'normal'}}></span></p> */}
            {/* {getticketdetails.status === "OPEN" ? <div>close inprogress</div> : getticketdetails.status === "CLOSED" ? <div>Reopen</div> : getticketdetails.status === "REOPEN" ? <div>close inprogress</div> : getticketdetails.status === "INPROGESS" ? <div>close</div> : null} */}
            {getticketdetails.status === "INITIATED" ? <div>
              <Badge color='success' style={{ cursor: 'pointer' }} onClick={approvedHandler}>APPROVED</Badge>
              <Badge color='danger' style={{ cursor: 'pointer', marginLeft: 10 }} onClick={rejectHandler}>REJECT</Badge>

            </div> : null}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => setBasicModal(!basicModal)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

export default DataTableWithButtons
