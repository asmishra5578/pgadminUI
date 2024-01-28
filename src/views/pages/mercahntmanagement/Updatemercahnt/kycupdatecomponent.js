import { Fragment, useState } from "react"
import classnames from 'classnames'
import { Label, Input, FormGroup, Row, Col, Button, Form, FormFeedback, CustomInput } from 'reactstrap'
import AppCollapse from '@components/app-collapse'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import requestsApi from './request'
 
const requestsApidata = new requestsApi()
// import MerchantList from "./merchantlist"
const Updatekyccomponent = () => {
    const SignupSchema = yup.object().shape({
        [`merchantnameLegeal`]: yup.string().required('Merchant Name Legal can not be empty').matches((/^[A-Za-z]+$/), 'Merchant name not valid'),
        [`merchantnameDBA`]: yup.string().required('Merchant Name DBA can not be empty').matches((/^[A-Za-z]+$/), 'Merchant name not valid'),
        [`pancardno`]: yup.string().min(5).required(),
        [`GSTID`]: yup.string().required('GST ID can not be empty'),
        [`websiteurl`]: yup.string().min(4).required(),
        [`businessentitytype`]: yup.string().min(4).required(),
        [`categoryorsegmant`]: yup.string().min(4).required(),
        [`productdescription`]:yup.string().min(2).required(),
        [`tannumber`]:yup.string().min(2).required(),
        [`monthlytranscount`]:yup.string().min(2).required(),
        [`averageticketsize`]:yup.string().min(2).required()
        // [`contactpersonname`]:yup.string().min(2).required(),
        // [`Address`]:yup.string().min(2).required(),
        // [`pincode`]:yup.string().min(2).required(),
        // [`contactnumber`]:yup.string().min(2).required(),
        // [`emailaddress`]:yup.string().min(2).required(),
        // [`opcontactpersonname`]:yup.string().min(2).required(),
        // [`opAddress`]:yup.string().min(2).required(),
        // [`oppincode`]:yup.string().min(2).required(),
        // [`opcontactnumber`]:yup.string().min(2).required(),
        // [`opemailaddress`]:yup.string().min(2).required(),
        // [`fraudcontactpersonname`]:yup.string().min(2).required(),
        // [`fraudcontactnumber`]:yup.string().min(2).required(),
        // [`fraudemailaddress`]:yup.string().min(2).required(),
        // [`accountholdername`]:yup.string().min(2).required(),
        // [`accountnumberbankdetails`]:yup.string().min(2).required(),
        // [`ifsccodebankdetails`]:yup.string().min(2).required(),
        // [`banknamebankdetails`]:yup.string().min(2).required(),
        // [`branchaddress`]:yup.string().min(2).required(),
        // [`accountype`]:yup.string().min(2).required()
      })
      const [radiovalue, setradiovalue] = useState('approvekyc')
  const [merchantsearchbtndisabled, setmerchantsearchbtndisabled] = useState(false)
  const [selectpgDisplay, setselectpgDisplay] = useState('none')
  const [searchmerchantinputvalue, setsearchmerchantinputvalue] = useState('')
  const [searchmerchantdata, setsearchmerchantdata] = useState('')
  const [kycStatus, setkycStatus] = useState('')
  const [merchantEMail, setmerchantEMail] = useState('')
  const [merchantId, setmerchantId] = useState('')
  const [merchantName, setmerchantName] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [bankName, setbankName] = useState('')
  const [bankIFSCCode, setbankIFSCCode] = useState('')
  const [accountNo, setaccountNo] = useState('')
  const [city, setcity] = useState('')
  const [micrCode, setmicrCode] = useState('')

      const { register, errors, handleSubmit, trigger } = useForm({
        resolver: yupResolver(SignupSchema)
      })
      const onSubmit = (data) => {
        console.log(data)
      }
      const approveorupdatehadnler = (e) => {
          console.log('e.target.id', e.target.id)
          setradiovalue(e.target.id)
      }
      const serchmerchanthandler = (e) => {
        // console.log('e', e.target.value)
        setsearchmerchantinputvalue(e.target.value)
        setselectpgDisplay('none')
        setmerchantsearchbtndisabled(false)
      }
      const searchmerchantbtndandlerhandler = () => {
        if (searchmerchantinputvalue === "") {
          toast.warning('Merchant ID can not be empty')
        } else {
          setmerchantsearchbtndisabled(true)
       requestsApidata.merchantserach("", searchmerchantinputvalue).then(res => {
        //  console.log('setsearchmerchantdata', res.data[0].merchantName)
         setmerchantsearchbtndisabled(false)
         if (res.data.length === 0) {
           toast.warning('No Data found. Please enter valid Merchant ID')
         } else if (res.data.length !== 0) {
           setsearchmerchantdata(res.data)
           setselectpgDisplay('Block')
           setkycStatus(res.data[0].kycStatus)
           setmerchantEMail(res.data[0].merchantEMail)
           setmerchantId(res.data[0].merchantId)
           setmerchantName(res.data[0].merchantName)
           setphoneNumber(res.data[0].phoneNumber)
           requestsApidata.admingetmercahntbankdetails(res.data[0].merchantId).then(response => {
            console.log('response get merchant bank', response.data, response.data.accountNo)
             if (response.data.exception === "MERCHANT_BANK_DETILS_NOT_FOUND") {
               toast.error('Merchnat Bank Details not found in system.')
             } else {
            setselectpgDisplay('Block')
            // setgetbankdetails(response.data)
            setbankName(response.data.bankName)
            setbankIFSCCode(response.data.bankIFSCCode)
            setaccountNo(response.data.accountNo)
            setcity(response.data.city)
            setmicrCode(response.data.micrCode)
             }
          })
         }
       })
     }
       }
  return (
    <Fragment>
     <div>
        <Row>
          <Col lg="3">
            <Label>Search Merchant by Merchant ID</Label>
            {/* <UILoader blocking={true}>
              Search Merchant
                </UILoader> */}
            <Input placeholder='Enter Merchant ID' type='number' onChange={serchmerchanthandler} />
            <div style={{marginTop:10}}>
            <Button color="primary" disabled={merchantsearchbtndisabled} onClick={searchmerchantbtndandlerhandler}>
           Search Merchant
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{marginTop:10, display:selectpgDisplay}}>
          <div>
              <Row>
                  <Col>
                <CustomInput type='radio'  label='Update KYC' name='paymentMethod' id='updatekyc' onChange={approveorupdatehadnler}/>
                  </Col>
                  <Col>
                  <CustomInput type='radio' defaultChecked={true} label='Approve/DisApprove KYC' name='paymentMethod' id='approvekyc' onChange={approveorupdatehadnler}/>
                  </Col>
                  <Col>
                  <CustomInput type='radio'  label='Update KYC Status' name='paymentMethod' id='updatekycstatus' onChange={approveorupdatehadnler}/>
                  </Col>

              </Row>
          </div>
          <div style={{marginTop:20}}>
      {radiovalue === 'approvekyc' ? <div>
         <h6> Approve Disapprove Details</h6>
         <div style={{display:'flex'}}>
             <div>
        <Button color="success">Approve</Button>
             </div>
             <div style={{marginLeft:10}}>
        <Button color="danger">Reject</Button>
             </div>
         </div>
        {/* <Button color="success">Approve</Button> */}
      </div> : radiovalue === 'updatekyc' ? <div>
        
          <h6>Merchant Contact Details -Registered*</h6>
          <Row>
          <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`mercahntID`}>
              Merchant ID
              </Label>
              <Input
                name={`mercahntID`}
                id={`mercahntID`}
                // placeholder='Email address'
                // innerRef={register({ required: true })}
                // className={classnames({ 'is-invalid': errors[`emailaddress`] })}
                disabled
                value={merchantId}
              />
              {/* {errors && errors.emailaddress && <FormFeedback>{errors.emailaddress.message}</FormFeedback>} */}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`contactpersonname`}>
                Merchant Name
              </Label>
              <Input
                name={`contactpersonname`}
                id={`contactpersonname`}
                // placeholder='Contact Person Name'
                // innerRef={register({ required: true })}
                // className={classnames({ 'is-invalid': errors[`contactpersonname`] })}
                value={merchantName}
                disabled
              />
              {/* {errors && errors.contactpersonname && <FormFeedback>{errors.contactpersonname.message}</FormFeedback>} */}
            </FormGroup>
            {/* <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`Address`}>
              Address
              </Label>
              <Input
                name={`Address`}
                id={`Address`}
                placeholder='Address'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`Address`] })}
              />
              {errors && errors.Address && <FormFeedback>{errors.Address.message}</FormFeedback>}
            </FormGroup> */}
            {/* <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`pincode`}>
              PIN Code
              </Label>
              <Input
                name={`pincode`}
                id={`pincode`}
                placeholder='Pin code'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`pincode`] })}
              />
              {errors && errors.pincode && <FormFeedback>{errors.pincode.message}</FormFeedback>}
            </FormGroup> */}
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`contactnumber`}>
              Contact Number
              </Label>
              <Input
                name={`contactnumber`}
                id={`contactnumber`}
                // placeholder='Contact number'
                // innerRef={register({ required: true })}
                // className={classnames({ 'is-invalid': errors[`contactnumber`] })}
                value={phoneNumber}
                disabled
              />
              {/* {errors && errors.contactnumber && <FormFeedback>{errors.contactnumber.message}</FormFeedback>} */}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`emailaddress`}>
              Email Address
              </Label>
              <Input
                name={`emailaddress`}
                id={`emailaddress`}
                // placeholder='Email address'
                // innerRef={register({ required: true })}
                // className={classnames({ 'is-invalid': errors[`emailaddress`] })}
                disabled
                value={merchantEMail}
              />
              {/* {errors && errors.emailaddress && <FormFeedback>{errors.emailaddress.message}</FormFeedback>} */}
            </FormGroup>
          </Row>
          <h6>Bank Details-Registered*</h6>
          <Row>
          {/* <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`accountholdername`}>
              Account Holder Name*
              </Label>
              <Input
                name={`accountholdername`}
                id={`accountholdername`}
                placeholder='Account Holder Name*'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`accountholdername`] })}
              />
              {errors && errors.accountholdername && <FormFeedback>{errors.accountholdername.message}</FormFeedback>}
            </FormGroup> */}
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`accountnumberbankdetails`}>
              Account Number*
              </Label>
              <Input
                name={`accountnumberbankdetails`}
                id={`accountnumberbankdetails`}
                // placeholder='Account Number*'
                // innerRef={register({ required: true })}
                // className={classnames({ 'is-invalid': errors[`accountnumberbankdetails`] })}
                value={accountNo}
                disabled
              />
              {/* {errors && errors.accountnumberbankdetails && <FormFeedback>{errors.accountnumberbankdetails.message}</FormFeedback>} */}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`ifsccodebankdetails`}>
              IFSC Code*
              </Label>
              <Input
                name={`ifsccodebankdetails`}
                id={`ifsccodebankdetails`}
                // placeholder='IFSC Code*'
                // innerRef={register({ required: true })}
                // className={classnames({ 'is-invalid': errors[`ifsccodebankdetails`] })}
                value={bankIFSCCode}
                disabled
              />
              {errors && errors.ifsccodebankdetails && <FormFeedback>{errors.ifsccodebankdetails.message}</FormFeedback>}
            </FormGroup>
          </Row>
          <Row>
          <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`banknamebankdetails`}>
              Bank Name
              </Label>
              <Input
                name={`banknamebankdetails`}
                id={`banknamebankdetails`}
                // placeholder='Bank Name'
                // innerRef={register({ required: true })}
                // className={classnames({ 'is-invalid': errors[`banknamebankdetails`] })}
                value={bankName}
                disabled
              />
              {errors && errors.banknamebankdetails && <FormFeedback>{errors.banknamebankdetails.message}</FormFeedback>}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`branchaddress`}>
              City
              </Label>
              <Input
                name={`branchaddress`}
                id={`branchaddress`}
                // placeholder='Branch Address'
                // innerRef={register({ required: true })}
                // className={classnames({ 'is-invalid': errors[`branchaddress`] })}
                value={city}
                disabled
              />
              {errors && errors.branchaddress && <FormFeedback>{errors.branchaddress.message}</FormFeedback>}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`accountype`}>
              Micr Code
              </Label>
              <Input
                name={`accountype`}
                id={`accountype`}
                // placeholder='Account Type'
                // innerRef={register({ required: true })}
                // className={classnames({ 'is-invalid': errors[`accountype`] })}
                value={micrCode}
                disabled
              />
              {errors && errors.accountype && <FormFeedback>{errors.accountype.message}</FormFeedback>}
            </FormGroup>
          </Row>
          <h6>Merchant & Business Details</h6>
          <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`merchantnameLegeal`}>
                Merchant Name (Legal)
              </Label>
              <Input
                name={`merchantnameLegeal`}
                id={`merchantnameLegeal`}
                placeholder='Merchant Name (Legal)'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`merchantnameLegeal`] })}
              />
              {errors && errors.merchantnameLegeal && <FormFeedback>{errors.merchantnameLegeal.message}</FormFeedback>}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`merchantnameDBA`}>
                Merchant Name (DBA)
              </Label>
              <Input
                name={`merchantnameDBA`}
                id={`merchantnameDBA`}
                placeholder='Merchant Name (DBA)'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`merchantnameDBA`] })}
              />
              {errors && errors.merchantnameDBA && <FormFeedback>{errors.merchantnameDBA.message}</FormFeedback>}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`pancardno`}>
                Pan Card Number
              </Label>
              <Input
                name={`pancardno`}
                id={`pancardno`}
                placeholder='Pan Card Number'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`pancardno`] })}
              />
              {errors && errors.pancardno && <FormFeedback>{errors.pancardno.message}</FormFeedback>}
            </FormGroup>
          </Row>
          <Row>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`GSTID`}>
                GST ID
              </Label>
              <Input
                name={`GSTID`}
                id={`GSTID`}
                placeholder='GST ID'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`GSTID`] })}
              />
              {errors && errors.GSTID && <FormFeedback>{errors.GSTID.message}</FormFeedback>}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`websiteurl`}>
                Website URL
              </Label>
              <Input
                name={`websiteurl`}
                id={`websiteurl`}
                placeholder='Website URL'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`websiteurl`] })}
              />
              {errors && errors.websiteurl && <FormFeedback>{errors.websiteurl.message}</FormFeedback>}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`businessentitytype`}>
              Business Entity Type*
              </Label>
              <Input
                name={`businessentitytype`}
                id={`businessentitytype`}
                placeholder='Business Entity Type*'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`businessentitytype`] })}
              />
              {errors && errors.businessentitytype && <FormFeedback>{errors.businessentitytype.message}</FormFeedback>}
            </FormGroup>
          </Row>
          <Row>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`productdescription`}>
                Product Description
              </Label>
              <Input
                name={`productdescription`}
                id={`productdescription`}
                placeholder='Product Description'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`productdescription`] })}
              />
              {errors && errors.productdescription && <FormFeedback>{errors.productdescription.message}</FormFeedback>}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`tannumber`}>
              TAN Number(If applicable)
              </Label>
              <Input
                name={`tannumber`}
                id={`tannumber`}
                placeholder='TAN Number(If applicable)'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`tannumber`] })}
              />
              {errors && errors.tannumber && <FormFeedback>{errors.tannumber.message}</FormFeedback>}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`monthlytranscount`}>
              Monthly Expected Transactions Count
              </Label>
              <Input
                name={`monthlytranscount`}
                id={`monthlytranscount`}
                placeholder='Monthly Expected Transactions Count'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`monthlytranscount`] })}
              />
              {errors && errors.monthlytranscount && <FormFeedback>{errors.monthlytranscount.message}</FormFeedback>}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`averageticketsize`}>
              Average Ticket Size
              </Label>
              <Input
                name={`averageticketsize`}
                id={`averageticketsize`}
                placeholder='Average Ticket Size'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`averageticketsize`] })}
              />
              {errors && errors.averageticketsize && <FormFeedback>{errors.averageticketsize.message}</FormFeedback>}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`categoryorsegmant`}>
              Category/Segment
              </Label>
              <Input
                name={`categoryorsegmant`}
                id={`categoryorsegmant`}
                placeholder='Category/Segment'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`categoryorsegmant`] })}
              />
              {errors && errors.categoryorsegmant && <FormFeedback>{errors.categoryorsegmant.message}</FormFeedback>}
            </FormGroup>
          </Row>
      
          {/* <h6>Merchant Contact Details -Operating/Communication</h6> */}
          {/* <Row>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`opcontactpersonname`}>
                Contact Person Name
              </Label>
              <Input
                name={`opcontactpersonname`}
                id={`opcontactpersonname`}
                placeholder='Contact Person Name'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`opcontactpersonname`] })}
              />
              {errors && errors.opcontactpersonname && <FormFeedback>{errors.opcontactpersonname.message}</FormFeedback>}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`opAddress`}>
              Address
              </Label>
              <Input
                name={`opAddress`}
                id={`opAddress`}
                placeholder='Address'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`opAddress`] })}
              />
              {errors && errors.opAddress && <FormFeedback>{errors.opAddress.message}</FormFeedback>}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`oppincode`}>
              PIN Code
              </Label>
              <Input
                name={`oppincode`}
                id={`oppincode`}
                placeholder='PIN Code'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`oppincode`] })}
              />
              {errors && errors.oppincode && <FormFeedback>{errors.oppincode.message}</FormFeedback>}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`opcontactnumber`}>
              Contact Number
              </Label>
              <Input
                name={`opcontactnumber`}
                id={`opcontactnumber`}
                placeholder='Contact Number'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`opcontactnumber`] })}
              />
              {errors && errors.opcontactnumber && <FormFeedback>{errors.opcontactnumber.message}</FormFeedback>}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`opemailaddress`}>
              Email Address
              </Label>
              <Input
                name={`opemailaddress`}
                id={`opemailaddress`}
                placeholder='Email Address'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`opemailaddress`] })}
              />
              {errors && errors.opemailaddress && <FormFeedback>{errors.opemailaddress.message}</FormFeedback>}
            </FormGroup>
          </Row> */}
          {/* <h6>Contact Details for Fraud & Dispute alert</h6> */}
          {/* <Row>
          <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`fraudcontactpersonname`}>
              Contact Person Name
              </Label>
              <Input
                name={`fraudcontactpersonname`}
                id={`fraudcontactpersonname`}
                placeholder='Contact Person Name'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`fraudcontactpersonname`] })}
              />
              {errors && errors.fraudcontactpersonname && <FormFeedback>{errors.fraudcontactpersonname.message}</FormFeedback>}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`fraudcontactnumber`}>
              Contact Number*
              </Label>
              <Input
                name={`fraudcontactnumber`}
                id={`fraudcontactnumber`}
                placeholder='Contact Number*'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`fraudcontactnumber`] })}
              />
              {errors && errors.fraudcontactnumber && <FormFeedback>{errors.fraudcontactnumber.message}</FormFeedback>}
            </FormGroup>
            <FormGroup tag={Col} md='4'>
              <Label className='form-label' for={`fraudemailaddress`}>
              Email Address
              </Label>
              <Input
                name={`fraudemailaddress`}
                id={`fraudemailaddress`}
                placeholder='Email Address'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors[`fraudemailaddress`] })}
              />
              {errors && errors.fraudemailaddress && <FormFeedback>{errors.fraudemailaddress.message}</FormFeedback>}
            </FormGroup>
          </Row> */}
        
          <div className='d-flex justify-content-between'>
            <Button color='primary'>
              Submit
            </Button>
          </div>
        </Form>
        </div> : <div>
          <h6>Update Kyc Status</h6>
          <div>
            
          </div>
          </div>}
        </div>
        </div>
  </Fragment>
  )
}

export default Updatekyccomponent
