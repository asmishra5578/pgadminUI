// ** React Imports
import { Fragment, useState, forwardRef } from 'react'

// ** Table Data & Columns
// import { columns } from './data'
// import responsedata from './requests'
// ** Add New Modal Component
import AddNewModal from '../../views/tables/data-tables/basic/AddNewModal'
import Select from 'react-select'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, RefreshCw, CreditCard, PlusCircle, RotateCcw } from 'react-feather'
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
  Badge
} from 'reactstrap'
import { JsonToExcel } from "react-json-to-excel"

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className='custom-control custom-checkbox'>
    <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    <label className='custom-control-label' onClick={onClick} />
  </div>
))
const ExpandedComponent = ({ data }) => <pre>sadsads</pre>

const DataTableWithButtons = (props) => {

  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setdata] = useState([])
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

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          {props.iswallettransfer === undefined ? <CardTitle tag='h4'> {props.routename}</CardTitle> : <CardTitle tag='h4'> {props.routename}&nbsp;&nbsp;Balance:{props.walletbalance}</CardTitle>}
          {/* {props.isaddpayoutwalletlist === undefined ? <></> : <div><h6 style={{ marginLeft: 25 }}>Main Wallet Balance: {props.getMainWalletBalance}</h6>   </div>} */}
          {/* {props.isaddwalletrecharge === undefined ? <></> : <div><h6 style={{marginLeft:25}}>Main Wallet Balance: {props.getMainWalletBalance}</h6>   </div>} */}
          {props.isaddreset === undefined ? <></> : <CardTitle tag='h4'>
            <Badge color='primary' onClick={props.MerchantWisePgWiseSumresetHandler}>Reset</Badge>
          </CardTitle>
          }
          {props.isaddreset2 === undefined ? <></> : <CardTitle tag='h4'>
            <Badge color='primary' onClick={props.pgtyperesetHandler}>Reset</Badge>
          </CardTitle>
          }

          <div className='d-flex mt-md-0 mt-1'>
            <UncontrolledButtonDropdown>
              <DropdownToggle color='secondary' caret outline>
                {/* <Share size={15} /> */}
                <span className='align-middle ml-50'>Export</span>
              </DropdownToggle>
              <DropdownMenu right>

                <DropdownItem className='w-100' onClick={() => downloadCSV(props.data)}>
                  <FileText size={15} />
                  <span className='align-middle ml-50'>CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <span className=''>
                    <JsonToExcel
                      title={<span><FileText size={15} />EXCEL</span>}
                      data={props.data}
                      fileName="Reportxlsx"
                    />
                  </span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            {props.isaddpgrequest === undefined ? <></> : <div>
              <Button className='ml-2' color='primary' onClick={props.refreshdata}>
                <RefreshCw size={15} />
                <span className='align-middle ml-50'>Reset</span>
              </Button>
              <Button className='ml-2' color='primary' onClick={props.handleModal}>
                <Plus size={15} />
                <span className='align-middle ml-50'>PG Configuration</span>
              </Button>
            </div>}
            {props.addbulkfilemoneytransfer === undefined ? <></> : <div>
              {/* <Button className='ml-2' color='primary' onClick={props.downloadsamplefile}>
                <Download size={15} />
                <span className='align-middle ml-50'>Download Sample File</span>
              </Button> */}
              <Button className='ml-2' color='primary' onClick={props.updatedatahandler}>
                Reset <RotateCcw size={10} />
              </Button>
              <Button className='ml-2' color='primary' onClick={props.uploaddataHandler}>
                <Plus size={10} /> Upload Files
              </Button>
            </div>}
            {props.isaddcommission === undefined ? <></> : <div>
              <Button className='ml-2' color='primary' onClick={props.handleModal}>
                <Plus size={15} />
                <span className='align-middle ml-50'>Add Commession</span>
              </Button>
              <Button className='ml-2' color='primary' onClick={props.refreshdata}>
                <RefreshCw size={15} />
                <span className='align-middle ml-50'>Reset</span>
              </Button>

            </div>}
            {props.isaddpayoutwalletlist === undefined ? <></> : <div>
              <Button className='ml-2' color='primary' onClick={props.handleModal}>
                <CreditCard size={15} />
                <span className='align-middle ml-50'>Main WalletRecharge</span>
              </Button>
              <Button className='ml-2' color='primary' onClick={props.refreshdata}>
                <RefreshCw size={15} />
                <span className='align-middle ml-50'>Reset</span>
              </Button>

            </div>}

            {props.ispayinpayoutstatusupdate === undefined ? <></> : <div>
              <Button className='ml-2' color='primary' onClick={props.refreshdata}>
                <RefreshCw size={15} />
                <span className='align-middle ml-50'>Reset</span>
              </Button>
              <Button className='ml-2' color='primary' onClick={props.handleModal}>
                <Plus size={15} />
                <span className='align-middle ml-50'>Update Status</span>
              </Button>
            </div>}
            {props.isaddmerchantrequest === undefined ? <></> : <div>
              <Button className='ml-2' color='primary' onClick={props.refreshdata}>
                <RefreshCw size={15} />
                <span className='align-middle ml-50'>Reset</span>
              </Button>
              <Button className='ml-2' color='primary' onClick={props.handleModal}>
                <Plus size={15} />
                <span className='align-middle ml-50'>Create Merchant</span>
              </Button>
            </div>}
            {props.isaddwalletrecharge === undefined ? <></> : <div>
              <Button className='ml-2' color='primary' onClick={props.refreshdata}>
                <RefreshCw size={15} />
                <span className='align-middle ml-50'>Reset</span>
              </Button>
              <Button className='ml-2' color='primary' onClick={props.handleModal}>
                <Plus size={15} />
                <span className='align-middle ml-50'>Wallet Recharge</span>
              </Button>
            </div>}
            {props.isbulkuploadstatus === undefined ? <></> : <div>
              <Button className='ml-2' color='primary' onClick={props.refreshdata}>
                <RefreshCw size={15} />
                <span className='align-middle ml-50'>Reset</span>
              </Button>
              <Button className='ml-2' color='primary' onClick={props.handleModal}>
                <Plus size={15} />
                <span className='align-middle ml-50'>Update Status</span>
              </Button>
            </div>}
            {props.isaddcomplaintrequest === undefined ? <></> : <div>
              <Button className='ml-2' color='primary' onClick={props.updatedatahandler}>
                <RefreshCw size={15} />
                <span className='align-middle ml-50'>Reset</span>
              </Button>
              <Button className='ml-2' color='primary' onClick={props.handleModal}>
                <Plus size={15} />
                <span className='align-middle ml-50'>Add Complaint Type</span>
              </Button>
              <Button className='ml-2' color='primary' onClick={props.subtypeHandlerModal}>
                <Plus size={15} />
                <span className='align-middle ml-50'>Add Complaint Sub Type</span>
              </Button>
            </div>}
            {props.isaddrefundrequest === undefined ? <></> : <div>
              <Button className='ml-2' color='primary' onClick={props.updatedatahandler}>
                <RefreshCw size={15} />
                <span className='align-middle ml-50'>Reset</span>
              </Button>
              <Button className='ml-2' color='primary' onClick={props.handleModal}>
                <Plus size={15} />
                <span className='align-middle ml-50'>Add Refund Request</span>
              </Button>
            </div>}
            {props.isaddrefresh === undefined ? <></> : <div>
              <Button className='ml-2' color='primary' onClick={props.refreshdata}>
                <RefreshCw size={15} />
                <span className='align-middle ml-50'>Reset</span>
              </Button>
            </div>}
            {props.isaddpayinnewwallret === undefined ? <></> : <Button className='ml-2' color='primary' onClick={props.handleModal}>
              <Plus size={15} />
              <span className='align-middle ml-50'>Add Wallet</span>
            </Button>
            }
            {props.isaddpayinnebankde === undefined ? <></> : <Button className='ml-2' color='primary' onClick={props.handleModal}>
              <Plus size={15} />
              <span className='align-middle ml-50'>Add Bank</span>
            </Button>
            }
          </div>
        </CardHeader>
        {/* <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='mr-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row> */}
        {props.isaddfilter === undefined ? <></> : <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='mr-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={props.searchValue}
              onChange={props.searchFilter}
            // placeholder="Merchant Order ID"
            />
          </Col>
        </Row>}
        {props.isaddcommission === undefined ? <></> : <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='mr-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={props.searchValue}
              onChange={props.searchFilter}
            // placeholder="Merchant Order ID"
            />
          </Col>
        </Row>}
        {
          props.isaddpgselect === undefined ? <></> : <div style={{ padding: 20 }}>
            <Label>Select PG</Label>
            <Select
              // theme={selectThemeColors}
              isClearable={false}
              id='kycStatus'
              className='react-select dshboard'
              classNamePrefix='select'
              options={props.pglistoption}
              // defaultValue={countryOptions[0]}
              // defaultInputValue="SUCCESS"
              onChange={props.selectpghadler}
              value={props.selecpguuidvalue}
            />
          </div>
        }
        <DataTable
          noHeader
          pagination
          // expandableRows
          columns={props.coloumnsprops}
          paginationPerPage={props.ispageperdata ? '4' : '10'}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          data={props.data}
        // expandableRowsComponent={ExpandedComponent}
        />
      </Card>
    </Fragment>
  )
}

export default DataTableWithButtons
