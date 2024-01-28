import Avatar from '@components/avatar'
import * as Icon from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'

const CardTransactions = (data) => {
    // console.log('ooooookokkkkkk', data.getTotalRefunddata === null)
  const transactionsArr = [
    {
      title: 'Total Cancelled',
      color: 'light-primary',
      subtitle: 'Transacions',
      amount: data.getTotalCancelledTransactiondata === null ? "0" : data.getTotalCancelledTransactiondata,
      Icon: Icon['Pocket'],
      down: true
    },
    {
      title: 'Total Refund',
      color: 'light-success',
      subtitle: 'Transacions',
      amount: data.getTotalRefunddata === null ? '0' : data.getTotalRefunddata,
      Icon: Icon['CreditCard']
    },
    {
      title: 'Total Captured',
      color: 'light-warning',
      subtitle: 'Transacions',
      amount: data.getTotalCaptureddata === null ? "0" : data.getTotalCaptureddata,
      Icon: Icon['Monitor']
    },
    {
      title: 'Total Hit',
      color: 'light-success',
      subtitle: 'Transacions',
      amount: data.getTotalHitTransactiondata === null ? "0" : data.getTotalHitTransactiondata,
      Icon: Icon['Check']
      // down: true
    }
  ]

  const renderTransactions = () => {
    return transactionsArr.map(item => {
      return (
        <div key={item.title} className='transaction-item'>
          <Media>
            <Avatar className='rounded' color={item.color} icon={<item.Icon size={18} />} />
            <Media body>
              <h6 className='transaction-title'>{item.title}</h6>
              <small>{item.subtitle}</small>
            </Media>
          </Media>
          <div className={`font-weight-bolder ${item.down ? 'text-danger' : 'text-success'}`}>{item.amount}</div>
        </div>
      )
    })
  }

  return (
    <Card className='card-transaction'>
      <CardHeader>
        <CardTitle tag='h4'>Transactions</CardTitle>
        {/* <Icon.MoreVertical size={18} className='cursor-pointer' /> */}
      </CardHeader>
      <CardBody>
        {renderTransactions()}
      </CardBody>
    </Card>
  )
}

export default CardTransactions
