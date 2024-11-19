import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/blogs/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };
        fetchBlog();
    }, [id]);

    if (!blog) return <p>Loading...</p>;

    return (
        <div className="layout-wrapper layout-content-navbar write-blog-wrapper">
            <div className="layout-container">
                <div className="layout-page d-flex justify-content-center align-items-center write-blog-page">
                    <div className="row w-100" style={{ maxWidth: '800px' }}>
                        <div className="col-12"></div>
                        <div className="container">
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="navs-pills-top-home" role="tabpanel">
                                    <h2>author: {blog.author}</h2>
                                    {/* Render the blog content with HTML tags */}
                                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                                    {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;
