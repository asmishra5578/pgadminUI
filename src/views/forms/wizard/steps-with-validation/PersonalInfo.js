import { Fragment, useEffect, useState} from 'react'
import Select from 'react-select'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { selectThemeColors, isObjEmpty } from '@utils'
import { Label, FormGroup, Row, Col, Button, Form, Input, CustomInput, Badge} from 'reactstrap'
import  st  from '../../../../@core/secureStore/useSecure'
import { useHistory } from 'react-router-dom'

import '@styles/react/libs/react-select/_react-select.scss'
import requestsApi from './request'
import { toast } from 'react-toastify'

const requestsApidata = new requestsApi()

const PersonalInfo = ({ stepper, type }) => {
  const { register, errors, handleSubmit, trigger } = useForm()
  const [data, setdata] = useState([])
  const history = useHistory()
   
  const onSubmit = () => {
    toast.success('PG associated Successfully')
    stepper.next()
  //   console.log('st', st.get('merchantid'))
  //  const sendpguuid = "1"
  //  const sendmerchantid = st.get('merchantid')
  //  const sendpgservice = "WALLET"
  //  const sendpgstatus = "ACTIVE"
  //   requestsApidata.MerchantPGDetailsAsociation(sendpguuid, sendmerchantid).then(async(res) => {
  //    await requestsApidata.MerchantPGServiceAssociation(sendpguuid, sendpgservice, sendmerchantid).then(async(res) => {
  //    await requestsApidata.UpdateMerchantPGStatus(sendmerchantid, sendpgstatus, sendpguuid).then(async(res) => {
  //    await requestsApidata.UpdateMerchantService(sendmerchantid, sendpguuid, sendpgstatus, sendpgservice).then((res) => {
  //       console.log('res uppg service data', res.data)
  //       if (res.data.status === "ACTIVE") {
  //       toast.success('Merhant PG and services added successfully')
  //       st.remove('merchantid')
  //       stepper.next()
  //       }
  //     })
  //   })
  //   })
  //   })
    // trigger()
    // if (isObjEmpty(errors)) {
    //   stepper.next()
    // }
  }
  useEffect(() => {
    requestsApidata.pgdetailslinkmerchant().then(res => {
      // console.log('res.data', res.data)
      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error("Session Expired login again!")
        history.push("/")
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error("Session Expired login again!")
        history.push("/")
      }  else {
      const map = new Map(res.data.extraData.pgDetail.map(({pg_name, pg_uuid, created, pg_status, pg_services, service_status}) => [pg_name, {pg_name, pg_servicea: [], pg_uuid, created, pg_status}]))
      for (const {pg_name, service_status, pg_services} of res.data.extraData.pgDetail) map.get(pg_name).pg_servicea.push(...[{pgservices:pg_services, servicestatus:service_status}].flat())
      // console.log("pgdetailslinkmerchant", [...map.values()])
      // setdata([...map.values()])
      const filterdatabyactivepg = [...map.values()].filter(item => item.pg_status === "ACTIVE")
      // console.log("filterdatabyactivepg", filterdatabyactivepg)
      // filterdatabyactivepg.map((v) => {
      //   console.log('vvv', v.pg_servicea)
      //   v.pg_servicea.map((val) => {
      //     console.log('val', val.servicestatus)
      //     const checkservicestatus = filterdatabyactivepg.filter(item => item.servicestatus)
      //   })
      // })
      // console.log('checkservicestatus', checkservicestatus)
      setdata(filterdatabyactivepg)
      }
      })
  }, [])
  const countryOptions = [
    { value: 'UK', label: 'UK' },
    { value: 'USA', label: 'USA' },
    { value: 'Spain', label: 'Spain' },
    { value: 'France', label: 'France' },
    { value: 'Italy', label: 'Italy' },
    { value: 'Australia', label: 'Australia' }
  ]
  const  customInputSwitched = pgservice => (e) => {
    console.log("customInputSwitched", e.target.checked, pgservice, e.target.id)
    const sendmerchantid = st.get('merchantid')
    if (e.target.checked === true) {
      alert('Please OK for Active Service')
     requestsApidata.MerchantPGServiceAssociation((e.target.id).substring(1), pgservice, sendmerchantid).then(async(res) => {
        if (res.data.status === 417) {
          toast.warning(res.data.message)
        } else {
      await requestsApidata.UpdateMerchantService(sendmerchantid, (e.target.id).substring(1), 'ACTIVE', pgservice).then((response) => {
        // console.log('updateservuce response', response.data)
        if (response.data.successCode === "API_SUCCESS") {
          toast.success('Merchant Service Successfully Activate')
        } else {
          toast.warning(response.data.msg[0])
        }
      })
    }
     })
    } else   if (e.target.checked === false) {
      alert('Please OK for InActive Service')
       requestsApidata.UpdateMerchantService(sendmerchantid, (e.target.id).substring(1), 'BLOCKED', pgservice).then((res) => {
        // console.log('updateservuce response', response.data)
        if (res.data.successCode === "API_SUCCESS") {
          toast.success('Merchant Service Successfully InActivate')
        } else {
          toast.warning(res.data.msg[0])
        }
      })
    }
  }
  const  customInputSwitchedselectpg = pguuid => (e) => {

    const sendmerchantid = st.get('merchantid')
    if (e.target.checked === true) {
      alert('Please OK for Active PG')
      //  console.log("customInputSwitchedselectpg", e.target.checked, pguuid, e.target.id)
    requestsApidata.MerchantPGDetailsAsociation(pguuid, sendmerchantid).then(async(res) => {
      await requestsApidata.UpdateMerchantPGStatus(sendmerchantid, "ACTIVE", pguuid).then((res) => {
        console.log('res update pg service', res.data)
        if (res.data.successCode === "API_SUCCESS") {
          toast.success('Merchant PG Successfully Activate')
        }
      })
    })
    } else if (e.target.checked === false) {
      alert('Please OK for InActive PG')
      // requestsApidata.MerchantPGDetailsAsociation(pguuid, '640667279174').then(async(res) => {
         requestsApidata.UpdateMerchantPGStatus(sendmerchantid, "BLOCKED", pguuid).then((res) => {
          console.log('res update pg service', res.data)
          if (res.data.successCode === "API_SUCCESS") {
            toast.success('Merchant PG Successfully InActivate')
          }
        })
      // })
    }
    // console.log("customInputSwitchedselectpg", e.target.checked, pguuid, e.target.id)
    // requestsApidata.MerchantPGDetailsAsociation(pguuid, '640667279174').then(async(res) => {
    //   await requestsApidata.UpdateMerchantPGStatus('640667279174', "ACTIVE", pguuid).then((res) => {
    //     console.log('res update pg service', res.data)
    //     if (res.data.status === "ACTIVE") {
    //       toast.success('Merchant PG Successfully Activate')
    //     }
    //   })
    // })
  }
  const routetomerhantDetails = () => {
    // history.push('/pg/merchantdetails')
    history.push('/dashboard/ecommerce')      

  }
  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>PG Attach</h5>
        <small>Attach PG and Services</small>
        <Badge style={{marginLeft:10, cursor:'pointer'}} color='warning' onClick={routetomerhantDetails}>Skip for Now</Badge>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='' style={{marginTop:10}}>
      <h6>Click on checkbox for Select PG and Associate With Service</h6>
      <Row>
          <Col lg="3">
            <h6 style={{ color: 'green', fontWeight: 'bold' }}>Exists PG</h6>

          </Col>
          <Col lg={{ offset: 1, size: 8 }}>
            <h6 style={{ color: 'green', fontWeight: 'bold' }}>Associated Service</h6>
          </Col>
        </Row>
        {data.map((v, k) => {
      return <div style={{ borderBottom: '1px solid grey', marginTop: 10 }}>
   <Row>
                <Col lg='3'>
                  {/* <p><span style={{ fontWeight: 'bold' }}> <CustomInput defaultChecked={v.pgstatus === "ACTIVE"} onChange={addNewPGcustominputHandler(v.pguuid)} type='checkbox' label={v.pgname} id={v.pguuid} />  </span></p> */}
                  <p><span style={{fontWeight:'bold'}}> <CustomInput onChange={customInputSwitchedselectpg(v.pg_uuid)} type='checkbox' label={v.pg_name } id={v.pg_uuid} /></span></p>

                </Col>
                <Col lg={{ offset: 1, size: 8 }}>
                  {v.pg_servicea.map((val, key) => {
                    return <div style={{ display: 'inline-block' }}>
                      <span> {val.servicestatus === null ? "No Data" :  val.servicestatus === "ACTIVE" ? <li style={{ marginLeft: 20, listStyleType: 'none' }}><CustomInput onChange={customInputSwitched(val.pgservices)} type='checkbox' label={val.pgservices } id={(key + 1) + v.pg_uuid} /></li> : <span></span>}</span>
                    </div>
                  })}
                </Col>
                <hr />
              </Row>

      {/* <div style={{paddingLeft:10, marginTop:5}}>
         <p><span style={{fontWeight:'bold'}}> <CustomInput onChange={customInputSwitchedselectpg(v.pg_uuid)} type='checkbox' label={v.pg_name } id={v.pg_uuid} /></span></p>
          {v.pg_servicea.map((val, key) => {
          return  <Col lg="3">
             <p> <span> {val.servicestatus === null ? "No Data"  : val.servicestatus === "ACTIVE" ? <span><CustomInput onChange={customInputSwitched(val.pgservices)} type='checkbox' label={val.pgservices } id={(key + 1) + v.pg_uuid} /></span> : <span></span>}</span></p>
            </Col>
          })}
        </div> */}


        </div>
    }) }
      
      </div>
        
        <div className='d-flex justify-content-between' style={{marginTop:20}}>
          <Button.Ripple type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
          </Button.Ripple>
        </div>
      </Form>
    </Fragment>
  )
}

export default PersonalInfo
