
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {getItem, addItem , removeItem} from './LocalStorage'


export function hasAuthenticated() {
  const token =getItem('nut-token')
  const tokenValidResult = token ? tokenIsValid( token ) : {tokenValid : false, roles : [], email : ""}
    if (false === tokenValidResult.tokenValid) {
        removeItem( token )
    }
    return tokenValidResult
}

 export function login(credentials) {
     return axios
        .post('https://127.0.0.1:8000/api/login',credentials)
        .then(response =>response.data.token) 
        .then(token => {
            addItem('nut-token',token)
            
            return true;
        })
}

export function logout() {
   
    removeItem('nut-token');
    hasAuthenticated();
}


function tokenIsValid(token) {
    const { email, exp, roles  } = jwtDecode(token);
    if (exp * 1000 > new Date().getTime()) {

        return {
            tokenValid : true,
            email,
            roles
        }
    } 

    return {
            tokenValid : false,
            email,
            roles
        };
}

