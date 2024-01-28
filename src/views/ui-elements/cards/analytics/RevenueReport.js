import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Card,
  CardTitle,
  Row,
  Col,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap'
import Chart from 'react-apexcharts'
import Datatablecomponent from '../../../../layouts/components/Datatablecomponent'

const RevenueReport = (getAllTopMerchantTxndata) => {
  // const [data, setData] = useState(null
  console.log('getAllTopMerchantTxndata', getAllTopMerchantTxndata)
 const columns = [
    {
        name: 'MerchantId',
        selector: 'merchantId',
        sortable: true,
        minWidth: '130px'
      },
      {
        name: 'PG Id',
        selector: 'pgId',
        sortable: true,
        minWidth: '250px'
      },
        {
          name: 'Payment Option',
          selector: 'paymentOption',
          sortable: true
        },
    {
      name: 'Amount',
      selector: 'amount',
      sortable: true
    },
  
    {
      name: 'Order ID',
      selector: 'orderID',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'PG Type',
      selector: 'pgType',
      sortable: true
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Merchant Order ID',
      selector: 'merchantOrderId',
      minWidth: '200px'
    },
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
    {
      name: 'Created At',
      selector: 'createdAt',
      sortable: true,
      minWidth: '250px'
    }
  ]
  return   <Card className='card-revenue-budget'>
           <Datatablecomponent data={getAllTopMerchantTxndata.getAllTopMerchantTxndata} ispageperdata coloumnsprops={columns} routename="Top Merchant Transaction" />

    </Card>
}

export default RevenueReport
