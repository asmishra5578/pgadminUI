import { Fragment } from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import Complaintlist from "./complaintlist"
const PGtransactions = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Complain"
        breadCrumbParent="PG"
        breadCrumbActive="Complain Ticket"
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
