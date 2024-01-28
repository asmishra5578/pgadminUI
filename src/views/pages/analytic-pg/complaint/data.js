// ** Custom Components
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
        name: 'Order ID',
        selector: 'orderId',
        sortable: true,
        minWidth: '150px'
      },
      {
        name: 'Order Note',
        selector: 'orderNote',
        sortable: true,
        minWidth: '200px'
      },
      {
        name: 'Created at',
        selector: 'created',
        sortable: true
      },
  {
    name: 'CustName',
    selector: 'custname',
    sortable: true
  },
  {
    name: 'Link customer',
    selector: 'linkcustomer',
    sortable: true,
    minWidth: '500px',
    cell: row => {
        return (
          <a href={row.linkcustomer} target="_blank" style={{color:"blue"}}>{row.linkcustomer}</a>
        )
      }
  },
  {
    name: 'CustEmail',
    selector: 'custemail',
    sortable: true,
    minWidth: '200px'
  },
  {
    name: 'CustPhone',
    selector: 'custphone',
    sortable: true
  },

  {
    name: 'Amount',
    selector: 'amount',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'LinkexpiryTime',
    selector: 'linkexpirytime',
    minWidth: '200px'
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true
  },
  {
    name: 'TransactionStatus',
    selector: 'transactionStatus',
    sortable: true,
    minWidth: '150px'
  }
  // {
  //   name: 'Action',
  //   cell: row => {
  //     return (
  //       <Badge color='primary' id={row.orderId} onClick={resendemail}>ReSend Mail</Badge>
  //     )
  //   }
  // }
]
export default ExpandableTable
