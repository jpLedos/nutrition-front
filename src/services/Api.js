import { getItem } from '../services/LocalStorage'
import axios from 'axios';
import {  hasAuthenticated } from '../services/AuthApi'
import {API_URL} from '../config'

 const myAuthConfig = () => {
    let myConfig = {
        headers: {          
        accept : "application/json",
        }
    }
    if(hasAuthenticated().tokenValid ){
        myConfig.headers = {...myConfig.headers,Authorization: "Bearer " + getItem('nut-token'), }
    }
    return myConfig;
 }


export const getCurrentUser = async ()=> {

        return axios.get(`${API_URL}users`, myAuthConfig())
        .then(response =>response.data)
        .then(data => data[0]) 
        .catch(err => {console.log(err);})
};

export const getAllRecipes = async ()=> {
    return axios.get(`${API_URL}recipes`, myAuthConfig())
    .then(response =>response.data)
    .catch(err => {console.log(err)})
};

export const deleteOneRecipe = async ($id) => {
    return axios.delete(`${API_URL}recipes/${$id}`, myAuthConfig())
    .then(response =>response.data)
    .then(data => { getAllRecipes(); }) 
    .catch(err => {console.log(err)   })
};






