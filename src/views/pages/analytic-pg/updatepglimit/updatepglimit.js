import * as yup from 'yup'

import { Fragment, useState, forwardRef, useEffect } from 'react'
import UILoader from '@components/ui-loader'
// ** Table Data & Columns
import moment from "moment"
import { useHistory } from 'react-router-dom'

import requestsApi from './request'
// ** Add New Modal Component
// import AddNewModal from '../../../tables/data-tables/basic/AddNewModal'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Third Party Components
import Select from 'react-select'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
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
    Row, FormGroup,
    Col, Form, FormFeedback
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

const UpdatePGLIMIT = () => {
    // console.log("response datad----->", data({}))
    const [submitdisables, setsubmitdisables] = useState(false)
    const [selectedValue, setSelectedValue] = useState("Select")
    const [Selectpolicytypevalue, setSelectpolicytypevalue] = useState('')
    const history = useHistory()
    const [selectkycstatusvalue, setselectkycstatusvalue] = useState('Select')
    const [dailyLimit, setdailyLimit] = useState('')
    const [maxLimit, setmaxLimit] = useState('')
    const [minLimit, setminLimit] = useState('')
    const [merchantidslist, setmerchantidslist] = useState([])
    const [selectmerchantidvalue, setselectmerchantidvalue] = useState('Select')
    const [allpglistdata, setallpglistdata] = useState([])
    const [SelectpgIDvalue, setSelectpgIDvalue] = useState('Select')
    const [Serviceselectmerchantidvalue, setServiceselectmerchantidvalue] = useState('Select')
    const [SelectMerchantpgIDvalue, setSelectMerchantpgIDvalue] = useState('Select')
    const [selectMerchantServiceValue, setselectMerchantServiceValue] = useState('Select')
    const [SelectMerchantPGandservicedetails, setSelectMerchantPGandservicedetails] = useState([])
    // const [getmerchantServicedetailsoptions, setgetmerchantServicedetailsoptions] = useState([])
    const [dummyoptions, setdummyoptions] = useState([])
    const getallpgdetailsapi = () => {
        requestsApidata.getAllPGDetails().then((res) => {
            setallpglistdata(res.data)
        })
    }
    useEffect(() => {
        requestsApidata.allMerchantDetailsReport().then((res) => {
            // console.log('res.data')
            getallpgdetailsapi()
            setmerchantidslist(res.data.extraData.merchantDetails)
        })
    }, [])
    const countryOptions = [
        { value: 'MERCHANT', label: 'MERCHANT' },
        { value: 'PG', label: 'PG' },
        { value: 'SERVICE', label: 'SERVICE' }
    ]
    const merchantlistOptions =
        merchantidslist.map((v) => {
            return { value: v.merchantId, label: v.merchantId }
        })

    const pglistoptions =
        allpglistdata.map((v) => {
            return { value: v.pgUuid, label: v.pgName }
        })
    const selectPGidHandler = (e) => {
        setSelectpgIDvalue(e)
    }
    const selectmerchantidHandler = (e) => {
        // console.log('select merchant id', e.value)
        setselectmerchantidvalue(e)

    }
    const ServiceselectmerchantidHandler = (e) => {
        setServiceselectmerchantidvalue(e)
        const filterdata = merchantidslist.filter((m) => m.merchantId === e.value)
        console.log('filterdata', filterdata, filterdata[0].merchantpgdetails)
        setSelectMerchantPGandservicedetails(filterdata[0].merchantpgdetails)
    }
    const selectmerchantpglistoptions =
        SelectMerchantPGandservicedetails.map((v) => {
            return { value: v.pguuid, label: v.pgname }
        })
    const getmerchantServicedetailsoptions =
        dummyoptions.map((v) => {
            return { value: v.serviceType, label: v.serviceType }
        })

    const handleChange = e => {
        setSelectedValue(e)
        setSelectpolicytypevalue(e.value)
    }
    const onFucusselectMerchantPGidHandler = (e) => {

    }
    const selectMerchantPGidHandler = (e) => {
        // setgetmerchantServicedetailsoptions([])
        // filterdata[0].merchantpgdetails.map((v) => {
        //     v.merchantservicedetails.map((val) => {
        //         return getmerchantServicedetailsoptions.push(val.serviceType)
        //     })
        // })
        // console.log('ssssss', SelectMerchantPGandservicedetails)
        setSelectMerchantpgIDvalue(e)
        const filterdata = SelectMerchantPGandservicedetails.filter((m) => m.pguuid === e.value)
        console.log('filtervalue', filterdata[0], filterdata[0].merchantservicedetails)
        //    filterdata[0].map((v) => {
        //      v.merchantservicedetails
        //    })
        setdummyoptions(filterdata[0].merchantservicedetails)
    }

    const selectMerchantServiceHandler = (e) => {
        setselectMerchantServiceValue(e)
    }

    // ** Function to handle filter

    // ** Function to handle Pagination
    const finalapicall = (policytype) => {
        setsubmitdisables(true)
        console.log('policytypefinalsubmit', policytype)
        const senddata = {
            merchantId: policytype === "SERVICE" ? Serviceselectmerchantidvalue.value : policytype === "MERCHANT" ? selectmerchantidvalue.value : "",
            pgId: policytype === "SERVICE" ? SelectMerchantpgIDvalue.value : policytype === "PG" ? SelectpgIDvalue.value : "",
            service: policytype === "SERVICE" ? selectMerchantServiceValue.value : "",
            policyType: policytype,
            dailyLimit,
            maxLimit,
            minLimit
        }
        console.log('send data', senddata)
        requestsApidata.payingupdatelimitpolicy(senddata).then((res) => {
            console.log('res', res.data)
        setsubmitdisables(false)
            if (res.data.successCode === "API_SUCCESS") {
                Swal.fire({ text: res.data.msg[0], icon: 'success' }).then(() => {
                    setdailyLimit('')
                    setmaxLimit('')
                    setminLimit('')
                    setServiceselectmerchantidvalue('Select')
                    setSelectMerchantpgIDvalue('Select')
                    setselectMerchantServiceValue('Select')
                    setSelectedValue('Select')
                    setselectmerchantidvalue('Select')
                    setSelectpgIDvalue('Select')
                })
            } else {
                toast.warning(res.data.msg[0])
            }
        })
    }
    const submitdataHandler = () => {
        // console.log('selectmerchantpglistoptions', selectmerchantpglistoptions, getmerchantServicedetailsoptions, selectMerchantServiceValue, SelectMerchantpgIDvalue)
        if (Selectpolicytypevalue === "") {
            toast.warning('Policy Type cn not be empty')
        } else if (dailyLimit === "") {
            toast.warning('Daily Limit can not be empty')
        } else if (maxLimit === "") {
            toast.warning('Max Limit can not be empty')
        } else if (minLimit === "") {
            toast.warning('Min Limit can not be empty')
        } else if (Selectpolicytypevalue === "MERCHANT") {
            if (selectmerchantidvalue === "Select") {
                toast.warning('Select Merchant ID')
            } else {
                finalapicall('MERCHANT')
            }
        } else if (Selectpolicytypevalue === "PG") {
            if (SelectpgIDvalue === "Select") {
                toast.warning('Select PG')
            } else {
                finalapicall('PG')
            }
        } else if (Selectpolicytypevalue === "SERVICE") {
            if (Serviceselectmerchantidvalue === "Select") {
                toast.warning('Select Merchant')
            } else if (SelectMerchantpgIDvalue === "Select") {
                toast.warning('Select PG')
            } else if (selectMerchantServiceValue === "Select") {
                toast.warning('Select Service')
            } else {
                finalapicall('SERVICE')
            }
        }
    }
    return (
        <Fragment>
            {/* <h6>Search by date or search by merchantID and Status</h6> */}
            <br />

            <Card style={{ padding: 20 }}>
                <div>
                    <h6>Update PG Limit</h6>
                    <div className='content-header'>
                        {/* <h5 className='mb-0'>Create Admin</h5> */}
                        {/* <small className='text-muted'>Enter Your Admin Details.</small> */}
                    </div>
                    <div>
                        {/* {console.log('selectedValue', Selectpolicytypevalue)} */}
                        <Row>
                            <Col lg="3">
                                <Label className='form-label' for={`kycStatus`}>
                                    Select Policy Type<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                                </Label>
                                <Select
                                    isClearable={false}
                                    id='kycStatus'
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={countryOptions}
                                    onChange={handleChange}
                                    value={selectedValue}
                                />
                            </Col>
                            {
                                Selectpolicytypevalue === "MERCHANT" ? <Col lg="3">
                                    <Label>Select Merchant ID<span className='labelcssrequired'>*</span></Label>
                                    <Select
                                        isClearable={false}
                                        id='kycStatus'
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={merchantlistOptions}
                                        onChange={selectmerchantidHandler}
                                        value={selectmerchantidvalue}
                                    />
                                </Col> : Selectpolicytypevalue === "PG" ? <Col lg="3">
                                    <Label>Select PG<span className='labelcssrequired'>*</span></Label>
                                    <Select
                                        isClearable={false}
                                        id='kycStatusa'
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={pglistoptions}
                                        onChange={selectPGidHandler}
                                        value={SelectpgIDvalue}
                                    />
                                </Col> : Selectpolicytypevalue === "SERVICE" ? <><Col lg="3">
                                    <Label>Select Merchant ID<span className='labelcssrequired'>*</span></Label>
                                    <Select
                                        isClearable={false}
                                        id='kycStatus'
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={merchantlistOptions}
                                        onChange={ServiceselectmerchantidHandler}
                                        value={Serviceselectmerchantidvalue}
                                    />
                                </Col>
                                    <Col lg="3">
                                        <Label>Select PG<span className='labelcssrequired'>*</span></Label>
                                        <Select
                                            isClearable={false}
                                            id='kycStatusa'
                                            className='react-select'
                                            classNamePrefix='select'
                                            options={selectmerchantpglistoptions}
                                            onChange={selectMerchantPGidHandler}
                                            value={SelectMerchantpgIDvalue}
                                        />
                                    </Col>
                                    <Col lg="3">
                                        <Label>Select Service<span className='labelcssrequired'>*</span></Label>
                                        <Select
                                            isClearable={false}
                                            id='kycStatusa'
                                            className='react-select'
                                            classNamePrefix='select'
                                            options={getmerchantServicedetailsoptions}
                                            onChange={selectMerchantServiceHandler}
                                            value={selectMerchantServiceValue}
                                        />
                                    </Col>
                                </> : null
                            }
                        </Row>
                        <div style={{ marginTop: 10 }}>
                            <Row>
                                <Col lg="4">
                                    <Label for='comment'>Daily Limit<span className='labelcssrequired'>*</span></Label>
                                    <Input
                                        placeholder='DailyLimit'
                                        value={dailyLimit}
                                        onChange={(e) => setdailyLimit(e.target.value)}
                                        type='number'
                                    />
                                </Col>
                                <Col lg="4">
                                    <Label for='maxLimit'>Max Limit<span className='labelcssrequired'>*</span></Label>
                                    <Input
                                        placeholder='MaxLimit'
                                        value={maxLimit}
                                        onChange={(e) => setmaxLimit(e.target.value)}
                                        type='number'
                                    />
                                </Col>  <Col lg="4">
                                    <Label for='minLimit'>Min Limit<span className='labelcssrequired'>*</span></Label>
                                    <Input
                                        placeholder='Min Limit'
                                        value={minLimit}
                                        onChange={(e) => setminLimit(e.target.value)}
                                        type='number'
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <Button disabled={submitdisables} color='primary' onClick={submitdataHandler}>Submit</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </Fragment>
    )
}

export default UpdatePGLIMIT