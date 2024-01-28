// ** React Imports

// ** Third Party Components
import Select from 'react-select'
import { Edit2, Edit3, Trash2, X } from 'react-feather'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  Label, CardTitle, Form, FormFeedback, ModalFooter, Row, Col, Badge, Spinner
} from 'reactstrap'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { selectThemeColors } from '@utils'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { useState } from 'react'
import { toast } from 'react-toastify'
const accountTransfer = ({ open, upihandlerModal, parentaccounttra, disabledaccountbtn, displayACCOUNTloading }) => {
  const SignupSchema = yup.object().shape({
    internalOrderId: yup.string().required('Order ID is required'),
    // utrid: yup.string().required('Utr ID is required'),
    // referenceId: yup.string(),
    transactionMessage: yup.string(),
    comment: yup.string()
  })
  const { register, errors, reset, handleSubmit, setValue } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
  const [dataarray, setdataarray] = useState([])
  const [UPIisverified, setUPIisverified] = useState(false)
  const [UPIverifiedtoken, setUPIverifiedtoken] = useState(true)
  const [selectedValue, setSelectedValue] = useState("Select")
  const handleChange = e => {
    setSelectedValue(e)
  }
  const countryOptions = [
    { value: 'SUCCESS', label: 'SUCCESS' },
    { value: 'FAILED', label: 'FAILED' },
    { value: 'PENDING', label: 'PENDING' }
]

  const onSubmit = data => {
    if (selectedValue === "Select") {
      toast.warning('Select Transaction Status')
    } else {
      if (dataarray.length >= 10) {
        toast.warning('Maximum 10 upi transafer at a time')
      } else {
        data.transactionStatus = selectedValue.value
        data.callBackFlag = ""
        reset()
        dataarray.push(data)
        setSelectedValue('Select')
        console.log('dataarrray', dataarray)
      }
    }
  }
  const finalsubmitdataHandler = () => {
    if (dataarray.length === 0) {
      toast.warning('At least add one transaction update data')
    } else if (dataarray.length >= 10) {
      toast.warning('Maximum 10 upi transafer at a time')
    } else {
      console.log('final data', dataarray)
        parentaccounttra(dataarray)
        setdataarray([])
        console.log('final data', dataarray)
    }
  }
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={upihandlerModal} />
  const editDataHandler = (e) => {
    console.log('editDataHandler', e.target.id, dataarray)
    const filterdata = dataarray.filter((el) => el.internalOrderId === e.target.id)
    console.log('filterdata', filterdata)
    if (filterdata.length === 0) {

    } else {
      console.log('filterdata', filterdata[0])
      setValue('internalOrderId', filterdata[0].internalOrderId)
      // setValue('utrid', filterdata[0].utrid)
      setValue('transactionMessage', filterdata[0].transactionMessage)
      setValue('transactionStatus', filterdata[0].transactionStatus)
      setValue('comment', filterdata[0].comment)
      // setValue('referenceId', filterdata[0].referenceId)

      const filterdataagain = dataarray.filter((el) => el.internalOrderId !== e.target.id)
      setdataarray(filterdataagain)
    }
  }
  const deleteDataHandler = (e) => {
    const filterdata = dataarray.filter((el) => el.internalOrderId !== e.target.id)
    setdataarray(filterdata)
    console.log('filterdata', filterdata, e.target.id)
  }

  return (
    <Modal
      isOpen={open}
      toggle={upihandlerModal}
      keyboard={false}
      backdrop={false}
      style={{ maxWidth: '70%', width: '100%' }}
    >
      <ModalHeader className='mb-3' toggle={upihandlerModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Update Transactions Status</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <CardTitle tag='h4'>Update Transaction Status (Max 10 data is allowed)</CardTitle>
        {dataarray.length === 0 ? <div></div> : <div>
          <table border='1' width="100%">
            <tr>
              <th>Order ID</th>
              {/* <th>UTR ID</th>
              <th>Reference Id</th> */}
              <th>Transaction Messege</th>
              <th>Comment</th>
              <th>Transaction Status</th>
              {/* <th>Request Type</th> */}
              <th>Action</th>
            </tr>
            {/* <tr>
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                        </tr> */}
            {dataarray.map((v, k) => {
              return <tr>
                <td>{v.internalOrderId}</td>
                {/* <td>{v.utrid}</td>
                <td>{v.referenceId}</td> */}
                <td>{v.transactionMessage}</td>
                <td>{v.comment}</td>
                <td>{v.transactionStatus}</td>
                <td>
                  <span style={{ cursor: 'pointer', color:'green' }} id={v.internalOrderId} onClick={editDataHandler}>Edit</span>
                  <span  style={{ marginLeft: 10, cursor: 'pointer', color:'red' }} onClick={deleteDataHandler} id={v.internalOrderId}>Delete</span>
{/* 
                  <Edit2 style={{ cursor: 'pointer' }} id={`${v.internalOrderId} + 'ok'`} onClick={editDataHandler} /> 
                  <span onClick={deleteDataHandler} id={v.internalOrderId}><Trash2  style={{ marginLeft: 10, cursor: 'pointer' }} /> </span> */}
                </td>
              </tr>
            })}
          </table>
        </div>}
        <div style={{ marginTop: 20 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <FormGroup tag={Col} md='2'>
                <Label for='internalOrderId'>Order ID</Label>
                <Input
                  type='text'
                  id='internalOrderId'
                  name='internalOrderId'
                  placeholder='Order ID'
                  invalid={errors.internalOrderId && true}
                  innerRef={register({ required: true })}
                />
                {errors && errors.internalOrderId && <FormFeedback>{errors.internalOrderId.message}</FormFeedback>}
              </FormGroup>

              <FormGroup tag={Col} md='2'>
                <Label for='transactionMessage'>Transaction Messege</Label>
                <div>
                  <Input
                    id='transactionMessage'
                    name='transactionMessage'
                    innerRef={register({
                      required: true
                    })}
                    invalid={errors.transactionMessage && true}
                    placeholder='Transaction Messege'
                  />
                  {errors && errors.transactionMessage && <FormFeedback>{errors.transactionMessage.message}</FormFeedback>}
                </div>
              </FormGroup>

              <FormGroup tag={Col} md='2'>
                <Label for='comment'>Comment</Label>
                <div>
                  <Input
                    id='comment'
                    name='comment'
                    innerRef={register({
                      required: true
                    })}
                    invalid={errors.comment && true}
                    placeholder='Comment'
                  />
                  {errors && errors.comment && <FormFeedback>{errors.comment.message}</FormFeedback>}
                </div>
              </FormGroup>


              {/* <FormGroup tag={Col} md='2'>
                <Label for='utrid'>UTR ID</Label>
                <Input
                  type='text'
                  id='utrid'
                  name='utrid'
                  innerRef={register({ required: true })}
                  invalid={errors.utrid && true}
                  placeholder='UTR ID'
                />
                {errors && errors.utrid && <FormFeedback>{errors.utrid.message}</FormFeedback>}
              </FormGroup> */}
              <FormGroup tag={Col} md='2'>
                <Label className='form-label' for={`kycStatus`}>
                  Select Status<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
                </Label>
                <Select
                  // theme={selectThemeColors}
                  isClearable={false}
                  id='kycStatus'
                  className='react-select'
                  classNamePrefix='select'
                  options={countryOptions}
                  onChange={handleChange}
                  value={selectedValue}
                />

              </FormGroup>

              {/* <FormGroup tag={Col} md='2'>
                <Label for='utrid'>utrid</Label>
                <Input
                  type='number'
                  id='utrid'
                  name='utrid'
                  innerRef={register({ required: true })}
                  invalid={errors.utrid && true}
                  placeholder='utrid'
                />
                {errors && errors.utrid && <FormFeedback>{errors.utrid.message}</FormFeedback>}
              </FormGroup> */}
              {/* <FormGroup tag={Col} md='2'>
                <Label for='referenceId'>Reference ID</Label>
                <Input
                  // type='number'
                  id='referenceId'
                  name='referenceId'
                  innerRef={register({ required: true })}
                  invalid={errors.referenceId && true}
                  placeholder='Reference ID'
                />
                {errors && errors.referenceId && <FormFeedback>{errors.referenceId.message}</FormFeedback>}
              </FormGroup> */}


              <FormGroup tag={Col} md='2'>
                <div style={{ marginTop: 22 }}>
                  <Button.Ripple color='primary' type='submit' >
                    Add Data
                  </Button.Ripple>
                </div>
              </FormGroup>
            </Row>

            <ModalFooter>
              <FormGroup className='d-flex mb-0'>
                <Button.Ripple color='primary' onClick={finalsubmitdataHandler} disabled={disabledaccountbtn}>
                  Final Submit {displayACCOUNTloading === true ? <Spinner size='sm' color='success' /> : null}
                </Button.Ripple>
                <Button.Ripple style={{ marginLeft: 10 }} onClick={upihandlerModal} outline color='secondary'>
                  Cancel
                </Button.Ripple>
              </FormGroup>
            </ModalFooter>
          </Form>

        </div>
      </ModalBody>
    </Modal>
  )
}

export default accountTransfer
