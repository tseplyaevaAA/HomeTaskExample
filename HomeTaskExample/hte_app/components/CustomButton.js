import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { BUTTON_BACKGROUND_COLOR, WHITE_COLOR } from '../styles/color';

const CustomButton = (props) => {
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
        backgroundColor: BUTTON_BACKGROUND_COLOR,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: 'Roboto',
        color: WHITE_COLOR,
        fontSize: 16
    }

});

export default CustomButton;