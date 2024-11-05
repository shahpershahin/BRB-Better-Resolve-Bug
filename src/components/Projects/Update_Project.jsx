// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Update_Project() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { project } = location.state || {}; // Destructure safely in case state is undefined
  
//     if (!project) {
//       // If no project is found, redirect back
//       navigate('/yourproject');
//       return null; // Prevents rendering below until redirect happens
//     } // Access the project passed from Your_Projects.jsx
  
//   const [formData, setFormData] = useState({
//     phone: project ? project.phone : '',
//     title: project ? project.title : '',
//     repo: project ? project.repo : '',
//     description: project ? project.description : '',
//     file: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prevFormData) => ({ ...prevFormData, file: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append('phone', formData.phone);
//     data.append('title', formData.title);
//     data.append('repo', formData.repo);
//     data.append('description', formData.description);
//     data.append('file', formData.file);

//     try {
//       const response = await axios.post('http://localhost:9000/api/upload', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       if (response.status === 200) {
//         navigate('/yourproject');
//         alert('Project updated successfully');
//       }
//     } catch (error) {
//       console.error('Error uploading project:', error);
//       alert('Error uploading project');
//     }
//   };

//   return (
//     <div>
//       <h1>Update Project {project?._id}</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Phone:</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Repository:</label>
//           <input
//             type="text"
//             name="repo"
//             value={formData.repo}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//           ></textarea>
//         </div>
//         <div>
//           <label>Project File:</label>
//           <input type="file" name="file" onChange={handleFileChange} />
//         </div>
//         <button type="submit">Update Project</button>
//       </form>
//     </div>
//   );
// }

// export default Update_Project;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update_Project() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get the projectId from location state
    const projectId = location.state?.projectId;

    useEffect(() => {
        if (!projectId) {
            // If projectId is undefined, redirect back
            navigate('/yourproject');
        } else {
            // Fetch project data here using projectId
            console.log("Project ID:", projectId); // Check the projectId
            const fetchProjectData = async () => {
                try {
                    const response = await axios.get(`http://localhost:9000/api/projects/${projectId}`);
                    console.log(response.data); // Check if data is fetched correctly
                } catch (error) {
                    console.error('Error fetching project data:', error);
                }
            };

            fetchProjectData(); // Call the fetch function
        }
    }, [projectId, navigate]);

    return (
        <>
            {projectId && <h1>Update Project ID: {projectId}</h1>}
            <p>HELLO</p>
        </>
    );
}

export default Update_Project;
