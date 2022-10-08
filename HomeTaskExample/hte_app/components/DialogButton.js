import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { DIALOG_BTN_TEXT, DIALOG_BTN_TEXT_HIGH, WHITE_COLOR } from '../styles/color';

const DialogButton = (props) => {
    return (
        <TouchableOpacity
            style={[styles.containerStyle,
            {
                borderLeftColor: props.isHighlighted ? WHITE_COLOR : null,
                borderLeftWidth: props.isHighlighted ? 0.5 : 0,
                borderRightColor: props.isHighlighted ? null : WHITE_COLOR,
                borderRightWidth: props.isHighlighted ? 0 : 0.5
            }]}
            onPress={props.action}>
            <Text style={props.isHighlighted ? styles.textHighlightedStyle : styles.textStyle}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    containerStyle: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderTopColor: WHITE_COLOR,
        borderTopWidth: 1
    },
    textStyle: {
        fontFamily: 'Roboto',
        color: DIALOG_BTN_TEXT,
        fontSize: 17
    },
    textHighlightedStyle: {
        fontFamily: 'Roboto',
        color: DIALOG_BTN_TEXT_HIGH,
        fontSize: 17,
    }

});

export default DialogButton;