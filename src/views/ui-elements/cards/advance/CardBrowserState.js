import { useState } from 'react'
import Chart from 'react-apexcharts'
import { MoreVertical } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Media,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap'
import Datatablecomponent from '../../../../layouts/components/Datatablecomponent'
import UILoader from '@components/ui-loader'

const CardBrowserState = ({ colors, trackBgColor, merchantTransactionLastDaydata,
  merchantTransactionTodaydata, transactionlistuiblock, 
  merchantTransactionCurrMonthdata,
  merchantTransactionLastMonthdata }) => {
  const [dropdownselectvalue, setdropdownselectvalue] = useState('Curentmonth')
  const columns = [
    {
      name: 'MerchantId',
      selector: 'merchantId',
      sortable: true,
      minWidth: '130px'
    },
    {
      name: 'Amount',
      selector: 'amount',
      sortable: true
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      minWidth: '100px'
    }
  ]
  // console.log('ddadadadadaaddd', merchantTransactionLastDaydata, 
  // merchantTransactionTodaydata, 
  // merchantTransactionCurrMonthdata, 
  // merchantTransactionLastMonthdata)
  // const statesArr = [
  //   {
  //     avatar: require('@src/assets/images/icons/google-chrome.png').default,
  //     title: 'Google Chrome',
  //     value: '54.4%',
  //     chart: {
  //       type: 'radialBar',
  //       series: [54.4],
  //       height: 30,
  //       width: 30,
  //       options: {
  //         grid: {
  //           show: false,
  //           padding: {
  //             left: -15,
  //             right: -15,
  //             top: -12,
  //             bottom: -15
  //           }
  //         },
  //         colors: [colors.primary.main],
  //         plotOptions: {
  //           radialBar: {
  //             hollow: {
  //               size: '22%'
  //             },
  //             track: {
  //               background: trackBgColor
  //             },
  //             dataLabels: {
  //               showOn: 'always',
  //               name: {
  //                 show: false
  //               },
  //               value: {
  //                 show: false
  //               }
  //             }
  //           }
  //         },
  //         stroke: {
  //           lineCap: 'round'
  //         }
  //       }
  //     }
  //   },
  //   {
  //     avatar: require('@src/assets/images/icons/mozila-firefox.png').default,
  //     title: 'Mozila Firefox',
  //     value: '6.1%',
  //     chart: {
  //       type: 'radialBar',
  //       series: [6.1],
  //       height: 30,
  //       width: 30,
  //       options: {
  //         grid: {
  //           show: false,
  //           padding: {
  //             left: -15,
  //             right: -15,
  //             top: -12,
  //             bottom: -15
  //           }
  //         },
  //         colors: [colors.warning.main],
  //         plotOptions: {
  //           radialBar: {
  //             hollow: {
  //               size: '22%'
  //             },
  //             track: {
  //               background: trackBgColor
  //             },
  //             dataLabels: {
  //               showOn: 'always',
  //               name: {
  //                 show: false
  //               },
  //               value: {
  //                 show: false
  //               }
  //             }
  //           }
  //         },
  //         stroke: {
  //           lineCap: 'round'
  //         }
  //       }
  //     }
  //   },
  //   {
  //     avatar: require('@src/assets/images/icons/apple-safari.png').default,
  //     title: 'Apple Safari',
  //     value: '14.6%',
  //     chart: {
  //       type: 'radialBar',
  //       series: [14.6],
  //       height: 30,
  //       width: 30,
  //       options: {
  //         grid: {
  //           show: false,
  //           padding: {
  //             left: -15,
  //             right: -15,
  //             top: -12,
  //             bottom: -15
  //           }
  //         },
  //         colors: [colors.secondary.main],
  //         plotOptions: {
  //           radialBar: {
  //             hollow: {
  //               size: '22%'
  //             },
  //             track: {
  //               background: trackBgColor
  //             },
  //             dataLabels: {
  //               showOn: 'always',
  //               name: {
  //                 show: false
  //               },
  //               value: {
  //                 show: false
  //               }
  //             }
  //           }
  //         },
  //         stroke: {
  //           lineCap: 'round'
  //         }
  //       }
  //     }
  //   },
  //   {
  //     avatar: require('@src/assets/images/icons/internet-explorer.png').default,
  //     title: 'Internet Explorer',
  //     value: '4.2%',
  //     chart: {
  //       type: 'radialBar',
  //       series: [4.2],
  //       height: 30,
  //       width: 30,
  //       options: {
  //         grid: {
  //           show: false,
  //           padding: {
  //             left: -15,
  //             right: -15,
  //             top: -12,
  //             bottom: -15
  //           }
  //         },
  //         colors: [colors.info.main],
  //         plotOptions: {
  //           radialBar: {
  //             hollow: {
  //               size: '22%'
  //             },
  //             track: {
  //               background: trackBgColor
  //             },
  //             dataLabels: {
  //               showOn: 'always',
  //               name: {
  //                 show: false
  //               },
  //               value: {
  //                 show: false
  //               }
  //             }
  //           }
  //         },
  //         stroke: {
  //           lineCap: 'round'
  //         }
  //       }
  //     }
  //   },
  //   {
  //     avatar: require('@src/assets/images/icons/opera.png').default,
  //     title: 'Opera Mini',
  //     value: '8.4%',
  //     chart: {
  //       type: 'radialBar',
  //       series: [8.4],
  //       height: 30,
  //       width: 30,
  //       options: {
  //         grid: {
  //           show: false,
  //           padding: {
  //             left: -15,
  //             right: -15,
  //             top: -12,
  //             bottom: -15
  //           }
  //         },
  //         colors: [colors.danger.main],
  //         plotOptions: {
  //           radialBar: {
  //             hollow: {
  //               size: '22%'
  //             },
  //             track: {
  //               background: trackBgColor
  //             },
  //             dataLabels: {
  //               showOn: 'always',
  //               name: {
  //                 show: false
  //               },
  //               value: {
  //                 show: false
  //               }
  //             }
  //           }
  //         },
  //         stroke: {
  //           lineCap: 'round'
  //         }
  //       }
  //     }
  //   }
  // ]

  // const renderStates = () => {
  //   return statesArr.map(state => {
  //     return (
  //       <div key={state.title} className='browser-states'>
  //         <Media>
  //           <img className='rounded mr-1' src={state.avatar} height='30' alt={state.title} />
  //           <h6 className='align-self-center mb-0'>{state.title}</h6>
  //         </Media>
  //         <div className='d-flex align-items-center'>
  //           <div className='font-weight-bold text-body-heading mr-1'>{state.value}</div>
  //           <Chart
  //             options={state.chart.options}
  //             series={state.chart.series}
  //             type={state.chart.type}
  //             height={state.chart.height}
  //             width={state.chart.width}
  //           />
  //         </div>
  //       </div>
  //     )
  //   })
  // }
  const dropdaownhandler = (e) => {
    console.log('e', e.target.value)
    setdropdownselectvalue(e.target.value)
  }
  return (
    <Card className='card-browser-states'>
      {/* <CardHeader>
        <div>
          <CardTitle tag='h4'>Merchant Transactions</CardTitle>
          <CardText className='font-small-2'>{dropdownselectvalue} Transaction Data</CardText>
        </div>
        <UncontrolledDropdown className='chart-dropdown'>
          <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
            <MoreVertical size={18} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={dropdaownhandler} value='Lastday' className='w-100'>LastDay</DropdownItem>
            <DropdownItem onClick={dropdaownhandler} value='Today' className='w-100'>Today</DropdownItem>
            <DropdownItem onClick={dropdaownhandler} value='Curentmonth' className='w-100'>CurrMonth</DropdownItem>
            <DropdownItem onClick={dropdaownhandler} value='Lastmonth' className='w-100'>LastMonth</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader> */}
      <CardBody>

        {/* {dropdownselectvalue === "Curentmonth" ? 'Currentmonthdata' : dropdownselectvalue === "Lastday" ? 'lastdaydata' : dropdownselectvalue === "Today" ? 'todaydata' : dropdownselectvalue === "Lastmonth" ? 'Lastmonthdta' : null} */}
        <UILoader blocking={transactionlistuiblock}>
          <Datatablecomponent data={merchantTransactionTodaydata}
            // data={
            //   dropdownselectvalue === "Curentmonth" ?  merchantTransactionCurrMonthdata : dropdownselectvalue === "Lastday" ? merchantTransactionLastDaydata : dropdownselectvalue === "Today" ? merchantTransactionTodaydata : dropdownselectvalue === "Lastmonth" ? merchantTransactionLastMonthdata : null
            // }
            ispageperdata coloumnsprops={columns} routename="Today Transactions" />
        </UILoader>
      </CardBody>
    </Card>
  )
}

export default CardBrowserState
