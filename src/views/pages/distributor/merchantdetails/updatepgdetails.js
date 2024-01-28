
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
import Select from 'react-select'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { toast } from 'react-toastify'

const updatepg = ({ open, handleModal, parentCallback, disabledbtns, PGnamealready }) => {
  // ** State
  console.log("updatepg----->", PGnamealready)
  const countryOptions = [
    { value: 'WALLET', label: 'WALLET' },
    { value: 'UPI', label: 'UPI' },
    { value: 'UPI_QR', label: 'UPI_QR' },
    { value: 'NB', label: 'NB' },
    { value: 'CARD', label: 'CARD' },
    { value: 'EMI', label: 'EMI' },

    { value: 'GPAY', label: 'GPAY' }
    // { value: 'MASTRO', label: 'Mastro' },
    // { value: 'RUPAY', label: 'Rupay' }
  ]
  const [selectedValue, setSelectedValue] = useState('Select')
  const [email, setemail] = useState('')  
  const [merchantname, setmerchantname] = useState('')
  const [phonenumber, setphonenumber] = useState('')
  const emailHandler = (e) => {
    setemail(e.target.value)
  }   
  const merchantnameHandler = (e) => {
    setmerchantname(e.target.value)
  }
  const phonenumberHandler = (e) => {
    setphonenumber(e.target.value)
  }
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const updatedetailsHandler = () => {
    if (email === "") {
      toast.warning('email can not be empty')
    } else if (merchantname === "") {
      toast.warning('Merchant name can not be empty')
    } else if (phonenumber === "") {
      toast.warning('Phone number can not be empty')
    }     
  }
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>UPDATE Merchant</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <CardTitle tag='h4'> <span style={{ fontWeight: 'bold' }}>{PGnamealready}</span></CardTitle>
      
        <FormGroup>
          <Label for='pgAddInfo1'>Email</Label>
          <Input
            type='text'
            placeholder='Email'
            value={email}
            onChange={emailHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for='pgAddInfo3'>Merchant Name</Label>
          <Input
            type='text'
            placeholder='Merchant Name'
            value={merchantname}
            onChange={merchantnameHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for='pgAddInfo2'>Phone Number</Label>
          <Input
            type='text'
            placeholder='Phone Number'
            value={phonenumber}
            onChange={phonenumberHandler}
          />
        </FormGroup>
        <FormGroup className='d-flex mb-0'>
          <Button.Ripple className='mr-1' color='primary' type='submit' disabled={disabledbtns} onClick={updatedetailsHandler}>
            UPDATE
          </Button.Ripple>
          <Button.Ripple outline color='secondary' type='reset'>
            Reset
          </Button.Ripple>
        </FormGroup>
      </ModalBody>
    </Modal>
  )
}

export default updatepg

