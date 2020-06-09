import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

class BLE extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{ paddingBottom: 12 }}>
                <Text>Status: {this.props.status}</Text>
                {this.props.connectedDevice && <Text>
                    Device: {this.props.connectedDevice.name}</Text>}
            </View>
        );
    }
}

function mapStateToProps(state){
    return {
        BLEList: state.BLEs.BLEList,
        connectedDevice: state.BLEs.connectedDevice,
        status: state.BLEs.status
    };
}

const mapDispatchToProps = dispatch => ({
    addBle: device => dispatch(addBle(device))
});

export default connect(mapStateToProps, 
                        mapDispatchToProps,
                        null, { forwardRef: true })(BLE);