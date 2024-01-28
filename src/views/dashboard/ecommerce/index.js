import { useContext, useEffect, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { Calendar } from 'react-feather'
import { Row, Col, Card, CardBody, CardText, Button, ButtonGroup, Badge, CardHeader, CardTitle, Label } from 'reactstrap'
import CompanyTable from './CompanyTable'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
import CardMeetup from '@src/views/ui-elements/cards/advance/CardMeetup'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'
import CardTransactions from '@src/views/ui-elements/cards/advance/CardTransactions'
import CardBrowserStates from '@src/views/ui-elements/cards/advance/CardBrowserState'
import RadarChart from '@src/views/charts/chart-js/ChartjsDoughnutChart'
import requestsApi from './request'
import SessionRequest from '../../sessionrequest'
import moment from "moment"
import PolarAreaChart from '../../../views/charts/chart-js/ChartjsPolarAreaChart'
import UILoader from '@components/ui-loader'
import { useSkin } from '@hooks/useSkin'
import { Bar, Line } from 'react-chartjs-2'
import { useHistory } from 'react-router-dom'
import BarChart from '../../charts/chart-js/ChartjsBarChart'
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import { toast } from 'react-toastify'
import Hometransactionpgwisesum from '../../pages/getByMerchantWisePgWiseSum/transaction'
import DataTableWithButtons from '../../../layouts/components/Datatablecomponent'
import Select from 'react-select'
import st from '../../../@core/secureStore/useSecure'
const requestsApidata = new requestsApi()
const SessionRequestApidata = new SessionRequest()
const EcommerceDashboard = () => {

  const history = useHistory()
  const { colors } = useContext(ThemeColors),
    trackBgColor = '#e9ecef'
  const [upitran, setupitran] = useState('')
  const [wallettran, setwallettran] = useState('')
  const [cardtran, setcardtran] = useState('')
  const [nbtran, setnbtran] = useState('')


  const [rSelected, setRSelected] = useState('payin')
  const [statuscoutdata, setstatuscoutdata] = useState([])
  const [statuscountuiblock, setstatuscountuiblock] = useState(false)
  const [transactionlistuiblock, settransactionlistuiblock] = useState(true)
  const [amountoftranUIblock, setamountoftranUIblock] = useState(true)
  const yearfromDate = moment().subtract(1, "years").format("YYYY-MM-DD")
  const [hoursesdata, sethoursesdata] = useState([])
  const [hourscountdata, sethourscountdata] = useState([])
  const [hourreportUIBlock, sethourreportUIBlock] = useState(true)
  const [minutesdata, setminutesdata] = useState([])
  const [countdata, setcountdata] = useState([])
  const [getByMerchantWisePgWiseSumdata, setgetByMerchantWisePgWiseSumdata] = useState([])
  const [getByMerchantWisePgWiseSumUIBlock, setgetByMerchantWisePgWiseSumUIBlock] = useState(true)
  const [getPgTypeAndCountByStatusdata, setgetPgTypeAndCountByStatusdata] = useState([])
  const [getPgTypeAndCountUIBlock, setgetPgTypeAndCountUIBlock] = useState(true)
  const [minutesreportUIBlock, setminutesreportUIBlock] = useState(true)
  const [selectkycstatusvalue, setselectkycstatusvalue] = useState('Select')
  const [hourlyselectkycstatusvalue, sethourlyselectkycstatusvalue] = useState('Select')
  const [getTrxTopReportdata, setgetTrxTopReportdata] = useState([])
  const [getTrxTopReportUIBlock, setgetTrxTopReportUIBlock] = useState(true)
  const [upitrancount, setupitrancount] = useState('')
  const [LastTrxMerchListData, setLastTrxMerchListData] = useState([])
  const [LastTrxMerchListUIBlock, setLastTrxMerchListUIBlock] = useState(true)

  const [getPGWiseMerchantListListData, setgetPGWiseMerchantListListData] = useState([])
  const [getPGWiseMerchantListListUIBlock, setgetPGWiseMerchantListListUIBlock] = useState(true)
  const [payoutPgTypeAndCountByStatusAndDateUIBlock, setpayoutPgTypeAndCountByStatusAndDateUIBlock] = useState(true)
  const [payoutPgTypeAndCountByStatusAndDateList, setpayoutPgTypeAndCountByStatusAndDateList] = useState([])
  const [payouthourlysuccesscount, setpayouthourlysuccesscount] = useState([])
  const [payouthourlyPENDINGcount, setpayouthourlyPENDINGcount] = useState([])
  const [payouthourlyFAILEDcount, setpayouthourlyFAILEDcount] = useState([])
  const [payoutMINUTESysuccesscount, setpayoutMINUTESysuccesscount] = useState([])
  const [payoutMINUTESyPENDINGcount, setpayoutMINUTESyPENDINGcount] = useState([])
  const [payoutMINUTESyFAILEDcount, setpayoutMINUTESyFAILEDcount] = useState([])
  const [payouthourreportUIBlock, setpayouthourreportUIBlock] = useState(true)

  const [hourstatuswisecontdateandsum, sethourstatuswisecontdateandsum] = useState([])
  const [hourstatuswisecontdateandsumUIBlock, sethourstatuswisecontdateandsumUIBlock] = useState(true)

  const [successcountdata, setsuccesscountdata] = useState([])
  const [pendingcountdata, setpendingcountdata] = useState([])
  const [failedcountdata, setfailedcountdata] = useState([])
  const [payoutsuccesscountdata, setpayoutsuccesscountdata] = useState([])
  const [payoutpendingcountdata, setpayoutpendingcountdata] = useState([])
  const [payoutfailedcountdata, setpayoutfailedcountdata] = useState([])
  const [payoutREVERSEDcountdata, setpayoutREVERSEDcountdata] = useState([])
  const [hourlysucessdata, sethourlysucessdata] = useState([])
  const [hourlysuccesscount, sethourlysuccesscount] = useState([])
  const [hourlyPENDINGdata, sethourlyPENDINGdata] = useState([])
  const [hourlyPENDINGcount, sethourlyPENDINGcount] = useState([])
  const [hourlyFAILEDdata, sethourlyFAILEDdata] = useState([])
  const [hourlyFAILEDcount, sethourlyFAILEDcount] = useState([])

  const [minutessucessdata, setminutessucessdata] = useState([])
  const [minutessuccesscount, setminutessuccesscount] = useState([])
  const [minutesPENDINGdata, setminutesPENDINGdata] = useState([])
  const [minutesPENDINGcount, setminutesPENDINGcount] = useState([])
  const [minutesFAILEDdata, setminutesFAILEDdata] = useState([])
  const [minutesFAILEDcount, setminutesFAILEDcount] = useState([])
  const [selecpguuidvalue, setselecpguuidvalue] = useState('Select')
  const [allpglistdata, setallpglistdata] = useState([])
  const [payoutstatuscountdata, setpayoutstatuscountdata] = useState([])
  const [payoutstatuscoutdata, setpayoutstatuscoutdata] = useState([])
  const toDate = moment().format("YYYY-MM-DD")
  const todayfromdate = moment().format("YYYY-MM-DD")
  let isMounted = true
  const [payoutLastTrxMerchListUIBlock, setpayoutLastTrxMerchListUIBlock] = useState(true)
  const [payoutgetLastTrxMerchList, setpayoutgetLastTrxMerchList] = useState([])

  const [paoutminutsdataUIblock, setpaoutminutsdataUIblock] = useState(true)
  const [counterpayoutapi, setcounterpayoutapi] = useState(0)
  const [payoutmainbtndisabled, setpayoutmainbtndisabled] = useState(true)

  const [payoutstatuscountuiblock, setpayoutstatuscountuiblock] = useState(true)
  // const monthtoDate = moment().format("YYYY-MM-DD")
  const pglistoption = [
    allpglistdata.map((v) => {
      return { value: v.pgUuid, label: v.pgName }
    })
  ]
  const payoutgetHourandStatusWiseCountAndDatePayOut = (dates, statuss) => {
    setpayouthourreportUIBlock(true)
    requestsApidata.getHourandStatusWiseCountAndDatePayOut(dates, statuss).then((res) => {
      setpayouthourreportUIBlock(false)
      const succesres = []
      const failedres = []
      const pendingres = []
      for (let i = 0; i <= 24; i++) {
        let issuccess = false
        let ispending = false
        let isfailed = false
        const curentvalueIndex = res.data.filter((m => m.hour === i.toString()))
        if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "SUCCESS"))) {
          const founditem = curentvalueIndex.find((x => x.status === "SUCCESS"))
          succesres.push(founditem.count)
          issuccess = true
        }
        if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "PENDING"))) {
          const founditem = curentvalueIndex.find((x => x.status === "PENDING"))
          pendingres.push(founditem.count)
          ispending = true
        }
        if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "FAILED"))) {
          const founditem = curentvalueIndex.find((x => x.status === "FAILED"))
          failedres.push(founditem.count)
          isfailed = true
        }
        if (!issuccess) { succesres.push(0) }
        if (!ispending) { pendingres.push(0) }
        if (!isfailed) { failedres.push(0) }
      }
      setpayouthourlysuccesscount(succesres)
      setpayouthourlyPENDINGcount(pendingres)
      setpayouthourlyFAILEDcount(failedres)
    })
  }
  const payoutgetStatusAndMinuteWiseCountPayOut = (statuss) => {
    setpaoutminutsdataUIblock(true)
    requestsApidata.getStatusAndMinuteWiseCountPayOut(statuss).then((res) => {
      // console.log('getStatusAndMinuteWiseCountPayOut', res.data)
      setpaoutminutsdataUIblock(false)

      const succesres = []
      const failedres = []
      const pendingres = []
      for (let i = 0; i <= 60; i++) {
        let issuccess = false
        let ispending = false
        let isfailed = false
        const curentvalueIndex = res.data.filter((m => m.minutes === i.toString()))
        if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "SUCCESS"))) {
          const founditem = curentvalueIndex.find((x => x.status === "SUCCESS"))
          succesres.push(founditem.cnt)
          issuccess = true
        }
        if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "PENDING"))) {
          const founditem = curentvalueIndex.find((x => x.status === "PENDING"))
          pendingres.push(founditem.cnt)
          ispending = true
        }
        if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "FAILED"))) {
          const founditem = curentvalueIndex.find((x => x.status === "FAILED"))
          failedres.push(founditem.cnt)
          isfailed = true
        }
        if (!issuccess) { succesres.push(0) }
        if (!ispending) { pendingres.push(0) }
        if (!isfailed) { failedres.push(0) }
      }
      setpayoutMINUTESysuccesscount(succesres)
      setpayoutMINUTESyPENDINGcount(pendingres)
      setpayoutMINUTESyFAILEDcount(failedres)
    })
  }

  const getLastTrxMerchListPayOut = (startdats) => {
    setpayoutLastTrxMerchListUIBlock(true)
    requestsApidata.getLastTrxMerchListPayOut(startdats).then((res) => {
      // console.log('res', res.data)
      setpayoutgetLastTrxMerchList(res.data)
      setpayoutLastTrxMerchListUIBlock(false)
    })
  }
  const getgetPgTypeAndCountByStatusAndDatePayOut = (startdate, enddate, statuss) => {
    setpayoutPgTypeAndCountByStatusAndDateUIBlock(true)
    requestsApidata.getPgTypeAndCountByStatusAndDatePayOut(startdate, enddate, statuss).then((res) => {
      setpayoutPgTypeAndCountByStatusAndDateList(res.data)
      setpayoutPgTypeAndCountByStatusAndDateUIBlock(false)
    })
  }
  const getStatusCountPayOut = (todayfromdates, toDates) => {
    requestsApidata.getStatusCountPayOut(todayfromdates, toDates).then((res) => {
      console.log('res', res.data)
      setpayoutstatuscountdata(res.data)
    })
  }
  const payoutallapicalling = () => {
    setcounterpayoutapi(1)
    requestsApidata.getStatusCountPayOut(todayfromdate, toDate).then((res) => {
      // console.log('res', res.data)
      // setpayoutstatuscountdata(res.data)
      if (res.data.exception === null) {
        setpayoutstatuscoutdata([])
        setpayoutstatuscountuiblock(false)
      } else if (res.data.length === 0) {
        setpayoutstatuscountuiblock(false)
        setpayoutsuccesscountdata('0')
        setpayoutpendingcountdata('0')
        setpayoutfailedcountdata('0')
        setpayoutREVERSEDcountdata(0)
      } else {
        const count1 = res.data[0] === undefined ? "0" : res.data[0].count
        const count2 = res.data[1] === undefined ? "0" : res.data[1].count
        const count3 = res.data[2] === undefined ? "0" : res.data[2].count
        const count4 = res.data[3] === undefined ? "0" : res.data[3].count

        const totalcount = Number(count1) + Number(count2) + Number(count3) + Number(count4)
        const payoutsuccesspercentage = (count1 * 100) / totalcount
        const payoutpendingpercentage = (count2 * 100) / totalcount
        const payoutfailedpercentage = (count3 * 100) / totalcount
        const payoutReversedpercentage = (count4 * 100) / totalcount


        const amount1 = res.data[0] === undefined ? "0" : res.data[0].amountSum
        const amount2 = res.data[1] === undefined ? "0" : res.data[1].amountSum
        const amount3 = res.data[2] === undefined ? "0" : res.data[2].amountSum
        const amount4 = res.data[3] === undefined ? "0" : res.data[3].amountSum

        const amounttotalcount = Number(amount1) + Number(amount2) + Number(amount3) + Number(amount4)
        const amountsuccesspercentage = (amount1 * 100) / amounttotalcount
        const amountpendingpercentage = (amount2 * 100) / amounttotalcount
        const amountfailedpercentage = (amount3 * 100) / amounttotalcount
        const amountReversedpercentage = (amount3 * 100) / amounttotalcount

        setpayoutstatuscoutdata(res.data)
        setpayoutstatuscountuiblock(false)
        res.data[0] === undefined ? amountsuccesspercentage.toFixed(2) : res.data[0].amountpercentage = amountsuccesspercentage.toFixed(2)
        res.data[1] === undefined ? amountpendingpercentage.toFixed(2) : res.data[1].amountpercentage = amountpendingpercentage.toFixed(2)
        res.data[2] === undefined ? amountfailedpercentage.toFixed(2) : res.data[2].amountpercentage = amountfailedpercentage.toFixed(2)
        res.data[3] === undefined ? amountReversedpercentage.toFixed(2) : res.data[3].amountpercentage = amountfailedpercentage.toFixed(2)

        res.data[0] === undefined ? payoutsuccesspercentage.toFixed(2) : res.data[0].countpercentage = payoutsuccesspercentage.toFixed(2)
        res.data[1] === undefined ? payoutpendingpercentage.toFixed(2) : res.data[1].countpercentage = payoutpendingpercentage.toFixed(2)
        res.data[2] === undefined ? payoutfailedpercentage.toFixed(2) : res.data[2].countpercentage = payoutfailedpercentage.toFixed(2)
        res.data[3] === undefined ? payoutReversedpercentage.toFixed(2) : res.data[2].countpercentage = payoutReversedpercentage.toFixed(2)

        if (res.data[0] !== undefined) {
          if (res.data[0].status === "SUCCESS") {
            setpayoutsuccesscountdata(res.data[0])
          }
        }

        if (res.data[1] !== undefined) {
          if (res.data[1].status === "SUCCESS") {
            setpayoutsuccesscountdata(res.data[1])
          }
        }
        if (res.data[2] !== undefined) {
          if (res.data[2].status === "SUCCESS") {
            setpayoutsuccesscountdata(res.data[2])
          }
        }
        if (res.data[3] !== undefined) {
          if (res.data[3].status === "SUCCESS") {
            setpayoutsuccesscountdata(res.data[3])
          }
        }


        if (res.data[0] !== undefined) {
          if (res.data[0].status === "PENDING") {
            setpayoutpendingcountdata(res.data[0])
          }
        }

        if (res.data[1] !== undefined) {
          if (res.data[1].status === "PENDING") {
            setpayoutpendingcountdata(res.data[1])
          }
        }
        if (res.data[2] !== undefined) {
          if (res.data[2].status === "PENDING") {
            setpayoutpendingcountdata(res.data[2])
          }
        }
        if (res.data[3] !== undefined) {
          if (res.data[3].status === "PENDING") {
            setpayoutpendingcountdata(res.data[3])
          }
        }

        if (res.data[0] !== undefined) {
          if (res.data[0].status === "FAILURE") {
            setpayoutfailedcountdata(res.data[0])
          }
        }
        if (res.data[1] !== undefined) {

          if (res.data[1].status === "FAILURE") {
            setpayoutfailedcountdata(res.data[1])
          }
        }
        if (res.data[2] !== undefined) {
          if (res.data[2].status === "FAILURE") {
            setpayoutfailedcountdata(res.data[2])
          }
        }
        if (res.data[3] !== undefined) {
          if (res.data[3].status === "FAILURE") {
            setpayoutfailedcountdata(res.data[3])
          }
        }
        if (res.data[0] !== undefined) {
          if (res.data[0].status === "REVERSED") {
            setpayoutREVERSEDcountdata(res.data[0])
          }
        }
        if (res.data[1] !== undefined) {

          if (res.data[1].status === "REVERSED") {
            setpayoutREVERSEDcountdata(res.data[1])
          }
        }
        if (res.data[2] !== undefined) {
          if (res.data[2].status === "REVERSED") {
            setpayoutREVERSEDcountdata(res.data[2])
          }
        }
        if (res.data[3] !== undefined) {
          if (res.data[3].status === "REVERSED") {
            setpayoutREVERSEDcountdata(res.data[3])
          }
        }
      }
      setpayoutLastTrxMerchListUIBlock(true)
      requestsApidata.getLastTrxMerchListPayOut(todayfromdate).then((res) => {
        // console.log('res', res.data)
        setpayoutgetLastTrxMerchList(res.data)
        setpayoutLastTrxMerchListUIBlock(false)
        setpayoutPgTypeAndCountByStatusAndDateUIBlock(true)
        requestsApidata.getPgTypeAndCountByStatusAndDatePayOut(todayfromdate, toDate, "SUCCESS").then((res) => {
          setpayoutPgTypeAndCountByStatusAndDateList(res.data)
          setpayoutPgTypeAndCountByStatusAndDateUIBlock(false)
          setpayouthourreportUIBlock(true)
          requestsApidata.getHourandStatusWiseCountAndDatePayOut(todayfromdate, 'SUCCESS').then((res) => {
            // console.log('getHourandStatusWiseCountAndDatePayOut', res.data)
            setpayouthourreportUIBlock(false)
            const succesres = []
            const failedres = []
            const pendingres = []
            for (let i = 0; i <= 24; i++) {
              let issuccess = false
              let ispending = false
              let isfailed = false
              const curentvalueIndex = res.data.filter((m => m.hour === i.toString()))
              if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "SUCCESS"))) {
                const founditem = curentvalueIndex.find((x => x.status === "SUCCESS"))
                succesres.push(founditem.count)
                issuccess = true
              }
              if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "PENDING"))) {
                const founditem = curentvalueIndex.find((x => x.status === "PENDING"))
                pendingres.push(founditem.count)
                ispending = true
              }
              if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "FAILED"))) {
                const founditem = curentvalueIndex.find((x => x.status === "FAILED"))
                failedres.push(founditem.count)
                isfailed = true
              }
              if (!issuccess) { succesres.push(0) }
              if (!ispending) { pendingres.push(0) }
              if (!isfailed) { failedres.push(0) }
            }
            setpayouthourlysuccesscount(succesres)
            setpayouthourlyPENDINGcount(pendingres)
            setpayouthourlyFAILEDcount(failedres)
            setpaoutminutsdataUIblock(true)
            requestsApidata.getStatusAndMinuteWiseCountPayOut('SUCCESS').then((resminutse) => {
              setpaoutminutsdataUIblock(false)

              const succesrespminutse = []
              const failedresminutes = []
              const pendingresminutes = []
              for (let i = 0; i <= 60; i++) {
                let issuccessminutes = false
                let ispendingminutes = false
                let isfailedminutes = false
                const curentvalueIndex = resminutse.data.filter((m => m.minutes === i.toString()))
                if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "SUCCESS"))) {
                  const founditem = curentvalueIndex.find((x => x.status === "SUCCESS"))
                  succesrespminutse.push(founditem.cnt)
                  issuccessminutes = true
                }
                if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "PENDING"))) {
                  const founditem = curentvalueIndex.find((x => x.status === "PENDING"))
                  pendingresminutes.push(founditem.cnt)
                  ispendingminutes = true
                }
                if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "FAILED"))) {
                  const founditem = curentvalueIndex.find((x => x.status === "FAILED"))
                  failedresminutes.push(founditem.cnt)
                  isfailedminutes = true
                }
                if (!issuccessminutes) { succesrespminutse.push(0) }
                if (!ispendingminutes) { pendingresminutes.push(0) }
                if (!isfailedminutes) { failedresminutes.push(0) }
              }
              setpayoutMINUTESysuccesscount(succesrespminutse)
              setpayoutMINUTESyPENDINGcount(pendingres)
              setpayoutMINUTESyFAILEDcount(failedres)
            })
          })
        })
      })
    })
  }
  const rSelectedHadnler = (e) => {
    console.log('rSelectedHadnler', e.target.id)
    setRSelected(e.target.id)
    if (e.target.id === "payout") {
      if (counterpayoutapi === 0) {
        setcounterpayoutapi(1)
        payoutallapicalling()
      }

      // getLastTrxMerchListPayOut(todayfromdate)
      // getgetPgTypeAndCountByStatusAndDatePayOut(todayfromdate, toDate, "SUCCESS")
      // getStatusCountPayOut(todayfromdate, toDate)
      // payoutgetHourandStatusWiseCountAndDatePayOut(todayfromdate, 'SUCCESS')
      // payoutgetStatusAndMinuteWiseCountPayOut('SUCCESS')
    }
  }

  const getAllPGDetailsApi = () => {
    requestsApidata.getAllPGDetails().then((res) => {
      setallpglistdata(res.data)
    })
  }
  const gethourtransactiondata = (fromdate, satus) => {
    sethourreportUIBlock(true)
    requestsApidata.getHourandCountStatusAndDate(fromdate).then(res => {
      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else {
        // setdata(res.data)
        // console.log('gethourtransactiondata', res.data)

        sethourreportUIBlock(false)
        const dummyhourlysucessdata = []
        const dummyhourlysuccesscount = []
        const dummyhourlyPENDINGdata = []
        const dummyhourlyPENDINGcount = []
        const dummyhourlyFAILEDdata = []
        const dummyhourlyFAILEDcount = []

        const succesres = []
        const failedres = []
        const pendingres = []

        res.data.map((v) => {
          if (v.status === "SUCCESS") {
            dummyhourlysucessdata.push(v.hour)
            dummyhourlysuccesscount.push(v.count)
            // succesres.push(v)
          } else if (v.status === "PENDING") {
            dummyhourlyPENDINGdata.push(v.hour)
            dummyhourlyPENDINGcount.push(v.count)
            // pendingres.push(v)
          } else if (v.status === "FAILED") {
            dummyhourlyFAILEDdata.push(v.hour)
            dummyhourlyFAILEDcount.push(v.count)
            // failedres.push(v)
          }
        })
        // console.log(succesres, pendingres, failedres)
        // console.log('dummyhourlysucessdatalength', dummyhourlysucessdata, dummyhourlysuccesscount)

        for (let i = 0; i <= 24; i++) {
          // if (succesres[i])
          let issuccess = false
          let ispending = false
          let isfailed = false

          const curentvalueIndex = res.data.filter((m => m.hour === i.toString()))
          if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "SUCCESS"))) {
            // console.log('curentvalueIndex1', curentvalueIndex)
            const founditem = curentvalueIndex.find((x => x.status === "SUCCESS"))
            // succesres.push(curentvalueIndex[0].count)
            succesres.push(founditem.count)
            issuccess = true
          }
          if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "PENDING"))) {
            // console.log('curentvalueIndex2', curentvalueIndex)
            const founditem = curentvalueIndex.find((x => x.status === "PENDING"))
            // succesres.push(curentvalueIndex[0].count)
            pendingres.push(founditem.count)
            ispending = true
          }
          if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "FAILED"))) {
            // console.log('curentvalueIndex3', curentvalueIndex)
            // failedres.push(curentvalueIndex[0].count)
            const founditem = curentvalueIndex.find((x => x.status === "FAILED"))
            // succesres.push(curentvalueIndex[0].count)
            failedres.push(founditem.count)
            isfailed = true
          }
          if (!issuccess) { succesres.push(0) }
          if (!ispending) { pendingres.push(0) }
          if (!isfailed) { failedres.push(0) }

          // if (curentvalueIndex && curentvalueIndex.status === "SUCCESS") {
          //   succesres.push(curentvalueIndex.count)
          //   pendingres.push(0)
          //   failedres.push(0)
          // } else if (curentvalueIndex && curentvalueIndex.status === "PENDING") {
          //   pendingres.push(curentvalueIndex.count)
          //   succesres.push(0)
          //   failedres.push(0)
          // }  else if (curentvalueIndex && curentvalueIndex.status === "FAILED") {
          //   failedres.push(curentvalueIndex.count)
          //   succesres.push(0)
          //   pendingres.push(0)
          // } else {
          //   succesres.push(0)
          //   pendingres.push(0)
          //   failedres.push(0)
          // }

          // if (dummyhourlysuccesscount.length !== 24) {
          //   // dummyhourlysuccesscount.push('0')
          //   // console.log(dummyhourlysucessdata[i])
          //    if (dummyhourlysucessdata[i] === (i.toString())) {
          //     console.log('mila hai', i, dummyhourlysucessdata[i])
          //    } else {
          //     console.log('nahi mila', i, dummyhourlysucessdata[i])
          //    }
          // }
        }
        // console.log(succesres, pendingres, failedres)

        // console.log('after 0 insert', dummyhourlysuccesscount)
        sethourlysucessdata(dummyhourlysucessdata)
        sethourlysuccesscount(succesres)
        sethourlyPENDINGdata(dummyhourlyPENDINGdata)
        sethourlyPENDINGcount(pendingres)
        sethourlyFAILEDdata(dummyhourlyFAILEDdata)
        sethourlyFAILEDcount(failedres)

        // console.log('sucessdata', dummyhourlysucessdata)
        // console.log('successcount', dummyhourlysuccesscount)
        // console.log('PENDINGdata', dummyhourlyPENDINGdata)
        // console.log('PENDINGcount', dummyhourlyPENDINGcount)
        // console.log('FAILEDdata', dummyhourlyFAILEDdata)
        // console.log('FAILEDcount', dummyhourlyFAILEDcount)
        // const dummyminutes = []
        // const dummycount = []
        // res.data.map((v) => {
        //   return dummyminutes.push(v.hour)

        // })
        // res.data.map((v) => {
        //   return dummycount.push(v.count)
        // })

        // console.log('minutestdata', dummyminutes, dummycount)
        // sethoursesdata(dummyminutes)
        // sethourscountdata(dummycount)
      }
    })
  }
  const getminutescoutdata = (status) => {
    setminutesreportUIBlock(true)
    requestsApidata.getStatusAndMinuteWiseCount().then(res => {
      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else {
        // setdata(res.data)
        // console.log('gethourtransactiondata', res.data)

        setminutesreportUIBlock(false)
        const dummyminutessucessdata = []
        const dummyminutessuccesscount = []
        const dummyminutesPENDINGdata = []
        const dummyminutesPENDINGcount = []
        const dummyminutesFAILEDdata = []
        const dummyminutesFAILEDcount = []

        const succesres = []
        const failedres = []
        const pendingres = []

        res.data.map((v) => {
          if (v.status === "SUCCESS") {
            dummyminutessucessdata.push(v.minutes)
            dummyminutessuccesscount.push(v.cnt)
            // succesres.push(v)
          } else if (v.status === "PENDING") {
            dummyminutesPENDINGdata.push(v.minutes)
            dummyminutesPENDINGcount.push(v.cnt)
            // pendingres.push(v)
          } else if (v.status === "FAILED") {
            dummyminutesFAILEDdata.push(v.minutes)
            dummyminutesFAILEDcount.push(v.cnt)
            // failedres.push(v)
          }
        })
        // console.log(succesres, pendingres, failedres)
        // console.log('dummyminutessucessdatalength', dummyminutessucessdata, dummyminutessuccesscount)

        for (let i = 0; i <= 60; i++) {
          // if (succesres[i])
          let issuccess = false
          let ispending = false
          let isfailed = false

          const curentvalueIndex = res.data.filter((m => m.minutes === i.toString()))
          if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "SUCCESS"))) {
            // console.log('curentvalueIndex1', curentvalueIndex)
            const founditem = curentvalueIndex.find((x => x.status === "SUCCESS"))
            // succesres.push(curentvalueIndex[0].count)
            succesres.push(founditem.cnt)
            issuccess = true
          }
          if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "PENDING"))) {
            // console.log('curentvalueIndex2', curentvalueIndex)
            const founditem = curentvalueIndex.find((x => x.status === "PENDING"))
            // succesres.push(curentvalueIndex[0].count)
            pendingres.push(founditem.cnt)
            ispending = true
          }
          if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "FAILED"))) {
            // console.log('curentvalueIndex3', curentvalueIndex)
            // failedres.push(curentvalueIndex[0].count)
            const founditem = curentvalueIndex.find((x => x.status === "FAILED"))
            // succesres.push(curentvalueIndex[0].count)
            failedres.push(founditem.cnt)
            isfailed = true
          }
          if (!issuccess) { succesres.push(0) }
          if (!ispending) { pendingres.push(0) }
          if (!isfailed) { failedres.push(0) }

          // if (curentvalueIndex && curentvalueIndex.status === "SUCCESS") {
          //   succesres.push(curentvalueIndex.count)
          //   pendingres.push(0)
          //   failedres.push(0)
          // } else if (curentvalueIndex && curentvalueIndex.status === "PENDING") {
          //   pendingres.push(curentvalueIndex.count)
          //   succesres.push(0)
          //   failedres.push(0)
          // }  else if (curentvalueIndex && curentvalueIndex.status === "FAILED") {
          //   failedres.push(curentvalueIndex.count)
          //   succesres.push(0)
          //   pendingres.push(0)
          // } else {
          //   succesres.push(0)
          //   pendingres.push(0)
          //   failedres.push(0)
          // }

          // if (dummyminutessuccesscount.length !== 24) {
          //   // dummyminutessuccesscount.push('0')
          //   // console.log(dummyminutessucessdata[i])
          //    if (dummyminutessucessdata[i] === (i.toString())) {
          //     console.log('mila hai', i, dummyminutessucessdata[i])
          //    } else {
          //     console.log('nahi mila', i, dummyminutessucessdata[i])
          //    }
          // }
        }
        // console.log(succesres, pendingres, failedres)

        // console.log('after 0 insert', dummyminutessuccesscount)
        setminutessucessdata(dummyminutessucessdata)
        setminutessuccesscount(succesres)
        setminutesPENDINGdata(dummyminutesPENDINGdata)
        setminutesPENDINGcount(pendingres)
        setminutesFAILEDdata(dummyminutesFAILEDdata)
        setminutesFAILEDcount(failedres)

        // console.log('sucessdata', dummyminutessucessdata)
        // console.log('successcount', dummyminutessuccesscount)
        // console.log('PENDINGdata', dummyminutesPENDINGdata)
        // console.log('PENDINGcount', dummyminutesPENDINGcount)
        // console.log('FAILEDdata', dummyminutesFAILEDdata)
        // console.log('FAILEDcount', dummyminutesFAILEDcount)
        // const dummyminutes = []
        // const dummycount = []
        // res.data.map((v) => {
        //   return dummyminutes.push(v.hour)

        // })
        // res.data.map((v) => {
        //   return dummycount.push(v.count)
        // })

        // console.log('minutestdata', dummyminutes, dummycount)
        // sethoursesdata(dummyminutes)
        // sethourscountdata(dummycount)
      }
    })
  }
  const dashboardgetByMerchantWisePgWiseSum = (todayfromdate, toDate) => {
    requestsApidata.getByMerchantWisePgWiseSum(todayfromdate, toDate, "SUCCESS").then(res => {
      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else {
        setgetByMerchantWisePgWiseSumdata(res.data)
        setgetByMerchantWisePgWiseSumUIBlock(false)
      }
    })
  }
  const getPgTypeAndCountByStatusAndDate = (todayfromdate, toDate) => {
    requestsApidata.getPgTypeAndCountByStatusAndDate(todayfromdate, toDate, "SUCCESS").then(res => {
      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else {

        // setBlock(false)
        // console.log('res.data', res.data)
        res.data.map((v) => {
          v.datefrom = todayfromdate
          v.todate = toDate
          v.status = "SUCCESS"
          // v.status = selectkycstatusvalue === "Select" ? "SUCCESS" : selectkycstatusvalue.value
          return v
        })
        setgetPgTypeAndCountByStatusdata(res.data)
        // console.log('res moddifi', res.data)
        setgetPgTypeAndCountUIBlock(false)
      }
    })
  }
  const getAllSumByPaymentOption = (fromdatae, todate) => {
    requestsApidata.getAllSumByPaymentOption(fromdatae, todate).then(res => {
      setamountoftranUIblock(false)
      // console.log('getAllSumByPaymentOption', res.data)
      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.successCode === "API_SUCCESS") {
        if (res.data.extraData.transactionDetails.length === 0) {
          setupitran(0)
          setupitrancount(0)
        } else {
          setupitran(res.data.extraData.transactionDetails[0].amt)
          setupitrancount(res.data.extraData.transactionDetails[0].cnt)
        }
      }
    })
  }
  const getLastTrxMerchList = (fromdate) => {
    setLastTrxMerchListUIBlock(true)
    requestsApidata.getLastTrxMerchList(fromdate).then(res => {
      setLastTrxMerchListUIBlock(false)
      if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else if (res.data.exception === "JWT_MISSING") {
        toast.error('Session Expired Login again!')
        history.push('/')
      } else {
        setLastTrxMerchListData(res.data)
      }
    })
  }
  const getPGWiseMerchantListHandler = (pguuid) => {
    setgetPGWiseMerchantListListUIBlock(true)
    requestsApidata.getPGWiseMerchantList(pguuid).then(res => {
      setgetPGWiseMerchantListListUIBlock(false)
      setgetPGWiseMerchantListListData(res.data)
    })
  }
  const totalamoutTXNresethandler = () => {
    setamountoftranUIblock(true)
    // getpayoptiontransaction(todayfromdate, toDate)
    getAllSumByPaymentOption(todayfromdate, toDate)
  }
  const selectpghadler = (e) => {
    setselecpguuidvalue(e)
    getPGWiseMerchantListHandler(e.value)
  }
  const minutesreportresethandler = () => {
    getminutescoutdata("SUCCESS")
    setselectkycstatusvalue('Select')
  }
  const Hourlycountresethandler = () => {
    gethourtransactiondata(todayfromdate, "SUCCESS")
    sethourlyselectkycstatusvalue('Select')
  }
  const MerchantWisePgWiseSumresetHandler = () => {
    setgetByMerchantWisePgWiseSumUIBlock(true)
    dashboardgetByMerchantWisePgWiseSum(todayfromdate, toDate)

  }
  const pgtyperesetHandler = () => {
    setgetPgTypeAndCountUIBlock(true)
    getPgTypeAndCountByStatusAndDate(todayfromdate, toDate)
  }
  const getTrxTopReport = () => {
    requestsApidata.getTrxTopReport().then((res) => {
      setgetTrxTopReportdata(res.data)
      setgetTrxTopReportUIBlock(false)
    })
  }
  const getTrxTopReportresetHandler = () => {
    setgetTrxTopReportUIBlock(true)
    getTrxTopReport()
  }
  const LastTrxMerchListDataresetHandler = () => {
    setLastTrxMerchListUIBlock(true)
    getLastTrxMerchList(todayfromdate)
  }
  const getpgwiseDataresetHandler = () => {
    getPGWiseMerchantListHandler(allpglistdata[0].pgUuid)
    setselecpguuidvalue('Select')
  }
  const getHourandStatusWiseCountAndDateAndSumresetHandler = () => {
    sethourstatuswisecontdateandsumUIBlock(true)
    requestsApidata.getHourandStatusWiseCountAndDateAndSum().then((res) => {
      sethourstatuswisecontdateandsum((res.data).reverse())
      sethourstatuswisecontdateandsumUIBlock(false)
    })
  }
  const payouthourResetHandler = () => {
    payoutgetHourandStatusWiseCountAndDatePayOut(todayfromdate, 'SUCCESS')
  }
  const payoutminuestdataResetHandler = () => {
    payoutgetStatusAndMinuteWiseCountPayOut('SUCCESS')
  }

  const allapiInUseEffect = (fromdatas, todates) => {
    setstatuscountuiblock(true)
    if (isMounted) {
      requestsApidata.getAllPGDetails().then((resaaaa) => {
        setallpglistdata(resaaaa.data)
        if (isMounted) {
          requestsApidata.dashboardgetStatusCount(fromdatas, todates).then((res) => {
            if (res.data.exception === null) {
              setstatuscoutdata([])
              setstatuscountuiblock(false)
            } else if (res.data.length === 0) {
              setstatuscountuiblock(false)
              setsuccesscountdata('0')
              setpendingcountdata('0')
              setfailedcountdata('0')
            } else {
              const count1 = res.data[0] === undefined ? "0" : res.data[0].count
              const count2 = res.data[1] === undefined ? "0" : res.data[1].count
              const count3 = res.data[2] === undefined ? "0" : res.data[2].count
              const totalcount = Number(count1) + Number(count2) + Number(count3)
              const successpercentage = (count1 * 100) / totalcount
              const pendingpercentage = (count2 * 100) / totalcount
              const failedpercentage = (count3 * 100) / totalcount

              const amount1 = res.data[0] === undefined ? "0" : res.data[0].amountSum
              const amount2 = res.data[1] === undefined ? "0" : res.data[1].amountSum
              const amount3 = res.data[2] === undefined ? "0" : res.data[2].amountSum
              const amounttotalcount = Number(amount1) + Number(amount2) + Number(amount3)
              const amountsuccesspercentage = (amount1 * 100) / amounttotalcount
              const amountpendingpercentage = (amount2 * 100) / amounttotalcount
              const amountfailedpercentage = (amount3 * 100) / amounttotalcount
              setstatuscoutdata(res.data)
              setstatuscountuiblock(false)
              res.data[0] === undefined ? amountsuccesspercentage.toFixed(2) : res.data[0].amountpercentage = amountsuccesspercentage.toFixed(2)
              res.data[1] === undefined ? amountpendingpercentage.toFixed(2) : res.data[1].amountpercentage = amountpendingpercentage.toFixed(2)
              res.data[2] === undefined ? amountfailedpercentage.toFixed(2) : res.data[2].amountpercentage = amountfailedpercentage.toFixed(2)

              res.data[0] === undefined ? successpercentage.toFixed(2) : res.data[0].countpercentage = successpercentage.toFixed(2)
              res.data[1] === undefined ? pendingpercentage.toFixed(2) : res.data[1].countpercentage = pendingpercentage.toFixed(2)
              res.data[2] === undefined ? failedpercentage.toFixed(2) : res.data[2].countpercentage = failedpercentage.toFixed(2)
              if (res.data[0] !== undefined) {
                if (res.data[0].status === "SUCCESS") {
                  setsuccesscountdata(res.data[0])
                }
              }

              if (res.data[1] !== undefined) {
                if (res.data[1].status === "SUCCESS") {
                  setsuccesscountdata(res.data[1])
                }
              }
              if (res.data[2] !== undefined) {
                if (res.data[2].status === "SUCCESS") {
                  setsuccesscountdata(res.data[2])
                }
              }

              if (res.data[0] !== undefined) {
                if (res.data[0].status === "PENDING") {
                  setpendingcountdata(res.data[0])
                }
              }

              if (res.data[1] !== undefined) {
                if (res.data[1].status === "PENDING") {
                  setpendingcountdata(res.data[1])
                }
              }
              if (res.data[2] !== undefined) {
                if (res.data[2].status === "PENDING") {
                  setpendingcountdata(res.data[2])
                }
              }

              if (res.data[0] !== undefined) {

                if (res.data[0].status === "FAILED") {
                  setfailedcountdata(res.data[0])
                }
              }
              if (res.data[1] !== undefined) {

                if (res.data[1].status === "FAILED") {
                  setfailedcountdata(res.data[1])
                }
              }
              if (res.data[2] !== undefined) {
                if (res.data[2].status === "FAILED") {
                  setfailedcountdata(res.data[2])
                }
              }
            }
            if (isMounted) {
              requestsApidata.getAllSumByPaymentOption(fromdatas, todates).then(resa => {
                setamountoftranUIblock(false)
                // console.log('getAllSumByPaymentOption', resa.data)
                if (resa.data.successCode === "API_SUCCESS") {
                  if (resa.data.extraData.transactionDetails.length === 0) {
                    setupitran(0)
                    setupitrancount(0)
                  } else {
                    setupitran(resa.data.extraData.transactionDetails[0].amt)
                    setupitrancount(resa.data.extraData.transactionDetails[0].cnt)
                  }
                }
                if (isMounted) {
                  requestsApidata.getStatusAndMinuteWiseCount().then(resb => {
                    setminutesreportUIBlock(false)
                    const dummyminutessucessdata = []
                    const dummyminutessuccesscount = []
                    const dummyminutesPENDINGdata = []
                    const dummyminutesPENDINGcount = []
                    const dummyminutesFAILEDdata = []
                    const dummyminutesFAILEDcount = []

                    const succesres = []
                    const failedres = []
                    const pendingres = []

                    resb.data.map((v) => {
                      if (v.status === "SUCCESS") {
                        dummyminutessucessdata.push(v.minutes)
                        dummyminutessuccesscount.push(v.cnt)
                        // succesres.push(v)
                      } else if (v.status === "PENDING") {
                        dummyminutesPENDINGdata.push(v.minutes)
                        dummyminutesPENDINGcount.push(v.cnt)
                        // pendingres.push(v)
                      } else if (v.status === "FAILED") {
                        dummyminutesFAILEDdata.push(v.minutes)
                        dummyminutesFAILEDcount.push(v.cnt)
                        // failedres.push(v)
                      }
                    })
                    // console.log(succesres, pendingres, failedres)
                    // console.log('dummyminutessucessdatalength', dummyminutessucessdata, dummyminutessuccesscount)

                    for (let i = 0; i <= 60; i++) {
                      // if (succesres[i])
                      let issuccess = false
                      let ispending = false
                      let isfailed = false

                      const curentvalueIndex = resb.data.filter((m => m.minutes === i.toString()))
                      if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "SUCCESS"))) {
                        // console.log('curentvalueIndex1', curentvalueIndex)
                        const founditem = curentvalueIndex.find((x => x.status === "SUCCESS"))
                        // succesres.push(curentvalueIndex[0].count)
                        succesres.push(founditem.cnt)
                        issuccess = true
                      }
                      if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "PENDING"))) {
                        // console.log('curentvalueIndex2', curentvalueIndex)
                        const founditem = curentvalueIndex.find((x => x.status === "PENDING"))
                        // succesres.push(curentvalueIndex[0].count)
                        pendingres.push(founditem.cnt)
                        ispending = true
                      }
                      if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "FAILED"))) {
                        // console.log('curentvalueIndex3', curentvalueIndex)
                        // failedres.push(curentvalueIndex[0].count)
                        const founditem = curentvalueIndex.find((x => x.status === "FAILED"))
                        // succesres.push(curentvalueIndex[0].count)
                        failedres.push(founditem.cnt)
                        isfailed = true
                      }
                      if (!issuccess) { succesres.push(0) }
                      if (!ispending) { pendingres.push(0) }
                      if (!isfailed) { failedres.push(0) }
                    }
                    setminutessucessdata(dummyminutessucessdata)
                    setminutessuccesscount(succesres)
                    setminutesPENDINGdata(dummyminutesPENDINGdata)
                    setminutesPENDINGcount(pendingres)
                    setminutesFAILEDdata(dummyminutesFAILEDdata)
                    setminutesFAILEDcount(failedres)

                    if (isMounted) {
                      requestsApidata.getHourandCountStatusAndDate(fromdatas).then(resc => {
                        sethourreportUIBlock(false)
                        const dummyhourlysucessdata = []
                        const dummyhourlysuccesscount = []
                        const dummyhourlyPENDINGdata = []
                        const dummyhourlyPENDINGcount = []
                        const dummyhourlyFAILEDdata = []
                        const dummyhourlyFAILEDcount = []

                        const succesres = []
                        const failedres = []
                        const pendingres = []

                        resc.data.map((v) => {
                          if (v.status === "SUCCESS") {
                            dummyhourlysucessdata.push(v.hour)
                            dummyhourlysuccesscount.push(v.count)
                          } else if (v.status === "PENDING") {
                            dummyhourlyPENDINGdata.push(v.hour)
                            dummyhourlyPENDINGcount.push(v.count)
                          } else if (v.status === "FAILED") {
                            dummyhourlyFAILEDdata.push(v.hour)
                            dummyhourlyFAILEDcount.push(v.count)
                          }
                        })

                        for (let i = 0; i <= 24; i++) {
                          let issuccess = false
                          let ispending = false
                          let isfailed = false

                          const curentvalueIndex = resc.data.filter((m => m.hour === i.toString()))
                          if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "SUCCESS"))) {
                            const founditem = curentvalueIndex.find((x => x.status === "SUCCESS"))
                            succesres.push(founditem.count)
                            issuccess = true
                          }
                          if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "PENDING"))) {
                            const founditem = curentvalueIndex.find((x => x.status === "PENDING"))
                            pendingres.push(founditem.count)
                            ispending = true
                          }
                          if (curentvalueIndex && curentvalueIndex.length && curentvalueIndex.find((x => x.status === "FAILED"))) {
                            const founditem = curentvalueIndex.find((x => x.status === "FAILED"))
                            failedres.push(founditem.count)
                            isfailed = true
                          }
                          if (!issuccess) { succesres.push(0) }
                          if (!ispending) { pendingres.push(0) }
                          if (!isfailed) { failedres.push(0) }
                        }
                        sethourlysucessdata(dummyhourlysucessdata)
                        sethourlysuccesscount(succesres)
                        sethourlyPENDINGdata(dummyhourlyPENDINGdata)
                        sethourlyPENDINGcount(pendingres)
                        sethourlyFAILEDdata(dummyhourlyFAILEDdata)
                        sethourlyFAILEDcount(failedres)

                        if (isMounted) {
                          requestsApidata.getByMerchantWisePgWiseSum(fromdatas, todates, "SUCCESS").then(resd => {
                            setgetByMerchantWisePgWiseSumdata(resd.data)
                            setgetByMerchantWisePgWiseSumUIBlock(false)
                            if (isMounted) {
                              requestsApidata.getPgTypeAndCountByStatusAndDate(fromdatas, todates, "SUCCESS").then(rese => {
                                rese.data.map((v) => {
                                  v.datefrom = todayfromdate
                                  v.todate = toDate
                                  v.status = "SUCCESS"
                                  return v
                                })
                                setgetPgTypeAndCountByStatusdata(rese.data)
                                setgetPgTypeAndCountUIBlock(false)
                                if (isMounted) {
                                  requestsApidata.getTrxTopReport().then((resf) => {
                                    setgetTrxTopReportdata(resf.data)
                                    setgetTrxTopReportUIBlock(false)
                                    if (isMounted) {
                                      requestsApidata.getLastTrxMerchList(fromdatas).then(resg => {
                                        setLastTrxMerchListUIBlock(false)
                                        setLastTrxMerchListData(resg.data)
                                        setgetPGWiseMerchantListListUIBlock(true)
                                        if (isMounted) {
                                          requestsApidata.getPGWiseMerchantList(resaaaa.data[0].pgUuid).then(res => {
                                            setgetPGWiseMerchantListListUIBlock(false)
                                            setgetPGWiseMerchantListListData(res.data)
                                            if (isMounted) {
                                              sethourstatuswisecontdateandsumUIBlock(true)
                                              requestsApidata.getHourandStatusWiseCountAndDateAndSum().then((res) => {
                                                sethourstatuswisecontdateandsum((res.data).reverse())
                                                sethourstatuswisecontdateandsumUIBlock(false)
                                                setpayoutmainbtndisabled(false)
                                              })
                                            }
                                          })
                                        }
                                      })
                                    }
                                  })
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  }
  const getLastTrxMerchListPayOutresetHandler = () => {
    setpayoutLastTrxMerchListUIBlock(true)
    getLastTrxMerchListPayOut(todayfromdate)
  }
  const getgetPgTypeAndCountByStatusAndDatePayOutresetHandler = () => {
    getgetPgTypeAndCountByStatusAndDatePayOut(todayfromdate, toDate, "SUCCESS")
  }

  useEffect(() => {
    // SessionRequestApidata.getAdminDetailsSessionCheck().then((res) => {
    //   console.log('res', res.data)
    //   if (res.data.successCode === "SESSION_ACTIVE") {
    //     if (isMounted === true) {
    //       allapiInUseEffect(todayfromdate, toDate)
    //     }
    //   } else {
    //     st.removeAll()
    //     history.push('/')
    //   }
    // })
    if (isMounted === true) {
      allapiInUseEffect(todayfromdate, toDate)
    }
    return () => {
      isMounted = false
    }
  }, [])
  const minutesycontgraphdata = {
    // labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],

    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"],
    //  labels:hourlysucessdata,
    datasets: [
      {
        label: "Success",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(225,0,0,0.4)",
        borderColor: "green", // The main line color
        borderCapStyle: 'square',
        borderDash: [], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "green",
        pointBackgroundColor: "green",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "green",
        pointHoverBorderColor: "green",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: true
        data: minutessuccesscount,
        spanGaps: true
      },
      {
        label: "Pending",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(167,105,0,0.4)",
        borderColor: "yellow",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "yellow",
        pointBackgroundColor: "yellow",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "brown",
        pointHoverBorderColor: "yellow",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: false
        data: minutesPENDINGcount,
        spanGaps: false
      },
      {
        label: "Failed",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(167,105,0,0.4)",
        borderColor: "red",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "red",
        pointBackgroundColor: "red",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "red",
        pointHoverBorderColor: "red",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: false
        data: minutesFAILEDcount,
        spanGaps: false
      }

    ]
  }
  const hourlycontgraphdata = {
    // labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],

    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
    //  labels:hourlysucessdata,
    datasets: [
      {
        label: "Success",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(225,0,0,0.4)",
        borderColor: "green", // The main line color
        borderCapStyle: 'square',
        borderDash: [], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "green",
        pointBackgroundColor: "green",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "green",
        pointHoverBorderColor: "green",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: true
        data: hourlysuccesscount,
        spanGaps: true
      },
      {
        label: "Pending",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(167,105,0,0.4)",
        borderColor: "yellow",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "white",
        pointBackgroundColor: "yellow",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "brown",
        pointHoverBorderColor: "yellow",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: false
        data: hourlyPENDINGcount,
        spanGaps: false
      },
      {
        label: "Failed",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(167,105,0,0.4)",
        borderColor: "red",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "white",
        pointBackgroundColor: "red",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "brown",
        pointHoverBorderColor: "yellow",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: false
        data: hourlyFAILEDcount,
        spanGaps: false
      }

    ]
  }
  const LastTrxMerchListcoloum = [
    {
      name: 'MerchantId',
      selector: 'merchant_id',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Amount',
      selector: 'amt',
      sortable: true,
      cell: v => <span>₹{Number(v.amt).toFixed(2)}</span>
    },
    {
      name: 'Time',
      selector: 'last_trxn',
      sortable: true,
      minWidth: '150px'
    }
  ]
  const payoutminutesycontgraphdata = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"],
    datasets: [
      {
        label: "Success",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(225,0,0,0.4)",
        borderColor: "green", // The main line color
        borderCapStyle: 'square',
        borderDash: [], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "green",
        pointBackgroundColor: "green",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "green",
        pointHoverBorderColor: "green",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        data: payoutMINUTESysuccesscount,
        spanGaps: true
      },
      {
        label: "Pending",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(167,105,0,0.4)",
        borderColor: "yellow",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "yellow",
        pointBackgroundColor: "yellow",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "brown",
        pointHoverBorderColor: "yellow",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        data: payoutMINUTESyPENDINGcount,
        spanGaps: false
      },
      {
        label: "Failure",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(167,105,0,0.4)",
        borderColor: "red",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "red",
        pointBackgroundColor: "red",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "red",
        pointHoverBorderColor: "red",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        data: payoutMINUTESyFAILEDcount,
        spanGaps: false
      }

    ]
  }

  const payouthourlycontgraphdata = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
    datasets: [
      {
        label: "Success",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(225,0,0,0.4)",
        borderColor: "green", // The main line color
        borderCapStyle: 'square',
        borderDash: [], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "green",
        pointBackgroundColor: "green",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "green",
        pointHoverBorderColor: "green",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        data: payouthourlysuccesscount,
        spanGaps: true
      },
      {
        label: "Pending",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(167,105,0,0.4)",
        borderColor: "yellow",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "white",
        pointBackgroundColor: "yellow",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "brown",
        pointHoverBorderColor: "yellow",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        data: payouthourlyPENDINGcount,
        spanGaps: false
      },
      {
        label: "Failure",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(167,105,0,0.4)",
        borderColor: "red",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "white",
        pointBackgroundColor: "red",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "brown",
        pointHoverBorderColor: "yellow",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        data: payouthourlyFAILEDcount,
        spanGaps: false
      }

    ]
  }

  const payoutLastTrxMerchListcoloum = [
    {
      name: 'MerchantId',
      selector: 'merchantId',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Amount',
      selector: 'amt',
      sortable: true,
      cell: v => <span>₹{Number(v.amt).toFixed(2)}</span>
    },
    {
      name: 'Time',
      selector: 'last_trxn',
      sortable: true,
      minWidth: '150px'
    }
  ]

  const hourstatuswisecontdateandsumColumns = [
    {
      name: 'Hour',
      selector: 'hour',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Amount',
      selector: 'amount',
      sortable: true,
      cell: v => <span>₹{Number(v.amount).toFixed(2)}</span>
    },
    {
      name: 'Transaction Count',
      selector: 'count',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'Status',
      // selector: 'amount',
      sortable: true,
      cell: v => <Badge color={v.status === "SUCCESS" ? "success" : v.status === "PENDING" ? "warning" : "danger"}>{v.status}</Badge>
    }
  ]
  const getTrxTopReportcolumns = [
    {
      name: 'MerchantId',
      selector: 'merchantId',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Amount',
      selector: 'amount',
      sortable: true,
      cell: v => <span>₹{(v.amount) / 100}</span>
    },
    {
      name: 'OrderID',
      selector: 'orderID',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Merchant OrderID',
      selector: 'merchantOrderId',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Payoption',
      selector: 'paymentOption',
      sortable: true
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      cell: v => <Badge color={v.status === "SUCCESS" ? "success" : v.status === "PENDING" ? "warning" : "danger"}>{v.status}</Badge>
    },
    {
      name: 'Created',
      selector: 'created',
      sortable: true
    }
  ]
  const pgwisesumcolumns = [
    {
      name: 'MerchantId',
      selector: 'merchantId',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Merchant Name',
      selector: 'merchantName',
      sortable: true
    },
    {
      name: 'Company Name',
      selector: 'companyName',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'PG Type',
      selector: 'pgType',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Total Amount',
      selector: 'totalAmt',
      sortable: true,
      cell: v => <span>₹{Number(v.totalAmt).toFixed(2)}</span>
    },
    {
      name: 'Number Of Transaction',
      selector: 'cnt',
      sortable: true
    }
    // {
    //   name: 'Cust Order ID',
    //   selector: 'custOrderId',
    //   sortable: true
    // }
    // {
    //   name: 'VPA UPI',
    //   selector: 'vpaUPI',
    //   sortable: true,
    //   minWidth: '150px'
    // }
  ]
  const pgtypecolumns = [
    {
      name: 'PG Type',
      selector: 'pg_type',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Total Amount',
      selector: 'totalAmt',
      sortable: true,
      minWidth: '150px',
      cell: v => <span>₹{Number(v.totalAmt).toFixed(2)}</span>
    },
    {
      name: 'Number Of Transaction',
      selector: 'cnt',
      sortable: true
    },
    // {
    //   name: 'Date From',
    //   selector: 'datefrom',
    //   sortable: true
    // },
    // {
    //   name: 'Date To',
    //   selector: 'todate',
    //   sortable: true
    // },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      cell: v => <Badge color={v.status === "SUCCESS" ? "success" : v.status === "PENDING" ? "warning" : "danger"}>{v.status}</Badge>
    }
    // {
    //   name: 'Cust Order ID',
    //   selector: 'custOrderId',
    //   sortable: true
    // }
    // {
    //   name: 'VPA UPI',
    //   selector: 'vpaUPI',
    //   sortable: true,
    //   minWidth: '150px'
    // }
  ]
  const getPGWiseMerchantListcoloumns = [
    {
      name: 'Merchant Name',
      selector: 'merchantName',
      sortable: true,
      minWidth: '250px'
    },
    {
      name: 'Merchant Id',
      selector: 'merchantId',
      sortable: true,
      minWidth: '150px'
      // cell: v => <span>₹{Number(v.totalAmt).toFixed(2)}</span>
    },
    {
      name: 'Service',
      selector: 'service',
      sortable: true
    },
    {
      name: 'User Status',
      selector: 'userStatus',
      sortable: true,
      cell: v => <Badge color={v.userStatus === "ACTIVE" ? "success" : v.userStatus === "PENDING" ? "warning" : "danger"}>{v.userStatus}</Badge>
    }
  ]
  const payoutpgtypecolumns = [
    {
      name: 'PG Name',
      selector: 'pgname',
      sortable: true
    },
    {
      name: 'Transaction Type',
      selector: 'transactionType',
      sortable: true
    },
    {
      name: 'Amount',
      selector: 'totalAmt',
      sortable: true,
      // minWidth: '250px',
      cell: v => <span>₹{Number(v.totalAmt).toFixed(2)}</span>
    },
    {
      name: 'Count',
      selector: 'cnt',
      sortable: true
      // minWidth: '250px'
    },
    {
      name: 'Transaction Status',
      selector: 'transactionStatus',
      sortable: true
      // minWidth: '250px'
    }
  ]

  return (
    <div id='dashboard-ecommerce'>
      <div>
        <Row>
          <Col lg={{ span: '2', offset: '3' }}>
            <div style={{ padding: 10 }}>
              <ButtonGroup className='dashboadfiltermainbutton'>
                <Button className="dashbardadmin" color='primary' onClick={rSelectedHadnler} id="payin" active={rSelected === 'payin'}>
                  Payin Report
                </Button>
                <Button className="dashbardadmin" color='primary' onClick={rSelectedHadnler} id="payout" active={rSelected === 'payout'} disabled={payoutmainbtndisabled}>
                  Payout Report
                </Button>
              </ButtonGroup>
              {/* <CardText>Selected: {rSelected}</CardText> */}
            </div>
          </Col>
        </Row>
      </div>
      {rSelected === 'payin' ? <div>
        <UILoader blocking={statuscountuiblock}>
          <Row className='match-height'>
            <Col xl='4' md='6' xs='12'>
              <Card className='card-congratulations-medal'>
                <CardBody>
                  <h5>Status:<span style={{ fontWeight: 'bold', color: "#28c76f" }}>SUCCESS</span></h5>
                  <CardText className='font-small-6'>Today Count of Transaction:
                    <a>
                      {successcountdata === "0" ? "0" : successcountdata.count}
                    </a>
                  </CardText>
                  <h6>
                    Success Count Percentage: {successcountdata === "0" ? "0" : `${(successcountdata.countpercentage)}%`}
                  </h6>
                </CardBody>
              </Card>
            </Col>
            <Col xl='4' md='6' xs='12'>
              <Card className='card-congratulations-medal'>
                <CardBody>
                  <h5>Status:<span style={{ fontWeight: 'bold', color: "#ff9f43" }}>PENDING</span></h5>

                  <CardText className='font-small-6'>Today Count of Transaction:
                    <a>
                      {pendingcountdata === '0' ? "0" : pendingcountdata.count}
                    </a>
                  </CardText>
                  <h6>
                    Pending Count Percentage:{pendingcountdata === "0" ? "0" : `${(pendingcountdata.countpercentage)}%`}
                  </h6>
                </CardBody>
              </Card>
            </Col>
            <Col xl='4' md='6' xs='12'>
              <Card className='card-congratulations-medal'>
                <CardBody>
                  <h5>Status:<span style={{ fontWeight: 'bold', color: "#ea5455" }}>Failed</span></h5>

                  <CardText className='font-small-6'>Today Count of Transaction:
                    <a>
                      {failedcountdata === "0" ? "0" : failedcountdata.length === 0 ? "0" : failedcountdata.count}
                    </a>
                  </CardText>
                  <h6>
                    Failed Count Percentage: {failedcountdata === "0" ? "0" : failedcountdata.length === 0 ? "0" : `${(failedcountdata.countpercentage)}%`}
                  </h6>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </UILoader>

        <Row className='match-height'>
          <Col lg='12' md='12'>
            <Row className='match-height'>
              <Col xl='6' md='6' xs='12'>


                <RadarChart labelColor='#6e6b7b' tooltipShadow='rgba(0, 0, 0, 0.25)'
                  successColorShade='#28dac6'
                  warningLightColor='#FDAC34' primary="green"
                  gridLineColor='rgba(200, 200, 200, 0.2)'
                  upitran={upitran === null ? "0" : upitran}
                  wallettran={wallettran === null ? "0" : wallettran}
                  cardtran={cardtran === null ? "0" : cardtran}
                  nbtran={nbtran === null ? "0" : nbtran}
                  amountoftranUIblock={amountoftranUIblock}
                  totalamoutTXNresethandler={totalamoutTXNresethandler}
                  upitrancount={upitrancount}
                />

              </Col>
              <Col lg='6' md='6' xs='12'>
                <Card>
                  <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
                    <CardTitle tag='h1'>Today Transaction Report Minutewise and Status
                    </CardTitle>
                    <CardTitle tag='h4'>
                      <Badge color='primary' onClick={minutesreportresethandler}>Reset</Badge>
                    </CardTitle>
                    <div className='d-flex align-items-center'>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <UILoader blocking={minutesreportUIBlock}>
                      <div style={{ height: '400px' }}>
                        <Line data={minutesycontgraphdata} />
                      </div>
                    </UILoader>
                  </CardBody>
                </Card>

              </Col>

            </Row>
          </Col>

        </Row>
        <Row className='match-height'>
          <Col lg='6' md='6' xs='12'>
            <Card>
              <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
                <CardTitle tag='h1'>Today Transaction Report Hourly, count Status
                </CardTitle>
                <CardTitle tag='h4'>
                  <Badge color='primary' onClick={Hourlycountresethandler}>Reset</Badge>
                </CardTitle>
                <div className='d-flex align-items-center'>
                </div>
              </CardHeader>
              <CardBody>
                <UILoader blocking={hourreportUIBlock}>
                  <div style={{ height: '400px' }}>
                    <Line data={hourlycontgraphdata} />
                  </div>
                </UILoader>
              </CardBody>
            </Card>
          </Col>
          <Col lg='6'>
            <UILoader blocking={getByMerchantWisePgWiseSumUIBlock}>
              <DataTableWithButtons coloumnsprops={pgwisesumcolumns} data={getByMerchantWisePgWiseSumdata}
                MerchantWisePgWiseSumresetHandler={MerchantWisePgWiseSumresetHandler}
                isaddreset
                routename="Transaction Report MerchantWise, PgWise Sum" />
            </UILoader>


          </Col>
        </Row>
        <Row>

          <Col lg='6'>
            <UILoader blocking={getPgTypeAndCountUIBlock}>
              <DataTableWithButtons coloumnsprops={pgtypecolumns} data={getPgTypeAndCountByStatusdata}
                pgtyperesetHandler={pgtyperesetHandler}
                isaddreset2
                routename="Transaction Report PG Type and Count by Status" />
            </UILoader>
          </Col>
          <Col lg='6'>
            <UILoader blocking={getTrxTopReportUIBlock}>
              <DataTableWithButtons coloumnsprops={getTrxTopReportcolumns} data={getTrxTopReportdata}
                pgtyperesetHandler={getTrxTopReportresetHandler}
                isaddreset2
                routename="Top Transaction Report" />
            </UILoader>
          </Col>
        </Row>
        <Row>
          <Col lg='6'>
            <UILoader blocking={LastTrxMerchListUIBlock}>
              <DataTableWithButtons coloumnsprops={LastTrxMerchListcoloum} data={LastTrxMerchListData}
                pgtyperesetHandler={LastTrxMerchListDataresetHandler}
                isaddreset2
                routename="Merchant Last Transaction List" />
            </UILoader>
          </Col>

          <Col lg='6'>
            <UILoader blocking={getPGWiseMerchantListListUIBlock}>
              {/* {console.log('pglistoption', pglistoption)} */}
              <DataTableWithButtons coloumnsprops={getPGWiseMerchantListcoloumns} data={getPGWiseMerchantListListData}
                pgtyperesetHandler={getpgwiseDataresetHandler}
                isaddreset2
                pglistoption={pglistoption[0]}
                selectpghadler={selectpghadler}
                selecpguuidvalue={selecpguuidvalue}
                isaddpgselect
                routename="PG Wise Merchant List" />
            </UILoader>
          </Col>
        </Row>
        <Row>
          <Col lg='6'>
            <UILoader blocking={hourstatuswisecontdateandsumUIBlock}>
              <DataTableWithButtons coloumnsprops={hourstatuswisecontdateandsumColumns} data={hourstatuswisecontdateandsum}
                pgtyperesetHandler={getHourandStatusWiseCountAndDateAndSumresetHandler}
                isaddreset2
                routename="Hourly Transaction Sum data" />
            </UILoader>


          </Col>
        </Row>
      </div> : <div>

        {/* {payoutstatuscountdata.map((v) => {
            return <Col xl='4' md='6' xs='12'>
              <Card className='card-congratulations-medal'>
                <CardBody>
                  <h5>Status:<span style={{ fontWeight: 'bold', color: v.status === "SUCCESS" ? "#28c76f" : v.status === "PENDING" ? "#ff9f43" : "#ea5455" }}>{v.status}</span></h5>

                  <CardText className='font-small-6'>Today Count of Transaction:
                    <a>
                      {v.count}
                    </a>
                  </CardText>
                  <Badge color={v.status === "SUCCESS" ? "success" : v.status === "PENDING" ? "warning" : "danger"}>Amount: ₹
                    {
                      Number(v.amountSum).toFixed(2)
                    }</Badge>
                </CardBody>
              </Card>
            </Col>
          })} */}
        <UILoader blocking={payoutstatuscountuiblock}>
          <Row className='match-height'>
            <Col xl='3' md='6' xs='12'>
              <Card className='card-congratulations-medal'>
                <CardBody>
                  <h5>Status:<span style={{ fontWeight: 'bold', color: "#28c76f" }}>SUCCESS</span></h5>
                  <CardText className='font-small-6'>Today Count of Transaction:
                    <a>
                      {payoutsuccesscountdata === "0" ? "0" : payoutsuccesscountdata.count}
                    </a>
                  </CardText>
                  <h6>
                    {/* Success Count Percentage: {payoutsuccesscountdata === "0" ? "0" : `${(payoutsuccesscountdata.countpercentage)}%`} */}
                    Success Count Percentage: {payoutsuccesscountdata === "0" ? "0" : payoutsuccesscountdata.length === 0 ? "0" : `${(payoutsuccesscountdata.countpercentage)}%`}

                  </h6>
                </CardBody>
              </Card>
            </Col>
            <Col xl='3' md='6' xs='12'>
              <Card className='card-congratulations-medal'>
                <CardBody>
                  <h5>Status:<span style={{ fontWeight: 'bold', color: "#ff9f43" }}>PENDING</span></h5>

                  <CardText className='font-small-6'>Today Count of Transaction:
                    <a>
                      {payoutpendingcountdata === '0' ? "0" : payoutpendingcountdata.count}
                    </a>
                  </CardText>
                  <h6>
                    {/* Pending Count Percentage:{payoutpendingcountdata === "0" ? "0" : `${(payoutpendingcountdata.countpercentage)}%`} */}
                    Pending Count Percentage: {payoutpendingcountdata === "0" ? "0" : payoutpendingcountdata.length === 0 ? "0" : `${(payoutpendingcountdata.countpercentage)}%`}

                  </h6>
                </CardBody>
              </Card>
            </Col>
            <Col xl='3' md='6' xs='12'>
              <Card className='card-congratulations-medal'>
                <CardBody>
                  <h5>Status:<span style={{ fontWeight: 'bold', color: "#ea5455" }}>FAILURE</span></h5>

                  <CardText className='font-small-6'>Today Count of Transaction:
                    <a>
                      {payoutfailedcountdata === "0" ? "0" : payoutfailedcountdata.length === 0 ? "0" : payoutfailedcountdata.count}
                    </a>
                  </CardText>
                  <h6>
                    Failure Count Percentage: {payoutfailedcountdata === "0" ? "0" : payoutfailedcountdata.length === 0 ? "0" : `${(payoutfailedcountdata.countpercentage)}%`}
                  </h6>
                </CardBody>
              </Card>
            </Col>

            <Col xl='3' md='6' xs='12'>
              <Card className='card-congratulations-medal'>
                <CardBody>
                  <h5>Status:<span style={{ fontWeight: 'bold', color: "blue" }}>REVERSED</span></h5>

                  <CardText className='font-small-6'>Today Count of Transaction:
                    <a>
                      {payoutREVERSEDcountdata === "0" ? "0" : payoutREVERSEDcountdata.length === 0 ? "0" : payoutREVERSEDcountdata.count}
                    </a>
                  </CardText>
                  <h6>
                    Reversed Count Percentage: {payoutREVERSEDcountdata === "0" ? "0" : payoutREVERSEDcountdata.length === 0 ? "0" : `${(payoutREVERSEDcountdata.countpercentage)}%`}
                  </h6>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </UILoader>
        <Row>
          <Col lg='6'>
            <UILoader blocking={payoutLastTrxMerchListUIBlock}>
              <DataTableWithButtons coloumnsprops={payoutLastTrxMerchListcoloum} data={payoutgetLastTrxMerchList}
                pgtyperesetHandler={getLastTrxMerchListPayOutresetHandler}
                isaddreset2
                routename="Merchant Last Transaction List" />
            </UILoader>
          </Col>

          <Col lg='6'>
            <UILoader blocking={payoutPgTypeAndCountByStatusAndDateUIBlock}>
              <DataTableWithButtons coloumnsprops={payoutpgtypecolumns} data={payoutPgTypeAndCountByStatusAndDateList}
                pgtyperesetHandler={getgetPgTypeAndCountByStatusAndDatePayOutresetHandler}
                isaddreset2
                routename="Transaction Report PG Type and Count by Status" />
            </UILoader>
          </Col>
        </Row>
        <Row className='match-height'>
          <Col lg='6' md='6' xs='12'>
            <Card>
              <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
                <CardTitle tag='h1'>Today Transaction Report Hourly, count Status
                </CardTitle>
                <CardTitle tag='h4'>
                  <Badge color='primary' onClick={payouthourResetHandler}>Reset</Badge>
                </CardTitle>
                <div className='d-flex align-items-center'>
                </div>
              </CardHeader>
              <CardBody>
                <UILoader blocking={payouthourreportUIBlock}>
                  <div style={{ height: '400px' }}>
                    <Line data={payouthourlycontgraphdata} />
                  </div>
                </UILoader>
              </CardBody>
            </Card>
          </Col>
          <Col lg='6' md='6' xs='12'>
            <Card>
              <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
                <CardTitle tag='h1'>Today Transaction Report Minutewise and Status
                </CardTitle>
                <CardTitle tag='h4'>
                  <Badge color='primary' onClick={payoutminuestdataResetHandler}>Reset</Badge>
                </CardTitle>
                <div className='d-flex align-items-center'>
                </div>
              </CardHeader>
              <CardBody>
                <UILoader blocking={paoutminutsdataUIblock}>
                  <div style={{ height: '400px' }}>
                    <Line data={payoutminutesycontgraphdata} />
                  </div>
                </UILoader>
              </CardBody>
            </Card>

          </Col>
        </Row>
      </div>
      }
    </div>
  )
}

export default EcommerceDashboard
