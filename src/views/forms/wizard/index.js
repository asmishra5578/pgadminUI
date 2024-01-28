import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import WizardModern from './WizardModern'
import WizardVertical from './WizardVertical'
import WizardHorizontal from './WizardHorizontal'
import WizardModernVertical from './WizardModernVertical'
import BreadCrumbs from '@components/breadcrumbs'

const Wizard = () => {
  return (
    <Fragment>
      {/* <BreadCrumbs breadCrumbTitle='Create Merchant' breadCrumbParent='Form' breadCrumbActive='Create Merchant' /> */}
      <Row>
        <Col sm='12'>
          <WizardHorizontal />
        </Col>
      </Row>
    </Fragment>
  )
}
export default Wizard
