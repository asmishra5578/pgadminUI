import * as yup from 'yup'
// import { Fragment, useState } from 'react'
import classnames from 'classnames'
import { isObjEmpty } from '@utils'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Label, Input, FormGroup, Row, Col, Button, FormFeedback } from 'reactstrap'
import st from '../../../../@core/secureStore/useSecure'
import requestsApi from './request'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'

const requestsApidata = new requestsApi()

const SocialLinks = ({ stepper }) => {
  const SignupSchema = yup.object().shape({
    // [`bankName`]: yup.string().required('Bank Name can not be empty').matches((/^([a-zA-Z]+\s)*[a-zA-Z]+$/), 'Bank name not valid'),
    [`bankIFSCCode`]: yup.string().required('Bank IFSC code can not be empty').matches((/^[A-Z]{4}0[A-Z0-9]{6}$/), 'IFSC code not valid'),
    [`accountNo`]: yup.string().required('Account number can not be empty').matches((/^[0-9]{9,18}$/), 'Accont number not valid'),
    [`city`]: yup.string().required('City can not be empty').matches((/^([a-zA-Z]+\s)*[a-zA-Z]+$/), 'City not valid'),
    [`micrCode`]: yup.string().required('Micr Code required').matches(/^\d{9}$/, 'Micr Code is not valid formate')
  })
  const history = useHistory()
  const [bankName, setbankName] = useState('Select')

  const [getbanklistdata, setgetbanklistdata] = useState([])
  const bankNameHandler = (e) => {
    console.log(e)
    setbankName(e)
    // setbankNameErrmsg('')
    // if (!banknameregex.test(e.target.value)) {
    //   setbankNameErrmsg('Bank Name is not valid')
    // }
  }
  const { register, errors, handleSubmit, trigger } = useForm({
    mode: 'onChange', resolver: yupResolver(SignupSchema)
  })

  const onSubmit = (data) => {
    // trigger()
    // if (isObjEmpty(errors)) {
    //   stepper.next()
    // }
    if (bankName === "Select") {
    toast.warning('Select bank')
    } else {
    const sendmerchantid = st.get('merchantid')
    data.bankName = bankName.value
    // console.log(data)
    requestsApidata.createBankDetails(data, sendmerchantid).then(res => {
      console.log('res', res.data)
      if (res.data.exception === "EMAIL_ID_NOT_FOUND") {
        Swal.fire({ text: "Merchant not found / Mapped with provided emailid" }).then(() => {
        })
      } else if (res.data.exception === "MERCHANT_BANK_DETAILS_EXISTS") {
        Swal.fire({ text: "Merchant Bank details already exists" }).then(() => {
        })
      } else {
        Swal.fire({ text: "Bank details created Successfully" }).then(() => {
          history.push('/pg/merchantdetails')
        })
      }

    })
  }
}

  const routetomerhantDetails = () => {
    history.push('/pg/merchantdetails')
  }
  const getgetBankList = () => {
    requestsApidata.getBankList().then(res => {
      // console.log('res.data', res.data)
      if (res.data.successCode === "API_SUCCESS") {
        setgetbanklistdata(res.data.extraData.bankDetail)
      }
    }) 
  }
  useEffect(() => {
    // requestsApidata.pgdetailslinkmerchant().then(res => {
    //   console.log('res.data', res.data)
    //   if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
    //     toast.error("Session Expired login again!")
    //     props.history.push("/")
    //   }
    //   })
    // getallmerchantreport()
    getgetBankList()
  }, [])
  const countryOptions =
    getbanklistdata.map((v) => {
      return { value: v.bankname, label: v.bankname }
    })
  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Merchant Bank Details</h5>
        <small className='text-muted'>Enter Bank Details</small>
      </div>
      <FormGroup tag={Col} md='6'>
        <div style={{marginLeft:-14}}>
        <Label className='form-label' for={`bankName`}>
        Select Bank 
        </Label>
        <Select
          isClearable={false}
          id='kycStatus'
          className='react-select'
          classNamePrefix='select'
          options={countryOptions}
          //   defaultValue={countryOptions[0]}
          onChange={bankNameHandler}
          value={bankName}
        />
        </div>
      </FormGroup>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>

          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`bankIFSCCode`}>
              Bank IFSC Code
            </Label>
            <Input
              name={`bankIFSCCode`}
              id={`bankIFSCCode`}
              placeholder='Bank IFSC Code'
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors[`bankIFSCCode`] })}
            />
            {errors && errors.bankIFSCCode && <FormFeedback>{errors.bankIFSCCode.message}</FormFeedback>}
          </FormGroup>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`accountNo`}>
              Account Number
            </Label>
            <Input
              name={`accountNo`}
              id={`accountNo`}
              placeholder='Account Number'
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors[`accountNo`] })}
            />
            {errors && errors.accountNo && <FormFeedback>{errors.accountNo.message}</FormFeedback>}
          </FormGroup>
        </Row>
        <Row>
       
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`city`}>
              City
            </Label>
            <Input
              name={`city`}
              id={`city`}
              placeholder='City'
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors[`city`] })}
            />
            {errors && errors.city && <FormFeedback>{errors.city.message}</FormFeedback>}
          </FormGroup>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`micrCode`}>
              Micr Code
            </Label>
            <Input
              name={`micrCode`}
              id={`micrCode`}
              placeholder='Micr Code'
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors[`micrCode`] })}
            />
            {errors && errors.micrCode && <FormFeedback>{errors.micrCode.message}</FormFeedback>}
          </FormGroup>
        </Row>
        <Row>
         
        </Row>
        <div className='d-flex justify-content-between'>
          {/* <Button.Ripple color='secondary' className='btn-prev' outline disabled>
            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button.Ripple> */}
          <Button.Ripple type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>SUBMIT</span>
            {/* <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight> */}
          </Button.Ripple>
          <Button.Ripple color='warning' onClick={routetomerhantDetails}>
            <span className='align-middle d-sm-inline-block d-none'>SKIP</span>
            <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
          </Button.Ripple>
        </div>
      </Form>
    </Fragment>
  )
}
export default SocialLinks