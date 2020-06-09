import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { connect } from 'react-redux';
import { connectDevice, startScan } from '../actions';
import  Indicator  from '../bluetooth/Indicator';
import BLE from '../bluetooth/BLE';

class BleList extends Component{

    constructor(props){
        super(props);

        this.props.startScan();
    }

    handleClick = (device) => {
        this.props.connectDevice(device);
        this.props.navigation.navigate('BleServices');
    }

    render(){
        return(
            <View style={styles.container}>
                <FlatList data={this.props.BLEList}
                          renderItem={({ item }) => 
                            <View style={{ backgroundColor: 'blue' }}>
                            <TouchableOpacity onPress={()=> this.handleClick(item)}
                                                style={styles.button}
                                                >
                                <View style={{ backgroundColor: 'white', borderRadius: 5 }}>
                                    <Text style={{ fontSize: 17 }}>
                                        Tap to connect: {item.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            </View>
                            } 
                        keyExtractor={item => item.id.toString()}
                        ListEmptyComponent={Indicator}/>
                <BLE></BLE>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#DDD',
        flexDirection: 'row',
        padding: 15
    }
});

function mapStateToProps(state){
    return{
        BLEList: state.BLEs['BLEList']
    };
}

const mapDispatchToProps = dispatch => ({
    connectDevice: device => dispatch(connectDevice(device)),
    startScan: () => dispatch(startScan())
});

export default connect(mapStateToProps, mapDispatchToProps)(BleList);
