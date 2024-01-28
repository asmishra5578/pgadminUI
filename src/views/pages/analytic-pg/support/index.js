import { Fragment } from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import PGTransactionsdata from "./support"
const PGtransactions = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Support"
        breadCrumbParent="PG"
        breadCrumbActive="Support"
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
