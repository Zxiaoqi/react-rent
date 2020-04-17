import { Toast} from "antd-mobile"
import axios from "axios"
axios.defaults.baseURL = "http://157.122.54.189:9060";

export const baseURL = axios.defaults.baseURL;
export const request = axios.create({
	baseURL
});

let times=0; 
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    times++;
    Toast.loading("加载中...",0)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
const myInterceptor= request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    times--;
    if (times === 0) { 
        Toast.hide()
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
axios.interceptors.request.eject(myInterceptor);