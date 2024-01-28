import { Fragment } from "react"
// import NodalTransfer from "./nodaltransfer"
import AppCollapse from '@components/app-collapse'

const Walletmanagement = () => {
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
      title: 'Account & Passbook List of disbursal accounts with their respective balances',
      content: (
       <div>
         <h1>No data</h1>
       </div>
      )
    },
    {
      title: 'Complete Txn Report [Txn history of Business Wallet]',
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
        title: 'List of added beneficiaries in the wallet',
        content: (
         <div>
           <h1>No data</h1>
         </div>
        )
      },
      {
        title: ' Add Money from Main Funding  to any disbursal account',
        content: (
       <div>
         <h1>No data</h1>
       </div>
        )
      },
      {
        title: ' Do Wallet, Account and UPI transfer from any disbursal',
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

export default  Walletmanagement 
