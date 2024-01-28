// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'

// ** Table Data & Columns
import { columns } from './unsetdata'
import requestsApi from '../requests'
// ** Add New Modal Component
// import AddNewModal from './AddNewModal'
import UILoader from '@components/ui-loader'

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
    const keys = Object.keys(array[0])

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
  useEffect(() => {
    requestsApidata.getUnsettledAPI().then(res => {  
    const dt =  res.data    
    let i = 0
    dt.forEach(ele => {
      dt[i].amount = ((ele.amount) / 100)
      i++
    })
    //console.log("UnSettlement response", dt)
    setdata(dt)
    
    setBlock(false)
      })
  }, [])
  const UnsettlementApihandler = () => {
    setBlock(true)
    requestsApidata.getUnsettledAPI().then(res => {
      const dt =  res.data    
      let i = 0
      dt.forEach(ele => {
        dt[i].amount = ((ele.amount) / 100)
        i++
      })
      setdata(dt)
      setsettlement('UnSettlement')
    setBlock(false)
    })
  }
  const settlementApihandler = () => {
    setBlock(true)
    requestsApidata.getsettledAPI().then(res =>  {
      res.data.map(ele => ((ele.amount) / 100))
      const dt =  res.data    
      let i = 0
      dt.forEach(ele => {
        dt[i].amount = ((ele.amount) / 100)
        i++
      })
      setdata(dt)
      setsettlement('Settlement')
      setBlock(false)
    })
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
         
    <UILoader blocking={block}>

        <Datatablecomponent data={data} coloumnsprops={columns} routename='Unsettlement'/>
    </UILoader>

      {/* <AddNewModal open={modal} handleModal={handleModal} /> */}
    </Fragment>
  )
}

export default Settlementreport
