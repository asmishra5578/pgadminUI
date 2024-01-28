import { Fragment } from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import PGTransactionsdata from "./transactions"
const PGtransactions = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Distributor"
        breadCrumbParent="Distributor"
        breadCrumbActive="Distribitor List"
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
