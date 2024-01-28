import { Fragment } from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import Transactionlist from "./transactionlist"
const payouts = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Payout Payment"
        breadCrumbParent="Form"
        breadCrumbActive="Payout Payment"
      />
      <Row className="match-height">
        <Col lg="12" md="12">
          <Transactionlist />
        </Col>
      </Row>
    </Fragment>
  )
}

export default payouts
