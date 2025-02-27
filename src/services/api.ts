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

export const loginServie = async (data: { email: string; password: string }) => {
  const res = await api.post("/api/user/auth/login", data);
  return res.data.data
}

export const registerService = async (data: { email: string; password: string }) => {
  const res = await api.post("/api/user/auth/register", data);
  return res.data.data
}

export const userProfileService = async (userId: any) => {
  const res = await api.get(`/api/user/profile/by-id/${userId}`);
  return res.data.data
}

export const movielist = async (params: {
  page: string | number,
  pageSize: string | number,
  order: string,
  search: string,
}) => {
  const res = await api.get('/api/user/movies/lists', {
    params
  })
  return res.data.data

}



export const movieDetails = async (id: string) => {
  const res = await api.get('/api/user/movies/by-id/' + id);
  return res.data.data
}

export const seatList = async (id: string, dateId: any) => {
  const res = await api.get(`/api/user/bookings/seat/by-id/${id}?dateId=${dateId}`);
  return res.data.data
}

export const bookService = async (data: any) => {
  const res = await api.post("/api/user/bookings/create", data);
  return res.data.data
}

export const historylist = async (params: {
  page: string | number,
  pageSize: string | number,
  order: string,
}) => {
  const res = await api.get('/api/user/bookings/list', {
    params
  })
  return res.data.data

}

export const deleteBooking = async (id: number) => {
  const res = await api.delete(`/api/user/bookings/delete/${id}`);
  return res.data.data
}

export const listselect = async (id: any) => {
  const res = await api.get(`/api/user/bookings/by-id/${id}`);
  return res.data.data
}

export const updateBook = async (data: any, id) => {
  const res = await api.put(`/api/user/bookings/update/${id}`, data);
  return res.data.data
}

export const updateProfileService = async (data: any, id) => {
  const res = await api.put("/api/user/profile/update/" + id, data);
  return res.data.data
}

export const upcomingMovieLists = async () => {
  const res = await api.get(`/api/admin/movies/upcoming/lists?page=1&pageSize=30&order=DESC`);
  return res.data.data
}


export const upcomingMovieDetail = async (id: any) => {
  const res = await api.get(`/api/admin/movies/upcoming/lists/${id}`);
  return res.data.data
}
