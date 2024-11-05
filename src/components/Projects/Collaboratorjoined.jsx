import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../../App';

function Collaboratorjoined() {
    const { projectId } = useParams(); // Get the projectId from the URL
    const { udata } = useContext(userContext);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAcceptedCollaborations = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/accpetedrequests`, {
                    params: { projectId },
                });
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching collaboration requests:', error);
            } finally {
                setLoading(false);
            }
        };

        if (projectId) {
            fetchAcceptedCollaborations();
        }
    }, [projectId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <div className="layout-page">
                        <div className="row mb-5" style={{ marginLeft: '2%', marginTop: '2%' }}>
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Home /</span> Collaborator Joined</h4>
                                <div className="card">
                                    <h5 className="card-header">Accepted Collaborations</h5>
                                    <div className="table-responsive text-nowrap">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Project Title</th>
                                                    <th>Collaborator</th>
                                                    <th>Joined Date</th>
                                                    <th>Reason</th>
                                                    <th>Phone No</th>
                                                    <th>Email</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-border-bottom-0">
                                                {projects.length > 0 ? (
                                                    projects.map((project) => (
                                                        <tr key={project._id}>
                                                            <td><strong>{project.projectTitle}</strong></td>
                                                            <td>{project.joinerName || "N/A"}</td>
                                                            <td>{new Date(project.joinedDate).toLocaleString()}</td>
                                                            <td>{project.message || "No Reason"}</td>
                                                            <td>{project.joinerPhoneNo}</td>
                                                            <td>{project.joinerEmail}</td>
                                                            <td><span className="badge bg-label-primary me-1">{project.status}</span></td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="7">No accepted collaboration requests found.</td>
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

export default Collaboratorjoined;
