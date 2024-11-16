import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { userContext } from '../../App';

function ContributeToProject() {
    const { udata } = useContext(userContext);
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [reason, setReason] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/allprojectstojoin',{
                    params: { username:udata.username , email: udata.email}
                });
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleJoinClick = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
          const response = await axios.post('http://localhost:9000/api/collaboration-requests', {
              projectId: selectedProject._id,
              message: reason,
              joinerName: udata.username,
              joinerEmail: udata.email,
              joinerPhoneNo: phone,
              projectOwnerName: selectedProject.username,
              projectTitle: selectedProject.title
          });
  
          alert(response.data.message);
          setShowModal(false);
          setReason('');
      } catch (error) {
          alert('Error submitting request. Please try again.');
          console.error('Error submitting request:', error);
      }
  };
  

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <div className="layout-page">
                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <h4 className="fw-bold py-3 mb-4">
                                <span className="text-muted fw-light">Dashboard/</span> Contribute to project
                            </h4>

                            <div className="row">
                                {projects.map((project) => (
                                    <div key={project._id} className="col-md-4 mb-4">
                                        <div className="card">
                                            <div className="card-header">{project.username}</div>
                                            <div className="card-body">
                                                <h5 className="card-title">{project.title}</h5>
                                                <p className="card-text">{project.description}</p>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-primary"
                                                    onClick={() => handleJoinClick(project)}
                                                >
                                                    Join
                                                </button>
                                                <br/>
                                                <br/>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-primary"
                                                    onClick={() => window.open(project.repository, '_blank')}
                                                >
                                                    View Repository
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {showModal && (
                                <div className="modal show d-block" tabIndex="-1">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Request to Join Project</h5>
                                                <button 
                                                    type="button" 
                                                    className="btn-close" 
                                                    onClick={() => setShowModal(false)}
                                                ></button>
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-2 col-form-label">Username</label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={udata.username}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="col-sm-2 col-form-label">Email</label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                value={udata.email}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="col-sm-2 col-form-label">Phone No</label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={phone}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label className="col-sm-2 col-form-label">Reason</label>
                                                        <div className="col-sm-10">
                                                            <textarea
                                                                className="form-control"
                                                                value={reason}
                                                                onChange={(e) => setReason(e.target.value)}
                                                                placeholder="Why would you like to join this project?"
                                                                required
                                                                rows="4"
                                                            ></textarea>
                                                        </div>
                                                    </div>

                                                    <div className="row justify-content-end">
                                                        <div className="col-sm-10">
                                                            <button 
                                                                type="button" 
                                                                className="btn btn-secondary me-2"
                                                                onClick={() => setShowModal(false)}
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button 
                                                                type="submit" 
                                                                className="btn btn-primary"
                                                            >
                                                                Submit Request
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContributeToProject;