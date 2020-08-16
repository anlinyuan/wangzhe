import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL:' http://localhost:8080/admin/api',
})
//请求头加上Authorization，值为'Bearer '+ localStorage.token
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (localStorage.token) {
      config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

//给http整体请求加一个拦截器,通用处理方案
http.interceptors.response.use(res=>{
    return res;
},err=>{
    if(err.response.data.message){
        Vue.prototype.$message({
            type:'error',
            message:err.response.data.message
        })
        if(err.response.status ===401){
            router.push('/login')
        }
    }
    return Promise.reject(err);
})

export default http