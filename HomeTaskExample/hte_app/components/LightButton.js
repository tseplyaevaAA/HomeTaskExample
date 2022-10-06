import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WHITE_COLOR } from '../styles/color';

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
        borderColor: '#3785CC',
        borderRadius: 8,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: 'Roboto',
        color: '#3785CC',
        fontSize: 14
    }

});

export default LightButton;