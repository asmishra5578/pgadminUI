// import { columns } from './data'
// import Datatablecomponent from './datatablecomponent'
// import requestsApi from './request'
// import { Fragment, useState, forwardRef, useEffect } from 'react'

// const requestsApidata = new requestsApi()

// const Home = () => {
//   const [block, setBlock] = useState(true)
//   const [data, setdata] = useState([])
//   useEffect(() => {
//     requestsApidata.payoutwalletFilterReport().then(res => {
//         setdata(res.data)
//     setBlock(false)
//       })
//   }, [])
//     return (
//       <div>
//           <div>
//               Askal
//           </div>
//         <Datatablecomponent  coloumnsprops={columns} data={data} />
//       </div>
//     ) 
//   }
//   export default Home
// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import UILoader from '@components/ui-loader'
// ** Table Data & Columns
import moment from "moment"
import { useHistory } from 'react-router-dom'

import { columns } from './data'
import requestsApi from './request'
// ** Add New Modal Component
// import AddNewModal from '../../../tables/data-tables/basic/AddNewModal'

// ** Third Party Components
import Select from 'react-select'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
// import Datatablecomponent from './datatablecomponent'
import Datatablecomponent from '../../../../layouts/components/Datatablecomponent'

import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, RefreshCw, RotateCw } from 'react-feather'
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
import { addDays } from "date-fns"
import { toast } from 'react-toastify'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
    <div className='custom-control custom-checkbox'>
        <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
        <label className='custom-control-label' onClick={onClick} />
    </div>
))
const requestsApidata = new requestsApi()

const Home = () => {
    // console.log("response datad----->", data({}))
    const history = useHistory()

    // ** States transactiontypeSelect creditdebitvalue transactionidvalue
    const [statusSelect, setstatusSelect] = useState("Select")
    const [transactiontypeSelect, settransactiontypeSelect] = useState("Select")
    const [creditdebitvalue, setcreditdebitvalue] = useState("Select")
    const [transactionidvalue, settransactionidvalue] = useState('')

    const [walletidvalue, setwalletidvalue] = useState('')
    const [searchPGID, setsearchPGID] = useState('')
    const [merchantID, setmerchantID] = useState('')
    const [startDate, setstartDate] = useState('')
    const [searchStartDate, setsearchStartDate] = useState('')
    const [endDate, setendDate] = useState('')
    const [searchEndDate, setsearchEndDate] = useState('')
    const [block, setBlock] = useState(true)
    const [data, setdata] = useState([])
    const fromDate = moment().format("DD-MM-YYYY")
    const toDate = moment().format("DD-MM-YYYY")
    const statusoptions = [
        { value: 'Select', label: 'Select' },
        { value: 'SUCCESS', label: 'SUCCESS' },
        { value: 'FAILED', label: 'FAILED' }
    ]
    const credit_debitoptions = [
        { value: 'Select', label: 'Select' },
        { value: 'CREDIT', label: 'CREDIT' },
        { value: 'DEBIT', label: 'DEBIT' }
    ]
    const transactiontypeoptions = [
        { value: 'Select', label: 'Select' },
        { value: 'WALLET_TRANSFER', label: "WALLET TRANSFER" },
        { value: 'UPI', label: "UPI" },
        { value: 'IMPS', label: "IMPS" },
        { value: 'NEFT', label: "NEFT" },
        { value: 'BANK_TRANSFER', label: "BANK TRANSFER" }
    ]
    const statusSelectHandler = e => {
        setstatusSelect(e)
    }
    const transactiontypeSelectHandler = e => {
        settransactiontypeSelect(e)
    }
    const creditdebithandler = (e) => {
        setcreditdebitvalue(e)
    }
    const updatedata = async () => {
        setstartDate('')
        setendDate('')
        setmerchantID('')
        setcreditdebitvalue('Select')
        setwalletidvalue('')
        settransactionidvalue('')
        setstatusSelect('Select')
        settransactiontypeSelect('Select')
        // setsearchPGID('')
        setBlock(true)
        requestsApidata.payoutwalletFilterReport(fromDate, toDate, merchantID, creditdebitvalue === "Select" ? "" : creditdebitvalue.value, walletidvalue, transactionidvalue, statusSelect === "Select" ? "" : statusSelect.value, transactiontypeSelect === "Select" ? "" : transactiontypeSelect.value).then(res => {
            setBlock(false)
            if (res.data.successCode === "API_SUCCESS") {
                setdata(res.data.extraData.transactionDetails)
            } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "REQUIRED_INFORMATION_NOT_FOUND") {
                toast.warning(res.data.msg[0])
                setdata([])
            }
        })
    }
    useEffect(() => {
        // /fromDate=13-12-2021&toDate=14-12-2021&merchantId&credit_debit&walletId&transactionId&status&transactionType
        // console.log(fromDate, toDate)
        requestsApidata.payoutwalletFilterReport(fromDate, toDate, merchantID, creditdebitvalue === "Select" ? "" : creditdebitvalue.value, walletidvalue, transactionidvalue, statusSelect === "Select" ? "" : statusSelect.value, transactiontypeSelect === "Select" ? "" : transactiontypeSelect.value).then(res => {
            setBlock(false)
            if (res.data.successCode === "API_SUCCESS") {
                setdata(res.data.extraData.transactionDetails)
            } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "REQUIRED_INFORMATION_NOT_FOUND") {
                toast.warning(res.data.msg[0])
                setdata([])
            }
        })
    }, [])
    // ** Function to handle filter

    // ** Function to handle Pagination
    const merchantidhandler = (e) => {
        setmerchantID(e.target.value)
    }

    const walletidHandler = (e) => {
        setwalletidvalue(e.target.value)
    }
    const transacionIDHandler = (e) => {
        settransactionidvalue(e.target.value)
    }
    const searchPGIDHandler = (e) => {
        setsearchPGID(e.target.value)
    }
    const searchStartdatehandle = (e) => {
        // console.log("====", e)
        setstartDate(e)
        setsearchStartDate(moment(e, "DDMMYYYY").format("DD-MM-YYYY"))
    }
    const searchEnddatehandle = (e) => {
        if (startDate === "") {
            alert("Kindly first select start date")
        } else {
            setendDate(e)
            setsearchEndDate(moment(e, "DDMMYYYY").format("DD-MM-YYYY"))
        }
    }
    //   requestsApidata.transactionfilterApi(searchStartDate, searchEndDate).then(res => {
    //    setdata(res.data)
    //   setBlock(false)
    //  })
    const filteByDate = () => {
        setBlock(true)
        requestsApidata.payoutwalletFilterReport(startDate === "" ? fromDate : searchStartDate, endDate === "" && startDate === "" ? toDate : endDate === "" ? searchStartDate : searchEndDate, merchantID, creditdebitvalue === "Select" ? "" : creditdebitvalue.value, walletidvalue, transactionidvalue, statusSelect === "Select" ? "" : statusSelect.value, transactiontypeSelect === "Select" ? "" : transactiontypeSelect.value).then(res => {
            setBlock(false)
            if (res.data.successCode === "API_SUCCESS") {
                setdata(res.data.extraData.transactionDetails)
            } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "REQUIRED_INFORMATION_NOT_FOUND") {
                toast.warning(res.data.msg[0])
                setdata([])
            }
        })
    }
    return (
        <Fragment>
            {/* <h6>Search by date or search by merchantID and Status</h6> */}
            <br />
            <div>
                <Row>
                    <Col lg="10">
                        <div style={{ display: "flex", marginBottom: 10 }}>
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
                                    placeholderText="Date Range To"
                                    minDate={startDate}
                                    maxDate={addDays(new Date(startDate), 30)}
                                    onKeyDown={(e) => {
                                        e.preventDefault()
                                     }}
                                />
                            </div>
                            <div style={{ marginLeft: 10, width: 150 }}>
                                <Label for='merchantID'>Merchant ID</Label>
                                <Input
                                    id='merchantID'
                                    name='merchantID'
                                    onChange={merchantidhandler}
                                    placeholder='merchantID'
                                    value={merchantID}
                                />
                            </div>
                            <div style={{ marginLeft: 10, width: 150 }}>
                                <Label for='transactionID'>Transaction ID</Label>
                                <Input
                                    id='transactionID'
                                    name='transactionID'
                                    onChange={transacionIDHandler}
                                    placeholder='Transaction ID'
                                    value={transactionidvalue}
                                />
                            </div>
                        </div>
                        <div style={{ display: "flex", marginBottom: 10 }}>
                            {/* <div style={{ marginLeft: 10, width: 150 }}>
                                <Label for='walletid'>Wallet ID</Label>
                                <Input
                                    id='walletid'
                                    name='walletid'
                                    onChange={walletidHandler}
                                    placeholder='Wallet ID'
                                    value={walletidvalue}
                                />
                            </div> */}
                            <div style={{ marginLeft: 10, width: 120 }}>
                                <Label for='select-basic'>Status</Label>
                                <Select
                                    className='react-select'
                                    classNamePrefix='select'

                                    name='requestType'
                                    id='requestType'
                                    options={statusoptions}
                                    value={statusSelect}
                                    onChange={statusSelectHandler}
                                />
                            </div>
                            <div style={{ marginLeft: 10, width: 140 }}>
                                <Label for='select-basic'>Transaction Type</Label>
                                <Select
                                    className='react-select'
                                    classNamePrefix='select'

                                    name='transactionType'
                                    id='transactionType'
                                    options={transactiontypeoptions}
                                    value={transactiontypeSelect}
                                    onChange={transactiontypeSelectHandler}
                                />
                            </div>
                            <div style={{ marginLeft: 10, width: 150 }}>
                                <Label for='select-basic'>Credit/Debit</Label>
                                <Select
                                    className='react-select'
                                    classNamePrefix='select'
                                    name='transactionType'
                                    id='transactionType'
                                    options={credit_debitoptions}
                                    value={creditdebitvalue}
                                    onChange={creditdebithandler}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col lg="2">
                        <div style={{ display: 'flex', marginTop: 39 }}>
                            <div>
                                <Button color="primary"
                                    onClick={updatedata}
                                >
                                    Reset{/* <RotateCw size={10} /> */}
                                </Button>
                            </div>
                            <div style={{ marginLeft: 10 }}>
                                <Button color="primary"
                                    onClick={filteByDate}
                                >
                                    FILTER
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div>
                <UILoader blocking={block}>
                    <Datatablecomponent coloumnsprops={columns} data={data} routename="Wallet Transaction Report"/>
                </UILoader>
            </div>
        </Fragment>
    )
}

export default Home