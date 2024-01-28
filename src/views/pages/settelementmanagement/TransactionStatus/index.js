import { Fragment } from "react"
import { Row, Col } from "reactstrap"
import TransactionStatus from "./transactionstatus"
const PGtransactions = () => {
  return (
    <Fragment>
      {/* <Breadcrumbs
        breadCrumbTitle="Merchant Details"
        breadCrumbParent="PG"
        breadCrumbActive="Merchant Details"
      /> */}
      <Row className="match-height">
        <Col lg="12" md="12">
          <TransactionStatus />
        </Col>
      </Row>
    </Fragment>
  )
}

export default PGtransactions