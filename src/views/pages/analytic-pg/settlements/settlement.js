// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import moment from "moment"

// ** Table Data & Columns
import { columns } from './data'
import requestsApi from '../requests'
// ** Add New Modal Component
// import AddNewModal from './AddNewModal'
import UILoader from '@components/ui-loader'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import Datatablecomponent from '../../../../layouts/components/Datatablecomponent'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'
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
  Col
} from 'reactstrap'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className='custom-control custom-checkbox'>
    <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    <label className='custom-control-label' onClick={onClick} />
  </div>
))
const requestsApidata = new requestsApi()
const Settlementreport = () => {
    // console.log("response datad----->", data({}))
    // useEffect(() => {


    // });
  // ** States
  const [block, setBlock] = useState(true)

  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setdata] = useState([])
  const [settlement, setsettlement] = useState('Settlements')
  const [startDate, setstartDate] = useState('')
  const [searchStartDate, setsearchStartDate] = useState('')
  const [endDate, setendDate] = useState('') 
  const [searchEndDate, setsearchEndDate] = useState('') 
  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)


  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    const status = {
      1: { title: 'Current', color: 'light-primary' },
      2: { title: 'Professional', color: 'light-success' },
      3: { title: 'Rejected', color: 'light-danger' },
      4: { title: 'Resigned', color: 'light-warning' },
      5: { title: 'Applied', color: 'light-info' }
    }

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.full_name.toLowerCase().includes(value.toLowerCase()) ||
          item.post.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.age.toLowerCase().includes(value.toLowerCase()) ||
          item.salary.toLowerCase().includes(value.toLowerCase()) ||
          item.start_date.toLowerCase().includes(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
   // const CustomPagination = () => (
  //   <ReactPaginate
  //     previousLabel=''
  //     nextLabel=''
  //     forcePage={currentPage}
  //     onPageChange={page => handlePagination(page)}
  //     pageCount={searchValue.length ? filteredData.length / 7 : data.length / 7 || 1}
  //     breakLabel='...'
  //     pageRangeDisplayed={2}
  //     marginPagesDisplayed={2}
  //     activeClassName='active'
  //     pageClassName='page-item'
  //     breakClassName='page-item'
  //     breakLinkClassName='page-link'
  //     nextLinkClassName='page-link'
  //     nextClassName='page-item next'
  //     previousClassName='page-item prev'
  //     previousLinkClassName='page-link'
  //     pageLinkClassName='page-link'
  //     breakClassName='page-item'
  //     breakLinkClassName='page-link'
  //     containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
  //   />
  // )

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }
  const fromDate = moment().subtract(1, "days").format("DD-MM-YYYY")
  const toDate = moment().format("DD-MM-YYYY")
  useEffect(() => {
    // console.log("settlementdataapicall", fromDate)
    requestsApidata.getsettledAPI(fromDate, toDate).then(res => {
        // console.log("final resonse", res.data)
        setdata(res.data)
    setBlock(false)
      })
  }, [])
 const filteByDate = () => {
  //  console.log('filteByDate', searchStartDate, searchEndDate)
   requestsApidata.getsettledAPI(searchStartDate, searchEndDate).then(res => {
    // console.log("final filteByDate", res.data)
    setdata(res.data)
setBlock(false)
  })
 }
 const searchStartdatehandle = (e) => {
setstartDate(e)
setsearchStartDate(moment(e, "DDMMYYYY").format("DD-MM-YYYY"))
  }
const  searchEnddatehandle = (e) => {
    if (startDate === "") {
      alert("Kindly first select start date")
    } else  {
      setendDate(e)
setsearchEndDate(moment(e, "DDMMYYYY").format("DD-MM-YYYY"))
    }
  }
  
  return (
    <Fragment>
        {/* <DataTable
          noHeader
          pagination
          // selectableRows
          columns={columns}
          paginationPerPage={7}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          // paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : data}
          // selectableRowsComponent={BootstrapCheckbox}
        /> */}
        {/* <Card style={{padding:10}}>
          <div style={{display:"inline"}}>
          <Button color='primary' size="sm" onClick={() => settlementApihandler()}>Settlement Data</Button>
          <Button color='primary' size="sm" style={{marginLeft:9}}
          onClick={() => UnsettlementApihandler()}
          >UnSettlement Data</Button> 
          </div>
        
        </Card> */}
          <div style={{ display: "flex", marginBottom: 10, marginTop: -20 }}>
          <div>
            <Label className="mr-1">Date Range From</Label>
            <br />
            <DatePicker
              className="form-control w-100"
              selected={startDate}
              onChange={searchStartdatehandle}
              peekNextMonth
              showMonthDropdown
              placeholderText="Date Range From"
              maxDate={new Date()}
              onKeyDown={(e) => {
                e.preventDefault()
             }}
            />
          </div>
          <div style={{ marginLeft: 10 }}>
            <Label className="mr-1">Date Range To</Label>
            <br />
            <DatePicker
              className="form-control w-100"
              selected={endDate}
              onChange={searchEnddatehandle}
              peekNextMonth
              showMonthDropdown
              // showYearDropdown
              placeholderText="Range To"
              minDate={startDate}
              maxDate={new Date()}
              onKeyDown={(e) => {
                e.preventDefault()
             }}
            />
          </div>

          <div style={{ marginTop: 20, marginLeft: 10 }}>
            <Button color="primary" 
            onClick={filteByDate}
            >
              FILTER
            </Button>
          </div>
        </div>
    <UILoader blocking={block}>

        <Datatablecomponent data={data} coloumnsprops={columns} routename={settlement}/>
    </UILoader>

      {/* <AddNewModal open={modal} handleModal={handleModal} /> */}
    </Fragment>
  )
}

export default Settlementreport
