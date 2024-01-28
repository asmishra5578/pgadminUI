// import { columns } from './data'
// import Datatablecomponent from './datatablecomponent'
// import requestsApi from './request'
// import { Fragment, useState, forwardRef, useEffect } from 'react'

// const requestsApidata = new requestsApi()

// const Home = () => {
//   const [block, setBlock] = useState(true)
//   const [data, setdata] = useState([])
//   useEffect(() => {
//     requestsApidata.dateWiseTxnWithParameters().then(res => {
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

// import { columns } from './data'
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
import Datatablecomponent from '../../../layouts/components/Datatablecomponent'
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
    Col,
    Badge
} from 'reactstrap'
import { addDays } from "date-fns"
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

const Home = () => {
    // console.log("response datad----->", data({}))
    const history = useHistory()
    const [searchValue, setSearchValue] = useState('')

    const [statusSelect, setstatusSelect] = useState("Select")
    // ** States
    const [searchOrderID, setsearchOrderID] = useState('')
    const [searchPGID, setsearchPGID] = useState('')
    const [paymentoption, setpaymentoption] = useState('')
    const [pgtype, setpgtype] = useState('')
    const [merchantID, setmerchantID] = useState('')
    const [merchantorderID, setmerchantorderID] = useState('')
    const [startDate, setstartDate] = useState('')
    const [searchStartDate, setsearchStartDate] = useState('')
    const [endDate, setendDate] = useState('')
    const [searchEndDate, setsearchEndDate] = useState('')
    const [block, setBlock] = useState(true)
    const [data, setdata] = useState([])
    const fromDate = moment().format("YYYY-MM-DD")
    const toDate = moment().format("YYYY-MM-DD")
    // const columns = [
    //     {
    //         name: 'MerchantId',
    //         selector: 'merchantId',
    //         sortable: true,
    //         minWidth: '100px'
    //     },
    //     {
    //         name: 'PG Id',
    //         selector: 'pgId',
    //         sortable: true,
    //         minWidth: '250px'
    //     },
    //     {
    //         name: 'Payment Option',
    //         selector: 'paymentOption',
    //         sortable: true,
    //         minWidth: '150px'
    //     },
    //     {
    //         name: 'Amount',
    //         selector: 'amount',
    //         sortable: true
    //     },
    //     {
    //         name: 'Order ID',
    //         selector: 'orderID',
    //         sortable: true
    //     },
    //     {
    //         name: 'PG Type',
    //         selector: 'pgType',
    //         sortable: true
    //     },
    //     {
    //         name: 'Status',
    //         selector: 'status',
    //         sortable: true
    //     },
    //     {
    //         name: 'Merchant OrderID',
    //         selector: 'merchantOrderId',
    //         sortable: true
    //     },
    //     {
    //         name: 'Cust Order ID',
    //         selector: 'custOrderId',
    //         sortable: true
    //     },
    //     {
    //         name: 'VPA UPI',
    //         selector: 'vpaUPI',
    //         sortable: true
    //     },
    //     {
    //         name: 'Created At',
    //         selector: 'createdAt',
    //         sortable: true
    //     }
    // ]
    const statusoptions = [
        // { value: 'Select', label: 'Select' },
        // { value: 'UNAUTHORIZED', label: 'UNAUTHORIZED' },
        // { value: 'CANCELLED', label: 'CANCELLED' },
        { value: 'SUCCESS', label: 'SUCCESS' },
        // { value: 'FAILURE', label: 'FAILURE' },
        // { value: 'PGNULL', label: 'PGNULL' },
        // { value: 'REVERSED', label: 'REVERSED' },
        { value: 'FAILED', label: 'FAILED' },
        // { value: 'ERROR', label: 'ERROR' },
        { value: 'PENDING', label: 'PENDING' }
        // { value: 'ACCEPTED', label: 'ACCEPTED' }
    ]
    const statusSelectHandler = e => {
        setstatusSelect(e)
    }
    const updatedata = async () => {
        setstartDate('')
        setendDate('')
        setmerchantID('')
        setpgtype('')
        setpaymentoption('')
        setmerchantorderID('')
        setsearchOrderID('')
        setsearchPGID('')
        setBlock(true)
        setstatusSelect('Select')
        requestsApidata.dateWiseTxnWithParameters(fromDate, toDate, merchantID, pgtype, paymentoption, merchantorderID, searchOrderID, searchPGID).then(res => {
            // console.log("final resonse", res.data)
            if (res.data.successCode === "API_SUCCESS") {
                res.data.extraData.transactionDetails.map((v) => {
                    v.created = moment(v.created).format('DD-MM-YYYY HH:mm:ss')
                    v.updated = moment(v.created).format('DD-MM-YYYY HH:mm:ss')
                    return v
                })
                setdata(res.data.extraData.transactionDetails)
                setBlock(false)
            } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else {
                setBlock(false)
                setdata([])
                toast.warning(res.data.msg[0])
            }
        })
    }
    useEffect(() => {
        requestsApidata.dateWiseTxnWithParameters(fromDate, toDate, merchantID, pgtype, paymentoption, merchantorderID, searchOrderID, searchPGID).then(res => {
            if (res.data.successCode === "API_SUCCESS") {
                res.data.extraData.transactionDetails.map((v) => {
                    v.created = moment(v.created).format('DD-MM-YYYY HH:mm:ss')
                    v.updated = moment(v.created).format('DD-MM-YYYY HH:mm:ss')
                    return v
                })
                setdata(res.data.extraData.transactionDetails)
                setBlock(false)
            } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else {
                setdata([])
                setBlock(false)
            }
        })
        // const dataes = "2023-04-04T23:59:56.208+05:30"
        // const date = moment(dataes).format('YYYY-MM-DD HH:mm:ss')

        //    console.log('datess', date)
    }, [])
    // ** Function to handle filter
    const searchalldataHandler = (e) => {
        console.log("e.target.value", e.target.value, data)
        setSearchValue(e.target.value)
        if (e.target.value.length) {
            const updatedData = data.filter(item => {
                const startsWith =
                    (item.merchantOrderId && item.merchantOrderId.toString().startsWith((e.target.value).trim())) ||
                    (item.pgType && item.pgType.toString().startsWith((e.target.value).trim())) ||
                    (item.merchantId && item.merchantId.toString().startsWith((e.target.value).trim())) ||
                    (item.pgOrderID && item.pgOrderID.toString().startsWith((e.target.value).trim())) ||
                    (item.orderID && item.orderID.toString().startsWith((e.target.value).trim())) ||
                    (item.amount && item.amount.toString().startsWith((e.target.value).trim())) ||
                    (item.emailId && item.emailId.toString().startsWith((e.target.value).trim())) ||
                    (item.paymentOption && item.paymentOption.toString().startsWith((e.target.value).trim()))
                // ||
                // item.status.startsWith(e.target.value) ||
                // item.emailId.startsWith(e.target.value) ||
                // item.paymentOption.startsWith(e.target.value) ||
                // item.orderID.startsWith(e.target.value)                 //   ||
                //   item.amount.startsWith(e.target.value) 

                const includes =
                    (item.merchantOrderId && item.merchantOrderId.toString().includes((e.target.value).trim())) ||
                    (item.pgType && item.pgType.toString().includes((e.target.value).trim())) ||
                    (item.merchantId && item.merchantId.toString().includes((e.target.value).trim())) ||
                    (item.pgOrderID && item.pgOrderID.toString().includes((e.target.value).trim())) ||
                    (item.orderID && item.orderID.toString().includes((e.target.value).trim())) ||
                    (item.amount && item.amount.toString().includes((e.target.value).trim())) ||
                    (item.emailId && item.emailId.toString().includes((e.target.value).trim())) ||
                    (item.paymentOption && item.paymentOption.toString().includes((e.target.value).trim()))
                // item.status.includes(e.target.value) ||
                // item.emailId.includes(e.target.value) ||
                // item.paymentOption.includes(e.target.value) ||
                // item.orderID.includes(e.target.value)                 //   ||
                //   item.amount.includes(e.target.value)

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
    const merchantorderIDHandler = (e) => {
        // setmerchantorderID(e.target.value)
        setmerchantorderID((e.target.value).trim())

        // const regex = /^[0-9,]+$/
        // if (regex.test(e.target.value)) {
        // } else {
        // }
    }
    const pgtypehandler = (e) => {
        setpgtype(e.target.value)
    }
    const paymentoptionHandler = (e) => {
        setpaymentoption(e.target.value)
    }
    const searchOrderIDHandler = (e) => {
        // setsearchOrderID((e.target.value).trim())
        setsearchOrderID((e.target.value).trim())

        // const regex = /^[0-9,]+$/
        // if (regex.test(e.target.value)) {
        // } else {
        // }
    }
    const searchPGIDHandler = (e) => {
        setsearchPGID(e.target.value)
    }
    const searchStartdatehandle = (e) => {
        // console.log("====", e)
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
    //   requestsApidata.transactionfilterApi(searchStartDate, searchEndDate).then(res => {
    //    setdata(res.data)
    //   setBlock(false)
    //  })
    const filteByDate = () => {
        setBlock(true)
        console.log('filteByDate', searchStartDate, searchEndDate, merchantID, pgtype, paymentoption, merchantorderID, searchOrderID, searchPGID)
        // requestsApidata.dateWiseTxnWithParameters(startDate === "" ? fromDate : searchStartDate, endDate === "" && startDate === "" ? toDate : endDate === "" ? searchStartDate : searchEndDate, merchantID, pgtype, paymentoption, merchantorderID, searchOrderID, searchPGID).then(res => {
        requestsApidata.dateWiseTxnWithParameters(merchantorderID === "" && searchOrderID === "" ? startDate === "" ? fromDate : searchStartDate : "", merchantorderID === "" && searchOrderID === "" ? endDate === "" && startDate === "" ? toDate : endDate === "" ? searchStartDate : searchEndDate : "", merchantID, pgtype, paymentoption, merchantorderID, searchOrderID, searchPGID).then(res => {

            if (res.data.successCode === "API_SUCCESS") {
                res.data.extraData.transactionDetails.map((v) => {
                    v.created = moment(v.created).format('DD-MM-YYYY HH:mm:ss')
                    v.updated = moment(v.created).format('DD-MM-YYYY HH:mm:ss')
                    return v
                })
                // console.log('selectstatus', statusSelect.value)
                if (statusSelect === "Select") {
                    setdata(res.data.extraData.transactionDetails)
                    setBlock(false)
                } else {
                    const filterdatas = res.data.extraData.transactionDetails.filter((m) => m.status === statusSelect.value)
                    setdata(filterdatas)
                    setBlock(false)
                }
            } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "REQUIRED_INFORMATION_NOT_FOUND") {
                setdata([])
                setBlock(false)
                toast.warning(res.data.msg[0])
            } else {
                setBlock(false)
                toast.warning(res.data.msg[0])
                setdata([])
            }
        })

    }
    const updatecommessionHandler = (e) => {
        console.log('e', e.target.id)
        requestsApidata.updatemerchantcommissionflag(e.target.id).then((res) => {
            if (res.data.successCode === "API_SUCCESS") {
                Swal.fire({text:res.data.msg[0], icon:'success'})
            } else {
                toast.warning(res.data.msg[0])
            }
        })
    }
    const columns = [
        {
            name: 'Date',
            selector: 'created',
            sortable: true,
            minWidth: '250px'
        },
        {
            name: 'MerchantId',
            selector: 'merchantId',
            sortable: true,
            minWidth: '150px'
        },
        {
            name: 'PG Order ID',
            selector: 'pgOrderID',
            sortable: true
        },
        {
            name: 'Payment Option',
            selector: 'paymentOption',
            sortable: true
        },
        {
            name: 'Amount',
            selector: 'amount',
            sortable: true
        },

        {
            name: 'Order ID',
            selector: 'orderID',
            sortable: true,
            minWidth: '200px'
        },
        {
            name: 'PG Type',
            selector: 'pgType',
            sortable: true
        },

        {
            name: 'Status',
            selector: 'status',
            sortable: true,
            minWidth: '100px'
        },
        {
            name: 'Merchant Order ID',
            selector: 'merchantOrderId',
            minWidth: '200px'
        },
        {
            name: 'Txt Message',
            selector: 'txtMsg',
            sortable: true,
            minWidth: '100px'
        },
        {
            name: 'Error Message',
            selector: 'errorMsg',
            sortable: true,
            minWidth: '100px'
        },
        {
            name: 'Action',
            sortable: true,
            // minWidth: '350px',
            cell: row => <span>
             {row.commProcess === false && row.status === "SUCCESS" ? <span>
             <Badge id={row.orderID} onClick={updatecommessionHandler}
            style={{ cursor: 'pointer' }} color="success">Commission Process</Badge>
             </span> : <span>Processed</span> }
             </span>
            // cell: row => <span style={{ display: 'inline-block' }}>
            //     {row.commProcess === false && row.status === "SUCCESS" ? <Badge id={row.orderID} onClick={updatecommessionHandler}
            //         style={{ cursor: 'pointer' }} color="success">Commission Process</Badge> : <Badge 
            //         style={{ cursor: 'pointer' }} color="error">Commission Processed</Badge> }
            // </span>
        }
    ]
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
                                <Label for='pgtype'>PG Type</Label>
                                <Input
                                    id='pgtype'
                                    name='pgtype'
                                    onChange={pgtypehandler}
                                    placeholder='PG Type'
                                    value={pgtype}
                                />
                            </div>

                        </div>
                        <div style={{ display: "flex", marginBottom: 10 }}>
                            <div style={{}}>
                                <Label for='paymentoption'>Payment Option</Label>
                                <Input
                                    id='paymentoption'
                                    name='paymentoption'
                                    onChange={paymentoptionHandler}
                                    placeholder='Payment Option'
                                    value={paymentoption}
                                />
                            </div>
                            {/* <div style={{ marginLeft: 10 }}>
                                <Label for='pgid'>PG ID</Label>
                                <Input
                                    id='pgid'
                                    name='pgid'
                                    onChange={searchPGIDHandler}
                                    placeholder='PG ID'
                                    value={searchPGID}
                                />
                            </div> */}
                            <div style={{ marginLeft: 10 }}>
                                <Label for='select-basic'>Merchant Order ID`s</Label>
                                <Input
                                    type="textarea"
                                    id='merchantorderID'
                                    name='merchantorderID'
                                    onChange={merchantorderIDHandler}
                                    placeholder='Merchant order ID`s Seperated by comma'
                                    value={merchantorderID}
                                />
                            </div>
                            <div style={{ marginLeft: 10 }}>
                                <Label for='orderID'>Order ID`s</Label>
                                <Input
                                    type="textarea"
                                    id='orderID'
                                    name='orderID'
                                    onChange={searchOrderIDHandler}
                                    placeholder='Order ID`s Seperated by comma'
                                    value={searchOrderID}
                                />
                            </div>
                            <div style={{ marginLeft: 10, width: 200 }}>
                                <Label for=''>Status</Label>
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
                        </div>
                    </Col>
                    <Col lg="2">
                        <div style={{ display: 'flex', marginTop: 39 }}>
                            <div>
                                <Button color="primary"
                                    onClick={updatedata}
                                >
                                    Reset
                                    {/* <RefreshCw style={{marginLeft:5}} size={15} /> */}
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
                    <Datatablecomponent coloumnsprops={columns} data={data}
                        isaddfilter
                        searchValue={searchValue} searchFilter={searchalldataHandler} routename="Transaction Report" />
                </UILoader>
            </div>
        </Fragment>
    )
}

export default Home