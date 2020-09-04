import axios from '../'


export async function login (data) {
    return await axios.post(`user/auth/login`,data)
}


export async function register (data) {
    return await axios.post(`user/auth/register`,data)
}



export async function chengePassword (data,token) {
    return await axios.post(`user/password-change`,data,
        {headers: { Authorization: "Bearer "+token}} )
}