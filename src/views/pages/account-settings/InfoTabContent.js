import { useState, Fragment } from 'react'
import { isObjEmpty } from '@utils'
import Avatar from '@components/avatar'
import { Link, User } from 'react-feather'
import { Form, Label, Input, Button, Row, Col, FormGroup } from 'reactstrap'
import requestsApi from './request'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const SocialTabContent = ({ data }) => {
const requestsApidata = new requestsApi()
const commacountregex = /^([^,]*,){0,9}[^,]*$/

  const [orderidsvalue, setorderidsvalue] = useState('')
  const [submitbtndisabled, setsubmitbtndisabled] = useState(true)
  const orderidsvalueHandler = (e) => {
    setorderidsvalue((e.target.value).trim())
    setsubmitbtndisabled(false)
}

  const savechangesHandler = () => {
    if (!commacountregex.test(orderidsvalue)) {
      toast.warning('Maximum 10 order id is required')
     } else {
 console.log('dadada', orderidsvalue)
 const array = orderidsvalue.split(',')
console.log('array', array)
  requestsApidata.enablepayincallBack(array).then((res) => {
    console.log('res.data', res.data)
    if (res.data.successCode === "API_SUCCESS") {
      Swal.fire({icon:'success', text:res.data.msg[0]}).then(() => {
        setorderidsvalue('')
      })
    }
  }) 
  }
}
  return (
    <Fragment>
      <h6>Enable Call back for Payin</h6>
      <Row>
        <FormGroup tag={Col} md='12'>
          <Label className='form-label' for={`orderIds`}>
            Order ID's seperate by comma(Maximum ids 10)<span style={{ color: "red", fontSize: 14, marginTop: -10 }}>*</span>
          </Label>
          <Input type='textarea' rows='2' id='orderIds'
            name={`orderIds`}
            placeholder='Max 10 Order IDs you entered'
            onChange={orderidsvalueHandler}
            value={orderidsvalue}
          />
        </FormGroup>
      </Row>

      <Button.Ripple color='primary' onClick={savechangesHandler} disabled={submitbtndisabled}>
        Submit Data
      </Button.Ripple>

    </Fragment>
  )
}

export default SocialTabContent
