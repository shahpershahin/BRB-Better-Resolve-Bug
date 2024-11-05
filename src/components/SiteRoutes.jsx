import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Your_Projects from './Projects/Your_Projects';
import Upload_Project from './Projects/Upload_Projects';
import ReadBlog from './Blog/ReadBlog';
import WriteBlog from './Blog/WriteBlog';
import Account from './Account_Settings/Account';
import RegisterPage from './RegisterPage';
import CMS from './CMS';
import ContributeToProject from './Projects/ContributeToProject';
import Login from './Login';
import Update_Project from './Projects/Update_Project';
import Collaboratorjoined from './Projects/collaboratorjoined';

function SiteRoutes() {
  const [userLoged, setUserLoged] = useState(false);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/yourproject' element={<Your_Projects />} />
      <Route path='/readblog' element={<ReadBlog />} />
      <Route path='/writeblog' element={<WriteBlog />} />
      <Route path='/account' element={<Account />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/uploadproject' element={<Upload_Project />} />
      <Route path='/updateproject' element={<Update_Project />} />
      <Route path='/collaboratorjoined/:projectId' element={<Collaboratorjoined />} />
      <Route path='/joinproject' element={<ContributeToProject />} />
      <Route path='/cms' element={<CMS/>} />
    </Routes>
  );
}

export default SiteRoutes;