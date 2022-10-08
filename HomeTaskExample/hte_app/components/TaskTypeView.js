import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { BUTTON_BACKGROUND_COLOR, TASK_TYPE_TEXT_COLOR } from '../styles/color';

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
        color: TASK_TYPE_TEXT_COLOR,
        fontSize: 16
    },
    textStyleHiglighted: {
        fontFamily: 'Roboto',
        color: BUTTON_BACKGROUND_COLOR,
        fontSize: 16
    }

});

export default TaskTypeView;