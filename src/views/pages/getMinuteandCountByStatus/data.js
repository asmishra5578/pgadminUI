// export const columns = [
//     {
//       name: 'MerchantId',
//       selector: 'merchantId',
//       sortable: true,
//       minWidth: '100px'
//     },
//     {
//       name: 'PG Id',
//       selector: 'pgId',
//       sortable: true,
//       minWidth: '250px'
//     },
//     {
//       name: 'Payment Option',
//       selector: 'paymentOption',
//       sortable: true,
//       minWidth: '150px'
//     },
//     {
//       name: 'Amount',
//       selector: 'amount',
//       sortable: true
//     },
//     {
//       name: 'Order ID',
//       selector: 'orderID',
//       sortable: true
//     },
//     {
//         name: 'PG Type',
//         selector: 'pgType',
//         sortable: true
//       },
//       {
//         name: 'Status',
//         selector: 'status',
//         sortable: true
//       },
//       {
//         name: 'Merchant OrderID',
//         selector: 'merchantOrderId',
//         sortable: true
//       },
//       {
//           name: 'Cust Order ID',
//           selector: 'custOrderId',
//           sortable: true
//         },
//         {
//           name: 'VPA UPI',
//           selector: 'vpaUPI',
//           sortable: true
//         },
//         {
//           name: 'Created At',
//           selector: 'createdAt',
//           sortable: true
//         }
//   ]
// ** Custom Components
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
    name: 'Minutes',
    selector: 'minutes',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'Total Number of Transaction',
    selector: 'count',
    sortable: true,
    minWidth: '250px'
  }


  // {
  //   name: 'Cust Order ID',
  //   selector: 'custOrderId',
  //   sortable: true
  // }
  // {
  //   name: 'VPA UPI',
  //   selector: 'vpaUPI',
  //   sortable: true,
  //   minWidth: '150px'
  // }
]
export default ExpandableTable
