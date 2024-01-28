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
const accountTransfer = ({ open, accounthandleModal, parentaccounttra}) => {
  // ** State
  const SignupSchema = yup.object().shape({
    // email: yup.string().email().required(),
    phonenumber:yup.string().min(10).required(), 
    amount:yup.string().min(1).required(), 
    bankaccount:yup.string().min(5).required(), 
    ifsc:yup.string().min(6).required(), 
    beneficiaryName:yup.string().min(3).required()
  })
  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
 // let selectval = ""

  
  const [Picker, setPicker] = useState(new Date())
  const [selectedValue, setSelectedValue] = useState("NEFT")
  const handleChange = e => {
    setSelectedValue(e.value)
  }
  const onSubmit = data => {
    data.requestType = selectedValue
    parentaccounttra(data)
  }
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={accounthandleModal} />

  return (
    <Modal
      isOpen={open}
      toggle={accounthandleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={accounthandleModal} close={CloseBtn} tag='div'>
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
            <Label for='phonenumber'>Phone Number</Label>
               <Input
               type='number'
              id='phonenumber'
              name='phonenumber'
              placeholder='Phone Number'
              invalid={errors.phonenumber && true}
              innerRef={register({ required: true })}
            />
            {errors && errors.phonenumber && <FormFeedback>{errors.phonenumber.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='amount'>Amount</Label>
            <Input
            type='number'
              id='amount'
              name='amount'
              innerRef={register({ required: true })}
              invalid={errors.amount && true}
              placeholder='Amount'
            />
            {errors && errors.amount && <FormFeedback>{errors.amount.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='bankaccount'>Bank Account</Label>
            <Input
              id='bankaccount'
              name='bankaccount'
              innerRef={register({ required: true })}
              invalid={errors.bankaccount && true}
              placeholder='Bank Account'
            />
            {errors && errors.bankaccount && <FormFeedback>{errors.bankaccount.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='ifsc'>IFSC</Label>
            <Input
              id='ifsc'
              name='ifsc'
              innerRef={register({ required: true })}
              invalid={errors.ifsc && true}
              placeholder='IFSC'
            />
            {errors && errors.ifsc && <FormFeedback>{errors.ifsc.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='beneficiaryName'>Beneficiary Name</Label>
            <Input
              id='beneficiaryName'
              name='beneficiaryName'
              innerRef={register({ required: true })}
              invalid={errors.beneficiaryName && true}
              placeholder='Beneficiary Name'
            />
            {errors && errors.beneficiaryName && <FormFeedback>{errors.beneficiaryName.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
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
          </FormGroup>

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

export default accountTransfer
