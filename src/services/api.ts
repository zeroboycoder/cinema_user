import axios, { AxiosResponse } from "axios";
import { APP_API } from "./environment";

export const api = axios.create({
    baseURL: `${APP_API}`,
    headers: {
      "Content-type": "application/json",
    },
  });

  api.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("token") as string;
  
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export const loginServie=  async (data: { email: string; password: string }) => {    
    const res = await  api.post("/api/user/auth/login", data);
    return res.data.data
}
  
export const registerService=  async (data: { email: string; password: string }) => {    
  const res = await  api.post("/api/user/auth/register", data);
  return res.data.data
}

export const userProfileService = async ()=>{
     const res =  await api.get("/api/user/profile/by-id/1");
     return res.data.data
}

export const movielist = async (params:{
    page: string | number,
    pageSize:string | number,
    order:string,
    search:string,
})=>{
     const res = await api.get('/api/user/movies/lists',{
        params
     })
    return res.data.data

}



export const movieDetails = async (id:string)=> {
     const res = await api.get('/api/user/movies/by-id/'+id);
     return res.data.data
}

export const seatList = async (id:string)=>{
     const res = await api.get('/api/user/bookings/seat/by-id/'+id);
     return res.data.data
}

export const bookService=  async (data:any) => {    
  const res = await  api.post("/api/user/bookings/creatte", data);
  return res.data.data
}

export const historylist = async (params:{
  page: string | number,
  pageSize:string | number,
  order:string,
})=>{
   const res = await api.get('/api/user/bookings/list',{
      params
   })
  return res.data.data

}