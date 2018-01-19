import React, { Component } from 'react';
import {Card, CardSection, Button } from "./common";
import { connect } from 'react-redux';
import { employeeCreate } from "../actions";
import EmployeeForm from "./EmployeeForm";
import * as ToastAndroid from "react-native";

class EmployeeCreate extends Component {

    onButtonPress() {
        const { name, phone, shift } = this.props;
        this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
        ToastAndroid.show('You have a new employee!', ToastAndroid.SHORT);
    }

    render() {
        return (
            <Card>
                <EmployeeForm {...this.props} />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
                    </Button>
                </CardSection>
            </Card>
        )
    }
}


const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, {
    employeeCreate
})(EmployeeCreate);