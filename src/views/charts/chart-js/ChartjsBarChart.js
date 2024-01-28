import Flatpickr from 'react-flatpickr'
import { Calendar } from 'react-feather'
import { Bar } from 'react-chartjs-2'
import { Card, CardHeader, CardTitle, CardBody, Label, Badge } from 'reactstrap'
import Select from 'react-select'
import UILoader from '@components/ui-loader'

const ChartjsBarChart = ({ tooltipShadow, gridLineColor, labelColor, successColorShade,
  hoursesdata,
  hourscountdata,
  hourreportUIBlock,
  hourlyselectkycstatushandler,
  hourlyselectkycstatusvalue,
  countryOptions, Hourlycountresethandler
}) => {
  const plugins = [
    {
      datalabels: {
        display: true,
        color: "black",
        align: "end",
        anchor: "end",
        formatter: Math.round(),
        font: { size: "14" }
      }
    }
  ]
  const options = {
    elements: {
      rectangle: {
        borderWidth: 2,
        borderSkipped: 'bottom'
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    responsiveAnimationDuration: 500,
    legend: {
      display: false
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
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: true,
            color: gridLineColor,
            zeroLineColor: gridLineColor
          },
          scaleLabel: {
            display: false
          },
          ticks: {
            fontColor: labelColor
          }
        }
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            color: gridLineColor,
            zeroLineColor: gridLineColor
          },
          ticks: {
            stepSize: 100,
            min: 0,
            max: 1500,
            fontColor: labelColor
          }
        }
      ]
    }
  },
    data = {
      // labels: ['7/12', '8/12', '9/12', '10/12', '11/12', '12/12', '13/12', '14/12', '15/12', '16/12', '17/12'],
      labels: hoursesdata,
      datasets: [
        {
          // data: [275, 90, 190, 205, 125, 85, 55, 87, 127, 150, 230, 280, 190],
          data: hourscountdata,
          backgroundColor: successColorShade,
          borderColor: 'transparent',
          barThickness: 15
        }
      ]
    }
  // hoursesdata
  // hourscountdata
  // hourreportUIBlock
  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
        <CardTitle tag='h4'>Today Transaction Report Hourly, count Status
        <br/>
          <Label>Select Status</Label>
          <Select
            // theme={selectThemeColors}
            isClearable={false}
            id='kycStatus'
            className='react-select dshboard'
            classNamePrefix='select'
            options={countryOptions}
            // defaultValue={countryOptions[0]}
            // defaultInputValue="SUCCESS"
            onChange={hourlyselectkycstatushandler}
            value={hourlyselectkycstatusvalue}
          />
        </CardTitle>
        <CardTitle tag='h4'>
        <Badge color='primary' onClick={Hourlycountresethandler}>Reset</Badge>
        </CardTitle>
        <div className='d-flex align-items-center'>
          {/* <Calendar size={14} />
          <Flatpickr
            options={{
              mode: 'range',
              defaultDate: ['2019-05-01', '2019-05-10']
            }}
            className='form-control flat-picker bg-transparent border-0 shadow-none'
          /> */}
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ height: '400px' }}>
          <UILoader blocking={hourreportUIBlock}>
            <Bar data={data} options={options} height={400} plugins={plugins} />
          </UILoader>
        </div>
      </CardBody>
    </Card>
  )
}

export default ChartjsBarChart
