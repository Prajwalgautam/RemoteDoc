import React from 'react'
import { Form, Input } from 'antd'
import '../styles/LoginStyles.css'
import { Link } from 'react-router-dom'

const Login = () => {
  const onFinishHandler = (values) => {
    console.log(values);
  }
  return (
    <div className="form-container">
        <Form layout='vertical'
              className='login-form'
              onFinish={onFinishHandler}>
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
                    Register
          </button>
        </Form>
        
      </div>
  )
}

export default Login
