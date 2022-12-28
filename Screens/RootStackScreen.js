import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LogoScreen from './LogoScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="LogoScreen" component={LogoScreen} options={{header: () => null}}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen} options={{title: ''}}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen} options={{title: ''}}/>
    </RootStack.Navigator>
);

export default RootStackScreen;