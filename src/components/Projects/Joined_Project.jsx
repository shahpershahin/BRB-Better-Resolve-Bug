import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { userContext } from '../../App';

function Joined_Project() {
    const { udata } = useContext(userContext);
    const [joinedProjects, setJoinedProjects] = useState([]);
    const [loading, setLoading] = useState(true);

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
                                                </tr>
                                            </thead>
                                            <tbody className="table-border-bottom-0">
                                                {joinedProjects.length > 0 ? (
                                                    joinedProjects.map((project) => (
                                                        <tr key={project._id}>
                                                            <td><strong>{project.projectTitle}</strong></td>
                                                            <td>{project.projectOwnerName}</td>
                                                            <td>{new Date(project.joinedDate).toLocaleString()}</td>
                                                            <td>{project.message || "No Reason"}</td>
                                                            <td><span className="badge bg-label-primary me-1">{project.status}</span></td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="7">No joined projects found.</td>
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
