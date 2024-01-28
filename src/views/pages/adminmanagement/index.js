import { Fragment } from "react"
// import NodalTransfer from "./nodaltransfer"
import AppCollapse from '@components/app-collapse'
import { Input, Row, Col, Form, FormGroup, Label } from "reactstrap"
import Button from "reactstrap/lib/Button"
import Select from 'react-select'

const fraudmanage = () => {
  const requestypeOption = [
    { value: 'INDIA', label: 'INDIA' },
    { value: 'NEPAL', label: 'NEPAL' },
    { value: 'AUST', label: 'NEPAL' }
  ]
  const cardrangefrom = [
    { value: '1000', label: '1000' },
    { value: '2000', label: '2000' },
    { value: '3000', label: '3000' }
  ]
  const cardrangeto = [
    { value: '2000', label: '2000' },
    { value: '3000', label: '3000' },
    { value: '4000', label: '4000' }
  ]
//   return (
//     <Fragment>
//       {/* <Breadcrumbs
//         breadCrumbTitle="Merchant Details"
//         breadCrumbParent="PG"
//         breadCrumbActive="Merchant Details"
//       /> */}
//       <Row className="match-height">
//         <Col lg="12" md="12">
//           <NodalTransfer />
//         </Col>
//       </Row>
//     </Fragment>
//   )

const accordingdata = [
    {
      title: 'Block IP Address',
      content: (
       <div>
         <Row>
           <Col lg="3">
           <Form>
        <FormGroup>
           <Label>Enter IP Address</Label>
          <Input
              id='ipaddress'
              name='ipaddress'
              placeholder='IP Address'
            />
        </FormGroup>
        </Form>
           </Col>
           <Col lg="3">
             <div style={{marginTop:22}}>
             <Button color="primary">Block IP</Button>
             </div>
            
           </Col>
         </Row>
       </div>
      )
    },
    {
      title: 'White List IP address',
      content: (
        <div>
        <Row>
          <Col lg="3">
          <Form>
       <FormGroup>
          <Label>Enter IP Address</Label>
         <Input
             id='ipaddress'
             name='ipaddress'
             placeholder='IP Address'
           />
       </FormGroup>
       </Form>
          </Col>
          <Col lg="3">
            <div style={{marginTop:22}}>
            <Button color="primary">White List IP</Button>
            </div>
           
          </Col>
        </Row>
      </div>
      )
    },
    {
        title: 'Block Issuer Countries',
        content: (
         <div>
             <Row>
          <Col lg="3">
           <Label for='selectcountryblock'>Select Country</Label>
            <Select
              // theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              defaultValue={requestypeOption[0]}
              name='selectcountryblock'
              id='selectcountryblock'
              options={requestypeOption}
              isClearable
              // onChange={handleChange}
            />
            </Col>
            <Col lg="3">
            <div style={{marginTop:22}}>
            <Button color="primary">Submit</Button>
            </div>
           
          </Col>
        </Row>
         </div>
        )
      },
      {
        title: 'Block User Country',
        content: (
          <div>
          <Row>
       <Col lg="3">
        <Label for='selectcountryblock'>Select Country</Label>
         <Select
           // theme={selectThemeColors}
           className='react-select'
           classNamePrefix='select'
           defaultValue={requestypeOption[0]}
           name='selectcountryblock'
           id='selectcountryblock'
           options={requestypeOption}
           isClearable
           // onChange={handleChange}
         />
         </Col>
         <Col lg="3">
         <div style={{marginTop:22}}>
         <Button color="primary">Submit</Button>
         </div>
        
       </Col>
     </Row>
      </div>
        )
      },
      {
        title: 'Block Email addresses',
        content: (
          <div>
          <Row>
            <Col lg="3">
            <Form>
         <FormGroup>
            <Label>Enter Email Address</Label>
           <Input
               id='blockemail'
               name='blockemail'
               placeholder='Email'
             />
         </FormGroup>
         </Form>
            </Col>
            <Col lg="3">
              <div style={{marginTop:22}}>
              <Button color="primary">Block Email</Button>
              </div>
             
            </Col>
          </Row>
        </div>
        )
      },
      {
        title: 'Block Domains',
        content: (
          <div>
          <Row>
            <Col lg="3">
            <Form>
         <FormGroup>
            <Label>Enter Domain</Label>
           <Input
               id='enterdomain'
               name='enterdomain'
               placeholder='Domain'
             />
         </FormGroup>
         </Form>
            </Col>
            <Col lg="3">
              <div style={{marginTop:22}}>
              <Button color="primary">Block Domain</Button>
              </div>
             
            </Col>
          </Row>
        </div>
        )
      },
      {
        title: 'Whitelist Domains',
        content: (
          <div>
          <Row>
            <Col lg="3">
            <Form>
         <FormGroup>
            <Label>Enter White List Domain</Label>
           <Input
               id='enterwhitelistdomain'
               name='enterwhitelistdomain'
               placeholder='Enter Domain'
             />
         </FormGroup>
         </Form>
            </Col>
            <Col lg="3">
              <div style={{marginTop:22}}>
              <Button color="primary">White List Domain</Button>
              </div>
             
            </Col>
          </Row>
        </div>
        )
      },
      {
        title: 'Limit Transaction Amount',
        content: (
          <div>
          <Row>
            <Col lg="3">
            <Form>
         <FormGroup>
            <Label>Enter Limit of transaction Amount</Label>
           <Input
               id='limittransamount'
               name='limittransamount'
               placeholder='Enter Amount'
             />
         </FormGroup>
         </Form>
            </Col>
            <Col lg="3">
              <div style={{marginTop:22}}>
              <Button color="primary">Submit</Button>
              </div>
             
            </Col>
          </Row>
        </div>
        )
      },
      {
        title: 'Block Card Ranges',
        content: (
          <Row>
          <Col lg="3">
           <Label for='cardrangefrom'>Select From Card</Label>
            <Select
              // theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              defaultValue={cardrangefrom[0]}
              name='cardrangefrom'
              id='cardrangefrom'
              options={cardrangefrom}
              // isClearable
              // onChange={handleChange}
            />
            </Col>
            <Col lg="3">
           <Label for='cardrangeto'>Select TO Card</Label>
            <Select
              // theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              defaultValue={cardrangeto[0]}
              name='cardrangeto'
              id='cardrangeto'
              options={cardrangeto}
              // isClearable
              // onChange={handleChange}
            />
            </Col>
            <Col lg="3">
            <div style={{marginTop:22}}>
            <Button color="primary">Submit</Button>
            </div>
           
          </Col>
        </Row>
        )
      },
      {
        title: 'Limit Card Transaction',
        content: (
          <div>
          <Row>
            <Col lg="3">
            <Form>
         <FormGroup>
            <Label>Enter Limit of Card transaction Amount</Label>
           <Input
               id='limitcardtransamount'
               name='limitcardtransamount'
               placeholder='Enter Amount'
             />
         </FormGroup>
         </Form>
            </Col>
            <Col lg="3">
              <div style={{marginTop:22}}>
              <Button color="primary">Submit</Button>
              </div>
             
            </Col>
          </Row>
        </div>
        )
      },
      {
        title: 'Block Phone number',
        content: (
          <div>
          <Row>
            <Col lg="3">
            <Form>
         <FormGroup>
            <Label>Enter Phone Number to block</Label>
           <Input
               id='phonenumberblock'
               name='phonenumberblock'
               placeholder='Enter Phone Number'
             />
         </FormGroup>
         </Form>
            </Col>
            <Col lg="3">
              <div style={{marginTop:22}}>
              <Button color="primary">Submit</Button>
              </div>
             
            </Col>
          </Row>
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

export default fraudmanage