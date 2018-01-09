import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from "./common";
import firebase from 'firebase';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };


    onButtonPress() {
        const { email, password, error } = this.state;
        this.setState({ error: '', loading: true});
        console.log('submitting form');
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this))
            });
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed', loading: false});
    }

    onLoginSuccess() {
        console.log('login success');
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''});
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return  (
            <Button
                onPress={this.onButtonPress.bind(this)}
                textStyleDyn={{color: 'green'}}
                buttonStyleDyn={{borderColor: 'green', backgroundColor: 'white'}}
            >
                Log In/Register
            </Button>
        );
    }

    render() {
        const styles = style;
        return (
          <Card>
              <CardSection>
                  <Input
                      placeholder={'jeepers@creepers.com'}
                      label={'Email: '}
                      value={this.state.email}
                      onChangeText={email => this.setState({email})}/>
              </CardSection>

              <CardSection>
                  <Input
                      secureTextEntry={true}
                      placeholder="password"
                      label="Password: "
                      value={this.state.password}
                      onChangeText={password => this.setState({password})}
                  />
              </CardSection> 

              <Text style={styles.errorTextStyle}>
                  {this.state.error}
              </Text>

              <CardSection>
                  {this.renderButton()}
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

export default LoginForm;