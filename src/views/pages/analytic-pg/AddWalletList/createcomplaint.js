
// ** React Imports
import { useState, useEffect } from 'react'

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
import * as yup from 'yup'
// import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { toast } from 'react-toastify'
import Select from 'react-select'
import requestsApi from './request'

const payrequestpage = ({ open, handleModal, parentCallback, complainttypedata }) => {
  // ** State
  const history = useHistory()

  const requestsApidata = new requestsApi()
  const [selectcomplainttypevalue, setselectcomplainttypevalue] = useState('')
  const [selectcomplaintsubtypevalue, setselectcomplaintsubtypevalue] = useState('')
  const [paymentreuestbtndisabled, setpaymentreuestbtndisabled] = useState(false)
  const createtickethandler = () => {
    // console.log('createtickethandler', selectcomplainttypevalue, selectcomplaintsubtypevalue)
    if (selectcomplainttypevalue === "") {
      toast.warning('Complaint Type is required')
    } else if (selectcomplaintsubtypevalue === "") {
      toast.warning('Complaint Sub Type is required')
    } else {
      // const sendata = {
      //   complaintType:selectcomplainttypevalue,
      //   complaintSubType:selectcomplaintsubtypevalue
      // }
      // parentCallback(sendata)

      requestsApidata.createComplaintType(selectcomplainttypevalue).then(res => {
        console.log("createComplaintType", res.data)
        setpaymentreuestbtndisabled(true)
        if (res.data.successCode === 'API_SUCCESS') {
          if (res.data.extraData.complaintDetail.status === "ACTIVE") {
            requestsApidata.updateComplaintType(selectcomplainttypevalue, 'ACTIVE').then(resp => {
              if (resp.data.successCode === "API_SUCCESS") {
                if (resp.data.extraData.complaintDetail.status === "ACTIVE") {
                  requestsApidata.createComplaintSubType(selectcomplainttypevalue, selectcomplaintsubtypevalue).then(response => {
                    if (response.data.extraData.complaintDetail.status === "ACTIVE") {
                      requestsApidata.updateComplaintSubType(selectcomplainttypevalue, selectcomplaintsubtypevalue, "ACTIVE").then(output => {
                        if (output.data.successCode === "API_SUCCESS") {
                          if (output.data.extraData.complaintDetail.status === "ACTIVE") {
                            toast.success('Complaint and Sub Complaint type Created and Updated Successfully')
                            handleModal()
                            setpaymentreuestbtndisabled(false)
                          }
                        }
                      })
                    }
                  })
                }
              }
            })
          } else {
            setpaymentreuestbtndisabled(false)
            toast.warning('Server Error.Try after some time')
          }
        } else if (res.data.exception === "COMPLAINT_TYPE_EXISTS") {
          setpaymentreuestbtndisabled(false)
          toast.error(res.data.msg[0])
        } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
          toast.error('Session expired')
          history.push('/')
        } else if (res.data.exception === "JWT_MISSING") {
          toast.error('Session expired')
          history.push('/')
        }
        // res.data.status === 'PENDING' ? toast.success(`Link has been send to ${res.data.custEmail}`) : toast.error(`Server error try again:`)
      })
    }
  }


  const [Picker, setPicker] = useState(new Date())
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  const selectcomplainttypevalueHandler = (e) => {
    setselectcomplainttypevalue(e.target.value)
  }
  const selectcomplaintsubtypevalueHandler = (e) => {
    setselectcomplaintsubtypevalue(e.target.value)
  }
  const resetHandler = () => {
    setselectcomplainttypevalue('')
    setselectcomplaintsubtypevalue('')
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
        <CardTitle tag='h4'>Create Complaint Type</CardTitle>

        <FormGroup>
          <Label for='Name'>Complaint Type</Label>
          <Input
            type='text'
            name='email'
            id='email'
            placeholder='Complaint Type'
            onChange={selectcomplainttypevalueHandler}
            value={selectcomplainttypevalue}
          />
        </FormGroup>
        <FormGroup>
          <Label for='phonenumber'>Complaint SubType</Label>
          <Input
            type='text'
            name='email'
            id='email'
            placeholder='Complaint Sub Type'
            onChange={selectcomplaintsubtypevalueHandler}
            value={selectcomplaintsubtypevalue}
          />
        </FormGroup>
        <FormGroup className='d-flex mb-0'>
          <Button.Ripple className='mr-1' color='primary' type='submit' disabled={paymentreuestbtndisabled} onClick={createtickethandler}>
            Submit
          </Button.Ripple>
          <Button.Ripple outline color='secondary' type='reset' onClick={resetHandler}>
            <RotateCw size={10} />
          </Button.Ripple>
        </FormGroup>

      </ModalBody>
    </Modal>
  )
}

export default payrequestpage

