import { Row, Col, Card, CardHeader, Label, CardTitle, CardBody, Media, ButtonGroup, Button, CardText } from 'reactstrap'
import { Fragment, useState, forwardRef, useEffect } from 'react'
import moment from "moment"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Select from 'react-select'

const monthlytransaction = () => {
    const [startDate, setstartDate] = useState('')
    const [searchStartDate, setsearchStartDate] = useState('')
    const [endDate, setendDate] = useState('') 
    const [searchEndDate, setsearchEndDate] = useState('') 
    const searchStartdatehandle = (e) => {
        setstartDate(e)
        setsearchStartDate(moment(e, "DDMMYYYY").format("YYYY-MM-DD"))
          }
        const  searchEnddatehandle = (e) => {
            if (startDate === "") {
              alert("Kindly first select start date")
            } else  {
              setendDate(e)
        setsearchEndDate(moment(e, "DDMMYYYY").format("YYYY-MM-DD"))
            }
          }
          const requestypeOption = [{ value: 'SELF', label: 'SELF' }]
          const paymenttypeoption = [{ value: 'ALL', label: 'ALL' }]

    return (
  <div>
            <Row>
        <Col lg="3"><div>
          <Label>Date From</Label>
          <br />
            <DatePicker
              className="form-control w-100"
              selected={startDate}
              onChange={searchStartdatehandle}
              peekNextMonth
              showMonthDropdown
              placeholderText="Date From"
              maxDate={new Date()}
              onKeyDown={(e) => {
                e.preventDefault()
             }}
            />
          </div></Col>
        <Col lg="3"><div>
        <Label>Date To</Label>
        <br />
            <DatePicker
              className="form-control w-100"
              selected={endDate}
              onChange={searchEnddatehandle}
              peekNextMonth
              showMonthDropdown
              // showYearDropdown
              placeholderText="Range To"
              minDate={startDate}
              maxDate={new Date()}
              onKeyDown={(e) => {
                e.preventDefault()
             }}
            />
          </div></Col>
        <Col lg="3"><div>
        <Label>Transaction Type</Label>
        <Select
              // theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              defaultValue={requestypeOption[0]}
              name='transactiontype'
              id='transactiontype'
              options={requestypeOption}
              isClearable
              // onChange={handleChange}
            />
          </div></Col>
        <Col lg="3"><div>
        <Label>Payment Method</Label>
        <Select
              // theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              defaultValue={paymenttypeoption[0]}
              name='paymenttypeoption'
              id='paymenttypeoption'
              options={paymenttypeoption}
              isClearable
              // onChange={handleChange}
            />
          </div></Col>
        
        </Row>
  </div>
    )
  }
  export default monthlytransaction