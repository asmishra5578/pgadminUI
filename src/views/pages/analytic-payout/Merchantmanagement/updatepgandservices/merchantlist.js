import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import { useForm, Controller } from 'react-hook-form'
import { Label, Input, FormGroup, Row, Col, Button, Form, CustomInput, Card } from 'reactstrap'
import { Fragment, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import UILoader from '@components/ui-loader'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import requestsApi from './requests'
import { RefreshCcw } from 'react-feather'
import { array } from 'prop-types'

const requestsApidata = new requestsApi()

const DataTableWithButtons = ({ }) => {
  const history = useHistory()

  const [Bankinfo, setBankinfo] = useState([])
  const [modal, setModal] = useState(false)
  const [searchmerchantinputvalue, setsearchmerchantinputvalue] = useState('')
  const [merchantsearchbtndisabled, setmerchantsearchbtndisabled] = useState(false)
  const [existingmercahantpg, setexistingmercahantpg] = useState([])
  const [addnewpgandservicedata, setaddnewpgandservicedata] = useState([])
  const [selectpgDisplay, setselectpgDisplay] = useState('none')
  const [selectmerchantidvalue, setselectmerchantidvalue] = useState('Select')
  const [alreadypgdata, setalreadypgdata] = useState([])
  const [newpgdataarrar, setnewpgdataarrar] = useState([])
  const [merchantidslist, setmerchantidslist] = useState([])
  const [allpglistdata, setallpglistdata] = useState([])
  const [getallmerchantwithpgservices, setgetallmerchantwithpgservices] = useState([])
  const [getfinalallpgand, setgetfinalallpgand] = useState([])
  const [getfilnalexistingdata, setgetfilnalexistingdata] = useState([])
  const [uisearchblock, setuisearchblock] = useState(false)
  const handleModal = () => setModal(!modal)
  // const onSubmit = data => trigger()


  const getallmerchantreport = () => {
    requestsApidata.findAllPayoutMerchant().then(res => {
      setmerchantidslist(res.data)
    })
  }
  const getallpglist = () => {
    requestsApidata.payoutgetpglist().then(res => {
      setallpglistdata(res.data)
    })
  }
  const payoutgetAllConfigPgMerchant = () => {
    setuisearchblock(true)
    requestsApidata.payoutgetAllConfigPgMerchant().then(res => {
      setgetallmerchantwithpgservices(res.data)
      setuisearchblock(false)
    })
  }
  useEffect(() => {
    // payoutgetAllConfigPgMerchant()
    setuisearchblock(true)
    requestsApidata.payoutgetAllConfigPgMerchant().then(res => {
      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else {
        setuisearchblock(false)
        setgetallmerchantwithpgservices(res.data)
        getallpglist()
        getallmerchantreport()
      }
    })
    // requestsApidata.pgdetailslinkmerchant().then(res => {
    //   if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
    //     toast.error('Session Expired Login again!')
    //     history.push('/')
    //   } else if (res.data.exception === "JWT_MISSING") {
    //     toast.error('Session Expired Login again!')
    //     history.push('/')
    //   } else {
    //     console.log("new pg response resonse", res.data)
    //     const map = new Map(res.data.extraData.pgDetail.map(({ pg_name, pg_uuid, created, pg_status, pg_services, service_status }) => [pg_name, { pg_name, pg_servicea: [], pg_uuid, created, pg_status }]))
    //     for (const { pg_name, service_status, pg_services } of res.data.extraData.pgDetail) map.get(pg_name).pg_servicea.push(...[{ pgservices: pg_services, servicestatus: service_status }].flat())
    //     setaddnewpgandservicedata([...map.values()])
    //     getallmerchantreport()
    //   }
    // })
  }, [])
  const getrefreshdata = (merchantid) => {
    setalreadypgdata([])
    requestsApidata.merchantserach(merchantid).then(res => {
      const results = addnewpgandservicedata.filter(({ pg_name: id1 }) => !res.data.extraData.merchantDetail[0].merchantpgdetails.some(({ pgname: id2 }) => id2 === id1))
      setaddnewpgandservicedata(results)
      setmerchantsearchbtndisabled(false)
      if (res.data.successCode === "API_SUCCESS") {
        if (res.data.extraData.merchantDetail === null) {
          toast.warning('No data found')
        } else if (res.data.extraData.merchantDetail[0].merchantStatus === "BLOCKED") {
          toast.warning('Merchant is Blocked')
        } else {
          setexistingmercahantpg(res.data.extraData.merchantDetail)
          setselectpgDisplay('block')
          const exitingfinaarrayata = res.data.extraData.merchantDetail[0].merchantpgdetails
          res.data.extraData.merchantDetail[0].merchantpgdetails.map((v) => {
            const filterdatsas = addnewpgandservicedata.filter((m) => m.pg_name === v.pgname)
            alreadypgdata.push(filterdatsas[0])
          })
          const arr2 = exitingfinaarrayata.map((v) => {
            const foundname = alreadypgdata.find(x => x.pg_name === v.pgname)
            if (foundname) {
              const filteredArray = foundname.pg_servicea.filter(item1 => !v.merchantservicedetails.some(item2 => item1.pgservices === item2.serviceType))
              v.newdata = filteredArray
            }
            return v
          })
          console.log('arr2', arr2)
          setnewpgdataarrar(arr2)
        }
      } else if (res.data.exception === "MERCHANT_INFORMATION_NOT_FOUND") {
        toast.warning(res.data.msg[0])
      }
    })
  }

  const serviceFinalHandler = pgservice => (e) => {
    const sendmerchantid = selectmerchantidvalue.value
    console.log("aa", e.target.checked, pgservice, e.target.id, sendmerchantid)
    if (e.target.checked === true) {
      requestsApidata.payoutconfigPgMerchant(sendmerchantid, pgservice, e.target.id.substring(1), "ACTIVE").then((res) => {
        if (res.data.status === "false") {
          requestsApidata.payoutupdateConfigPgMerchant(sendmerchantid, pgservice, e.target.id.substring(1), "ACTIVE").then((res) => {
            if (res.data.status === "false") {
              toast.warning('Service not associated')
            } else if (res.data.status === "SUCCESS") {
              toast.success('Service Updated Successfully')
            }
          })
        } else if (res.data.status === "SUCCESS") {
          toast.success('Service Updated Successfully')
        }
      })
    } else {
      requestsApidata.payoutupdateConfigPgMerchant(sendmerchantid, pgservice, e.target.id.substring(1), "BLOCKED").then((res) => {
        if (res.data.status === "false") {
          toast.warning('Service not associated')
        } else if (res.data.status === "SUCCESS") {
          toast.success('Service Updated Successfully')
        }
      })
    }
    // requestsApidata.MerchantPGServiceAssociation((e.target.id).substring(1), pgservice, sendmerchantid).then(async (res) => {
    //   requestsApidata.UpdateMerchantService(sendmerchantid, (e.target.id).substring(1), e.target.checked === true ? "ACTIVE" : "BLOCKED", pgservice).then((response) => {
    //     console.log('updateservuce response', response.data)
    //     if (response.data.successCode === "API_SUCCESS") {
    //       if (response.data.extraData.merchantDetail.status === "ACTIVE") {
    //         toast.success('Merchant Service Successfully Activate')
    //       } else  if (response.data.extraData.merchantDetail.status === "BLOCKED") {
    //         toast.success('Merchant Service Successfully InActivate')
    //       }
    //     } else if (response.data.exception === "MERCHANT_PG_SERVICE_NOT_ASSOCIATED") {
    //       toast.warning('Merchant associated with service , but service not found.')
    //     } else if (response.data.exception === "PG_SERVICE_ASSOCIATION_NOT_FOUND") {
    //       toast.warning(res.data.msg[0])
    //     } else if (response.data.exception === "PG_NOT_ACTIVE") {
    //       toast.warning(response.data.msg[0])
    //     } else {
    //       toast.warning(response.data.msg[0])
    //     }
    //   })
    // })
  }
  const oldserviceupdation = pgservice => (e) => {
    const sendmerchantid = selectmerchantidvalue.value
    requestsApidata.payoutupdateConfigPgMerchant(sendmerchantid, pgservice, e.target.id.substring(1), e.target.checked === true ? "ACTIVE" : "BLOCKED").then((res) => {
      if (res.data.status === "false") {
        toast.warning('Service not associated')
      } else if (res.data.status === "SUCCESS") {
        toast.success('Service Updated Successfully')
      }
    })
  }
  const addNewPGcustominputHandler = pguuid => (e) => {
    console.log("datatatta", e.target.checked, pguuid, e.target.id, selectmerchantidvalue.value)

    const sendmerchantid = selectmerchantidvalue.value
    if (e.target.checked === true) {
      requestsApidata.payoutconfigPgMerchant(sendmerchantid, "", e.target.id, "ACTIVE").then((res) => {
        if (res.data.status === "false") {
          requestsApidata.payoutupdateConfigPgMerchant(sendmerchantid, "", e.target.id, "ACTIVE").then((res) => {
            if (res.data.status === "false") {
              toast.warning('PG not associated')
            } else if (res.data.status === "SUCCESS") {
              toast.success('PG Updated Successfully')
            }
          })
        } else if (res.data.status === "SUCCESS") {
          toast.success('PG Updated Successfully')
        }
      })
    } else {
      requestsApidata.payoutupdateConfigPgMerchant(sendmerchantid, "", e.target.id, "BLOCKED").then((res) => {
        if (res.data.status === "false") {
          toast.warning('PG not associated')
        } else if (res.data.status === "SUCCESS") {
          toast.success('PG Updated Successfully')
        }
      })
    }
    // if (e.target.checked === true) {
    //   alert('Please OK for Active PG')
    //   requestsApidata.MerchantPGDetailsAsociation(pguuid, sendmerchantid).then(async (res) => {
    //     await requestsApidata.UpdateMerchantPGStatus(sendmerchantid, "ACTIVE", pguuid).then((resp) => {
    //       console.log('res update pg service', resp.data)
    //       if (resp.data.successCode === "API_SUCCESS") {
    //         if (resp.data.extraData.merchantDetail.status === "ACTIVE") {
    //           toast.success('Merchant PG Successfully Activate')
    //         }
    //       } else if (resp.data.extraData.merchantDetail.status === "ACTIVE") {
    //         toast.success('Merchant PG Successfully Activate')
    //       } else if (resp.data.exception === "MERCHANT_NOT_FOUND") {
    //         toast.warning(resp.data.msg[0])
    //       } else if (resp.data.exception === "MERCHANT_PG_SERVICE_NOT_ASSOCIATED") {
    //         toast.warning(resp.data.msg[0])
    //       } else if (resp.data.exception === "PG_SERVICE_ASSOCIATION_NOT_FOUND") {
    //         toast.warning(resp.data.msg[0])
    //       } else if (resp.data.exception === "PG_NOT_ACTIVE") {
    //         toast.warning(resp.data.msg[0])
    //       } else {
    //         toast.warning(resp.data.msg[0])
    //       }
    //     })
    //   })
    // } else if (e.target.checked === false) {
    //   alert('Please OK for InActive PG')
    //   requestsApidata.UpdateMerchantPGStatus(sendmerchantid, "BLOCKED", pguuid).then((res) => {
    //     console.log('res update pg service', res.data)
    //     if (res.data.successCode === "API_SUCCESS") {
    //       if (res.data.extraData.merchantDetail.status === "BLOCKED") {
    //         toast.success('Merchant PG Successfully InActivate')
    //       }
    //     } else if (res.data.exception === "MERCHANT_NOT_FOUND") {
    //       toast.warning(res.data.msg[0])
    //     } else if (res.data.exception === "MERCHANT_PG_SERVICE_NOT_ASSOCIATED") {
    //       toast.warning(res.data.msg[0])
    //     } else if (res.data.exception === "PG_SERVICE_ASSOCIATION_NOT_FOUND") {
    //       toast.warning(res.data.msg[0])
    //     } else if (res.data.exception === "PG_NOT_ACTIVE") {
    //       toast.warning(res.data.msg[0])
    //     } else {
    //       toast.warning(res.data.msg[0])
    //     }
    //   })
    // }
  }

  const merchantlistOptions =
    merchantidslist.map((v) => {
      return { value: v.merchantId, label: v.merchantId }
    })

  const selectmerchantidHandler = (e) => {
    payoutgetAllConfigPgMerchant()
    getallpglist()
    getallmerchantreport()
    setselectmerchantidvalue(e)
    setgetfinalallpgand([])
    setgetfilnalexistingdata([])
    setselectpgDisplay('none')

    // getrefreshdata(e.value)
    const filtrdata = getallmerchantwithpgservices.filter((m) => m.merchantId === e.value)
    // console.log('filtrdata', filtrdata) 
    const filnalexistingdata = []
    filtrdata.forEach((v) => {
      const found = filnalexistingdata.find((x) => x.pgId === v.pgId)
      if (found) {
        found.servicearr.push({ servicename: v.service, servicestatus: v.status })
        //  found.statusarr.push(v.status)
      } else {
        v.servicearr = [{ servicename: v.service, servicestatus: v.status }]
        const addnewservice = ["UPI", "IMPS", "NEFT", "RTGS"]
         const remailservice = addnewservice.filter((vin) => vin !== v.service)
         console.log("remailservice", remailservice)
         remailservice.map((a) => {
          v.servicearr.push({servicename: a, servicestatus: "BLOCKED"})
         })
        //  v.statusarr = [v.status]
        filnalexistingdata.push(v)
      }
    })
    // console.log('filnalexistingdata', filnalexistingdata, allpglistdata)
    const finalallpgand = allpglistdata.filter((m) => !filnalexistingdata.some((n) => n.pgId === m.pgId))
    finalallpgand.map((v) => {
      v.servicearr = [
        "UPI",
        "IMPS", "NEFT", "RTGS"
      ]
      return v
    })
    console.log('finalallpgand', finalallpgand, filnalexistingdata)

    setgetfinalallpgand(finalallpgand)
    setgetfilnalexistingdata(filnalexistingdata)
    setselectpgDisplay('block')
    // const a3 = a1.map(t1 => ({...t1, ...a2.find(t2 => t2.id === t1.id)}))
    // console.log('a3', a3)
  }
  const refreshdataHandler = () => {
    setuisearchblock(true)

    setselectmerchantidvalue('Select')
    setgetfinalallpgand([])
    setgetfilnalexistingdata([])
    setselectpgDisplay('none')
    requestsApidata.payoutgetAllConfigPgMerchant().then(res => {
      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else {
        setuisearchblock(false)
        setgetallmerchantwithpgservices(res.data)
        getallpglist()
        getallmerchantreport()
        toast.success('Data Updated Successfully')
      }
    })
  }
  return (
    <Fragment>
      <Card style={{ padding: 20 }}>
        <h6>Update Merchant PG and Services</h6>
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
              <h6 style={{ color: 'green', fontWeight: 'bold' }}>Exists PG</h6>

            </Col>
            <Col lg={{ offset: 1, size: 8 }}>
              <h6 style={{ color: 'green', fontWeight: 'bold' }}>Associated Service</h6>
            </Col>
          </Row>
          <div>
            {getfilnalexistingdata.map((v, k) => {
              return <div style={{ borderBottom: '1px solid grey', marginTop: 10 }}>
                <Row>
                  <Col lg='3'>
                    <p><span style={{ fontWeight: 'bold' }}>
                      {v.pgName}
                      {/* <CustomInput defaultChecked={v.status === "ACTIVE"} onChange={addNewPGcustominputHandler(v.pgId)} type='checkbox' label={v.pgName} id={v.pgId} />  */}
                    </span></p>
                  </Col>
                  <Col lg={{ offset: 1, size: 8 }}>
                    {v.servicearr.map((val, key) => {
                      return <div style={{ display: 'inline-block' }}>
                        <span> {val.servicename === "" ? null : <li style={{ marginLeft: 20, listStyleType: 'none' }}> <CustomInput defaultChecked={val.servicestatus === "ACTIVE"} onChange={oldserviceupdation(val.servicename)} type='checkbox' label={val.servicename} id={(key + 9) + v.pgId} /></li>}</span>
                      </div>
                    })}
                  </Col>
                  <hr />
                </Row>
              </div>
            })}
            {getfinalallpgand.length === 0 ? null : getfinalallpgand.map((v, k) => {
              return <div style={{ borderBottom: '1px solid grey', marginTop: 10 }}>
                <Row>
                  <Col lg='3'>
                    <p><span style={{ fontWeight: 'bold' }}>
                      {v.pgName}
                      {/* <CustomInput onChange={addNewPGcustominputHandler(v.pgId)} type='checkbox' label={v.pgName} id={v.pgId} />   */}
                    </span></p>

                  </Col>
                  <Col lg={{ offset: 1, size: 8 }}>
                    {v.servicearr.map((val, key) => {
                      return <div style={{ display: 'inline-block' }}>
                        <li style={{ marginLeft: 20, listStyleType: 'none' }}><CustomInput onChange={serviceFinalHandler(val)} type='checkbox' label={val} id={(key + 2) + v.pgId} /></li>
                      </div>
                    })}
                  </Col>
                  <hr />
                </Row>
              </div>
            })}


          </div>
        </div>
      </Card>
    </Fragment>
  )
}

export default DataTableWithButtons
