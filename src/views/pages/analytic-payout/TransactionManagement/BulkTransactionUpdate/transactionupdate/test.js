
import { Fragment, useState, forwardRef, useEffect } from 'react'
import UILoader from '@components/ui-loader'
// ** Table Data & Columns
import moment from "moment"
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'

import requestsApi from '../request'
// ** Add New Modal Component
// import AddNewModal from '../../../tables/data-tables/basic/AddNewModal'

// ** Third Party Components 
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css"
import { Plus, Trash2, X } from 'react-feather'
import {
    Card,
    Button,
    Input,
    Label,
    Row,
    Col, FormGroup, Badge, Form, FormFeedback, Modal, ModalHeader, ModalBody, CardTitle
} from 'reactstrap'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2'
import DataTableWithButtons from '../../../../../../layouts/components/Datatablecomponent'
import Payoutupitansfer from './updateModal'


const requestsApidata = new requestsApi()

const Home = () => {
    const history = useHistory()
    const [searchmerchantinputvalue, setsearchmerchantinputvalue] = useState('')
    const [GetpayoutIPresponse, setGetpayoutIPresponse] = useState([])
    const [allbulktransactionData, setallbulktransactionData] = useState([])
    const [tableblock, settableblock] = useState(true)
    const [open, setopen] = useState(false)
    const [successresponseModal, setsuccessresponseModal] = useState(false)
    const [successresponseData, setsuccessresponseData] = useState([])
    const [submitbtndisabled, setsubmitbtndisabled] = useState(true)
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
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={() => { setopen(false) }} />
    const CloseresponseBtn = <X className='cursor-pointer' size={15} onClick={() => { setsuccessresponseModal(false) }} />
    const ipregex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    const [commentsvalue, setcommentsvalue] = useState('')
    const [orderidsvalue, setorderidsvalue] = useState('')
    const commacountregex = /^([^,]*,){0,99}[^,]*$/
    const responsecolumn = [
        { name: 'Order Id', selector: 'orderIds', minWidth: '200px' },
        { name: 'Status', selector: 'status' },
        { name: 'Comment', selector: 'comment', minWidth: '600px' }
    ]
    const columns = [
        {
            name: 'Order Ids',
            selector: 'orderIds',
            sortable: true,
            minWidth: '400px'
        },
        {
            name: 'Total Count',
            selector: 'count',
            sortable: true,
            minWidth: '10px'
        },
        {
            name: 'Success Count',
            selector: 'sucessCount',
            sortable: true,
            minWidth: '10px'
            // cell: row => <span>{row.count - row.failCount}</span>
        },
        {
            name: 'Fail Count',
            selector: 'failCount',
            sortable: true,
            minWidth: '10px'
        },
        {
            name: 'Comment',
            selector: 'comment',
            sortable: true
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
            minWidth: '100px'
        }
    ]
    const SignupSchema = yup.object().shape({
        orderIds: yup.string().required('Order ID can not be empty'),
        comment: yup.string().required('Comment can not be empty')
        // rechargeAgent: yup.string().required('Recharge Agent can not be empty')
    })
    const { register, errors, handleSubmit, trigger, reset } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })


    const countryOptions = [
        { value: 'SUCCESS', label: 'SUCCESS' },
        { value: 'FAILED', label: 'FAILED' },
        { value: 'PENDING', label: 'PENDING' }
    ]
    const selectkycstatushandler = (e) => {
        setselectkycstatusvalue(e)
    }
    useEffect(() => { 
        // console.log(fromDate, toDate)
        requestsApidata.getallTransactionChangeRequestPayout().then(res => {
            if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else {
                settableblock(false)
                setallbulktransactionData(res.data)
            }
        })
    }, [])
    const updatedatahandler = () => {
        settableblock(true)
        requestsApidata.getallTransactionChangeRequestPayout().then(res => {
            if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else {
                settableblock(false)
                setallbulktransactionData(res.data)
            }
        })
    }
    const onSubmit = (data) => {
        if (selectkycstatusvalue === 'Select') {
            toast.warning('Select Status')
        } else if (orderidsvalue === "") {
            toast.warning('Order ids can not be empty')
        } else if (commentsvalue === "") {
            toast.warning('Comment can not be empty')
        } else if (!commacountregex.test(data.orderIds)) {
            //  console.log('comma check')
            toast.warning('Maximum 100 order id is required')
        } else {
            setsubmitbtndisabled(true)
            // data.status = selectkycstatusvalue.value
            const setendDate = {
                orderIds: orderidsvalue,
                comment: commentsvalue,
                status: selectkycstatusvalue.value
            }
            console.log('data', setendDate)
            requestsApidata.updateTransactionStatus(setendDate).then(res => {
                console.log('res.data', res.data.status)
                setsubmitbtndisabled(false)

                if (res.data.status === selectkycstatusvalue.value) {
                    if (res.data.transactionChangeResponceList.length === 0) {
                        Swal.fire({ text: 'Order ID`s not found in the system', icon: 'warning', allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false })
                    } else {
                        setsuccessresponseData(res.data.transactionChangeResponceList)
                        setsuccessresponseModal(true)
                        setorderidsvalue('')
                        setcommentsvalue('')
                        setselectkycstatusvalue('Select')
                        // Swal.fire({ text: 'Transaction Update Successfully', 
                        // allowOutsideClick:false, 
                        // allowEscapeKey:false, 
                        // allowEnterKey:false, 
                        // icon: 'success', 
                        // html:<div>
                        //     {res.data.transactionChangeResponceList.map((v) => {
                        //         return <div>
                        //             <p>Order IDs:{v.orderIds}, comment:{v.comment}, status:{v.status}</p>
                        //         </div>
                        //     })}
                        // </div> }).then(() => {
                        //     setselectkycstatusvalue('Select')
                        //     reset()
                        // })
                    }
                } else if (res.data.status === "false") {
                    Swal.fire({ text: 'Server error', icon: 'warning' })

                }
            })
        }
    }
    const bulkuploadmodalhandler = () => {
        setopen(true)
    }
    const closeresponsemodelHandler = () => {
        setsuccessresponseModal(false)
        setselectkycstatusvalue('Select')
        reset()
    }
    const commentHandler = (e) => {
        setcommentsvalue(e.target.value)
    }
    const orderidsvalueHandler = (e) => {
        setorderidsvalue((e.target.value).trim())
        setsubmitbtndisabled(false)
        // const regex = /^[0-9,]+$/
        // if (regex.test(e.target.value)) {
        //     setorderidsvalue((e.target.value).trim())
        //     setsubmitbtndisabled(false)
        // } else {
        // }
    }
    return (
        <Fragment>
            <br />
            <Card style={{ padding: 20 }}>
                <div>
                    <UILoader blocking={tableblock}>

                        <DataTableWithButtons routename='Update Transaction Status'
                            coloumnsprops={columns} data={allbulktransactionData}
                            //  createwalletMoadl={createwalletMoadl}
                            handleModal={bulkuploadmodalhandler}
                            //   isaddpayoutwalletlist  
                            // getMainWalletBalance={getMainWalletBalance} 
                            refreshdata={updatedatahandler}
                            // isaddrefresh
                            isbulkuploadstatus
                        />
                    </UILoader>
                </div>
      <Payoutupitansfer displayUPIloading={displayUPIloading} open={upimodal} upihandlerModal={upihandlerModal} parentaccounttra={upitransferparent} disabledupitransbtn={disabledupitransbtn} />

                <Modal
                    isOpen={successresponseModal}
                    className='modal-dialog modal-dialog-centered modal-lg'
                    style={{ maxWidth: '700px', width: '100%' }}
                >
                    <ModalHeader className='mb-3' close={CloseresponseBtn} tag='div'>
                        <h5 className='modal-title'>Bulk Transaction Update Status</h5>
                    </ModalHeader>
                    <ModalBody className='flex-grow-1'>
                        {/* {successresponseData.map((v) => { */}
                        <DataTableWithButtons routename="Status Updation Details"
                            coloumnsprops={responsecolumn} data={successresponseData} />

                        {/* <p>Order ID:{v.orderIds}, <span style={{ fontWeight: 'bold' }}>Status:<span style={{ color: v.status === "SUCCESS" ? 'green' : 'red' }}>{v.status}</span></span>, comment:{v.comment}</p> */}

                        <Button.Ripple color='primary' className='btn-next' onClick={closeresponsemodelHandler}>
                            <span className='align-middle d-sm-inline-block d-none'>Close</span>
                        </Button.Ripple>
                        {/* <Button.Ripple style={{ marginLeft: '20px' }} color='primary' className='btn-next'>
                            <span className='align-middle d-sm-inline-block d-none'>Submit</span>
                        </Button.Ripple> */}
                    </ModalBody>
                </Modal>
                <Modal
                    isOpen={open}
                    className='sidebar-lg'
                    modalClassName='modal-slide-in'
                    contentClassName='pt-0'
                >
                    <ModalHeader className='mb-3' close={CloseBtn} tag='div'>
                        <h5 className='modal-title'> Update Transaction Status</h5>
                    </ModalHeader>
                    <ModalBody className='flex-grow-1'>
                        {/* <CardTitle tag='h4'>Check merchant balance</CardTitle> */}

                        <Row>
                            <FormGroup tag={Col} md='12'>
                                <Label className='form-label' for={`kycStatus`}>
                                    Select Status<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
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
                        </Row>
                        {/* <Row>
                                <FormGroup tag={Col} md='12'>
                                    <Label className='form-label' for={`rechargeAgent`}>
                                        Recharge Agent<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                                    </Label>
                                    <Input
                                        name={`rechargeAgent`}
                                        id={`rechargeAgent`}
                                        placeholder='Recharge Agent'
                                        innerRef={register({ required: true })}
                                        invalid={errors.rechargeAgent && true}
                                    />
                                    {errors && errors.rechargeAgent && <FormFeedback>{errors.rechargeAgent.message}</FormFeedback>}
                                </FormGroup>

                            </Row> */}
                        <Row>
                            <FormGroup tag={Col} md='12'>
                                <Label className='form-label' for={`comment`}>
                                    Comments<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                                </Label>
                                <Input type='textarea' rows='2' id='comment'
                                    name={`comment`}
                                    placeholder='Comment'
                                    // innerRef={register({ required: true })}
                                    // invalid={errors.comment && true}
                                    onChange={commentHandler}
                                    value={commentsvalue}
                                />

                                {/* {errors && errors.comment && <FormFeedback>{errors.comment.message}</FormFeedback>} */}

                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup tag={Col} md='12'>
                                <Label className='form-label' for={`orderIds`}>
                                    Order ID's seperate by comma(Maximum ids 100)<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                                </Label>
                                <Input type='textarea' rows='2' id='orderIds'
                                    name={`orderIds`}
                                    placeholder='Max 100 Order IDs you entered'
                                    // innerRef={register({ required: true })}
                                    // invalid={errors.orderIds && true}
                                    onChange={orderidsvalueHandler}
                                    value={orderidsvalue}
                                />

                                {/* {errors && errors.orderIds && <FormFeedback>{errors.orderIds.message}</FormFeedback>} */}

                            </FormGroup>
                        </Row>

                        <div className='d-flex justify-content-between'>

                            <Button.Ripple disabled={submitbtndisabled} color='primary' className='btn-next' onClick={onSubmit}>
                                <span className='align-middle d-sm-inline-block d-none'>Submit</span>
                            </Button.Ripple>
                        </div>
                    </ModalBody>
                </Modal>
                <div>

                </div>
            </Card>
        </Fragment>
    )
}

export default Home