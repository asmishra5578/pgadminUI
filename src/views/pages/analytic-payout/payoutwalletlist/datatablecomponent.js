import { columns } from './data'
// ** React Imports
import { useState } from 'react'

// ** Table columns & Expandable Data
// import { columns } from './merchantdata'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, CreditCard, Plus, RotateCw } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Button, Card, CardHeader, CardTitle } from 'reactstrap'

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

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Payout Wallet Lists</CardTitle><br/>

        <CardTitle tag='h4'><Button color="primary" onClick={props.updatedatahandler}>
        Reset<RotateCw size={15} />

        </Button>
          </CardTitle>
        {/* <CardTitle tag='h4'><Button color="primary" onClick={props.createwalletMoadl}>Create Wallet</Button></CardTitle> */}
      </CardHeader>
      <h6 style={{marginLeft:25}}>Main Wallet Balance: {props.getMainWalletBalance}</h6>
 
      <DataTable
        noHeader
        pagination
        data={props.data}
        // expandableRows
        columns={props.coloumnsprops}
        // expandOnRowClicked
        className='react-dataTable'
        sortIcon={<ChevronDown size={10} />}
        paginationDefaultPage={currentPage + 1}
        // expandableRowsComponent={<ExpandableTable />}
        // paginationRowsPerPageOptions={[10, 25, 50, 100]}
        // paginationComponent={CustomPagination}
      />
    </Card>
  )
}

export default DataTableWithButtons
