import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView,{enableLatestRenderer} from 'react-native-maps';

const HomeScreen = () => {
  return (
    <View style={{flex:1}}>
      <MapView style={styles.map}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});