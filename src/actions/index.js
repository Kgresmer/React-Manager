import { EMAIL_CHANGED, PASSWORD_CHANGED } from "./types";
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

export const loginUser = ({ email, password }) => {
  firebase.auth().signInWtihEmailAndPassword(email, password)
      .then(user => console.log(user))
    // still need catch
};