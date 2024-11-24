import React, { useContext, useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

import { userContext } from '../App';
import { MessageCircle } from 'lucide-react';

function Home() {

  const { udata } = useContext(userContext);
  const [projects, setProjects] = useState([]);
  const [allprojects, setAllProjects] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const [joinedProjects, setJoinedProjects] = useState(0);
  const [loading, setLoading] = useState();
  const [unreadChatProjects, setUnreadChatProjects] = useState([]);
  const navigate = useNavigate();

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
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/projects', {
          params: { email: udata.email },
        });
        setProjects(response.data);
        console.log(projects);
        setProjectCount(response.data.length);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllProjects = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/allprojects');
        setAllProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
    fetchAllProjects();
  }, [udata.email]);

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

  const handleChatClick = (projectId, collaboratorName, projectTitle) => {
    navigate(`/chat/${projectId}/${collaboratorName}/${projectTitle}`);
  };

  function wordWrap(text, wordsPerLine = 8) {
    const words = text.split(' ');
    let wrappedText = [];

    for (let i = 0; i < words.length; i += wordsPerLine) {
      wrappedText.push(words.slice(i, i + wordsPerLine).join(' '));
    }

    return wrappedText;
  }


  return (
    <>

      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">


          {/* {<!-- Layout container --> */}
          <div className="layout-page">


            <br />
            <br />

            <div className="content-wrapper">


              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                  <div className="col-lg-8 mb-4 order-0">
                    <div className="card">
                      <div className="d-flex align-items-end row">
                        <div className="col-sm-7">
                          <div className="card-body">
                            <h5 className="card-title text-primary">Welcome {udata.username}! 🎉</h5>
                            <p className="mb-4">
                              You are doing <span className="fw-bold">great!</span>
                              <br /> BRB allows you to show, join and chat related to your projects. Read and write blogs related to your projects.
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-5 text-center text-sm-left">
                          <div className="card-body pb-0 px-0 px-md-4">
                            <img
                              src="../assets/img/illustrations/man-with-laptop-light.png"
                              height="140"
                              alt="View Badge User"
                              data-app-dark-img="illustrations/man-with-laptop-dark.png"
                              data-app-light-img="illustrations/man-with-laptop-light.png"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 order-1">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img
                                  src="../assets/img/icons/unicons/chart-success.png"
                                  alt="chart success"
                                  className="rounded"
                                />
                              </div>

                            </div>
                            <span className="fw-semibold d-block mb-1">Project Joined</span>
                            <h3 className="card-title mb-2">{joinedProjects.length}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img
                                  src="../assets/img/icons/unicons/wallet-info.png"
                                  alt="Credit Card"
                                  className="rounded"
                                />
                              </div>

                            </div>
                            <span>Total Project</span>
                            <h3 className="card-title text-nowrap mb-1">{projectCount}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>


                <div className="card">
                  <h5 className="card-header">Latest Repositories</h5>
                  <div className="table-responsive text-nowrap">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Sr.No</th>
                          <th>Owner</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Created At</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody className="table-border-bottom-0">
                        {allprojects.map((repo, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td><strong>{repo.username}</strong></td>
                            <td>{repo.title}</td>
                            <td>
                              {repo.description
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
                                ))}
                            </td>
                            <td><span className="badge bg-label-primary me-1">{repo.createdAt}</span></td>
                            <td>
                              <a href={repo.repository} target="_blank"
                                rel="noopener noreferrer">
                                <button className="btn btn-primary">View</button>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
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
                <div className="col-md-6 col-lg-4 mb-3">
                  <div className="card text-center">
                    <div className="card-header">BLOGS</div>
                    <div className="card-body">
                      <h5 className="card-title">Read, what is going on | Write, what is going on</h5>
                      <p className="card-text">"Blogs are online journals where individuals or organizations share insights, stories, and information on various topics."</p>
                      <Link to='/readblog' className="btn btn-primary" >Go to blogs</Link>
                      <div className="card-footer text-muted">Read | Write</div>
                    </div>
                  </div>
                </div>

                <div className="content-backdrop fade"></div>
              </div>
            </div>
          </div>
        </div>


        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
      

    </>
  )
}

export default Home