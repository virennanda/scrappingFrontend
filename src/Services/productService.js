import { getJwt } from "./authService";
import http from "./httpService";

const API_URL =process.env.REACT_APP_BACKEND_URL;

const apiEndpoint = API_URL + "/products";
const getHeaders=()=>({
    headers:{
        authorization:`bearer ${getJwt()}`
    }
})
const getProducts = (page)=>{
    return http.get(`${apiEndpoint}/${page}`,getHeaders());
}
const deleteProduct = (id)=>{
    return http.delete(`${apiEndpoint}/${id}`,getHeaders());
}

export default{
    getProducts,
    deleteProduct
}

