import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from 'axios';
import { userContext } from '../../App';

function Joined_Project() {
    const { udata } = useContext(userContext);
    const [joinedProjects, setJoinedProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();  // Initialize useNavigate

    useEffect(() => {
        const fetchJoinedProjects = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/myacceptedprojects', {
                    params: { username: udata.username },
                });
                setJoinedProjects(response.data);
            } catch (error) {
                console.error('Error fetching joined projects:', error);
            } finally {
                setLoading(false);
            }
        };

        if (udata?.username) {
            fetchJoinedProjects();
        }
    }, [udata]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleChatClick = (projectId, projectOwner, projectTitle) => {
        navigate(`/chat/${projectId}/${projectOwner}/${projectTitle}`);  // Use navigate to redirect
    };

    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <div className="layout-page">
                        <div className="row mb-5" style={{ marginLeft: '2%', marginTop: '2%' }}>
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Home /</span> My Joined Projects</h4>
                                <div className="card">
                                    <h5 className="card-header">Projects I've Joined</h5>
                                    <div className="table-responsive text-nowrap">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Project Title</th>
                                                    <th>Project Owner</th>
                                                    <th>Joined Date</th>
                                                    <th>Reason</th>
                                                    <th>Status</th>
                                                    <th>Message</th>  {/* Add Action column for the button */}
                                                    <th>Repository</th>
                                                    <th>Project File</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-border-bottom-0">
                                                {joinedProjects.length > 0 ? (
                                                    joinedProjects.map((project) => (
                                                        <tr key={project._id}>
                                                            <td><strong>{project.projectTitle}</strong></td>
                                                            <td>{project.projectOwnerName}</td>
                                                            <td>{new Date(project.joinedDate).toLocaleString()}</td>
                                                            <td>
                                                            <span className="">{project.message
                                .split(' ')
                                .reduce((acc, word, idx) => {
                                  const chunkIndex = Math.floor(idx / 9);
                                  acc[chunkIndex] = acc[chunkIndex] ? acc[chunkIndex] + ' ' + word : word;
                                  return acc;
                                }, [])
                                .map((chunk, idx) => (
                                  <span key={idx}>
                                    {chunk}
                                    <br />
                                  </span>
                                )) || "No Reason"}</span>
                                                            </td>
                                                            <td><span className="badge bg-label-primary me-1">{project.status}</span></td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-primary"
                                                                    onClick={() => handleChatClick(project.projectId, project.projectOwnerName, project.projectTitle)}
                                                                >
                                                                    Chat
                                                                </button>
                                                            </td>
                                                            <td><a href={project.projectRepo}><button className="btn btn-primary">View</button></a></td>
                                                            <td>
                                                                <a href={project.projectFilePath} download>
                                                                <button className="btn btn-primary">
                                                                    Download File
                                                                    </button>
                                                                </a>
                                                            </td>

                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6">No joined projects found.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
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

export default Joined_Project;
