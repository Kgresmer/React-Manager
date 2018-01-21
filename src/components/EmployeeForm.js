
import React, { Component } from 'react';
import {Picker, Text} from 'react-native';
import {CardSection, Input, Card} from "./common";
import { employeeUpdate } from '../actions';
import { connect } from 'react-redux';


class EmployeeForm extends Component {
    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Name"
                        keyboardType="default"
                        placeholder="Phillip"
                        value={this.props.name}
                        onChangeText={value => this.props.employeeUpdate({prop: 'name', value})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Phone"
                        keyboardType="phone-pad"
                        placeholder="555-5555"
                        value={this.props.phone}
                        onChangeText={value => this.props.employeeUpdate({prop: 'phone', value})}
                    />
                </CardSection>

                <CardSection style={styles.pickerContainer}>
                    <Text style={styles.pickerTextStyles}>Select a Shift</Text>
                    <Picker
                        style={{width: '100%', color: 'white'}}
                        selectedValue={this.props.shift}
                        onValueChange={value => this.props.employeeUpdate({prop: 'shift', value})}>
                        <Picker.Item label="Monday" value="Monday"/>
                        <Picker.Item label="Tuesday" value="Tuesday"/>
                        <Picker.Item label="Wednesday" value="Wednesday"/>
                        <Picker.Item label="Thursday" value="Thursday"/>
                        <Picker.Item label="Friday" value="Friday"/>
                        <Picker.Item label="Saturday" value="Saturday"/>
                        <Picker.Item label="Sunday" value="Sunday"/>
                    </Picker>
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    pickerTextStyles: {
        fontSize: 18,
        paddingLeft: 20,
        paddingTop: 10,
        color: 'white'
    },
    pickerContainer: {
        flexDirection: 'column'
    }
};

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate})(EmployeeForm);