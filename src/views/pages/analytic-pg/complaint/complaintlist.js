// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import UILoader from '@components/ui-loader'
// ** Table Data & Columns
import moment from "moment"

// import { columns } from './data'
import requestsApi from './request'
// ** Add New Modal Component
import PaymentrequestModal from './createcomplaint'
import { useHistory } from 'react-router-dom'

// ** Third Party Components
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import Datatablecomponent from '../../../../layouts/components/Datatablecomponent'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'
import {
  Card, Badge,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row, Modal, ModalHeader, ModalBody, ModalFooter,
  Col,
  FormGroup,
  CardBody,
  CardFooter
} from 'reactstrap'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import Select from 'react-select'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className='custom-control custom-checkbox'>
    <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    <label className='custom-control-label' onClick={onClick} />
  </div>
))
const requestsApidata = new requestsApi()
const DataTableWithButtons = () => {
  // console.log("response datad----->", data({}))
  // ** States 
  const history = useHistory()
  const [complaintsubtypebtndisabled, setcomplaintsubtypebtndisabled] = useState(false)
  const [complainttypebtndisabled, setcomplainttypebtndisabled] = useState(false)
  const [basicModal, setBasicModal] = useState(false)
  const [block, setBlock] = useState(true)
  const [modal, setModal] = useState(false)
  const [subtypemodal, setsubtypemodal] = useState(false)
  const [selectcomplaintype, setselectcomplaintype] = useState('Select')
  const [inputsubcomplainttypeValue, setinputsubcomplainttypeValue] = useState('')
  const [inputComplainttypeValue, setinputComplainttypeValue] = useState('')
  const [data, setdata] = useState([])
  const [getcompalinttypedata, setgetcompalinttypedata] = useState([])
  const [getticketdetails, setgetticketdetails] = useState([])
  const [listTicketTransactionDetails, setlistTicketTransactionDetails] = useState([])
  // ** Function to handle Modal toggle
  const [addcommentvalue, setaddcommentvalue] = useState('')
  const handleModal = () => setModal(!modal)
  const subtypeHandlerModal = () => setsubtypemodal(!subtypemodal)
  const updatedata = () => {
    // console.log("final resonse")
    setBlock(true)
    requestsApidata.complaintDetails().then(res => {
      if (res.data.successCode === 'API_SUCCESS') {
        setdata(res.data.extraData.complaintDetail)
        setBlock(false)

      } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session expired')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session expired')
        history.push('/')
      }
    })
  }
  const getcompalinttypeApi = () => {
    requestsApidata.getComplaintTypeAndComplaintSubTpye().then((res) => {
      setgetcompalinttypedata(res.data.extraData.complaintDetail)
    })
  }
  useEffect(() => {
    requestsApidata.complaintDetails().then(res => {
      if (res.data.successCode === 'API_SUCCESS') {
        getcompalinttypeApi()
        setdata(res.data.extraData.complaintDetail)
        setBlock(false)
      } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session expired')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session expired')
        history.push('/')
      }
    })
  }, [])
const tickettractbyidHandler = (id) => {
  requestsApidata.complaintDetailWithTicketId(id).then(res => {
    if (res.data.successCode === 'API_SUCCESS') {
      // console.log('res complaintDetailWithTicketId', res.data)
      setgetticketdetails(res.data.extraData.complaintDetail)
      setlistTicketTransactionDetails(res.data.extraData.complaintDetail.listTicketTransactionDetails)
      setBasicModal(true)
    } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
      toast.error('Session expired')
      history.push('/')
    } else if (res.data.exception === "JWT_MISSING") {
      toast.error('Session expired')
      history.push('/')
    } else if (res.data.exception === "TICKET_NOT_FOUND") {
      toast.warning('Ticket Not found')
    } else {
      toast.warning(res.data.msg[0])
    }
  })
}
  const viewtickethandler = (e) => {
    console.log('viewtickethandler', e.target.id)
        tickettractbyidHandler(e.target.id)
  }
  const cretesubtypehandler = () => {
    if (selectcomplaintype === "Select") {
      toast.warning('Select Complaint Type')
    } else if (inputsubcomplainttypeValue === "") {
      toast.warning('Complaint Sub Type can not be empty')
    } else {
      setcomplaintsubtypebtndisabled(true)
      requestsApidata.createComplaintSubType(selectcomplaintype.value, inputsubcomplainttypeValue).then((res) => {
        setcomplaintsubtypebtndisabled(false)
        if (res.data.successCode === "API_SUCCESS") {
          Swal.fire({ text: 'Complaint Sub type Created Successfully', icon: 'success' }).then(() => {
            setselectcomplaintype('Select')
            setinputsubcomplainttypeValue('')
          })
        } else {
          toast.warning(res.data.msg[0])
        }
      })
    }
  }
  const cretacompalintypeHandler = () => {
    if (inputComplainttypeValue === "") {
      toast.warning('Complaint Type can not be empty')
    } else {
      setcomplainttypebtndisabled(true)
      requestsApidata.createComplaintType(inputComplainttypeValue).then((res) => {
        setcomplainttypebtndisabled(false)
        if (res.data.successCode === "API_SUCCESS") {
          Swal.fire({ text: 'Complaint type Created Successfully', icon: 'success' }).then(() => {
            setinputComplainttypeValue('')
            getcompalinttypeApi()
          })
        } else {
          toast.warning(res.data.msg[0])
        }
      })
    }
  }
  const selectcomplaintypeHandler = (e) => {
    setselectcomplaintype(e)
  }
  const inputsubcomplainttypeHandler = (e) => {
    setinputsubcomplainttypeValue(e.target.value)
  }
  const inputComplainttypeHandler = (e) => {
    setinputComplainttypeValue(e.target.value)
  }
  const columns = [
    {
      name: 'Complaint Id',
      selector: 'complaintId',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Complaint Type',
      selector: 'commType',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'Complaint SubType',
      selector: 'commSubType',
      sortable: true
    },
    {
      name: 'Messege',
      selector: 'complaintTest',
      sortable: true
    },
    {
      name: 'Created At',
      selector: 'createdAt',
      sortable: true
    },
    {
      name: 'Created By',
      selector: 'createdBy',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true
    },
    {
      name: 'Action',
      cell: row => <span><Badge style={{ cursor: 'pointer' }} id={row.complaintId} color="primary" onClick={viewtickethandler}>Show Ticket</Badge></span>
    }
  ]

  const changestatushandler = (e) => {
    console.log('eeeeeeeechangestatushandler', e.target.id, getticketdetails)
    Swal.fire({
      title: "Input Complaint Text",
      // text: "Write something interesting:",
      input: 'text',
      showCancelButton: true
    }).then((result) => {
      // console.log('okji', result.value === "")
      if (result.value === "") {
        Swal.fire('Complaint Text can not be empty')
      } else if (result.value) {
        console.log(result.value)
        // console.log('getticktdeeeee', getticketdetails)
        requestsApidata.updateTicket(getticketdetails.complaintId, result.value, e.target.id).then(res => {
          if (res.data.successCode === 'API_SUCCESS') {
            Swal.fire({ text: 'Status updated Successfully', title: res.data.msg[0] }).then(() => {
              // setBasicModal(!basicModal)
              // updatedata()
              tickettractbyidHandler(getticketdetails.complaintId)
            })
          } else {
            toast.warning(res.data.msg[0])
          }
        })
      }
    })
  }

  const countryOptions =
    getcompalinttypedata.map((v) => {
      return { value: v.ticketComplaintType, label: v.ticketComplaintType }
    })

  const addcommentvalueHandler = (e) => {
    setaddcommentvalue(e.target.value)
  }
  return (
    <Fragment>
      <UILoader blocking={block}>

        <Datatablecomponent data={data} handleModal={handleModal} coloumnsprops={columns} routename="List of Complain Ticket" isaddcomplaintrequest={true} updatedatahandler={updatedata}
          subtypeHandlerModal={subtypeHandlerModal}
        />
      </UILoader>
      {/* <PaymentrequestModal open={modal} handleModal={handleModal} parentCallback={paymentrequestsubmitdata} complaintsubtypebtndisabled={complaintsubtypebtndisabled} complainttypedata={getcompalinttype}/> */}
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader>Add Complaint Type</ModalHeader>
        <ModalBody>
          <div>
            <FormGroup>
              <Label for='phonenumber'>Complaint Type</Label>
              <Input
                type='text'
                name='com'
                id='com'
                placeholder='Complaint Type'
                value={inputComplainttypeValue}
                onChange={inputComplainttypeHandler}
              />
            </FormGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button.Ripple className='mr-1' color='primary' type='submit' disabled={complainttypebtndisabled} onClick={cretacompalintypeHandler}>
            Submit
          </Button.Ripple>
          <Button color='primary' onClick={() => setModal(!modal)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={subtypemodal} toggle={() => setsubtypemodal(!subtypemodal)}>
        <ModalHeader>Add Complaint SUb Type</ModalHeader>
        <ModalBody>
          <div>
            <div style={{ marginTop: 20 }}>
              <Label for=''>Select Complaint Type</Label>
              <Select
                className='react-select'
                classNamePrefix='select'

                name='requestType'
                id='requestType'
                options={countryOptions}
                value={selectcomplaintype}
                onChange={selectcomplaintypeHandler}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <FormGroup>
                <Label for='phonenumber'>Complaint SubType</Label>
                <Input
                  type='text'
                  name='email'
                  id='email'
                  placeholder='Complaint Sub Type'
                  value={inputsubcomplainttypeValue}
                  onChange={inputsubcomplainttypeHandler}
                />
              </FormGroup>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button.Ripple className='mr-1' color='primary' type='submit' disabled={complaintsubtypebtndisabled} onClick={cretesubtypehandler}>
            Submit
          </Button.Ripple>
          <Button color='primary' onClick={() => setsubtypemodal(!subtypemodal)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Modal size='lg' isOpen={basicModal} toggle={() => setBasicModal(!basicModal)}>
        <ModalHeader toggle={() => setBasicModal(!basicModal)}>
          <span style={{ fontWeight: 'bold' }}> Ticket ID:</span> <span style={{ color: 'red', fontWeight: 'bold' }}>{getticketdetails.complaintId}</span>
        </ModalHeader>
        <ModalBody style={{
          maxHeight: 'calc(100vh - 210px)',
          overflowY: 'auto'
        }}>
          <div>
            <div>
              <Row>
                <Col lg="8">
                <p className="left-designticket" style={{ fontWeight: 'bold' }}>Complaint Type </p>
                </Col>
                <Col lg="4">
                  <p className="right-designticket" style={{ fontWeight: 'normal' }}>{getticketdetails.commType}</p>
                </Col>
              </Row>
              <Row>
                <Col lg="8">
                <p className="left-designticket" style={{ fontWeight: 'bold' }}>Complaint SubType</p>
                </Col>
                <Col lg="4">
                  <p className="right-designticket" style={{ fontWeight: 'normal' }}>{getticketdetails.commSubType}</p>
                </Col>
              </Row>
              <Row>
                <Col lg="8">
                <p className="left-designticket" style={{ fontWeight: 'bold' }}>Status</p>
                </Col>
                <Col lg="4">
                  <p className="right-designticket" style={{ fontWeight: 'normal' }}>{getticketdetails.status}</p>
                </Col>
              </Row>
              <Row>
                <Col lg="8">
                <p className="left-designticket" style={{ fontWeight: 'bold' }}>Last Updated By</p>
                </Col>
                <Col lg="4">
                <p className="right-designticket" style={{ fontWeight: 'normal' }}>{getticketdetails.updatedByUserName}</p>
                </Col>
              </Row>

              <Row>
                <Col lg="8">
                  <p className="left-designticket" style={{ fontWeight: 'bold' }}>Latest Comment</p>
                </Col>
                <Col lg="4">
                  <p className="right-designticket" style={{ fontWeight: 'normal' }}>{getticketdetails.complaintTest}</p>
                </Col>
              </Row>
            </div>
           

            {/* <span style={{ fontWeight: 'bold', color: 'red' }}>Ticket Comment</span> */}
            {/* {listTicketTransactionDetails.map((v) => {
                  return <div style={{display:'flex'}}>
                    {v.updatedByUserType === "ADMIN" ? <div style={{display:'flex'}}><Card style={{width:'fit-content'}}>
                    <p style={{ fontWeight: 'bold'}}>{v.updatedByUserType}({v.updatedByUserName}):<span style={{ fontWeight: 'normal' }}>{v.complaintTest}</span></p>
                    </Card></div>  : <div><Card style={{ fontWeight: 'bold', width:'fit-content'}}>
                      <p style={{ fontWeight: 'bold'}}>{v.updatedByUserType}({v.updatedByUserName}) : <span style={{ fontWeight: 'normal' }}>{v.complaintTest}</span>
                     </p> </Card></div>
                      }
                  </div>
                })} */}

            {/* {getticketdetails.status === "OPEN" ? <div><Badge id='CLOSED' style={{ cursor: 'pointer' }} color='danger' onClick={changestatushandler}>CLOSED</Badge><Badge id="INPROGESS" style={{ cursor: 'pointer', marginLeft: 10 }} color='warning' onClick={changestatushandler}>INPROGESS</Badge></div> : getticketdetails.status === "CLOSED" ? <div><Badge id="REOPEN" style={{ cursor: 'pointer' }} color='success' onClick={changestatushandler}>REOPEN</Badge></div> : getticketdetails.status === "REOPEN" ? <div><Badge id='CLOSED' style={{ cursor: 'pointer' }} color='danger' onClick={changestatushandler}>CLOSED</Badge> <Badge id="INPROGESS" style={{ cursor: 'pointer', marginLeft: 10 }} color='warning' onClick={changestatushandler}>INPROGESS</Badge></div> : getticketdetails.status === "INPROGESS" ? <div><Badge id='CLOSED' style={{ cursor: 'pointer' }} color='danger' onClick={changestatushandler}>CLOSED</Badge></div> : null} */}
            <section class="msger">
              <header class="msger-header">
                <div class="msger-header-title">
                  <i class="fas fa-comment-alt"></i>Ticket Chat
                </div>
                <div class="msger-header-options">
                  <span><i class="fas fa-cog"></i></span>
                </div>
              </header>

              <main class="msger-chat">
                {listTicketTransactionDetails.map((v) => {
                  return v.updatedByUserType === "MERCHANT" ? <div class="msg left-msg">
                    <div class="msg-bubble">
                      <div class="msg-info">
                        <div class="msg-info-name">{v.updatedByUserName} ({v.updatedByUserType})</div>
                        <div class="msg-info-time">{moment(v.updated).format('DD-MMM hh:mm A')}</div>
                      </div>
                      <div class="msg-text">
                        {v.complaintTest}
                      </div>
                    </div>
                  </div> : <div class="msg right-msg">
                    <div class="msg-bubble">
                      <div class="msg-info">
                        <div class="msg-info-name">{v.updatedByUserName} ({v.updatedByUserType})</div>
                        <div class="msg-info-time">{moment(v.updated).format('DD-MMM hh:mm A')}</div>
                      </div>
                      <div class="msg-text">
                        {v.complaintTest}
                      </div>
                    </div>
                  </div>
                })}
              </main>
              <div style={{ textAlign: 'center', marginBottom: 30 }}>
                {getticketdetails.status === "OPEN" ? <div><Button id='CLOSED' style={{ cursor: 'pointer' }} color='danger' onClick={changestatushandler}>CLOSED</Button><Button id="INPROGESS" style={{ cursor: 'pointer', marginLeft: 10 }} color='warning' onClick={changestatushandler}>INPROGESS</Button></div> : getticketdetails.status === "CLOSED" ? <div><Button id="REOPEN" style={{ cursor: 'pointer' }} color='success' onClick={changestatushandler}>REOPEN</Button></div> : getticketdetails.status === "REOPEN" ? <div><Button id='CLOSED' style={{ cursor: 'pointer' }} color='danger' onClick={changestatushandler}>CLOSED</Button> <Button id="INPROGESS" style={{ cursor: 'pointer', marginLeft: 10 }} color='warning' onClick={changestatushandler}>INPROGESS</Button></div> : getticketdetails.status === "INPROGESS" ? <div><Button id='CLOSED' style={{ cursor: 'pointer' }} color='danger' onClick={changestatushandler}>CLOSED</Button>
                <Button id='INPROGESS' style={{ cursor: 'pointer', marginLeft:10 }} color='success' onClick={changestatushandler}>MESSAGE</Button>
                </div> : null}

              </div>

            </section>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => setBasicModal(!basicModal)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      {/* <FormGroup>
                  <Label for='phonenumber'>Add Comments</Label>
                  <Input
                    type='text'
                    name='email'
                    id='email'
                    placeholder='Enter Comment'
                    value={addcommentvalue}
                    onChange={addcommentvalueHandler}
                  />
                </FormGroup> */}
    </Fragment>
  )
}

export default DataTableWithButtons
