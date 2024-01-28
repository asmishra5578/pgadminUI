// ** Custom Components
import Avatar from '@components/avatar'
import { Fragment } from 'react'

// ** Third Party Components
import axios from 'axios'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, CustomInput } from 'reactstrap'
import JSONTree from 'react-json-tree'

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
  console.log('data', data.merchantpgdetails)
  return <JSONTree data={data.merchantpgdetails} />

  // return data.merchantpgdetails.map((v) => {

  //   return (
  //     v.merchantservicedetails.map((val) => {
  //       return <p style={{marginLeft:20, padding:2}}>
  //         <span className='font-weight-bold'>PG Name:</span> {v.pgname}, &nbsp;
  //         <span className='font-weight-bold'>PG Status:</span> {v.pgstatus}, &nbsp;
  //         <span className='font-weight-bold'>Service Type:</span> {val.serviceType === null ? "No Data" : val.serviceType}, &nbsp;
  //         <span className='font-weight-bold'>Service Status:</span>{val.serviceStatus === null ? "No Data" : val.serviceStatus}
  //       </p>

  //     })
  //   )
  // })
  // <span className='font-weight-bold'>Service Type:</span> {val.serviceType}, &nbsp;
  // <span className='font-weight-bold'>serviceStatus:</span> {val.serviceStatus}, &nbsp;
}

// ** Table Common Column
const Label = () => (
  <Fragment>
    <span className='switch-icon-left'>
      Block
    </span>
    <span className='switch-icon-right'>
      Active
    </span>
  </Fragment>
)
const handledata = (e) => {
  console.log('id', e.target.id)
}
export const columns = [
  {
    name: 'Merchant ID',
    selector: 'merchantId',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'Merchant Email',
    selector: 'merchantEMail',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Phone Number',
    selector: 'phoneNumber',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'KYC Status',
    selector: 'kycStatus',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'ACTION',
    sortable: true,
    cell: row => {
     return   <div className='demo-inline-spacing'>
     <CustomInput
       type='switch'
       id={row.merchantId}
       name='customSwitch'
       label={<Label/>}
       inline
       onClick={handledata}
     />
   </div>
      }
  }
]
export default ExpandableTable
