import { Fragment, useState } from "react"
import { Row, Col, TabContent, TabPane, Card, CardBody } from "reactstrap"
import AppCollapse from '@components/app-collapse'
import Mercahntkyccompoent from './kycupdatecomponent'
// import MerchantList from "./merchantlist"
const UpdatemercahntKYC = () => {
  return (
    <Fragment>
      <div>
          <h6>Update Merchant KYC</h6>
          <Card style={{padding:10}}>
          <Mercahntkyccompoent/>

          </Card>
      </div>
  </Fragment>
  )
}

export default UpdatemercahntKYC
