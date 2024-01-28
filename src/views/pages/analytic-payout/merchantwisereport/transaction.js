
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
import Datatablecomponent from './datatablecomponent'
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
    Col, FormGroup, Badge
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
    const [searchmerchantinputvalue, setsearchmerchantinputvalue] = useState('')
    const [GetMerchantdetailsresponse, setGetMerchantdetailsresponse] = useState([])
    const [Getwalletdetailsresponse, setGetwalletdetailsresponse] = useState([])

    // ** States transactiontypeSelect
    const [listIPdisplay, setlistIPdisplay] = useState('none')
    const [updateIPdisplay, setupdateIPdisplay] = useState('none')
    const [payoutwalletlst, setpayoutwalletlst] = useState([])
    const fromDate = moment().subtract(7, "days").format("DD-MM-YYYY")
    const toDate = moment().format("DD-MM-YYYY")
    const [merchantsearchbtndisabled, setmerchantsearchbtndisabled] = useState(false)
    const [selectkycstatusvalue, setselectkycstatusvalue] = useState('Select')
    const [uisearchblock, setuisearchblock] = useState(false)

    useEffect(() => {
        // console.log(fromDate, toDate)
        requestsApidata.PayoutWalletlist().then(res => {
            if (res.data.successCode === "API_SUCCESS") {
                setpayoutwalletlst(res.data.extraData.walletlist)
                // setBlock(false)
            } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            }
        })
    }, [])
    const countryOptions =
        payoutwalletlst.map((v) => {
            return { value: v.merchantid, label: v.merchantid }
        })
    const selectkycstatushandler = (e) => {
        console.log('selectkycstatushandler', e.value)
        setselectkycstatusvalue(e)
        setuisearchblock(true)
        requestsApidata.getPayoutUserWithDetails(e.value).then(res => {
            if (res.data.successCode === "API_SUCCESS") {
                setGetMerchantdetailsresponse(res.data.extraData.payoutUser[0])
                setGetwalletdetailsresponse(res.data.extraData.payoutUser[0])
                setmerchantsearchbtndisabled(false)
                setlistIPdisplay('block')
                setuisearchblock(false)
                // setupdateIPdisplay('none')
            } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "MERCHANT_NOT_FOUND") {
                setmerchantsearchbtndisabled(false)
                toast.warning(res.data.msg[0])
                setGetMerchantdetailsresponse([])
                setGetwalletdetailsresponse([])
                setlistIPdisplay('none')
                setuisearchblock(false)
            } else if (res.data.exception === "MERCHANT_INFORMATION_NOT_FOUND") {
                setmerchantsearchbtndisabled(false)
                toast.warning(res.data.msg[0])
                setGetMerchantdetailsresponse([])
                setGetwalletdetailsresponse([])
                setlistIPdisplay('none')
                setuisearchblock(false)
            }
        })
    }


    // ** Function to handle filter

    // ** Function to handle Pagination


    const checkboxhandler = (e) => {
        console.log('checkboxhandler', e.target.checked, e.target.value)
        // if (e.target.checked) {
        //     setcheckboxvalue('Checked')
        // } else {
        //     setcheckboxvalue('UnChecked')
        // }
    }
    const handleFocus = (event) => {
        // const focusValue = event.target.value;
        // console.log("Should be focus value", focusValue);
        setselectkycstatusvalue("Select")
    }
    return (
        <Fragment>
            {/* <h6>Search by date or search by merchantID and Status</h6> */}
            <br />

            <Card style={{ padding: 20 }}>
                <div>
                    <h6 style={{ marginLeft: 15 }}>Merchant Wise Wallet Details</h6>
                    <UILoader blocking={uisearchblock}>

                        <FormGroup tag={Col} md='6'>
                            <Label className='form-label' for={`kycStatus`}>
                                Search Merchant by ID
                            </Label>
                            <Select
                                // theme={selectThemeColors}
                                isClearable={false}
                                id='kycStatus'
                                className='react-select'
                                classNamePrefix='select'
                                options={countryOptions}
                                //   defaultValue={countryOptions[0]}
                                onChange={selectkycstatushandler}
                                value={selectkycstatusvalue}
                            // onFocus={handleFocus}
                            />
                        </FormGroup>
                    </UILoader>
                    <Row>
                        <Col lg="6">
                            <div style={{ display: listIPdisplay, marginLeft: 20 }}>
                                {/* <h6>List of Merchant IP</h6> */}

                                <p> <span style={{ fontWeight: "bold" }}>Merchant ID:</span> <span>{GetMerchantdetailsresponse.merchantId}</span></p>
                                <p> <span style={{ fontWeight: "bold" }}>Created Date:</span> <span>{moment(GetMerchantdetailsresponse.created).format('DD-MM-YYYY')}</span></p>
                                <p> <span style={{ fontWeight: "bold" }}>Merchant Status:</span> <span>{GetMerchantdetailsresponse.merchantStatus}</span></p>
                                {/* <h6>Wallet Details</h6> */}

                                {/* <p> <span style={{ fontWeight: "bold" }}>Wallet Name:</span> <span>{Getwalletdetailsresponse.name}</span></p> */}
                                <p> <span style={{ fontWeight: "bold" }}>Wallet Status:</span> <span>{Getwalletdetailsresponse.walletStatus}</span></p>
                                {/* <p> <span style={{ fontWeight: "bold" }}>Wallet ID:</span> <span>{Getwalletdetailsresponse.walletid}</span></p> */}
                                {/* <p> <span style={{ fontWeight: "bold" }}>Amount:</span> <span>{Getwalletdetailsresponse.amount}</span></p> */}
                                {/* <p> <span style={{ fontWeight: "bold" }}>Created Date:</span> <span>{moment(Getwalletdetailsresponse.created).format('DD-MM-YYYY')}</span></p> */}
                                <p> <span style={{ fontWeight: "bold" }}>WhitelistedIP:</span> <span>{Getwalletdetailsresponse.whitelistedIP}</span></p>

                                {/* {GetMerchantdetailsresponse.map((v) => {
                                    return <li style={{listStyleType:"none"}}>
                                     {v}
                                        </li>
                                })} */}

                            </div>

                        </Col>
                    </Row>
                </div>
            </Card>
        </Fragment>
    )
}

export default Home