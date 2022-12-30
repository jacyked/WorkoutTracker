import axios from 'axios';
import { BASE_URL } from '../constants';

//Open axios route, does not require Auth
export default axios.create({
    baseURL: BASE_URL
});
//Private axios route, requires auth
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});