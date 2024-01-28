// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import { selectThemeColors } from '@utils'
import Select from 'react-select'

import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label, Card, CardHeader, CardTitle, CardBody, Form, FormFeedback
} from 'reactstrap'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
const requestypeOption = [
  { value: 'NEFT', label: 'NEFT' },
  { value: 'IMPS', label: 'IMPS' },
  { value: 'RTGS', label: 'RTGS' }
]
const updatebankdetails = ({ open, handleModal, parentCallback}) => {
  // ** State
  const SignupSchema = yup.object().shape({
    // email: yup.string().email().required(),
    accountNo:yup.string().min(5).required(), 
    micrCode:yup.string().min(1).required(), 
    city:yup.string().min(3).required(), 
    bankIFSCCode:yup.string().min(4).required(), 
    bankName:yup.string().min(3).required()
  })
  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
 // let selectval = ""

  
  const [Picker, setPicker] = useState(new Date())
  const [selectedValue, setSelectedValue] = useState("NEFT")
  const handleChange = e => {
    setSelectedValue(e.value)
  }
  const onSubmit = data => {
    // data.requestType = selectedValue
    parentCallback(data)
  }
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
        <h5 className='modal-title'>New Record</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      {/* <Card> */}
      {/* <CardHeader> */}
        <CardTitle tag='h4'>Account Transfer</CardTitle>
      {/* </CardHeader> */}
      {/* <CardBody> */}
        <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
            <Label for='accountNo'>Account Number</Label>
               <Input
               type='text'
              id='accountNo'
              name='accountNo'
              placeholder='Account Number'
              invalid={errors.accountNo && true}
              innerRef={register({ required: true })}
            />
            {errors && errors.accountNo && <FormFeedback>{errors.accountNo.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='micrCode'>Micr Code</Label>
            <Input
            type='text'
              id='micrCode'
              name='micrCode'
              innerRef={register({ required: true })}
              invalid={errors.micrCode && true}
              placeholder='Micr Code'
            />
            {errors && errors.micrCode && <FormFeedback>{errors.micrCode.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='city'>City</Label>
            <Input
              id='city'
              name='city'
              innerRef={register({ required: true })}
              invalid={errors.city && true}
              placeholder='City'
            />
            {errors && errors.city && <FormFeedback>{errors.city.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='bankIFSCCode'>Bank IFSC Code</Label>
            <Input
              id='bankIFSCCode'
              name='bankIFSCCode'
              innerRef={register({ required: true })}
              invalid={errors.bankIFSCCode && true}
              placeholder='bankIFSCCode'
            />
            {errors && errors.bankIFSCCode && <FormFeedback>{errors.bankIFSCCode.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='bankName'>Bank Name</Label>
            <Input
              id='bankName'
              name='bankName'
              innerRef={register({ required: true })}
              invalid={errors.bankName && true}
              placeholder='Bank Name'
            />
            {errors && errors.bankName && <FormFeedback>{errors.bankName.message}</FormFeedback>}
          </FormGroup>
          {/* <FormGroup>
            <Label for='requestType'>Request Type</Label>
            <Select
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              defaultValue={requestypeOption[0]}
              name='requestType'
              id='requestType'
              options={requestypeOption}
              isClearable
              onChange={handleChange}
            />
            {errors && errors.requestType && <FormFeedback>{errors.requestType.message}</FormFeedback>}
          </FormGroup> */}

         <FormGroup className='d-flex mb-0'>
            <Button.Ripple className='mr-1' color='primary' type='submit'>
              Submit
            </Button.Ripple>
            <Button.Ripple outline color='secondary' type='reset'>
              Reset
            </Button.Ripple>
          </FormGroup>
        </Form>
      {/* </CardBody>
    </Card> */}
    
        {/* <Button className='mr-1' color='primary' onClick={accounthandleModal}>
          Submit
        </Button>
        <Button color='secondary' onClick={accounthandleModal} outline>
          Cancel
        </Button> */}
      </ModalBody>
    </Modal>
  )
}

export default updatebankdetails
