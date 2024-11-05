import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { userContext } from '../App'; // Import userContext
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { setudata } = useContext(userContext); // Get the setudata function from context

  const onLogin = async (e) => {
    e.preventDefault(); 
  
    try {
      const response = await axios.post('http://localhost:9000/api/login', { email, password });

      if (response.status === 200) {
        // Get the user object from response
        const { username, email } = response.data.user;

        // Store user data in sessionStorage
        const userdata = { username, email };
        sessionStorage.setItem('userdata', JSON.stringify(userdata));

        // Update the context with user data
        setudata(userdata);
        console.log(userdata);
        toast.success("successfully logged in!");

        // Navigate to the home page
        navigate('/home');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during login.');
      }
    }
  };

  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <h4 className="mb-2">Build. Collaborate. Innovate. 🚀</h4>

              {error && <div className="alert alert-danger">{error}</div>}

              <form id="formAuthentication" className="mb-3" onSubmit={onLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="••••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                </div>
              </form>
              <p className="text-center">
                <span>New on our platform?</span>
                <a href="/register">
                  <span>Create an account</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
