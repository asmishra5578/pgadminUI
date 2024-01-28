// import { Fragment, useState, forwardRef, useEffect } from 'react'
// import UILoader from '@components/ui-loader'
// import moment from "moment"
// import * as yup from 'yup'
// import { useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'

// import requestsApi from '../requests'
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"
// import ReactPaginate from 'react-paginate'
// import DataTable from 'react-data-table-component'
// import Datatablecomponent from '../../../../layouts/components/Datatablecomponent'
// import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   Button,
//   UncontrolledButtonDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Input,
//   Label,
//   Row,
//   Form, FormGroup, FormFeedback,
//   Col
// } from 'reactstrap'
// import { toast } from 'react-toastify'

// const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
//   <div className='custom-control custom-checkbox'>
//     <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
//     <label className='custom-control-label' onClick={onClick} />
//   </div>
// ))
// const requestsApidata = new requestsApi()

// const DataTableWithButtons = () => {
//     const SignupSchema = yup.object().shape({
//         email: yup.string().email().required(),
//         phonenumber: yup.string().min(10).required(),
//         Name: yup.string().min(3).required(),
//         amount: yup.string().min(1).required(),
//         linkexpire: yup.string().min(1).required(),
//         orderNote:yup.string().min(1).required()
//       })

//       const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

//       const onSubmit = data => {
//         console.log("data", data)
//         requestsApidata.paymentrequestApi(data.Name, data.phonenumber, data.email, data.amount, data.linkexpire, data.orderNote).then(res => {
//           console.log("final resonse", res.data)
//         res.data.status === 'PENDING' ? toast.success(`Link has been send to ${res.data.custEmail}`) : toast.error(`Server error try again:`)
//         })
//       }
//   const [startDate, setstartDate] = useState('')
//   const [searchStartDate, setsearchStartDate] = useState('')
//   const [endDate, setendDate] = useState('') 
//   const [searchEndDate, setsearchEndDate] = useState('') 
//   const [block, setBlock] = useState(true)
//   const [modal, setModal] = useState(false)
//   const [currentPage, setCurrentPage] = useState(0)
//   const [searchValue, setSearchValue] = useState('')
//   const [filteredData, setFilteredData] = useState([])
//   const [data, setdata] = useState([])
//   return (
//     <Fragment>
//  <Card style={{width:"30%", padding:20}}>
//  <Form onSubmit={handleSubmit(onSubmit)}>
//           <FormGroup>
//             <Label for='Name'> Name</Label>
//             <Input
//               id='Name'
//               name='Name'
//               innerRef={register({ required: true })}
//               invalid={errors.Name && true}
//               placeholder='Bruce'
//             />
//             {errors && errors.Name && <FormFeedback>{errors.Name.message}</FormFeedback>}
//           </FormGroup>
//           <FormGroup>
//             <Label for='phonenumber'>Phone Number</Label>
//             <Input
//               id='phonenumber'
//               name='phonenumber'
//               innerRef={register({ required: true })}
//               invalid={errors.phonenumber && true}
//               placeholder='phone number'
//             />
//             {errors && errors.phonenumber && <FormFeedback>{errors.phonenumber.message}</FormFeedback>}
//           </FormGroup>
//           <FormGroup>
//             <Label for='email'>Email</Label>
//             <Input
//               type='email'
//               name='email'
//               id='email'
//               innerRef={register({ required: true })}
//               invalid={errors.email && true}
//               placeholder='bruce.wayne@email.com'
//             />
//             {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
//           </FormGroup>
//           <FormGroup>
//             <Label for='amount'>Amount</Label>
//             <Input
//               type='number'
//               id='amount'
//               name='amount'
//               innerRef={register({ required: true })}
//               invalid={errors.amount && true}
//               placeholder='amount'
//             />
//             {errors && errors.amount && <FormFeedback>{errors.amount.message}</FormFeedback>}
//           </FormGroup>
//           <FormGroup>
//             <Label for='linkexpire'>Link Epire Time</Label>
//             <Input
//               type='linkexpire'
//               id='linkexpire'
//               name='linkexpire'
//               innerRef={register({ required: true })}
//               invalid={errors.linkexpire && true}
//               placeholder='linkexpire minute'
//             />
//             {errors && errors.linkexpire && <FormFeedback>{errors.linkexpire.message}</FormFeedback>}
//           </FormGroup>
//           <FormGroup>
//             <Label for='orderNote'>Order Note</Label>
//             <Input
//               type='text'
//               id='orderNote'
//               name='orderNote'
//               innerRef={register({ required: true })}
//               invalid={errors.orderNote && true}
//               placeholder='order Note'
//             />
//             {errors && errors.orderNote && <FormFeedback>{errors.orderNote.message}</FormFeedback>}
//           </FormGroup>
//           <FormGroup className='d-flex mb-0'>
//             <Button.Ripple className='mr-1' color='primary' type='submit'>
//               Submit
//             </Button.Ripple>
//             <Button.Ripple outline color='secondary' type='reset'>
//               Reset
//             </Button.Ripple>
//           </FormGroup>
//         </Form>
//      </Card> 
//     </Fragment>
//   )
// }

// export default DataTableWithButtons
// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X, RotateCw } from 'react-feather'
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
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ReCAPTCHA from "react-google-recaptcha-enterprise"
import Select from 'react-select'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { toast } from 'react-toastify'

const payrequestpage = ({ open, handleModal, parentCallback, paymentreuestbtndisabled}) => {
  // ** State
  // console.log("payrequestpage----->", parentCallback)
  const chosetimeoptions = [
    { value: 'Month', label: 'Month' },
    { value: 'Day', label: 'Day' },
    { value: 'Hour', label: 'Hour' }
  ]
  const [selecttimevalue, setselecttimevalue] = useState(chosetimeoptions[0])
  const [isverified, setisverified] = useState(false) 
  const [verifiedtoken, setverifiedtoken] = useState(false)
  const SignupSchema = yup.object().shape({
    email: yup.string().required('Email is required').matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Email not valid formate'),
    phonenumber: yup.string().required('Phone number required').matches(/^[0-9]{10}$/, 'Phone number is not valid formate'),
    Name: yup.string().required('Name can not be empty').matches((/^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/), 'Name not valid'),
    amount: yup.string().min(1).required(),
    linkexpire: yup.string().min(1).required(),
    orderNote: yup.string().min(1).required(),
    selecttimevalue:yup.string(),
    Duration: yup.string().required('Duration required').matches(/^[0-9]$/, 'Duration is not valid formate')
  })
  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {
    console.log("isverified", data)

    // console.log("isverified", isverified, data, verifiedtoken)
    // if (isverified === true) {
    //   data.captchaToken = verifiedtoken
    // parentCallback(data)
    // } else {
    //   console.log('not verified')
    //   toast.warning('Please verify you are a human')
    // }
  }

  const [Picker, setPicker] = useState(new Date())
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
 const recaptchaloaded = () => {
        console.log("captcha is loaded successfully")
    }

const onChangehandler = (response) => {
  console.log('onChange', response)
        if (response) {
          setisverified(true)
          setverifiedtoken(response)
        }
    }
    const choosetimehandler = (e) => {
      console.log('e-------', e.value)
      setselecttimevalue(e.value)
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
        <CardTitle tag='h4'>Payment Request</CardTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for='Name'> Name</Label>
            <Input
              id='Name'
              name='Name'
              innerRef={register({ required: true })}
              invalid={errors.Name && true}
              placeholder='Bruce'
            />
            {errors && errors.Name && <FormFeedback>{errors.Name.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='phonenumber'>Phone Number</Label>
            <Input
              id='phonenumber'
              name='phonenumber'
              innerRef={register({ required: true })}
              invalid={errors.phonenumber && true}
              placeholder='phone number'
            />
            {errors && errors.phonenumber && <FormFeedback>{errors.phonenumber.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='email'>Email</Label>
            <Input
              type='text'
              name='email'
              id='email'
              innerRef={register({ required: true })}
              invalid={errors.email && true}
              placeholder='bruce.wayne@email.com'
            />
            {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='amount'>Amount</Label>
            <Input
              type='number'
              id='amount'
              name='amount'
              innerRef={register({ required: true })}
              invalid={errors.amount && true}
              placeholder='amount'
            />
            {errors && errors.amount && <FormFeedback>{errors.amount.message}</FormFeedback>}
          </FormGroup>
         <Label for='linkexpire'>Link expiry time</Label>
<div>
  <Row>
    <Col lg="6">
    <FormGroup>
            <Label for='ChoseTime'>Choose Time</Label>
            <Select
              // theme={selectThemeColors}
              isClearable={false}
              // id={`country-${type}`}
              innerRef={register({ required: true })}

              className='react-select'
              classNamePrefix='select'
              options={chosetimeoptions}
              defaultValue={chosetimeoptions[0]}
              onChange={choosetimehandler}
            />
          </FormGroup></Col>
    <Col>
    <FormGroup>
            <Label for='Duration'>Durtion</Label>
            <Input
               type='number'
              id='Duration'
              name='Duration'
              innerRef={register({ required: true })}
              invalid={errors.Duration && true}
              placeholder='Duration'
            />
            {errors && errors.Duration && <FormFeedback>{errors.Duration.message}</FormFeedback>}
          </FormGroup>
    </Col>
  </Row>
</div>
          <FormGroup>
            <Label for='orderNote'>Order Note</Label>
            <Input
              type='text'
              id='orderNote'
              name='orderNote'
              innerRef={register({ required: true })}
              invalid={errors.orderNote && true}
              placeholder='order Note'
            />
            {errors && errors.orderNote && <FormFeedback>{errors.orderNote.message}</FormFeedback>}
          </FormGroup>
          <div style={{marginBottom:10}}>
          <div className="recaptcha">
            <ReCAPTCHA
              sitekey="6LdUSfgdAAAAALVC-3OR8_zsxdhSJVqiQSC1w_jA"
              render="explicit"
              // onloadCallback={recaptchaloaded}
              // verifyCallback={verifyCallback}
              onChange={onChangehandler}
            />
          </div>
        </div>
          <FormGroup className='d-flex mb-0'>
            <Button.Ripple className='mr-1' color='primary' type='submit' disabled={paymentreuestbtndisabled}>
              Submit
            </Button.Ripple>
            <Button.Ripple outline color='secondary' type='reset'>
              <RotateCw size={10} />
            </Button.Ripple>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default payrequestpage

