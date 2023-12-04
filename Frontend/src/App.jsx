import { Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import User from './pages/User';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Fragment>
  );
};

export default App;
