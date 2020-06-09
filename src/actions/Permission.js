import { PermissionsAndroid } from 'react-native';

export async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
          title: 'Location permission for bluetooth scanning',
          message: 'whatever',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ); 
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permissão de localização para verificação bluetooth');
        return true;
      } else {
        console.log('Revogada a permissão de localização');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }