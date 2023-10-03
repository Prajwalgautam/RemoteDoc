import React from 'react'
import { Form, Input, message } from 'antd'
import {useDispatch} from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import '../styles/LoginStyles.css'
import axios from 'axios'
import { Link, useNavigate} from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onfinishHandler = async (values) => {
    try{
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/login', values)
      window.location.reload();
      dispatch(hideLoading())
      if (res.data.success){
        localStorage.setItem('token', res.data.token)
        message.success('login success')
        navigate('/')
      }else{
        message.error("Invalid Email or Password")
      }
    }catch(error){
      dispatch(hideLoading())
      console.log(error)
      message.error('something went wrong')
    }
  }
  return (
    <div className="form-container">
        <Form layout='vertical'
              className='login-form'
              onFinish={onfinishHandler}>
          <h3>Login</h3>
          <Form.Item label='Email' name='email'>
            <Input type='email' required />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input type='password' required />
          </Form.Item>
          <Link to="/register"
                className ="m-8" >Not a user? </Link>
          <button className='btn btn-primary'
                  type='submit'>
                    Login
          </button>
        </Form>
        
      </div>
  )
}

export default Login
