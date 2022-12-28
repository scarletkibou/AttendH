import React, {useContext, useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import AttendScreen from '../Screens/AttendScreen';
import EditProfileScreen from '../Screens/EditProfileScreen';
import HistoryScreen from '../Screens/HistoryScreen';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomTabButton =({children,onPress})=>(
  <TouchableOpacity>
    style={
      {
        top:-30,
        justifyContent:'center',
        alignItems:'center',
        ...StyleSheet.shadow
      }
    }
    onPress={onPress}
    <View style={{
      width:70,
      height:70,
      borderRadius: 35,
      backgroundColor: "#90EE90",
    }}> {children}</View>
  </TouchableOpacity>
);
const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="ATTENH"
      component={HomeScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#2e64e5', 
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);


const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);



const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: '#2e64e5',
      }}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={({route}) => ({
          header: () => null,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color="#000000"
              size={size}
            />
          ),
        })}
      />
      
      <Tab.Screen
        name="PROFILE"
        component={ProfileScreen}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="person-outline" color="#000000" size={size} />
          ),
        }}
      />
        <Tab.Screen
        name="ATTEND"
        component={AttendScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="check"  color="#90EE90" size={size}  />
          ),
        }}
      />
        <Tab.Screen
        name="EDITPROFILE"
        component={EditProfileScreen}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="edit" color="#000000" size={size} />
          ),
        }}
      />
        <Tab.Screen
        name="HISTORY"
        component={HistoryScreen}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Entypo name="back-in-time" color="#000000" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;

const style =StyleSheet.create({
  shadow:{
    shadowColor: "#7F5DF0",
    shadowOffset:{
      width:0,
      height:10,
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5
  }
});
