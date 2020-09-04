import axios from 'axios';
const baseUrl="http://176.9.166.214/api/";
import {AsyncStorage} from 'react-native'


// export const getToken=AsyncStorage.getItem("token").then((value) => {
//     return value
// })
export let getToken=()=>{
    return new Promise((resolve,reject)=>{
        AsyncStorage.getItem("token")
        .then(function(response) {
            resolve(response)
        })
        .catch(function(error) {
            reject(error)
        });
    });
}

axios.defaults.baseURL = baseUrl;
export default axios;
