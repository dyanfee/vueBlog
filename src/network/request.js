import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
const instance = axios.create({
    baseURL: "http://127.0.0.1:3000/api/",
    // baseURL: "/api/",
    timeout: 5000
})
if (localStorage.getItem('jwt')) {
    // 带上token
    instance.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('jwt').replace(/(^\")|(\"$)/g, '')
}
// 拦截器intercepors
instance.interceptors.request.use(config => {
    return config;
}, err => {
    if (err.message) {
        console.log(err.message);
    }
    return Promise.reject(err)
})

// 响应拦截
instance.interceptors.response.use(res => {
    return res.data
}, err => {
    if (err.message) {
        console.log(err.message);
    }
    return Promise.reject(err)

})
export function request(config) {

    return instance(config)
}