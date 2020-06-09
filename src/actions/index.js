import { requestLocationPermission } from './Permission';
import Base64 from '../bluetooth/Base64';

export const addBle = (device) => {
    return {
        type: 'ADD_BLE',
        device
    }
}

export const connectedDevice = (device) => {
    return {
        type: 'CONNECTED_DEVICE',
        connectedDevice: device
    }
}

export const connectedServiceCharacteristics = (characteristics) => {
    return {
        type: 'CONNECTED_CHARACTERISTICS',
        connectedServiceCharacteristics: characteristics
    }
}

export const connectedDeviceServices = (services) => {
    return {
        type: 'CONNECTED_SERVICES',
        connectedDeviceServices: services
    }
}

export const selectedService = (serviceID) => {
    return {
        type: 'SELECTED_SERVICE',
        selectedService: serviceID
    }
}

export const selectedCharacteristic = (characteristic) => ({
    type: "SELECTED_CHARACTERISTIC",
    selectedCharacteristic: characteristic
  });
  
  export const changeStatus = (status) => ({
    type: "CHANGE_STATUS",
    status: status
  });

  export const startScan = () => {
      return (dispatch, getState, DeviceManager) => {
          const subscription = DeviceManager.onStateChange(state => {
              if(state === 'PoweredOn'){
                  dispatch(scan());
                  subscription.remove();
              }
          }, true);
      }
  }

  export const scan = () => {
    const permission = requestLocationPermission();
    if(permission){
    return (dispatch, getState, DeviceManager) => {
        DeviceManager.startDeviceScan(null, null, (error, device) => {
            dispatch(changeStatus("Scanning"));
            if(error){
                console.log(error);
            }
            if(device !== null){
                dispatch(addBle(device));
            }
        });
    }
  }
}

export const getServiceCharacteristics = (service) => {
    return (dispatch, getState, DeviceManager) => {
      let state = getState();
      DeviceManager.characteristicsForDevice(state.BLEs.connectedDevice.id, service.uuid)
        .then((characteristics) => {
          dispatch(connectedServiceCharacteristics(characteristics));
        });
    }
}

export const connectDevice = (device) => {
    return (dispatch, getState, DeviceManager) => {
      dispatch(changeStatus("Connecting"));
      DeviceManager.stopDeviceScan()
      device.connect()
        .then((device) => {
          dispatch(changeStatus("Discovering"));
          let allCharacteristics = device.discoverAllServicesAndCharacteristics()
          dispatch(connectedDevice(device));
          //console.log(device);
          return allCharacteristics;
        })
        .then((device) => {
          let services = device.services(device.id);
          return services;
        })
        .then((services) => {
          console.log("found services: ", services)
          dispatch(connectedDeviceServices(services));
        }, (error) => {
          console.log(error);
        })
    }
  }

  const crcVal = (array) => {
    let currentVal;
    let output = array.reduce(function (currentVal, index) {
      currentVal = currentVal + index;
      if (currentVal > 256) {
        currentVal = currentVal - 256;
      }
      return currentVal;
    })
    return 255 - output;
  }
  
  function str2ab(str) {
    console.log("string to send: ", str)
    var bufView = new Uint8Array(str.length);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return bufView;
  }
  
  export const writeCharacteristic = (data) => {
    return (dispatch, getState, DeviceManager) => {
      const state = getState();
      let Base64Data = Base64.btoa(data);
      state.BLEs.connectedDevice.writeCharacteristicWithoutResponseForService(
        state.BLEs.selectedService.uuid,
          state.BLEs.selectedCharacteristic.uuid,
           Base64Data
      );
    }
  }


/*
  export const writeCharacteristic = (text) => {
    return (dispatch, getState, DeviceManager) => {
      const state = getState();
      let buffer = str2ab(text)
      let packetsize = 20;
      let offset = 0;
      let packetlength = packetsize;
      do {
        if (offset + packetsize > buffer.length) {
          packetlength = buffer.length;
        } else {
          packetlength = offset + packetsize;
        }
        let packet = buffer.slice(offset, packetlength);
        //console.log("packet: ", packet)
        let base64packet = Base64.btoa(String.fromCharCode.apply(null, packet));
        state.BLEs.connectedDevice.writeCharacteristicWithoutResponseForService(
                      state.BLEs.selectedService.uuid, 
                        state.BLEs.selectedCharacteristic.uuid, 
                          base64packet)
        console.log(base64packet);
        //console.log(state.BLEs.selectedService.uuid);
        //console.log(state.BLEs.selectedCharacteristic.uuid);
        //console.log(state.BLEs.connectedDevice.name);
        offset += packetsize;
      } while (offset < buffer.length)
    }
  }*/

  export const readCharacteristic = () => {
      return (dispatch, getState, DeviceManager) => {
        const state = getState();
        DeviceManager.readCharacteristicForDevice(
        "18:93:D7:46:48:FB",
          "0000ffe0-0000-1000-8000-00805f9b34fb",
            "0000ffe1-0000-1000-8000-00805f9b34fb"
        ).then( (data) => { 
          console.log(data); 
        })
        .catch( (error) => {
          console.log(error);
        })
      }
  }
