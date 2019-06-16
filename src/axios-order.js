import axios from 'axios';

const Instance = axios.create({
        baseURL: 'https://burger-app-7aaf7.firebaseio.com/',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    })

export default Instance;