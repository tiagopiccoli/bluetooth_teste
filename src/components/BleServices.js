import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, FlatList } from 'react-native';
import { connect } from 'react-redux';

import Indicator from '../bluetooth/Indicator';
import { selectedService, getServiceCharacteristics } from '../actions';

function Item ({ service }){
    return (
        <View style={styles.containerItem}>
            <Text style={styles.titleItem}>{service.uuid}</Text>
            <Text>Primary: {service.isPrimary.toString()}</Text>
        </View>
    );
}

function handleClick(bleServices, serviceID){
    bleServices.selectedService(serviceID);
    bleServices.navigation.navigate('BleSCharacteristics');
}

function BleServices(bleServices){
    return(
        <View style={styles.container}>
            <FlatList data={bleServices.connectedDeviceServices}
                      renderItem={({ item })=> 
                          <TouchableHighlight 
                            onPress={() => handleClick(bleServices, item)}
                            style={{ borderRadius: 5 }}
                            underlayColor={"#AAA"}>
                            <Item service={item}/>
                          </TouchableHighlight> }
                        keyExtractor={item => item.id.toString()}
                        ListEmptyComponent={Indicator} 
                      />
        </View>
    );
}

function mapStateToProps(state){
    return{
        connectedDeviceServices: state.BLEs.connectedDeviceServices
    }
}

const mapDispatchToProps = dispatch => ({
    selectedService: service => dispatch(selectedService(service)) 
});

export default connect(mapStateToProps, 
                        mapDispatchToProps, 
                          null, { forwardRef: true })(BleServices);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink'
    },
    containerItem: {
        backgroundColor: '#f9c2ff',
        padding: 10,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5
    },
    titleItem: {
        fontSize: 14
    }
});
