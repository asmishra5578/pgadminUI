
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
import Datatablecomponent from '../../../../layouts/components/Datatablecomponent'

import { ChevronDown, Share, Printer, FileText, File, Grid, X, Copy, RefreshCw, RotateCw, Plus } from 'react-feather'
import {
    FormGroup,
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
    Modal,
    ModalHeader,
    ModalBody,
    Badge
} from 'reactstrap'
import { addDays } from "date-fns"
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import MainwalletRecharge from './mainwalletrecharge'
import Wallerreversal from './wallerReversal'
import Walletrefund from './walletrefund'

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

    // ** States transactiontypeSelect
    const [modal, setModal] = useState(false)
    const [rechargeModal, setrechargeModal] = useState(false)
    const [Mainwalletrechargemodal, setMainwalletrechargemodal] = useState(false)
    const [walletrefundModal, setwalletrefundModal] = useState(false)
    const [walletReversaldModal, setwalletReversaldModal] = useState(false)

    const handleModal = () => setModal(!modal)
    const rechargehandleModal = () => setrechargeModal(!rechargeModal)
    const MainwalletrechargemodalhandleModal = () => setMainwalletrechargemodal(!Mainwalletrechargemodal)
    const walletrefundModalHandlermodal = () => setwalletrefundModal(!walletrefundModal)
    const walletReversaldModalHandlemodal = () => setwalletReversaldModal(!walletReversaldModal)

    const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
    const rechargeCloseBtn = <X className='cursor-pointer' size={15} onClick={rechargehandleModal} />

    const [WRamountvalue, setWRamountvalue] = useState("Select")
    const [transactiontypeSelect, settransactiontypeSelect] = useState("Select")
    const [getMainWalletBalance, setgetMainWalletBalance] = useState('')
    const [WCnamevalue, setWCnamevalue] = useState('')
    const [WCmerchantidvalue, setWCmerchantidvalue] = useState('')
    const [WCamountvalue, setWCamountvalue] = useState('')
    const [mainwalletrechargebtndisabled, setmainwalletrechargebtndisabled] = useState(false)
    const [reversalbtndisabed, setreversalbtndisabed] = useState(false)
    const [refundbtndisabled, setrefundbtndisabled] = useState(false)
    const [walletcretionbtndisabled, setwalletcretionbtndisabled] = useState(false)

    const [WRpurposevalue, setWRpurposevalue] = useState('')
    const [WRremarkValue, setWRremarkValue] = useState('')
    const [WRreferencevalue, setWRreferencevalue] = useState('')
    const [walletREchargebtndisabled, setwalletREchargebtndisabled] = useState(false)
    const [openmodalmerchntID, setopenmodalmerchntID] = useState('')
    const [searchEndDate, setsearchEndDate] = useState('')
    const [block, setBlock] = useState(true)
    const [data, setdata] = useState([])
    const [getmainwalletIDvalue, setgetmainwalletIDvalue] = useState('')
    const [mainwalletlistdata, setmainwalletlistdata] = useState([])
    const [selectmainwalltetValue, setselectmainwalltetValue] = useState('Select')
    const fromDate = moment().subtract(7, "days").format("DD-MM-YYYY")
    const toDate = moment().format("DD-MM-YYYY")
    const resetmainwalletrechBtn = () => {
        setselectmainwalltetValue('Select')
        setgetMainWalletBalance('')
    }
    const openRechargemodalHandler = (e) => {
        setrechargeModal(true)
        setopenmodalmerchntID(e.target.id)
    }
    const oprnmodalwalletreversalhandler = (e) => {
        console.log('oprnmodalwalletreversalhandler', e.target.id)
        setopenmodalmerchntID(e.target.id)
        setwalletReversaldModal(true)
    }
    const openmodalwalletrefundhandler = (e) => {
        console.log('openmodalwalletrefundhandler', e.target.id)
        setopenmodalmerchntID(e.target.id)
        setwalletrefundModal(true)
    }

    const selectmainwalletHandler = (e) => {
        setselectmainwalltetValue(e)
        requestsApidata.getMainWalletBalance(e.value).then(response => {
            console.log('getMainWalletBalance', response.data)
            setgetMainWalletBalance(response.data.amount)
        })
    }
    const getallrefreshdata = () => {
        requestsApidata.PayoutWalletlist().then(res => {
            if (res.data.successCode === "API_SUCCESS") {
                setdata(res.data.extraData.walletlist)
                setBlock(false)
                requestsApidata.getMainWalletList().then(respo => {
                    console.log("getMainWalletList", respo.data)
                    setmainwalletlistdata(respo.data)
                    setgetmainwalletIDvalue(respo.data[0].walletid)
                    // requestsApidata.getMainWalletBalance(respo.data[0].walletid).then(response => {
                    //     console.log('getMainWalletBalance', response.data)
                    //     setgetMainWalletBalance(response.data.amount)
                    // })
                })
            } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                toast.error('Session Expired Login again!')
                history.push('/')
            } else if (res.data.exception === "JWT_MISSING") {
                toast.error('Session Expired Login again!')
                history.push('/')
            }
        })
    }
    const selectmainwalletoptions =
        mainwalletlistdata.map((v) => {
            return { value: v.walletid, label: `${v.walletid} (${v.name}) ` }
        })
    const updatedatahandler = () => {
        setBlock(true)
        getallrefreshdata()
    }
    const activeblockwallethandler = (e) => {
        console.log('eeeeee', JSON.parse(e.target.id))
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                requestsApidata.walletUpdate(JSON.parse(e.target.id).merchantid, JSON.parse(e.target.id).walletCallBackAPI, JSON.parse(e.target.id).status === "ACTIVE" ? "BLOCK" : "ACTIVE").then((res) => {
                    console.log('update status', res.data)
                    if (res.data.walletStatus === "BLOCK") {
                        toast.success('Wallet Blocked Successfully')
                        // Swal.fire('Wallet Blocked Successfully', '', 'success')
                        updatedatahandler()
                    } else if (res.data.walletStatus === "ACTIVE") {
                        toast.success('Wallet Active Successfully')
                        // Swal.fire('Wallet Active Successfully', '', 'success')

                        updatedatahandler()
                    }
                })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    const columns = [
        {
            name: 'MerchantId',
            selector: 'merchantid',
            sortable: true,
            minWidth: '200px'
        },
        {
            name: 'Wallet Name',
            selector: 'name',
            sortable: true,
            minWidth: '250px'
        },
        {
            name: 'Amount',
            selector: 'amount',
            sortable: true
        },
        {
            name: 'Main Wallet Id',
            selector: 'mainWalletid',
            sortable: true,
            minWidth: '200px'
        },

        {
            name: 'Status',
            selector: 'status',
            sortable: true,
            minWidth: '100px'
        },
        {
            name: 'Created At',
            // selector: 'createdAt',
            sortable: true,
            minWidth: '250px',
            cell: row => <span>{moment(row.created).format('DD-MM-YYYY')}</span>
        },
        {
            name: 'Action',
            // selector: 'createdAt',
            sortable: true,
            minWidth: '350px',
            cell: row => <span style={{ display: 'inline-block' }}>
                <Badge id={row.merchantid} onClick={openRechargemodalHandler}
                    style={{ cursor: 'pointer' }} color="primary">Recharge</Badge>
                <Badge style={{ marginLeft: 10, cursor: 'pointer' }}
                    id={row.merchantid} onClick={oprnmodalwalletreversalhandler}
                    color="warning">Reversal</Badge>
                <Badge style={{ marginLeft: 10, cursor: 'pointer' }}
                    id={row.merchantid} onClick={openmodalwalletrefundhandler}
                    color="success">Refund</Badge>
                <Badge style={{ marginLeft: 10, cursor: 'pointer' }} id={JSON.stringify(row)} onClick={activeblockwallethandler}
                    color={row.status === "ACTIVE" ? "danger" : "success"}
                >{row.status === "ACTIVE" ? "BLOCK" : "ACTIVE"}</Badge>
            </span>
        }
    ]


    useEffect(() => {
        // console.log(fromDate, toDate)
        getallrefreshdata()
    }, [])
    const WCresetHandler = () => {
        setWCnamevalue('')
        setWCmerchantidvalue('')
        setWCamountvalue('')
    }


    // ** Function to handle filter
    const searchalldataHandler = (e) => {
        console.log("e.target.value", e.target.value.length)
        setSearchValue(e.target.value)
        if (e.target.value.length) {
            const updatedData = data.filter(item => {
                const startsWith =
                    item.name.startsWith(e.target.value) ||
                    item.merchantid.startsWith(e.target.value) ||
                    item.amount.startsWith(e.target.value) ||
                    item.mainWalletid.startsWith(e.target.value)
                // item.status.startsWith(e.target.value) ||
                // item.emailId.startsWith(e.target.value) ||
                // item.paymentOption.startsWith(e.target.value) ||
                // item.orderID.startsWith(e.target.value) ||
                // item.pgId.startsWith(e.target.value)
                //   ||
                //   item.amount.startsWith(e.target.value) 

                const includes =
                    item.name.includes(e.target.value) ||
                    item.merchantid.includes(e.target.value) ||
                    item.amount.includes(e.target.value) ||
                    item.mainWalletid.includes(e.target.value)
                // item.status.includes(e.target.value) ||
                // item.emailId.includes(e.target.value) ||
                // item.paymentOption.includes(e.target.value) ||
                // item.orderID.includes(e.target.value) ||
                // item.pgId.includes(e.target.value)
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
            updatedatahandler()
        }
    }
    // ** Function to handle Pagination
    const createwalletMoadl = () => {
        handleModal()
    }
    const walletTransfermodal = () => {
        walletrefundModalHandlermodal()
    }
    const WCnamehandler = (e) => {
        setWCnamevalue(e.target.value)
    }
    const WCmerchantidhandler = (e) => {
        setWCmerchantidvalue(e.target.value)
    }
    const WCamounthandler = (e) => {
        setWCamountvalue(e.target.value)
    }

    const WRamountHandler = (e) => {
        setWRamountvalue(e.target.value)
    }
    const transactiontypeoptions = [{ value: 'BANK TRANSFER', label: "BANK TRANSFER" }]
    const transactiontypeSelectHandler = e => {
        settransactiontypeSelect(e)
    }
    const WRpurposeHandler = (e) => {
        setWRpurposevalue(e.target.value)
    }
    const WRremarkHandler = (e) => {
        setWRremarkValue(e.target.value)
    }
    const WRreferenceIDhandler = (e) => {
        setWRreferencevalue(e.target.value)
    }
    const walletcreationHandler = () => {
        if (WCnamevalue === "") {
            toast.warning('Name can not be empty')
        } else if (WCmerchantidvalue === "") {
            toast.warning('Merchant ID can not be empty')
        } else if (WCamountvalue === "") {
            toast.warning('Amount can not be empty')
        } else {
            setwalletcretionbtndisabled(true)
            requestsApidata.WalletCreation(WCmerchantidvalue, WCnamevalue, WCamountvalue).then(res => {
                if (res.data.responseStatus === "SUCCESS") {
                    toast.success('Wallet Created Successfully')
                    setwalletcretionbtndisabled(false)
                    handleModal()
                } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                    toast.error('Session Expired Login again!')
                    history.push('/')
                } else if (res.data.exception === "JWT_MISSING") {
                    toast.error('Session Expired Login again!')
                    history.push('/')
                } else if (res.data.exception === "FATAL_EXCEPTION") {
                    toast.error(res.data.msg[0])
                    setwalletcretionbtndisabled(false)
                } else if (res.data.exception === "MERCHANT_NOT_FOUND") {
                    toast.error(res.data.msg[0])
                    setwalletcretionbtndisabled(false)
                } else {
                    toast.error(res.data.msg[0])
                    setwalletcretionbtndisabled(false)
                }
            })
        }
    }
    const resetformwalletrecharge = () => {
        setWRamountvalue('')
        setWRpurposevalue('')
        setWRremarkValue('')
        setWRreferencevalue('')
    }
    const walletrechargeHandler = () => {
        console.log('okkk', openmodalmerchntID, WRamountvalue,
            transactiontypeSelect, WRpurposevalue,
            WRremarkValue,
            WRreferencevalue)

        if (WRamountvalue === "") {
            toast.warning('Amount can not be empty')
        } else {
            setwalletREchargebtndisabled(true)
            requestsApidata.WalletRecharge(openmodalmerchntID, WRamountvalue,
                "BANK TRANSFER", WRpurposevalue,
                WRremarkValue,
                WRreferencevalue).then(res => {
                    if (res.data.status === "SUCCESS") {
                        setwalletREchargebtndisabled(false)
                        setrechargeModal(false)
                        Swal.fire('Recharge Successfully Done')
                    } else if (res.data.status === "FAILED") {
                        setwalletREchargebtndisabled(false)
                        setrechargeModal(false)
                        Swal.fire({ title: 'Transaction Failed', text: res.data.remark, icon: 'warning' })
                    } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                        toast.error('Session Expired Login again!')
                        history.push('/')
                    } else if (res.data.exception === "JWT_MISSING") {
                        toast.error('Session Expired Login again!')
                        history.push('/')
                    } else if (res.data.exception === "FATAL_EXCEPTION") {
                        toast.error(res.data.msg[0])
                        setwalletREchargebtndisabled(false)
                    } else if (res.data.exception === "MERCHANT_NOT_FOUND") {
                        toast.error(res.data.msg[0])
                        setwalletREchargebtndisabled(false)
                    } else {
                        toast.error(res.data.msg[0])
                        setwalletREchargebtndisabled(false)
                    }
                })
        }
    }
    const submitMainwalletrecharge = (data) => {
        console.log('submitMainwalletrecharge', data)
        if (selectmainwalltetValue === "Select") {
            toast.warning('Select Main Wallet Id')
        } else {
            setmainwalletrechargebtndisabled(true)
            requestsApidata.mainWalletRecharge(selectmainwalltetValue.value, data.amount, data.transactionType, data.purpose, data.remarks).then((res) => {
                // console.log("dsdsdsa", res.data)
                setmainwalletrechargebtndisabled(false)

                if (res.data.status === "SUCCESS") {
                    toast.success('Recharge Successfully Done')
                    MainwalletrechargemodalhandleModal()
                } else {
                    toast.warning(res.data.msg[0])
                }
            })
        }
    }
    const SubmitwalletreversalHandler = (data) => {
        console.log('SubmitwalletreversalHandler', data)
        setreversalbtndisabed(true)
        requestsApidata.walletReversal(openmodalmerchntID, data.Amount, data.transactionType, data.purpose, data.remarks, data.referenceId).then((res) => {
            setreversalbtndisabed(false)
            if (res.data.status === "SUCCESS") {
                toast.success('Reversal Successfully Done')
                walletReversaldModalHandlemodal()
            } else if (res.data.status === "FAILED") {
                // setwalletREchargebtndisabled(false)
                walletReversaldModalHandlemodal()
                Swal.fire({ title: 'Transaction Failed', text: res.data.remark, icon: 'warning' })
            } else {
                toast.warning(res.data.msg[0])
            }
        })
    }
    const submitwalletrefunfHandler = (data) => {
        console.log('submitwalletrefunfHandler', data)
        setrefundbtndisabled(true)
        requestsApidata.walletRefund(openmodalmerchntID, data.Amount, data.transactionType, data.purpose, data.remarks).then((res) => {
            setrefundbtndisabled(false)
            if (res.data.status === "SUCCESS") {
                toast.success('Refund Successfully Done')
                walletrefundModalHandlermodal()
                // toast.success('Reversal Successfully Done')
            } else {
                toast.warning(res.data.msg[0])
            }
        })
    }
    return (
        <Fragment>
            {/* <h6>Search by date or search by merchantID and Status</h6> */}
            <br />

            <div>
                <UILoader blocking={block}>

                    <Datatablecomponent routename='Payout Wallet List' coloumnsprops={columns} data={data} createwalletMoadl={createwalletMoadl}
                        handleModal={MainwalletrechargemodalhandleModal} isaddpayoutwalletlist getMainWalletBalance={getMainWalletBalance} refreshdata={updatedatahandler}
                        isaddfilter
                        searchValue={searchValue} searchFilter={searchalldataHandler}
                    />
                </UILoader>
            </div>
            <MainwalletRecharge open={Mainwalletrechargemodal} handleModal={MainwalletrechargemodalhandleModal} parentCallback={submitMainwalletrecharge}
                selectmainwalletoptions={selectmainwalletoptions}
                selectmainwalletHandler={selectmainwalletHandler}
                selectmainwalltetValue={selectmainwalltetValue}
                getMainWalletBalance={getMainWalletBalance}
                resetmainwalletrechBtn={resetmainwalletrechBtn}
            />
            <Wallerreversal open={walletReversaldModal} handleModal={walletReversaldModalHandlemodal} parentCallback={SubmitwalletreversalHandler} disabledbtns={reversalbtndisabed} />
            <Walletrefund open={walletrefundModal} handleModal={walletrefundModalHandlermodal} parentCallback={submitwalletrefunfHandler} disabledbtns={refundbtndisabled} />

            <Modal
                isOpen={modal}
                toggle={handleModal}
                className='sidebar-sm'
                modalClassName='modal-slide-in'
                contentClassName='pt-0'
            >
                <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
                    <h5 className='modal-title'>New Record</h5>
                </ModalHeader>
                <ModalBody className='flex-grow-1'>
                    <CardTitle tag='h4'>Create Wallet</CardTitle>

                    <FormGroup>
                        <Label for='name'>Name</Label>
                        <Input
                            type='text'
                            name='name'
                            id='name'
                            placeholder='Name'
                            onChange={WCnamehandler}
                            value={WCnamevalue}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='merchantid'>Merchant ID</Label>
                        <Input
                            type='number'
                            name='merchantid'
                            id='merchantid'
                            placeholder='Merchant ID'
                            onChange={WCmerchantidhandler}
                            value={WCmerchantidvalue}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='amount'>Amount</Label>
                        <Input
                            type='number'
                            name='amount'
                            id='amount'
                            placeholder='Amount'
                            onChange={WCamounthandler}
                            value={WCamountvalue}
                        />
                    </FormGroup>
                    <FormGroup className='d-flex mb-0'>
                        <Button.Ripple className='mr-1' color='primary' type='submit' disabled={walletcretionbtndisabled} onClick={walletcreationHandler}>
                            Submit
                        </Button.Ripple>
                        <Button.Ripple outline color='secondary' type='reset' onClick={WCresetHandler}>
                            <RotateCw size={10} />
                        </Button.Ripple>
                    </FormGroup>

                </ModalBody>
            </Modal>

            <Modal
                isOpen={rechargeModal}
                toggle={rechargehandleModal}
            // className=''
            // modalClassName='modal-slide-in'
            // contentClassName='pt-0'
            >
                <ModalHeader className='mb-0' toggle={rechargehandleModal} close={rechargeCloseBtn} tag='div'>
                    <h5 className='modal-title'>Recharge Wallet</h5>
                </ModalHeader>
                <ModalBody>
                    {/* <CardTitle tag='h4'>Recharge Wallet</CardTitle> */}
                    <FormGroup>
                        <Label for='WRamount'>Amount<span style={{ color: 'red', fontWeight: 'bold' }}>*</span></Label>
                        <Input
                            type='number'
                            name='WRamount'
                            id='WRamount'
                            placeholder='Amount'
                            onChange={WRamountHandler}
                            value={WRamountvalue}
                        />
                    </FormGroup>
                    {/* <div style={{}}>
                        <Label for='select-basic'>Transaction Type</Label>
                        <Select
                            className='react-select'
                            classNamePrefix='select'
                            name='transactionType'
                            id='transactionType'
                            options={transactiontypeoptions}
                            value={transactiontypeSelect}
                            onChange={transactiontypeSelectHandler}
                        />
                    </div> */}
                    <FormGroup>
                        <Label for='WRpurpose'>Purpose</Label>
                        <Input
                            type='text'
                            name='WRpurpose'
                            id='WRpurpose'
                            placeholder='Purpose'
                            onChange={WRpurposeHandler}
                            value={WRpurposevalue}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='WRremark'>Remark</Label>
                        <Input
                            type='text'
                            name='WRremark'
                            id='WRremark'
                            placeholder='Remark'
                            onChange={WRremarkHandler}
                            value={WRremarkValue}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='Reference'>Reference ID</Label>
                        <Input
                            type='text'
                            name='Reference'
                            id='Reference'
                            placeholder='Reference ID'
                            onChange={WRreferenceIDhandler}
                            value={WRreferencevalue}
                        />
                    </FormGroup>
                    <FormGroup className='d-flex mb-0'>
                        <Button.Ripple className='mr-1' color='primary' type='submit' disabled={walletREchargebtndisabled} onClick={walletrechargeHandler}>
                            Submit
                        </Button.Ripple>
                        <Button.Ripple outline color='secondary' onClick={resetformwalletrecharge}>
                            <RotateCw size={10} />
                        </Button.Ripple>
                    </FormGroup>

                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default Home