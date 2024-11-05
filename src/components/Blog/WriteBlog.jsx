import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { userContext } from '../../App';

function WriteBlog() {
  const { udata } = useContext(userContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(udata.username);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/api/blogs', { title, content,author });
      console.log('Blog saved:', response.data);
      setTitle('');
      setContent('');

    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };
  // Quill toolbar options for a more robust editing experience
  const toolbarOptions = [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],  // Basic formatting
    [{ 'color': [] }, { 'background': [] }],     // Text and background color
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],                          // Text alignment
    ['link', 'image', 'blockquote', 'code-block'], // Links, images, block quotes
    ['clean']                                   // Remove formatting
  ];

  const modules = {
    toolbar: toolbarOptions
  };

  return (
    <div className="layout-wrapper layout-content-navbar write-blog-wrapper">
      <div className="layout-container">
        <div className="layout-page d-flex justify-content-center align-items-center write-blog-page">
          <div className="row w-100" style={{ maxWidth: '800px' }}>
            <div className="col-12">
              <h2 className="text-center mt-4 mb-3 write-blog-header">Create Your Blog Post</h2>
              <div className="card mb-4 write-blog-card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="blogTitle" className="form-label">Blog Title</label>
                      <input
                        type="text"
                        className="form-control write-blog-input"
                        id="blogTitle"
                        placeholder="Enter a captivating title for your blog"
                        value={title}
                        onChange={handleTitleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="blogContent" className="form-label">Blog Content</label>
                      <ReactQuill
                        value={content}
                        onChange={handleContentChange}
                        modules={modules}
                        placeholder="Share your thoughts here..."
                        className="write-blog-editor"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 write-blog-submit">Publish Blog</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteBlog;
