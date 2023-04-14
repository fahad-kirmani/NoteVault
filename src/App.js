import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router, Route,Routes
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Notestate from './context/Notestate';
import { Alert } from './components/Alert';
import Login from './components/login';
import Signup from './components/signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null)
  const showmsg =(msg, type) => {
    setAlert({
    msg: msg,
    type: type
  })
  setTimeout(() => {
    setAlert(null)
  }, 1500);
  }



  return (
    <Notestate>
    <Router>
    <Navbar/>
    <Alert alert={alert}/>
    <div className="container">
    <Routes>
    <Route exact path="/" element={<Home showmsg={showmsg}/>}/>
    <Route exact path="/about" element={<About/>}/>
    <Route exact path="/login" element={<Login showmsg={showmsg}/>}/>
    <Route exact path="/signup" element={<Signup showmsg={showmsg}/>}/>
    </Routes>
    </div>
    </Router>
    </Notestate>
  );
}

export default App;
