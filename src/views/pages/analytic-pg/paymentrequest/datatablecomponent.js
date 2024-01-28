// ** React Imports
import { useState } from 'react'

// ** Table columns & Expandable Data
import ExpandableTable, { columns } from './data'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, RefreshCw, Share, FileText } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Button, UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu, Row, Col, Label, Input, 
  DropdownItem } from 'reactstrap'
  import { JsonToExcel } from "react-json-to-excel"

const DataTableWithButtons = (props) => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0)

  // ** Function to handle filter
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={10}
      breakLabel={'...'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName={'active'}
      pageClassName={'page-item'}
      nextLinkClassName={'page-link'}
      nextClassName={'page-item next'}
      previousClassName={'page-item prev'}
      previousLinkClassName={'page-link'}
      pageLinkClassName={'page-link'}
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1'}
    />
  )
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
    <Card>
      <CardHeader> 
        <CardTitle tag='h4'>Merchant Details with PG and Services</CardTitle>
        <div className='d-flex mt-md-0 mt-1'>

        <UncontrolledButtonDropdown>
              <DropdownToggle color='secondary' caret outline>
                <Share size={15} />
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
        {props.isaddrefresh === undefined ? <></>   : <div>
                <Button className='ml-2' color='primary' onClick={props.refreshdata}>
                Reset<RefreshCw style={{marginLeft:5}} size={15} />
              {/* <span className='align-middle ml-50'>Reset</span> */}
            </Button>
              </div>}
              </div>
      </CardHeader>
      {props.isaddfilter === undefined ? <></> :  <Row className='justify-content-end mx-0'>
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
        </Row> }
      <DataTable
        noHeader
        pagination
        data={props.data}
        expandableRows
        columns={props.coloumnsprops}
        expandOnRowClicked
        className='react-dataTable'
        sortIcon={<ChevronDown size={10} />}
        paginationDefaultPage={currentPage + 1}
        expandableRowsComponent={<ExpandableTable />}
        // paginationRowsPerPageOptions={[10, 25, 50, 100]}
        // paginationComponent={CustomPagination}
      />
    </Card>
  )
}

export default DataTableWithButtons
