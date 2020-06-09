import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const Indicator = () => (
    <View style={[styles.container]}>
        <View style={[styles.horizontal]}>
            <Text>Carregando dados...</Text>
            <ActivityIndicator size="large" color="#8a2be2" />
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'column',
        alignItems: 'center'
    }
});

export default Indicator;