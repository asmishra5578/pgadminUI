// ** React Imports
import { Fragment, useState, forwardRef } from 'react'
import requestsApi from '../PGDetails/requests'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, RefreshCw } from 'react-feather'
import {
    Card,
    CardHeader,
    CardTitle,
    Button,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
    Label,
    Row, Form, FormFeedback, FormGroup,
    Col,
    CardBody
} from 'reactstrap'
import { useHistory } from 'react-router-dom'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
    <div className='custom-control custom-checkbox'>
        <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
        <label className='custom-control-label' onClick={onClick} />
    </div>
))

const DataTableWithButtons = (props) => {
    const history = useHistory()

    const countryOptions = [
        { value: 'WALLET', label: 'WALLET' },
        { value: 'UPI', label: 'UPI' },
        { value: 'UPI_QR', label: 'UPI_QR' },
        { value: 'NB', label: 'NB' },
        { value: 'CARD', label: 'CARD' },
        { value: 'EMI', label: 'EMI' },

        { value: 'GPAY', label: 'GPAY' }
        // { value: 'MASTRO', label: 'Mastro' },
        // { value: 'RUPAY', label: 'Rupay' }
    ]
    const requestsApidata = new requestsApi()

    const [selectedValue, setSelectedValue] = useState('Select')
    const [disabledbtns, setdisabledbtns] = useState(false)
    const SignupSchema = yup.object().shape({
        // pgAppId: yup.string(),
        pgName: yup.string().required('PG Name can not be empty'),
        pgConfigKey: yup.string(),
        pgConfigSecret: yup.string(),
        pgConfig1: yup.string(),
        pgConfig2: yup.string(),
        pgConfig3: yup.string()
        // pgSaltKey: yup.string(),
        // pgSecretKey: yup.string(),
        // pgAddInfo1: yup.string(),
        // pgAddInfo2: yup.string(),
        // pgAddInfo3: yup.string(),
        // pgAddInfo4: yup.string(),
        // pgAddInfo5: yup.string(),
        // pgAddInfo6: yup.string(),
        // pgAddInfo7: yup.string(),
        // pgAddInfo8: yup.string(),
        // pgAddInfo9: yup.string(),
        // pgAddInfo10: yup.string()
    })
    const { register, errors, handleSubmit, reset } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    const handleChange = e => {
        console.log('handlechange', e)
        setSelectedValue(e)
    }
    const onSubmit = data => {
        // console.log("dsadasd", selectedValue)
        // else if (data.pgAppId === "" && data.pgSaltKey === "") {
        //     toast.error('Any two fields are required (AppID, SaltKey, Secret Key)')
        // } else if (data.pgSaltKey === "" && data.pgSecretKey === "") {
        //     toast.error('Any two fields are required (AppID, SaltKey, Secret Key)')
        // } else if (data.pgAppId === "" && data.pgSecretKey === "") {
        //     toast.error('Any two fields are required (AppID, SaltKey, Secret Key)')
        // } 
        if (data.pgConfigKey === "" && data.pgConfigSecret === "") {
            toast.error('Config key and Secret Key both can not be empty')
        } else {
            // const selectvaluearray = []
            // selectedValue.map((v) => {
            //     selectvaluearray.push(v.value)
            // })
            data.pgStatus = "ACTIVE"
            console.log("selectvaluearray", data)
            setdisabledbtns(true)

            // parentCallback(data)
            // console.log('data', data)
            requestsApidata.CreatePGDetails(data).then((res) => {
                if (res.data.status === "SUCCESS") {
                    setdisabledbtns(false)
                    toast.success('PG Created Successfully')
                    reset()
                } else  if (res.data.status === "false") {
                    setdisabledbtns(false)
                    toast.warning('PG not Created')
                    // reset()
                } else if (res.data.exception === "IDEAL_SESSION_EXPIRED") {
                    toast.error('Session Expired Login again!')
                    history.push('/')
                } else if (res.data.exception === "JWT_MISSING") {
                    toast.error('Session Expired Login again!')
                    history.push('/')
                } else if (res.data.exception === "PG_ALREADYCREATED") {
                    toast.error('PG details already created as per Input provided , please crosscheck the sensitive information')
                    setdisabledbtns(false)
                } else {
                    setdisabledbtns(false)
                    toast.warning(res.data.msg[0])
                }
            }).catch((err) => {
                Swal.fire({ text: 'NetWork Error. Connect to network' }).then(() => {
                    setdisabledbtns(false)
                })
            })
        }
    }
    const resethandler = () => {
        // console.log('reset')
        reset()
        // setSelectedValue('Select')
        toast.success('Reset successfully done')
    }
    // ** States
    return (
        <Fragment>
            <Card>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h4'>PG Configuration</CardTitle>
                </CardHeader>
                <CardBody>
                    <div style={{ marginTop: 20 }}>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <Label for='pgName'>PG Name<span style={{ color: 'red' }}>*</span></Label>
                                        <Input
                                            id='pgName'
                                            name='pgName'
                                            innerRef={register({ required: true })}
                                            invalid={errors.pgName && true}
                                            placeholder='PG Name'
                                        />
                                        {errors && errors.pgName && <FormFeedback>{errors.pgName.message}</FormFeedback>}
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <Label for='pgConfigKey'>PG Config Key</Label>
                                        <Input
                                            type='text'
                                            name='pgConfigKey'
                                            id='pgConfigKey'
                                            innerRef={register({ required: true })}
                                            invalid={errors.pgConfigKey && true}
                                            placeholder='PG Config Key'
                                        />
                                        {errors && errors.pgConfigKey && <FormFeedback>{errors.pgConfigKey.message}</FormFeedback>}
                                    </FormGroup>
                                </Col>
                                {/* <Col lg="6">
                                    <FormGroup>
                                        <Label for='pgAppId'>PG App ID</Label>
                                        <Input
                                            id='pgAppId'
                                            name='pgAppId'
                                            innerRef={register({ required: true })}
                                            invalid={errors.pgAppId && true}
                                            placeholder='PG App Id'
                                        />
                                        {errors && errors.pgAppId && <FormFeedback>{errors.pgAppId.message}</FormFeedback>}
                                    </FormGroup>
                                </Col> */}
                            </Row>
                            <Row>
                             
                                <Col lg="6">
                                    <FormGroup>
                                        <Label for='pgConfigSecret'>PG Secret Key</Label>
                                        <Input
                                            type='text'
                                            name='pgConfigSecret'
                                            id='pgConfigSecret'
                                            innerRef={register({ required: true })}
                                            invalid={errors.pgConfigSecret && true}
                                            placeholder='PG Secret Key'
                                        />
                                        {errors && errors.pgConfigSecret && <FormFeedback>{errors.pgConfigSecret.message}</FormFeedback>}
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <Label for='pgConfig1'>Additional info 1</Label>
                                        <Input
                                            type='text'
                                            name='pgConfig1'
                                            id='pgConfig1'
                                            innerRef={register({ required: true })}
                                            invalid={errors.pgConfig1 && true}
                                            placeholder='AddInfo1'
                                        />
                                        {/* {errors && errors.pgSecretKey && <FormFeedback>{errors.pgSecretKey.message}</FormFeedback>} */}
                                    </FormGroup>
                                </Col>
                            </Row>
                            {/* <FormGroup>
                                <Label for='pgServices'>PG Services<span style={{ color: 'red' }}>*</span></Label>
                                <Select
                                    isMulti
                                    isClearable={false}
                                    id='pgServices'
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={countryOptions}
                                    // defaultValue={countryOptions[0]}
                                    onChange={handleChange}
                                    value={selectedValue}
                                />
                            </FormGroup> */}
                            <Row>
                              
                                <Col lg="6">
                                    <FormGroup>
                                        <Label for='pgAddInfo2'>Additional info 2</Label>
                                        <Input
                                            type='text'
                                            name='pgAddInfo2'
                                            id='pgAddInfo2'
                                            innerRef={register({ required: true })}
                                            invalid={errors.pgConfig2 && true}
                                            placeholder='AddInfo2'
                                        />
                                        {/* {errors && errors.pgSecretKey && <FormFeedback>{errors.pgSecretKey.message}</FormFeedback>} */}
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <Label for='pgAddInfo3'>Additional info 3</Label>
                                        <Input
                                            type='text'
                                            name='pgAddInfo3'
                                            id='pgAddInfo3'
                                            innerRef={register({ required: true })}
                                            invalid={errors.pgConfig3 && true}
                                            placeholder='AddInfo3'
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                              
                                {/* <Col lg="6">
                                    <FormGroup>
                                        <Label for='pgAddInfo4'>Additional info 4</Label>
                                        <Input
                                            type='text'
                                            name='pgAddInfo4'
                                            id='pgAddInfo4'
                                            innerRef={register({ required: true })}
                                            invalid={errors.pgAddInfo4 && true}
                                            placeholder='AddInfo4'
                                        />
                                    </FormGroup>
                                </Col> */}
                            </Row>
                            {/* <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <Label for='pgAddInfo5'>Additional info 5</Label>
                                        <Input
                                            type='text'
                                            name='pgAddInfo5'
                                            id='pgAddInfo5'
                                            innerRef={register({ required: true })}
                                            invalid={errors.pgAddInfo5 && true}
                                            placeholder='AddInfo5'
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <Label for='pgAddInfo6'>Additional info 6</Label>
                                        <Input
                                            type='text'
                                            name='pgAddInfo6'
                                            id='pgAddInfo6'
                                            innerRef={register({ required: true })}
                                            invalid={errors.pgAddInfo6 && true}
                                            placeholder='AddInfo6'
                                        />
                                    </FormGroup>
                                </Col>
                            </Row> */}
                            {/* <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <Label for='pgAddInfo7'>Additional info 7</Label>
                                        <Input
                                            type='text'
                                            name='pgAddInfo7'
                                            id='pgAddInfo7'
                                            innerRef={register({ required: true })}
                                            invalid={errors.pgAddInfo7 && true}
                                            placeholder='AddInfo7'
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <Label for='pgAddInfo3'>Additional info 8</Label>
                                        <Input
                                            type='text'
                                            name='pgAddInfo8'
                                            id='pgAddInfo8'
                                            innerRef={register({ required: true })}
                                            invalid={errors.pgAddInfo8 && true}
                                            placeholder='AddInfo8'
                                        />
                                    </FormGroup>
                                </Col>
                            </Row> */}
                            {/* <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <Label for='pgAddInfo3'>Additional info 9</Label>
                                        <Input
                                            type='text'
                                            name='pgAddInfo9'
                                            id='pgAddInfo9'
                                            innerRef={register({ required: true })}
                                            invalid={errors.pgAddInfo9 && true}
                                            placeholder='AddInfo9'
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <Label for='pgAddInfo10'>Additional info 10</Label>
                                        <Input
                                            type='text'
                                            name='pgAddInfo10'
                                            id='pgAddInfo10'
                                            innerRef={register({ required: true })}
                                            invalid={errors.pgAddInfo10 && true}
                                            placeholder='AddInfo10'
                                        />
                                    </FormGroup>
                                </Col>
                            </Row> */}


                            <FormGroup className='d-flex mb-0'>
                                <Button.Ripple className='mr-1' color='primary' type='submit' disabled={disabledbtns}>
                                    Submit
                                </Button.Ripple>
                                <Button.Ripple outline color='secondary' type='reset' onClick={resethandler}>
                                    Reset
                                </Button.Ripple>
                            </FormGroup>
                        </Form>
                    </div>
                </CardBody>

            </Card>
        </Fragment>
    )
}

export default DataTableWithButtons
