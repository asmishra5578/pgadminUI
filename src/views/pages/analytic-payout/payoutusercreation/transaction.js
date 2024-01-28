import * as yup from 'yup'

import { Fragment, useState, forwardRef, useEffect } from 'react'
import UILoader from '@components/ui-loader'
// ** Table Data & Columns
import moment from "moment"
import { useHistory } from 'react-router-dom'

import { columns } from './data'
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

const Home = () => {
  // console.log("response datad----->", data({}))
  const SignupSchema = yup.object().shape({
    merchantName: yup.string().required('Merchant Name can not be empty'),
    // email: yup.string().email().required('Email is required'),
    email: yup.string().required('Email is required').matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Email not valid formate'),
    // phoneNumber: yup.string().min(10).required(),
    phoneNumber: yup.string().required('Phone number can not be empty').matches(/^[0-9]{10}$/, 'Phone number is not valid formate'),
    companyName: yup.string().required('Company Name can not be empty'),
    merchantType: yup.string().required('Merchant Type can not be empty'),
    supportEmailId: yup.string(),
    supportPhoneNo: yup.string(),
    logoUrl: yup.string(),
    walletname: yup.string().required('Wallet Name can not be empty')

    // kycStatus:yup.string()
  })
  const history = useHistory()
  const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const [searchmerchantinputvalue, setsearchmerchantinputvalue] = useState('')
  const [ipvalue, setipvalue] = useState()
  const [checkboxvalue, setcheckboxvalue] = useState('UnChecked')
  // ** States transactiontypeSelect
  const [listIPdisplay, setlistIPdisplay] = useState('none')
  const [updateIPdisplay, setupdateIPdisplay] = useState('none')
  const [mainwalletlistdata, setmainwalletlistdata] = useState([])
  const fromDate = moment().subtract(7, "days").format("DD-MM-YYYY")
  const toDate = moment().format("DD-MM-YYYY")
  const [merchantsearchbtndisabled, setmerchantsearchbtndisabled] = useState(false)
  const [selectmainwalltetValue, setselectmainwalltetValue] = useState('Select')
  const iphanler = (e) => {
    setipvalue(e.target.value)
  }
  const [selectkycstatusvalue, setselectkycstatusvalue] = useState('Select')
  const selectmainwalletHandler = (e) => {
    setselectmainwalltetValue(e)
    // requestsApidata.getMainWalletBalance(e.value).then(response => {
    //     console.log('getMainWalletBalance', response.data)
    //     setgetMainWalletBalance(response.data.amount)
    // })
  }
  useEffect(() => {
    // console.log(fromDate, toDate)
    requestsApidata.getMainWalletList().then(res => {
      // console.log('getMainWalletList', res.data)

      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else {
        console.log('getMainWalletList', res.data[0].walletid)
        setmainwalletlistdata(res.data)
      }
    })
  }, [])
  const selectmainwalletoptions =
    mainwalletlistdata.map((v) => {
      return { value: v.walletid, label: `${v.walletid} (${v.name}) ` }
    })
  const serarhmerchantipHandler = () => {
    // setmerchantsearchbtndisabled(true)
    // if (checkboxvalue === "Checked") {
    //     console.log('add all data')

    // }
    // if (checkboxvalue === "UnChecked") {
    //     console.log('no add data')
    // }
    const UNcheckedsendData = {
      merchantId: searchmerchantinputvalue,
      whitelistedip: ipvalue,
      walletCheck: "false"
    }
    const checkedsendData = {
      merchantId: searchmerchantinputvalue,
      whitelistedip: ipvalue,
      walletCheck: "true",
      name: "ANALYTIQ",
      status: "ACTIVE",
      amount: "0.00",
      mainWalletid: "5c0385d0-f95c-4c89-ad5b-73199d947e58"
    }
    if (searchmerchantinputvalue === "") {
      toast.warning('Merchant ID can not be empty')
    } else {
      setmerchantsearchbtndisabled(true)
      requestsApidata.payOutUserCreation(checkboxvalue === "Checked" ? checkedsendData : UNcheckedsendData).then(res => {
        if (res.data.successCode === "API_SUCCESS") {
          toast.success(res.data.msg[0])
          setmerchantsearchbtndisabled(false)
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
        } else {
          setmerchantsearchbtndisabled(false)
          toast.warning(res.data.msg[0])
        }
      })
    }
  }
  // const countryOptions = 
  // mainwalletlistdata.map((v) => {
  //   return {value:v.walletid, label:v.name} 
  // })

  const selectkycstatushandler = (e) => {
    console.log('selectkycstatushandler', e.value)
    setselectkycstatusvalue(e)
  }
  const onSubmit = (data) => {
    console.log("dsadasd", data)
    if (selectmainwalltetValue === "Select") {
      toast.warning('Select Main Wallet')
    } else {
      requestsApidata.CreatenewMerchant(data).then((res) => {
        if (res.data.successCode === 'API_SUCCESS') {
          // toast.success('Merchant Created Successfully')
          // trigger()
          // st.set('merchantid', res.data.extraData.merchantDetail.merchantId)
          requestsApidata.WalletCreation(res.data.extraData.merchantDetail.merchantId, data.walletname, selectmainwalltetValue.value).then(resp => {
            if (resp.data.responseStatus === "SUCCESS") {
              // toast.success("Merchant Created Successfully")
              // setmerchantsearchbtndisabled(false)
              // setupdateIPdisplay('none')
              Swal.fire({ allowEnterKey: false, allowOutsideClick: false, allowEscapeKey: false, text: res.data.extraData.merchantDetail.message, title: `Password:${res.data.extraData.merchantDetail.password}` }).then(() => {
                history.push('/payout/walletlist')
              })
            } else {
              toast.warning(resp.data.msg[0])
            }
          })
        } else if (res.data.exception === "ALL_FIELDS_MANDATORY") {
          toast.error("Input should not content blank value")
        } else if (res.data.exception === "MERCHANT_EMAIL_ID_ALREADY_EXISTS_IN_SYSTEM") {
          toast.error("Provided Merchant Email id already Present in System")
        } else if (res.data.exception === "MERCHANT_ALREADY_EXISTS") {
          toast.error("Provided Merchant Email id already Present in System")
        } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
          toast.error("Session Expired login again!")
          history.push("/")
        } else if (res.data.exception === "MERCHANT_PHONE_NUMBER_ALREADY_EXISTS_IN_SYSTEM") {
          toast.error("PHONE NUMBER already exists in system")
        } else if (res.data.exception === "JWT_MISSING") {
          toast.error("Session Expired login again !")
          history.push("/")
        }
      })
    }
  }
  // ** Function to handle filter

  // ** Function to handle Pagination
  const serchmerchanthandler = (e) => {
    setsearchmerchantinputvalue(e.target.value)
  }

  const checkboxhandler = (e) => {
    if (e.target.checked) {
      setcheckboxvalue('Checked')
    } else {
      setcheckboxvalue('UnChecked')
    }
  }
  return (
    <Fragment>
      {/* <h6>Search by date or search by merchantID and Status</h6> */}
      <br />

      <Card style={{ padding: 20 }}>
        <div>
          <h6>Create Merchant, Payout and Wallet</h6>
          <div className='content-header'>
            <h5 className='mb-0'>Merchant Details</h5>
            <small className='text-muted'>Enter Your Merchant Details.</small>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for="merchantName">
                  Merchant Name<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                </Label>
                <Input
                  name="merchantName"
                  id="merchantName"
                  placeholder='johndoe'
                  innerRef={register({ required: true })}
                  invalid={errors.merchantName && true}
                />
                {errors && errors.merchantName && <FormFeedback>{errors.merchantName.message}</FormFeedback>}
              </FormGroup>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for={`email`}>
                  Email<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                </Label>
                <Input
                  type='text'
                  name='email'
                  id='email'
                  placeholder='john.doe@email.com'
                  innerRef={register({ required: true })}
                  invalid={errors.email && true}
                />
                {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
              </FormGroup>
            </Row>
            <Row>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for={`phoneNumber`}>
                  Phone Number<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                </Label>
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder='Phone Number'
                  invalid={errors.phoneNumber && true}
                  innerRef={register({ required: true })}
                />
                {errors && errors.phoneNumber && <FormFeedback>{errors.phoneNumber.message}</FormFeedback>}

              </FormGroup>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for={`companyName`}>
                  Company Name<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                </Label>
                <Input
                  name={`companyName`}
                  id={`companyName`}
                  placeholder='Company Name'
                  innerRef={register({ required: true })}
                  invalid={errors.companyName && true}
                />
                {errors && errors.companyName && <FormFeedback>{errors.companyName.message}</FormFeedback>}

              </FormGroup>
            </Row>
            <Row>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for={`merchantType`}>
                  Merchant Type<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                </Label>
                <Input
                  name={`merchantType`}
                  id={`merchantType`}
                  placeholder='Merchant Type'
                  innerRef={register({ required: true })}
                  invalid={errors.merchantType && true}
                />
                {errors && errors.merchantType && <FormFeedback>{errors.merchantType.message}</FormFeedback>}

              </FormGroup>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for={`supportEmailId`}>
                  Support EmailId
                </Label>
                <Input
                  type='email'
                  name={`supportEmailId`}
                  id={`supportEmailId`}
                  placeholder='Support EmailId'
                  innerRef={register({ required: true })}
                  invalid={errors.supportEmailId && true}
                />
                {/* {errors && errors.supportEmailId && <FormFeedback>{errors.supportEmailId.message}</FormFeedback>} */}

              </FormGroup>
            </Row>
            <Row>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for={`supportPhoneNo`}>
                  Support Phone Number
                </Label>
                <Input
                  type="number"
                  name={`supportPhoneNo`}
                  id={`supportPhoneNo`}
                  placeholder='Support Phone Number'
                  innerRef={register({ required: true })}
                  invalid={errors.supportPhoneNo && true}
                />
                {/* {errors && errors.supportPhoneNo && <FormFeedback>{errors.supportPhoneNo.message}</FormFeedback>} */}

              </FormGroup>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for={`logoUrl`}>
                  Logo Url
                </Label>
                <Input
                  name={`logoUrl`}
                  id={`logoUrl`}
                  placeholder='logo Url'
                  innerRef={register({ required: true })}
                  invalid={errors.logoUrl && true}
                />

              </FormGroup>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for={`walletname`}>
                  Wallet Name<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                </Label>
                <Input
                  name={`walletname`}
                  id={`walletname`}
                  placeholder='Wallet Name'
                  innerRef={register({ required: true })}
                  invalid={errors.walletname && true}
                />
                {errors && errors.walletname && <FormFeedback>{errors.walletname.message}</FormFeedback>}

              </FormGroup>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for={`bankName`}>
                  Select Main Wallet Id <span style={{ color: 'red', fontWeight: 'bold' }}>*</span>
                </Label>
                <Select
                  // theme={selectThemeColors}
                  isClearable={false}
                  id='kycStatus'
                  className='react-select'
                  classNamePrefix='select'
                  options={selectmainwalletoptions}
                  //   defaultValue={countryOptions[0]}
                  onChange={selectmainwalletHandler}
                  value={selectmainwalltetValue}
                // onFocus={handleFocus}
                />
                {/* <span>Main Wallet Balance: {getMainWalletBalance}</span> */}
                {/* <span style={{ color: 'red' }}>{bankNameErrmsg}</span> */}
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
          {/* <Row>
                        <Col lg="3">
                            <Label>Merchant ID <span style={{color:'red', fontWeight:'bold'}}>*</span></Label>
                            <Input placeholder='Enter Merchant ID' onChange={serchmerchanthandler} />
                          <div style={{marginTop:10}}>
                            <Label>Whitelisted IP</Label>
                            <Input placeholder='Enter Whitelisted IP' onChange={iphanler} />
                            </div>
                            <div style={{marginLeft:20, marginTop:10}}>
                                <FormGroup>
                                    <Input type='checkbox' id='basic-cb-unchecked' value={checkboxvalue}
                                        onChange={checkboxhandler} />
                                    <Label for='basic-cb-unchecked' check style={{fontWeight:'bold'}}>
                                        Create Wallet
                                    </Label>
                                </FormGroup>
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <Button color="primary" disabled={merchantsearchbtndisabled} onClick={serarhmerchantipHandler}>
                                    Submit
                                </Button>
                            </div>
                        </Col>
                    </Row> */}
        </div>
      </Card>
    </Fragment>
  )
}

export default Home