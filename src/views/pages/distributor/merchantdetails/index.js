import { Fragment } from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import PGTransactionsdata from "./transactions"
const PGtransactions = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Merchant Details"
        breadCrumbParent="Distributor"
        breadCrumbActive="By Distrubitor ID"
      />
      <Row className="match-height">
        <Col lg="12" md="12">
          <PGTransactionsdata />
        </Col>
      </Row>
    </Fragment>
  )
}

export default PGtransactions
