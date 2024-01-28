// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import axios from 'axios'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Card, CustomInput } from 'reactstrap'

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
  console.log('data----->', data)
  // return <JSONTree data={data.merchantpgdetails} />
 
  //   return <Row>
  //   <Col lg="6">
  //   <Card style={{paddingLeft:10, marginTop:5, marginBottom:0, background:"#efeeef", margin:10}}>
  //        <p style={{fontWeight:"bold"}}> <span>Created By:{data.createdBy} </span></p>
  //        <Row>
  //        <Col lg="3">
  //            <p> <span><CustomInput type='checkbox' label="CARD" defaultChecked /> </span></p>
  //            </Col>
  //            <Col lg="3">
  //            <p> <span><CustomInput type='checkbox' label="NB" defaultChecked /> </span></p>
  //            </Col>
  //            <Col lg="3">
  //            <p> <span><CustomInput type='checkbox' label="Mastro" defaultChecked /> </span></p>
  //            </Col>
  //         </Row>
  //       </Card>
  //   </Col>
  // </Row>

   return <Row> {data.pg_services.map((v) => {
      return <Col lg="6">
      <div style={{  padding:5}}>
         {/* <p style={{fontWeight:"bold"}}> <span>PG Services</span></p> */}
         {/* <h6>Services</h6> */}
         <Row>
      <Col lg="3">
       <p> <span><CustomInput type='checkbox' label={v} defaultChecked /> </span></p>            </Col>
          </Row>
        </div>
        </Col>
    }) }
    </Row>
}

// ** Table Common Column
export const columns = [
  {
    name: 'PG Name',
    selector: 'pg_name',
    sortable: true,
    minWidth: '70px'
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
    name: 'PG App ID',
    selector: 'pg_app_id',
    sortable: true,
    minWidth: '250px'
  },
  // {
  //   name: 'Created By',
  //   selector: 'createdBy',
  //   sortable: true,
  //   minWidth: '220px'
  // },

  {
    name: 'Created At',
    selector: 'created',
    sortable: true,
    minWidth: '150px'
  },
  // {
  //   name: 'PG Secret',
  //   selector: 'pgSecret',
  //   sortable: true,
  //   minWidth: '650px'
  // },
  {
    name: 'Status',
    selector: 'pg_status',
    sortable: true
    // minWidth: '150px'
    // cell: row => {
    //   return (
    //     <Badge color={status[row.status].color} pill>
    //       {status[row.status].title}
    //     </Badge>
    //   )
    // }
  },
  {
    name: 'ACTION',
    sortable: true,
    cell: row => {
      return   <div className='demo-inline-spacing'>
     {row.pg_status === "ACTIVE" ? <div><Badge onClick={props.pgblockhandler} color='danger' id={row.pg_app_id}>Block PG</Badge></div> : <div><Badge onClick={pgactivehandler} id={pg_app_id} color="success">Active PG</Badge></div>}
    </div>
       }
  }
]
export default ExpandableTable
