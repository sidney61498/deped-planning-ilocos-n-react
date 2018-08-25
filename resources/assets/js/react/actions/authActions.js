import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Login user

export const loginUser = userData => dispatch => {
    axios
        .post("/login", userData)
        .then(res => {
            localStorage.setItem("auth", res.data.token);

            const { token } = res.data;

            setAuthToken(token);

            const decoded = jwt_decode(token);

            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const setCurrentUser = userData => {
    return {
        type: SET_CURRENT_USER,
        payload: userData
    };
};

export const logoutUser = () => dispatch => {
    //
    localStorage.removeItem("auth");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};
