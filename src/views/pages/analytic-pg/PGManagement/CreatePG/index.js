import { Fragment } from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import PGcreationdata from "./Createpg"
const PGtransactions = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Configure PG"
        breadCrumbParent="PG"
        breadCrumbActive="Create PG"
      />
      <Row className="match-height">
        <Col lg="12" md="12">
          <PGcreationdata />
        </Col>
      </Row>
    </Fragment>
  )
}

export default PGtransactions
