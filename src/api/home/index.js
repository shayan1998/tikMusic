import axios,{getToken} from '../'


export async function slider () {
    return await axios.get(`music/slider`)
}


export async function latest (page=1) {
        return await axios.get(`music/playlist/latest?page=${page}`)
}


export async function trends (page=1) {
        return await axios.get(`music/playlist/trend?page=${page}`)
}


export async function playlist (id) {
        return await axios.get(`music/playlist/${id}/musics`)
}


export async function search (data) {
    return await axios.post(`search`,data)
}