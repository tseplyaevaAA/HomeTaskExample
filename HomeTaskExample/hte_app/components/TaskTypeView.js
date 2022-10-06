import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WHITE_COLOR } from '../styles/color';

const TaskTypeView = (props) => {
    return (
        <TouchableOpacity
            style={styles.containerStyle}
            onPress={props.action}>
            <Text style={props.isHighlighted ? styles.textStyleHiglighted : styles.textStyle}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    containerStyle: {
        height: '33.3%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: 'Roboto',
        color: '#737A82',
        fontSize: 16
    },
    textStyleHiglighted: {
        fontFamily: 'Roboto',
        color: '#3785CC',
        fontSize: 16
    }

});

export default TaskTypeView;