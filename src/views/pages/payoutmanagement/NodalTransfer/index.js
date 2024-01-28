import { Fragment } from "react"
// import NodalTransfer from "./nodaltransfer"
import AppCollapse from '@components/app-collapse'

const PGtransactions = () => {
//   return (
//     <Fragment>
//       {/* <Breadcrumbs
//         breadCrumbTitle="Merchant Details"
//         breadCrumbParent="PG"
//         breadCrumbActive="Merchant Details"
//       /> */}
//       <Row className="match-height">
//         <Col lg="12" md="12">
//           <NodalTransfer />
//         </Col>
//       </Row>
//     </Fragment>
//   )

const accordingdata = [
    {
      title: 'Add Beneficiary',
      content: (
       <div>
         <h1>No data</h1>
       </div>
      )
    },
    {
      title: 'VAN Creation',
      content: (
     <div>
       <h1>No data</h1>
     </div>
      )
    },
    {
        title: 'List Beneficiaries',
        content: (
         <div>
           <h1>No data</h1>
         </div>
        )
      },
      {
        title: 'Update Beneficiaries',
        content: (
       <div>
         <h1>No data</h1>
       </div>
        )
      },
      {
        title: 'Remove Beneficiaries',
        content: (
         <div>
           <h1>No data</h1>
         </div>
        )
      },
      {
        title: 'Transfers - All Modes',
        content: (
       <div>
         <h1>No data</h1>
       </div>
        )
      }
  ]
  return (
    <Fragment>
       <AppCollapse data={accordingdata} type='margin' accordion />
    </Fragment>
  )
}

export default PGtransactions