import { Fragment } from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import PGSettlementdata from "./settlement"
const PGtransactions = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Settlement"
        breadCrumbParent="PG"
        breadCrumbActive="Settlement/Unsettlement"
      />
      <Row className="match-height">
        <Col lg="12" md="12">
          <PGSettlementdata />
        </Col>
      </Row>
    </Fragment>
  )
}

export default PGtransactions
