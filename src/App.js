import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import LoginForm from "./components/LoginForm";


export default class App extends Component<{}> {
    componentWillMount() {
        const config = {
            apiKey: "AIzaSyB365jMu5F9G6dcmtTNJNeAubKu0vDz3L4",
            authDomain: "reactmanager-7d606.firebaseapp.com",
            databaseURL: "https://reactmanager-7d606.firebaseio.com",
            projectId: "reactmanager-7d606",
            storageBucket: "",
            messagingSenderId: "297100329819"
        };
        firebase.initializeApp(config);
    }

    render() {
        return (
            <Provider store={createStore(reducers)}>
                <LoginForm>
                </LoginForm>
            </Provider>
        );
    }
}
