

import Avatar from '@components/avatar'

// ** Third Party Components
import axios from 'axios'
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
    name: 'PG Name',
    selector: 'pgName',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Utr Id',
    selector: 'utrId',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'PG Order Id',
    selector: 'pgOrderId',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Merchant OrderID',
    selector: 'merchantOrderId',
    sortable: true,
    minWidth: '200px'
  },
  {
    name: 'Phone number',
    selector: 'phonenumber',
    sortable: true
  },
  {
    name: 'Amount',
    selector: 'amount',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Benificiary VPA',
    selector: 'beneficiaryVPA',
    sortable: true,
    minWidth: '200px'
  },
  {
    name: 'TXN Type',
    selector: 'transactionType',
    sortable: true
  },
  {
    name: 'Reference ID',
    selector: 'referenceId',
    sortable: true
  },
  // {
  //   name: 'UTR Id',
  //   selector: 'utrId',
  //   sortable: true,
  //   minWidth: '100px'
  // },
  // {
  //   name: 'Status',
  //   selector: 'status',
  //   sortable: true,
  //   minWidth: '100px'
  // },
  {
    name: 'Purpose',
    selector: 'purpose',
    minWidth: '200px'
  },
  {
    name: 'TXN Message',
    selector: 'transactionMessage',
    sortable: true
  },
  {
    name: 'Error Message',
    selector: 'errorMessage',
    sortable: true
  },
  {
    name: 'TXN Status',
    selector: 'transactionStatus',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'TXN Time',
    selector: 'trDateTime',
    sortable: true,
    minWidth: '250px'
  }
]
export default ExpandableTable
