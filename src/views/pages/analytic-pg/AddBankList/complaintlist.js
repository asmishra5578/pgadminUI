// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import UILoader from '@components/ui-loader'
// ** Table Data & Columns
import moment from "moment"

// import { columns } from './data'
import requestsApi from './request'
// ** Add New Modal Component
import PaymentrequestModal from './createcomplaint'
import { useHistory } from 'react-router-dom'

// ** Third Party Components
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import Datatablecomponent from '../../../../layouts/components/Datatablecomponent'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, X } from 'react-feather'
import {
  Card, Badge,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label, Form, FormFeedback, FormGroup,
  Row, Modal, ModalHeader, ModalBody, ModalFooter,
  Col
} from 'reactstrap'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import Select from 'react-select'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className='custom-control custom-checkbox'>
    <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    <label className='custom-control-label' onClick={onClick} />
  </div>
))
const requestsApidata = new requestsApi()
const DataTableWithButtons = () => {
  // console.log("response datad----->", data({}))
  // ** States 
  const history = useHistory()
  const [paymentreuestbtndisabled, setpaymentreuestbtndisabled] = useState(false)
  const [block, setBlock] = useState(true)
  const [modal, setModal] = useState(false)
  const [data, setdata] = useState([])
  const handleModal = () => setModal(!modal)
  const [allpglistdata, setallpglistdata] = useState([])
  const [merchantidslist, setmerchantidslist] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const SignupSchema = yup.object().shape({
    // amount: yup.string().required('Amount can not be empty').matches(/^[0-9]*$/, 'Amount is not valid formate'),
    // commission: yup.string().matches(/^[0-9]*$/, 'Commission is not valid formate'),
    // referenceId: yup.string(),
    // bankName: yup.string().required('Bank Name can not be empty').matches((/^([a-zA-Z]+\s)*[a-zA-Z]+$/), 'Bank name not valid'),
    // referenceName: yup.string().required('Refrence Name can not be empty'),
    // note1: yup.string(),
    // note2: yup.string(),
    // note3: yup.string()
    // rechargeAgent: yup.string().required('Recharge Agent can not be empty')
    bankname: yup.string().required('Bank name is required'),
    pgBankCode: yup.string().required('PG Bank Code is required'),
    bankcode: yup.string().required('Bank Code is required')
  })
  const { register, errors, handleSubmit, trigger, reset } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
  const CloseRechargeBtn = <X className='cursor-pointer' size={15} onClick={() => { setModal(false) }} />
  const [SelectpgIDvalue, setSelectpgIDvalue] = useState('Select')
  const [selectmerchantidvalue, setselectmerchantidvalue] = useState('Select')

  // ** Function to handle Modal toggle
  const updatedata = () => {
    // console.log("final resonse")
    setBlock(true)
    requestsApidata.getBankList().then(res => {
      if (res.data.successCode === 'API_SUCCESS') {
        setdata(res.data.extraData.bankDetail)
        setBlock(false)

      } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session expired')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session expired')
        history.push('/')
      }
    })
  }
  const getAllPGDetailsApi = () => {
    requestsApidata.getAllPGDetails().then((res) => {
      setallpglistdata(res.data)
      console.log('res.datapglist', res.data)
    })
  }
  const getallmerchantreport = () => {
    requestsApidata.allMerchantDetailsReport().then(res => {
      setmerchantidslist(res.data.extraData.merchantDetails)
    })
  }
  useEffect(() => {
    requestsApidata.getBankList().then(res => {
      if (res.data.successCode === 'API_SUCCESS') {
        setdata(res.data.extraData.bankDetail)
        setBlock(false)
        getAllPGDetailsApi()
        getallmerchantreport()
      } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session expired')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session expired')
        history.push('/')
      }
    })
  }, [])
  const merchantlistOptions =
    merchantidslist.map((v) => {
      return { value: v.merchantId, label: v.merchantId }
    })
  const pglistoptions =
    allpglistdata.map((v) => {
      return { value: v.pgUuid, label: v.pgName }
    })
  const onSubmit = (data) => {
    if (selectmerchantidvalue === 'Select') {
      toast.warning('Select Merchant ID')
    } else if (SelectpgIDvalue === "Select") {
      toast.warning('Select PG')
    } else {
      console.log('allpg', allpglistdata)
      const filter = allpglistdata.filter((m) => m.pgUuid === SelectpgIDvalue.value)
      const senddata = {
        bankname: data.bankname,
        pgBankCode: data.pgBankCode,
        pgName: filter[0].pgName,
        pgId: SelectpgIDvalue.value,
        bankcode: data.bankcode,
        status: "ACTIVE",
        merchantId: selectmerchantidvalue.value
      }
      console.log('send data', senddata)
      setpaymentreuestbtndisabled(true)

      requestsApidata.payingaddmodifybank(senddata).then(res => {
        setpaymentreuestbtndisabled(false)
        console.log('res.data', res.data.status)
        if (res.data.successCode === "API_SUCCESS") {
          Swal.fire({ text: "Bank Added Successfully", icon: 'success' }).then(() => {
            handleModal()
            updatedata()
          })
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
    }
  }
  const updateStatusHandler = (e, bankcode, pgBankCode, status) => {
    console.log('updateStatusHandler', e.target.id, bankcode, pgBankCode, status)
    const filter = data.filter((m) => {
      return m.merchantId === e.target.id && m.bankcode === bankcode && m.pgBankCode === pgBankCode
    })
    console.log('filterdata', filter)
    const senddata = {
      bankname: "",
      pgBankCode: filter[0].pgBankCode,
      pgName: "",
      pgId: "",
      bankcode: filter[0].bankcode,
      status,
      merchantId: filter[0].merchantId
    }
    console.log('senddata', senddata)
    setBlock(true)
    requestsApidata.payingaddmodifybank(senddata).then((res) => {
      setBlock(false)
      if (res.data.statusCode === 100) {
        toast.warning(res.data.msg[0])
      } else if (res.data.exception === "LIST_DEACTIVE_FIRST") {
        toast.warning(res.data.msg[0])
      } else if (res.data.successCode === "API_SUCCESS") {
        toast.success('Status Update Successfully')
        updatedata()
      }
    })
  }
  const columns = [
    {
      name: 'Merchant ID',
      selector: 'merchantId',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Pg Name',
      selector: 'pgName',
      sortable: true
    },
    {
      name: 'Bank Name',
      selector: 'bankname',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'Bank Code',
      selector: 'bankcode',
      sortable: true
    },
    {
      name: 'PG Bank Code',
      selector: 'pgBankCode',
      sortable: true
    },

    {
      name: 'Status',
      selector: 'status',
      sortable: true
    },
    {
      name: 'ACTION',
      sortable: true,
      cell: row => {
        return <div style={{ display: 'flex' }}>
          <Badge color={row.status === "DEACTIVE" ? "success" : "primary"} id={row.merchantId} onClick={(e) => updateStatusHandler(e, row.bankcode, row.pgBankCode, row.status === "ACTIVE" ? "DEACTIVE" : "ACTIVE")}>{row.status === "DEACTIVE" ? "ACTIVE" : "DEACTIVE"}</Badge>
        </div>
      }
    }
  ]
  const selectPGidHandler = (e) => {
    setSelectpgIDvalue(e)
  }
  const selectmerchantidHandler = (e) => {
    // console.log('select merchant id', e.value)
    setselectmerchantidvalue(e)

  }
  const searchalldataHandler = (e) => {
    console.log("e.target.value", e.target.value)
    setSearchValue(e.target.value)
    if (e.target.value.length) {
      const updatedData = data.filter(item => {
        const startsWith =
          (item.merchantId && item.merchantId.toString().startsWith((e.target.value).trim())) ||
          (item.status && item.status.toString().startsWith((e.target.value).trim())) ||
          (item.bankcode && item.bankcode.toString().startsWith((e.target.value).trim())) ||
          (item.bankname && item.bankname.toString().startsWith((e.target.value).trim())) ||
          (item.pgBankCode && item.pgBankCode.toString().startsWith((e.target.value).trim())) ||
          (item.pgName && item.pgName.toString().startsWith((e.target.value).trim()))
        const includes =
          (item.merchantId && item.merchantId.toString().includes((e.target.value).trim())) ||
          (item.status && item.status.toString().includes((e.target.value).trim())) ||
          (item.bankcode && item.bankcode.toString().includes((e.target.value).trim())) ||
          (item.bankname && item.bankname.toString().includes((e.target.value).trim())) ||
          (item.pgBankCode && item.pgBankCode.toString().includes((e.target.value).trim())) ||
          (item.pgName && item.pgName.toString().includes((e.target.value).trim()))
        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setdata(updatedData)
      setSearchValue(e.target.value)
    } else {
      updatedata()
    }
  }
  return (
    <Fragment>
      <UILoader blocking={block}>
        <Datatablecomponent searchFilter={searchalldataHandler}
          isaddfilter
          searchValue={searchValue} isaddpayinnebankde data={data} handleModal={handleModal} coloumnsprops={columns} routename="Bank List" refreshdata={updatedata} isaddrefresh />
      </UILoader>
      <Modal
        isOpen={modal}
        className='sidebar-lg'
        modalClassName='modal-slide-in'
        contentClassName='pt-0'
      >
        <ModalHeader className='mb-3' close={CloseRechargeBtn} tag='div'>
          <h5 className='modal-title'>Add Wallet</h5>
        </ModalHeader>
        <ModalBody className='flex-grow-1'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <FormGroup tag={Col} md='12'>
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
              </FormGroup>
            </Row>
            <Row>
              <FormGroup tag={Col} md='12'>
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
              </FormGroup>
            </Row>
            <Row>
              <FormGroup tag={Col} md='12'>
                <Label className='form-label' for={`bankname`}>
                  Bank Name<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                </Label>
                <Input
                  type="text"
                  name="bankname"
                  id="bankname"
                  placeholder='Bank Name'
                  invalid={errors.bankname && true}
                  innerRef={register({ required: true })}
                />
                {errors && errors.bankname && <FormFeedback>{errors.bankname.message}</FormFeedback>}
              </FormGroup>
            </Row>
            <Row>

            </Row>
            <Row>

              <FormGroup tag={Col} md='12'>
                <Label className='form-label' for={`pgBankCode`}>
                  PG Bank Code<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                </Label>
                <Input
                  name={`pgBankCode`}
                  id={`pgBankCode`}
                  placeholder='PG Bank Code'
                  innerRef={register({ required: true })}
                  invalid={errors.pgBankCode && true}
                />
                {errors && errors.pgBankCode && <FormFeedback>{errors.pgBankCode.message}</FormFeedback>}
              </FormGroup>

            </Row>
            <Row>
              <FormGroup tag={Col} md='12'>
                <Label className='form-label' for={`bankcode`}>
                  Bank Code<span className='labelcssrequired'>*</span>
                </Label>
                <Input
                  type='text'
                  name={`bankcode`}
                  id={`bankcode`}
                  placeholder='Bank Code'
                  innerRef={register({ required: true })}
                  invalid={errors.bankcode && true}
                />
                {errors && errors.bankcode && <FormFeedback>{errors.bankcode.message}</FormFeedback>}

              </FormGroup>
            </Row>

            <div className='d-flex justify-content-between'>
              <Button.Ripple type='submit' color='primary' className='btn-next' disabled={paymentreuestbtndisabled}>
                <span className='align-middle d-sm-inline-block d-none'>Submit</span>
              </Button.Ripple>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default DataTableWithButtons
