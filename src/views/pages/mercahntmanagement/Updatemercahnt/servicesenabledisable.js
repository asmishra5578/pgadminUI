import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import { useForm, Controller } from 'react-hook-form'
import { Label, Input, FormGroup, Row, Col, Button, Form, CustomInput } from 'reactstrap'
import { Fragment, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import UILoader from '@components/ui-loader'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import requestsApi from './request'
import { RefreshCcw } from 'react-feather'

const requestsApidata = new requestsApi()

const InfoTabContent = ({ }) => {
  const history = useHistory()

  const [Bankinfo, setBankinfo] = useState([])
  const [modal, setModal] = useState(false)
  const [searchmerchantinputvalue, setsearchmerchantinputvalue] = useState('')
  const [merchantsearchbtndisabled, setmerchantsearchbtndisabled] = useState(false)
  const [existingmercahantpg, setexistingmercahantpg] = useState([])
  const [addnewpgandservicedata, setaddnewpgandservicedata] = useState([])
  const [selectpgDisplay, setselectpgDisplay] = useState('none')
  const [selectmerchantidvalue, setselectmerchantidvalue] = useState('Select')
  const [merchantidslist, setmerchantidslist] = useState([])
  const [alreadypgdata, setalreadypgdata] = useState([])
  const [newpgdataarrar, setnewpgdataarrar] = useState([])
  const [servicenableBlockUI, setservicenableBlockUI] = useState(false)
  const [uisearchblock, setuisearchblock] = useState(false)
  const handleModal = () => setModal(!modal)
  // const onSubmit = data => trigger()


  const getallmerchantreport = () => {
    setuisearchblock(true)
    setservicenableBlockUI(true)
    
    requestsApidata.allMerchantDetailsReport().then(res => {
      setmerchantidslist(res.data.extraData.merchantDetails)
      setuisearchblock(false)
      setservicenableBlockUI(false)
 
    })
  }
  useEffect(() => {
    requestsApidata.pgdetailslinkmerchant().then(res => {
      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else {
        console.log("new pg response resonse", res.data.extraData.pgDetail)
        const newactiPGdata = res.data.extraData.pgDetail.filter((m) => m.pg_status === "ACTIVE")
        console.log('newactiveservicedata', newactiPGdata)
        const activeservicearr = newactiPGdata.filter((m) => m.service_status === "ACTIVE")
        console.log('activeservicearr', activeservicearr)
        const map = new Map(activeservicearr.map(({ pg_name, pg_uuid, created, pg_status, pg_services, service_status }) => [pg_name, { pg_name, pg_servicea: [], pg_uuid, created, pg_status }]))
        for (const { pg_name, service_status, pg_services } of activeservicearr) map.get(pg_name).pg_servicea.push(...[{ pgservices: pg_services, servicestatus: service_status }].flat())
        setaddnewpgandservicedata([...map.values()])
        getallmerchantreport()
        console.log("datata", [...map.values()])
      }
    })
  }, [])
  const getrefreshdata = (merchantid) => {
    setalreadypgdata([])
    setmerchantsearchbtndisabled(true)
    requestsApidata.merchantserach(merchantid).then(res => {
      console.log('select merchant id data', res.data)
      if (res.data.successCode === "API_SUCCESS") {
        if (res.data.extraData.merchantDetail[0].merchantStatus === "BLOCKED") {
          toast.warning('Merchant Status is Blocked')
          setmerchantsearchbtndisabled(false)
          setuisearchblock(false)
          setselectpgDisplay('none')
          setservicenableBlockUI(false)
        } else if (res.data.extraData.merchantDetail[0].merchantStatus === "ACTIVE") {
          setservicenableBlockUI(false)
          setuisearchblock(false)

          const selectmidataresponse = res.data.extraData.merchantDetail[0].merchantpgdetails
          // console.log('allactivePGandservices', addnewpgandservicedata)
          // console.log('selectMIDdata', selectmidataresponse)

          const results = addnewpgandservicedata.filter(({ pg_name: id1 }) => !selectmidataresponse.some(({ pgname: id2 }) => id2 === id1))
          // console.log('result', results)
          const results1 = selectmidataresponse.filter(({ pgname: id1 }) => !addnewpgandservicedata.some(({ pg_name: id2 }) => id2 === id1))
          // console.log('alredypgdata', results1)
          const finalmidPGdata = selectmidataresponse.filter(({ pgname: id1 }) => !results1.some(({ pgname: id2 }) => id2 === id1))
          // console.log("finalmidPGdata", finalmidPGdata)

          setaddnewpgandservicedata(results)
          setmerchantsearchbtndisabled(false)
          setselectpgDisplay('block')

          const temparat = finalmidPGdata.map(v => {
            const matching = addnewpgandservicedata.find(x => x.pg_name === v.pgname)
            // console.log('matching', matching)
            if (matching) {
              // temparat.push(matching)
              const filteredArray = matching.pg_servicea.filter(item1 => !v.merchantservicedetails.some(item2 => item1.pgservices === item2.serviceType))
              //  console.log('filteredArray', filteredArray)
              v.newdata = filteredArray
            }
            return v
          })
          // console.log('temparat', temparat)
          setalreadypgdata(temparat)
        }
      }
      // const arr2 = finalmidPGdata.map((v) => {
      //   const foundname = alreadypgdata.find(x => x.pg_name === v.pgname)
      //   console.log('foundname', foundname)
      //   if (foundname) {
      //     const filteredArray = foundname.pg_servicea.filter(item1 => !v.merchantservicedetails.some(item2 => item1.pgservices === item2.serviceType))
      //     v.newdata = filteredArray
      //   }
      //   return v
      // })
      // console.log('arr2', arr2)
      // if (res.data.successCode === "API_SUCCESS") {
      //   if (res.data.extraData.merchantDetail === null) {
      //     toast.warning('No data found')
      //   } else if (res.data.extraData.merchantDetail[0].merchantStatus === "BLOCKED") {
      //     toast.warning('Merchant is Blocked')
      //   } else {
      //     setexistingmercahantpg(res.data.extraData.merchantDetail)
      //     setselectpgDisplay('block')
      //     const exitingfinaarrayata = selectmidataresponse
      //     selectmidataresponse.map((v) => {
      //       const filterdatsas = addnewpgandservicedata.filter((m) => m.pg_name === v.pgname)
      //       alreadypgdata.push(filterdatsas[0])
      //     })
      //     const arr2 = exitingfinaarrayata.map((v) => {
      //       const foundname = alreadypgdata.find(x => x.pg_name === v.pgname)
      //       console.log('foundname', foundname)
      //       if (foundname) {
      //         const filteredArray = foundname.pg_servicea.filter(item1 => !v.merchantservicedetails.some(item2 => item1.pgservices === item2.serviceType))
      //         v.newdata = filteredArray
      //       }
      //       return v
      //     })
      //     console.log('arr2', arr2)
      //     setnewpgdataarrar(arr2)
      //   }
      // } else if (res.data.exception === "MERCHANT_INFORMATION_NOT_FOUND") {
      //   toast.warning(res.data.msg[0])
      // } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
      //   toast.error('Session Expired Login again!')
      //   history.push('/')
      // } else if (res.data.exception === "JWT_MISSING") {
      //   toast.error('Session Expired Login again!')
      //   history.push('/')
      // }
    })
  }
  const serviceFinalHandler = pgservice => (e) => {
    const sendmerchantid = selectmerchantidvalue.value
    setservicenableBlockUI(true)
    requestsApidata.MerchantPGServiceAssociation((e.target.id).substring(1), pgservice, sendmerchantid).then(async (res) => {
      if (res.data.exception === "PGID_AND_SERVICE_ALREADY_MAPPED_WITH_MERCHANT") {
        requestsApidata.UpdateMerchantService(sendmerchantid, (e.target.id).substring(1), e.target.checked === true ? "ACTIVE" : "BLOCKED", pgservice).then((response) => {
          console.log('updateservuce response', response.data)
          setservicenableBlockUI(false)
          if (response.data.successCode === "API_SUCCESS") {
            if (response.data.extraData.MerchantPGServicesDetails.status === "ACTIVE") {
              toast.success('Merchant Service Successfully Activate')
            } else if (response.data.extraData.MerchantPGServicesDetails.status === "BLOCKED") {
              toast.success('Merchant Service Successfully InActivate')
            }
          } else if (response.data.exception === "MERCHANT_PG_SERVICE_NOT_ASSOCIATED") {
            toast.warning('Merchant associated with service , but service not found.')
          } else if (response.data.exception === "PG_SERVICE_ASSOCIATION_NOT_FOUND") {
            toast.warning(res.data.msg[0])
          } else if (response.data.exception === "PG_NOT_ACTIVE") {
            toast.warning(response.data.msg[0])
          } else {
            toast.warning(response.data.msg[0])
          }
        })
      } else if (res.data.exception === "PG_INFORMATION_NOT_FOUND") {
        toast.warning(res.data.msg[0])
        setservicenableBlockUI(false)
      } else if (res.data.status === 200) {
        requestsApidata.UpdateMerchantService(sendmerchantid, (e.target.id).substring(1), e.target.checked === true ? "ACTIVE" : "BLOCKED", pgservice).then((response) => {
          console.log('updateservuce response', response.data)
          setservicenableBlockUI(false)
          if (response.data.successCode === "API_SUCCESS") {
            if (response.data.extraData.MerchantPGServicesDetails.status === "ACTIVE") {
              toast.success('Merchant Service Successfully Activate')
            } else if (response.data.extraData.MerchantPGServicesDetails.status === "BLOCKED") {
              toast.success('Merchant Service Successfully InActivate')
            }
          } else if (response.data.exception === "MERCHANT_PG_SERVICE_NOT_ASSOCIATED") {
            toast.warning('Merchant associated with service , but service not found.')
          } else if (response.data.exception === "PG_SERVICE_ASSOCIATION_NOT_FOUND") {
            toast.warning(res.data.msg[0])
          } else if (response.data.exception === "PG_NOT_ACTIVE") {
            toast.warning(response.data.msg[0])
          } else {
            toast.warning(response.data.msg[0])
          }
        })
      }

    })


  }
  const addNewPGcustominputHandler = pguuid => (e) => {
    // console.log("addNewPGcustominputHandler", e.target.checked, pguuid, e.target.id, existingmercahantpg[0].merchantId)

    const sendmerchantid = selectmerchantidvalue.value
    if (e.target.checked === true) {
      alert('Please OK for Active PG')
      //  console.log("customInputSwitchedselectpg", e.target.checked, pguuid, e.target.id)
      setservicenableBlockUI(true)
      requestsApidata.MerchantPGDetailsAsociation(pguuid, sendmerchantid).then(async (res) => {
        if (res.data.successCode === "API_SUCCESS") {
          await requestsApidata.UpdateMerchantPGStatus(sendmerchantid, "ACTIVE", pguuid).then((resp) => {
            console.log('res update pg service', resp.data)
            setservicenableBlockUI(false)
            if (resp.data.successCode === "API_SUCCESS") {
              if (resp.data.extraData.merchantDetail.status === "ACTIVE") {
                toast.success('Merchant PG Successfully Activate')
              }
            } else if (resp.data.extraData.merchantDetail.status === "ACTIVE") {
              toast.success('Merchant PG Successfully Activate')
            } else if (resp.data.exception === "MERCHANT_NOT_FOUND") {
              toast.warning(resp.data.msg[0])
            } else if (resp.data.exception === "MERCHANT_PG_SERVICE_NOT_ASSOCIATED") {
              toast.warning(resp.data.msg[0])
            } else if (resp.data.exception === "PG_SERVICE_ASSOCIATION_NOT_FOUND") {
              toast.warning(resp.data.msg[0])
            } else if (resp.data.exception === "PG_NOT_ACTIVE") {
              toast.warning(resp.data.msg[0])
            } else {
              toast.warning(resp.data.msg[0])
            }
          })
        } else if (res.data.exception === "MERCHANT_PG_ASSOCIATION_EXISTS") {
          await requestsApidata.UpdateMerchantPGStatus(sendmerchantid, "ACTIVE", pguuid).then((resp) => {
            console.log('res update pg service', resp.data)
            setservicenableBlockUI(false)
            if (resp.data.successCode === "API_SUCCESS") {
              if (resp.data.extraData.merchantDetail.status === "ACTIVE") {
                toast.success('Merchant PG Successfully Activate')
              }
            } else if (resp.data.extraData.merchantDetail.status === "ACTIVE") {
              toast.success('Merchant PG Successfully Activate')
            } else if (resp.data.exception === "MERCHANT_NOT_FOUND") {
              toast.warning(resp.data.msg[0])
            } else if (resp.data.exception === "MERCHANT_PG_SERVICE_NOT_ASSOCIATED") {
              toast.warning(resp.data.msg[0])
            } else if (resp.data.exception === "PG_SERVICE_ASSOCIATION_NOT_FOUND") {
              toast.warning(resp.data.msg[0])
            } else if (resp.data.exception === "PG_NOT_ACTIVE") {
              toast.warning(resp.data.msg[0])
            } else {
              toast.warning(resp.data.msg[0])
            }
          })
        } else {
          toast.warning(res.data.msg[0])
        }
      })
    } else if (e.target.checked === false) {
      alert('Please OK for InActive PG')
      // requestsApidata.MerchantPGDetailsAsociation(pguuid, '640667279174').then(async(res) => {
      setservicenableBlockUI(true)
      requestsApidata.UpdateMerchantPGStatus(sendmerchantid, "BLOCKED", pguuid).then((res) => {
        console.log('res update pg service', res.data)
        setservicenableBlockUI(false)
        if (res.data.successCode === "API_SUCCESS") {
          if (res.data.extraData.merchantDetail.status === "BLOCKED") {
            toast.success('Merchant PG Successfully InActivate')
          }
        } else if (res.data.exception === "MERCHANT_NOT_FOUND") {
          toast.warning(res.data.msg[0])
        } else if (res.data.exception === "MERCHANT_PG_SERVICE_NOT_ASSOCIATED") {
          toast.warning(res.data.msg[0])
        } else if (res.data.exception === "PG_SERVICE_ASSOCIATION_NOT_FOUND") {
          toast.warning(res.data.msg[0])
        } else if (res.data.exception === "PG_NOT_ACTIVE") {
          toast.warning(res.data.msg[0])
        } else {
          toast.warning(res.data.msg[0])
        }
      })
    }
    //  else if (res.data.exception === "MERCHANT_PG_ASSOCIATION_EXISTS") {
    //   toast.warning('The Association Between Merchant and PG already present.')
    // } else if (res.data.exception === "PG_SERVICE_ASSOCIATION_NOT_FOUND") {
    //   toast.warning('PG and Provided services association not found.')
    // }
    // else if (e.target.checked === false) {
    //   alert('Please OK for InActive PG')
    //      requestsApidata.UpdateMerchantPGStatus(sendmerchantid, "BLOCKED", pguuid).then((res) => {
    //       console.log('res update pg service', res.data)
    //       if (res.data.status === "BLOCKED") {
    //         toast.success('Merchant PG Successfully InActivate')
    //       }
    //     })
    // }
  }

  const merchantlistOptions =
    merchantidslist.map((v) => {
      return { value: v.merchantId, label: v.merchantId }
    })
  const refreshdataHandler = () => {
    setselectmerchantidvalue('Select')
    setalreadypgdata([])
    setexistingmercahantpg([])
    setselectpgDisplay('none')
    setuisearchblock(true)
    requestsApidata.pgdetailslinkmerchant().then(res => {
      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else {
        toast.success('Data Updated Successfully')
        // console.log("new pg response resonse", res.data.extraData.pgDetail)
        const newactiPGdata = res.data.extraData.pgDetail.filter((m) => m.pg_status === "ACTIVE")
        // console.log('newactiveservicedata', newactiPGdata)
        const activeservicearr = newactiPGdata.filter((m) => m.service_status === "ACTIVE")
        // console.log('activeservicearr', activeservicearr)
        const map = new Map(activeservicearr.map(({ pg_name, pg_uuid, created, pg_status, pg_services, service_status }) => [pg_name, { pg_name, pg_servicea: [], pg_uuid, created, pg_status }]))
        for (const { pg_name, service_status, pg_services } of activeservicearr) map.get(pg_name).pg_servicea.push(...[{ pgservices: pg_services, servicestatus: service_status }].flat())
        setaddnewpgandservicedata([...map.values()])
        getallmerchantreport()
        setuisearchblock(false)
        // console.log("datata", [...map.values()])
      }
    })
  }
  const selectmerchantidHandler = (e) => {
    // refreshdataHandler()
    setselectmerchantidvalue(e)
    setalreadypgdata([])
    setexistingmercahantpg([])
    setselectpgDisplay('none')
    setservicenableBlockUI(true)
    setuisearchblock(true)
    requestsApidata.pgdetailslinkmerchant().then(res => {
      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else {
        // console.log("new pg response resonse", res.data.extraData.pgDetail)
        const newactiPGdata = res.data.extraData.pgDetail.filter((m) => m.pg_status === "ACTIVE")
        // console.log('newactiveservicedata', newactiPGdata)
        const activeservicearr = newactiPGdata.filter((m) => m.service_status === "ACTIVE")
        // console.log('activeservicearr', activeservicearr)
        const map = new Map(activeservicearr.map(({ pg_name, pg_uuid, created, pg_status, pg_services, service_status }) => [pg_name, { pg_name, pg_servicea: [], pg_uuid, created, pg_status }]))
        for (const { pg_name, service_status, pg_services } of activeservicearr) map.get(pg_name).pg_servicea.push(...[{ pgservices: pg_services, servicestatus: service_status }].flat())
        setaddnewpgandservicedata([...map.values()])
        // getallmerchantreport()
        getrefreshdata(e.value)
        // console.log("datata", [...map.values()])
      }
    })
  }

  return (
    <Fragment>
      <p>Enable disable Merchant PG and Services</p>
      <div>
        <UILoader blocking={uisearchblock}>

          <Row>
            <Col lg="3">
              <Label>Select Merchant ID</Label>
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
            <Col lg="3">
              <Button className='ml-2' color='primary' onClick={refreshdataHandler} style={{ marginTop: 21 }}>
                <RefreshCcw size={15} />
                <span className='align-middle ml-50'>Reset</span>
              </Button>
            </Col>
          </Row>
        </UILoader>
      </div>
      <div style={{ marginTop: 10, display: selectpgDisplay }}>
        <Row>
          <Col lg="3">
            <h6 style={{ color: 'green', fontWeight: 'bold' }}>Already Exists PG</h6>

          </Col>
          <Col lg={{ offset: 1, size: 8 }}>
            <h6 style={{ color: 'green', fontWeight: 'bold' }}>Associated Service</h6>
          </Col>
        </Row>
        <div>
          <UILoader blocking={servicenableBlockUI}>
            {alreadypgdata.length === 0 ? null : alreadypgdata.map((v, k) => {
              return <div style={{ borderBottom: '1px solid grey', marginTop: 10 }}>
                <Row>
                  <Col lg='3'>
                    <p><span style={{ fontWeight: 'bold' }}> <CustomInput defaultChecked={v.pgstatus === "ACTIVE" || v.pgstatus === "APPROVED"} onChange={addNewPGcustominputHandler(v.pguuid)} type='checkbox' label={v.pgname} id={v.pguuid} />  </span></p>

                  </Col>
                  <Col lg={{ offset: 1, size: 8 }}>
                    {v.merchantservicedetails.map((val, key) => {
                      return <div style={{ display: 'inline-block' }}>
                        <span> {val.serviceStatus === null ? "No Data" : <li style={{ marginLeft: 20, listStyleType: 'none' }}><CustomInput defaultChecked={val.serviceStatus === "ACTIVE"} onChange={serviceFinalHandler(val.serviceType)} type='checkbox' label={val.serviceType} id={(key + 2) + v.pguuid} /></li>}</span>
                      </div>
                    })}
                    {v.newdata.map((value, key) => {
                      return <div style={{ display: 'inline-block' }}>
                        <span> {value.servicestatus === null ? "No Data" : <li style={{ marginLeft: 20, listStyleType: 'none' }}><CustomInput onChange={serviceFinalHandler(value.pgservices)} type='checkbox' label={value.pgservices} id={(key + 9) + v.pguuid} /></li>}</span>
                      </div>
                    })}
                  </Col>
                  <hr />
                </Row>
              </div>
            })}
            {addnewpgandservicedata.map((v, k) => {
              return v.pg_status === "ACTIVE" ? <div>
                <div style={{ borderBottom: '1px solid grey', marginTop: 10 }}>
                  <Row>
                    <Col lg='3'>
                      <p><span style={{ fontWeight: 'bold' }}>{<CustomInput onChange={addNewPGcustominputHandler(v.pg_uuid)} type='checkbox' label={v.pg_name} id={v.pg_uuid} />} </span></p>
                    </Col>
                    <Col lg={{ offset: 1, size: 8 }}>
                      {v.pg_servicea.map((val, key) => {
                        return <div style={{ display: 'inline-block' }}>
                          <span> {val.servicestatus === null ? "No Data" : val.servicestatus === "ACTIVE" ? <li style={{ marginLeft: 20, listStyleType: 'none' }}> <CustomInput onChange={serviceFinalHandler(val.pgservices)} type='checkbox' label={val.pgservices} id={(key + 1) + v.pg_uuid} /></li> : <span></span>}</span>
                        </div>
                      })}
                    </Col>
                    <hr />
                  </Row>
                </div>
              </div> : <div></div>
              // return <div style={{ borderBottom: '1px solid grey', marginTop: 10 }}>
              //   <Row>
              //     <Col lg='3'>
              //       <p><span style={{ fontWeight: 'bold' }}>{ <CustomInput onChange={addNewPGcustominputHandler(v.pg_uuid)} type='checkbox' label={v.pg_name} id={v.pg_uuid} />} </span></p>
              //     </Col>
              //     <Col lg={{ offset: 1, size: 8 }}>
              //       {v.pg_servicea.map((val, key) => {
              //         return <div style={{ display: 'inline-block' }}>
              //           <span> {val.servicestatus === null ? "No Data" : val.servicestatus === "ACTIVE" ? <li style={{ marginLeft: 20, listStyleType: 'none' }}> <CustomInput onChange={serviceFinalHandler(val.pgservices)} type='checkbox' label={val.pgservices} id={(key + 1) + v.pg_uuid} /></li> : <span></span>}</span>
              //         </div>
              //       })}
              //     </Col>
              //     <hr />
              //   </Row>
              // </div>
            })}
          </UILoader>
        </div>
      </div>

    </Fragment>
  )
}

export default InfoTabContent
