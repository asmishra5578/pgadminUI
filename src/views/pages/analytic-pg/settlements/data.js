
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

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
    minWidth: '100px'
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
    selector: 'merchant_order_id',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Date',
    selector: 'settlement_date',
    sortable: true,
    minWidth: '150px'
  },

  {
    name: 'Amount',
    selector: 'trxamount',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Settled Amount',
    selector: 'settle_amount_to_merchant',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'Transaction Type',
    selector: 'tr_type',
    sortable: true,
    minWidth: '100px'
  },
 
  {
    name: 'Status',
    selector: 'settlement_status',
    sortable: true,
    minWidth: '150px'
    // cell: row => {
    //   return (
    //     <Badge color={status[row.status].color} pill>
    //       {status[row.status].title}
    //     </Badge>
    //   )
    // }
  }
]
export default ExpandableTable
