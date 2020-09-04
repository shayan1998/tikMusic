import axios from '../'


export async function like (id,token) {
    return await axios.get(`music/like/${id}`,
        {headers: { Authorization: "Bearer "+token}} )
}


export async function likes (token) {
    return await axios.get(`music/likes`,
        {headers: { Authorization: "Bearer "+token}} )
}


export async function createPlaylist (data,token) {
    return await axios.post(`music/userPlaylist/create`,data,
        {headers: { Authorization: "Bearer "+token}} )
}


export async function addToPlaylist (data,token) {
    return await axios.post(`music/userPlaylist/add`,data,
        {headers: { Authorization: "Bearer "+token}} )
}


export async function userPlaylist (id,token) {
    return await axios.get(`music/userPlaylist/get/${id}`,
        {headers: { Authorization: "Bearer "+token}} )
}


export async function userPlaylists (token) {
    return await axios.get(`music/userPlaylist/all`,
        {headers: { Authorization: "Bearer "+token}} )
}