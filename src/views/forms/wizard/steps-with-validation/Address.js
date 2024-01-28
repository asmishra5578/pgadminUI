import { Fragment } from 'react'
import classnames from 'classnames'
import { isObjEmpty } from '@utils'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Label, FormGroup, Row, Col, Button, Form, Input } from 'reactstrap'

const Address = ({ stepper, type }) => {
  const { register, errors, handleSubmit, trigger } = useForm()

  const onSubmit = () => {
    stepper.next()

    // trigger()
    // if (isObjEmpty(errors)) {
    //   stepper.next()
    // }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Limit Setting</h5>
        <small>Set PG Limit in Rupees.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`address-${type}`}>
              CASHFREE
            </Label>
            <Input
              type='text'
              id={`address-${type}`}
              name={`address-${type}`}
              placeholder='982'
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors[`address-${type}`] })}
            />
          </FormGroup>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`landmark-${type}`}>
              PAYTM
            </Label>
            <Input
              type='text'
              name={`landmark-${type}`}
              id={`landmark-${type}`}
              placeholder='901'
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors[`landmark-${type}`] })}
            />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`pincode-${type}`}>
              SUPER_DUPER
            </Label>
            <Input
              type='text'
              name={`pincode-${type}`}
              id={`pincode-${type}`}
              placeholder='122'
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors[`pincode-${type}`] })}
            />
          </FormGroup>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`city-${type}`}>
              PAYUGATE
            </Label>
            <Input
              type='text'
              name={`city-${type}`}
              id={`city-${type}`}
              placeholder='109'
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors[`city-${type}`] })}
            />
          </FormGroup>
        </Row>
        <div className='d-flex justify-content-between'>
          {/* <Button.Ripple color='primary' className='btn-prev'>
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

export default Address
