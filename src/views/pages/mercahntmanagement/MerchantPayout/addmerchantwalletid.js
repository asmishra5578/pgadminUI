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
         <p>Add Merchant wallet id</p>
         <p style={{fontWeight:"bold"}}>Current Wallet ID- ragghusingh@ybl</p>
         <Input placeholder="Enter merchant wallet ID" style={{width:300}}/>
         <Button color='primary' style={{marginTop:20}}>Submit</Button>
    </Fragment>
  )
}

export default InfoTabContent
