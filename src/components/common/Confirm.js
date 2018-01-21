import React from 'react';
import {Text, View, Modal, StyleSheet} from 'react-native';
import {CardSection} from './CardSection';
import {Button} from './Button';
import {Card} from "./Card";


const Confirm = ({children, onAccept, onDecline, visible}) => {
    const {cardSectionStyles, textStyles, containerStyles} = styles;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => {}}
          >
          <View style={containerStyles}>
              <Card dynamicStyles={cardSectionStyles}>
                  <CardSection>
                      <Text style={textStyles}>{children}</Text>
                  </CardSection>
                  <CardSection>
                      <Button onPress={onAccept}>Yes</Button>
                      <Button onPress={onDecline}>No</Button>
                  </CardSection>
              </Card>
          </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
    cardSectionStyles: {
        justifyContent: 'center',
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 5
    },
    textStyles: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40,
        marginBottom: 15
    },
    containerStyles: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
});

export {Confirm};