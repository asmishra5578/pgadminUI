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
import Datatablecomponent from './datatablecomponent'

// ** Third Party Components
import Select from 'react-select'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import fileDownload from 'js-file-download'
import axios from 'axios'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, RefreshCw, RotateCw, Download, X } from 'react-feather'
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
    Badge, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup
} from 'reactstrap'
import { addDays } from "date-fns"
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { roolink } from '../../../../../configs/linkConfigs'


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
    const [modal, setModal] = useState(false)

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
    const [alltransactionreportlist, setalltransactionreportlist] = useState([])
    const [block, setBlock] = useState(true)
    const [allgetGeneratedreportlist, setallgetGeneratedreportlist] = useState([])
    const [data, setdata] = useState([])
    const fromDate = moment().subtract(7, "days").format("YYYY-MM-DD")
    const toDate = moment().format("YYYY-MM-DD")
    const [selectreportValue, setselectreportValue] = useState('Select')
    const [merchantidvalue, setmerchantidvalue] = useState('')
    const handleModal = () => setModal(!modal)
    const [btndisabled, setbtndisabled] = useState(true)
    const [selectmerchantidvalue, setselectmerchantidvalue] = useState('Select')
    const [payoutmerchant, setpayoutmerchant] = useState([])
    const [modeluiblock, setmodeluiblock] = useState(false)

    const CloseBtn = <X className='cursor-pointer' size={15} onClick={() => { setModal(false) }} />

    // const countryOptions = [
    //     { value: 'txnReport', label: 'Transaction Report' }
    //     // { value: 'UPI', label: 'UPI' },
    //     // { value: 'UPI_QR', label: 'UPI_QR' },
    //     // { value: 'NB', label: 'NB' },
    //     // { value: 'CARD', label: 'CARD' },
    //     // { value: 'EMI', label: 'EMI' },

    //     // { value: 'GPAY', label: 'GPAY' }
    //     // { value: 'MASTRO', label: 'Mastro' },
    //     // { value: 'RUPAY', label: 'Rupay' }
    // ] 
    const downloadreportbylinkhandler = (e) => {
        console.log('eee', e.target.id)
        setBlock(true)
        // requestsApidata.payoutreportdownloadfileName(e.target.id).then((res) => {
        //     // console.log("daaaa", res.data)
        //     fileDownload(res.data, "report.xlsx")
        // })
        axios.get(`${roolink}api/payout/report/download?fileName=${e.target.id}`, {
            responseType: 'blob'
        })
            .then((res) => {
                fileDownload(res.data, e.target.id)
                setBlock(false)
            })

        // window.location = `${requestsApidata.payoutreportdownloadfileName(e.target.id)}`
    }
    const columns = [
        {
            name: 'Merchant ID',
            selector: 'reportParam3',
            sortable: true,
            minWidth: '50px'
        },
        {
            name: 'From Date',
            selector: 'reportParam1',
            sortable: true,
            minWidth: '150px',
            cell: row => <span>{row.reportParam1 === null ? null : moment(row.reportParam1).format('DD-MM-YYYY')}</span>
        },
        {
            name: 'To Date',
            selector: 'reportParam2',
            sortable: true,
            minWidth: '150px',
            cell: row => <span>{row.reportParam1 === null ? null : moment(row.reportParam2).format('DD-MM-YYYY')}</span>
        },
        {
            name: 'Report Type',
            selector: 'reportType',
            sortable: true,
            minWidth: '50px'
        },
        {
            name: 'Report Execute Status',
            selector: 'reportExecuteStatus',
            sortable: true,
            minWidth: '130px'
        },
        {
            name: 'ACTION',
            sortable: true,
            cell: row => {
                return <span>
                    {row.reportExecuteStatus === "COMPLETED" ? <Badge color='danger' onClick={downloadreportbylinkhandler} id={row.reportPath}>Download</Badge> : null}
                    {/* <Badge style={{ marginLeft: 10 }} id={row.pgName} color='success' onClick={updatemodalopenclick}>Update</Badge> */}
                    {/* {row.pgStatus === "ACTIVE" ? <Badge style={{ marginLeft: 10 }} id={row.pgName} color='success' onClick={updatemodalopenclick}>Update</Badge> : <Badge style={{ marginLeft: 10 }} id={row.pgName} color='success' onClick={updatedummydata}>Update</Badge>}   */}

                </span>
            }
        }
    ]
    const getallgeneratedreportHandler = () => {
        setBlock(true)
        requestsApidata.reportgetAllReportTrListreportName("TRANSACTION_REPORT_PAYIN_MERCHANT_WISE").then(res => {
            if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else {
                setBlock(false)
                setallgetGeneratedreportlist(res.data)
            }
        })
    }
    const updatedata = () => {
        setBlock(true)
        requestsApidata.reportgetAllReportTrListreportName("TRANSACTION_REPORT_PAYIN_MERCHANT_WISE").then(res => {
            if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else {
                setBlock(false)
                setallgetGeneratedreportlist(res.data)
                toast.success('Data Updated Successfully')
            }
        })
    }
    const getallpayINmerchantlis = () => {
        setmodeluiblock(true)
        requestsApidata.allMerchantDetailsReport().then(res => {
            setpayoutmerchant(res.data.extraData.merchantDetails)
            setmodeluiblock(false)
        }).catch((err) => {
            Swal.fire({ text: 'NetWork Error. Connect to network' }).then(() => {
                // window.location.reload()
            })
        })
    }
    useEffect(() => {
        getallgeneratedreportHandler()
        getallpayINmerchantlis()

        requestsApidata.reportgetAllPayoutReportDetails().then(res => {
            if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else {
                setalltransactionreportlist(res.data)
            }
        })
    }, [])

    const countryOptions =
        payoutmerchant.map((v) => {
            return { value: v.merchantId, label: v.merchantId }
        })
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
    const selectreportHandler = (e) => {
        // console.log(e)
        setselectmerchantidvalue(e)
        setbtndisabled(false)
    }
    const merchantidhandler = (e) => {
        setmerchantidvalue(e.target.value)
        e.target.value === "" ? setbtndisabled(true) : setbtndisabled(false)
    }
    const downloadreportHandler = () => {
        // console.log('downloadreportHandler', startDate, endDate, selectreportValue)
        if (startDate === "" || endDate === "" || selectmerchantidvalue === "Select") {
            toast.warning('All field is required')
        } else {
            console.log('run', searchEndDate, searchStartDate, selectmerchantidvalue)
            setbtndisabled(true)
            requestsApidata.payoutgeneratertransactionReport("TRANSACTION_REPORT_PAYIN_MERCHANT_WISE", searchStartDate, searchEndDate, selectmerchantidvalue.value).then((res) => {
                if (res.data.successCode === "API_SUCCESS") {
                    toast.success('Request Processed Successfully !')
                    setbtndisabled(false)
                    getallgeneratedreportHandler()
                    handleModal()
                    setendDate("")
                    setstartDate("")
                    setselectmerchantidvalue('Select')
                } else {
                    toast.warning(res.data.msg[0])
                    setbtndisabled(false)

                }
            })
            // requestsApidata.merchantReport(searchStartDate, searchEndDate).then((res) => {
            //     console.log('merchantReport', res.data)
            //     requestsApidata.downloadFile(res.data.extraData.Details.fileName).then((response) => {
            //         console.log('response', response)
            //     })
            // })
        }
    }
    return (
        <Fragment>
            <Modal
                isOpen={modal}
                toggle={handleModal}
                className='sidebar-sm'
                modalClassName='modal-slide-in'
                contentClassName='pt-0'
            >
                <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
                    <h5 className='modal-title'>Add Request Report</h5>
                </ModalHeader>
                <ModalBody className='flex-grow-1'>
                    <CardTitle tag='h4'>Generate Report Merchant Wise</CardTitle>
                    <UILoader blocking={modeluiblock}>
                   
                    <div>

                        <Row>
                            {/* <Col lg="3">
                            <div style={{ marginTop: 24 }}>
                                <Select
                                    isClearable={false}
                                    id='kycStatus'
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={countryOptions}
                                    onChange={selectreportHandler}
                                    value={selectreportValue}
                                />
                            </div>
                        </Col> */}
                            <FormGroup tag={Col} md='12'>
                                <Label for='merchantid'>Merchant ID</Label>
                                {/* <Input
                                    type='number'
                                    name='merchantid'
                                    id='merchantid'
                                    placeholder='Enter Merchant ID'
                                    onChange={merchantidhandler}
                                    value={merchantidvalue}
                                /> */}
                                <Select
                                    isClearable={false}
                                    id='kycStatus'
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={countryOptions}
                                    onChange={selectreportHandler}
                                    value={selectmerchantidvalue}
                                />
                            </FormGroup>


                            <FormGroup tag={Col} md='12'>
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
                            </FormGroup>

                            <FormGroup tag={Col} md='12'>
                                {/* <div style={{ marginLeft: 10 }}> */}
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
                                    maxDate={addDays(new Date(startDate), 90)}
                                    onKeyDown={(e) => {
                                        e.preventDefault()
                                    }}
                                />
                                {/* </div> */}
                            </FormGroup>
                            <Col lg="12">
                                <div style={{ marginTop: 10 }}>
                                    <Button color="primary"
                                        onClick={downloadreportHandler}
                                        disabled={btndisabled}
                                    >
                                        {/* <Download size={15} />   */}
                                        Generate Report
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    </UILoader>
                    <div>

                    </div>
                </ModalBody>
            </Modal>
            {/* <Card style={{ padding: 20 }}>
                <h6>Download Report by Date</h6>
                <div>
                    <Row>
                        <Col>
                            <Label for='merchantid'>Merchant ID</Label>
                            <Input
                                type='number'
                                name='merchantid'
                                id='merchantid'
                                placeholder='Enter Merchant ID'
                                onChange={merchantidhandler}
                                value={merchantidvalue}
                            />
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
                            <div style={{ marginTop: 22 }}>
                                <Button color="primary"
                                    onClick={downloadreportHandler}
                                >
                                    Generate Report
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>

                </div>
            </Card> */}
            <Card>
                <div style={{ marginBottom: 50 }}>
                    <UILoader blocking={block}>

                        <Datatablecomponent data={allgetGeneratedreportlist} coloumnsprops={columns} refreshdata={updatedata}
                            routename="Transaction Report Merchant Wise"
                            isaddallpayoutmerlist={true}
                            handleModal={handleModal}
                        // ExpandableTable={<ExpandableTable />}
                        // searchFilter={searchalldataHandler}
                        // isaddfilter searchValue={searchValue}
                        />
                    </UILoader>
                </div>
            </Card>
        </Fragment>
    )
}

export default Home