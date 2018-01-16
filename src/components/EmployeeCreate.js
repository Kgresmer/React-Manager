import React, { Component } from 'react';
import {Card, CardSection, Input, Button } from "./common";
import { connect } from 'react-redux';
import { employeeUpdate } from "../actions";

class EmployeeCreate extends Component {
    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="Phillip"
                        value={this.props.name}
                        onChangeText={text => this.props.employeeUpdate({prop: 'name', value: text})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Phone"
                        placeholder="555-555-5555"
                        value={this.props.phone}
                        onChangeText={text => this.props.employeeUpdate({prop: 'phone', value: text})}
                    />
                </CardSection>

                <CardSection>
                    // date thing
                </CardSection>

                <CardSection>
                    <Button>
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

export default connect(mapStateToProps, { employeeUpdate })(EmployeeCreate);