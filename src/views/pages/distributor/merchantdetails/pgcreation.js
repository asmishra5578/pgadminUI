
// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X, ArrowRight } from 'react-feather'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input, Row, Col, 
  Label, Card, CardHeader, CardTitle, CardBody, Form, FormFeedback
} from 'reactstrap'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'
// import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { toast } from 'react-toastify'

const createpg = ({ open, handleModal, parentCallback, disabledbtns }) => {
  // ** State
  // console.log("createpg----->", parentCallback)
  
  const countryOptions = [
    { value: 'YES', label: 'YES' },
    { value: 'NO', label: 'No' }
    // { value: 'Pending', label: 'Pending' }
  ]
  const [selectkycstatusvalue, setselectkycstatusvalue] = useState('Yes')

  const [selectedValue, setSelectedValue] = useState('Select')
  const selectkycstatushandler = (e) => {
    console.log('selectkycstatushandler', e.value)
    setselectkycstatusvalue(e.value)
  } 
  const SignupSchema = yup.object().shape({
    phoneNumber: yup.string().required('Phone number can not be empty').matches(/^[0-9]{10}$/, 'Phone number is not valid formate'),
    merchantName: yup.string().required('Merchant Name can not be empty'),
    emailId: yup.string().required('Email is required').matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Email not valid formate'),
    companyName: yup.string().required('Company Name can not be empty'),
    merchantType: yup.string().required('Merchant Type can not be empty'),
    supportEmailId: yup.string(),
    supportPhoneNo: yup.string(),
    logoUrl: yup.string()
  })
  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {
    console.log("dsadasd", data, selectkycstatusvalue)
    data.kycStatus = selectkycstatusvalue
    parentCallback(data)
    }
  const handleChange = e => {
    console.log('handlechange', e)
    setSelectedValue(e)
  }
  const [Picker, setPicker] = useState(new Date())

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Add Merchant</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <CardTitle tag='h4'>Configuration Merchant</CardTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormGroup tag={Col} md='12'>
            <Label className='form-label' for="merchantName">
              Merchant Name<span style={{color:"red", fontSize:14, marginTop:-10}}>*</span>
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
          <FormGroup tag={Col} md='12'>
            <Label className='form-label' for={`email`}>
              Email<span style={{color:"red", fontSize:14, marginTop:-10}}>*</span>
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
          <FormGroup tag={Col} md='12'>
            <Label className='form-label' for={`phoneNumber`}>
              Phone Number<span style={{color:"red", fontSize:14, marginTop:-10}}>*</span>
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
          <FormGroup tag={Col} md='12'>
            <Label className='form-label' for={`companyName`}>
              Company Name<span style={{color:"red", fontSize:14, marginTop:-10}}>*</span>
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
          <FormGroup tag={Col} md='12'>
            <Label className='form-label' for={`merchantType`}>
              Merchant Type<span style={{color:"red", fontSize:14, marginTop:-10}}>*</span>
            </Label>
            <Input
              name={`merchantType`}
              id={`merchantType`}
              placeholder='Distributor Type'
              innerRef={register({ required: true })}
              invalid={errors.merchantType && true}
            />
            {errors && errors.merchantType && <FormFeedback>{errors.merchantType.message}</FormFeedback>}
          </FormGroup>
          <FormGroup tag={Col} md='12'>
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
          <FormGroup tag={Col} md='12'>
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
          <FormGroup tag={Col} md='12'>
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
          <FormGroup tag={Col} md='12'>
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
            {/* {errors && errors.logoUrl && <FormFeedback>{errors.logoUrl.message}</FormFeedback>} */}

          </FormGroup>
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
  )
}

export default createpg

