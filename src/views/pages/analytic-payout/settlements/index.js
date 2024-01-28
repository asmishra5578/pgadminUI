import { Fragment } from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import Settlementdata from "./settlementlist"
const settlements = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Settlement Payment"
        breadCrumbParent="Dashboard"
        breadCrumbActive="Settlement Payment"
      />
      <Row className="match-height">
        <Col lg="12" md="12">
          <Settlementdata />
        </Col>
      </Row>
    </Fragment>
  )
}

export default settlements
