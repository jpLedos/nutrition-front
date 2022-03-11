import axios from 'axios';
import {API_URL} from '../config'
import {myAuthConfig, myPatchConfig, myPostConfig} from './Api'


export const getAllPatients = async ()=> {
    return axios.get(`${API_URL}users`, myAuthConfig())
    .then(response =>response.data)
};

export const getOnePatient = async ($userId)=> {
    return axios.get(`${API_URL}users/${$userId}`, myAuthConfig())
    .then(response =>response.data)
};

export const setOnePatient = async ($userId, $myPatient) => {
    return axios.patch(`${API_URL}users/${$userId}`, $myPatient, myPatchConfig())
    .then(response =>response.data)
};

export const setNewPatient = async ($myPatient) => {
    return axios.post(`${API_URL}users`, $myPatient, myPostConfig())
    .then(response =>response.data)
};


export const deleteOnePatient = async ($id) => { 
    return axios.delete(`${API_URL}users/${$id}`, myAuthConfig())
    .then(response =>response.data)
    .catch(err => {console.log(err.response.data)})
};
