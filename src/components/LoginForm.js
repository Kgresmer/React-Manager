import React, {Component} from 'react';
import {Text} from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from "./common";
import firebase from 'firebase';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { connect } from 'react-redux';

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const {email, password} = this.props;
        this.props.loginUser({email, password});
    }

    render() {
        const styles = style;
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>

                <CardSection>
                    <Button title="" onPress={this.onButtonPress.bind(this)}>
                        Login
                    </Button>
                </CardSection>

            </Card>
        );
    }
}

const style = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

//in the reducers index file we assigned the email reducer to the property auth
const mapStateToProps = state => {
  return {
      email: state.auth.email,
      password: state.auth.password
  };
};

export default connect(
    mapStateToProps,
    { emailChanged, passwordChanged, loginUser }
    )(LoginForm);