import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
//import { List } from 'react-feather'
import { kFormatter } from '@utils'
import Avatar from '@components/avatar'
//import Timeline from '@components/timeline'
import AvatarGroup from '@components/avatar-group'
import jsonImg from '@src/assets/images/icons/json.png'
//import InvoiceList from '@src/views/apps/invoice/list'
import ceo from '@src/assets/images/portrait/small/avatar-s-9.jpg'
import { ThemeColors } from '@src/utility/context/ThemeColors'
//import Report from '@src/views/ui-elements/cards/analytics/Report'
import AvgSessions from '@src/views/ui-elements/cards/analytics/AvgSessions'
//import CardAppDesign from '@src/views/ui-elements/cards/advance/CardAppDesign'
import SupportTracker from '@src/views/ui-elements/cards/analytics/SupportTracker'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media, ButtonGroup, Button, CardText } from 'reactstrap'
import OrdersReceived from '@src/views/ui-elements/cards/statistics/OrdersReceived'
//import CardCongratulations from '@src/views/ui-elements/cards/advance/CardCongratulations'
import SubscribersGained from '@src/views/ui-elements/cards/statistics/SubscribersGained'
import UILoader from '@components/ui-loader'
import medal from '@src/assets/images/illustration/badge.svg'

import reporticon from '@src/assets/images/illustration/pricing-Illustration.svg'
import Chart from 'react-apexcharts'
import Paymenttypecomparision from './paymenttypecomparision'
import Hitvscapture from './hitvscapture'
import Monthlytransaction from './monthlytransaction'
import Hourlytransaction from './hourlytransaction'
import SettlementGraph from './settlementgraph'
import '@styles/react/libs/charts/apex-charts.scss'
// import requestsApi from './request'
// const requestsApidata = new requestsApi()
import AppCollapse from '@components/app-collapse'
import Label from 'reactstrap/lib/Label'
const AnalyticsDashboard = () => {
  const [data, setdata] = useState([])
  const history = useHistory()
  const [block, setBlock] = useState(true)
  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: { show: false },
    comparedResult: [2, -3, 8],
    labels: ['App', 'Service', 'Product'],
    stroke: { width: 0 },
    colors: ['#28c76f66', '#28c76f33'],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20
      }
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `${parseInt(val)} %`
              }
            },
            total: {
              show: true,
              offsetY: 15,
              label: 'App',
              formatter(w) {
                return '53%'
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120
          }
        }
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120
          }
        }
      }
    ]
  }
  const revenueOptions = {
    chart: {
      stacked: true,
      type: 'bar',
      toolbar: { show: false }
    },
    grid: {
      padding: {
        top: -20,
        bottom: -10
      },
      yaxis: {
        lines: { show: false }
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: {
          colors: '#b9b9c3',
          fontSize: '0.86rem'
        }
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#7367f0', '#ffc107'],
    plotOptions: {
      bar: {
        columnWidth: '17%',
        endingShape: 'rounded'
      },
      distributed: true
    },
    yaxis: {
      labels: {
        style: {
          colors: '#b9b9c3',
          fontSize: '0.86rem'
        }
      }
    }
  },
  revenueSeries = [
    {
      name: 'Earning',
      data: [95, 177, 284, 256, 105, 63, 168, 218, 72]
    },
    {
      name: 'Expense',
      data: [-145, -80, -60, -180, -100, -60, -85, -75, -100]
    }
  ]
  useEffect(() => {
    // console.log("getdashboardbalance", requestsApidata.getdashboardbalance())
    // requestsApidata.getdashboardbalance().then(res => {
    //   setdata(res.data)
    setBlock(false)
    // })
  }, [])
  const rounddata = (num) => {
    const m = Number((Math.abs(num) * 100).toPrecision(15))
    return (Math.round(m) / 100) * Math.sign(num)
  }
  const more = (link) => {
    history.push(link)
  }
  const appcollasadata = [
    {
      title: 'Monthly Transactions',
      content: (
        <div>
           <div>
             <Monthlytransaction/>
             <br/>
            <Button color="primary">Submit</Button>
           </div>
           <div style={{marginTop:10}}>
           <Chart options={options} series={[53, 16, 31]} type='donut' height={150} />
           </div>
        </div>
      )
    },
    {
      title: 'Hourly Transactions',
      content: (
        <div>
        <div>
          <Hourlytransaction/>
          <br/>
          <Button color="primary">Submit</Button>
        </div>
        <div style={{marginTop:10}}>
        <Chart options={options} series={[53, 16, 31]} type='donut' height={150} />
        </div>
     </div>
      )
    },
    {
      title: 'Payment Type Comparison',
      content: (
       <div>
          <div>
           <Paymenttypecomparision/>
           <br/>
          <Button color="primary">Submit</Button>
          </div>
        <div style={{marginTop:20}}>
        <Chart id='revenue-report-chart' type='bar' height='230' options={revenueOptions} series={revenueSeries} />
        </div>
       </div>
      )
    },
    {
      title: 'Hits vs Capture',
      content: (
        <div>
       <div>
         <Hitvscapture/>
         <br/>
          <Button color="primary">Submit</Button>
       </div>
       <div style={{marginTop:10}}>
       <Chart id='revenue-report-chart' type='bar' height='230' options={revenueOptions} series={revenueSeries} />
       </div>

     </div>
      )
    },
    {
      title: 'Settlement Graph',
      content: (
        <div>
          <SettlementGraph/>
          <br/>
          <Button color="primary">Submit</Button>
        </div>
      )
    }
  ]
  return (
    <div id='dashboard-analytics'>
      <Row>
        <Col lg={{span:'2', offset:'3'}}>
          <div style={{padding:10}}>
            <ButtonGroup>
              <Button color="primary">
                DAY
              </Button>
              <Button color="primary" style={{marginLeft:5}}>
                WEEK
              </Button>
              <Button color="success" style={{marginLeft:5}}>
                MONTH
              </Button>
              <Button color="primary" style={{marginLeft:5}}>
                YEAR
              </Button>
              <Button color="primary" style={{marginLeft:5}}>
                CUSTOM
              </Button>
            </ButtonGroup>
          </div>
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="4" md="12">
          <Card className='card-congratulations-medal'>
            <CardBody>
              <h5>Total Transaction!</h5>
              {/* <CardText className='font-small-3'>Click on Button see Details</CardText> */}

              <h3 className='mb-75 mt-2 pt-50'>
                <a href='/' onClick={e => e.preventDefault()}>
                  $48.9k
                </a>
              </h3>
              {/* <Button.Ripple color='primary'>View Report</Button.Ripple> */}
              <img className='congratulation-medal' src={medal} alt='Medal Pic' />
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" md="6" sm="12">
          <Card className='card-congratulations-medal'>
            <CardBody>
              <h5>Refunded Amount!</h5>
              {/* <CardText className='font-small-3'>Click on Button see Details</CardText> */}

              <h3 className='mb-75 mt-2 pt-50'>
                <a href='/' onClick={e => e.preventDefault()}>
                  $48.9k
                </a>
              </h3>
              {/* <Button.Ripple color='primary'>View Report</Button.Ripple> */}
              <img className='congratulation-medal' src={medal} alt='Medal Pic' />
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" md="6" sm="12">
          <Card className='card-congratulations-medal'>
            <CardBody>
              <h5>Cancelled Transcation!</h5>
              {/* <CardText className='font-small-3'>Click on Button see Details</CardText> */}

              <h3 className='mb-75 mt-2 pt-50'>
                <a href='/' onClick={e => e.preventDefault()}>
                  $48.9k
                </a>
              </h3>
              {/* <Button.Ripple color='primary'>View Report</Button.Ripple> */}
              <img className='congratulation-medal' src={medal} alt='Medal Pic' />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="4" md="6" sm="12">
          <Card className='card-congratulations-medal'>
            <CardBody>
              <h5>Total Card Payment!</h5>
              {/* <CardText className='font-small-3'>Click on Button see Details</CardText> */}

              <h3 className='mb-75 mt-2 pt-50'>
                <a href='/' onClick={e => e.preventDefault()}>
                  $48.9k
                </a>
              </h3>
              {/* <Button.Ripple color='primary'>View Report</Button.Ripple> */}
              <img className='congratulation-medal' src={medal} alt='Medal Pic' />
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" md="6" sm="12">
          <Card className='card-congratulations-medal'>
            <CardBody>
              <h5>Total Settled!</h5>
              {/* <CardText className='font-small-3'>Click on Button see Details</CardText> */}

              <h3 className='mb-75 mt-2 pt-50'>
                <a href='/' onClick={e => e.preventDefault()}>
                  $48.9k
                </a>
              </h3>
              {/* <Button.Ripple color='primary'>View Report</Button.Ripple> */}
              <img className='congratulation-medal' src={medal} alt='Medal Pic' />
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" md="6" sm="12">
          <Card className='card-congratulations-medal'>
            <CardBody>
              <h5>Total UnSettled!</h5>
              {/* <CardText className='font-small-3'>Click on Button see Details</CardText> */}

              <h3 className='mb-75 mt-2 pt-50'>
                <a href='/' onClick={e => e.preventDefault()}>
                  $48.9k
                </a>
              </h3>
              {/* <Button.Ripple color='primary'>View Report</Button.Ripple> */}
              <img className='congratulation-medal' src={medal} alt='Medal Pic' />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <div>
        <Card style={{ padding: 40 }}>
        <AppCollapse data={appcollasadata} type='margin' accordion />
        </Card>
      </div>
    </div>
  )
}

export default AnalyticsDashboard
