import _ from 'lodash';
import React, {Component} from 'react';
import {Card, CardSection, Button, Confirm} from "./common";
import {connect} from 'react-redux';
import {employeeEdit, employeeUpdate, employeeFire} from "../actions";
import EmployeeForm from "./EmployeeForm";
import Communications from 'react-native-communications';

class EmployeeEdit extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: `Edit Employee: ${navigation.state.params.employee.name}`,
            headerTitleStyle: {
                textAlign: 'center',
                color: 'white'
            },
            headerStyle: {
                backgroundColor: '#ff7f41'
            }
        }
    };

    state = {showModal: false};

    componentWillMount() {
        const {params} = this.props.navigation.state;
        _.each(params.employee, (value, prop) => {
            this.props.employeeUpdate({prop, value});
        });
    }

    onButtonPress() {
        const {name, phone, shift} = this.props;
        this.props.employeeEdit({
            name,
            phone,
            shift,
            uid: this.props.navigation.state.params.employee.uid,
            navigate: this.props.navigation.navigate
        });
    }

    onTextPress() {
        const {phone, shift} = this.props;

        Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }

    onAccept() {
        this.setState({showModal: false});
        this.props.employeeFire({
            uid: this.props.navigation.state.params.employee.uid,
            navigate: this.props.navigation.navigate
        });
    }

    onDecline() {
        this.setState({showModal: false});
    }

    render() {
        return (
            <Card>
                <EmployeeForm {...this.props} />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onTextPress.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={() => this.setState({showModal: !this.state.showModal})}>
                        Fire This Person!
                    </Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this?
                </Confirm>
            </Card>
        )
    }
}


const mapStateToProps = (state) => {
    const {name, phone, shift} = state.employeeForm;

    return {name, phone, shift};
};

export default connect(mapStateToProps, {
    employeeEdit, employeeUpdate, employeeFire
})(EmployeeEdit);