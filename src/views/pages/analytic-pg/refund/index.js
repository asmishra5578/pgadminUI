import { Fragment } from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import Refundlist from "./refundlist"
const PGtransactions = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Refund"
        // breadCrumbParent="PG"
        breadCrumbActive="Refund Details"
      />
      <Row className="match-height">
        <Col lg="12" md="12">
          <Refundlist />
        </Col>
      </Row>
    </Fragment>
  )
}

export default PGtransactions
