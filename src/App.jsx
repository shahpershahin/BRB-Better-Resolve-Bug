import { useEffect, useState, createContext } from 'react';
import { useLocation } from 'react-router-dom'; 
import SiteRoutes from './components/SiteRoutes';
import Sidebar from './components/Sidebar';

export const userContext = createContext(null); // Create context

function App() {
  const [udata, setudata] = useState(() => {
    // Retrieve user data from sessionStorage if available
    const storedUser = sessionStorage.getItem('userdata');
    
    // Ensure storedUser is valid before parsing
    if (storedUser && storedUser !== 'undefined') {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Failed to parse user data from sessionStorage:", error);
        return null;
      }
    }
    return null;
  });

  const [hideSidebar, setHideSidebar] = useState(false);
  const location = useLocation(); 

  // Toggle sidebar visibility based on the route
  useEffect(() => {
    const path = location.pathname; 
    setHideSidebar(path === '/register' || path === '/login');
  }, [location]);

  // Whenever the user data is updated, store it in sessionStorage
  useEffect(() => {
    if (udata) {
      sessionStorage.setItem('userdata', JSON.stringify(udata));
    } else {
      sessionStorage.removeItem('userdata'); // Clear session when user logs out
    }
  }, [udata]);

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {!hideSidebar && <Sidebar />}
        <userContext.Provider value={{ udata, setudata }}>
          <SiteRoutes />
        </userContext.Provider>
      </div>
    </div>
  );
}

export default App;
