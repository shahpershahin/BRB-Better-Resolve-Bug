import React, { useState } from 'react';

function WriteBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can implement the logic to save the blog post
    console.log('Title:', title);
    console.log('Content:', content);
    // Reset the form
    setTitle('');
    setContent('');
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <div className="layout-page d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <div className="row w-100" style={{ maxWidth: '1000px' }}>
            <div className="col-12">
              <h6 className="mt-2 text-muted text-center">Write Blog</h6>
              <div className="card mb-4">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="blogTitle" className="form-label">Blog Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="blogTitle"
                        placeholder="Enter blog title"
                        value={title}
                        onChange={handleTitleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="blogContent" className="form-label">Blog Content</label>
                      <textarea
                        className="form-control"
                        id="blogContent"
                        rows="10"
                        placeholder="Enter blog content"
                        value={content}
                        onChange={handleContentChange}
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Publish</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
  );
}

export default WriteBlog;