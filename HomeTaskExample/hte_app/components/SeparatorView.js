import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SEPARATOR_COLOR } from '../styles/color';

const SeparatorView = (props) => {
    return (
        <View style={props.taskType ? styles.separatorStyleTask : styles.separatorStyle}>
        </View>
    )
}

const styles = StyleSheet.create({

    separatorStyle: {
        height: '0.2%',
        backgroundColor: SEPARATOR_COLOR
    },
    separatorStyleTask: {
        height: '0.6%',
        backgroundColor: SEPARATOR_COLOR
    },

});

export default SeparatorView;