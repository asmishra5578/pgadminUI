// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import moment from "moment"
import axios from 'axios'
// ** Table Data & Columns
// import { columns } from './data'
import { useHistory } from 'react-router-dom'

// import responsedata from './requests'
import requestsApi from '../request'
// ** Add New Modal Component

import Payoutupitansfer from './updateModal'
import UILoader from '@components/ui-loader'
import DatePicker from "react-datepicker"
import { addDays } from "date-fns"
import "react-datepicker/dist/react-datepicker.css"
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, RotateCw } from 'react-feather'
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
  Modal, ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import { toast } from 'react-toastify'
import DataTableWithButtons from '../../../../../layouts/components/Datatablecomponent'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className='custom-control custom-checkbox'>
    <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    <label className='custom-control-label' onClick={onClick} />
  </div>
))
const requestsApidata = new requestsApi()
const Settlementreport = () => {
  // useEffect(() => {

  const history = useHistory()

  // });
  // ** States disabledaccountbtn disabledupitransbtn
  const [disabledaccountbtn, setdisabledaccountbtn] = useState(false)
  const [disabledupitransbtn, setdisabledupitransbtn] = useState(false)
  const [displayUPIloading, setdisplayUPIloading] = useState(false)
  const [displayACCOUNTloading, setdisplayACCOUNTloading] = useState(false)
  const [walletbalance, setwalletbalance] = useState('')
  const [getMerchanrID, setgetMerchanrID] = useState('')
  const [block, setBlock] = useState(false)
  const [accountmodal, setaccountModal] = useState(false)
  const [upimodal, setupiModal] = useState(false)
  const [tableblock, settableblock] = useState(true)
  const [allbulktransactionData, setallbulktransactionData] = useState([])

  const [modal, setModal] = useState(false)
  const [openresponseACCandUPIModal, setopenresponseACCandUPIModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setdata] = useState([])
  const [settlement, setsettlement] = useState('Settlements')
  const [startDate, setstartDate] = useState('')
  const [searchStartDate, setsearchStartDate] = useState('')
  const [endDate, setendDate] = useState('')
  const [searchEndDate, setsearchEndDate] = useState('')
  const [responsedata, setresponsedata] = useState([])
  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)
  const accounthandleModal = () => setaccountModal(!accountmodal)
  const upihandlerModal = () => setupiModal(!upimodal)
  const responseACCandUPIModal = () => setopenresponseACCandUPIModal(!openresponseACCandUPIModal)

  // ** Function to handle filter


  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }


  const refreshdata = () => {
    settableblock(true)
    requestsApidata.getallTransactionChangeRequestPayout().then(res => {
      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else {
        settableblock(false)
        setallbulktransactionData(res.data)
      }
    })
  }

  useEffect(() => {
    // console.log(fromDate, toDate)
    requestsApidata.getallTransactionChangeRequestPayout().then(res => {
      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else {
        settableblock(false)
        setallbulktransactionData(res.data)
      }
    })
  }, [])

 const columns = [
    {
      name: 'Order Ids',
      selector: 'orderIds',
      sortable: true,
      minWidth: '400px'
    },
    {
      name: 'Total Count',
      selector: 'count',
      sortable: true
    },
    {
      name: 'Success Count',
      selector: 'sucessCount',
      sortable: true,
      minWidth: '10px'
      // cell: row => <span>{row.count - row.failCount}</span>
    },
    {
      name: 'Fail Count',
      selector: 'failCount',
      sortable: true,
      minWidth: '10px'
    },
    {
      name: 'Comment',
      selector: 'comment',
      sortable: true
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      minWidth: '100px'
    }
  ]
  // const filteByDate = () => {
  //   setBlock(true)
  //   requestsApidata.getpayouttransactionReport(searchStartDate, searchEndDate).then(res => {
  //     console.log('res', res.data)
  //     if (res.data.status === "FAILURE") {
  //      toast.error(res.data.statusMessage)
  //      setBlock(false)
  //     } else {
  //     setdata(res.data.result)
  //   setBlock(false)
  //     }
  //   })
  // }

  const filteByDate = () => {
    const fromDate2 = moment().format("YYYY-MM-DD")
    const toDate2 = moment().format("YYYY-MM-DD")
    console.log("end date", endDate === "")
    // if (startDate === "") {
    //   toast.warning('Date from can not be empty')
    // } else {
    setBlock(true)
    requestsApidata.getpayouttransactionReport(startDate === "" ? fromDate2 : searchStartDate, endDate === "" ? fromDate2 : searchEndDate).then(res => {
      if (res.data.status === "FAILURE") {
        toast.error(res.data.statusMessage)
        setBlock(false)
      } else {
        setdata(res.data.result)
        setBlock(false)
      }
    })
    // }
  }
  const searchStartdatehandle = (e) => {
    setstartDate(e)
    setsearchStartDate(moment(e, "DDMMYYYY").format("YYYY-MM-DD"))
  }
  const searchEnddatehandle = (e) => {
    if (startDate === "") {
      alert("Kindly first select start date")
    } else {
      setendDate(e)
      setsearchEndDate(moment(e, "DDMMYYYY").format("YYYY-MM-DD"))
    }
  }
  const walletdatahandler = (data) => {
    // console.log('walletdatahandler', data)
    requestsApidata.getpayoutwallettransfer(data).then(res => {
      // console.log('res', res.data)
      if (res.data.status === "ACCEPTED") {
        toast.success(`${res.data.status}:${res.data.message},orderID:${res.data.orderid}`)
        setModal(!modal)
      } else if (res.data.status === 'FAILURE') {
        toast.error(`${res.data.status}:${res.data.message},orderID:${res.data.orderid}`)
      } else if (res.data.exception === 'E0100') {
        toast.error(`Insufficient balance in wallet`)
      } else toast.error(`Server error try again:${res.data.message}`)
    })
  }

  const accounttransferhan = (data, UPIverifiedtoken) => {

    // data.purpose = "SALARY_DISBURSEMENT"
    // console.log(data)
    setdisabledaccountbtn(true)
    setdisplayACCOUNTloading(true)
    requestsApidata.getpayoutaccountTransfer(data, UPIverifiedtoken).then(res => {
      // console.log('res', res.data)
      setdisabledaccountbtn(false)
      setdisplayACCOUNTloading(false)
      setresponsedata(res.data)
      accounthandleModal()
      setopenresponseACCandUPIModal(true)
      // if (res.data.status === "ACCEPTED") {
      //   // toast.success(`${res.data.status}:${res.data.message},orderID:${res.data.orderid}`)
      //   toast.success('Account Transfer successfully done')
      //   setaccountModal(!accountmodal)
      // } else if (res.data.status === 'FAILURE') {
      //   toast.error('Account Trasfer is failure')
      //   // toast.error(`${res.data.status}:${res.data.message},orderID:${res.data.orderid}`)
      // } else if (res.data.exception === 'E0100') {
      //   toast.error(`Insufficient balance in wallet`)
      // } else toast.error(`Server error try again:${res.data.message}`)
    })
  }
  const upitransferparent = (data) => {
    console.log("upitransferparent", data)
    setdisabledupitransbtn(true)
    setdisplayUPIloading(true)
    requestsApidata.updateTransactionStatus(data).then(res => {
      console.log('res', res.data.successDataTransactionChangeResponce === null)
      setdisabledupitransbtn(false)
      setdisplayUPIloading(false)
      setresponsedata(res.data)
      upihandlerModal()
      setopenresponseACCandUPIModal(true)
    })
  }

  return (
    <Fragment>
      {/* <DataTable
          noHeader
          pagination
          // selectableRows
          columns={columns}
          paginationPerPage={7}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          // paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : data}
          // selectableRowsComponent={BootstrapCheckbox}
        /> */}
      {/* <Card style={{padding:10}}>
          <div style={{display:"inline"}}>
          <Button color='primary' size="sm" onClick={() => settlementApihandler()}>Settlement Data</Button>
          <Button color='primary' size="sm" style={{marginLeft:9}}
          onClick={() => UnsettlementApihandler()}
          >UnSettlement Data</Button> 
          </div>
        
        </Card> */}
      {/* <div style={{ display: "flex", marginBottom: 10, marginTop: 9 }}>
        <div>
          <Label className="mr-1">Date Range From</Label>
          <br />
          <DatePicker
            className="form-control w-100"
            selected={startDate}
            onChange={searchStartdatehandle}
            peekNextMonth
            showMonthDropdown
            placeholderText="Date Range From"
            maxDate={new Date()}
          />
        </div>
        <div style={{ marginLeft: 10 }}>
          <Label className="mr-1">Date Range To</Label>
          <br />
          <DatePicker
            className="form-control w-100"
            selected={endDate}
            onChange={searchEnddatehandle}
            peekNextMonth
            showMonthDropdown
            // showYearDropdown
            placeholderText="Range To"
            minDate={startDate}
            maxDate={new Date()}
          // maxDate={addDays(new Date(startDate), 30)}
          />
        </div>

        <div style={{ marginTop: 20, marginLeft: 10 }}>
          <Button color="primary"
            onClick={filteByDate}
          >
            FILTER
          </Button>
        </div>
        <div style={{ marginTop: 20, marginLeft: 10 }}>
          <Button color="primary"
            onClick={refreshdata}
          >
            <RotateCw size={10} />
          </Button>
        </div>
      </div> */}
      <div>
        <Modal
          isOpen={openresponseACCandUPIModal}
          toggle={responseACCandUPIModal}
          keyboard={false}
          backdrop={false}
          style={{ maxWidth: '70%', width: '100%' }}
        >
          <ModalHeader className='mb-3' toggle={responseACCandUPIModal} close={responseACCandUPIModal} tag='div'>
            <h5 className='modal-title'>Transactions Response</h5>
          </ModalHeader>
          <ModalBody className='flex-grow-1'>
            {/* <CardTitle tag='h4'>Account Transfer (Max 10 data is allowed)</CardTitle> */}
            {responsedata.length === 0 ? <div></div> : <div>
              <table border='1' width="100%">
                <tr>
                  <th>Order ID</th>
                  <th>Comment</th>
                  <th>Status</th>
                </tr>
                {/* {responsedata.map((v, k) => {
                  return <tr>
                    <td>{v.orderid}</td>
                    <td>{v.message}</td>
                    <td>{v.status}</td>
                  </tr>
                })} */}
                {responsedata.failedDataTransactionChangeResponce === null ? null : responsedata.failedDataTransactionChangeResponce.transactionChangeResponceList.map((v) => {
                  return <tr>
                  <td>{v.orderIds}</td>
                  <td>{v.comment}</td>
                  <td>{v.status}</td>
                </tr>
                })
                }
                  {responsedata.successDataTransactionChangeResponce === null ? null : responsedata.successDataTransactionChangeResponce.transactionChangeResponceList.map((v) => {
                  return <tr>
                  <td>{v.orderIds}</td>
                  <td>{v.comment}</td>
                  <td>{v.status}</td>
                </tr>
                })
                }
                  {responsedata.pendingDataTransactionChangeResponce === null ? null : responsedata.pendingDataTransactionChangeResponce.transactionChangeResponceList.map((v) => {
                  return <tr>
                  <td>{v.orderIds}</td>
                  <td>{v.comment}</td>
                  <td>{v.status}</td>
                </tr>
                })
                }
                  {responsedata.refundDataTransactionChangeResponce === null ? null : responsedata.refundDataTransactionChangeResponce.transactionChangeResponceList.map((v) => {
                  return <tr>
                  <td>{v.orderIds}</td>
                  <td>{v.comment}</td>
                  <td>{v.status}</td>
                </tr>
                })
                }
              </table>
            </div>}
          </ModalBody>
          <ModalFooter>
            <Button.Ripple style={{ marginLeft: 10 }} onClick={responseACCandUPIModal} outline color='secondary'>
              Cancel
            </Button.Ripple>
          </ModalFooter>
        </Modal>
      </div> 
      <UILoader blocking={tableblock}>

        <DataTableWithButtons refreshdata={refreshdata} data={allbulktransactionData} coloumnsprops={columns}
          handleModal={upihandlerModal} upihandlerModal={upihandlerModal}
          routename="Transactions Update List" ispayinpayoutstatusupdate />
      </UILoader>

      <Payoutupitansfer displayUPIloading={displayUPIloading} open={upimodal} upihandlerModal={upihandlerModal} parentaccounttra={upitransferparent} disabledupitransbtn={disabledupitransbtn} />

    </Fragment>
  )
}

export default Settlementreport
