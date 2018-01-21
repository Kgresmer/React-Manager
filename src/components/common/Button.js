import React from 'react';
import {Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ children, onPress, buttonStyleDyn, textStyleDyn }) => {
    const { buttonStyle, textStyle } = styles;
    const combinedButtonStyles = StyleSheet.flatten([buttonStyle, buttonStyleDyn]);
    const combinedTextStyles = StyleSheet.flatten([textStyle, textStyleDyn]);
    return (
        <TouchableOpacity onPress={onPress} style={combinedButtonStyles}>
            <Text style={combinedTextStyles}>
                {children}
            </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    buttonStyle: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch', //stretch to fill the limits of the container
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5
    },
    textStyle: {
        color: '#ff7f41',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        alignSelf: 'center',
        justifyContent: 'center'
    }
});

export { Button };