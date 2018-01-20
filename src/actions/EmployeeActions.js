import {EMPLOYEE_SAVE_SUCCESS, EMPLOYEE_UPDATE, EMPLOYEES_FETCH_SUCCESS} from './types';
import firebase from 'firebase';
import { ToastAndroid } from "react-native";

export const employeeUpdate = ({ prop, value}) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    }
};

export const employeeCreate = ({ name, phone, shift, navigate }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .push({name, phone, shift})
            .then(() => employeeSaveSuccess(dispatch, navigate));
    };
};

export const employeesFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch({
                    type: EMPLOYEES_FETCH_SUCCESS,
                    payload: snapshot.val()
                })
            })
    };
};

export const employeeEdit = ({ name, phone, shift, uid, navigate }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({name, phone, shift})
            .then(() => employeeSaveSuccess(dispatch, navigate));
    };
};

export const employeeFire = ({ uid, navigate }) => {
    const { currentUser } = firebase.auth();

    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .remove()
            .then(() => employeeFireSuccess(navigate))
            .catch((error) => {
                ToastAndroid.show('They just wont die! \n ' + error, ToastAndroid.LONG);
            });
    };
};

const employeeFireSuccess = (navigate) => {
    ToastAndroid.show('That jerk is gone!', ToastAndroid.SHORT);
    navigate('Employees');
};

const employeeSaveSuccess = (dispatch, navigate) => {
    ToastAndroid.show('Success', ToastAndroid.SHORT);
    dispatch({type: EMPLOYEE_SAVE_SUCCESS });
    navigate('Employees');
};