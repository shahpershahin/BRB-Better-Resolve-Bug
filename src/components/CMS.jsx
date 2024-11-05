import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../App';
import axios from 'axios';
import { usePopper } from 'react-popper';
import { toast } from 'react-toastify';

function CMS() {
    const { udata } = useContext(userContext);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeProjectId, setActiveProjectId] = useState(null); // To keep track of the current project for dropdown

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
            {
                name: 'preventOverflow',
                options: {
                    padding: 8,
                },
            },
            {
                name: 'flip',
                options: {
                    padding: 8,
                },
            },
        ],
    });

        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/collaboration-requests-update', {
                    params: { username: udata.username },
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

    useEffect(()=>{

    },[udata.username]);

    const handleAccept = async (projectId) => {
        try {
            await axios.patch(`http://localhost:9000/api/collaboration-request/${projectId}/accept`);
            // Refresh the projects after acceptance
            toast.success("Approved");
            fetchProjects(); // Fetch updated projects from the API
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };
    
    const handleReject = async (projectId) => {
        try {
            await axios.patch(`http://localhost:9000/api/collaboration-request/${projectId}/reject`);
            // Refresh the projects after rejection
            toast.success("Rejected");
            fetchProjects(); // Fetch updated projects from the API
        } catch (error) {
            console.error('Error rejecting request:', error);
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
                                <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Home /</span> cms</h4>
                                <div className="card">
                                    <h5 className="card-header">Hoverable rows</h5>
                                    <div className="table-responsive text-nowrap">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Project Title</th>
                                                    <th>Collaborator</th>
                                                    <th>Request Date</th>
                                                    <th>Reason</th>
                                                    <th>Joined Date</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-border-bottom-0">
                                                {Array.isArray(projects) && projects.length > 0 ? (
                                                    projects.map((project) => (
                                                        <tr key={project._id}>
                                                            <td><strong>{project.projectTitle}</strong></td>
                                                            <td>{project.joinerName || "N/A"}</td>
                                                            <td>{new Date(project.createdAt).toLocaleString()}</td>
                                                            <td><span className="">{project.message || "No Reason"}</span></td>
                                                            <td>{project.joinedDate ? new Date(project.joinedDate).toLocaleString() : "Not yet joined"}</td>
                                                            <td><span className="badge bg-label-primary me-1">{project.status || "Pending"}</span></td>
                                                            <td>
                                                                <div ref={setReferenceElement} onClick={() => {
                                                                    setActiveProjectId(project._id);
                                                                    setShowDropdown((prev) => !prev);
                                                                }}>
                                                                    <button 
                                                                        type="button" 
                                                                        className="btn p-0 dropdown-toggle hide-arrow"
                                                                    >
                                                                        <i className="bx bx-dots-vertical-rounded"></i>
                                                                    </button>
                                                                </div>
                                                                {showDropdown && activeProjectId === project._id && (
                                                                    <div 
                                                                        ref={setPopperElement} 
                                                                        style={styles.popper} 
                                                                        {...attributes.popper}
                                                                        className="dropdown-menu show"
                                                                    >
                                                                        <button className="dropdown-item" onClick={() => handleAccept(project._id)}>
                                                                            <i className="bx bx-edit-alt me-1"></i> Accept
                                                                        </button>
                                                                        <button className="dropdown-item" onClick={() => handleReject(project._id)}>
                                                                            <i className="bx bx-trash me-1"></i> Reject
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6">No collaboration requests found.</td>
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

export default CMS;
