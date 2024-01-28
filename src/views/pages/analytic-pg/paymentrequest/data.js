// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import axios from 'axios'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, Row, Col, DropdownItem, Card, CustomInput } from 'reactstrap'
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
  console.log('data', data)
  // return <JSONTree data={data.merchantpgdetails} />
   return <Row> {data.merchantpgdetails.map((v) => {
      return <Col lg="6">
      <Card style={{paddingLeft:10, marginTop:5, marginBottom:0, background:"#efeeef", margin:10}}>
         <p style={{fontWeight:"bold"}}> <span>PG:{v.pgname} &nbsp;{v.pgstatus}</span></p>
         {/* <h6>Services</h6> */}
         <Row>
          {v.merchantservicedetails.map((val) => {
          return  <Col lg="3">
             <p> <span> {val.serviceStatus === null ? "No Data"  : val.serviceStatus === "ACTIVE" ? <span><CustomInput type='checkbox' label={val.serviceType } defaultChecked /></span> : <span></span>}</span></p>
            </Col>
          })}
          </Row>
        </Card>
        </Col>
    }) }
    </Row>
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
export const columns = [
  {
    name: 'Merchant ID',
    selector: 'merchantId',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'Merchant AppId',
    selector: 'merchantAppId',
    sortable: true,
    minWidth: '300px'
  },
  {
    name: 'Merchant SecretKey',
    selector: 'merchantSecretKey',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Merchant Name',
    selector: 'merchantName',
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
    name: 'Merchant Status',
    selector: 'merchantStatus',
    sortable: true,
    minWidth: '150px'
    // cell: (row) => <span>{ <Badge color={row.merchantStatus === "ACTIVE" ? "success" : row.merchantStatus === "PENDING" ? "warning" : "primary"}>{row.merchantStatus}</Badge>}</span>
  }
]
export default ExpandableTable
