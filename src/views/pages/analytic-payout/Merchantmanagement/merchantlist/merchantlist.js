// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import UILoader from '@components/ui-loader'
// ** Table Data & Columns
import moment from "moment"
import PGrequestModal from './pgcreation'
import PGUpdateModal from './updatepgdetails'
// import { columns } from './data'
import requestsApi from './requests'
// ** Add New Modal Component
// import AddNewModal from '../../../tables/data-tables/basic/AddNewModal'
import { useHistory } from 'react-router-dom'

// ** Third Party Components
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import Datatablecomponent from './datatablecomponent'
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
  Row, CustomInput,
  Col
} from 'reactstrap'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

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
  const history = useHistory()

  // ** Statessetdefaultvalue
  const [defaultvaluecheck, setdefaultvalue] = useState(true)

  const [btndisabled, setbtndisabled] = useState(false)
  const [updatepgbtndisabled, setupdatepgbtndisabled] = useState(false)
  const [startDate, setstartDate] = useState('')
  const [searchStartDate, setsearchStartDate] = useState('')
  const [endDate, setendDate] = useState('')
  const [searchEndDate, setsearchEndDate] = useState('')
  const [block, setBlock] = useState(true)
  const [modal, setModal] = useState(false)
  const [updatepgmodal, setupdatepgmodal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setdata] = useState([])
  const [PGnamealready, setPGnamealready] = useState('')
  const [PGuuidselect, setPGuuidselect] = useState('')
  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)
  const updatepghandleModal = () => setupdatepgmodal(!updatepgmodal)
  const updatedata = () => {
    setBlock(true)
    requestsApidata.findAllPayoutMerchant().then(res => {
      // console.log("pg details final resonse", res.data)
      // if (res.data.successCode === "API_SUCCESS") {
      //   // setdata(res.data.extraData.pgDetail)
      //   setBlock(false)
      //   setSearchValue('')
      //   const map = new Map(res.data.extraData.pgDetail.map(({ pg_name, pg_uuid, created, pg_status, pg_services, service_status }) => [pg_name, { pg_name, pg_servicea: [], pg_uuid, created, pg_status }]))
      //   for (const { pg_name, service_status, pg_services } of res.data.extraData.pgDetail) map.get(pg_name).pg_servicea.push(...[{ pgservices: pg_services, servicestatus: service_status }].flat())
      //   setdata([...map.values()])
      // } else 
      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else {
        setBlock(false)
        setdata(res.data)
        setSearchValue('')
      }
    }).catch((err) => {
      Swal.fire({ text: 'NetWork Error. Connect to network' }).then(() => {
        // window.location.reload()
      })
    })
  }
  const updatemodalopenclick = (e) => {
    console.log('eeeeee', e.target.id, data)
    const filterdata = data.filter((m) => m.pgName === e.target.id)
    console.log('filterdata', filterdata)
    setPGnamealready(e.target.id)
    // setPGuuidselect(filterdata[0].pg_uuid)
    updatepghandleModal()

    // requestsApidata.tgepgDetailByPGNameAndPgId(e.target.id).then(res => {
    //   console.log('ressss', res.data)
    // })
  }
  const pgblockhandler = (e) => {
    // console.log('pgblock', e.target.id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to block this Merchant",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Block it!'
    }).then((result) => {
      if (result.isConfirmed) {
        requestsApidata.updateStatusPayoutMerchant(e.target.id, 'BLOCKED').then((res) => {
          // console.log('res-----<block', res.data)
          if (res.data.merchantStatus === "BLOCKED") {
            // setdata(res.data.extraData.pgDetail)
            // setBlock(false)
             updatedata()
          } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
            toast.error('Session Expired Login again!')
            history.push('/')
          } else if (res.data.exception === "JWT_MISSING") {
            toast.error('Session Expired Login again!')
            history.push('/')
          }
        })
      }
    })
  }
  const pgactivehandler = (e) => {
    // console.log('pgactive', e.target.id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Active this Merchant",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Active it!'
    }).then((result) => {
      if (result.isConfirmed) {
        requestsApidata.updateStatusPayoutMerchant(e.target.id, 'ACTIVE').then((res) => {
          // console.log('res-----<active', res.data)
          // if (res.data.status === "ACTIVE") {
          //   requestsApidata.pgdetailsApi().then(res => {
          //     setBlock(false)
          //     const map = new Map(res.data.map(({pg_name, pg_uuid, created, pg_status, pg_services, service_status}) => [pg_name, {pg_name, pg_servicea: [], pg_uuid, created, pg_status}]))
          //     // console.log("map--->", map)
          //     for (const {pg_name, service_status, pg_services} of res.data) map.get(pg_name).pg_servicea.push(...[{pgservices:pg_services, servicestatus:service_status}].flat())
          //     // console.log([...map.values()])
          //     setdata([...map.values()])
          //     toast.success('Data Updated Successfully')
          //   })
          // }
          if (res.data.merchantStatus === "ACTIVE") {
            // setdata(res.data.extraData.pgDetail)
            // setBlock(false)
             updatedata()
          } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
            toast.error('Session Expired Login again!')
            history.push('/')
          } else if (res.data.exception === "JWT_MISSING") {
            toast.error('Session Expired Login again!')
            history.push('/')
          }
        })
      }
    })
  }
  const updatedummydata = () => {
    toast.warning('PG is Blocked')
  }
  const columns = [
    {
      name: 'Merchant ID',
      selector: 'merchantId',
      sortable: true,
      minWidth: '70px'
    },
    {
      name: 'Token',
      selector: 'token',
      sortable: true,
      minWidth: '450px'
    },
    {
      name: 'Wallet Check Status',
      selector: 'walletCheckStatus',
      sortable: true,
      minWidth: '50px'
    },
    {
      name: 'Whitelistedip',
      selector: 'whitelistedip',
      sortable: true,
      minWidth: '50px'
    },
    {
      name: 'Status',
      selector: 'merchantStatus',
      sortable: true,
      minWidth: '30px'
    },
    {
      name: 'ACTION',
      sortable: true,
      cell: row => {
        return <span>
          {row.merchantStatus === "ACTIVE" ?  <Badge onClick={pgblockhandler} color='danger' id={row.merchantId}>Block</Badge> : <Badge onClick={pgactivehandler} id={row.merchantId} color="success">Active</Badge>} 
          {/* <Badge style={{ marginLeft: 10 }} id={row.pgName} color='success' onClick={updatemodalopenclick}>Update</Badge> */}
          {/* {row.pgStatus === "ACTIVE" ? <Badge style={{ marginLeft: 10 }} id={row.pgName} color='success' onClick={updatemodalopenclick}>Update</Badge> : <Badge style={{ marginLeft: 10 }} id={row.pgName} color='success' onClick={updatedummydata}>Update</Badge>}   */}

        </span>
      }
    }
  ]
  const customInputSwitched = pguuid => (e) => {
    console.log("customInputSwitched", e.target.checked, pguuid, e.target.id)
    if (e.target.checked === true) {
      alert('Please OK for Active Service')
      requestsApidata.UpdatePGService(pguuid, e.target.id).then((res) => {

        if (res.data.successCode === "API_SUCCESS") {
          if (res.data.extraData.pgDetail.status === "ACTIVE") {
            toast.success('PG Service Active Successfully')
          }
        } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
          toast.error('Session Expired Login again!')
          history.push('/')
        } else if (res.data.exception === "JWT_MISSING") {
          toast.error('Session Expired Login again!')
          history.push('/')
        } else {
          toast.warning(res.data.msg[0])
        }
      }).catch((err) => {
        Swal.fire({ text: 'NetWork Error. Connect to network' }).then(() => {
          window.location.reload()
        })
      })
    } else if (e.target.checked === false) {
      alert('Please OK for BLOCK Service')
      requestsApidata.BlockPGService(pguuid, e.target.id).then((res) => {
        if (res.data.successCode === "API_SUCCESS") {
          if (res.data.extraData.pgDetail.status === "BLOCKED") {
            toast.success('PG Service Block Successfully')
          }
        } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
          toast.error('Session Expired Login again!')
          history.push('/')
        } else if (res.data.exception === "JWT_MISSING") {
          toast.error('Session Expired Login again!')
          history.push('/')
        } else {
          toast.warning(res.data.msg[0])
        }
      }).catch((err) => {
        Swal.fire({ text: 'NetWork Error. Connect to network' }).then(() => {
          window.location.reload()
        })
      })
    }
  }
  const ExpandableTable = ({ data }) => {
    console.log('data----->', data)

    return <Row> {data.pg_servicea.map((v) => {
      return <Col lg="6">
        <div style={{ padding: 5 }}>
          <Row>
            <Col lg="3">
              <p> <span><CustomInput type='checkbox' label={v.pgservices} id={v.pgservices} defaultChecked={v.servicestatus === "ACTIVE"} onChange={customInputSwitched(data.pg_uuid)} /> </span></p></Col>
          </Row>
        </div>
      </Col>
    })}
    </Row>
  }
  useEffect(() => {
    requestsApidata.findAllPayoutMerchant().then(res => {
      console.log("pg details final resonse", res.data)
      // if (res.data.successCode === "API_SUCCESS") {
      //   setBlock(false)
      //   const map = new Map(res.data.extraData.pgDetail.map(({ pg_name, pg_uuid, created, pg_status, pg_services, service_status }) => [pg_name, { pg_name, pg_servicea: [], pg_uuid, created, pg_status }]))
      //   for (const { pg_name, service_status, pg_services } of res.data.extraData.pgDetail) map.get(pg_name).pg_servicea.push(...[{ pgservices: pg_services, servicestatus: service_status }].flat())
      //   setdata([...map.values()])
      // } else 
      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else {
        setdata(res.data)
        setBlock(false)
      }
    }).catch((err) => {
      Swal.fire({ text: 'NetWork Error. Connect to network' }).then(() => {
        // window.location.reload()
      })
    })

    // console.log(data)
  }, [])
  // ** Function to handle filter

  // ** Function to handle Pagination
  const updatepgdetailsHandler = (data) => {
    console.log('updatepgdetailsHandler', data)
    // console.log('submitpgdetaislcreation', data)
    setupdatepgbtndisabled(true)
    requestsApidata.updatePgConfigurationDetails(data).then((res) => {
      if (res.data.status === "SUCCESS") {
        toast.success("PG Updated Successfully")
        setupdatepgbtndisabled(false)
        updatepghandleModal()
        updatedata()
      } else if (res.data.status === "false") {
        toast.warning('Server error')
        setupdatepgbtndisabled(false)
        updatepghandleModal()
      } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "PG_ALREADYCREATED") {
        toast.error('PG details already created as per Input provided , please crosscheck the sensitive information')
        setupdatepgbtndisabled(false)
      } else {
        toast.error(res.data.msg[0])
        setupdatepgbtndisabled(false)
      }
    }).catch((err) => {
      Swal.fire({ text: 'NetWork Error. Connect to network' }).then(() => {
        // window.location.reload()
      })
    })
  }
  const submitpgdetaislcreation = (data) => {
    console.log('submitpgdetaislcreation', data)
    setbtndisabled(true)
    requestsApidata.CreatePGDetails(data).then((res) => {
      if (res.data.successCode === "API_SUCCESS") {
        setdata(res.data.extraData.transactionDetails)
        setBlock(false)
        requestsApidata.UpdatePgDetailsStatus(res.data.extraData.pgDetail.pgUuid).then(async (response) => {
          if (response.data.exception === "PG_NOT_CREATED") {
            toast.error('PG detals not found in System')
            setbtndisabled(false)
          } else {
            // const dataservice = ['UPI', 'UPI_QR', 'CARD']
            data.pgServices.forEach(border => {
              requestsApidata.PGServiceCreation(res.data.extraData.pgDetail.pgUuid, border).then(async (response) => {
                requestsApidata.UpdatePGService(res.data.extraData.pgDetail.pgUuid, border).then(async (response) => {
                })
              })
            })
            setbtndisabled(false)
            toast.success('PG Created and updated successfully')
            setModal(!modal)
            updatedata()
          }
        }).catch((err) => {
          Swal.fire({ text: 'NetWork Error. Connect to network' }).then(() => {
            // window.location.reload()
          })
        })
      } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "PG_ALREADYCREATED") {
        toast.error('PG details already created as per Input provided , please crosscheck the sensitive information')
        setbtndisabled(false)
      }
    })
  }
  const searchalldataHandler = (e) => {
    console.log("e.target.value", e.target.value)
    setSearchValue(e.target.value)
    if (e.target.value.length) {
      const updatedData = data.filter(item => {
        const startsWith =
          item.merchantId.startsWith(e.target.value) ||
          item.merchantStatus.startsWith(e.target.value) ||
          item.token.startsWith(e.target.value) ||
          item.walletCheckStatus.startsWith(e.target.value)

        // ||
        // item.pgType.startsWith(e.target.value) ||
        // item.merchantId.startsWith(e.target.value) ||
        // item.pgOrderID.startsWith(e.target.value) ||
        // item.status.startsWith(e.target.value) ||
        // item.emailId.startsWith(e.target.value) ||
        // item.paymentOption.startsWith(e.target.value) ||
        // item.orderID.startsWith(e.target.value)  ||
        // item.pgId.startsWith(e.target.value) ||
        // item.amount.startsWith(e.target.value) 

        const includes =
          item.merchantId.includes(e.target.value) ||
          item.merchantStatus.includes(e.target.value) ||
          item.token.includes(e.target.value) ||
          item.walletCheckStatus.includes(e.target.value)

        // ||
        // item.pgType.includes(e.target.value) ||
        // item.merchantId.includes(e.target.value) ||
        // item.pgOrderID.includes(e.target.value) ||
        // item.status.includes(e.target.value)  ||
        // item.emailId.includes(e.target.value) ||
        // item.paymentOption.includes(e.target.value) ||
        // item.orderID.includes(e.target.value) ||
        // item.pgId.includes(e.target.value) ||
        // item.amount.includes(e.target.value)

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setdata(updatedData)
      setSearchValue(e.target.value)
    } else {
     updatedata()
    }
  }
  return (
    <Fragment>
      <UILoader blocking={block}>

        <Datatablecomponent data={data} coloumnsprops={columns} refreshdata={updatedata}
          routename="Merchant List"
          isaddallpayoutmerlist={true}
          handleModal={handleModal}
          // ExpandableTable={<ExpandableTable />}
          searchFilter={searchalldataHandler}
          isaddfilter searchValue={searchValue}
        />
      </UILoader>
      {/* <PGUpdateModal PGnamealready={PGnamealready} open={updatepgmodal} handleModal={updatepghandleModal} disabledbtns={updatepgbtndisabled} parentCallback={updatepgdetailsHandler} /> */}

      {/* <PGrequestModal open={modal} handleModal={handleModal} disabledbtns={btndisabled} parentCallback={submitpgdetaislcreation} /> */}
    </Fragment>
  )
}

export default DataTableWithButtons
