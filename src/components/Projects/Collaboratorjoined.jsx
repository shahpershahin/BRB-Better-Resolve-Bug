import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../../App';
import { MessageCircle } from 'lucide-react';

function Collaboratorjoined() {
    const { projectId } = useParams();
    const { udata } = useContext(userContext);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    // Function to handle chat button click
    const handleChatClick = (collaboratorName) => {
        navigate(`/chat/${projectId}/${collaboratorName}`);
    };

    // Function to fetch unread message count
    const fetchUnreadCount = async (projectId, recipient) => {
        try {
            const response = await axios.get(`http://localhost:9000/api/chat/${projectId}/unread`, {
                params: { recipient }
            });
            return response.data.unreadCount;
        } catch (error) {
            console.error('Error fetching unread count:', error);
            return 0;
        }
    };

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
                                <h4 className="fw-bold py-3 mb-4">
                                    <span className="text-muted fw-light">Home /</span> Collaborator Joined
                                </h4>
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
                                                    <th>Action</th>
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
                                                            <td>
                                                                <span className="badge bg-label-primary me-1">
                                                                    {project.status}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-primary btn-sm d-flex align-items-center gap-2"
                                                                    onClick={() => handleChatClick(project.joinerName)}
                                                                >
                                                                    <MessageCircle size={16} />
                                                                    Chat
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="8">No accepted collaboration requests found.</td>
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