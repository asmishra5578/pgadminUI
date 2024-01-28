import * as yup from 'yup'
import { Fragment } from 'react'
import classnames from 'classnames'
import { isObjEmpty } from '@utils'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Label, Input, FormGroup, Row, Col, Button, FormFeedback } from 'reactstrap'

const KYCdetails = ({ stepper }) => {
  const SignupSchema = yup.object().shape({
    [`nameonaadhar`]: yup.string().required(),
    [`aadharcardnum`]: yup.string().min(12).required()
  })

  const { register, errors, handleSubmit, trigger } = useForm({
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = (data) => {
    console.log(data)
    trigger()
    if (isObjEmpty(errors)) {
      stepper.next()
    }
  }
  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Merchant KYC Details</h5>
        <small className='text-muted'>Enter Your Details.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
        <FormGroup tag={Col} md='4'>
            <Label className='form-label' for={`kycstatus`}>
           KYC Status
            </Label>
            <Input
              name={`kycstatus`}
              id={`kycstatus`}
              placeholder='Name on Aadhar'
              innerRef={register({ required: true })}
              value="True"
              disabled
            />
          </FormGroup>
          <FormGroup tag={Col} md='4'>
            <Label className='form-label' for={`nameonaadhar`}>
           Name on AAdhar Card
            </Label>
            <Input
              name={`nameonaadhar`}
              id={`nameonaadhar`}
              placeholder='Name on Aadhar'
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors[`nameonaadhar`] })}
            />
            {errors && errors.nameonaadhar && <FormFeedback>{errors.nameonaadhar.message}</FormFeedback>}
          </FormGroup>
          <FormGroup tag={Col} md='4'>
            <Label className='form-label' for={`aadharcardnum`}>
            Aadhar Card Number
            </Label>
            <Input
              name={`aadharcardnum`}
              id={`aadharcardnum`}
              placeholder='Aadhar Number'
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors[`aadharcardnum`] })}
            />
            {errors && errors.aadharcardnum && <FormFeedback>{errors.aadharcardnum.message}</FormFeedback>}
          </FormGroup>
        </Row>
        <div className='d-flex justify-content-between'>
          {/* <Button.Ripple color='secondary' className='btn-prev' outline disabled>
            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button.Ripple> */}
          <Button.Ripple type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
          </Button.Ripple>
        </div>
      </Form>
    </Fragment>
  )
}

export default KYCdetails
