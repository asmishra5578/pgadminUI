import { Fragment, useState } from "react"
import { Row, Col, TabContent, TabPane, Card, CardBody } from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import Tabs from './Tab'
import Enabledisablemerchant from './enabledisablemerchant'
import Enabledisablservices from './servicesenabledisable'
import Updateservicewiselimit from './updateservicewiselimit'
import EnabledisablePG from './enabledisablePG'
import Updatebankdetails from './updatebankdetails'
import Updatekycdetails from './updatkycdetails'
import Updatecommissionservicewise from './updatecommissionservicewise'
import Enabledisablpayoutservice from './payoutserviceenabledisable'
import AppCollapse from '@components/app-collapse'

// import MerchantList from "./merchantlist"
const PGtransactions = () => {
  const [activeTab, setActiveTab] = useState('1'),
    [data, setData] = useState(null)

  const toggleTab = tab => {
    setActiveTab(tab)
  }
  const accordingdata = [
    {
      title: 'Enable-Disabled/Password Change/Enable Payout',
      content: (
       <div>
      <Enabledisablemerchant/>
       </div>
      )
    },
    {
      title: 'Enabled/Disabled PG and Services',
      content: (
     <div>
       <Enabledisablservices/>
     </div>
      )
    },
    // {
    //   title: 'Update Servicewise Limit',
    //   content: (
    //  <div>
    //   <Updateservicewiselimit/>
    //  </div>
    //   )
    // },
    {
      title: 'Update Bank Details',
      content: (
     <div>
      <Updatebankdetails/>
     </div>
      )
    }
    // {
    //   title: 'Update KYC Details',
    //   content: (
    //  <div>
    //     <Updatekycdetails/>
    //  </div>
    //   )
    // },
    // {
    //   title: 'Update commission Servicewise',
    //   content: (
    //  <div>
    //   <Updatecommissionservicewise/>
    //  </div>
    //   )
    // },
    // {
    //   title: 'Enable/Disabled Payout Services',
    //   content: (
    //  <div>
    //    <Enabledisablpayoutservice/>
    //  </div>
    //   )
    // }
  ]
  return (
    <Fragment>
    {/* <Breadcrumbs breadCrumbTitle='Update Merchant' breadCrumbParent='Pages' breadCrumbActive='Update Merchant' /> */}
          {/* <Tabs activeTab={activeTab} toggleTab={toggleTab} /> */}
        {/* <Row>
        <Col md='12'>
          <Card>
            <CardBody>
              <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                  <Enabledisablemerchant  />
                </TabPane>
                <TabPane tabId='2'>
                  <Enabledisablservices />
                </TabPane>
                <TabPane tabId='3'>
                  <Updateservicewiselimit  />
                </TabPane>
                <TabPane tabId='5'>
                  <Updatebankdetails  />
                </TabPane>
                <TabPane tabId='6'>
                  <Updatekycdetails  />
                </TabPane>
                <TabPane tabId='7'>
                  <Updatecommissionservicewise  />
                </TabPane>
                <TabPane tabId='8'>
                  <Enabledisablpayoutservice  />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row> */}
       <AppCollapse data={accordingdata} type='margin' accordion />
  </Fragment>
  )
}

export default PGtransactions
