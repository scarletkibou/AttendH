import { NavigationContainer } from '@react-navigation/native';
import React, {useContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import RootStackScreen from '../Screens/RootStackScreen';
import { AuthContext } from './AuthProvider';
import AppStack from './AppStack'

const Routes = ()=>{

    const {user, setUser} = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);
    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
      };    
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
      if (initializing) return null;
    return(
        <NavigationContainer>
            {user ? <AppStack /> : <RootStackScreen />}
        </NavigationContainer>
    );
};

export default Routes;