import Navigation from "./Components/Navigation";
import { Route,Routes} from "react-router-dom"
import  { getCurrentUser } from "./Services/authService";
import { useState } from "react";
import LoginForm from "./Components/LoginForm";
import Products from "./Components/Products";
  
function App() {
  const [user,setUser] = useState(getCurrentUser());
  
  return (
  <>
      <Navigation user={user}/>
      <Routes>
        <Route exact path="/" element={<Products user={user}/>} />
        <Route exact path="/login" element={<LoginForm user={user} setUser={setUser} />} /> 
        <Route exact path="/notFound" element={<h1>404 Not Found</h1>} />  
      </Routes>
  </>
    );
}

export default App;
