import {EMPLOYEE_SAVE_SUCCESS, EMPLOYEE_UPDATE, EMPLOYEES_FETCH_SUCCESS} from './types';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

export const employeeUpdate = ({ prop, value}) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    }
};

export const employeeCreate = ({ name, phone, shift }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .push({name, phone, shift})
            .then(() => {
                dispatch({type: EMPLOYEE_SAVE_SUCCESS });
                Actions.employeeList({ type: 'reset'});
            });
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

export const employeeEdit = ({ name, phone, shift, uid }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees${uid}`)
            .set({name, phone, shift})
            .then(() => {
                dispatch({type: EMPLOYEE_SAVE_SUCCESS });
                Actions.employeeList({ type: 'reset'});
            });
    };
};

export const employeeFire = ({ uid }) => {
    const { currentUser } = firebase.auth();

    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/employees${uid}`)
            .remove()
            .then(() => {
                ToastAndroid.show('That jerk is gone!', ToastAndroid.SHORT);
                Actions.employeeList({ type: 'reset'});
            })
            .catch((error) => {
                ToastAndroid.show('They just wont die! \n ' + error, ToastAndroid.LONG);
            });
    };
};
