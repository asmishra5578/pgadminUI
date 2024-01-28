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

const Hometransactionpgwisesum = () => {
    // console.log("response datad----->", data({}))
    const history = useHistory()
    const [searchValue, setSearchValue] = useState('')

    // ** States
    const [searchTransID, setsearchTransID] = useState('')
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
    const [selectkycstatusvalue, setselectkycstatusvalue] = useState('Select')

    const countryOptions = [
        { value: 'SUCCESS', label: 'SUCCESS' },
        { value: 'FAILURE', label: 'FAILURE' },
        { value: 'PENDING', label: 'PENDING' }
    ]
    const selectkycstatushandler = (e) => {
        // console.log('selectkycstatushandler', e.value)
        setselectkycstatusvalue(e)
    }
    const updatedata = async () => {
        setstartDate('')
        setendDate('')
        setselectkycstatusvalue('Select')
        setBlock(true)
        requestsApidata.getByMerchantWisePgWiseSum(fromDate, toDate, "SUCCESS").then(res => {
            if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else {
                setdata(res.data)
                setBlock(false)
            }
        })
    }
    useEffect(() => {
        requestsApidata.getByMerchantWisePgWiseSum(fromDate, toDate, "SUCCESS").then(res => {
            if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else {
                setdata(res.data)
                setBlock(false)
            }
        })
    }, [])
    // ** Function to handle filter
    const searchalldataHandler = (e) => {
        console.log("e.target.value", e.target.value.length)
        setSearchValue(e.target.value)
        if (e.target.value.length) {
            const updatedData = data.filter(item => {
                const startsWith =
                    item.merchantId.startsWith(e.target.value) ||
                    item.pgType.startsWith(e.target.value) ||
                    item.totalAmt.startsWith(e.target.value) ||
                    item.cnt.startsWith(e.target.value) ||
                    item.companyName.startsWith(e.target.value) ||
                    item.merchantName.startsWith(e.target.value) 
                //   ||
                //   item.amount.startsWith(e.target.value) 

                const includes =
                    item.merchantId.includes(e.target.value) ||
                    item.pgType.includes(e.target.value) ||
                    item.totalAmt.includes(e.target.value) ||
                    item.cnt.includes(e.target.value) ||
                    item.companyName.includes(e.target.value) ||
                    item.merchantName.includes(e.target.value) 
                //   ||
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
        setmerchantorderID(e.target.value)
    }
    const pgtypehandler = (e) => {
        setpgtype(e.target.value)
    }
    const paymentoptionHandler = (e) => {
        setpaymentoption(e.target.value)
    }
    const searchTransIDHandler = (e) => {
        setsearchTransID(e.target.value)
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
        console.log('filteByDate', selectkycstatusvalue)
        requestsApidata.getByMerchantWisePgWiseSum(fromDate, toDate, selectkycstatusvalue === "Select" ? "SUCCESS" : selectkycstatusvalue.value).then(res => {
            if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else {
                setdata(res.data)
                setBlock(false)
            }
        })
        // if (merchantID !== '') {
        //     requestsApidata.dateWiseTxnWithParameters('', '', merchantID, '', '', '', '', '').then(res => {
        //         if (res.data.successCode === "API_SUCCESS") {
        //             setdata(res.data.extraData.transactionDetails)
        //             setBlock(false)
        //         } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        //             toast.error('Session Expired Login again!')
        //             history.push('/')
        //         } else if (res.data.exception === "JWT_MISSING") {
        //             toast.error('Session Expired Login again!')
        //             history.push('/')
        //         }
        //     })
        // } else if (merchantorderID !== '') {
        //     requestsApidata.dateWiseTxnWithParameters('', '', '', '', '', merchantorderID, '', '').then(res => {
        //         if (res.data.successCode === "API_SUCCESS") {
        //             setdata(res.data.extraData.transactionDetails)
        //             setBlock(false)
        //         } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        //             toast.error('Session Expired Login again!')
        //             history.push('/')
        //         } else if (res.data.exception === "JWT_MISSING") {
        //             toast.error('Session Expired Login again!')
        //             history.push('/')
        //         } else if (res.data.exception === "MERCHANT_ORDER_ID_VALIDATION") {
        //             toast.error(res.data.msg[0])
        //         }  else if (res.data.exception === "MERCHANT_ORDER_ID_NOT_FOUND") {
        //             toast.error(res.data.msg[0])
        //             // history.push('/')           
        //           }
        //     })
        // } else if (searchTransID !== '') {
        //     requestsApidata.dateWiseTxnWithParameters('', '', '', '', '', '', searchTransID, '').then(res => {
        //         if (res.data.successCode === "API_SUCCESS") {
        //             setdata(res.data.extraData.transactionDetails)
        //             setBlock(false)
        //         } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        //             toast.error('Session Expired Login again!')
        //             history.push('/')
        //         } else if (res.data.exception === "JWT_MISSING") {
        //             toast.error('Session Expired Login again!')
        //             history.push('/')
        //         }
        //     })
        // } else {
        //         setBlock(true)              
        // }
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
                                <Label for='merchantID'>Select Status</Label>
                                <Select
                                    // theme={selectThemeColors}
                                    isClearable={false}
                                    id='kycStatus'
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={countryOptions}
                                    defaultValue={countryOptions[0]}
                                    onChange={selectkycstatushandler}
                                    value={selectkycstatusvalue}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col lg="2">
                        <div style={{ display: 'flex', marginTop: 20 }}>
                            <div>
                                <Button color="primary"
                                    onClick={updatedata}
                                >
                                    <RotateCw size={10} />
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
                        // isaddfilter
                        searchValue={searchValue} searchFilter={searchalldataHandler} routename="Transaction Report MerchantWise, PgWise Sum" />
                </UILoader>
            </div>
        </Fragment>
    )
}

export default Hometransactionpgwisesum