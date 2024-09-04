import React from 'react'
import Home from './Home'
import { Route, Routes } from 'react-router-dom'
import Your_Projects from './Your_Projects'
import Footer from './Footer'
import ReadBlog from './Blog/ReadBlog'
import WriteBlog from './Blog/WriteBlog'
import Account from './Account_Settings/Account'
import RegisterPage from './RegisterPage'
import Upload_Projects from './Projects/Upload_Projects'

function SiteRoutes() {
  return (
    <>

      <Routes>
          
          <Route path='/' element={<Home/>}/>
          <Route path='/yourprojects' element={<Your_Projects/>}/>
          <Route path='/readblog' element={<ReadBlog/>}/>
          <Route path='/writeblog' element={<WriteBlog/>}/>
          <Route path='/account' element={<Account/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/uploadproject' element={<Upload_Projects/>}/>

          
      </Routes>

    </>
  )
}

export default SiteRoutes