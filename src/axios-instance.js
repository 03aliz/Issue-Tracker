import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://issue-tracker-7d354.firebaseio.com/'
});

export default instance;