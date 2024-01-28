
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const unsettleddata = ({ data }) => {
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
    selector: 'merchant_id',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'MerchantOrder ID',
    selector: 'merchant_order_id',
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
    name: 'Date',
    selector: 'created',
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

  }
]
export default unsettleddata
