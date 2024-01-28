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
  const [submitdisables, setsubmitdisables] = useState(false)
  const SignupSchema = yup.object().shape({
    emailId: yup.string().required('Email is required').matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Email not valid formate'),
    phoneNumber: yup.string().required('Phone number can not be empty').matches(/^[0-9]{10}$/, 'Phone number is not valid formate'),
    compantName: yup.string(),
    userName: yup.string().required('Username can not be empty'),
    address1: yup.string(),
    address2: yup.string(),
    address3: yup.string(),
    pincode: yup.string(),
    city: yup.string()
  })
  const history = useHistory()
  const { register, errors, handleSubmit, trigger, reset } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
  const [selectkycstatusvalue, setselectkycstatusvalue] = useState('Select')

  useEffect(() => {

  }, [])
 
  // const countryOptions = 
  // mainwalletlistdata.map((v) => {
  //   return {value:v.walletid, label:v.name} 
  // })

  const selectkycstatushandler = (e) => {
    console.log('selectkycstatushandler', e.value)
    setselectkycstatusvalue(e)
  }
  const onSubmit = (data) => {
    data.country = "India"
    data.kycStatus = "true"
    console.log("dsadasd", data)
    setsubmitdisables(true)
     requestsApidata.adminCreate(data).then((res) => {
      setsubmitdisables(false)
       if (res.data.successCode === 'API_SUCCESS') {
         Swal.fire({title:'Admin Created Successfully', allowEnterKey:false, allowOutsideClick:false, text:`Password:${res.data.extraData.loginData.password}`, icon:'success'}).then(() => {
          reset()
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
       } else {
        toast.error(res.data.msg[0])
       }
     })
  }
  // ** Function to handle filter

  // ** Function to handle Pagination


  return (
    <Fragment>
      {/* <h6>Search by date or search by merchantID and Status</h6> */}
      <br />

      <Card style={{ padding: 20 }}>
        <div>
          <h6>New Admin Registration</h6>
          <div className='content-header'>
            <h5 className='mb-0'>Create Admin</h5>
            <small className='text-muted'>Enter Your Admin Details.</small>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for="userName">
                  User Name<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                </Label>
                <Input
                  name="userName"
                  id="userName"
                  placeholder='johndoe'
                  innerRef={register({ required: true })}
                  invalid={errors.userName && true}
                />
                {errors && errors.userName && <FormFeedback>{errors.userName.message}</FormFeedback>}
              </FormGroup>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for={`emailId`}>
                  Email<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                </Label>
                <Input
                  type='text'
                  name='emailId'
                  id='emailId'
                  placeholder='john.doe@email.com'
                  innerRef={register({ required: true })}
                  invalid={errors.emailId && true}
                />
                {errors && errors.emailId && <FormFeedback>{errors.emailId.message}</FormFeedback>}
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
                <Label className='form-label' for={`compantName`}>
                  Company Name
                </Label>
                <Input
                  name={`compantName`}
                  id={`compantName`}
                  placeholder='Company Name'
                  innerRef={register({ required: true })}
                  invalid={errors.compantName && true}
                />
                {/* {errors && errors.compantName && <FormFeedback>{errors.compantName.message}</FormFeedback>} */}

              </FormGroup>
            </Row>
            <Row>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for={`pincode`}>
                  Pincode
                </Label>
                <Input
                  name={`pincode`}
                  id={`pincode`}
                  placeholder='PinCode'
                  innerRef={register({ required: true })}
                  invalid={errors.pincode && true}
                />
                {errors && errors.pincode && <FormFeedback>{errors.pincode.message}</FormFeedback>}

              </FormGroup>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for={`city`}>
                  City
                </Label>
                <Input
                  name={`city`}
                  id={`city`}
                  placeholder='City'
                  innerRef={register({ required: true })}
                  invalid={errors.city && true}
                />
                {/* {errors && errors.supportEmailId && <FormFeedback>{errors.supportEmailId.message}</FormFeedback>} */}

              </FormGroup>
            </Row>
            <Row>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for={`address1`}>
                  Address1
                </Label>
                <Input
                  name={`address1`}
                  id={`address1`}
                  placeholder='Address'
                  innerRef={register({ required: true })}
                  invalid={errors.address1 && true}
                />
              </FormGroup>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for={`address2`}>
                  Address2
                </Label>
                <Input
                  name={`address2`}
                  id={`address2`}
                  placeholder='Address2'
                  innerRef={register({ required: true })}
                  invalid={errors.address2 && true}
                />
              </FormGroup>
              <FormGroup tag={Col} md='6'>
                <Label className='form-label' for={`address3`}>
                  Address3
                </Label>
                <Input
                  name={`address3`}
                  id={`address3`}
                  placeholder='Address3'
                  innerRef={register({ required: true })}
                  invalid={errors.address3 && true}
                />
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
              <Button.Ripple type='submit' color='primary' disabled={submitdisables} className='btn-next'>
                <span className='align-middle d-sm-inline-block d-none'>Submit</span>
              </Button.Ripple>
            </div>
          </Form>
        </div>
      </Card>
    </Fragment>
  )
}

export default Home