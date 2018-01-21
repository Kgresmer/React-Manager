import React from 'react';
import {StyleSheet, View} from 'react-native';

const Card = ({children, dynamicStyles}) => {
    const combinedButtonStyles = StyleSheet.flatten([styles.containerStyle, dynamicStyles]);
    return (
        <View style={combinedButtonStyles}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2, //at any corners round them
        borderColor: '#ff7f41',
        borderBottomWidth: 0,
        shadowColor: '#ff7f41',
        backgroundColor: '#ff7f41',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2, //at any corners round them and this will match the card
        elevation: 1,
        marginLeft: 5, //spacing between cards
        marginRight: 5,
        marginTop: 10,

    }
});

export { Card };