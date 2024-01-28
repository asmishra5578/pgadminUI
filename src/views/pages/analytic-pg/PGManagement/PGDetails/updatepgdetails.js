
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

const updatepg = ({ open, handleModal, parentCallback, disabledbtns, PGnamealready, PGuuidselect }) => {
  // ** State
  // console.log("updatepg----->", PGnamealready, PGuuidselect)
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

  const SignupSchema = yup.object().shape({
    pgAppId: yup.string(),
    // pgName: yup.string().required('PG Name can not be empty'),
    pgSaltKey: yup.string(),
    pgSecretKey: yup.string(),
    pgAddInfo1: yup.string(),
    pgAddInfo2: yup.string(),
    pgAddInfo3: yup.string(),
    pgDailyLimit: yup.string()
  })
  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {
    // console.log("dsadasd", selectedValue)
    
    // if (data.pgAppId === "" && data.pgSaltKey === "" && data.pgSecretKey === "") {
    //   toast.error('APPID, Salt key and Secret Key all can not be empty')
    // } else {
        data.pgName = PGnamealready
        data.pgUuid = PGuuidselect
    console.log("selectvaluearray", data)
    parentCallback(data)
    // console.log('data', data)
    
    // }
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
        <h5 className='modal-title'>UPDATE PG</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <CardTitle tag='h4'> <span style={{fontWeight:'bold'}}>{PGnamealready}</span></CardTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* <FormGroup>
            <Label for='pgName'>PG Name</Label>
            <Input
              id='pgName'
              name='pgName'
              innerRef={register({ required: true })}
              invalid={errors.pgName && true}
              placeholder='PG Name'
            />
            {errors && errors.pgName && <FormFeedback>{errors.pgName.message}</FormFeedback>}
          </FormGroup> */}
          <FormGroup>
            <Label for='pgAppId'>PG App ID</Label>
            <Input
              id='pgAppId'
              name='pgAppId'
              innerRef={register({ required: true })}
              invalid={errors.pgAppId && true}
              placeholder='PG App Id'
            />
            {errors && errors.pgAppId && <FormFeedback>{errors.pgAppId.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='pgSecretKey'>PG Secret Key</Label>
            <Input
              type='text'
              name='pgSecretKey'
              id='pgSecretKey'
              innerRef={register({ required: true })}
              invalid={errors.pgSecretKey && true}
              placeholder='PG Secret Key'
            />
            {errors && errors.pgSecretKey && <FormFeedback>{errors.pgSecretKey.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='pgAddInfo1'>Address Info 1</Label>
            <Input
              type='text'
              name='pgAddInfo1'
              id='pgAddInfo1'
              innerRef={register({ required: true })}
              invalid={errors.pgAddInfo1 && true}
              placeholder='AddInfo1'
            />
            {/* {errors && errors.pgSecretKey && <FormFeedback>{errors.pgSecretKey.message}</FormFeedback>} */}
          </FormGroup>
          <FormGroup>
            <Label for='pgAddInfo2'>Address Info 2</Label>
            <Input
              type='text'
              name='pgAddInfo2'
              id='pgAddInfo2'
              innerRef={register({ required: true })}
              invalid={errors.pgAddInfo2 && true}
              placeholder='AddInfo2'
            />
            {/* {errors && errors.pgSecretKey && <FormFeedback>{errors.pgSecretKey.message}</FormFeedback>} */}
          </FormGroup>
          <FormGroup>
            <Label for='pgAddInfo3'>Address Info 3</Label>
            <Input
              type='text'
              name='pgAddInfo3'
              id='pgAddInfo3'
              innerRef={register({ required: true })}
              invalid={errors.pgAddInfo3 && true}
              placeholder='AddInfo3'
            />
            {/* {errors && errors.pgSecretKey && <FormFeedback>{errors.pgSecretKey.message}</FormFeedback>} */}
          </FormGroup>
          <FormGroup>
            <Label for='pgSaltKey'>PG Salt Key</Label>
            <Input
              type='text'
              name='pgSaltKey'
              id='pgSaltKey'
              innerRef={register({ required: true })}
              invalid={errors.pgSaltKey && true}
              placeholder='PG Salt Key'
            />
            {errors && errors.pgSaltKey && <FormFeedback>{errors.pgSaltKey.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='pgDailyLimit'>PG Daily Limit</Label>
            <Input
              type='number'
              name='pgDailyLimit'
              id='pgDailyLimit'
              innerRef={register({ required: true })}
              invalid={errors.pgDailyLimit && true}
              placeholder='PG Daily Limit'
            />
            {errors && errors.pgDailyLimit && <FormFeedback>{errors.pgDailyLimit.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            {/* <Label for='pgServices'>PG Services</Label> */}
            {/* <Input
              type='text'
              id='pgServices'
              name='pgServices'
              innerRef={register({ required: true })}
              invalid={errors.pgServices && true}
              placeholder='pg Services'
            />
            {errors && errors.pgServices && <FormFeedback>{errors.pgServices.message}</FormFeedback>} */}
            {/* <Label for='pgServices'>PG Services</Label> */}
          
            {/* <Select
              isMulti
              isClearable={false}
              id='pgServices'
              className='react-select'
              classNamePrefix='select'
              options={countryOptions}
              // defaultValue={countryOptions[0]}
              onChange={handleChange}
              value={selectedValue}
            /> */}
          </FormGroup>

          <FormGroup className='d-flex mb-0'>
            <Button.Ripple className='mr-1' color='primary' type='submit' disabled={disabledbtns}>
              UPDATE
            </Button.Ripple>
            <Button.Ripple outline color='secondary' type='reset'>
              Reset
            </Button.Ripple>
          </FormGroup>
        </Form>

      </ModalBody>
    </Modal>
  )
}

export default updatepg

