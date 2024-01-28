import { Fragment, useState } from "react"
import { Row, Col, TabContent, TabPane, Card, CardBody } from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import Tabs from './Tab'
import Setpayoutcommision from './setpayoutcommission'
import Ipwhitelisting from './ipwhitelisting'
import Setpayoutlimit from './setpayoutlimit'
import Addmerchantwalletid from './addmerchantwalletid'
import Createmerchantvanaccount from './createmerchantvanaccount'
import AppCollapse from '@components/app-collapse'

// import MerchantList from "./merchantlist"
const MercahntPayout = () => {
  const [activeTab, setActiveTab] = useState('1'),
    [data, setData] = useState(null)

  const toggleTab = tab => {
    setActiveTab(tab)
  }
  const accordingdata = [
    {
      title: 'Set Payout Commission',
      content: (
       <div>
      <Setpayoutcommision/>
       </div>
      )
    },
    {
      title: 'IP Whitelisting',
      content: (
     <div>
       <Ipwhitelisting/>
     </div>
      )
    },
    {
      title: 'Set Payout Limit',
      content: (
     <div>
      <Setpayoutlimit/>
     </div>
      )
    },
    {
      title: 'Create Merchant Disbursal Account (Add merchant wallet ID)',
      content: (
     <div>
      <Addmerchantwalletid/>
     </div>
      )
    },
    {
      title: 'Create Merchant VAN Account',
      content: (
     <div>
        <Createmerchantvanaccount/>
     </div>
      )
    }
  ]
  return (
    <Fragment>
    {/* <Breadcrumbs breadCrumbTitle='Update Merchant' breadCrumbParent='Pages' breadCrumbActive='Update Merchant' /> */}
        {/* <Col className='mb-2 mb-md-0' md='3'> */}
          {/* <Tabs activeTab={activeTab} toggleTab={toggleTab} /> */}
        {/* </Col> */}
      {/* <Row>
        <Col md='12'>
          <Card>
            <CardBody>
              <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                  <Setpayoutcommision  />
                </TabPane>
                <TabPane tabId='2'>
                  <Ipwhitelisting />
                </TabPane>
                <TabPane tabId='3'>
                  <Setpayoutlimit  />
                </TabPane>
                <TabPane tabId='4'>
                  <Addmerchantwalletid  />
                </TabPane>
                <TabPane tabId='5'>
                  <Createmerchantvanaccount  />
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

export default MercahntPayout
