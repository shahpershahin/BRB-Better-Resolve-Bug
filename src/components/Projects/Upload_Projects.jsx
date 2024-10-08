import React from 'react'

function Upload_Projects() {
    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <div className="layout-page">
                        <div className="content-wrapper">

                            <div class="container-xxl flex-grow-1 container-p-y">
                                <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard/</span> Upload Project</h4>


                                <div className="container-xxl flex-grow-1 container-p-y">
                                    <div className="row">
                                        <div className="col-xxl">
                                            <div className="card mb-4">
                                                <div className="card-header d-flex align-items-center justify-content-between">
                                                    <h5 className="mb-0">Upload Project</h5>

                                                </div>
                                                <div className="card-body">
                                                    <form>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-2 col-form-label" for="basic-icon-default-fullname">Name</label>
                                                            <div className="col-sm-10">
                                                                <div className="input-group input-group-merge">
                                                                    <span id="basic-icon-default-fullname2" className="input-group-text"
                                                                    ><i className="bx bx-user"></i></span>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="basic-icon-default-fullname"
                                                                        placeholder="John Doe"
                                                                        aria-label="John Doe"
                                                                        aria-describedby="basic-icon-default-fullname2"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-2 col-form-label" for="basic-icon-default-company">Title</label>
                                                            <div className="col-sm-10">
                                                                <div className="input-group input-group-merge">
                                                                    <span id="basic-icon-default-company2" className="input-group-text"
                                                                    ><i className="bx bx-buildings"></i></span>
                                                                    <input
                                                                        type="text"
                                                                        id="basic-icon-default-company"
                                                                        className="form-control"
                                                                        placeholder="ACME Inc."
                                                                        aria-label="ACME Inc."
                                                                        aria-describedby="basic-icon-default-company2"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-2 col-form-label" for="basic-icon-default-email">Email</label>
                                                            <div className="col-sm-10">
                                                                <div className="input-group input-group-merge">
                                                                    <span className="input-group-text"><i className="bx bx-envelope"></i></span>
                                                                    <input
                                                                        type="text"
                                                                        id="basic-icon-default-email"
                                                                        className="form-control"
                                                                        placeholder="john.doe"
                                                                        aria-label="john.doe"
                                                                        aria-describedby="basic-icon-default-email2"
                                                                    />
                                                                    <span id="basic-icon-default-email2" className="input-group-text">@example.com</span>
                                                                </div>
                                                                <div className="form-text">You can use letters, numbers & periods</div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-2 col-form-label" for="basic-icon-default-email">Project Repository</label>
                                                            <div className="col-sm-10">
                                                                <div className="input-group input-group-merge">
                                                                    <span className="input-group-text"><i className="bx bx-link"></i></span>
                                                                    <input
                                                                        type="text"
                                                                        id="basic-icon-default-email"
                                                                        className="form-control"
                                                                        placeholder="github.com/shahpershahin/rssaggregator"
                                                                        aria-label="github.com/shahpershahin/rssaggregator"
                                                                        aria-describedby="basic-icon-default-email2"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-2 form-label" for="basic-icon-default-phone">Phone No</label>
                                                            <div className="col-sm-10">
                                                                <div className="input-group input-group-merge">
                                                                    <span id="basic-icon-default-phone2" className="input-group-text"
                                                                    ><i className="bx bx-phone"></i></span>
                                                                    <input
                                                                        type="text"
                                                                        id="basic-icon-default-phone"
                                                                        className="form-control phone-mask"
                                                                        placeholder="658 799 8941"
                                                                        aria-label="658 799 8941"
                                                                        aria-describedby="basic-icon-default-phone2"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-2 form-label" for="basic-icon-default-message"> Project Description</label>
                                                            <div className="col-sm-10">
                                                                <div className="input-group input-group-merge">
                                                                    <span id="basic-icon-default-message2" className="input-group-text"
                                                                    ><i className="bx bx-comment"></i></span>
                                                                    <textarea
                                                                        id="basic-icon-default-message"
                                                                        className="form-control"
                                                                        placeholder="Hi, Do you have a moment to talk Joe?"
                                                                        aria-label="Hi, Do you have a moment to talk Joe?"
                                                                        aria-describedby="basic-icon-default-message2"
                                                                    ></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class=" row mb-3">
                                                            <label className="col-sm-2 form-label" for="basic-icon-default-message"> Project File</label>
                                                            <div className="col-sm-10">
                                                                <div className="input-group input-group-merge">
                                                                    <span id="basic-icon-default-message2" className="input-group-text"
                                                                    ><i className="bx bx-comment"></i></span>
                                                                    <input class="form-control" type="file" id="formFile" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div className="row justify-content-end">
                                                            <div className="col-sm-10">
                                                                <button type="submit" className="btn btn-primary">Upload</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Upload_Projects