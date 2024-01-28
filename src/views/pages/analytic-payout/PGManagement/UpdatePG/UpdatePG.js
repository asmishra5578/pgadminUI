// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import requestsApi from '../PGDetails/requests'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, RefreshCw } from 'react-feather'
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
    Row, Form, FormFeedback, FormGroup,
    Col,
    CardBody, CustomInput, Badge
} from 'reactstrap'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
    <div className='custom-control custom-checkbox'>
        <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
        <label className='custom-control-label' onClick={onClick} />
    </div>
))

const DataTableWithButtons = (props) => {
    const countryOptions = [
        { value: 'WALLET', label: 'WALLET' },
        { value: 'UPI', label: 'UPI' },
        { value: 'UPI_QR', label: 'UPI_QR' },
        { value: 'NB', label: 'NB' },
        { value: 'CARD', label: 'CARD' },
        { value: 'EMI', label: 'EMI' },

        { value: 'GPAY', label: 'GPAY' }
        // { value: 'MASTRO', label: 'Mastro' },
        // { value: 'RUPAY', label: 'Rupay' }
    ]
    const pgallservices = ['WALLET', 'UPI', 'UPI_QR', 'NB', 'CARD', 'EMI', 'GPAY']
    const requestsApidata = new requestsApi()
    const [availableservices, setavailableservices] = useState([])
    const [selectedValue, setSelectedValue] = useState('Select')
    const [selectPGuuidvalue, setselectPGuuidvalue] = useState('Select')
    const [detailsdisplay, setdetailsdisplay] = useState('none')
    const [serviceDataDisplay, setserviceDataDisplay] = useState('Block')
    const [alreadyserviceData, setalreadyserviceData] = useState([])
    const [disabledbtns, setdisabledbtns] = useState(false)
    const [pglist, setpglist] = useState([])
    const SignupSchema = yup.object().shape({
        pgAppId: yup.string(),
        pgName: yup.string().required('PG Name can not be empty'),
        pgSaltKey: yup.string(),
        pgSecretKey: yup.string(),
        pgAddInfo1: yup.string(),
        pgAddInfo2: yup.string(),
        pgAddInfo3: yup.string(),
        pgAddInfo4: yup.string(),
        pgAddInfo5: yup.string(),
        pgAddInfo6: yup.string(),
        pgAddInfo7: yup.string(),
        pgAddInfo8: yup.string(),
        pgAddInfo9: yup.string(),
        pgAddInfo10: yup.string()
    })
    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    const handleChange = e => {
        console.log('handlechange', e)
        setSelectedValue(e)
    }
    const onSubmit = data => {
        // console.log("dsadasd", selectedValue)

        if (data.pgAppId === "" && data.pgSaltKey === "" && data.pgSecretKey === "") {
            toast.error('APPID, Salt key and Secret Key all can not be empty')
        } else if (data.pgAppId === "" && data.pgSaltKey === "") {
            toast.error('Any two fields are required (AppID, SaltKey, Secret Key)')
        } else if (data.pgSaltKey === "" && data.pgSecretKey === "") {
            toast.error('Any two fields are required (AppID, SaltKey, Secret Key)')
        } else if (data.pgAppId === "" && data.pgSecretKey === "") {
            toast.error('Any two fields are required (AppID, SaltKey, Secret Key)')
        } else if (selectedValue === "Select") {
            toast.error('Select Service')
        } else {
            const selectvaluearray = []
            selectedValue.map((v) => {
                selectvaluearray.push(v.value)
            })
            data.pgServices = selectvaluearray
            console.log("selectvaluearray", data)
            setdisabledbtns(true)

            // parentCallback(data)
            // console.log('data', data)
            requestsApidata.CreatePGDetails(data).then((res) => {
                if (res.data.successCode === "API_SUCCESS") {
                    // setdata(res.data.extraData.transactionDetails)
                    // setBlock(false)
                    requestsApidata.UpdatePgDetailsStatus(res.data.extraData.pgDetail.pgUuid).then(async (response) => {
                        if (response.data.exception === "PG_NOT_CREATED") {
                            toast.error('PG detals not found in System')
                            setbtndisabled(false)
                        } else {
                            // const dataservice = ['UPI', 'UPI_QR', 'CARD']
                            data.pgServices.forEach(border => {
                                requestsApidata.PGServiceCreation(res.data.extraData.pgDetail.pgUuid, border).then(async (response) => {
                                    requestsApidata.UpdatePGService(res.data.extraData.pgDetail.pgUuid, border).then(async (response) => {
                                    })
                                })
                            })
                            setbtndisabled(false)
                            toast.success('PG Created and updated successfully')
                            history.push('/pg/pgdetails')
                            // setModal(!modal)
                            // updatedata()
                        }
                    }).catch((err) => {
                        Swal.fire({ text: 'NetWork Error. Connect to network' }).then(() => {
                            // window.location.reload()
                        })
                    })
                } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                    toast.error('Session Expired Login again!')
                    history.push('/')
                } else if (res.data.exception === "JWT_MISSING") {
                    toast.error('Session Expired Login again!')
                    history.push('/')
                } else if (res.data.exception === "PG_ALREADYCREATED") {
                    toast.error('PG details already created as per Input provided , please crosscheck the sensitive information')
                    setbtndisabled(false)
                }
            })
        }
    }
    // ** States
    useEffect(() => {
        requestsApidata.pgdetailsApi().then(res => {
            console.log("pg details final resonse", res.data)
            if (res.data.successCode === "API_SUCCESS") {
                // setBlock(false)
                const map = new Map(res.data.extraData.pgDetail.map(({ pg_name, pg_uuid, created, pg_daily_limit, pg_status, pg_services, service_status }) => [pg_name, { pg_name, pg_servicea: [], pg_uuid, created, pg_daily_limit, pg_status }]))
                for (const { pg_name, service_status, pg_services } of res.data.extraData.pgDetail) map.get(pg_name).pg_servicea.push(...[{ pgservices: pg_services, servicestatus: service_status }].flat())
                setpglist([...map.values()])
                console.log("mapppppppp", [...map.values()])
            } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            }
        }).catch((err) => {
            Swal.fire({ text: 'NetWork Error. Connect to network' }).then(() => {
                // window.location.reload()
            })
        })

        // console.log(data)
    }, [])
    const refreshdataHandler = () => {
        setdetailsdisplay('none')
        setselectPGuuidvalue('Select')
        requestsApidata.pgdetailsApi().then(res => {
            console.log("pg details final resonse", res.data)
            if (res.data.successCode === "API_SUCCESS") {
                // setBlock(false)
                const map = new Map(res.data.extraData.pgDetail.map(({ pg_name, pg_uuid, created, pg_daily_limit, pg_status, pg_services, service_status }) => [pg_name, { pg_name, pg_servicea: [], pg_uuid, created, pg_daily_limit, pg_status }]))
                for (const { pg_name, service_status, pg_services } of res.data.extraData.pgDetail) map.get(pg_name).pg_servicea.push(...[{ pgservices: pg_services, servicestatus: service_status }].flat())
                setpglist([...map.values()])
                console.log("mapppppppp", [...map.values()])
            } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            }
        }).catch((err) => {
            Swal.fire({ text: 'NetWork Error. Connect to network' }).then(() => {
                // window.location.reload()
            })
        })
    }
    const merchantlistOptions =
        pglist.map((v) => {
            return { value: v.pg_uuid, label: v.pg_name }
        })
    const selectPGuuidHandler = (e) => {
        setdetailsdisplay('block')
        setselectPGuuidvalue(e)
        console.log('getpg filter', e.value)
        setavailableservices([])
    //        requestsApidata.tgepgDetailByPGNameAndPgId(e.value).then(res => {
    //   console.log('ressss', res.data)
    // })
        requestsApidata.pgdetailsApi().then(res => {
            const map = new Map(res.data.extraData.pgDetail.map(({ pg_name, pg_uuid, created, pg_daily_limit, pg_status, pg_services, service_status }) => [pg_name, { pg_name, pg_servicea: [], pg_uuid, created, pg_daily_limit, pg_status }]))
            for (const { pg_name, service_status, pg_services } of res.data.extraData.pgDetail) map.get(pg_name).pg_servicea.push(...[{ pgservices: pg_services, servicestatus: service_status }].flat())
            // setpglist([...map.values()])
            const filterdata = [...map.values()].filter((m) => m.pg_uuid === e.value)
            console.log('filterdata', filterdata)
            const alreadyservices = []
            filterdata.map((v) => {
                v.pg_servicea.map((val) => {
                    alreadyservices.push(val.pgservices)
                })
            })
            console.log('alreadyservices', alreadyservices, pgallservices)
            const unique1 = pgallservices.filter((o) => alreadyservices.indexOf(o) === -1)
            console.log('unique1', unique1)
            setavailableservices(unique1)
            setalreadyserviceData(filterdata)
            // toast.success('Data Updated Successfully')
        })
        //     const filterdata = pglist.filter((m) => m.pg_uuid === e.value)
        //     console.log('filterdata', filterdata)
        //    await setalreadyserviceData(filterdata)
    }
    const customInputSwitched = pguuid => (e) => {
        console.log("customInputSwitched", e.target.checked, pguuid, e.target.id)
        if (e.target.checked === true) {
            alert('Please OK for Active Service')
            requestsApidata.UpdatePGService(pguuid, e.target.id).then((res) => {

                if (res.data.successCode === "API_SUCCESS") {
                    if (res.data.extraData.pgDetail.status === "ACTIVE") {
                        toast.success('PG Service Active Successfully')
                    }
                } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                    toast.error('Session Expired Login again!')
                    history.push('/')
                } else if (res.data.exception === "JWT_MISSING") {
                    toast.error('Session Expired Login again!')
                    history.push('/')
                } else {
                    toast.warning(res.data.msg[0])
                }
            }).catch((err) => {
                Swal.fire({ text: 'NetWork Error. Connect to network' }).then(() => {
                    window.location.reload()
                })
            })
        } else if (e.target.checked === false) {
            alert('Please OK for BLOCK Service')
            requestsApidata.BlockPGService(pguuid, e.target.id).then((res) => {
                if (res.data.successCode === "API_SUCCESS") {
                    if (res.data.extraData.pgDetail.status === "BLOCKED") {
                        toast.success('PG Service Block Successfully')
                    }
                } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                    toast.error('Session Expired Login again!')
                    history.push('/')
                } else if (res.data.exception === "JWT_MISSING") {
                    toast.error('Session Expired Login again!')
                    history.push('/')
                } else {
                    toast.warning(res.data.msg[0])
                }
            }).catch((err) => {
                Swal.fire({ text: 'NetWork Error. Connect to network' }).then(() => {
                    window.location.reload()
                })
            })
        }
    }
    const pgblockhandler = (e) => {
        // console.log('pgblock', e.target.id)
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to block this PG",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Block it!'
        }).then((result) => {
            if (result.isConfirmed) {
                requestsApidata.blockpgdetails(e.target.id).then((res) => {
                    // console.log('res-----<block', res.data)
                    if (res.data.successCode === "API_SUCCESS") {
                        // setdata(res.data.extraData.pgDetail)
                        // setBlock(false)
                        if (res.data.extraData.pgDetail.status === "BLOCKED") {
                            requestsApidata.pgdetailsApi().then(res => {
                                const map = new Map(res.data.extraData.pgDetail.map(({ pg_name, pg_uuid, created, pg_daily_limit, pg_status, pg_services, service_status }) => [pg_name, { pg_name, pg_servicea: [], pg_uuid, created, pg_daily_limit, pg_status }]))
                                for (const { pg_name, service_status, pg_services } of res.data.extraData.pgDetail) map.get(pg_name).pg_servicea.push(...[{ pgservices: pg_services, servicestatus: service_status }].flat())
                                // setpglist([...map.values()])
                                const filterdata = [...map.values()].filter((m) => m.pg_uuid === e.target.id)
                                console.log('filterdata', filterdata)
                                setalreadyserviceData(filterdata)
                                toast.success('Data Updated Successfully')
                            })
                        }
                    } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                        toast.error('Session Expired Login again!')
                        history.push('/')
                    } else if (res.data.exception === "JWT_MISSING") {
                        toast.error('Session Expired Login again!')
                        history.push('/')
                    }
                })
            }
        })
    }
    const pgactivehandler = (e) => {
        // console.log('pgactive', e.target.id)
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Active this PG",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Active it!'
        }).then((result) => {
            if (result.isConfirmed) {
                requestsApidata.UpdatePgDetailsStatus(e.target.id).then((res) => {
                    // console.log('res-----<active', res.data)
                    // if (res.data.status === "ACTIVE") {
                    //   requestsApidata.pgdetailsApi().then(res => {
                    //     setBlock(false)
                    //     const map = new Map(res.data.map(({pg_name, pg_uuid, created, pg_status, pg_services, service_status}) => [pg_name, {pg_name, pg_servicea: [], pg_uuid, created, pg_status}]))
                    //     // console.log("map--->", map)
                    //     for (const {pg_name, service_status, pg_services} of res.data) map.get(pg_name).pg_servicea.push(...[{pgservices:pg_services, servicestatus:service_status}].flat())
                    //     // console.log([...map.values()])
                    //     setdata([...map.values()])
                    //     toast.success('Data Updated Successfully')
                    //   })
                    // }
                    if (res.data.successCode === "API_SUCCESS") {
                        // setdata(res.data.extraData.pgDetail)
                        // setBlock(false)
                        if (res.data.extraData.pgDetail.status === "ACTIVE") {
                            requestsApidata.pgdetailsApi().then(res => {
                                const map = new Map(res.data.extraData.pgDetail.map(({ pg_name, pg_uuid, created, pg_daily_limit, pg_status, pg_services, service_status }) => [pg_name, { pg_name, pg_servicea: [], pg_uuid, created, pg_daily_limit, pg_status }]))
                                for (const { pg_name, service_status, pg_services } of res.data.extraData.pgDetail) map.get(pg_name).pg_servicea.push(...[{ pgservices: pg_services, servicestatus: service_status }].flat())
                                // setpglist([...map.values()])
                                const filterdata = [...map.values()].filter((m) => m.pg_uuid === e.target.id)
                                console.log('filterdata', filterdata)
                                setalreadyserviceData(filterdata)
                                toast.success('Data Updated Successfully')
                            })
                        }
                    } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                        toast.error('Session Expired Login again!')
                        history.push('/')
                    } else if (res.data.exception === "JWT_MISSING") {
                        toast.error('Session Expired Login again!')
                        history.push('/')
                    }
                })
            }
        })
    }
    const updatepglimithandler = (e) => {
        console.log('update pg limit', e.target.id)
        // UpdatePgDetailsStatuspgDailyLimit
        Swal.fire({
            title: "Input PG Limit",
            // text: "Write something interesting:",
            input: 'text',
            showCancelButton: true
        }).then((result) => {
            // console.log('okji', result.value === "")
            if (result.value === "") {
                Swal.fire('PG Limit can not be empty')
            } else if (result.value) {
                console.log(result.value)
                // console.log('getticktdeeeee', getticketdetails)
                requestsApidata.UpdatePgDetailsStatuspgDailyLimit(result.value, e.target.id).then(res => {
                    if (res.data.successCode === 'API_SUCCESS') {
                        Swal.fire({ text: 'PG Limit Updated Successfully', title: res.data.msg[0] }).then(() => {
                            //   setBasicModal(!basicModal)
                            //   updatedata()
                            requestsApidata.pgdetailsApi().then(res => {
                                const map = new Map(res.data.extraData.pgDetail.map(({ pg_name, pg_uuid, created, pg_daily_limit, pg_status, pg_services, service_status }) => [pg_name, { pg_name, pg_servicea: [], pg_uuid, created, pg_daily_limit, pg_status }]))
                                for (const { pg_name, service_status, pg_services } of res.data.extraData.pgDetail) map.get(pg_name).pg_servicea.push(...[{ pgservices: pg_services, servicestatus: service_status }].flat())
                                // setpglist([...map.values()])
                                const filterdata = [...map.values()].filter((m) => m.pg_uuid === selectPGuuidvalue.value)
                                console.log('filterdata', filterdata)
                                const alreadyservices = []
                                filterdata.map((v) => {
                                    v.pg_servicea.map((val) => {
                                        alreadyservices.push(val.pgservices)
                                    })
                                })
                                console.log('alreadyservices', alreadyservices, pgallservices)
                                const unique1 = pgallservices.filter((o) => alreadyservices.indexOf(o) === -1)
                                console.log('unique1', unique1)
                                setavailableservices(unique1)
                                setalreadyserviceData(filterdata)
                                // toast.success('Data Updated Successfully')
                            })
                        })
                    }
                })
            }
        })
    }
    const customAddnewservices = pguuid => (e) => {
        console.log("customAddnewservices", e.target.checked, pguuid, e.target.id)
        if (e.target.checked === true) {
            requestsApidata.PGServiceCreation(pguuid, e.target.id).then((response) => {
                requestsApidata.UpdatePGService(pguuid, e.target.id).then((res) => {
                    if (res.data.successCode === "API_SUCCESS") {
                        if (res.data.extraData.pgDetail.status === "ACTIVE") {
                            toast.success('PG Service Active Successfully')
                        }
                    } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                        toast.error('Session Expired Login again!')
                        history.push('/')
                    } else if (res.data.exception === "JWT_MISSING") {
                        toast.error('Session Expired Login again!')
                        history.push('/')
                    } else {
                        toast.warning(res.data.msg[0])
                    }
                })
            })
        } else if (e.target.checked === false) {
            requestsApidata.BlockPGService(pguuid, e.target.id).then((res) => {
                if (res.data.successCode === "API_SUCCESS") {
                    if (res.data.extraData.pgDetail.status === "BLOCKED") {
                        toast.success('PG Service Block Successfully')
                    }
                } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                    toast.error('Session Expired Login again!')
                    history.push('/')
                } else if (res.data.exception === "JWT_MISSING") {
                    toast.error('Session Expired Login again!')
                    history.push('/')
                } else {
                    toast.warning(res.data.msg[0])
                }
            }).catch((err) => {
                Swal.fire({ text: 'NetWork Error. Connect to network' }).then(() => {
                    window.location.reload()
                })
            })
        }
    }
    const dummypgupdatelimit = () => {
        toast.warning('PG is Blocked')
    }
    return (
        <Fragment>
            <Card>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h4'>Update PG services</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col lg="3">
                            <Label>Select PG Name</Label>
                            <Select
                                isClearable={false}
                                id='kycStatus'
                                className='react-select'
                                classNamePrefix='select'
                                options={merchantlistOptions}
                                onChange={selectPGuuidHandler}
                                value={selectPGuuidvalue}
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            />
                        </Col>
                    </Row>
                    <div style={{ marginTop: 20, display: detailsdisplay}}>
                        <Row>
                            {alreadyserviceData.map((v) => {
                                return <div style={{ marginLeft: 20 }}>
                                    <p>PG Name:<span>{v.pg_name}</span></p>
                                    <p>PG UUID:<span>{v.pg_uuid}</span></p>
                                    <p>PG Status:<span>{v.pg_status}</span>
                                        <span style={{ marginLeft: 20 }}>{v.pg_status === "ACTIVE" ? <Badge onClick={pgblockhandler} color='danger' id={v.pg_uuid}>Block PG</Badge> : <Badge onClick={pgactivehandler} id={v.pg_uuid} color="success">Active PG</Badge>}
                                        </span>  </p>
                                    <p>PG Limit:{v.pg_daily_limit}<span>
                                        {v.pg_status === "ACTIVE" ? <Badge style={{ marginLeft: 20, cursor: 'pointer' }} id={v.pg_uuid} color='success' onClick={updatepglimithandler}>Update</Badge> : <Badge style={{ marginLeft: 20, cursor: 'pointer' }} color='success' onClick={dummypgupdatelimit}>Update</Badge>
                                    }
                                        </span></p>
                                </div>
                            })}
                        </Row>
                        {alreadyserviceData.map((values) => {
                       return     values.pg_status === "ACTIVE" ? <div>
                                   <Row>
                            <h6 style={{ marginLeft: 20 }}>Already Services Associated</h6>
                            {alreadyserviceData.map((val) => {
                                return val.pg_servicea.map((v) => {
                                    return <div style={{}}>
                                        <Col lg="3">
                                            <p> <span><CustomInput type='checkbox' label={v.pgservices} id={v.pgservices} defaultChecked={v.servicestatus === "ACTIVE"} onChange={customInputSwitched(val.pg_uuid)} /> </span></p></Col>
                                    </div>
                                })
                            })}
                        </Row>
                        <Row>
                            <h6 style={{ marginLeft: 20 }}>Add New Service</h6>
                            {console.log('availableservices', availableservices, selectPGuuidvalue.value)}
                            {availableservices.map((val) => {
                                return <div style={{}}>
                                    <Col lg="3">
                                        <p> <span><CustomInput type='checkbox' label={val} id={val} onChange={customAddnewservices(selectPGuuidvalue.value)} /> </span></p></Col>
                                </div>
                            })}
                        </Row>
                            </div> : null
                        })}
                        {/* <Row>
                            <h6 style={{ marginLeft: 20 }}>Already Services Associated</h6>
                            {alreadyserviceData.map((val) => {
                                return val.pg_servicea.map((v) => {
                                    return <div style={{}}>
                                        <Col lg="3">
                                            <p> <span><CustomInput type='checkbox' label={v.pgservices} id={v.pgservices} defaultChecked={v.servicestatus === "ACTIVE"} onChange={customInputSwitched(val.pg_uuid)} /> </span></p></Col>
                                    </div>
                                })
                            })}
                        </Row>
                        <Row>
                            <h6 style={{ marginLeft: 20 }}>Add New Service</h6>
                            {console.log('availableservices', availableservices, selectPGuuidvalue.value)}
                            {availableservices.map((val) => {
                                return <div style={{}}>
                                    <Col lg="3">
                                        <p> <span><CustomInput type='checkbox' label={val} id={val} onChange={customAddnewservices(selectPGuuidvalue.value)} /> </span></p></Col>
                                </div>
                            })}
                        </Row> */}
                        <Row>
                    <div style={{ marginLeft: 20}}>
                            <Button color='primary' onClick={refreshdataHandler}>Refresh Data</Button>
                       </div>
                        </Row>
                        <hr />


                    </div>
                </CardBody>

            </Card>
        </Fragment>
    )
}

export default DataTableWithButtons
