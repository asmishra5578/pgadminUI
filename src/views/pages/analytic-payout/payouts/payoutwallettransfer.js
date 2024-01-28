// ** React Imports
import { useState } from 'react'

// ** Third Party Components
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

const payoutWallet = ({ open, handleModal, parentCallback}) => {
  // ** State
  // console.log("payoutWallet----->", parentCallback)

  const SignupSchema = yup.object().shape({
    amount: yup.string().min(1).required(),
    // firstName: yup.string().min(3).required(),
    phonenumber:yup.string().min(10).required()
  })
  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {
    // console.log(data)
  parentCallback(data)
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
        <h5 className='modal-title'>New Record</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      {/* <Card> */}
      {/* <CardHeader> */}
        <CardTitle tag='h4'>Wallet Transfer</CardTitle>
      {/* </CardHeader> */}
      {/* <CardBody> */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for='firstName'>Phone Number</Label>
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
            <Label for='Amount'>Amount</Label>
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
          {/* <FormGroup>
            <Label for='email'>Email</Label>
            <Input
              type='email'
              name='email'
              id='email'
              innerRef={register({ required: true })}
              invalid={errors.email && true}
              placeholder='bruce.wayne@email.com'
            />
            {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
          </FormGroup> */}
          {/* <FormGroup>
            <Label for='password'>Password</Label>
            <Input
              type='password'
              id='password'
              name='password'
              innerRef={register({ required: true })}
              invalid={errors.password && true}
              placeholder='password'
            />
            {errors && errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
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
    
        {/* <Button className='mr-1' color='primary' onClick={handleModal}>
          Submit
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Cancel
        </Button> */}
      </ModalBody>
    </Modal>
  )
}

export default payoutWallet
