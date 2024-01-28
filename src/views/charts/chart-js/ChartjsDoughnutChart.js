import { Doughnut } from 'react-chartjs-2'
import { Monitor, Tablet, ArrowDown, ArrowUp, CreditCard } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, Button, Badge } from 'reactstrap'
import UILoader from '@components/ui-loader'

const ChartjsRadarChart = ({ tooltipShadow, successColorShade, warningLightColor, primary,
  upitran, 
  wallettran, 
  cardtran, 
  nbtran, amountoftranUIblock, totalamoutTXNresethandler, upitrancount
}) => {
  const options = {
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 500,
      cutoutPercentage: 60,
      legend: { display: false },
      tooltips: {
        callbacks: {
          label(tooltipItem, data) {
            const label = data.datasets[0].labels[tooltipItem.index] || '',
              value = data.datasets[0].data[tooltipItem.index]
            const output = ` ${label} : ${value} `
            return output
          }
        },
        // Updated default tooltip UI
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        shadowColor: tooltipShadow,
        backgroundColor: '#fff',
        titleFontColor: '#000',
        bodyFontColor: '#000'
      }
    },
    data = {
      datasets: [
        {
          labels: ['UPI'],
          data: [upitran],
          backgroundColor: [successColorShade, warningLightColor, primary, "pink"],
          borderWidth: 0,
          pointStyle: 'rectRounded'
        }
      ]
    }

  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
        <CardTitle tag='h4'>Today Amount of Transactions
        </CardTitle>
        <CardTitle tag='h4'>
        <Badge color='primary' onClick={totalamoutTXNresethandler}>Reset</Badge>
        </CardTitle>
      </CardHeader>
      <CardBody>
      <UILoader blocking={amountoftranUIblock}>

        <div style={{ height: '275px' }}>
          <Doughnut data={data} options={options} height={275} />
        </div>
        <div className='d-flex justify-content-between'>
          <div className='d-flex align-items-center'>
            {/* <CreditCard size={17} className='text-success' /> */}
            <span className='font-weight-bold ml-75 mr-25'>UPI Count of Transaction</span>
            {/* <span>- 10%</span> */}
          </div>
          <div>
            <span>{upitrancount}</span>
            {/* <ArrowUp className='text-success' size={14} /> */}
          </div>
        </div>
        <div className='d-flex justify-content-between'>
          <div className='d-flex align-items-center'>
            <span className='font-weight-bold ml-75 mr-25'>UPI Total Transaction</span>
          </div>
          <div>
            <span>₹ {Number(upitran).toFixed(2)}</span>
          </div>
        </div>
        <div className='d-flex justify-content-between'>
          <div className='d-flex align-items-center'>
            <span className='font-weight-bold ml-75 mr-25'>NB Total Transaction</span>
          </div>
          <div>
            <span>₹ O</span>
          </div>
        </div>
        <div className='d-flex justify-content-between'>
          <div className='d-flex align-items-center'>
            <span className='font-weight-bold ml-75 mr-25'>Wallet Total Transaction</span>
          </div>
          <div>
            <span>₹ O</span>
          </div>
        </div>
        <div className='d-flex justify-content-between'>
          <div className='d-flex align-items-center'>
            <span className='font-weight-bold ml-75 mr-25'>Card Total Transaction</span>
          </div>
          <div>
            <span>₹ O</span>
          </div>
        </div>
        {/* <div className='d-flex justify-content-between'>
          <div className='d-flex align-items-center'>
            <span className='font-weight-bold ml-75 mr-25'>Card</span>
          </div>
          <div>
            <span>₹ {cardtran}</span>
          </div>
        </div> */}
        {/* <div className='d-flex justify-content-between'>
          <div className='d-flex align-items-center'>
            <span className='font-weight-bold ml-75 mr-25'>NB</span>
          </div>
          <div>
            <span>₹ {nbtran}</span>
          </div>
        </div> */}
        </UILoader>
      </CardBody>
    </Card>
  )
}

export default ChartjsRadarChart
