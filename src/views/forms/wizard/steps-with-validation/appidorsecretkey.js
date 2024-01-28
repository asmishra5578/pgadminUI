import * as yup from 'yup'
import { Fragment } from 'react'
import classnames from 'classnames'
import { isObjEmpty } from '@utils'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Label, Input, FormGroup, Row, Col, Button } from 'reactstrap'

const Appidorsecretkey = ({ stepper }) => {
  const SignupSchema = yup.object().shape({
    [`merchantName`]: yup.string().required(),
    [`email`]: yup.string().email().required(),
    [`phoneNumber`]: yup.string().required(),
    [`companyName`]: yup.string().required(),
    [`merchantType`]: yup.string().required(),
    [`supportEmailId`]: yup.string().email().required(),
    [`supportPhoneNo`]: yup.string().required(),
    [`logoUrl`]: yup.string().required()
  })

  const { register, errors, handleSubmit, trigger } = useForm({
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = (data) => {
    console.log(data)
    trigger()
    if (isObjEmpty(errors)) {
      alert('submitted')
    }
  }
  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>AppID Or Secret Key</h5>
        <small className='text-muted'>Send Details to Merchant</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
  
        <Row>
        <FormGroup check inline style={{marginLeft:20}}>
              <Input type='checkbox' id='basic-cb-checked' />
              <Label check>Agree to send details to merchant</Label>
            </FormGroup>

        </Row>
        <div className='d-flex justify-content-between' style={{marginTop:20}}>
          {/* <Button.Ripple color='secondary' className='btn-prev' outline disabled>
            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button.Ripple> */}
          {/* <Button.Ripple type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
          </Button.Ripple> */}
             <Button.Ripple type='submit' color='success' className='btn-submit' disabled>
            Submit
          </Button.Ripple>
        </div>
      </Form>
    </Fragment>
  )
}

export default Appidorsecretkey
