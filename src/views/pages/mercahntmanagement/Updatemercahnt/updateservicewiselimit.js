import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import { useForm, Controller } from 'react-hook-form'
import { Label, Input, FormGroup, Row, Col, Button, Form } from 'reactstrap'
import { Fragment, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import '@styles/react/libs/flatpickr/flatpickr.scss'


const InfoTabContent = ({ data }) => {
  const [Bankinfo, setBankinfo] = useState([])
  const [modal, setModal] = useState(false)
  const handleModal = () => setModal(!modal)
  const onSubmit = data => trigger()
  return (
    <Fragment>
         <div>
           <h6>CASHFREE</h6>
           <p style={{width:400}}>NB <span>Limit</span> <Input placeholder="300"/></p>
           <p style={{width:400}}>CARD <span>Limit</span> <Input placeholder="400"/></p>
         </div>
         <div style={{marginTop:20}}>
           <h6>PAYTM</h6>
           <p style={{width:400}}>UPI <span>Limit</span> <Input placeholder="300"/></p>
           <p style={{width:400}}>Mastro <span>Limit</span> <Input placeholder="400"/></p>
         </div>
         <div className='d-flex justify-content-between' style={{marginTop:20}}>
          <Button.Ripple type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Submit</span>
            {/* <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight> */}
          </Button.Ripple>
        </div>
    </Fragment>
  )
}

export default InfoTabContent
