import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ReadBlog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <div className="layout-page">
          <div className="row mb-5" style={{ marginLeft: '2%', marginTop: '2%' }}>
            {blogs.map(blog => (
              <div className="col-md-6 col-lg-4" key={blog._id}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5>Title: {blog.title}</h5>
                    <h5>Author: {blog.author}</h5>
                    <p className="card-text" >{blog.content.substring(0, 100)}...</p>
                    <Link to={`/readblog/${blog._id}`} className="btn btn-primary">Read More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadBlog;
