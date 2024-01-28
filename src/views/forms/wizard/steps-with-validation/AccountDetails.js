import * as yup from 'yup'
import { Fragment, useEffect, useState } from 'react'
import classnames from 'classnames'
import { isObjEmpty } from '@utils'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Label, Input, FormGroup, Row, Col, Button, FormFeedback } from 'reactstrap'
import requestsApi from './request'
import { toast } from 'react-toastify'
// import  st  from '../../secureStore/useSecure'
import st from '../../../../@core/secureStore/useSecure'
import Select from 'react-select'
import Swal from 'sweetalert2'

const requestsApidata = new requestsApi()

const AccountDetails = ({ stepper }) => {
  const [pglist, setpglist] = useState([])
  const SignupSchema = yup.object().shape({
    merchantName: yup.string().required('Merchant Name can not be empty').matches((/^([a-zA-Z]+\s)*[a-zA-Z]+$/), 'Name is not valid'),
    // email: yup.string().email().required('Email is required'),
    email: yup.string().required('Email is required').matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Email not valid formate'),

    // phoneNumber: yup.string().min(10).required(),
    phoneNumber: yup.string().required('Phone number can not be empty').matches(/^[0-9]{10}$/, 'Phone number is not valid formate'),
    companyName: yup.string(),
    merchantType: yup.string(),
    supportEmailId: yup.string(),
    supportPhoneNo: yup.string(),
    logoUrl: yup.string()
    // kycStatus:yup.string()
  })

  // const { register, errors, handleSubmit, trigger } = useForm({
  //   mode: 'onChange', resolver: yupResolver(SignupSchema)
  // })
  const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
  const [selectkycstatusvalue, setselectkycstatusvalue] = useState('Yes')
  const [selectPGuuidvalue, setselectPGuuidvalue] = useState('Select')
  const [selectserviceFlagvalue, setselectserviceFlagvalue] = useState('Select')

  useEffect(() => {
    requestsApidata.pgdetailslinkmerchant().then(res => {
      // console.log("pg details final resonse", res.data)
      if (res.data.successCode === "API_SUCCESS") {
        // setBlock(false)
        const map = new Map(res.data.extraData.pgDetail.map(({ pg_name, pg_uuid, created, pg_daily_limit, pg_status, pg_services, service_status }) => [pg_name, { pg_name, pg_servicea: [], pg_uuid, created, pg_daily_limit, pg_status }]))
        for (const { pg_name, service_status, pg_services } of res.data.extraData.pgDetail) map.get(pg_name).pg_servicea.push(...[{ pgservices: pg_services, servicestatus: service_status }].flat())
        setpglist([...map.values()])
        // console.log("mapppppppp", [...map.values()])
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
  }, [])
  const merchantlistOptions =
    pglist.map((v) => {
      return { value: v.pg_uuid, label: v.pg_name }
    })
  const onSubmit = (data) => {
    console.log('pguuis', selectPGuuidvalue, selectserviceFlagvalue)
    console.log("dsadasd", data)
    // stepper.next()

    data.kycStatus = selectkycstatusvalue
    requestsApidata.CreatenewMerchant(data, selectPGuuidvalue === "Select" ? "" : selectPGuuidvalue.value, selectserviceFlagvalue === "Select" ? "false" : selectserviceFlagvalue.value).then((res) => {
      // console.log('response', res.data)
      if (res.data.successCode === 'API_SUCCESS') {
        toast.success('Merchant Created Successfully')
        Swal.fire({title:'Merchant Created Successfully', text:`Password:${res.data.extraData.merchantDetail.password}`, allowEnterKey:false, allowOutsideClick:false, allowEscapeKey:false})
        trigger()
        st.set('merchantid', res.data.extraData.merchantDetail.merchantId)
        if (isObjEmpty(errors)) {
          stepper.next()
        }
      } else if (res.data.exception === "ALL_FIELDS_MANDATORY") {
        toast.error("Input should not content blank value")
      } else if (res.data.exception === "MERCHANT_EMAIL_ID_ALREADY_EXISTS_IN_SYSTEM") {
        toast.error("Provided Merchant Email id already Present in System")
        // stepper.next()
        // st.set('merchantid', "ragggghusinghorai")
      } else if (res.data.exception === "MERCHANT_ALREADY_EXISTS") {
        toast.error("Provided Merchant Email id already Present in System")
        // stepper.next()
        // st.set('merchantid', "ragggghusinghorai")
      } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error("Session Expired login again!")
        // props.history.push("/")
      } else if (res.data.exception === "MERCHANT_PHONE_NUMBER_ALREADY_EXISTS_IN_SYSTEM") {
        toast.error("PHONE NUMBER already exists in system")
        // stepper.next()
        // st.set('merchantid', "ragggghusinghorai")
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error("Session Expired login again !")
        // history.push("/")
      } else {
        toast.error(res.data.msg[0])
      }
    })


    // trigger()
    // if (isObjEmpty(errors)) {
    //   stepper.next()
    // }

  }
  const countryOptions = [
    { value: 'Yes', label: 'YES' },
    { value: 'No', label: 'No' }
    // { value: 'Pending', label: 'Pending' }
  ]
  const serviceFlagoptions = [
    { value: 'true', label: 'YES' },
    { value: 'false', label: 'No' }
    // { value: 'Pending', label: 'Pending' }
  ]
  const selectkycstatushandler = (e) => {
    console.log('selectkycstatushandler', e.value)
    setselectkycstatusvalue(e.value)
  }
  const selectPGuuidHandler = (e) => {
    // setdetailsdisplay('block')
    setselectPGuuidvalue(e)
    console.log(e.value)
  }
  const selectserviceFlagHandler = (e) => {
    setselectserviceFlagvalue(e)
    console.log(e.value)
  }
  return (
    <Fragment>
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
              Company Name
              {/* <span style={{color:"red", fontSize:14, marginTop:-10}}>*</span> */}
            </Label>
            <Input
              name={`companyName`}
              id={`companyName`}
              placeholder='Company Name'
              innerRef={register({ required: true })}
              invalid={errors.companyName && true}
            />
            {/* {errors && errors.companyName && <FormFeedback>{errors.companyName.message}</FormFeedback>} */}

          </FormGroup>
        </Row>
        <Row>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`merchantType`}>
              Merchant Type
              {/* <span style={{color:"red", fontSize:14, marginTop:-10}}>*</span> */}
            </Label>
            <Input
              name={`merchantType`}
              id={`merchantType`}
              placeholder='Merchant Type'
              innerRef={register({ required: true })}
              invalid={errors.merchantType && true}
            />
            {/* {errors && errors.merchantType && <FormFeedback>{errors.merchantType.message}</FormFeedback>} */}

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
            {/* {errors && errors.logoUrl && <FormFeedback>{errors.logoUrl.message}</FormFeedback>} */}

          </FormGroup>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`kycStatus`}>
              KYC STATUS
            </Label>
            <Select
              // theme={selectThemeColors}
              isClearable={false}
              id='kycStatus'
              className='react-select'
              classNamePrefix='select'
              options={countryOptions}
              defaultValue={countryOptions[0]}
              onChange={selectkycstatushandler}
            // value={selectkycstatusvalue}
            />
          </FormGroup>
          <FormGroup tag={Col} md='6'>
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
          </FormGroup>
          {selectPGuuidvalue === "Select" ? null : <FormGroup tag={Col} md='6'>
              <Label>Enable Services</Label>
              <Select
                isClearable={false}
                id='servicestatus'
                className='react-select'
                classNamePrefix='select'
                options={serviceFlagoptions}
                onChange={selectserviceFlagHandler}
                value={selectserviceFlagvalue}
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              />
            </FormGroup>
          }
        </Row>
        <div className='d-flex justify-content-between'>
          {/* <Button.Ripple color='secondary' className='btn-prev' outline disabled>
            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button.Ripple> */}
          <Button.Ripple type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
          </Button.Ripple>
        </div>
      </Form>
    </Fragment>
  )
}

export default AccountDetails
