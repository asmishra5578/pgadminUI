import { Fragment } from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import Complaintlist from "./complaintlist"
const PGtransactions = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Bank List"
        breadCrumbParent="Payin"
        breadCrumbActive="Bank List"
      />
      <Row className="match-height">
        <Col lg="12" md="12">
          <Complaintlist />
        </Col>
      </Row>
    </Fragment>
  )
}

export default PGtransactions
