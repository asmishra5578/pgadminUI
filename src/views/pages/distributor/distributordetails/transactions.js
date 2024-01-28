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
  const [distributorlist, setdistributorlist] = useState([])
  const [startDate, setstartDate] = useState('')
  const [searchStartDate, setsearchStartDate] = useState('')
  const [endDate, setendDate] = useState('')
  const [searchEndDate, setsearchEndDate] = useState('')
  const [block, setblock] = useState(true)
  const [modal, setModal] = useState(false)
  const [updatepgmodal, setupdatepgmodal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setdata] = useState([])
  const [PGnamealready, setPGnamealready] = useState('')
  const [filterdatadistributor, setfilterdatadistributor] = useState([])
  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)
  const updatepghandleModal = () => setupdatepgmodal(!updatepgmodal)
  const updatedata = () => {
    setblock(true)
    requestsApidata.getdistrubutorlistbyadmin().then(res => {
      // console.log("pg details final resonse", res.data)
      if (res.data.status === 200) {
        setdistributorlist(res.data.listOfDistributorDetails)
        setblock(false)
      } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      }
    }).catch((err) => {
      Swal.fire({ text: 'NetWork Error. Connect to network' }).then(() => {
        // window.location.reload()
      })
    })
  }
  const updatemodalopenclick = (e) => {
    console.log('eeeeee', e.target.id)
    setPGnamealready(e.target.id)
    const filterdata = distributorlist.filter((m) => m.distributorID === e.target.id)
    console.log('filterdata', filterdata[0])
    setfilterdatadistributor(filterdata[0])
    updatepghandleModal()

    // requestsApidata.tgepgDetailByPGNameAndPgId(e.target.id).then(res => {
    //   console.log('ressss', res.data)
    // })
  }
  const distributorBlockhandler = (e) => {
    console.log('pgblock', e.target.id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to block this Distrubutor",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Block it!'
    }).then((result) => {
      if (result.isConfirmed) {
        requestsApidata.updatedistributorstatusbyadmin(e.target.id, 'BLOCKED').then((res) => {
          console.log('res-----<block', res.data)
          if (res.data.userStatus === "BLOCKED") {
            updatedata()
            toast.success('Status Updated Successfully')
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
  const distributoractivehandler = (e) => {
    // console.log('pgactive', e.target.id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Active this Distributor",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Active it!'
    }).then((result) => {
      if (result.isConfirmed) {
        requestsApidata.updatedistributorstatusbyadmin(e.target.id, 'ACTIVE').then((res) => {
          console.log('res-----<block', res.data)
          if (res.data.userStatus === "ACTIVE") {
            updatedata()
            toast.success('Status Updated Successfully')
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
      name: 'Name',
      selector: 'distributorName',
      sortable: true,
      minWidth: '70px'
    },
    {
      name: 'Distributor ID',
      selector: 'distributorID',
      sortable: true,
      minWidth: '250px'
    },
    {
      name: 'Type',
      selector: 'distributorType',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Phone',
      selector: 'phoneNumber',
      sortable: true
    },
    {
      name: 'Status',
      selector: 'userStatus',
      sortable: true
    },
    {
      name: 'ACTION',
      sortable: true,
      minWidth: '300',
      cell: row => {
        return <div>
          {row.userStatus === "NEW" ? <span> <Badge onClick={distributorBlockhandler} color='danger' id={row.distributorID}>Block</Badge> <Badge onClick={distributoractivehandler} color='success' id={row.distributorID}>ACTIVE</Badge> </span> : row.userStatus === "ACTIVE" ? <Badge onClick={distributorBlockhandler} color='danger' id={row.distributorID}>Block</Badge> : row.userStatus === "BLOCKED" ? <Badge onClick={distributoractivehandler} id={row.distributorID} color="success">Active</Badge> : null}
        {/* <Badge style={{ marginLeft: 10, marginTop:5 }} id={row.distributorID} color='success' onClick={updatemodalopenclick}>Update</Badge> */}
        </div>
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
    requestsApidata.getdistrubutorlistbyadmin().then(res => {
      console.log("pg details final resonse", res.data)
      if (res.data.status === 200) {
        setdistributorlist(res.data.listOfDistributorDetails)
        setblock(false)
      } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
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
      Swal.fire({ text: 'NetWork Error. Connect to network' }).then(() => {
        // window.location.reload()
      })
    })
  }
  const submitpgdetaislcreation = (data) => {
    console.log('submitpgdetaislcreation', data)
    setbtndisabled(true)
    requestsApidata.createDistributorbyAdmin(data).then((res) => {
     if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "PG_ALREADYCREATED") {
        toast.error('PG details already created as per Input provided , please crosscheck the sensitive information')
        setbtndisabled(false)
      } else if (res.data.userStatus === "ACTIVE") {
          Swal.fire({allowEnterKey:false, allowOutsideClick:false, allowEscapeKey:false, title:'Distributor Created Successfully', text:`Password:${res.data.password}`})
          handleModal()
          updatedata()
      }
    })
  }

  return (
    <Fragment>
      <UILoader blocking={block}>

        <Datatablecomponent data={distributorlist} coloumnsprops={columns} refreshdata={updatedata}
          routename="Distributor Details" isadddistributor={true} handleModal={handleModal}
        // ExpandableTable={<ExpandableTable/>}
        />
      </UILoader>
      <PGUpdateModal filterdatadistributor={filterdatadistributor} PGnamealready={PGnamealready} open={updatepgmodal} handleModal={updatepghandleModal} disabledbtns={updatepgbtndisabled} parentCallback={updatepgdetailsHandler} />

      <PGrequestModal open={modal} handleModal={handleModal} disabledbtns={btndisabled} parentCallback={submitpgdetaislcreation} />
    </Fragment>
  )
}

export default DataTableWithButtons
