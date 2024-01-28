import { Fragment } from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import UpdatePGData from "./UpdatePG"
const PGtransactions = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Update PG"
        breadCrumbParent="PG"
        breadCrumbActive="Update PG"
      />
      <Row className="match-height">
        <Col lg="12" md="12">
          <UpdatePGData />
        </Col>
      </Row>
    </Fragment>
  )
}

export default PGtransactions
