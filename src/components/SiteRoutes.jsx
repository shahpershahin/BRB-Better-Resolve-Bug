import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
import BlogDetail from './Blog/BlogDetail';
import { userContext } from '../App';
import Joined_Project from './Projects/Joined_Project';

function SiteRoutes() {
  const { udata } = useContext(userContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      {udata ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/yourproject" element={<Your_Projects />} />
          <Route path="/readblog" element={<ReadBlog />} />
          <Route path="/writeblog" element={<WriteBlog />} />
          <Route path="/readblog/:id" element={<BlogDetail />} />
          <Route path="/account" element={<Account />} />
          <Route path="/uploadproject" element={<Upload_Project />} />
          <Route path="/updateproject" element={<Update_Project />} />
          <Route path="/collaboratorjoined/:projectId" element={<Collaboratorjoined />} />
          <Route path="/joinproject" element={<ContributeToProject />} />
          <Route path="/joinedproject" element={<Joined_Project />} />
          <Route path="/cms" element={<CMS />} />
        </>
      ) : (
        // Redirect to login if the user is not logged in
        <>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
}

export default SiteRoutes;
