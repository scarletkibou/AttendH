import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    ActivityIndicator,
    Button,
  } from 'react-native';

  const DetailsScreen = ({navigation})=>{
    return(
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text> Details Screen</Text>
        <Button title="Refresh"
        onPress={() => navigation.push("Details")}
        />
        <Button title="Go Home"
        onPress={() => navigation.navigate("Home")}
        />
        <Button title="Go back"
        onPress={() => navigation.goBack()}
        />
      </View>
    );
  };

  export default DetailsScreen;