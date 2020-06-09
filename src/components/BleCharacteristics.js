import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, FlatList } from 'react-native';
import { connect } from 'react-redux';

import BLEReadCharacteristic from '../bluetooth/BLEReadCharacteristic';
import BLEWriteCharacteristic from '../bluetooth/BLEWriteCharacteristic';


function BleCharacteristics(ReduxStore){
    if(ReduxStore.selectedCharacteristic.isReadable){
        return(<BLEReadCharacteristic />);
    } else if(
        ReduxStore.selectedCharacteristic.isWritableWithResponse ||
        ReduxStore.selectedCharacteristic.isWritableWithoutResponse
        ){ 
            return(<BLEWriteCharacteristic />);
        }
}

function mapStateToProps(state){
    return {
        selectedCharacteristic: state.BLEs.selectedCharacteristic
    };
}

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, 
                        mapDispatchToProps, 
                            null, { forwardRef: true })(BleCharacteristics);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});