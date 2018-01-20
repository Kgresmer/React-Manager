import {EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER} from "./types";
import firebase from 'firebase';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({email, password, navigate}) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user, navigate))
            .catch((error) => {
                console.log(error);
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => loginUserSuccess(dispatch, user, navigate))
                    .catch(() => loginUserFail(dispatch));
            })
    };
};

const loginUserSuccess = (dispatch, user, navigate) => {
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
    navigate('Employees');
};

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL});
};