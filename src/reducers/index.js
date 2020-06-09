import { combineReducers } from 'redux';

import BleReducer from '../reducers/BleReducer'

export default combineReducers({
    BLEs: BleReducer
});
