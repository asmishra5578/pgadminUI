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
    name: 'Merchant ID',
    selector: 'merchantId',
    sortable: true,
    minWidth: '250px'
    // cell: row => (
    //   <div className='d-flex align-items-center'>
    //     {row.avatar === '' ? (
    //       <Avatar color={`light-${states[row.status]}`} content={row.full_name} initials />
    //     ) : (
    //       <Avatar img={require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`).default} />
    //     )}
    //     <div className='user-info text-truncate ml-1'>
    //       <span className='d-block font-weight-bold text-truncate'>{row.full_name}</span>
    //       <small>{row.post}</small>
    //     </div>
    //   </div>
    // )
  },
  {
    name: 'MerchantOrder ID',
    selector: 'merchantOrderId',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Date',
    selector: 'transactionTime',
    sortable: true,
    minWidth: '150px'
  },

  {
    name: 'Amount',
    selector: 'amount',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Order ID',
    selector: 'orderID',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    minWidth: '150px'
    // cell: row => {
    //   return (
    //     <Badge color={status[row.status].color} pill>
    //       {status[row.status].title}
    //     </Badge>
    //   )
    // }
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <FileText size={15} />
                <span className='align-middle ml-50'>Details</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Archive size={15} />
                <span className='align-middle ml-50'>Archive</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Trash size={15} />
                <span className='align-middle ml-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      )
    }
  }
]
export default ExpandableTable
