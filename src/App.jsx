import { createContext, useState } from 'react'
import Home from './components/Home'

import Footer from './components/Footer'
import SiteRoutes from './components/SiteRoutes'
import Sidebar from './components/Sidebar'
import RegisterPage from './components/RegisterPage'

const userContext = createContext(null);

function App() {
  // const [udata,setudata] = useState("user");
  // useEffect(()=>
  // {
  //   if(sessionStorage.getItem("userdata")!==null)
  //   {
  //     setudata(JSON.parse(sessionStorage.getItem("userdata")));
  //   }
  // },[])
  return (
    <>

      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
            <Sidebar/>
            <SiteRoutes/>
            {/* </userContext.Provider> */}
        </div>
      </div>

    </>
  )
}

export default App
