import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LIGTH_BTN_COLOR } from '../styles/color';

const LightButton = (props) => {
    return (
        <TouchableOpacity
            style={styles.containerStyle}
            onPress={props.action}>
            <Text style={styles.textStyle}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    containerStyle: {
        height: '100%',
        width: '100%',
        borderColor: LIGTH_BTN_COLOR,
        borderRadius: 8,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: 'Roboto',
        color: LIGTH_BTN_COLOR,
        fontSize: 14
    }

});

export default LightButton;