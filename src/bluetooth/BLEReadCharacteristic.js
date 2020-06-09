import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, Button} from 'react-native';
import { writeCharacteristic, readCharacteristic } from '../actions';
import Indicator from './Indicator';

function Item({ characteristic }) {
    return (
      <View style={styles.item}>
        <Text style={{ fontSize: 15 }}>ESTOU NO READ</Text>
        <Text style={styles.title}>{characteristic.uuid}</Text>
        <Text style={styles.subtext}>Notifiable: {characteristic.isNotifiable.toString()}</Text>
        <Text style={styles.subtext}>Notifying: {characteristic.isNotifying.toString()}</Text>
        <Text style={styles.subtext}>Readable: {characteristic.isReadable.toString()}</Text>
        <Text style={styles.subtext}>Indicatable: {characteristic.isIndicatable.toString()}</Text>
        <Text style={styles.subtext}>Writeable with Response: {characteristic.isWritableWithResponse.toString()}</Text>
        <Text style={styles.subtext}>Writeable without Response: {characteristic.isWritableWithoutResponse.toString()}</Text>
      </View>
    );
  }

function handleClick (ReduxStore, text){
    ReduxStore.writeCharacteristic(text + '\n');
    if(text === '5'){
      ReduxStore.readCharacteristic();
    }
}

function BLEReadCharacteristic(ReduxStore) {

  const [text, setText] = useState({'text':'write something to device'});

    return(
        <View style={{ margin: 10 }}>
          <Text>{ReduxStore.selectedCharacteristic.uuid}</Text>
            <FlatList
                data={[ReduxStore.selectedCharacteristic]}
                renderItem={({ item }) => 
                <>
                <Item characteristic={item} />
                <TextInput
                 onChangeText={(text) => setText({text})}
                  style={{ height: 40, color: 'black', borderColor: 'gray', borderWidth: 1 }}
                  value={text.text}
                />
                <Button
                  title="Write"
                  onPress={() => handleClick(ReduxStore, text.text)}
                ></Button>
                </>
                }
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={Indicator}
            />
          
        </View>
    );
}

function mapStateToProps(state){
  return {
    selectedCharacteristic: state.BLEs.selectedCharacteristic,
  };
}

const mapDispatchToProps = dispatch => ({
  writeCharacteristic: text => dispatch(writeCharacteristic(text)),
  readCharacteristic: () => dispatch(readCharacteristic())
})

export default connect(mapStateToProps,
                        mapDispatchToProps,
                            null, { forwardRef: true })(BLEReadCharacteristic);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 2,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 14,
    },
    subtext: {
        fontSize: 10,
      }
  });
 