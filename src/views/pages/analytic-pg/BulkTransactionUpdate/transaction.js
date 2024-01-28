// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import moment from "moment"
import axios from 'axios'
// ** Table Data & Columns
// import { columns } from './data'
// import responsedata from './requests'
import requestsApi from './request'
// import merchantApi from '../../account-settings/request'
// ** Add New Modal Component
import UILoader from '@components/ui-loader'
import { useHistory } from 'react-router-dom'
import DatePicker from "react-datepicker"
import { addDays } from "date-fns"
import "react-datepicker/dist/react-datepicker.css"
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
// import Datatablecomponent from '../../../../../../layouts/components/Datatablecomponent'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, RotateCw, X } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, Badge, CustomInput
} from 'reactstrap'
import { toast } from 'react-toastify'
import Select from 'react-select'
// import ReCAPTCHA from "react-google-recaptcha-enterprise"
import Swal from 'sweetalert2'
import DataTableWithButtons from '../../../../layouts/components/Datatablecomponent'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className='custom-control custom-checkbox'>
    <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    <label className='custom-control-label' onClick={onClick} />
  </div>
))
const requestsApidata = new requestsApi()
// const getmerchantApi = new merchantApi()
const Settlementreport = () => {
  // useEffect(() => {
  const history = useHistory()

  // });
  // ** States

  const [block, setBlock] = useState(false)
  const [modal, setModal] = useState(false)
  const [data, setdata] = useState([])
  const [disableduplodbtnfinal, setdisableduplodbtnfinal] = useState(true)
  const [selectedfile, setselectedfile] = useState([])
  const [isverified, setisverified] = useState(false)
  const [verifiedtoken, setverifiedtoken] = useState(false)

  const openmodalhandler = () => {
    setModal(!modal)
  }
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={openmodalhandler} />
  const getalldataHandler = () => {
    setBlock(true)
    requestsApidata.getalltxnupdatefiles('PAYIN').then(res => {
      console.log('res', res.data)
      if (res.data.successCode === "API_SUCCESS") {
        setdata(res.data.extraData.FilesList)
        setBlock(false)
        // toast.error('Remote IP not whitelisted. Please ask your admin to whitelist Remote IP')
      } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session expired')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session expired')
        history.push('/')
      } else {
        toast.warning(res.data.msg[0])
      }
    })
  }
  const onChangehandler = (response) => {
    console.log('onChange', response)
    if (response) {
      setisverified(true)
      setverifiedtoken(response)
    }
  }
  const refreshdata = () => {
    setBlock(true)
    getalldataHandler()
  }

  useEffect(() => {
    getalldataHandler()
  }, [])

  const uploaddataHandler = () => {
    // alert('uploaddataHandler')
    openmodalhandler()
  }
  const selectfileHandler = (e) => {
    // console.log('eeeee', e.target.files[0])
    if (e.target.files[0].type === "application/pdf") {
      toast.warning('PDF file not allowed')
    } else if (e.target.files[0].type === 'application/json') {
      toast.warning('JSON file not allowed')
    } else {
      setselectedfile(e.target.files[0])
      setdisableduplodbtnfinal(false)
    }
  }
  const finaluploadHandler = () => {
    //  console.log('selectedfile', selectedfile)
    const bodyFormData = new FormData()
    bodyFormData.append('file', selectedfile)
    //  console.log('bodyFormData', bodyFormData)
    setdisableduplodbtnfinal(true)
      requestsApidata.payinupdatetxnStatusfileupload(bodyFormData).then((res) => {
        setdisableduplodbtnfinal(false)
        console.log('ressssss', res.data)
        if (res.data.exception === null) {
          toast.error('Server Error')
        } else if (res.data.exception === "FILE_TYPE_ERROR") {
           toast.warning(res.data.msg[0])
        }  else if (res.data.exception === "TXN_STATUS_NOT_MATCH") {
          toast.warning('Transaction Status is not matched one of the orderId, Status will be SUCCESS/FAILED/PENDING')
         } else if (res.data.successCode === "API_SUCCESS") {
          Swal.fire({ text: res.data.msg[0], title: 'Success', icon: 'success' }).then(() => {
            refreshdata()
            openmodalhandler()
          })
        } else {
          toast.warning(res.data.msg[0])
        }
      })
  }
  const checkuploadedfilestatusHandler = (e) => {
    // console.log('eee', e.target.id)
    setBlock(true)
  requestsApidata.checktxnfileparsingstaus(e.target.id).then((res) => {
    setBlock(false)
    if (res.data.successCode === "API_SUCCESS") {
      console.log('res.data', res.data.extraData)
      Swal.fire({title:'Parsing status', text:res.data.extraData.status === true ? 'True' : 'False', icon:'success'
    })
    } else {
      toast.warning('Session is expired')
    }
  })
  }
  const columns = [
    {
      name: 'Date',
      selector: 'created',
      sortable: true,
      minWidth: '150px',
      cell: row => <span>{moment(row.created).format('DD-MM-YYYY hh:mm A')}</span>
    },

    {
      name: 'Created By',
      selector: 'createdByUuid',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'File Name',
      selector: 'fileName',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Parsing Status',
      selector: 'parsingStatus',
      sortable: true,
      minWidth: '100px',
      cell: row => <span>
        {row.parsingStatus === "true" ? 'TRUE' : row.parsingStatus === "false" ? 'FALSE' : 'PENDING'}
      </span>
    },
    {
      name: 'Action',
      selector: 'parsingStatus',
      sortable: true,
      minWidth: '200px',
      cell: row => {
        return (
          <span>
            <Badge id={row.url} color={row.parsingStatus === "true" ? 'success' : row.parsingStatus === "false" ? 'primary' : 'warning'}>
              <a href={row.url} download>Download</a>
            </Badge>
            <Badge onClick={checkuploadedfilestatusHandler} id={row.fileName} style={{ marginLeft: 10, cursor: 'pointer' }} color={row.parsingStatus === "true" ? 'success' : row.parsingStatus === "false" ? 'primary' : 'warning'}>
              Check Status
            </Badge>
          </span>
        )
      }
    }

  ]
  return (
    <Fragment>
      <UILoader blocking={block}>

        <DataTableWithButtons data={data} coloumnsprops={columns}
          addbulkfilemoneytransfer
          updatedatahandler={refreshdata} uploaddataHandler={uploaddataHandler}
          routename="Payin Bulk Transaction Update" />
      </UILoader>
      <Modal
        isOpen={modal}
        toggle={openmodalhandler}
        style={{ maxWidth: '40%', width: '100%' }}
      >
        <ModalHeader className='mb-3' toggle={openmodalhandler} close={CloseBtn} tag='div'>
          <h5 className='modal-title'>Upload Files</h5>
        </ModalHeader>
        <div style={{ marginLeft: 30, marginTop: -30 }}>

          <p>Download Sample File<span>
            <Badge style={{ marginLeft: 20, cursor: 'pointer' }} color="primary">
              <a href='https://vpay-app-files.s3.ap-south-1.amazonaws.com/sampleFileDownload/TransactionStatusUpdate.xlsx' download>Click to download XLSX</a>
            </Badge>
            <Badge style={{ marginLeft: 20, cursor: 'pointer' }} color='primary'>
              <a href='https://vpay-app-files.s3.ap-south-1.amazonaws.com/sampleFileDownload/TransactionStatusUpdate.csv' download>Click to download CSV</a>
            </Badge></span>
          </p>
        </div>
        <ModalBody className='flex-grow-1'>
          <CardTitle tag='h4'>Bulk Status Update Upload File</CardTitle>
          <Label for='exampleCustomFileBrowser'>Select File for Upload</Label>
          <CustomInput onChange={selectfileHandler} type='file' id='exampleCustomFileBrowser' name='customFile' />
        </ModalBody>
        <ModalFooter>
          <Button color='primary' disabled={disableduplodbtnfinal} onClick={finaluploadHandler}>Upload Files</Button>
          <Button onClick={openmodalhandler}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

export default Settlementreport
