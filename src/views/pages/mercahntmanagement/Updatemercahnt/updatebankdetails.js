import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import { useForm, Controller } from 'react-hook-form'
import { Label, Input, FormGroup, Row, Col, Button, Form, FormFeedback } from 'reactstrap'
import { Fragment, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import Select from 'react-select'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import requestsApi from './request'
import UILoader from '@components/ui-loader'

const requestsApidata = new requestsApi()
const InfoTabContent = ({ data }) => {
  const [Bankinfo, setBankinfo] = useState([])
  const [modal, setModal] = useState(false)
  const handleModal = () => setModal(!modal)
  const [searchmerchantinputvalue, setsearchmerchantinputvalue] = useState('')
  const [merchantsearchbtndisabled, setmerchantsearchbtndisabled] = useState(false)
  const [getbankdetails, setgetbankdetails] = useState([])
  const [selectpgDisplay, setselectpgDisplay] = useState('none')
  const [bankName, setbankName] = useState('Select')
  const [bankIFSCCode, setbankIFSCCode] = useState('')
  const [accountNo, setaccountNo] = useState('')
  const [city, setcity] = useState('')
  const [micrCode, setmicrCode] = useState('')
  const [bankNameErrmsg, setbankNameErrmsg] = useState('')
  const [bankIFSCCodeErrmsg, setbankIFSCCodeErrmsg] = useState('')
  const [accountNoErrmsg, setaccountNoErrmsg] = useState('')
  const [cityErrmsg, setcityErrmsg] = useState('')
  const [micrCodeErrmsg, setmicrCodeErrmsg] = useState('')
  const [updatebtndisabled, setupdatebtndisabled] = useState(false)
  const [selectmerchantidvalue, setselectmerchantidvalue] = useState('Select')
  const [merchantidslist, setmerchantidslist] = useState([])
  const [alreadykyc, setalreadykyc] = useState('')
  const [getbanklistdata, setgetbanklistdata] = useState([])
  const [uisearchblock, setuisearchblock] = useState(false)
  const [uiblockbank, setuiblockbank] = useState(false)
  // const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?+=&])[A-Za-z\d@#$!%*?+=&]{8,}$/
  const banknameregex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/
  const ifscregex = /^[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/
  const accoutregex = /^[0-9]{9,18}$/
  const cityregex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/
  const micrregex = /^\d{9}$/
  const bankNameHandler = (e) => {
    console.log(e)
    setbankName(e)
    setbankNameErrmsg('')
    // if (!banknameregex.test(e.target.value)) {
    //   setbankNameErrmsg('Bank Name is not valid')
    // }
  }
  const bankIFSCCodeHandler = (e) => {
    setbankIFSCCode(e.target.value)
    setbankIFSCCodeErrmsg('')
    if (!ifscregex.test(e.target.value)) {
      setbankIFSCCodeErrmsg('IFSC code is not valid')
    }
  }
  const accountNoHandler = (e) => {
    setaccountNo(e.target.value)
    setaccountNoErrmsg('')
    if (!accoutregex.test(e.target.value)) {
      setaccountNoErrmsg('Account number is not valid')
    }
  }
  const cityHandler = (e) => {
    setcity(e.target.value)
    setcityErrmsg('')
    if (!cityregex.test(e.target.value)) {
      setcityErrmsg('City Name is not valid')
    }
  }
  const micrCodeHandler = (e) => {
    setmicrCode(e.target.value)
    setmicrCodeErrmsg('')
    if (!micrregex.test(e.target.value)) {
      setmicrCodeErrmsg('MICR is not valid')
    }
  }
  const countryOptions =
    getbanklistdata.map((v) => {
      return { value: v, label: v }
    })
  // const onSubmit = data => trigger()
  // const SignupSchema = yup.object().shape({
  //   [`bankName`]: yup.string().min(3).required(),
  //   [`bankIFSCCode`]: yup.string().min(5).required(),
  //   [`accountNo`]: yup.string().min(5).required(),
  //   [`city`]: yup.string().min(3).required(),
  //   [`micrCode`]: yup.string().min(4).required()
  // })
  // const { register, errors, handleSubmit, trigger } = useForm({
  //   resolver: yupResolver(SignupSchema)
  // })

  // const onSubmit = (data) => {
  //   console.log(data)
  //   trigger()
  //   if (isObjEmpty(errors)) {
  //     stepper.next()
  //   }
  // }
  const submitupdatebankdetailshandler = () => {
    console.log("submitupdatebankdetailshandler")
    if (bankName === "Select") {
      toast.warning('Bank Name Can not be empty')
    } else if (bankIFSCCode === "") {
      toast.warning('Bank IFSC Code Can not be empty')
    } else if (accountNo === "") {
      toast.warning('Account Number Can not be empty')
    } else if (city === "") {
      toast.warning('City Can not be empty')
    } else if (micrCode === "") {
      toast.warning('Micr Code Can not be empty')
    } else {
      console.log("call api", bankName, bankIFSCCode, accountNo, city, micrCode)
      const updatebanksendapidata = {
        bankName: bankName.value, bankIFSCCode, accountNo, city, micrCode
      }
      setupdatebtndisabled(true)
      requestsApidata.createBankDetails(updatebanksendapidata, selectmerchantidvalue.value, alreadykyc).then(res => {
        setupdatebtndisabled(false)
        if (res.data.exception === "INPUT_VALIDATION_ERROR") {
          toast.error(res.data.msg[0])
        } else if (res.data.successCode === "API_SUCCESS") {
          toast.success('Bank Details Updated Successfully')
          setselectpgDisplay('none')
          setselectmerchantidvalue(null)
        }
      })
      // if (alreadykyc === 'yes') {
      //   requestsApidata.adminupdatemerchbankdetails(updatebanksendapidata, selectmerchantidvalue.value).then(res => {
      //     setupdatebtndisabled(false)
      //     toast.success('Bank Details Updated Successfully')
      //   })
      // } else if (alreadykyc === 'no') {
      //   requestsApidata.createBankDetails(updatebanksendapidata, selectmerchantidvalue.value).then(res => {
      //     setupdatebtndisabled(false)
      //     toast.success('Bank Details Updated Successfully')
      //   })
      // } 

    }
  }
  const serchmerchanthandler = (e) => {
    // console.log('e', e.target.value)
    setsearchmerchantinputvalue(e.target.value)
    setselectpgDisplay('none')
    setmerchantsearchbtndisabled(false)
  }
  const selectmerchantidHandler = (e) => {
    setuiblockbank(true)
    requestsApidata.merchantserach(e.value).then(res => {
      console.log('merchantserach', res.data)
      setselectmerchantidvalue(e)
      if (res.data.successCode === "API_SUCCESS") {
        if (res.data.extraData.merchantDetail === null) {
          toast.warning('No data found')
        } else if (res.data.extraData.merchantDetail[0].merchantStatus === "BLOCKED") {
          toast.warning('Merchant is blocked')
        } else {
          requestsApidata.admingetmercahntbankdetails(res.data.extraData.merchantDetail[0].merchantId).then(response => {
            if (response.data.exception === "MERCHANT_BANK_DETILS_NOT_FOUND") {
              toast.warning('Bank Details not found in system. You can update')
              setselectpgDisplay('Block')
              setalreadykyc('no')
              setgetbankdetails('')
              setbankName('')
              setbankIFSCCode('')
              setaccountNo('')
              setcity('')
              setmicrCode('')
              setuiblockbank(false)
            } else {
              setselectpgDisplay('Block')
              setalreadykyc('yes')
              setgetbankdetails(response.data.extraData.bankDetail)
              setbankName({ value: response.data.extraData.bankDetail.bankName, label: response.data.extraData.bankDetail.bankName })
              setbankIFSCCode(response.data.extraData.bankDetail.bankIFSCCode)
              setaccountNo(response.data.extraData.bankDetail.accountNo)
              setcity(response.data.extraData.bankDetail.city)
              setmicrCode(response.data.extraData.bankDetail.micrCode)
              setuiblockbank(false)
            }
          })
        }
      } else if (res.data.exception === "MERCHANT_INFORMATION_NOT_FOUND") {
        toast.warning(res.data.msg[0])
        setuiblockbank(false)
      }
    })
  }
  const searchmerchantbtndandlerhandler = () => {
    const letterNumber = /^[a-zA-Z]+(\s)/
    const merchantidmatchregix = /^[0-9]+$/
    if (searchmerchantinputvalue.match(letterNumber)) {
      //  console.log('NAMe String only search by merchant NAME')
      toast.warning('Merchant ID is not valid formate')
    } else if (searchmerchantinputvalue.match(merchantidmatchregix)) {
      //  console.log('ID number only mean search by merchant id', searchmerchantinputvalue)
      setmerchantsearchbtndisabled(true)
      requestsApidata.merchantserach(searchmerchantinputvalue).then(res => {
        //  console.log('merchantserach', res.data)
        setmerchantsearchbtndisabled(false)
        if (res.data.successCode === "API_SUCCESS") {
          if (res.data.extraData.merchantDetail === null) {
            toast.warning('No data found')
          } else {
            requestsApidata.admingetmercahntbankdetails(res.data.extraData.merchantDetail[0].merchantId).then(response => {
              if (response.data.exception === "MERCHANT_BANK_DETILS_NOT_FOUND") {
                toast.error('Merchant Bank Details not found in system.')
              } else {
                setselectpgDisplay('Block')
                setgetbankdetails(response.data.extraData.bankDetail)
                setbankName(response.data.extraData.bankDetail.bankName)
                setbankIFSCCode(response.data.extraData.bankDetail.bankIFSCCode)
                setaccountNo(response.data.extraData.bankDetail.accountNo)
                setcity(response.data.extraData.bankDetail.city)
                setmicrCode(response.data.extraData.bankDetail.micrCode)
              }
            })
          }
        } else if (res.data.exception === "MERCHANT_INFORMATION_NOT_FOUND") {
          toast.warning(res.data.msg[0])
        }
      })
    } else if (searchmerchantinputvalue === "") {
      toast.warning('Merchant ID can not be empty')
    } else {
      // console.log('Input is not valid formate', searchmerchantinputvalue, !isNaN(+searchmerchantinputvalue))
      toast.warning('Merchant ID is not valid formate')
    }
  }
  const getallmerchantreport = () => {
    setuisearchblock(true)
    requestsApidata.allMerchantDetailsReport().then(res => {
      // console.log("final resonse", res.data)
      setmerchantidslist(res.data.extraData.merchantDetails)
      setuisearchblock(false)

      // setBlock(false)
    })
  }
  const getgetBankList = () => {
    requestsApidata.getBankList().then(res => {
      console.log('res.data', res.data)
      if (res.data.successCode === "API_SUCCESS") {
        setgetbanklistdata(res.data.extraData.bankDetail)
      }
    })
  }
  useEffect(() => {
    // requestsApidata.pgdetailslinkmerchant().then(res => {
    //   console.log('res.data', res.data)
    //   if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
    //     toast.error("Session Expired login again!")
    //     props.history.push("/")
    //   }
    //   })
    getallmerchantreport()
    getgetBankList()
  }, [])

  const merchantlistOptions =
    merchantidslist.map((v) => {
      return { value: v.merchantId, label: v.merchantId }
    })
  return (
    <Fragment>
      <div>
        <UILoader blocking={uisearchblock}>

          <Row>
            <Col lg="3">
              <Label>Search Merchant by Merchant ID</Label>
              <Select
                isClearable={false}
                id='kycStatus'
                className='react-select'
                classNamePrefix='select'
                options={merchantlistOptions}
                onChange={selectmerchantidHandler}
                value={selectmerchantidvalue}
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              />
            </Col>
          </Row>
        </UILoader>

      </div>
      <UILoader blocking={uiblockbank}>

        <div style={{ marginTop: 10, display: selectpgDisplay }}>
          <Row>
            <FormGroup tag={Col} md='6'>
              <Label className='form-label' for={`bankName`}>
                Bank Name <span style={{ color: 'red', fontWeight: 'bold' }}>*</span>
              </Label>
              {/* <Input
              name={`bankName`}
              id={`bankName`}
              placeholder='Bank Name'
              value={bankName}
              onChange={bankNameHandler}
            /> */}
              <Select
                // theme={selectThemeColors}
                isClearable={false}
                id='kycStatus'
                className='react-select'
                classNamePrefix='select'
                options={countryOptions}
                //   defaultValue={countryOptions[0]}
                onChange={bankNameHandler}
                value={bankName}
              // onFocus={handleFocus}
              />
              <span style={{ color: 'red' }}>{bankNameErrmsg}</span>
            </FormGroup>
            <FormGroup tag={Col} md='6'>
              <Label className='form-label' for={`bankIFSCCode`}>
                Bank IFSC Code <span style={{ color: 'red', fontWeight: 'bold' }}>*</span>
              </Label>
              <Input
                name={`bankIFSCCode`}
                id={`bankIFSCCode`}
                placeholder='Bank IFSC Code'
                value={bankIFSCCode}
                onChange={bankIFSCCodeHandler}
              />
              <span style={{ color: 'red' }}>{bankIFSCCodeErrmsg}</span>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup tag={Col} md='6'>
              <Label className='form-label' for={`accountNo`}>
                Account Number <span style={{ color: 'red', fontWeight: 'bold' }}>*</span>
              </Label>
              <Input
                name={`accountNo`}
                id={`accountNo`}
                placeholder='Account Number'
                value={accountNo}
                onChange={accountNoHandler}
              />
              <span style={{ color: 'red' }}>{accountNoErrmsg}</span>
            </FormGroup>
            <FormGroup tag={Col} md='6'>
              <Label className='form-label' for={`city`}>
                City <span style={{ color: 'red', fontWeight: 'bold' }}>*</span>
              </Label>
              <Input
                name={`city`}
                id={`city`}
                placeholder='City'
                value={city}
                onChange={cityHandler}
              />
              <span style={{ color: 'red' }}>{cityErrmsg}</span>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup tag={Col} md='6'>
              <Label className='form-label' for={`micrCode`}>
                Micr Code <span style={{ color: 'red', fontWeight: 'bold' }}>*</span>
              </Label>
              <Input
                name={`micrCode`}
                id={`micrCode`}
                placeholder='Micr Code'
                value={micrCode}
                onChange={micrCodeHandler}
              />
              <span style={{ color: 'red' }}>{micrCodeErrmsg}</span>
            </FormGroup>
          </Row>
          <div className='d-flex justify-content-between'>
            <Button color='primary' onClick={submitupdatebankdetailshandler} disabled={updatebtndisabled}>
              Submit
            </Button>
          </div>
        </div>
      </UILoader>
    </Fragment>
  )
}

export default InfoTabContent
