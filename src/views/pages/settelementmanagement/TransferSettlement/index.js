import { Fragment } from "react"
import { Row, Col } from "reactstrap"
import TransferSettlement from "./transfersettlement"
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
          <TransferSettlement />
        </Col>
      </Row>
    </Fragment>
  )
}

export default PGtransactions