import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import Router from './Router';


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
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}
