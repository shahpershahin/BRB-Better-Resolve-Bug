
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

import axios from 'axios';

function Home() {

  const [trendingRepos, setTrendingRepos] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:9000/api/trending-repos')
      .then(response => {
        console.log('Data fetched:', response.data); // Check the data structure here
        setTrendingRepos(response.data);
      })
      .catch(error => console.error('Error fetching trending repos:', error));
  }, []);

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
                            <h5 className="card-title text-primary">Congratulations John! 🎉</h5>
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
                              <div className="dropdown">
                                <button
                                  className="btn p-0"
                                  type="button"
                                  id="cardOpt3"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="bx bx-dots-vertical-rounded"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                                  <a className="dropdown-item" href="javascript:void(0);">View More</a>
                                  <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                                </div>
                              </div>
                            </div>
                            <span className="fw-semibold d-block mb-1">##</span>
                            <h3 className="card-title mb-2">##</h3>
                            <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> ##</small>
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
                              <div className="dropdown">
                                <button
                                  className="btn p-0"
                                  type="button"
                                  id="cardOpt6"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="bx bx-dots-vertical-rounded"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                                  <a className="dropdown-item" href="javascript:void(0);">View More</a>
                                  <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                                </div>
                              </div>
                            </div>
                            <span>Sales</span>
                            <h3 className="card-title text-nowrap mb-1">##</h3>
                            <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> ##</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4 order-2 mb-4">
                    <div className="card h-100">
                      <div className="card-header d-flex align-items-center justify-content-between">
                        <h5 className="card-title m-0 me-2">Trending Repos</h5>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="transactionID"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className='bx bx-git-repo-forked'></i>
                          </button>
                          
                        </div>
                      </div>
                      <div className="card-body">
                        <ul className="p-0 m-0">
                          {trendingRepos.map((repo, index) => (
                            <li key={index} className="d-flex mb-4 pb-1">
                              <div className="avatar flex-shrink-0 me-3">
                                <img src="../assets/img/icons/unicons/repo.png" alt={repo.name} className="rounded" />
                              </div>
                              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                <div className="me-2">
                                  <small className="text-muted d-block mb-1">{repo.language}</small>
                                  <h6 className="mb-0">{repo.name}</h6>
                                  <p className="text-muted">{repo.description}</p>
                                </div>
                                <div className="user-progress d-flex align-items-center gap-1">
                                  <h6 className="mb-0">{repo.stars}</h6>
                                  <span className="text-muted">Stars</span>
                                </div>
                                <div className="user-progress d-flex align-items-center gap-1">
                                  <h6 className="mb-0">{repo.url}</h6>
                                  <span className="text-muted">URL</span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="card">
                <h5 class="card-header">Trending Repositories</h5>
                <div class="table-responsive text-nowrap">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Language</th>
                        <th>Description</th>
                        <th>Starts</th>
                        <th>Link</th>
                      </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                    {trendingRepos.map((repo, index) => (
                    <tr>
                        <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>{repo.name}</strong></td>
                        <td>{repo.name}</td>
                        <td>
                        {repo.name}
                        </td>
                        <td><span class="badge bg-label-primary me-1">{repo.stars}</span></td>
                        <td>
                        {repo.name}
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <br/>

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