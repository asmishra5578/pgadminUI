
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
    const [addcommessionModal, setaddcommessionModal] = useState(false)


    const handleModal = () => setModal(!modal)
    const rechargehandleModal = () => setrechargeModal(!rechargeModal)
    const HandleraddcommessionModal = () => setaddcommessionModal(!addcommessionModal)


    const rechargeCloseBtn = <X className='cursor-pointer' size={15} onClick={rechargehandleModal} />
    const addcommissionCloseBtn = <X className='cursor-pointer' size={15} onClick={HandleraddcommessionModal} />
    const [addmerchantcommssionvalue, setaddmerchantcommssionvalue] = useState("Select")
    const [updatemerchantcommssionvalue, setupdatemerchantcommssionvalue] = useState("Select")

    const [WCnamevalue, setWCnamevalue] = useState('')
    const [WCmerchantidvalue, setWCmerchantidvalue] = useState('')
    const [WCamountvalue, setWCamountvalue] = useState('')

    const [WRremarkValue, setWRremarkValue] = useState('')
    const [WRreferencevalue, setWRreferencevalue] = useState('')
    const [walletREchargebtndisabled, setwalletREchargebtndisabled] = useState(false)
    const [openmodalmerchntID, setopenmodalmerchntID] = useState('')
    const [block, setBlock] = useState(true)
    const [data, setdata] = useState([])
    const [mainwalletlistdata, setmainwalletlistdata] = useState([])
    const [selectmainwalltetValue, setselectmainwalltetValue] = useState('Select')
    const fromDate = moment().subtract(7, "days").format("DD-MM-YYYY")
    const toDate = moment().format("DD-MM-YYYY")
    const [walletlistdata, setwalletlistdata] = useState([])
    const [diasbledbtnaddcommission, setdiasbledbtnaddcommission] = useState(true)
    const resetmainwalletrechBtn = () => {
        setselectmainwalltetValue('Select')
        setgetMainWalletBalance('')
    }
    const openRechargemodalHandler = (e) => {
        setrechargeModal(true)
        setopenmodalmerchntID(e.target.id)
        const filter = data.filter((m) => m.merchantId === e.target.id)
        //  console.log('filter', filter)
        setaddmerchantcommssionvalue(filter[0].commission)
    }


    const selectmainwalletHandler = (e) => {
        setselectmainwalltetValue(e)
        console.log('sssss', e.value)
    }
    const getallrefreshdata = () => {
        requestsApidata.getmerchantcommission("").then((res) => {
            if (res.data.successCode === "API_SUCCESS") {
                setdata(res.data.extraData.MerchantCommision)
                setBlock(false)
            }
        })
    }
    const selectwalletoptions =
        walletlistdata.map((v) => {
            return { value: v.merchantid, label: `${v.merchantid} (${v.name}) ` }
        })
    const updatedatahandler = () => {
        setBlock(true)
        getallrefreshdata()
    }

    const columns = [
        {
            name: 'MerchantId',
            selector: 'merchantId',
            sortable: true,
            minWidth: '200px'
        },
        {
            name: 'Commission',
            selector: 'commission',
            sortable: true,
            // minWidth: '250px',
            cell: row => <span>{row.commission}%</span>

        },
        {
            name: 'Created At',
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
                <Badge id={row.merchantId} onClick={openRechargemodalHandler}
                    style={{ cursor: 'pointer' }} color="primary">Update Commission</Badge>
            </span>
        }
    ]

    const getwalletlist = () => {
        requestsApidata.PayoutWalletlist().then((res) => {
            console.log('res', res.data)
            if (res.data.successCode === "API_SUCCESS") {
                setwalletlistdata(res.data.extraData.walletlist)
            }
        })
    }
    useEffect(() => {
        // console.log(fromDate, toDate)
        getallrefreshdata()
        getwalletlist()
    }, [])
    // ** Function to handle filter
    const searchalldataHandler = (e) => {
        console.log("e.target.value", e.target.value.length)
        setSearchValue(e.target.value)
        if (e.target.value.length) {
            const updatedData = data.filter(item => {
                const startsWith =
                    // item.name.startsWith(e.target.value) ||
                    item.merchantId.startsWith(e.target.value)
                // item.amount.startsWith(e.target.value) ||
                // item.mainWalletid.startsWith(e.target.value)
                // item.status.startsWith(e.target.value) ||
                // item.emailId.startsWith(e.target.value) ||
                // item.paymentOption.startsWith(e.target.value) ||
                // item.orderID.startsWith(e.target.value) ||
                // item.pgId.startsWith(e.target.value)
                //   ||
                //   item.amount.startsWith(e.target.value) 

                const includes =
                    // item.name.includes(e.target.value) ||
                    item.merchantId.includes(e.target.value)
                // item.amount.includes(e.target.value) ||
                // item.mainWalletid.includes(e.target.value)
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
    const addmerchantcommssionHandler = (e) => {
        setwalletREchargebtndisabled(false)
        setaddmerchantcommssionvalue(e.target.value)
    }
    const updatemerchantcommssionHandler = (e) => {
        setdiasbledbtnaddcommission(false)
        setupdatemerchantcommssionvalue(e.target.value)
    }
  
    const resetformwalletrecharge = () => {
        setaddmerchantcommssionvalue('')
        setWRremarkValue('')
        setWRreferencevalue('')
    }
    const walletrechargeHandler = () => {
        console.log('okkk', addmerchantcommssionvalue, openmodalmerchntID)
        if (addmerchantcommssionvalue === "") {
            toast.warning('Commission can not be empty')
        } else if (addmerchantcommssionvalue > 10) {
            toast.warning('Commission should be between 1 to 10')
        } else {
            setwalletREchargebtndisabled(true)
            requestsApidata.updatemerchantcommission(openmodalmerchntID, addmerchantcommssionvalue).then((res) => {
                setwalletREchargebtndisabled(false)
                if (res.data.successCode === "API_SUCCESS") {
                    Swal.fire({ text: res.data.msg[0], icon: 'success' }).then(() => {
                        setaddmerchantcommssionvalue('')
                        setopenmodalmerchntID('')
                        updatedatahandler()
                        rechargehandleModal()
                    })
                }
            })
        }
    }
    const submitMainwalletrecharge = () => {
        console.log('sssssss', selectmainwalltetValue.value, updatemerchantcommssionvalue)
        if (selectmainwalltetValue === "Select") {
            toast.warning('Select Merchant Id')
        } else if (updatemerchantcommssionvalue === "") {
            toast.warning('Commission can not be empty')
        } else if (updatemerchantcommssionvalue > 10) {
            toast.warning('Commission should be between 1 to 10')
        } else {
            setdiasbledbtnaddcommission(true)
            requestsApidata.addmerchantcommission(selectmainwalltetValue.value, updatemerchantcommssionvalue).then((res) => {
                setdiasbledbtnaddcommission(false)
                if (res.data.successCode === "API_SUCCESS") {
                    Swal.fire({ text: res.data.msg[0], icon: 'success' }).then(() => {
                        setupdatemerchantcommssionvalue('')
                        setselectmainwalltetValue('Select')
                        updatedatahandler()
                        HandleraddcommessionModal()
                    })
                } else {
                    toast.warning(res.data.msg[0])
                }
            })
        }

    
    }
    return (
        <Fragment>
            {/* <h6>Search by date or search by merchantID and Status</h6> */}
            <br />

            <div>
                <UILoader blocking={block}>

                    <Datatablecomponent routename='Commission List' coloumnsprops={columns} data={data} createwalletMoadl={addcommessionModal}
                        handleModal={HandleraddcommessionModal} isaddcommission refreshdata={updatedatahandler}

                        searchValue={searchValue} searchFilter={searchalldataHandler}
                    />
                </UILoader>
            </div>

            <Modal
                isOpen={rechargeModal}
                toggle={rechargehandleModal}
            >
                <ModalHeader className='mb-0' toggle={rechargehandleModal} close={rechargeCloseBtn} tag='div'>
                    <h5 className='modal-title'>Update Commission</h5>
                </ModalHeader>
                <ModalBody>
                    {/* <CardTitle tag='h4'>Recharge Wallet</CardTitle> */}
                    <FormGroup>
                        <Label for='WRamount'>Commission in Percentage<span style={{ color: 'red', fontWeight: 'bold' }}>*</span></Label>
                        <Input
                            type='number'
                            name='WRamount'
                            id='WRamount'
                            placeholder='Commission'
                            onChange={addmerchantcommssionHandler}
                            value={addmerchantcommssionvalue}
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
            <Modal
                isOpen={addcommessionModal}
                toggle={HandleraddcommessionModal}
            >
                <ModalHeader className='mb-0' toggle={HandleraddcommessionModal} close={addcommissionCloseBtn} tag='div'>
                    <h5 className='modal-title'>Add Commission</h5>
                </ModalHeader>
                <ModalBody>
                    {/* <CardTitle tag='h4'>Recharge Wallet</CardTitle> */}
                    <Label className='form-label' for={`bankName`}>
                        Select Merchant Id <span style={{ color: 'red', fontWeight: 'bold' }}>*</span>
                    </Label>
                    <Select
                        // theme={selectThemeColors}
                        isClearable={false}
                        id='kycStatus'
                        className='react-select'
                        classNamePrefix='select'
                        options={selectwalletoptions}
                        //   defaultValue={countryOptions[0]}
                        onChange={selectmainwalletHandler}
                        value={selectmainwalltetValue}
                    // onFocus={handleFocus}
                    />

                    <div style={{marginTop:10}}>
                    <FormGroup>
                        <Label for='WRamount'>Commission in Percentage<span style={{ color: 'red', fontWeight: 'bold' }}>*</span></Label>
                        <Input
                            type='number'
                            name='WRamount'
                            id='WRamount'
                            placeholder='Commission'
                            onChange={updatemerchantcommssionHandler}
                            value={updatemerchantcommssionvalue}
                        />
                    </FormGroup>
                    </div>
                    <FormGroup className='d-flex mb-0'>
                        <Button.Ripple className='mr-1' color='primary' type='submit' disabled={diasbledbtnaddcommission} onClick={submitMainwalletrecharge}>
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