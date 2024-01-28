import { Fragment } from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import PGTransactionsdata from "./merchantlist"
const PGtransactions = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Merchant"
        breadCrumbParent="Payout"
        breadCrumbActive="Update Merchant"
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
