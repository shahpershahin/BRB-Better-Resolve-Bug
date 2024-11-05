import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { userContext } from '../../App'; // Import userContext

function Upload_Projects() {

  const navigate = useNavigate();

  const { udata , setudata } = useContext(userContext);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    repo: '',
    phone: '',
    description: '',
    file: null,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', udata.username);
    data.append('email', udata.email);
    data.append('phone', formData.phone);
    data.append('title', formData.title);
    data.append('repo', formData.repo);
    data.append('description', formData.description);
    data.append('file', formData.file);

    try {
      const response = await axios.post('http://localhost:9000/api/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(response.status === 200 ){
        navigate('/yourproject')
      }
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Error uploading project');
    }
  };

  return (
    <>
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <div className="layout-page">
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4">
                <span className="text-muted fw-light">Dashboard/</span> Upload Project
              </h4>

              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                  <div className="col-xxl">
                    <div className="card mb-4">
                      <div className="card-header d-flex align-items-center justify-content-between">
                        <h5 className="mb-0">Upload Project</h5>
                      </div>
                      <div className="card-body">
                        <form onSubmit={handleSubmit}>
                          <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="name">User Name</label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                required
                                value={udata.username}
                                readOnly
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="email">Email</label>
                            <div className="col-sm-10">
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                required
                                value={udata.email}
                                readOnly
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="phone">Phone</label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="title">Title</label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                required
                                placeholder="Project Title"
                                value={formData.title}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="repo">Project Repository</label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="repo"
                                name="repo"
                                required
                                placeholder="github.com/yourrepo"
                                value={formData.repo}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="description">Project Description</label>
                            <div className="col-sm-10">
                              <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                required
                                placeholder="Describe your project"
                                value={formData.description}
                                onChange={handleChange}
                              ></textarea>
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="file">Project File</label>
                            <div className="col-sm-10">
                              <input
                                className="form-control"
                                type="file"
                                id="file"
                                name="file"
                                required
                                accept=".zip"
                                onChange={handleFileChange}
                              />
                            </div>
                          </div>

                          <div className="row justify-content-end">
                            <div className="col-sm-10">
                              <button type="submit" className="btn btn-primary">Upload</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Upload_Projects;
