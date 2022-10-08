import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SEPARATOR_COLOR } from '../styles/color';
import { scale } from '../utility/utility';

const SeparatorView = (props) => {
    return (
        <View style={props.taskType ? styles.separatorStyleTask : styles.separatorStyle}>
        </View>
    )
}

const styles = StyleSheet.create({

    separatorStyle: {
        height: scale(0.5),
        backgroundColor: SEPARATOR_COLOR
    },
    separatorStyleTask: {
        height: scale(0.5),
        backgroundColor: SEPARATOR_COLOR
    },

});

export default SeparatorView;