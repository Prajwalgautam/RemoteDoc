import React from 'react'
import Layout from './../components/Layout'
import { Form, Row, Input, Col, TimePicker, message } from 'antd'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';

const ApplyDoctor = () => {
    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleFinish = async (values) => {
        try{
              dispatch(showLoading());
              const res = await axios.post(
                "/api/v1/user/apply-doctor",
                { ...values, userId: user._id },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
            dispatch(hideLoading());
            if (res.data.success){
                message.success(res.data.success)
                navigate('/');
            }else{
                message.error(res.data.message)
            }

        }catch(error){
            console.log(error)
            message.error("something went wrong")
        }
    }
  return (
    <Layout>
        <h1 className='text-center'>ApplyDoctor</h1>
        <Form layout='vertical' onFinish={handleFinish} className='m-4'>
        <h6 className=''>Personal Information</h6>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item 
                        label='First Name'
                        name='firstName'
                        required rules={[{required:true}]}
                    >
                        <Input type='text' placeholder='your first name' />
                    </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item 
                            label='Last Name'
                            name='lastName'
                            required rules={[{required:true}]}
                        >
                            <Input type='text' placeholder='your last name' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item 
                            label='Phone Number'
                            name='phone'
                            required rules={[{required:true}]}
                        >
                            <Input type='text' placeholder='your phone number' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item 
                            label='Email'
                            name='email'
                            required rules={[{required:true}]}
                        >
                            <Input type='email' placeholder='your email' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item 
                            label='Website'
                            name='website'
                        >
                            <Input type='text' placeholder='your website' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item 
                            label='Address'
                            name='address'
                            required rules={[{required:true}]}
                        >
                            <Input type='text' placeholder='your address' />
                        </Form.Item>
                    </Col>
            </Row>
            <h6 className=''>Professional Information</h6>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                            <Form.Item 
                                label='Specialization'
                                name='specialization'
                                required rules={[{required:true}]}
                            >
                                <Input type='text' placeholder='your specialization' />
                            </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                            <Form.Item 
                                label='Experience'
                                name='experience'
                                required rules={[{required:true}]}
                            >
                                <Input type='text' placeholder='your experince' />
                            </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                            <Form.Item 
                                label='Fees Per Consultation'
                                name='feesPerConsultation'
                                required rules={[{required:true}]}
                            >
                                <Input type='text' placeholder='your fees' />
                            </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                            <Form.Item 
                                label='Timings'
                                name='timings'
                                required rules={[{required:true}]}
                            >
                                <TimePicker.RangePicker format={"HH:mm"} />
                            </Form.Item>
                </Col>
            </Row>
            <Col xs={24} md={24} lg={8}>
                    <button className="btn btn-primary" type="submit">Submit</button>
            </Col>
            
        </Form>
    </Layout>
  )
}

export default ApplyDoctor