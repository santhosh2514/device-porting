import logo from './logo.svg';
import './App.css';
import Signup from './modules/Signup';
import Profile from './modules/Profile';
import Home from './modules/Home';
import PortValidation from './modules/PortValidation';
import Cookies from 'js-cookie';

import PortData from './modules/PortData';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const isExisitingUser = Cookies.get('token');
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={isExisitingUser ? <Home /> :<Signup />}/>
            <Route path="/home" element = {<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/port-data" element={<PortData />} />
            <Route path="/validate-port" element = {<PortValidation />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
