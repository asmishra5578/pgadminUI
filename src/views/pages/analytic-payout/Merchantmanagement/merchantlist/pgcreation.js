
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
import { useHistory } from 'react-router-dom'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { toast } from 'react-toastify'

const createpg = ({ open, handleModal, parentCallback, disabledbtns }) => {
  // ** State
  // console.log("createpg----->", parentCallback)
  const history = useHistory()

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
    pgName: yup.string().required('PG Name can not be empty'),
    pgSaltKey: yup.string(),
    pgSecretKey: yup.string(),
    pgAddInfo1: yup.string(),
    pgAddInfo2: yup.string(),
    pgAddInfo3: yup.string(),
    pgAddInfo4: yup.string(),
    pgAddInfo5: yup.string(),
    pgAddInfo6: yup.string(),
    pgAddInfo7: yup.string(),
    pgAddInfo8: yup.string(),
    pgAddInfo9: yup.string(),
    pgAddInfo10: yup.string()
  })
  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {
    // console.log("dsadasd", selectedValue)
    
    if (data.pgAppId === "" && data.pgSaltKey === "" && data.pgSecretKey === "") {
      toast.error('APPID, Salt key and Secret Key all can not be empty')
    } else if (data.pgAppId === "" && data.pgSaltKey === "") {
      toast.error('Any two fields are required (AppID, SaltKey, Secret Key)')
    }  else if (data.pgSaltKey === "" && data.pgSecretKey === "") {
      toast.error('Any two fields are required (AppID, SaltKey, Secret Key)')
    }  else if (data.pgAppId === "" && data.pgSecretKey === "") {
      toast.error('Any two fields are required (AppID, SaltKey, Secret Key)')
    }  else if (selectedValue === "Select") {
      toast.error('Select Service')
    } else {
      const selectvaluearray = []
    selectedValue.map((v) => {
      selectvaluearray.push(v.value)
    })
    data.pgServices = selectvaluearray
    console.log("selectvaluearray", data)
    parentCallback(data)
    // console.log('data', data)
    
    }
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
        <h5 className='modal-title'>Add PG</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <CardTitle tag='h4'>PG Configuration</CardTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for='pgName'>PG Name</Label>
            <Input
              id='pgName'
              name='pgName'
              innerRef={register({ required: true })}
              invalid={errors.pgName && true}
              placeholder='PG Name'
            />
            {errors && errors.pgName && <FormFeedback>{errors.pgName.message}</FormFeedback>}
          </FormGroup>
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
            <Label for='pgAddInfo1'>Additional info 1</Label>
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
            <Label for='pgAddInfo2'>Additional info 2</Label>
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
            <Label for='pgAddInfo3'>Additional info 3</Label>
            <Input
              type='text'
              name='pgAddInfo3'
              id='pgAddInfo3'
              innerRef={register({ required: true })}
              invalid={errors.pgAddInfo3 && true}
              placeholder='AddInfo3'
            />
          </FormGroup>
          <FormGroup>
            <Label for='pgAddInfo4'>Additional info 4</Label>
            <Input
              type='text'
              name='pgAddInfo4'
              id='pgAddInfo4'
              innerRef={register({ required: true })}
              invalid={errors.pgAddInfo4 && true}
              placeholder='AddInfo4'
            />
          </FormGroup><FormGroup>
            <Label for='pgAddInfo5'>Additional info 5</Label>
            <Input
              type='text'
              name='pgAddInfo5'
              id='pgAddInfo5'
              innerRef={register({ required: true })}
              invalid={errors.pgAddInfo5 && true}
              placeholder='AddInfo5'
            />
          </FormGroup><FormGroup>
            <Label for='pgAddInfo6'>Additional info 6</Label>
            <Input
              type='text'
              name='pgAddInfo6'
              id='pgAddInfo6'
              innerRef={register({ required: true })}
              invalid={errors.pgAddInfo6 && true}
              placeholder='AddInfo6'
            />
          </FormGroup><FormGroup>
            <Label for='pgAddInfo7'>Additional info 7</Label>
            <Input
              type='text'
              name='pgAddInfo7'
              id='pgAddInfo7'
              innerRef={register({ required: true })}
              invalid={errors.pgAddInfo7 && true}
              placeholder='AddInfo7'
            />
          </FormGroup><FormGroup>
            <Label for='pgAddInfo3'>Additional info 8</Label>
            <Input
              type='text'
              name='pgAddInfo8'
              id='pgAddInfo8'
              innerRef={register({ required: true })}
              invalid={errors.pgAddInfo8 && true}
              placeholder='AddInfo8'
            />
          </FormGroup><FormGroup>
            <Label for='pgAddInfo3'>Additional info 9</Label>
            <Input
              type='text'
              name='pgAddInfo9'
              id='pgAddInfo9'
              innerRef={register({ required: true })}
              invalid={errors.pgAddInfo9 && true}
              placeholder='AddInfo9'
            />
          </FormGroup><FormGroup>
            <Label for='pgAddInfo10'>Additional info 10</Label>
            <Input
              type='text'
              name='pgAddInfo10'
              id='pgAddInfo10'
              innerRef={register({ required: true })}
              invalid={errors.pgAddInfo10 && true}
              placeholder='AddInfo10'
            />
          </FormGroup>
         
          <FormGroup>
            <Label for='pgServices'>PG Services</Label>
            {/* <Input
              type='text'
              id='pgServices'
              name='pgServices'
              innerRef={register({ required: true })}
              invalid={errors.pgServices && true}
              placeholder='pg Services'
            />
            {errors && errors.pgServices && <FormFeedback>{errors.pgServices.message}</FormFeedback>} */}
            <Select
              isMulti
              isClearable={false}
              id='pgServices'
              className='react-select'
              classNamePrefix='select'
              options={countryOptions}
              // defaultValue={countryOptions[0]}
              onChange={handleChange}
              value={selectedValue}
            />
          </FormGroup>

          <FormGroup className='d-flex mb-0'>
            <Button.Ripple className='mr-1' color='primary' type='submit' disabled={disabledbtns}>
              Submit
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

export default createpg

