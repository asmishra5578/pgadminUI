
import Avatar from '@components/avatar'

// ** Third Party Components
import axios from 'axios'
import moment from 'moment'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const status = {
  1: { title: 'Current', color: 'light-primary' },
  2: { title: 'Professional', color: 'light-success' },
  3: { title: 'Rejected', color: 'light-danger' },
  4: { title: 'Resigned', color: 'light-warning' },
  5: { title: 'Applied', color: 'light-info' }
}

// export let data

// // ** Get initial Data
// axios.get('/api/datatables/initial-data').then(response => {
//   data = response.data
//   console.log("data--->", data)
// })
// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>City:</span> {data.city}
      </p>
      <p>
        <span className='font-weight-bold'>Experience:</span> {data.experience}
      </p>
      <p className='m-0'>
        <span className='font-weight-bold'>Post:</span> {data.post}
      </p>
    </div>
  )
}
// ** Table Common Column

export const columns = [
  {
      name: 'MerchantId',
      selector: 'merchantId',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Amount',
      selector: 'amount',
      sortable: true
      // minWidth: '250px'
    },
    {
      name: 'Opening Balance',
      selector: 'openingBalance',
      sortable: true
    },
      {
        name: 'Closing Balance',
        selector: 'closingBalance',
        sortable: true
      },
  {
    name: 'Transaction ID',
    selector: 'transactionId',
    sortable: true,
    minWidth: '200px'
  },
  // {
  //   name: 'Main WalletId',
  //   selector: 'mainWalletId',
  //   sortable: true
  // },
  {
    name: 'Credit/Debit',
    selector: 'credit_debit',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'Purpose',
    selector: 'purpose',
    minWidth: '150px'
  },
  {
    name: 'Remarks',
    selector: 'remarks',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Status Remarks',
    selector: 'statusRemarks',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'TXN Status',
    selector: 'transactionStatus',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Created',
    selector: 'created',
    sortable: true,
    minWidth: '250px',
    cell: row => <span>{moment(row.created).format('DD-MM-YYYY')}</span>

  }
] 
export default ExpandableTable
