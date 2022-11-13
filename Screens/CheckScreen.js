import { StyleSheet, Text, View,StatusBar } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';

const CheckScreen = ({navigation})=>{
  return(
    <View  >
    <StatusBar backgroundColor='#009387' barStyle="light-content"/>
  <View >
      <Animatable.Image 
          animation="bounceIn"
          duraton="1500"
      source={require('../assets/logo2.png')}
      resizeMode="stretch"
      />
  </View>
  <Animatable.View 

      animation="fadeInUpBig"
  >
    </Animatable.View>
    </View>
  );
};

export default CheckScreen

const styles = StyleSheet.create({})