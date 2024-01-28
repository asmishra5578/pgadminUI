import { Fragment, useState, useEffect } from 'react'
import classnames from 'classnames'
import Updatebankdetails from './updatebankdetails'
import { useForm, Controller } from 'react-hook-form'
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert, Form, CardText} from 'reactstrap'
import requestsApi from './request'
import AppCollapse from '@components/app-collapse'
import { toast } from 'react-toastify'
import Spinner from '@components/spinner/Loading-spinner'

const requestsApidata = new requestsApi()

const GeneralTabs = ({ data }) => {
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

  const [avatar, setAvatar] = useState(data.avatar ? data.avatar : '')
  const [ProfileDetails, SetProfileDetails] = useState([])
  const [modal, setModal] = useState(false)
  const [createcomplainvalue, setcrecompalinvalue] = useState('')
  const [complainsubtypevalue, setcomplainsubtypevalue] = useState('')
  const [btndisable, setbtndisable] = useState(false)
  const handleModal = () => setModal(!modal)
 
  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }
  // const updatebankdetailshandler = (data) => {
  //   console.log("updatebankdetailshandler", data)
  //   requestsApidata.updatebankdetails(data).then(res => {
  //     console.log("updatebankdetailshandler resonse", res.data)
  //   })
  // }
  const onSubmit = data => trigger()
  useEffect(() => {
    requestsApidata.complaintDetails().then(res => {
      console.log("complaintDetails resonse", res.data)
      SetProfileDetails(res.data)
    })
  }, [])
  const createcomplainthandler = (e) => {
    setcrecompalinvalue(e.target.value)
  }
  const complainsubtypevalueHandler = (e) => {
    setcomplainsubtypevalue(e.target.value)
  }
 const submitcretecomplaint = () => {
   console.log("craeet complint type", createcomplainvalue)
   if (createcomplainvalue === "") {
     toast.error('Complaint Type can not be empty')
   } else if (complainsubtypevalue === "") {
    toast.error('Complaint SubType can not be empty')
   } else {
     setbtndisable(true)
    //  console.log("datatatat", createcomplainvalue, complainsubtypevalue)
    requestsApidata.createComplaintType(createcomplainvalue).then(res => {
      // console.log("createComplaintType resonse", res.data)
        if (res.data.exception === "COMPLAINT_TYPE_EXISTS") {
          toast.warning('The mentioned complaint type already present in system')
         setbtndisable(false)
        } else if (res.data.status === "ACTIVE") {
          // toast.success('Complaint Type Created Successfully')
          // setcrecompalinvalue('')
          requestsApidata.createComplaintSubType(createcomplainvalue, complainsubtypevalue).then(response => {
            // console.log("subtype resonse", response.data)
            if (response.data.status === "ACTIVE") {
              requestsApidata.updateComplaintType(createcomplainvalue, "ACTIVE").then(response => {
              })
              requestsApidata.updateComplaintSubType(createcomplainvalue, "ACTIVE", complainsubtypevalue).then(response => {
                if (response.data.status === "ACTIVE") {
                  toast.success('Complaint Type Created and Updated Successfully')
                  setcrecompalinvalue('')
                  setcomplainsubtypevalue('')
                  setbtndisable(false)
                }
              })
            } else {
             toast.warning('Server Error try again!')
             setbtndisable(false)
            }
          })
        }
    })
  }
}
  const accordingdata = [
    {
      title: 'Create Complaint Type',
      content: (
       <div>
         <Row>
           <Col lg="4">
             <Label>Enter Complaint Type</Label>
         <Input type="text" placeholder="EX:LOGIN_ISSUE" value={createcomplainvalue}  onChange={createcomplainthandler}/>
           </Col>
           <Col lg="4">
           <Label>Enter Complaint SubType</Label>
        <Input type="text" placeholder="EX:PASSWORD_ISSUE" value={complainsubtypevalue} onChange={complainsubtypevalueHandler}/>
          </Col>
           <Col lg="2">
             <div style={{marginTop:23}}>
          <Button color="primary" onClick={submitcretecomplaint} disabled={btndisable}>Submit</Button>
             </div>
           </Col>
         </Row>
       </div>
      )
    },
    {
      title: 'Update Ticket',
      content: (
     <div>
       {ProfileDetails.length === 0 ? "Nodata" : ""}
     </div>
      )
    }
  ]
  return (
    <Fragment>
       <AppCollapse data={accordingdata} type='margin' accordion />
    </Fragment>
  )
}

export default GeneralTabs
