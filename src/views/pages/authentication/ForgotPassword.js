import { isUserLoggedIn } from '@utils'
import { useState, useContext, Fragment } from 'react'
import { useSkin } from '@hooks/useSkin'
import { ChevronLeft, X} from 'react-feather'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Modal,
  ModalHeader,
  ModalBody,
  Input, Button, FormFeedback } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import InputPasswordToggle from '@components/input-password-toggle'
import axios from 'axios'
import useEazy from '@src/auth/eazy/useEazy'
import Alert from 'reactstrap/lib/Alert'
import { toast } from 'react-toastify'


const config = useEazy.econfig
const ForgotPassword = () => {
  const [skin, setSkin] = useSkin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setotp] = useState('')
  const history = useHistory()

  const { register, errors, handleSubmit } = useForm()
  const [modal, setModal] = useState(false)
  const handleModal = () => setModal(!modal)
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  const illustration = skin === 'dark' ? 'forgot-password-v2-dark.svg' : 'forgot-password-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default
    const  eazypamentzicon = require('../../../assets/images/tab.png').default
    const onSubmit = data => {
      console.log("sadasdasd", data)
      axios({
        method: "POST",
        url: `${config.forgetPasswordGenerateOTP}?userEmail=${data.email}`
      }).then((res) => {
        console.log('otp forgotpass', res.data)
        if (res.data.successCode === "API_SUCCESS") {
          toast.success('Password Change OTP has been send to your mail id , The OTP will valid for 10 Mins, Please change the password within timeline.')
          handleModal()
        } else if (res.data.exception === "EMAIL_ID_NOT_FOUND") {
          toast.warning('Email id not found:User does not exist')
        } 
      })
    }
    const resendotphandler = () => {
      axios({
        method: "POST",
        url: `${config.forgetPasswordResendOTP}?userEmail=${email}`
      }).then((res) => {
        console.log('resend oyp', res.data)
        if (res.data.successCode === "API_SUCCESS") {
          toast.success('Password Change OTP has been send to your mail id , The OTP will valid for 10 Mins, Please change the password within timeline.')
          // handleModal()
        }
      })
    }
   const savepasswordhandler = () => {
      console.log('password, otp', password, otp)
      if (password === "") {
         toast.warning('Password Can not be empty')
      } else if (otp === "") {
        toast.warning('Otp Can not be empty')
     } else {
      axios({
        method: "POST",
        url: `${config.forgetPasswordChangeWithOTP}?userEmail=${email}&password=${password}&mailOtp=${otp}`
      }).then((res) => {
        console.log('otp validate', res.data)
        if (res.data.successCode === "API_SUCCESS") {
          toast.success('Password Change has been processed, Please login with new Credentials.')
          history.push('/')   
        } else  if (res.data.exception === "PASSWORD_VALIDATION") {
          toast.warning('Password not validate as per Rules. a. start-of-string b. a digit must occur at least once c.a lower case letter must occur at least once  d. an upper case letter must occur at least once e. a special character must occur at least once f. no whitespace allowed in the entire string g. anything, at least eight places though h. end-of-string')
        } else if (res.data.exception === "OTP_MISMATCH") {
          toast.error('The provided OTP is not valid for the user')
          // handleModal()
        }
        //  else if (res.data === "Password Change has been processed, Please login with new Credentials.") {
        //   toast.success('Password Change has been processed, Please login with new Credentials.')
        //   history.push('/')   
        // }
      })
     }
    }
  if (!isUserLoggedIn()) {
    return (
      <div className='auth-wrapper auth-v2'>
        <Row className='auth-inner m-0'>
          <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
        <img className='eazypamentzicon' src={eazypamentzicon} alt='Login V2' />
          <h2 className='login brand-text text-primary ml-1' style={{marginTop:30}}>EazyPaymentz</h2>
          </Link>
          <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
            <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
              <img className='img-fluid' src={source} alt='Login V2' />
            </div>
          </Col>
          <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
            <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
              <CardTitle tag='h2' className='font-weight-bold mb-1'>
                Forgot Password? 🔒
              </CardTitle>
              <CardText className='mb-2'>
                Enter your email and we'll send you OTP to reset your password
              </CardText>
              <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input
                  autoFocus
                  type='email'
                  value={email}
                  id='email'
                  name='email'
                  placeholder='john@example.com'
                  onChange={e => setEmail(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login-email'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              {/* <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                </div>
                <InputPasswordToggle
                  value={password}
                  id='login-password'
                  name='login-password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup> */}
              <Button.Ripple type='submit' color='primary' block>
                Generate OTP
              </Button.Ripple>
            </Form>
              <p className='text-center mt-2'>
                <Link to='/login'>
                  <ChevronLeft className='mr-25' size={14} />
                  <span className='align-middle'>Back to login</span>
                </Link>
              </p>
            </Col>
          </Col>
        </Row>
        <Modal
      isOpen={modal}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
         <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Set Password</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <CardTitle tag='h4'>Password Change with Mobile OTP</CardTitle>
      <Label for='password'>Password</Label>
      <InputPasswordToggle
                  value={password}
                  id='login-password'
                  name='login-password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  // className={classnames({ 'is-invalid': errors['login-password'] })}
                  // innerRef={register({ required: true, validate: value => value !== '' })}
                />
                <div style={{marginTop:20}}>
                <Label for='password'>Email OTP</Label>
                <InputPasswordToggle
                  value={otp}
                  id='otp'
                  name='otp'
                  className='input-group-merge'
                  onChange={e => setotp(e.target.value)}
                  // className={classnames({ 'is-invalid': errors['login-password'] })}
                  // innerRef={register({ required: true, validate: value => value !== '' })}
                />
                </div>
                <div style={{marginTop:10}}>
                  <p style={{width:"fit-content", cursor:'pointer', color:"blue", fontWeight:"bold"}} onClick={resendotphandler}>Resend OTP</p>
                </div>
                <div style={{marginTop:10}}>
            <Button color='primary' onClick={savepasswordhandler}>
              Save Password
            </Button>
          </div>
            </ModalBody>
            </Modal>
      </div>
    )
  } else {
    return <Redirect to='/' />
  }
}

export default ForgotPassword
