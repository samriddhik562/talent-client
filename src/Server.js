import axios from 'axios';

const UserApi = 'http://localhost:8080/users';
const CandidateApi = 'http://localhost:8080/candidates';
const ManagerApi = 'http://localhost:8080/managers';
const JobsApi = 'http://localhost:8080/jobs';
const ApplicationApi = 'http://localhost:8080/applications';

// Fetch all Users
export const getUsers = (callback) => {
    axios.get(UserApi)
        .then(response => callback(null, response.data))
        .catch(error => callback(error));
};

// Fetch Candidate data
export const getCandidate = (id, callback) => {
    axios.get(`${CandidateApi}/${id}`)
        .then(response => Candidatecallback(null, response.data))
        .catch(error => callback(error));
};

//Edit Candidate
export const updateCandidate = (id, data, callback) => {
    axios.put(`${CandidateApi}/${id}`, data)
        .then(() => callback(null))
        .catch(error => callback(error));
};

// Fetch Manager Data
export const getManager = (id, callback) => {
    axios.get(`${ManagerApi}/${id}`)
        .then(response => callback(null, response.data))
        .catch(error => callback(error));
};

// Fetch All Job Data
export const getJobs = (callback) => {
    axios.get(JobsApi)
        .then(response => callback(null, response.data))
        .catch(error => callback(error));
};

// Fetch Jobs under Specific Manager
export const getJobsFiltered = (id, callback) => {
    axios.get(`${ManagerApi}/jobs/${id}`)
        .then(response => callback(null, response.data))
        .catch(error => callback(error));
};

// Fetch Job from ID
export const getJob = (id, callback) => {
    axios.get(`${JobsApi}/${id}`)
        .then(response => callback(null, response.data))
        .catch(error => callback(error));
};

//Edit Manager
export const updateManager = (id, data, callback) => {
    axios.put(`${ManagerApi}/${id}`, data)
        .then(() => callback(null))
        .catch(error => callback(error));
};

export const updateJob = (id, data, callback) => {
    if (typeof callback !== 'function') {
        throw new TypeError('Callback must be a function');
    }
    axios.put(`${JobsApi}/${id}`, data)
        .then(() => callback(null))
        .catch(error => callback(error));
};

// Create a new Job
export const createJob = (managerId, data, callback) => {
    if (typeof callback !== 'function') {
        throw new TypeError('Callback must be a function');
    }
    axios.post(JobsApi, { managerId, ...data })
        .then(response => callback(null, response.data))
        .catch(error => callback(error));
};

// Delete a user by ID
export const deleteUser = (id, callback) => {
    axios.delete(`${UserApi}/${id}`)
        .then(() => callback(null))
        .catch(error => callback(error));
};

// Delete a Job by ID
export const deleteJob = (id, callback) => {
    axios.delete(`${JobsApi}/${id}`)
        .then(() => callback(null))
        .catch(error => callback(error));
};

// Update a user by ID
export const updateUser = (id, username, type, callback) => {
    axios.put(`${UserApi}/${id}`, { username, type })
        .then(response => callback(null, response.data))
        .catch(error => callback(error));
};

// Create a new user
export const createUser = (username, type, callback) => {
    axios.post(UserApi, { username, type })
        .then(response => callback(null, response.data))
        .catch(error => callback(error));
};

// Create a new Application
export const createApplication = (data, callback) => {
    axios.post(ApplicationApi, data)
        .then(response => callback(null, response.data))
        .catch(error => callback(error));
};

// Register a new user
export const registerUser = async ({id, username, password, type, callback}) => {
    const newUser = await fetch(UserApi, {method:"POST", mode: "cors", body:JSON.stringify({username,password,type}), headers: {"Content-Type":"application/json"}}, ).then((res) => res.json())
    console.log({newUser})
    if (newUser.type === "Candidate"){
        fetch(CandidateApi, {method:"POST", mode: "cors", body:JSON.stringify({userId: newUser.id}), headers: {"Content-Type":"application/json"}}, )
        console.log("successful candidate")
    }
    else
    {
        fetch(ManagerApi, {method:"POST", mode: "cors", body:JSON.stringify({userId: newUser.id}), headers: {"Content-Type":"application/json"}}, )
        console.log("successful manager")
    }
};
