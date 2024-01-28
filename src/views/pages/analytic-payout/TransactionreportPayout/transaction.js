// import { columns } from './data'
// import Datatablecomponent from './datatablecomponent'
// import requestsApi from './request'
// import { Fragment, useState, forwardRef, useEffect } from 'react'

// const requestsApidata = new requestsApi()

// const Home = () => {
//   const [block, setBlock] = useState(true)
//   const [data, setdata] = useState([])
//   useEffect(() => {
//     requestsApidata.payouttransactionFilterReport().then(res => {
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

    // ** States transactiontypeSelect
    const [statusSelect, setstatusSelect] = useState("Select")
    const [transactiontypeSelect, settransactiontypeSelect] = useState("Select")

    const [ifscCodevalue, setifscCodevalue] = useState('')
    const [searchPGID, setsearchPGID] = useState('')
    const [bankaccountvalue, setbankaccountvalue] = useState('')
    const [beneficiaryname, setbeneficiaryname] = useState('')
    const [merchantID, setmerchantID] = useState('')
    const [orderID, setorderID] = useState('')
    const [startDate, setstartDate] = useState('')
    const [searchStartDate, setsearchStartDate] = useState('')
    const [endDate, setendDate] = useState('')
    const [searchEndDate, setsearchEndDate] = useState('')
    const [block, setBlock] = useState(true)
    const [data, setdata] = useState([])
    const fromDate = moment().format("DD-MM-YYYY")
    const toDate = moment().format("DD-MM-YYYY")
    const [searchValue, setSearchValue] = useState('')

    const statusoptions = [
        { value: 'Select', label: 'Select' },
        { value: 'UNAUTHORIZED', label: 'UNAUTHORIZED' },
        { value: 'CANCELLED', label: 'CANCELLED' },
        { value: 'SUCCESS', label: 'SUCCESS' },
        { value: 'FAILURE', label: 'FAILURE' },
        { value: 'PGNULL', label: 'PGNULL' },
        { value: 'REVERSED', label: 'REVERSED' },
        { value: 'FAILED', label: 'FAILED' },
        { value: 'ERROR', label: 'ERROR' },
        { value: 'PENDING', label: 'PENDING' },
        { value: 'ACCEPTED', label: 'ACCEPTED' }
    ]
    const transactiontypeoptions = [
        { value: 'Select', label: 'Select' },
        { value: 'ACCOUNT', label: "ACCOUNT" },
        { value: 'WALLET', label: "WALLET" },
        { value: 'VPA', label: "VPA" }
    ]
    const statusSelectHandler = e => {
        setstatusSelect(e)
    }
    const transactiontypeSelectHandler = e => {
        settransactiontypeSelect(e)
    }
    const updatedata = async () => {
        setstartDate('')
        setendDate('')
        setmerchantID('')
        setbeneficiaryname('')
        setbankaccountvalue('')
        setifscCodevalue('')
        setorderID('')
        setstatusSelect('Select')
        settransactiontypeSelect('Select')
        // setsearchPGID('')
        setBlock(true)
        requestsApidata.payouttransactionFilterReport(fromDate, toDate, "", bankaccountvalue, beneficiaryname, ifscCodevalue, orderID, statusSelect === "Select" ? "" : statusSelect.value, transactiontypeSelect === "Select" ? "" : transactiontypeSelect.value).then(res => {
            setBlock(false)
            if (res.data.successCode === "API_SUCCESS") {
                res.data.extraData.transactionDetails.map((v) => {
                    v.trDateTime = moment(v.trDateTime).format('DD-MM-YYYY HH:mm:ss')
                    v.lastUpdate = moment(v.lastUpdate).format('DD-MM-YYYY HH:mm:ss')
                    return v
                })
                setdata(res.data.extraData.transactionDetails)
            } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "REQUIRED_INFORMATION_NOT_FOUND") {
                // toast.warning(res.data.msg[0])
                setdata([])
            }
        })
    }
    useEffect(() => {
        // searchStartDate, searchEndDate, merchantID, beneficiaryname, bankaccountvalue, orderID, ifscCodevalue, statusSelect.value,
        // transactiontypeSelect.value
        // console.log(fromDate, toDate)
        requestsApidata.payouttransactionFilterReport(fromDate, toDate, merchantID, bankaccountvalue, beneficiaryname, ifscCodevalue, orderID, statusSelect === "Select" ? "" : statusSelect.value, transactiontypeSelect === "Select" ? "" : transactiontypeSelect.value).then(res => {
            setBlock(false)
            if (res.data.successCode === "API_SUCCESS") {
                res.data.extraData.transactionDetails.map((v) => {
                    v.trDateTime = moment(v.trDateTime).format('DD-MM-YYYY HH:mm:ss')
                    v.lastUpdate = moment(v.lastUpdate).format('DD-MM-YYYY HH:mm:ss')
                    return v
                })
                setdata(res.data.extraData.transactionDetails)
            } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "REQUIRED_INFORMATION_NOT_FOUND") {
                // toast.warning(res.data.msg[0])
                setdata([])
            }
        })
    }, [])
    // ** Function to handle filter
    const searchalldataHandler = (e) => {
        console.log("e.target.value", e.target.value, data)
        setSearchValue(e.target.value)
        if (e.target.value.length) {
            const updatedData = data.filter(item => {
                const startsWith =
                    (item.merchantOrderId && item.merchantOrderId.toString().startsWith((e.target.value).trim())) ||
                    (item.merchantId && item.merchantId.toString().startsWith((e.target.value).trim())) ||
                    (item.pgOrderId && item.pgOrderId.toString().startsWith((e.target.value).trim())) ||
                    (item.transactionStatus && item.transactionStatus.toString().startsWith((e.target.value).trim())) ||
                    (item.pgName && item.pgName.toString().startsWith((e.target.value).trim())) ||
                    (item.bankaccount && item.bankaccount.toString().startsWith((e.target.value).trim())) ||
                    (item.amount && item.amount.toString().startsWith((e.target.value).trim()))

                const includes =
                    (item.merchantOrderId && item.merchantOrderId.toString().includes((e.target.value).trim())) ||
                    (item.merchantId && item.merchantId.toString().includes((e.target.value).trim())) ||
                    (item.pgOrderId && item.pgOrderId.toString().includes((e.target.value).trim())) ||
                    (item.transactionStatus && item.transactionStatus.toString().includes((e.target.value).trim())) ||
                    (item.pgName && item.pgName.toString().includes((e.target.value).trim())) ||
                    (item.bankaccount && item.bankaccount.toString().includes((e.target.value).trim())) ||
                    (item.amount && item.amount.toString().includes((e.target.value).trim()))

                if (startsWith) {
                    return startsWith
                } else if (!startsWith && includes) {
                    return includes
                } else return null
            })
            setdata(updatedData)
            setSearchValue(e.target.value)
        } else {
            updatedata()
        }
    }
    // ** Function to handle Pagination
    const merchantidhandler = (e) => {
        setmerchantID(e.target.value)
    }
    const orderIDHandler = (e) => {
        setorderID(e.target.value)
    }
    const beneficiarynameHandler = (e) => {
        setbeneficiaryname(e.target.value)
    }
    const bankaccounthandler = (e) => {
        setbankaccountvalue(e.target.value)
    }
    const ifscHandler = (e) => {
        setifscCodevalue(e.target.value)
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
        // console.log('filteByDate', searchStartDate, searchEndDate, merchantID, beneficiaryname, bankaccountvalue, orderID, ifscCodevalue, statusSelect.value,
        // transactiontypeSelect.value)
        setBlock(true)
        requestsApidata.payouttransactionFilterReport(startDate === "" ? fromDate : searchStartDate, endDate === "" && startDate === "" ? toDate : endDate === "" ? searchStartDate : searchEndDate, merchantID, bankaccountvalue, beneficiaryname, ifscCodevalue, orderID, statusSelect === "Select" ? "" : statusSelect.value, transactiontypeSelect === "Select" ? "" : transactiontypeSelect.value).then(res => {
            setBlock(false)
            if (res.data.successCode === "API_SUCCESS") {
                res.data.extraData.transactionDetails.map((v) => {
                    v.trDateTime = moment(v.trDateTime).format('DD-MM-YYYY HH:mm:ss')
                    v.lastUpdate = moment(v.lastUpdate).format('DD-MM-YYYY HH:mm:ss')
                    return v
                })
                setdata(res.data.extraData.transactionDetails)
            } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "REQUIRED_INFORMATION_NOT_FOUND") {
                // toast.warning(res.data.msg[0])
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
                            <div style={{ marginLeft: 10 }}>
                                <Label for='select-basic'>Order ID</Label>
                                <Input
                                    id='orderID'
                                    name='orderID'
                                    onChange={orderIDHandler}
                                    placeholder='Order ID'
                                    value={orderID}
                                />
                            </div>
                        </div>
                        <div style={{ display: "flex", marginBottom: 10 }}>
                            <div style={{}}>
                                <Label for='beneficiaryname'>Beneficiary Name</Label>
                                <Input
                                    id='beneficiaryname'
                                    name='beneficiaryname'
                                    onChange={beneficiarynameHandler}
                                    placeholder='Beneficiary name'
                                    value={beneficiaryname}
                                />
                            </div>
                            <div style={{ marginLeft: 10 }}>
                                <Label for='bankaccountvalue'>Bank account</Label>
                                <Input
                                    id='bankaccountvalue'
                                    name='bankaccountvalue'
                                    onChange={bankaccounthandler}
                                    placeholder='Bank account'
                                    value={bankaccountvalue}
                                />
                            </div>
                            <div style={{ marginLeft: 10, width: 150 }}>
                                <Label for='transactionID'>IFSC Code</Label>
                                <Input
                                    id='transactionID'
                                    name='transactionID'
                                    onChange={ifscHandler}
                                    placeholder='IFSC Code'
                                    value={ifscCodevalue}
                                />
                            </div>
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
                            <div style={{ marginLeft: 10, width: 120 }}>
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
                        </div>
                    </Col>
                    <Col lg="2">
                        <div style={{ display: 'flex', marginTop: 39 }}>
                            <div>
                                <Button color="primary"
                                    onClick={updatedata}
                                >
                                    Reset
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
                    <Datatablecomponent
                        isaddfilter
                        searchValue={searchValue} searchFilter={searchalldataHandler}
                        coloumnsprops={columns} data={data} routename="Payout Transaction Report" />
                </UILoader>
            </div>
        </Fragment>
    )
}

export default Home