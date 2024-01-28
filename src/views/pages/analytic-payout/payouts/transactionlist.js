// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import moment from "moment"
import axios  from 'axios'
// ** Table Data & Columns
import { columns } from './data'
// import responsedata from './requests'
import requestsApi from '../request'
import merchantApi from '../../account-settings/request'
// ** Add New Modal Component
import PayoutWallet from './payoutwallettransfer'
import Payoutaccounttransfer from './accounttransfer'
import UILoader from '@components/ui-loader'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import Datatablecomponent from '../../../../layouts/components/Datatablecomponent'
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
  Col
} from 'reactstrap'
import { toast } from 'react-toastify'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className='custom-control custom-checkbox'>
    <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    <label className='custom-control-label' onClick={onClick} />
  </div>
))
const requestsApidata = new requestsApi()
const getmerchantApi = new merchantApi()
const Settlementreport = () => {
    // useEffect(() => {


    // });
  // ** States
  const [walletbalance, setwalletbalance] = useState('')
  const [getMerchanrID, setgetMerchanrID] = useState('')
  const [block, setBlock] = useState(false)
  const [accountmodal, setaccountModal] = useState(false)

  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setdata] = useState([])
  const [settlement, setsettlement] = useState('Settlements')
  const [startDate, setstartDate] = useState('')
  const [searchStartDate, setsearchStartDate] = useState('')
  const [endDate, setendDate] = useState('') 
  const [searchEndDate, setsearchEndDate] = useState('') 
  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)
  const accounthandleModal = () =>  setaccountModal(!accountmodal)

  // ** Function to handle filter


  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }


 const refreshdata = () => {
  setBlock(true)
    const fromDate2 = moment().subtract(1, "days").format("YYYY-MM-DD")
const toDate2 = moment().format("YYYY-MM-DD")
    requestsApidata.getpayouttransactionReport(fromDate2, toDate2).then(res => {
      // console.log('res', res.data)
      setdata(res.data.result)
      setBlock(false)
    })
  }
useEffect(() => {
  setBlock(true)
  const fromDate2 = moment().subtract(1, "days").format("YYYY-MM-DD")
  const toDate2 = moment().format("YYYY-MM-DD")
  requestsApidata.getpayoutbalanceCheck().then(res => {
    setwalletbalance(res.data.walletBalance)
  })
requestsApidata.getpayouttransactionReport(fromDate2, toDate2).then(res => {
  // console.log('res', res.data)
  if (res.data.status === "UNAUTHORIZED") {
    setdata([])
    setBlock(false)
    toast.error('Remote IP not whitelisted. Please ask your admin to whitelist Remote IP')
  } else {
  setdata(res.data.result)
  setBlock(false)
  }
})
}, [])
const filteByDate = () => {
  setBlock(true)
  requestsApidata.getpayouttransactionReport(searchStartDate, searchEndDate).then(res => {
    console.log('res', res.data)
    if (res.data.status === "FAILURE") {
     toast.error(res.data.statusMessage)
     setBlock(false)
    } else {
    setdata(res.data.result)
  setBlock(false)
    }
  })
}
 const searchStartdatehandle = (e) => {
setstartDate(e)
setsearchStartDate(moment(e, "DDMMYYYY").format("YYYY-MM-DD"))
  }
const  searchEnddatehandle = (e) => {
    if (startDate === "") {
      alert("Kindly first select start date")
    } else  {
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
      } else toast.error(`Server error try again:${res.data.message}`)
  })
  }

  const accounttransferhan = (data) => {
    
    data.purpose = "SALARY_DISBURSEMENT"
    console.log(data)
    requestsApidata.getpayoutaccountTransfer(data).then(res => {
      console.log('res', res.data)
      if (res.data.status === "ACCEPTED") {
          toast.success(`${res.data.status}:${res.data.message},orderID:${res.data.orderid}`)
        setaccountModal(!modal)
      } else if (res.data.status === 'FAILURE') {
          toast.error(`${res.data.status}:${res.data.message},orderID:${res.data.orderid}`)
      } else toast.error(`Server error try again:${res.data.message}`)
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
          <div style={{ display: "flex", marginBottom: 10, marginTop: 9 }}>
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
              onKeyDown={(e) => {
                e.preventDefault()
             }}
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
              onKeyDown={(e) => {
                e.preventDefault()
             }}
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
              Refresh Data
            </Button>
          </div>
        </div>
    <UILoader blocking={block}>

        <Datatablecomponent data={data} coloumnsprops={columns}
        handleModal={handleModal} accounthandleModal={accounthandleModal}
         routename="Transactions" iswallettransfer={true} walletbalance={walletbalance}/>
    </UILoader>

      <PayoutWallet open={modal} handleModal={handleModal} parentCallback={walletdatahandler}/>
      <Payoutaccounttransfer open={accountmodal} accounthandleModal={accounthandleModal} parentaccounttra={accounttransferhan}/>

    </Fragment>
  )
}

export default Settlementreport
