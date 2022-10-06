import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WHITE_COLOR } from '../styles/color';
import { StatusBar } from 'expo-status-bar';

const BackgroundView = (props) => {
    return (
        <View style={styles.containerStyle}>
            <StatusBar style='dark' />
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({

    containerStyle: {
        flex: 1,
        backgroundColor: WHITE_COLOR
    },

});

export default BackgroundView;