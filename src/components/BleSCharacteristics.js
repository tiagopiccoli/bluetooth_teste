import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, FlatList } from 'react-native';

import { connect } from 'react-redux';
import { selectedCharacteristic, getServiceCharacteristics } from '../actions';
import Indicator from '../bluetooth/Indicator';

function Item({ characteristic }) {
    return (
      <View>
        <Text>{characteristic.uuid}</Text>
        <Text>Notifiable: {characteristic.isNotifiable.toString()}</Text>
        <Text>Notifying: {characteristic.isNotifying.toString()}</Text>
        <Text>Readable: {characteristic.isReadable.toString()}</Text>
        <Text>Indicatable: {characteristic.isIndicatable.toString()}</Text>
        <Text>Writeable with Response: {characteristic.isWritableWithResponse.toString()}</Text>
        <Text>Writeable without Response: {characteristic.isWritableWithoutResponse.toString()}</Text>
      </View>
    );
}

function handleClick(BleCharacteristic, characteristic){
    BleCharacteristic.selectedCharacteristic(characteristic);
    BleCharacteristic.navigation.navigate('BleCharacteristics');
}

function BleSCharacteristics(BleCharacteristics){
    BleCharacteristics.getServiceCharacteristics(BleCharacteristics.BLEService);
    return(
        <View style={styles.container}>
            <FlatList data={BleCharacteristics.BleServiceCharacteristics}
                      renderItem={ ({ item }) => 
                      <TouchableHighlight onPress={()=> handleClick(BleCharacteristics, item)}>
                          <Item characteristic={item}/>
                      </TouchableHighlight>}
                      keyExtractor={item => item.id.toString()}
                      ListEmptyComponent={Indicator}
                      />
        </View>

    );
}

function mapStateToProps(state){
    return {
        BLEService: state.BLEs.selectedService,
        BleServiceCharacteristics: state.BLEs.connectedServiceCharacteristics
    };
}

const mapDispatchToProps = dispatch => ({
    selectedCharacteristic: characteristic => dispatch(selectedCharacteristic(characteristic)),
    getServiceCharacteristics: service => dispatch(getServiceCharacteristics(service))
});

export default connect(mapStateToProps, 
                        mapDispatchToProps, 
                            null, { forwardRef: true })(BleSCharacteristics);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6495ed'
    }
});