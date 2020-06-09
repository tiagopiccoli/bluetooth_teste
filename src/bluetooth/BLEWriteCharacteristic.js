import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { writeCharacteristic } from '../actions';

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

 function handleClick(ReduxStore, text){
    ReduxStore.writeCharacteristic(text + '\n');
 }

 function BLEWriteCharacteristc(ReduxStore){

    const [text, setText] = useState({'text':'write something to device' });
    
    return(
        <View style={{ flex: 1, padding: 10 }}>
        <Text>{ReduxStore.selectedCharacterist.uuid}</Text>
            <Item characteristic={ReduxStore.selectedCharacteristic}/>
            <TextInput onChange={ (text) => setText({ text })}
                       value={text.text}
                       style={{ height: 40, 
                                color: 'black', 
                                borderColor: 'gray', 
                                borderWidth: 1 }}/>
            <Button title="Write"
                    onPress={()=> handleClick(ReduxStore, text.text)}/>

        </View>
    );
 }

 function mapStateToProps(state){
     return {
         selectedCharacterist: state.BLEs.selectedCharacterist
     }
 }

 const mapDispatchToProps = dispatch => ({
    writeCharacteristic: text => dispatch(writeCharacteristic(text))
 });

 export default connect(mapStateToProps, 
                            mapDispatchToProps, 
                                null, { forwardRef: true })(BLEWriteCharacteristc);