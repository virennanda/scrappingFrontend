import React from 'react'
import { Navbar, Container, Nav, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../../Services/authService';

const Navigation = ({user,setUser}) => {
  
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Nav className="me-auto">
          {
            !!user ? renderForUser(user,setUser) :<Link className='btn btn-primary text-light' to='/login'>Login</Link>  
          }
        </Nav>
      </Container>
    </Navbar>
  )
}
function renderForUser(user,setUser){
  return <>
  <Nav.Item>
{user.username}
  </Nav.Item>
  <Nav.Item>
    <Button variant='danger' color='light' onClick={()=>{
      logout();
      setUser(null);
      }}>
      Logout    
    </Button>
    </Nav.Item>
  </>
}
export default Navigation;