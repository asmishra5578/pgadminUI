import classnames from 'classnames'
import Avatar from '@components/avatar'
import { TrendingUp, CreditCard, Box, DollarSign, ShoppingCart, Award, Monitor } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media } from 'reactstrap'

const StatsCard = ({ cols, upitran, wallettran, cardtran, nbtran}) => {
  // console.log('StatsCard', upitran)
  const data = [
    {
      title: wallettran,
      subtitle: 'Wallet',
      color: 'light-primary',
      icon: <ShoppingCart size={24} />
    },
    {
      title: cardtran,
      subtitle: 'Card',
      color: 'light-info',
      icon: <CreditCard size={24} />
    },
    {
      title: upitran,
      subtitle: 'UPI',
      color: 'light-danger',
      icon: <Award size={24} />
    },
    {
      title: nbtran,
      subtitle: 'NB',
      color: 'light-success',
      icon: <Monitor size={24} />
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const margin = Object.keys(cols)
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin[0]}-0`]: index !== data.length - 1
          })}
        >
          <Media>
            <Avatar color={item.color} icon={item.icon} className='mr-2' />
            <Media className='my-auto' body>
              <h4 className='font-weight-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </Media>
          </Media>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Amount of Transactions</CardTitle>
        {/* <CardText className='card-text font-small-2 mr-25 mb-0'>Updated 1 month ago</CardText> */}
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
