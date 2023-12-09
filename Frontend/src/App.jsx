import { Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import User from './Pages/User';
import AdminCreate from './Components/AdminCreate';
import PhotoUpload from './Components/PhotoUpload';
import UserPage from './Components/UserPage';
import AllImages from './Components/AllImages';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/createAlbum" element={<AdminCreate />} />
        <Route path="/addPhotos/:id" element={<PhotoUpload />} />
        <Route path="userPage" element={<UserPage />} />
        <Route path="/allImages" element={<AllImages />} />
      
      </Routes>
      <Toaster />
    </Fragment>
  );
};

export default App;
