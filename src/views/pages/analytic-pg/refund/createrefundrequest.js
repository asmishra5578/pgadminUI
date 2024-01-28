
// ** React Imports
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import UILoader from '@components/ui-loader'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X, RotateCw, Delete } from 'react-feather'
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
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { toast } from 'react-toastify'
import requestsApi from './request'
// import UILoader from '@components/ui-loader'

const payrequestpage = ({ open, handleModal, parentCallback, paymentreuestbtndisabled, complainttypedata }) => {
  // ** State
  const history = useHistory()

  const requestsApidata = new requestsApi()
  const [filterdata, setfilterdata] = useState([])
  const [inputmerchantorderidvalue, setinputmerchantorderidvalue] = useState('')

  const [merchantdetailsdisplay, setmerchantdetailsdisplay] = useState('none')
  const [selectcomplaintsubtypevalue, setselectcomplaintsubtypevalue] = useState('')
  const [complainttextvalue, setcomplainttextvalue] = useState('')
  const [refuamubtndisabled, setrefuamubtndisabled] = useState(false)
  const [searchbtndisabled, setsearchbtndisabled] = useState(false)
  const [UIblock, setUIblock] = useState(false)
  const searchdatahandler = () => {

    //   parentCallback(sendata)
    if (inputmerchantorderidvalue === "") {
      toast.warning('Merchant orderID is required')
    } else {
      setUIblock(true)
      setsearchbtndisabled(true)
      requestsApidata.dateWiseTxnWithParameters(inputmerchantorderidvalue).then(res => {
        setsearchbtndisabled(false)
        setUIblock(false)
        if (res.data.successCode === 'API_SUCCESS') {
          if (res.data.extraData.transactionDetails.length === 0) {
            toast.warning('No data found')
          } else {
            setfilterdata(res.data.extraData.transactionDetails)
            setmerchantdetailsdisplay('block')
          }
          // setBlock(false)
        } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
          toast.error('Session expired')
          history.push('/')
        } else if (res.data.exception === "JWT_MISSING") {
          toast.error('Session expired')
          history.push('/')
        } else if (res.data.exception === "MERCHANT_ORDER_ID_VALIDATION") {
          toast.error(res.data.msg[0])
          // history.push('/')           
        }  else if (res.data.exception === "MERCHANT_ORDER_ID_NOT_FOUND") {
          toast.error(res.data.msg[0])
          // history.push('/')           
        }

      })
    }
  }


  const [Picker, setPicker] = useState(new Date())
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const recaptchaloaded = () => {
    // console.log("captcha is loaded successfully")
  }
  const searmerorderidinputhandler = (e) => {
    setinputmerchantorderidvalue(e.target.value)
    setmerchantdetailsdisplay('none')
  }
  const refundamounthandler = () => {
    // console.log('kkkkkkkk', filterdata)
    // handleModal()
    requestsApidata.CreateRefundRequestByAdmin(filterdata[0].merchantId, filterdata[0].merchantOrderId).then(res => {
      if (res.data.successCode === 'API_SUCCESS') {
        if (res.data.extraData.refundDetail.status === 'INITIATED') {
          toast.success('Merchant Refund Details Updated Successfully')
        } else {
          toast.success(res.data.msg[0])
        }
        // setBlock(false)
      } else if (res.data.exception === "REFUND_INITIATE_FAILED") {
        toast.error(res.data.msg[0])
      } else if (res.data.exception === "MERCHANT_ORDER_ID_VALIDATION") {
        toast.error(res.data.msg[0])
      } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session expired')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session expired')
        history.push('/')
      }  else if (res.data.exception === "MERCHANT_ORDER_ID_NOT_FOUND") {
        toast.error(res.data.msg[0])
        // history.push('/')           
      }
    })
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
        <h5 className='modal-title'>New Record</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <CardTitle tag='h4'>Create Refund Request</CardTitle>
        <UILoader blocking={UIblock}>
        <FormGroup>
          <Label for='phonenumber'>Search by Merchant OrderID</Label>
          <Input
            id='phonenumber'
            name='phonenumber'
            placeholder='Merchant Order ID'
            type='number'
            onChange={searmerorderidinputhandler}
            value={inputmerchantorderidvalue}
          />
        </FormGroup>
        </UILoader>
        <div>
            <Button color='primary' onClick={searchdatahandler} disabled={searchbtndisabled}>Search</Button>
        </div>
        <div style={{ display: merchantdetailsdisplay, marginTop: 20 }}>
          {filterdata.map((v) => {
            return <div>
              <h6>Merchant Order ID: {v.merchantOrderId}</h6>
              <p>Merchant ID: {v.merchantId}</p>
              <p>Amount: {v.amount}</p>
              <p>Transaction Time: {v.created}</p>
              <p>Transaction Messege: {v.refundMsg}</p>
              <p>PaymentOption: {v.paymentOption}</p>
              <p>Status: {v.status}</p>
            </div>
          })}
          <div>
            <Button color='primary' onClick={refundamounthandler} disabled={refuamubtndisabled}>Refund Amount</Button>

          </div>
        </div>
        {/* <FormGroup className='d-flex mb-0'>
            <Button.Ripple className='mr-1' color='primary' type='submit' disabled={paymentreuestbtndisabled} onClick={searchdatahandler}>
              Submit
            </Button.Ripple>
          </FormGroup> */}

      </ModalBody>
    </Modal>
  )
}

export default payrequestpage
