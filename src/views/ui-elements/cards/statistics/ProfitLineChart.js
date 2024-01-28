import { useEffect, useState } from 'react'
import axios from 'axios'
import Avatar from '@components/avatar'
import TinyChartStats from '@components/widgets/stats/TinyChartStats'
import { Users } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media } from 'reactstrap'
import classnames from 'classnames'

const ProfitLineChart = ({ cols, totalnumberofmerchant, activemerchant, blockmerchant, pendingmerchant}) => {


  const data = [
    {
      title: totalnumberofmerchant,
      subtitle: 'Total',
      color: 'light-info',
      icon: <Users size={24} />
    },
    {
      title: activemerchant,
      subtitle: 'Active',
      color: 'light-success',
      icon: <Users size={24} />
    }, 
    {
      title: blockmerchant,
      subtitle: 'Block',
      color: 'light-danger',
      icon: <Users size={24} />
    },
    {
      title: pendingmerchant,
      subtitle: 'Pending',
      color: 'light-warning',
      icon: <Users size={24} />
    }
    // {
    //   title: nbtran,
    //   subtitle: 'NB',
    //   color: 'light-success',
    //   icon: <Monitor size={24} />
    // }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const margin = Object.keys(cols)
      return (
        <Col lg="3">
        <div style={{marginLeft:10}}>
        <Row>
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin[0]}-0`]: index !== data.length - 1
          })}
        >
          <Media style={{textAlign:'center', marginTop:10}}>
            <Avatar color={item.color} icon={item.icon} className='mr-2' />
            <Media className='my-auto' body>
              <h4 className='font-weight-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </Media>
          </Media>
        </Col>
        </Row>
        </div>
        </Col>
      )
    })
  }

  return data !== null ? (
    // <TinyChartStats
    //   height={70}
    //   type='line'
    //   options={options}
    //   title='Total Merchant'
    //   stats={totalnumberofmerchant}
    //   series={data.series}
    // />
    <Card className='card-statistics' >
    <CardHeader>
      <CardTitle tag='h4'>Merchant Details</CardTitle>
      {/* <CardText className='card-text font-small-2 mr-25 mb-0'>Updated 1 month ago</CardText> */}
    </CardHeader>
    <CardBody className='statistics-body' style={{marginTop:-20}}>
      <Row>{renderData()}</Row>
    </CardBody>
  </Card>
  ) : null
}

export default ProfitLineChart
