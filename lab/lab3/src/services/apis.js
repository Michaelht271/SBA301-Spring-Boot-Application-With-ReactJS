import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export const getAuthors = () => api.get('/authors').then(res => res.data);
export const getBanners = () => api.get('/banners').then(res => res.data);
export const getAllOrchids = () => api.get('/orchids').then(res => res.data);
export const getOrchidById = (id) => api.get(`/orchids/${id}`).then(res => res.data);
export const getUsers = () => api.get('/users').then(res => res.data);
export const createOrchid = (orchid) => api.post('/orchids', orchid).then(res => res.data);
export const updateOrchid = (id, orchid) => api.put(`/orchids/${id}`, orchid).then(res => res.data);
export const deleteOrchid = (id) => api.delete(`/orchids/${id}`).then(res => res.data);

const apis = {
    getAuthors,
    getBanners,
    getAllOrchids,
    getOrchidById,
    getUsers,
    createOrchid,
    updateOrchid,
    deleteOrchid,
};

export default apis;
