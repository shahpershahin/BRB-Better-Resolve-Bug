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
            {/* <!-- Navbar --> */}

            <nav
              className="layout-navbar container-fluid navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
              id="layout-navbar"
            >
              <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                  <i className="bx bx-menu bx-sm"></i>
                </a>
              </div>

              <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                {/* <!-- Search --> */}
                <div className="navbar-nav align-items-center">
                  <div className="nav-item d-flex align-items-center">
                    <i className="bx bx-search fs-4 lh-0"></i>
                    <input
                      type="text"
                      className="form-control border-0 shadow-none"
                      placeholder="Search..."
                      aria-label="Search..."
                    />
                  </div>
                </div>
                {/* <!-- /Search --> */}

                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  {/* <!-- Place this tag where you want the button to render. --> */}
                  <li className="nav-item lh-1 me-3">
                    <a
                      className="github-button"
                      href="https://github.com/themeselection/sneat-html-admin-template-free"
                      data-icon="octicon-star"
                      data-size="large"
                      data-show-count="true"
                      aria-label="Star themeselection/sneat-html-admin-template-free on GitHub"
                    >Star</a>
                  </li>

                  {/* <!-- User --> */}
                  <li className="nav-item navbar-dropdown dropdown-user dropdown">
                    <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                      <div className="avatar avatar-online">
                        <img src="/assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
                      </div>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="#">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar avatar-online">
                                <img src="/assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <span className="fw-semibold d-block">John Doe</span>
                              <small className="text-muted">Admin</small>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <div className="dropdown-divider"></div>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bx bx-user me-2"></i>
                          <span className="align-middle">My Profile</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bx bx-cog me-2"></i>
                          <span className="align-middle">Settings</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <span className="d-flex align-items-center align-middle">
                            <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                            <span className="flex-grow-1 align-middle">Billing</span>
                            <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                          </span>
                        </a>
                      </li>
                      <li>
                        <div className="dropdown-divider"></div>
                      </li>
                      <li>
                        <a className="dropdown-item" href="auth-login-basic.html">
                          <i className="bx bx-power-off me-2"></i>
                          <span className="align-middle">Log Out</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  {/* <!--/ User --> */}
                </ul>
              </div>
            </nav>

            {/* <!-- / Navbar --> */}

            {/* <!-- Content wrapper --> */}


            <div className="content-wrapper">


              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                  <div className="col-lg-8 mb-4 order-0">
                    <div className="card">
                      <div className="d-flex align-items-end row">
                        <div className="col-sm-7">
                          <div className="card-body">
                            <h5 className="card-title text-primary">Congratulations {udata.username}! 🎉</h5>
                            <p className="mb-4">
                              You have done <span className="fw-bold">72%</span> more sales today. Check your new badge in
                              your profile.
                            </p>

                            <a href="javascript:;" className="btn btn-sm btn-outline-primary">View Badges</a>
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
                            <h3 className="card-title mb-2">##</h3>
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
                            <td><button><a href={repo.url} target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary">view</a></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <br />

                <div className="card">
                  <h5 className="card-header">Projects with Unread Chats</h5>
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

                {/* <!-- / Content --> */}









                <div className="content-backdrop fade"></div>
              </div>
              {/* <!-- Content wrapper --> */}
            </div>
            {/* <!-- / Layout page --> */}
          </div>
        </div>


        {/* <!-- Overlay --> */}
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
      {/* <!-- / Layout wrapper -->             */}

    </>
  )
}

export default Home