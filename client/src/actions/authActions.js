import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";


export const registerUser = (userData, history) => dispatch => {
  axios.post("/users/register", userData)
    .then(res => history.push("/users/login")) // Re-direct to login page
    .catch(error => dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    }));
}

// Login and get user token
export const loginUser = userData => dispatch => {
  axios.post("/users/login", userData)
    .then(res => {
      const {token} = res.data;
      window.localStorage.setItem("jwtToken", token); // Store token in browser local storage
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user payload data
      const decoded = jwt_decode(token);
      // Set as current user
      dispatch(setCurrentUser(decoded));
    })
   .catch(error => dispatch({
     type: GET_ERRORS,
     payload: error.response.data
   })
 );
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  }
}

// Logout user
export const logoutUser = () => dispatch => {
  // Remove token from lcoa storage
  window.localStorage.removeItem("jwtToken");
  // Remove Auth header
  setAuthToken(false);
  // Redirect to home page
  window.location.href = "/";
  // Dispatch empty payload to set isAuthenticated to false
  dispatch(setCurrentUser({}));
}
