import { Fragment } from "react"
import { Row, Col } from "reactstrap"
import Transactionlist from "./transaction"
const CreateAdmin = () => {
  return (
    <Fragment>
      {/* <Breadcrumbs
        breadCrumbTitle="Merchant Details"
        breadCrumbParent="PG"
        breadCrumbActive="Merchant Details"
      /> */}
      <Row className="match-height">
        <Col lg="12" md="12">
          <Transactionlist />
        </Col>
      </Row>
    </Fragment>
  )
}

export default CreateAdmin