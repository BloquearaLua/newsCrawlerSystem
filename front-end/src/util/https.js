import axios from 'axios';
import pubsub from 'pubsub-js'
const myAxios = axios.create();
const axiosGet = (url,token = '') => {
    return new Promise((resolve,reject) => {
        // console.log(url);
        if(token){
            myAxios.get(url,{
                headers: {
                    authorization: token
                }
            }).then(res => {
                resolve(res.data)
            }).catch(error => {
                // console.log(error.response.status);
                if(error.response.status === 401){
                    pubsub.publish("overdue1","axios get: token is overdue!")
                }
                reject(error.response)
            })
        }else{
            myAxios.get(url).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error.response)
            })
        }
    })
}

const axiosPost = (url,params,token) => {
    console.log("http",url,params,token);
    return new Promise((resolve,reject) => {
        if(token){
            myAxios.post(url,{
                ...params
            },{
                headers: {
                    authorization: token
                }
            }).then(res => {
                resolve(res.data)
            }).catch(error => {
                console.log(error.response.status);
                if(error.response.status){
                    pubsub.publish("overdue2","axios post is overdue");
                    localStorage.clear();
                }
                reject(error.request)
            })
        }else{
            myAxios.post(url,{
                ...params
            }).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error.response)
            })
        }
    })
}

const axiosDelete = (url,params,token) => {
    return new Promise((resolve,reject) => {
        if(token){
            myAxios.delete(url,{
                headers: {
                    authorization: token
                },
                data:{
                    ...params
                }
            }).then(res => {
                resolve(res.data)
            }).catch(error => {
                if(error.response.status){
                    pubsub.publish("overdue3","axios post is overdue");
                    localStorage.clear();
                }
                reject(error.response)
            })
        }
    })
}


export  {
    axiosGet,
    axiosPost,
    axiosDelete
}