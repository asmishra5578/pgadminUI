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
  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)
  const updatepghandleModal = () => setupdatepgmodal(!updatepgmodal)
  const updatedata = () => {
    setBlock(true)
    requestsApidata.pgdetailsApi().then(res => {
      // console.log("pg details final resonse", res.data)
      if (res.data.successCode === "API_SUCCESS") {
        // setdata(res.data.extraData.pgDetail)
        setBlock(false)
        const map = new Map(res.data.extraData.pgDetail.map(({pg_name, pg_uuid, created, pg_status, pg_services, service_status}) => [pg_name, {pg_name, pg_servicea: [], pg_uuid, created, pg_status}]))
        for (const {pg_name, service_status, pg_services} of res.data.extraData.pgDetail) map.get(pg_name).pg_servicea.push(...[{pgservices:pg_services, servicestatus:service_status}].flat())
        setdata([...map.values()])
    } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')   
    } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')   
    }
    }).catch((err) => {
      Swal.fire({text:'NetWork Error. Connect to network'}).then(() => {
        // window.location.reload()
      })
    })
  }
  const updatemodalopenclick = (e) => {
    console.log('eeeeee', e.target.id)
    setPGnamealready(e.target.id)
    updatepghandleModal()
    // requestsApidata.tgepgDetailByPGNameAndPgId(e.target.id).then(res => {
    //   console.log('ressss', res.data)
    // })
  }
  const pgblockhandler = (e) => {
    // console.log('pgblock', e.target.id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to block this PG",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Block it!'
    }).then((result) => {
      if (result.isConfirmed) {
        requestsApidata.blockpgdetails(e.target.id).then((res) => {
          // console.log('res-----<block', res.data)
          if (res.data.successCode === "API_SUCCESS") {
            // setdata(res.data.extraData.pgDetail)
            // setBlock(false)
            if (res.data.extraData.pgDetail.status === "BLOCKED") {
              requestsApidata.pgdetailsApi().then(res => {
                // setBlock(false)
                const map = new Map(res.data.extraData.pgDetail.map(({pg_name, pg_uuid, created, pg_status, pg_services, service_status}) => [pg_name, {pg_name, pg_servicea: [], pg_uuid, created, pg_status}]))
                // console.log("map--->", map)
                for (const {pg_name, service_status, pg_services} of res.data.extraData.pgDetail) map.get(pg_name).pg_servicea.push(...[{pgservices:pg_services, servicestatus:service_status}].flat())
                // console.log([...map.values()])
                setdata([...map.values()])
                toast.success('Data Updated Successfully')
              })
            }
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
      text: "You want to Active this PG",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Active it!'
    }).then((result) => {
      if (result.isConfirmed) {
        requestsApidata.UpdatePgDetailsStatus(e.target.id).then((res) => {
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
          if (res.data.successCode === "API_SUCCESS") {
            // setdata(res.data.extraData.pgDetail)
            // setBlock(false)
            if (res.data.extraData.pgDetail.status === "ACTIVE") {
              requestsApidata.pgdetailsApi().then(res => {
                // setBlock(false)
                const map = new Map(res.data.extraData.pgDetail.map(({pg_name, pg_uuid, created, pg_status, pg_services, service_status}) => [pg_name, {pg_name, pg_servicea: [], pg_uuid, created, pg_status}]))
                // console.log("map--->", map)
                for (const {pg_name, service_status, pg_services} of res.data.extraData.pgDetail) map.get(pg_name).pg_servicea.push(...[{pgservices:pg_services, servicestatus:service_status}].flat())
                // console.log([...map.values()])
                setdata([...map.values()])
                toast.success('Data Updated Successfully')
              })
            }
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
    const columns = [
      {
        name: 'PG Name',
        selector: 'pg_name',
        sortable: true,
        minWidth: '70px'
      },
      {
        name: 'PG UUID',
        selector: 'pg_uuid',
        sortable: true,
        minWidth: '250px'
      },
      {
        name: 'Created At',
        selector: 'created',
        sortable: true,
        minWidth: '150px'
      },
      {
        name: 'Status',
        selector: 'pg_status',
        sortable: true
      },
      {
        name: 'ACTION',
        sortable: true,
        cell: row => {
          return   <span>
         {row.pg_status === "ACTIVE" ?  <Badge onClick={pgblockhandler} color='danger' id={row.pg_uuid}>Block PG</Badge> : <Badge onClick={pgactivehandler} id={row.pg_uuid} color="success">Active PG</Badge>} 
          <Badge style={{marginLeft:10}} id={row.pg_name} color='success' onClick={updatemodalopenclick}>Update</Badge>
        </span>
           }
      }
    ]
    const  customInputSwitched = pguuid => (e) => {
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
        Swal.fire({text:'NetWork Error. Connect to network'}).then(() => {
          window.location.reload()
        })
      })
     }  else if (e.target.checked === false) {
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
        Swal.fire({text:'NetWork Error. Connect to network'}).then(() => {
          window.location.reload()
        })
      }) 
    }
    } 
    const ExpandableTable = ({ data }) => {
      console.log('data----->', data)
    
       return <Row> {data.pg_servicea.map((v) => {
          return <Col lg="6">
          <div style={{  padding:5}}>
             <Row>
          <Col lg="3">
           <p> <span><CustomInput type='checkbox'  label={v.pgservices} id={v.pgservices} defaultChecked={v.servicestatus === "ACTIVE"} onChange={customInputSwitched(data.pg_uuid)}/> </span></p></Col>
              </Row>
            </div>
            </Col>
        }) }
        </Row>
    }
  useEffect(() => {
    requestsApidata.pgdetailsApi().then(res => {
      console.log("pg details final resonse", res.data)
      if (res.data.successCode === "API_SUCCESS") {
        // setdata(res.data.extraData.pgDetail)
        setBlock(false)
        const map = new Map(res.data.extraData.pgDetail.map(({pg_name, pg_uuid, created, pg_status, pg_services, service_status}) => [pg_name, {pg_name, pg_servicea: [], pg_uuid, created, pg_status}]))
        for (const {pg_name, service_status, pg_services} of res.data.extraData.pgDetail) map.get(pg_name).pg_servicea.push(...[{pgservices:pg_services, servicestatus:service_status}].flat())
        setdata([...map.values()])
    } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')   
    } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')   
    }
    }).catch((err) => {
      Swal.fire({text:'NetWork Error. Connect to network'}).then(() => {
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
      if (res.data.successCode === "API_SUCCESS") {
         toast.success("PG Updated Successfully")
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
    }
    }).catch((err) => {
      Swal.fire({text:'NetWork Error. Connect to network'}).then(() => {
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
          Swal.fire({text:'NetWork Error. Connect to network'}).then(() => {
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

  return (
    <Fragment>
      <UILoader blocking={block}>

        <Datatablecomponent data={data} coloumnsprops={columns} refreshdata={updatedata}
          routename="PG List" isaddpgrequest={true} handleModal={handleModal} ExpandableTable={<ExpandableTable/>}/>
      </UILoader>
      <PGUpdateModal PGnamealready={PGnamealready} open={updatepgmodal} handleModal={updatepghandleModal} disabledbtns={updatepgbtndisabled} parentCallback={updatepgdetailsHandler} />
     
      <PGrequestModal open={modal} handleModal={handleModal} disabledbtns={btndisabled} parentCallback={submitpgdetaislcreation} />
    </Fragment>
  )
}

export default DataTableWithButtons
