import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { BleManager } from 'react-native-ble-plx';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import BleList from './src/components/BleList';
import BleServices from './src/components/BleServices';
import BleSCharacteristics from './src/components/BleSCharacteristics';
import BleCharacteristics from './src/components/BleCharacteristics';
import rootReducer from './src/reducers';

const DeviceManager = new BleManager();

const Stack = createStackNavigator({
  BleList: {
    screen: BleList 
  },
  BleServices: {
    screen: BleServices
  },
  BleSCharacteristics: {
    screen: BleSCharacteristics
  },
  BleCharacteristics: {
    screen: BleCharacteristics
  }
});

const NavigationApp = createAppContainer(Stack);

const store = createStore(rootReducer, 
                applyMiddleware(thunk.withExtraArgument(DeviceManager)));


const App = () => (
  <>
    <Provider store={store}>
      <NavigationApp/>
    </Provider>
  </>
)

export default App;





