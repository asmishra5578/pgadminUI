
import { Fragment, useState, forwardRef, useEffect } from 'react'
import UILoader from '@components/ui-loader'
// ** Table Data & Columns
import moment from "moment"
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'

import requestsApi from './request'
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
// import Datatablecomponent from '../../../../layouts/components/Datatablecomponent'
import Datatablecomponent from '../../../../../layouts/components/Datatablecomponent'

const requestsApidata = new requestsApi()

const Home = () => {
    const history = useHistory()
    const [getAllByMerchantRechargeList, setgetAllByMerchantRechargeList] = useState([])
    const [searchmerchantinputvalue, setsearchmerchantinputvalue] = useState('')
    const [GetpayoutIPresponse, setGetpayoutIPresponse] = useState([])
    // ** States transactiontypeSelect
    const [walletBalance, setwalletBalance] = useState('')
    const [mainwalletbalance, setmainwalletbalance] = useState('')
    const [showbalancedisplay, setshowbalancedisplay] = useState('none')
    const [open, setopen] = useState(false)
    const [Rechargemodal, setRechargemodal] = useState(false)
    const [availableBalance, setavailableBalance] = useState('')
    const [tableblock, settableblock] = useState(false)
    const [uiblocking, setuiblocking] = useState(false)
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
    const [selectrechargetypevalue, setselectrechargetypevalue] = useState('Select')
    const [allactivewalletlist, setallactivewalletlist] = useState([])
    const ipregex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    const columns = [
        {
            name: 'MerchantId',
            selector: 'merchantId',
            sortable: true,
            minWidth: '200px'
        },
        {
            name: 'Recharge ID',
            selector: 'rechargeId',
            sortable: true,
            minWidth: '250px'
        },
        {
            name: 'Amount',
            selector: 'amount',
            sortable: true,
            minWidth: '100px'
        },
        {
            name: 'Main Wallet ID',
            selector: 'mainWalletId',
            sortable: true
        },
        {
            name: 'Wallet ID',
            selector: 'walletId',
            sortable: true,
            minWidth: '100px'
        },
        {
            name: 'Bank Name',
            selector: 'bankName',
            sortable: true,
            minWidth: '100px'
        },
        {
            name: 'Reference Name',
            selector: 'referenceName',
            sortable: true,
            minWidth: '100px'
        },
        {
            name: 'Recharge Agent',
            selector: 'rechargeAgentName',
            sortable: true,
            minWidth: '100px'
        },
        {
            name: 'Commission',
            selector: 'commission',
            sortable: true,
            minWidth: '100px'
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
            minWidth: '100px'
        }
    ]
    const SignupSchema = yup.object().shape({
        amount: yup.string().required('Amount can not be empty').matches(/^[0-9]*$/, 'Amount is not valid formate'),
        utrid: yup.string().required('UTR ID can not be empty'),
        commission: yup.string().matches(/^[0-9]*$/, 'Commission is not valid formate'),
        referenceId: yup.string(),
        bankName: yup.string().required('Bank Name can not be empty').matches((/^([a-zA-Z]+\s)*[a-zA-Z]+$/), 'Bank name not valid'),
        referenceName: yup.string().required('Refrence Name can not be empty'),
        note1: yup.string(),
        note2: yup.string(),
        note3: yup.string()
        // rechargeAgent: yup.string().required('Recharge Agent can not be empty')
    })
    const { register, errors, handleSubmit, trigger, reset } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    const CloseBtn = <X className='cursor-pointer' size={15} onClick={() => { setopen(false) }} />
    const CloseRechargeBtn = <X className='cursor-pointer' size={15} onClick={() => { setRechargemodal(false) }} />
    const getAllByMerchantRecharge = () => {
        settableblock(true)
        requestsApidata.getAllByMerchantRecharge().then(res => {
            // if (res.data.successCode === "API_SUCCESS") {
            // console.log('getAllByMerchantRechargeList', getAllByMerchantRechargeList)
            setgetAllByMerchantRechargeList(res.data)
            settableblock(false)
            // setBlock(false)
            // } 
        })
    }
    useEffect(() => {
        // console.log(fromDate, toDate)
        requestsApidata.PayoutWalletlist().then(res => {
            if (res.data.successCode === "API_SUCCESS") {
                setpayoutwalletlst(res.data.extraData.walletlist)
                getAllByMerchantRecharge()
                const dummyactivewallet = res.data.extraData.walletlist.filter((m) => m.status === "ACTIVE")
                // console.log('dummyactivewallet', dummyactivewallet)
                setallactivewalletlist(dummyactivewallet)
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
    const updatedatahandler = () => {
        getAllByMerchantRecharge()
    }
    const countryOptions =
    allactivewalletlist.map((v) => {
            return { value: v.merchantid, label: `${v.merchantid} (${v.name}) ` }
        })
    const selectkycstatushandler = (e) => {
        console.log('selectkycstatushandler', e.value)
        setselectkycstatusvalue(e)
        // requestsApidata.getUserIp(e.value).then(res => {
        //     if (res.data.successCode === "API_SUCCESS") {
        //         setGetpayoutIPresponse([...new Set(res.data.extraData.payout)])
        //         setmerchantsearchbtndisabled(false)
        //         setlistIPdisplay('block')
        //         setdefaultCheckedsetvalue(false)
        //         // setupdateIPdisplay('none')
        //         console.log("sdsds", [...new Set(res.data.extraData.payout)])
        //     } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        //         toast.error('Session Expired Login again!')
        //         history.push('/')
        //     } else if (res.data.exception === "JWT_MISSING") {
        //         toast.error('Session Expired Login again!')
        //         history.push('/')
        //     } else if (res.data.exception === "MERCHANT_NOT_FOUND") {
        //         setmerchantsearchbtndisabled(false)
        //         toast.warning(res.data.msg[0])
        //         setGetpayoutIPresponse([])
        //         setlistIPdisplay('none')
        //     } else if (res.data.exception === "MERCHANT_INFORMATION_NOT_FOUND") {
        //         setmerchantsearchbtndisabled(false)
        //         toast.warning(res.data.msg[0])
        //         setGetpayoutIPresponse([])
        //         setlistIPdisplay('none')
        //     }
        // })
    }

    const onSubmit = (data) => {
        if (selectkycstatusvalue === 'Select') {
            toast.warning('Select Merchant ID')
            // console.log('data', data, data.commission === "")
        } else if (selectrechargetypevalue === "Select") {
            toast.warning('Select Recharge Type')
        } else {
            data.merchantId = selectkycstatusvalue.value
            data.rechargeType = selectrechargetypevalue.value
            console.log('data', data)
            if (data.commission === "") {
                data.commission = 0
            }
            requestsApidata.rechargeRequest(data).then(res => {
                console.log('res.data', res.data.status)
                if (res.data.status === "SUCCESS") {
                    // Swal.fire({text:'Recharge Successfully Done', icon:'success'})
                    Swal.fire({
                        title: 'Recharge Successfully Done',
                        // showDenyButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showCancelButton: true,
                        confirmButtonText: 'Check Balance'
                        // denyButtonText: 'OK'
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        reset()
                        if (result.isConfirmed) {
                            setopen(true)
                        } else if (result.isDenied) {
                        }
                    })
                } else if (res.data.status === "false") {
                    Swal.fire({ text: 'Fill all details', icon: 'warning' })

                } else if (res.data.status === "FAILED") {
                    Swal.fire({ text: 'Recharge failed for this merchant', icon: 'warning' })
                } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                    toast.error('Session Expired Login again!')
                    history.push('/')
                } else if (res.data.exception === "JWT_MISSING") {
                    toast.error('Session Expired Login again!')
                    history.push('/')
                }
            })
        }
    }
    const getMainWalletBalanceAPi = () => {
        requestsApidata.rechargeMainwalletBalance(selectkycstatusvalue.value).then((response) => {
            console.log("response", response.data)
            setmainwalletbalance(`Main Wallet Balance:${response.data.amount}`)
        })
    }
    const onBlurcheckmerchantbalancehandler = (e) => {
        console.log('onblur', selectkycstatusvalue.value)
        requestsApidata.merchantwalletBalancecheck(selectkycstatusvalue.value).then((res) => {
            console.log('res balance check', res.data)
            setwalletBalance(res.data.walletBalance)
            getMainWalletBalanceAPi()
            setshowbalancedisplay('block')
            if (res.data.status === "BLOCK") {
                toast.warning('Recharge can not proceed due to merchant is blocked')
            }
        })
    }

    const availableBalanceHandler = () => {
        // console.log('availableBalanceHandler', selectkycstatusvalue.value)
        setuiblocking(true)
        requestsApidata.merchantwalletBalancecheck(selectkycstatusvalue.value).then((res) => {
            console.log('res balance check as', res.data)
            getMainWalletBalanceAPi()
            setuiblocking(false)
            setavailableBalance(`Available Balance:${res.data.walletBalance}`)
        })
    }
    const rechargemodalHandler = () => {
        setRechargemodal(true)
    }
    const rechargetypeOptions = [
        { value: 'BANK TRANSFER', label: 'BANK TRANSFER' },
        { value: 'WALLET', label: 'WALLET' }
        // { value: 'Pending', label: 'Pending' }
    ]
    const selectrechargetypehandler = (e) => {
        console.log("e", e.value)
        setselectrechargetypevalue(e)
    }
    return (
        <Fragment>
            <br />
            <Card style={{ padding: 20 }}>
                <div>
                    {/* <h6>Wallet Recharge</h6> */}
                    <UILoader blocking={tableblock}>

                        <Datatablecomponent routename='Wallet Recharge List'
                            coloumnsprops={columns} data={getAllByMerchantRechargeList} isaddwalletrecharge
                            //  createwalletMoadl={createwalletMoadl}
                            handleModal={rechargemodalHandler}
                            //   isaddpayoutwalletlist  
                            getMainWalletBalance={mainwalletbalance}
                            refreshdata={updatedatahandler}

                        />
                    </UILoader>
                </div>
                <Modal
                    isOpen={open}
                    className='sidebar-sm'
                    modalClassName='modal-slide-in'
                    contentClassName='pt-0'
                >
                    <ModalHeader className='mb-3' close={CloseBtn} tag='div'>
                        <h5 className='modal-title'>Check Balance</h5>
                    </ModalHeader>
                    <ModalBody className='flex-grow-1'>
                        <CardTitle tag='h4'>Check merchant balance</CardTitle>
                        <UILoader blocking={uiblocking}>
                            <span style={{ color: 'green', fontWeight: 'bold' }}>{availableBalance}</span>
                            <br />  <span style={{ color: 'green', fontWeight: 'bold' }}>{mainwalletbalance}</span>

                        </UILoader>
                        <Button color='primary' style={{ marginTop: 10 }} onClick={availableBalanceHandler}>
                            Check Balance
                        </Button>
                    </ModalBody>
                </Modal>
                <Modal
                    isOpen={Rechargemodal}
                    className='sidebar-lg'
                    modalClassName='modal-slide-in'
                    contentClassName='pt-0'
                >
                    <ModalHeader className='mb-3' close={CloseRechargeBtn} tag='div'>
                        <h5 className='modal-title'>Recharge Wallet</h5>
                    </ModalHeader>
                    <ModalBody className='flex-grow-1'>
                        {/* <CardTitle tag='h4'>Check merchant balance</CardTitle> */}
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <FormGroup tag={Col} md='12'>
                                    <Label className='form-label' for={`kycStatus`}>
                                        Select Merchant<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
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
                                        onBlur={onBlurcheckmerchantbalancehandler}
                                    />
                                    <span style={{ fontWeight: 'bold', display: showbalancedisplay }} >{mainwalletbalance}</span>
                                    <span style={{ fontWeight: 'bold', display: showbalancedisplay }} >Available Balance:{walletBalance}</span>
                                </FormGroup>

                            </Row>
                            <Row>
                                <FormGroup tag={Col} md='6'>
                                    <Label className='form-label' for={`amount`}>
                                        Amount<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        name="amount"
                                        id="amount"
                                        placeholder='Amount'
                                        invalid={errors.amount && true}
                                        innerRef={register({ required: true })}
                                    />
                                    {errors && errors.amount && <FormFeedback>{errors.amount.message}</FormFeedback>}

                                </FormGroup>
                                <FormGroup tag={Col} md='6'>
                                    <Label className='form-label' for={`utrid`}>
                                        UTR Id<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        name="utrid"
                                        id="utrid"
                                        placeholder='UTR Id'
                                        invalid={errors.utrid && true}
                                        innerRef={register({ required: true })}
                                    />
                                    {errors && errors.utrid && <FormFeedback>{errors.utrid.message}</FormFeedback>}

                                </FormGroup>

                            </Row>
                            <Row>
                                <FormGroup tag={Col} md='6'>
                                    <Label className='form-label' for={`commission`}>
                                        Commission(*Do not enter in percentage)
                                    </Label>
                                    <Input
                                        name={`commission`}
                                        id={`commission`}
                                        placeholder='commission'
                                        innerRef={register({ required: true })}
                                        invalid={errors.commission && true}
                                    />
                                    {errors && errors.commission && <FormFeedback>{errors.commission.message}</FormFeedback>}

                                </FormGroup>
                                <FormGroup tag={Col} md='6'>
                                    <Label className='form-label' for={`referenceName`}>
                                        Refrence/Group Name<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                                    </Label>
                                    <Input
                                        name={`referenceName`}
                                        id={`referenceName`}
                                        placeholder='Refrence Name'
                                        innerRef={register({ required: true })}
                                        invalid={errors.referenceName && true}
                                    />
                                    {errors && errors.referenceName && <FormFeedback>{errors.referenceName.message}</FormFeedback>}

                                </FormGroup>

                            </Row>
                            <Row>
                                <FormGroup tag={Col} md='6'>
                                    <Label className='form-label' for={`referenceId`}>
                                        Reference ID
                                    </Label>
                                    <Input
                                        type='text'
                                        name={`referenceId`}
                                        id={`referenceId`}
                                        placeholder='Reference ID'
                                        innerRef={register({ required: true })}
                                        invalid={errors.referenceId && true}
                                    />
                                    {errors && errors.referenceId && <FormFeedback>{errors.referenceId.message}</FormFeedback>}

                                </FormGroup>
                                <FormGroup tag={Col} md='6'>
                                    <Label className='form-label' for={`bankName`}>
                                        Bank Name<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        name={`bankName`}
                                        id={`bankName`}
                                        placeholder='Bank Name'
                                        innerRef={register({ required: true })}
                                        invalid={errors.bankName && true}
                                    />
                                    {errors && errors.bankName && <FormFeedback>{errors.bankName.message}</FormFeedback>}

                                </FormGroup>
                                <FormGroup tag={Col} md='6'>
                                <Label className='form-label' for={`kycStatus`}>
                                    Recharge Type
                                </Label>
                                <Select
                                    // theme={selectThemeColors}
                                    isClearable={false}
                                    id='rechargetype'
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={rechargetypeOptions}
                                    defaultValue={rechargetypeOptions[0]}
                                    onChange={selectrechargetypehandler}
                                    value={selectrechargetypevalue}
                                />
                                </FormGroup>
                            
                                <FormGroup tag={Col} md='6'>
                                    <Label className='form-label' for={`note1`}>
                                        Note1
                                    </Label>
                                    <Input
                                        name={`note1`}
                                        id={`note1`}
                                        placeholder='Note1'
                                        innerRef={register({ required: true })}
                                        invalid={errors.note1 && true}
                                    />
                                    {errors && errors.note1 && <FormFeedback>{errors.note1.message}</FormFeedback>}

                                </FormGroup>
                                <FormGroup tag={Col} md='6'>
                                    <Label className='form-label' for={`note2`}>
                                        Note2
                                    </Label>
                                    <Input
                                        name={`note2`}
                                        id={`note2`}
                                        placeholder='Note2'
                                        innerRef={register({ required: true })}
                                        invalid={errors.note2 && true}
                                    />
                                    {errors && errors.note2 && <FormFeedback>{errors.note2.message}</FormFeedback>}

                                </FormGroup>
                                <FormGroup tag={Col} md='6'>
                                    <Label className='form-label' for={`note3`}>
                                        Note3
                                    </Label>
                                    <Input
                                        name={`note3`}
                                        id={`note3`}
                                        placeholder='Note3'
                                        innerRef={register({ required: true })}
                                        invalid={errors.note3 && true}
                                    />
                                    {errors && errors.note3 && <FormFeedback>{errors.note3.message}</FormFeedback>}

                                </FormGroup>
                                {/* <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`kycStatus`}>
            Main Wallet Id
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

          </FormGroup> */}
                            </Row>

                            <div className='d-flex justify-content-between'>
                                {/* <Button.Ripple color='secondary' className='btn-prev' outline disabled>
            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button.Ripple> */}
                                <Button.Ripple type='submit' color='primary' className='btn-next'>
                                    <span className='align-middle d-sm-inline-block d-none'>Submit</span>
                                    {/* <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight> */}
                                </Button.Ripple>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
                <div>

                </div>
            </Card>
        </Fragment>
    )
}

export default Home