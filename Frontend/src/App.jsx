import { Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import User from './Pages/User';
import AdminCreate from './Components/AdminCreate';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/createAlbum" element={<AdminCreate />} />
      </Routes>
    </Fragment>
  );
};

export default App;
