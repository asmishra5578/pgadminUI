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
  const history = useHistory()

  // ** Statessetdefaultvalue
  const [defaultvaluecheck, setdefaultvalue] = useState(true)

  const [btndisabled, setbtndisabled] = useState(false)
  const [updatepgbtndisabled, setupdatepgbtndisabled] = useState(false)
  const [distributorlist, setdistributorlist] = useState([])
  const [selectdisbutorid, setselectdisbutorid] = useState('Select')
  const [merchantlistbydisID, setmerchantlistbydisID] = useState([])
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
    requestsApidata.findAllMerchantsAssociatedWithADistributor(selectdisbutorid.value).then((res) => {
      console.log('merchantlistbydistributorid', res.data)
      setBlock(false)
      if (res.data.status === 200) {
        setmerchantlistbydisID(res.data.listOfMerchantDetails)
      }
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
      text: "You want to block this Merchant",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Block it!'
    }).then((result) => {
      if (result.isConfirmed) {
        requestsApidata.updateDistributorMerchantDetailsStatus(e.target.id, selectdisbutorid.value, 'BLOCKED').then((res) => {
          // console.log('res-----<block', res.data)
          if (res.data.status === 200) {
            updatedata()
            toast.success('Status Change Successfully')
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
        requestsApidata.updateDistributorMerchantDetailsStatus(e.target.id, selectdisbutorid.value, 'ACTIVE').then((res) => {
          // console.log('res-----<block', res.data)
          if (res.data.status === 200) {
            updatedata()
            toast.success('Status Change Successfully')
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
      name: 'Merchant Name',
      selector: 'merchantName',
      sortable: true,
      minWidth: '70px'
    },
    {
      name: 'Merchant ID',
      selector: 'merchantID',
      sortable: true,
      minWidth: '250px'
    },
    {
      name: 'Created At',
      selector: 'createdAt',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Phone Number',
      selector: 'phoneNumber',
      sortable: true
    },
    {
      name: 'Permenant Link',
      selector: 'permenantLink',
      sortable: true
    },
    {
      name: 'Status',
      selector: 'userStatus',
      sortable: true,
      minWidth:40
    },
    {
      name: 'ACTION',
      sortable: true,
      cell: row => {
        return <span>
          {row.userStatus === "ACTIVE" ? <Badge onClick={pgblockhandler} color='danger' id={row.merchantID}>Block</Badge> : <Badge onClick={pgactivehandler} id={row.merchantID} color="success">Active</Badge>}
          {/* <Badge style={{ marginLeft: 10 }} id={row.merchantID} color='success' onClick={updatemodalopenclick}>Update</Badge> */}
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
  const getalldisributorlist = () => {
    requestsApidata.getdistrubutorlistbyadmin().then(res => {
      console.log("setdistributorlist", res.data.listOfDistributorDetails)
      if (res.data.status === 200) {
        setdistributorlist(res.data.listOfDistributorDetails)
        setBlock(false)
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
  useEffect(() => {
    getalldisributorlist()
    requestsApidata.pgdetailsApi().then(res => {
      console.log("pg details final resonse", res.data)
      if (res.data.successCode === "API_SUCCESS") {
        // setdata(res.data.extraData.pgDetail)
        setBlock(false)
        const map = new Map(res.data.extraData.pgDetail.map(({ pg_name, pg_uuid, created, pg_status, pg_services, service_status }) => [pg_name, { pg_name, pg_servicea: [], pg_uuid, created, pg_status }]))
        for (const { pg_name, service_status, pg_services } of res.data.extraData.pgDetail) map.get(pg_name).pg_servicea.push(...[{ pgservices: pg_services, servicestatus: service_status }].flat())
        setdata([...map.values()])
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
    if (selectdisbutorid === 'Select') {
      toast.warning('Select Distributor ID')
    } else {
      setbtndisabled(true)
      requestsApidata.createMerchantbydistributoridBYadmin(data, selectdisbutorid.value).then((res) => {
        if (res.data.successCode === "API_SUCCESS") {
          setBlock(true)
          requestsApidata.findAllMerchantsAssociatedWithADistributor(selectdisbutorid.value).then((res) => {
            console.log('merchantlistbydistributorid', res.data)
            setBlock(false)
            if (res.data.status === 200) {
              setmerchantlistbydisID(res.data.listOfMerchantDetails)
              toast.success('Merchant Added Successfully')
              handleModal()
            }
          })
        } else if (res.data.exception === "MERCHANT_ALREADY_EXISTS") {
          toast.warning(res.data.msg[0])
        } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
          toast.error('Session Expired Login again!')
          history.push('/')
        } else if (res.data.exception === "JWT_MISSING") {
          toast.error('Session Expired Login again!')
          history.push('/')
        } else if (res.data.exception === "PG_ALREADYCREATED") {
          toast.error('PG details already created as per Input provided , please crosscheck the sensitive information')
          setbtndisabled(false)
        } else {
          toast.warning(res.data.msg[0])
        }
      })
    }
  }
  const countryOptions =
    distributorlist.map((v) => {
      return { value: v.distributorID, label: `${v.distributorID} (${v.distributorName})` }
    })
  const selectdistributoridHandler = (e) => {
    console.log('findAllMerchantsAssociatedWithADistributor', e.value)
    setselectdisbutorid(e)
    setBlock(true)
    requestsApidata.findAllMerchantsAssociatedWithADistributor(e.value).then((res) => {
      console.log('merchantlistbydistributorid', res.data)
      setBlock(false)
      if (res.data.status === 200) {
        setmerchantlistbydisID(res.data.listOfMerchantDetails)
      }
    })
  }

  return (
    <Fragment>
      <Card style={{ padding: 20 }}>
        <Row>
          <Col lg="4">
            <h6>Select Distributor ID</h6>
            <Select
              // isMulti
              isClearable={false}
              id='pgServices'
              className='react-select'
              classNamePrefix='select'
              options={countryOptions}
              // defaultValue={countryOptions[0]}
              onChange={selectdistributoridHandler}
              value={selectdisbutorid}
            />
          </Col>
        </Row>

      </Card>
      <UILoader blocking={block}>
        <Datatablecomponent data={merchantlistbydisID} coloumnsprops={columns} refreshdata={updatedata}
          routename="Merchant List" isaddmerchantbydistriID={true} handleModal={handleModal} />
      </UILoader>
      <PGUpdateModal PGnamealready={PGnamealready} open={updatepgmodal} handleModal={updatepghandleModal} disabledbtns={updatepgbtndisabled} parentCallback={updatepgdetailsHandler} />

      <PGrequestModal open={modal} handleModal={handleModal} disabledbtns={btndisabled} parentCallback={submitpgdetaislcreation} />
    </Fragment>
  )
}

export default DataTableWithButtons
