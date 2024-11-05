import React, { useState, useEffect, useContext } from 'react';
import { userContext } from '../../App';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Your_Projects() {
  const { udata } = useContext(userContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/projects', {
          params: { email:udata.email },
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    if (udata.username) {
      fetchProjects();
    }
  }, [udata.username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <div className="layout-page">
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light">Dashboard/</span> Your Projects
                </h4>
                {projects.length > 0 ? (
                  <div className="row">
                    {projects.map((project) => (
                      <div key={project._id} className="col-md-4 mb-4">
                        <div className="card">
                          <div className="card-header">{project.username}</div>
                          <div className="card-body">
                            <h5 className="card-title">{project.title}</h5>
                            <p className="card-text">{project.description}</p>
                            <Link
                              to={{
                                pathname: `/updateproject`,
                                state: { projectId: project._id }, // Pass the projectId
                              }}
                            >
                              <button type="button" className="btn btn-primary" style={{ marginRight: '10px' }}>Update Project</button>
                            </Link>
                              
                            <Link to={`/collaboratorjoined/${project._id}`}>
                              <button type="button" className="btn btn-primary">Collaborators</button>
                            </Link>

                            <br />
                            <br />
                            <button type="button" className="btn btn-primary">
                              <a href={project.repository}>View Repository</a>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No projects found for your account.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Your_Projects;
