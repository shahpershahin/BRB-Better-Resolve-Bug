import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from 'axios';
import { userContext } from '../../App';
import { MessageCircle } from 'lucide-react';

function Project_Chat() {
    const { udata } = useContext(userContext);
    const [joinedProjects, setJoinedProjects] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unreadChatProjects, setUnreadChatProjects] = useState([]);
    const navigate = useNavigate();  // Initialize useNavigate
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/projects', {
                    params: { email: udata.email },
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


    useEffect(() => {
        const fetchUnreadChatProjects = async () => {
            try {
                // Make the API call to get unread chat projects grouped by projectTitle
                const response = await axios.get('http://localhost:9000/api/messages/unread/grouped', {
                    params: { username: udata.username }
                });

                // Set the fetched unread chat projects to the state
                setUnreadChatProjects(response.data);
            } catch (error) {
                console.error('Error fetching unread chat projects:', error);
            }
        };

        // Fetch unread chat projects
        fetchUnreadChatProjects();
    }, [udata.username]);

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

    const handleChatClick2 = (projectId, projectTitle) => {
        navigate(`/collaboratorjoined/${projectId}/${projectTitle}`);
      };

    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <div className="layout-page">
                        <div className="row mb-5" style={{ marginLeft: '2%', marginTop: '2%' }}>
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Home /</span> Messages</h4>
                                <div className="card">
                                    <h5 className="card-header">Joined Projects Message</h5>
                                    <div className="table-responsive text-nowrap">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Project Title</th>
                                                    <th>Project Owner</th>
                                                    <th>Joined Date</th>
                                                    <th>Chat</th>
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
                                                                <button
                                                                    className="btn btn-primary"
                                                                    onClick={() => handleChatClick(project.projectId, project.projectOwnerName, project.projectTitle)}
                                                                >
                                                                    Chat
                                                                </button>
                                                            </td>
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

                                <br />
                                <br />

                                <div className="card">
                                    <h5 className="card-header">Unread Chats</h5>
                                    <div className="table-responsive text-nowrap">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Sr.No</th>
                                                    <th>Title</th>
                                                    <th>Message</th>
                                                    <th>Sender</th>
                                                    <th>Sent At</th>
                                                    <th>View Project</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-border-bottom-0">
                                                {unreadChatProjects.length > 0 ? (
                                                    unreadChatProjects.map((project, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{project.projectTitle}</td>
                                                            <td>{project.content}</td>
                                                            <td>{project.sender}</td>
                                                            <td>{project.timestamp}</td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-primary btn-sm d-flex align-items-center gap-2"
                                                                    onClick={() => handleChatClick(project.projectId, project.sender, project.projectTitle)}
                                                                >
                                                                    <MessageCircle size={16} />
                                                                    Chat
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr><td colSpan="4">No projects with unread chats</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <br />
                                <br />

                                <div className="card">
                                    <h5 className="card-header">All Messages</h5>
                                    <div className="table-responsive text-nowrap">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Project Title</th>
                                                    <th>Project Owner</th>
                                                    <th>Description</th>
                                                    <th>Collaborators</th>
                                                    <th>Repository</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {projects.length > 0 ? (
                                                    projects.map((project) => (
                                                        <tr key={project._id}>
                                                            <td><strong>{project.title}</strong></td>
                                                            <td>{project.username}</td>
                                                            <td><span className="">{project.description
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
                                                                )) || "No Description"}</span></td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-primary"
                                                                    onClick={() => handleChatClick2(project._id, project.title)}
                                                                >
                                                                    View Collaborators
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <a href={project.repository} target="_blank" rel="noopener noreferrer">
                                                                    <button className="btn btn-primary">View Repository</button>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5">No projects found for your account.</td>
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

export default Project_Chat;
