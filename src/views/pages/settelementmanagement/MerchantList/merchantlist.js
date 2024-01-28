import { columns } from './data'
import Datatablecomponent from './datatablecomponent'
import requestsApi from '../request'
import { Fragment, useState, forwardRef, useEffect } from 'react'

const requestsApidata = new requestsApi()

const Home = () => {
  const [block, setBlock] = useState(true)
  const [data, setdata] = useState([])
  // useEffect(() => {
  //   requestsApidata.allMerchantDetailsReport().then(res => {
  //       setdata(res.data)
  //   setBlock(false)
  //     })
  // }, [])
    return (
      <div>
        {/* <h1></h1> */}
        <Datatablecomponent  coloumnsprops={columns} data={data} />
      </div>
    ) 
  }
  export default Home