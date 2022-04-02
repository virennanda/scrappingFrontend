import React,{useState} from 'react';
import { Card, Col, Container, Form, FormLabel, InputGroup, Row, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import authService, { getCurrentUser } from '../../Services/authService';
const LoginForm = ({ user, setUser }) => {

  const [data,setData] = useState({
    username:'',
    password:''
  });
  const handleChanege = (e)=>{
    let {name,value} = e.currentTarget;
    setData({...data,[name]:value})
  }  
  const handleSubmit = async (event)=>{
    event.preventDefault();
    if(data.password!='' && data.username!=''){
      try{
        await authService.login(data.username,data.password);
        setUser(getCurrentUser());
      }catch(err){
        window.alert('invalid username or password')
      }
    }else{
      window.alert('username and password should not be empty')
    }

  }
  if(user){
    return <Navigate to='/' />
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Label>User name</Form.Label>
          <Form.Control name='username' onChange={handleChanege} value={data.username} type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" onChange={handleChanege} value={data.password} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default LoginForm