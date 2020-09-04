import axios from '../'


export async function categories () {
    return await axios.get(`music/category/list`)
}


export async function category (id) {
    return await axios.get(`/api/music/category/get/${id}`)
}