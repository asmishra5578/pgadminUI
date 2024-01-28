import * as yup from 'yup'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, FormGroup, Row, Col, Button, FormFeedback } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import requestsApi from './request'
import { toast, Slide } from 'react-toastify'
import { useState, useContext, Fragment } from 'react'
import { AlertTriangle } from 'react-feather'
// import Loader from "./Loader"
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
// import st from '../../secureStore/useSecure'
import st from '../../../@core/secureStore/useSecure'
// import Exceptionservice from '../../../views/pages/Services/exception'
// const Exceptionservicedata = new Exceptionservice()

const requestsApidata = new requestsApi()

const PasswordTabContent = () => {
  const [btndisabled, setbtndisabled] = useState(false)
  const [alertMessege, setalertMessege] = useState('')
  const [newpassword, setnewpassword] = useState('')
  const [retypenewpassword, setretypenewpassword] = useState('')
  const [errornewpassword, seterrornewpassword] = useState('')
  const [errorretypenewpassword, seterrorretypenewpassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
const history = useHistory()
const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?+=&])[A-Za-z\d@#$!%*?+=&]{8,}$/
  const SignupSchema = yup.object().shape({
    // oldpassword: yup.string().required(),
    newpassword: yup.string().required('Password required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'),

    // newpassword: yup.string().required(),
    retypenewpassword: yup
      .string()
      .required()
  })

  // const SignupSchema = yup.object().shape({
  //   'old-password': yup.string(),
  //   newpassword: yup.string(),
  //   'retype-new-password': yup
  //     .string()
  // })

  // const { register, errors, handleSubmit, trigger, reset } = useForm({
  //   resolver: yupResolver(SignupSchema)
  // })
  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })


  // const onSubmit = (data) => {
  //   console.log("adsddsdsdsd", data)
  //   requestsApidata.changepassword(data).then(res => {
  //     console.log("changepassword resonse", res.data)
  //     if (res.data.exception === "PASSWORD_VALIDATION") {
  //       setalertdisplay('block')
  //       setalertMessege(res.data.msg[0])
  //     }  else if ('old-password' !== 'newpassword') {
  //         alert('Password is not matching')
  //     } else if (res.data.successCode === "RESET_PASSWORD_SUCCESS") {
  //       toast.success('Password Changed successfully')
  //       reset({'old-password':""})
  //        }
  //   })
  // }
const changepasswordHandler = () => {
  if (newpassword === "") {
    toast.warning('New Password is required')
  } else  if (retypenewpassword === "") {
    toast.warning('Retype New Password is required')
  } else if (newpassword !== retypenewpassword) {
    toast.error('New Password and Retype new password is not matching')
  } else {
    console.log('okkkkkkkkkkkkkkk', newpassword, retypenewpassword)
    setbtndisabled(true)
    requestsApidata.changepassword(encodeURIComponent(newpassword)).then(res => {
      if (res.data.exception === "PASSWORD_VALIDATION") {
          setbtndisabled(false)
        toast.error('Password Validation error')
      } else if (res.data.successCode === "RESET_PASSWORD_SUCCESS") {
           setbtndisabled(false)
        Swal.fire({icon:'success', text:'Password Changed successfully.Login again'}).then(() => {
          st.removeAll()
          history.push('/')    
        })
      }
    })
  }
}
const newpasswordHandler = (e) => {
  // console.log('new password', e.target.value)
  setnewpassword(e.target.value)
  seterrornewpassword('')
  if (!passwordregex.test(e.target.value)) {
    // console.log('passord not valid')
    seterrornewpassword('Min 8 characters, 1 uppercase,1 lowercase, 1 number and 1 special character')
  } 
}
const retypenewpasswordHandler = (e) => {
  // console.log('retypenewpasswordHandlerword', e.target.value)
  setretypenewpassword(e.target.value)
  seterrorretypenewpassword('')
  if (!passwordregex.test(e.target.value)) {
    seterrorretypenewpassword('Min 8 characters, 1 uppercase,1 lowercase, 1 number and 1 special character')
  } 
}
 

  return (
    <div>
      {/* <h6>Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</h6> */}
  
          {/* <Alert color="danger" style={{padding:8, display:alertdisplay}}>
              {alertMessege}
            </Alert> */}
      {/* <Row>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              label='Old Password'
              htmlFor='oldpassword'
              name='oldpassword'
              innerRef={register({ required: true })}
              className={classnames('input-group-merge', {
                'is-invalid': errors['old-password']
              })}
            />
          </FormGroup>
        </Col>
      </Row> */}
      <Row>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              label='New Password'
              htmlFor='newpassword'
              id='newpassword'
              name='newpassword'
              // type='text'
              // innerRef={register({ required: true })}
              // invalid={errors.newpassword && true}
              onChange={newpasswordHandler}
            />
            <span style={{color:'red'}}>{errornewpassword}</span>
          {/* {errors && errors.newpassword && <FormFeedback>{errors.newpassword.message}</FormFeedback>} */}
          </FormGroup>

        </Col>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              label='Retype New Password'
              htmlFor='retypenewpassword'
              id='retypenewpassword'
              name='retypenewpassword'
              // type='text'
              
              // invalid={errors.retypenewpassword && true}
              // innerRef={register({ required: true })}
              onChange={retypenewpasswordHandler}
            />
            <span style={{color:'red'}}>{errorretypenewpassword}</span>
          {/* {errors && errors.retypenewpassword && <FormFeedback>{errors.retypenewpassword.message}</FormFeedback>} */}
          </FormGroup>

        </Col>
        <Col className='mt-1' sm='12'>
        {/* {isLoading ? <Loader/> : null} */}
          <Button.Ripple type='submit' className='mr-1' color='primary' disabled={btndisabled} onClick={changepasswordHandler}>
            Save changes
          </Button.Ripple>
          {/* <Button.Ripple color='secondary' outline>
            Cancel
          </Button.Ripple> */}
        </Col>
      </Row>
  
    </div>
  )
}

export default PasswordTabContent