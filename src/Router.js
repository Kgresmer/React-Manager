import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from "./components/LoginForm";
import EmployeeList from "./components/EmployeeList";
import EmployeeCreate from "./components/EmployeeCreate";
import { Actions } from 'react-native-router-flux';


const RouterComponent = () => {
  return (
    <Router>
        <Scene key="root" hideNavBar>
            <Scene key="auth">
                <Scene key="login"
                       component={LoginForm}
                       title="Please Login"
                       titleStyle={{alignSelf: 'center'}}
                />
            </Scene>
            <Scene key="main">
                <Scene key="employeeList"
                       component={EmployeeList}
                       rightTitle="Add"
                       onRight={() => { Actions.employeeCreate() }}
                       title="Employees"
                       titleStyle={{alignSelf: 'center'}}
                       initial
                />
                <Scene key="employeeCreate"
                       component={EmployeeCreate}
                       title="Create Employee"
                       titleStyle={{alignSelf: 'center'}}
                />
            </Scene>
        </Scene>
    </Router>
  );
};

export default RouterComponent;