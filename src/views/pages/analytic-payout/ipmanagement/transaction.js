
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
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, RefreshCw, RotateCw, X, Trash2 } from 'react-feather'
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
    const [GetpayoutIPresponse, setGetpayoutIPresponse] = useState([])
    // ** States transactiontypeSelect
    const [listIPdisplay, setlistIPdisplay] = useState('none')
    const [updateIPdisplay, setupdateIPdisplay] = useState('none')
    const [payoutwalletlst, setpayoutwalletlst] = useState([])
    const fromDate = moment().subtract(7, "days").format("DD-MM-YYYY")
    const toDate = moment().format("DD-MM-YYYY")
    const [merchantsearchbtndisabled, setmerchantsearchbtndisabled] = useState(false)
    const [selectkycstatusvalue, setselectkycstatusvalue] = useState('Select')
    const [selectedipValue, setselectedipValue] = useState([])
    const [defaultCheckedsetvalue, setdefaultCheckedsetvalue] = useState(false)
    const [inputipvalue, setinputipvalue] = useState('')
    const [inputiperrormessage, setinputiperrormessage] = useState('')
    const [blokipui, setblokipui] = useState(false)
    const ipregex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    const [uisearchblock, setuisearchblock] = useState(true)

    useEffect(() => {
        // console.log(fromDate, toDate)
        requestsApidata.PayoutWalletlist().then(res => {
            if (res.data.successCode === "API_SUCCESS") {
                setpayoutwalletlst(res.data.extraData.payoutUser)
            setuisearchblock(false)

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
            return { value: v.merchantId, label: v.merchantId }
        })
    const selectkycstatushandler = (e) => {
        // console.log('selectkycstatushandler', e.value)
        setselectkycstatusvalue(e)
        requestsApidata.getUserIp(e.value).then(res => {
            if (res.data.successCode === "API_SUCCESS") {
                setGetpayoutIPresponse([...new Set(res.data.extraData.payout)])
                setmerchantsearchbtndisabled(false)
                setlistIPdisplay('block')
                setdefaultCheckedsetvalue(false)
                // setupdateIPdisplay('none')
                console.log("sdsds", [...new Set(res.data.extraData.payout)])
            } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "MERCHANT_NOT_FOUND") {
                setmerchantsearchbtndisabled(false)
                toast.warning(res.data.msg[0])
                setGetpayoutIPresponse([])
                setlistIPdisplay('none')
            } else if (res.data.exception === "MERCHANT_INFORMATION_NOT_FOUND") {
                setmerchantsearchbtndisabled(false)
                toast.warning(res.data.msg[0])
                setGetpayoutIPresponse([])
                setlistIPdisplay('none')
            } else if (res.data.exception === "USER_STATUS_BLOCKED") {
                setmerchantsearchbtndisabled(false)
                toast.warning(res.data.msg[0])
                setGetpayoutIPresponse([])
                setlistIPdisplay('none')
            }  else if (res.data.exception === null) {
                setmerchantsearchbtndisabled(false)
                toast.warning('Server Error.Contact Admistrator')
                setGetpayoutIPresponse([])
                setlistIPdisplay('none')
            }
        })
    }
    const serarhmerchantipHandler = () => {
        setmerchantsearchbtndisabled(true)
        requestsApidata.getUserIp(searchmerchantinputvalue).then(res => {
            if (res.data.successCode === "API_SUCCESS") {
                setGetpayoutIPresponse(res.data.extraData.payout)
                setmerchantsearchbtndisabled(false)
                setlistIPdisplay('block')
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
            }
        })
    }

    // ** Function to handle filter

    // ** Function to handle Pagination

    const openipformhandler = () => {
        if (GetpayoutIPresponse.length === 0) {
            toast.warning('At least one IP is required')
        } else {
            // console.log('select ip value ------merchantid', selectedipValue.toString(), selectkycstatusvalue.value)
            requestsApidata.updateUserIp(selectkycstatusvalue.value, GetpayoutIPresponse.toString()).then(res => {
                setblokipui(true)
                if (res.data.successCode === 'API_SUCCESS') {
                    Swal.fire({ text: 'IP updated Successfully', title: res.data.msg[0] }).then(() => {
                        selectkycstatushandler(selectkycstatusvalue)
                        setselectedipValue([])
                        // setdefaultCheckedsetvalue(false)
                    }).then(() => {
                        setblokipui(false)
                    })
                } else if (res.data.exception === "INFORMATION_ALREADY_EXISTS_IN_SYSTEM") {
                    toast.warning(res.data.msg[0])
                    setblokipui(false)
                } else {
                    toast.warning(res.data.msg[0])
                    setblokipui(false)

                }
            })
        }

        // Swal.fire({
        //     title: "Input IP Address",
        //     input: 'text',
        //     showCancelButton: true
        // }).then((result) => {
        //     if (result.value === "") {
        //         Swal.fire('IP adress can not be empty')
        //     } else if (result.value) {
        //         console.log(result.value)
        //         requestsApidata.updateUserIp(selectkycstatusvalue.value, result.value).then(res => {
        //             if (res.data.successCode === 'API_SUCCESS') {
        //                 Swal.fire({ text: 'IP updated Successfully', title: res.data.msg[0] }).then(() => {
        //                     selectkycstatushandler(selectkycstatusvalue)
        //                 })
        //             } else if (res.data.exception === "INFORMATION_ALREADY_EXISTS_IN_SYSTEM") {
        //                 toast.warning(res.data.msg[0])
        //             } else {
        //                 toast.warning(res.data.msg[0])
        //             }
        //         })
        //     }
        // })
    }
    const checkboxhandler = (e) => {
        // console.log('checkboxhandler', e.target.checked, e.target.value)
        if (e.target.checked) {
            selectedipValue.push(e.target.value)
        } else {
            selectedipValue.splice(selectedipValue.indexOf(e.target.value), 1)
            //  const filterdata = selectedipValue.filter(item => item !== e.target.value)
            // console.log('filterdata', filterdata)
            // // setselectedipValue(filterdata)
            // // selectedipValue.push(filterdata)

        }
        // console.log('setselectedipValue', selectedipValue)
    }
    const addiphandler = () => {
        if (inputipvalue === "") {
            setinputiperrormessage('Please enter ip address')
        } else if (!ipregex.test(inputipvalue)) {
            // console.log('passord not valid')
            setinputiperrormessage('IP is not in valid formate')
        } else {
            console.log('add ip here', inputipvalue)
            setinputipvalue('')
            GetpayoutIPresponse.push(inputipvalue)
        }

    }

    const removeipvaluehandler = async (e) => {
        console.log('e.ta', e.target.id, GetpayoutIPresponse)
        // await GetpayoutIPresponse.splice(GetpayoutIPresponse.indexOf(e.target.value), 1)
        const filtedaaaa = GetpayoutIPresponse.filter(el => el !== e.target.id)
        console.log('ooooooooo', filtedaaaa)
        setinputipvalue('')
        setinputiperrormessage('')
        await setGetpayoutIPresponse(filtedaaaa)
        //  setGetpayoutIPresponse(GetpayoutIPresponse.filter((_, i) => i !== e.target.value))
        //  setGetpayoutIPresponse(GetpayoutIPresponse.splice(GetpayoutIPresponse.indexOf(e.target.value), 1))
    }
    const inputipvaluehandler = (e) => {
        console.log(e.target.value.length)
        setinputipvalue(e.target.value)
        setinputiperrormessage('')
        if (e.target.value.length === 0) {
            setinputiperrormessage('')
        } else if (!ipregex.test(e.target.value)) {
            // console.log('passord not valid')
            setinputiperrormessage('IP is not in valid formate')
        }
    }
    return (
        <Fragment>
            {/* <h6>Search by date or search by merchantID and Status</h6> */}
            <br />
            {console.log('rense ', GetpayoutIPresponse)}
            <Card style={{ padding: 20 }}>
                <div>
                    <h6>Manage IP</h6>
                    <UILoader blocking={uisearchblock}>

                    <FormGroup tag={Col} md='5'>
                        <Label className='form-label' for={`kycStatus`}>
                            Select Merchant
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
                        />

                    </FormGroup>
                    </UILoader>
                    
                    <Row>

                        <Col lg="5">
                            <UILoader blocking={blokipui}>
                                <div style={{ display: listIPdisplay }}>
                                    <h6>List of Merchant IP</h6>
                                    {GetpayoutIPresponse.map((v) => {
                                        return <li style={{ listStyleType: "none" }}>
                                            {v} <Trash2 color='red' style={{ cursor: 'pointer' }}
                                                id={v} onClick={removeipvaluehandler} />
                                        </li>
                                    })}
                                    <span>
                                    </span>
                                    <div style={{ marginTop: 10 }}>
                                        <Row>
                                            <Col lg="8">
                                                <Input type='text' style={{ height: 25 }}
                                                    onChange={inputipvaluehandler}
                                                    value={inputipvalue}></Input>
                                                <span style={{ color: 'red' }}>{inputiperrormessage}</span>
                                            </Col>
                                            <Col lg="">
                                                <Badge style={{ cursor: 'pointer' }} color='success' onClick={addiphandler}><Plus></Plus> Add IP </Badge>
                                            </Col>

                                        </Row>
                                    </div>
                                    {/* {GetpayoutIPresponse.map((v) => {
                                    return <li style={{ listStyleType: "none" }}>
                                        <FormGroup style={{ marginLeft: 20 }}>
                                            <Input type='checkbox' id='basic-cb-unchecked' value={v}
                                                defaultChecked={defaultCheckedsetvalue} onChange={checkboxhandler} />
                                            <Label for='basic-cb-unchecked' check style={{ fontWeight: 'bold' }}>
                                                {v}
                                            </Label>
                                        </FormGroup>
                                    </li>
                                })} */}
                                    <div style={{ marginTop: 10 }}>
                                        <Button color="primary" onClick={openipformhandler}>
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </UILoader>

                        </Col>
                    </Row>
                </div>
            </Card>
        </Fragment>
    )
}

export default Home