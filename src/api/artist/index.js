import axios from '../'


export async function artists (page=1) {
    return await axios.get(`artist/list?page=${page}`)
}


export async function artist (id) {
    return await axios.get(`artist/${id}/musics`)
}
