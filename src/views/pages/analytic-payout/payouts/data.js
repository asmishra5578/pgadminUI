
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
    name: 'Order ID',
    selector: 'orderId',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Date',
    selector: 'txnDate',
    sortable: true,
    minWidth: '150px'
  },

  {
    name: 'Txn Id',
    selector: 'txnId',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Amount',
    selector: 'txnAmount',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'CreditOrDebit',
    selector: 'creditOrDebit',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'MerchantTxnType',
    selector: 'merchantTxnType',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'Beneficiary',
    selector: 'beneficiary',
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
    name: 'TxnStatus',
    selector: 'txnStatus',
    sortable: true,
    minWidth: '100px',
    cell: row => {
        return (
          <Badge  color='primary' id={row.orderId} onClick={(e) => console.log('orderid', e.target.id)}>
            {row.txnStatus}
          </Badge>
        )
      }
  }

]
export default ExpandableTable
