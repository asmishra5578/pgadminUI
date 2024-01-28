
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
import Select from 'react-select'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { toast } from 'react-toastify'

const mainwalletrecharge = ({ open, handleModal, parentCallback, disabledbtns,
  selectmainwalletoptions, 
  selectmainwalletHandler,
  selectmainwalltetValue,
  getMainWalletBalance,
  resetmainwalletrechBtn
}) => {
  // ** State
  //   console.log("mainwalletrecharge----->", parentCallback)
  const [selectedValue, setSelectedValue] = useState('Reversal')

  const SignupSchema = yup.object().shape({
    purpose: yup.string(),
    amount: yup.string().required('Amount can not be empty'),
    // pgSaltKey: yup.string(),
    remarks: yup.string()
    // referenceId:yup.string()
    // pgAddInfo1: yup.string(),
    // pgAddInfo2: yup.string(),
    // pgAddInfo3: yup.string()
  })
  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {
    // parentCallback(data)
    data.transactionType = "BANK TRANSFER"
    console.log('reversal', data)

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
        <h5 className='modal-title'>Main Wallet Recharge</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <CardTitle tag='h4'>Wallet Recharge</CardTitle>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
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
            <span>Main Wallet Balance: {getMainWalletBalance}</span>
            {/* <span style={{ color: 'red' }}>{bankNameErrmsg}</span> */}
          </FormGroup>
          <FormGroup>
            <Label for='Amount'>Amount<span style={{ color: 'red', fontWeight: 'bold' }}>*</span></Label>
            <Input
              id='amount'
              name='amount'
              innerRef={register({ required: true })}
              invalid={errors.amount && true}
              placeholder='Amount'
            />
            {errors && errors.amount && <FormFeedback>{errors.amount.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='purpose'>Purpose</Label>
            <Input
              id='purpose'
              name='purpose'
              innerRef={register({ required: true })}
              invalid={errors.purpose && true}
              placeholder='Purpose'
            />
            {errors && errors.purpose && <FormFeedback>{errors.purpose.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='remarks'>Remarks</Label>
            <Input
              type='text'
              name='remarks'
              id='remarks'
              innerRef={register({ required: true })}
              invalid={errors.remarks && true}
              placeholder='Remarks'
            />
            {errors && errors.remarks && <FormFeedback>{errors.remarks.message}</FormFeedback>}
          </FormGroup>
          <FormGroup className='d-flex mb-0'>
            <Button.Ripple className='mr-1' color='primary' type='submit' disabled={disabledbtns}>
              Submit
            </Button.Ripple>
            <Button.Ripple outline color='secondary' type='reset' onClick={resetmainwalletrechBtn}
            >
              Reset
            </Button.Ripple>
          </FormGroup>
        </Form>

      </ModalBody>
    </Modal>
  )
}

export default mainwalletrecharge

