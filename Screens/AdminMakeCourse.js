import React, {useEffect, useState,useContext} from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { Container } from '../styles/FeedStyles';
import SignInScreen from '../Screens/SignInScreen';
  const HomeScreen = ({navigation})=>{
    const{user,logout} = useContext(AuthContext); 
    return(
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text> Hello {user.uid} </Text>
        <Button title="Logout"
        onPress={() => logout()}
        />
      </View>
    );
  };

  export default HomeScreen;