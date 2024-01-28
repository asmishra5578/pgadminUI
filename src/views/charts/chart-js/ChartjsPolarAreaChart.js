import { Polar } from 'react-chartjs-2'
import { MoreVertical } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import Chart from 'react-apexcharts'
const ChartjsPolarAreaChart = ({
  primary,
  labelColor,
  primaryColorShade,
  warningColorShade,
  infoColorShade,
  greyColor,
  successColorShade,
  tooltipShadow,
  upitran,
  wallettran,
  cardtran,
  nbtran
}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    responsiveAnimationDuration: 500,
    legend: {
      position: 'right',
      labels: {
        usePointStyle: true,
        padding: 25,
        boxWidth: 9,
        fontColor: labelColor
      }
    },
    layout: {
      padding: {
        top: -5,
        bottom: -45
      }
    },
    tooltips: {
      // Updated default tooltip UI
      shadowOffsetX: 1,
      shadowOffsetY: 1,
      shadowBlur: 8,
      shadowColor: tooltipShadow,
      backgroundColor: '#fff',
      titleFontColor: '#000',
      bodyFontColor: '#000'
    },
    scale: {
      scaleShowLine: true,
      scaleLineWidth: 1,
      ticks: {
        display: false,
        fontColor: labelColor
      },
      reverse: false,
      gridLines: {
        display: false
      }
    },
    animation: {
      animateRotate: false
    }
  },
    data = {
      // labels: ['Africa', 'Asia', 'Europe', 'America', 'Antarctica', 'Australia'],
      labels: ['UPI', 'WALLET', 'CARD', 'NB'],

      datasets: [
        {
          label: 'Population (millions)',
          backgroundColor: [
            primaryColorShade,
            warningColorShade,
            primary,
            infoColorShade,
            greyColor,
            successColorShade
          ],
          data: [upitran, wallettran, cardtran, nbtran],
          borderWidth: 0
        }
      ]
    }
  const optionsss = {}
   const seriesss = [44, 55, 41, 17, 15]
  const  labelsss = ['A', 'B', 'C', 'D', 'E']
  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
        <CardTitle tag='h4'>Amount of Transactions </CardTitle>
        {/* <UncontrolledDropdown>
          <DropdownToggle className='cursor-pointer' tag='span'>
            <MoreVertical size={14} />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem className='w-100'>Last 28 days</DropdownItem>
            <DropdownItem className='w-100'>Last Month</DropdownItem>
            <DropdownItem className='w-100'>Last Year</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
      </CardHeader>
      <CardBody>
        {/* <div style={{ height: '200px' }}> */}
          {/* <Polar data={data} options={options} height={350} /> */}
          <div className="donut">
        <Chart options={optionsss} series={seriesss} type="donut" width="380" />
      </div>
        {/* </div> */}
      </CardBody>
    </Card>
  )
}

export default ChartjsPolarAreaChart
