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
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, RefreshCw, RotateCw, Download } from 'react-feather'
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
    const fromDate = moment().subtract(7, "days").format("YYYY-MM-DD")
    const toDate = moment().format("YYYY-MM-DD")
    const [bankName, setbankName] = useState('Select')

    const countryOptions = [
        { value: 'txnReport', label: 'Transaction Report' }
        // { value: 'UPI', label: 'UPI' },
        // { value: 'UPI_QR', label: 'UPI_QR' },
        // { value: 'NB', label: 'NB' },
        // { value: 'CARD', label: 'CARD' },
        // { value: 'EMI', label: 'EMI' },

        // { value: 'GPAY', label: 'GPAY' }
        // { value: 'MASTRO', label: 'Mastro' },
        // { value: 'RUPAY', label: 'Rupay' }
    ]
    useEffect(() => {
        requestsApidata.dateWiseTxnWithParameters(fromDate, toDate, merchantID, pgtype, paymentoption, merchantorderID, searchTransID, searchPGID).then(res => {
            if (res.data.successCode === "API_SUCCESS") {
                setdata(res.data.extraData.transactionDetails)
                setBlock(false)
            } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            }
        })
    }, [])
    // ** Function to handle filter

    // ** Function to handle Pagination
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
    const bankNameHandler = (e) => {
        console.log(e)
        setbankName(e)
    }
    const downloadreportHandler = () => {
        console.log('downloadreportHandler', startDate, endDate, bankName)
        if (startDate === "" || endDate === "" || bankName === "Select") {
            toast.warning('All field is required')
        } else {
            console.log('run code ere')
            requestsApidata.merchantReport(searchStartDate, searchEndDate).then((res) => {
                console.log('merchantReport', res.data)
                requestsApidata.downloadFile(res.data.extraData.Details.fileName).then((response) => {
                    console.log('response', response)
                })
            })
        }
    }
    return (
        <Fragment>
            <Card style={{ padding: 20 }}>
                {/* <br /> */}
                <h6>Download Report by Date</h6>
                <div>
                    <Row>
                        <Col lg="3">
                            <div style={{ marginTop: 24 }}>
                                <Select
                                    isClearable={false}
                                    id='kycStatus'
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={countryOptions}
                                    onChange={bankNameHandler}
                                    value={bankName}
                                />
                            </div>
                        </Col>
                        <Col lg="3">
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
                        </Col>
                        <Col lg="3">
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
                        </Col>
                        <Col lg="3">
                            <div style={{marginTop:22}}>
                                <Button color="primary"
                                onClick={downloadreportHandler}
                                >
                                 <Download size={15}/>   Download
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    <div style={{ marginBottom: 10 }}>
                    </div>

                    {/* <Col lg="2">
                        <div style={{ display: 'flex', marginTop: 39 }}>
                            <div style={{ marginLeft: 10 }}>
                                <Button color="primary"
                                   
                                >
                                    FILTER
                                </Button>
                            </div>
                        </div>
                    </Col> */}
                </div>
                <div>

                </div>
            </Card>
        </Fragment>
    )
}

export default Home