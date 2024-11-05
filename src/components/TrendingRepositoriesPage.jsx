import React, { useEffect, useState } from 'react'
import axios from 'axios';

function TrendingRepositoriesPage() {

    const [trendingRepos, setTrendingRepos] = useState([]);
    const [mostStarredRepos, setStarredRepo] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        axios.get('http://localhost:9000/api/trending-repos')
            .then(response => {
                console.log('Data fetched:', response.data); // Check the data structure here
                setTrendingRepos(response.data);
            })
            .catch(error => console.error('Error fetching trending repos:', error));
    }, []);

    function wordWrap(text, wordsPerLine = 8) {
        const words = text.split(' ');
        let wrappedText = [];

        for (let i = 0; i < words.length; i += wordsPerLine) {
            wrappedText.push(words.slice(i, i + wordsPerLine).join(' '));
        }

        return wrappedText;
    }

    useEffect(() => {
        axios.get('http://localhost:9000/api/most-starred-repos')
            .then(response => {
                console.log('Most starred repos:', response.data); // Ensure data structure
                setStarredRepo(response.data);
            })
            .catch(error => console.error('Error fetching most starred repos:', error));
    }, []);

    return (
        <>


            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <div className="layout-page">
                        <div className="content-wrapper">

                            <div class="container-xxl flex-grow-1 container-p-y">
                                <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard/</span> Trending Repository</h4>
                                <div className="card">
                                    <h5 className="card-header">Trending Repositories</h5>
                                    <div className="table-responsive text-nowrap">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Sr.No</th>
                                                    <th style={{ paddingLeft: '35px' }}>Name</th>
                                                    <th>Language</th>
                                                    <th>Description</th>
                                                    <th>Starts</th>
                                                    <th>Link</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-border-bottom-0">
                                                {trendingRepos.map((repo, index) => (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td><i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>{repo.name}</strong></td>
                                                        <td>{repo.language}</td>
                                                        <td>
                                                            {wordWrap(repo.description).map((line, i) => (
                                                                <span key={i}>{line}<br /></span>
                                                            ))}
                                                        </td>
                                                        <td><span className="badge bg-label-primary me-1">{repo.stars}</span></td>
                                                        <td>
                                                            <a href={repo.url}>"View {repo.name}"</a>
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr> <td>7</td><td colSpan='5'><i className="fab fa-angular fa-lg text-danger me-3"></i>see more</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <br/>
                                <br/>

                                <div className="card">
                                    <h5 className="card-header">Most Starred Repositories</h5>
                                    <div className="table-responsive text-nowrap">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Sr.No</th>
                                                    <th style={{ paddingLeft: '35px' }}>Name</th>
                                                    <th>Language</th>
                                                    <th>Description</th>
                                                    <th>Stars</th>
                                                    <th>Link</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-border-bottom-0">
                                                {mostStarredRepos.map((repo, index) => (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td><i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>{repo.name}</strong></td>
                                                        <td>
                                                            {wordWrap(repo.description).map((line, i) => (
                                                                <span key={i}>{line}<br /></span>
                                                            ))}
                                                        </td>
                                                        <td><span className="badge bg-label-primary me-1">{repo.stars}</span></td>
                                                        <td>
                                                            <a href={repo.url}>"View {repo.name}"</a>
                                                        </td>
                                                    </tr>
                                                ))}
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
    )
}

export default TrendingRepositoriesPage