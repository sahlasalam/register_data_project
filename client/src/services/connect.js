import axios from 'axios'

export function saveDetails(data){
    return axios.post('http://localhost:4000/register', data)
}

export function loginData(data){
    return axios.post('http://localhost:4000/login', data)
}

export function fetchDetails(data){
    return axios.post('http://localhost:4000/getdata',data)
}