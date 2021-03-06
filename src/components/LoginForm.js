import React, {Component} from 'react';
import {Text, View, ToastAndroid} from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from "./common";
import {emailChanged, passwordChanged, loginUser} from '../actions';
import {connect} from 'react-redux';

class LoginForm extends Component {
    static navigationOptions = {
        title: 'Please Login',
        headerStyle: {
            backgroundColor: '#ff7f41'
        },
        headerTitleStyle:  {
            color: 'white'
        }
    };

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const {email, password} = this.props;
        const {navigate} = this.props.navigation;
        this.props.loginUser({email, password, navigate});
    }

    renderError() {
        if (this.props.error) {
            ToastAndroid.show(this.props.error, ToastAndroid.SHORT);
            return (
                <View style={{backgroundColor: 'white'}}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large"/>;
        }

        return (
            <Button title="" onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        keyboardType="email-address"
                        placeholder="cheese23@host.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        keyboardType="default"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>

                {this.renderError()}

                <CardSection>
                    {this.renderButton()}
                </CardSection>

            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

//in the reducers index file we assigned the email reducer to the property auth
const mapStateToProps = ({auth}) => {
    const {email, password, error, loading} = auth;
    return {email, password, error, loading};
};

export default connect(
    mapStateToProps,
    {emailChanged, passwordChanged, loginUser}
)(LoginForm);