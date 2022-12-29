import React, {useEffect, useState,useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { Container } from '../styles/FeedStyles';
import SignInScreen from '../Screens/SignInScreen';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
  const HomeScreen = ({navigation})=>{
    const{user,logout} = useContext(AuthContext); 
    const [time, setTime] = React.useState();
      const [
        currentLongitude,
        setCurrentLongitude
      ] = useState('...');
      const [
        currentLatitude,
        setCurrentLatitude
      ] = useState('...');
      const [
        locationStatus,
        setLocationStatus
      ] = useState('');
    
      useEffect(() => {
        const requestLocationPermission = async () => {
          if (Platform.OS === 'ios') {
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                  title: 'Location Access Required',
                  message: 'This App needs to Access your location',
                },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //To Check, If Permission is granted
                getOneTimeLocation();
                subscribeLocationLocation();
              } else {
                setLocationStatus('Permission Denied');
              }
            } catch (err) {
              console.warn(err);
            }
          }
        };
        requestLocationPermission();
        return () => {
          Geolocation.clearWatch(watchID);
        };
      }, []);
    
      const getOneTimeLocation = () => {
        setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition(
          //Will give you the current location
          (position) => {
            setLocationStatus('You are Here');
    
            //getting the Longitude from the location json
            const currentLongitude = 
              JSON.stringify(position.coords.longitude);
    
            //getting the Latitude from the location json
            const currentLatitude = 
              JSON.stringify(position.coords.latitude);
    
            //Setting Longitude state
            setCurrentLongitude(currentLongitude);
            
            //Setting Longitude state
            setCurrentLatitude(currentLatitude);
          },
          (error) => {
            setLocationStatus(error.message);
          },
          {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000
          },
        );
      };
    
      const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
          (position) => {
            //Will give you the location on location change
            
            setLocationStatus('You are Here');
            console.log(position);
    
            //getting the Longitude from the location json        
            const currentLongitude =
              JSON.stringify(position.coords.longitude);
    
            //getting the Latitude from the location json
            const currentLatitude = 
              JSON.stringify(position.coords.latitude);
    
            //Setting Longitude state
            setCurrentLongitude(currentLongitude);
    
            //Setting Latitude state
            setCurrentLatitude(currentLatitude);
          },
          (error) => {
            setLocationStatus(error.message);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 1000
          },
        );
      };
    React.useEffect(() => {
      const timer = setInterval(() => {
        setTime(new Date().toLocaleString());
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    return(
      <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <View style={styles.container}>
              <Image
                source={{
                  uri:
                    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
                }}
                style={{width: 100, height: 100}}
              />
              <Text style={styles.boldText}>
                {locationStatus}
              </Text>
              <Text
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 16,
                }}>
                Longitude: {currentLongitude}
              </Text>
              <Text
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 16,
                }}>
                Latitude: {currentLatitude}
              </Text>
              <View style={{marginTop: 20}}>
                <Button
                  title="Refresh"
                  onPress={getOneTimeLocation}
                />
              </View>
              <View style={{alignItems:'center',justifyContent:'center'}}>
        <Text           style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}> Hello  </Text>
        <Text           style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>{time}</Text>
        <Button title="Logout"
        onPress={() => logout()}
        />
      </View>
            </View>
            </View>
            </SafeAreaView>
      
    );
  };

  export default HomeScreen;


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    boldText: {
      fontSize: 25,
      color: 'red',
      marginVertical: 16,
      textAlign: 'center'
    },
  });





function EditProfileScreen({navigation}) {




  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
      <View style={styles.headContainer}>
        <View style={styles.imageContainer}>
        </View>
      </View>

      <View style={{}}>
        <Text style={styles.fontMenu}>Name</Text>
        <TextInput
          style={[styles.input,{alignSelf:'center'}]}
          label="Enter Name"
          value={Fname}
          onChangeText={text => setFname(text)}
        />

        <Text style={styles.fontMenu}>Surname</Text>
        <TextInput
          style={[styles.input,{alignSelf:'center'}]}
          label="Enter Last Name"
          value={Lname}
          onChangeText={text => setLname(text)}
        />
                <TextInput
          style={[styles.input,{alignSelf:'center'}]}
          label="Enter studentID"
          value={studentID}
          onChangeText={text => setStudentID(text)}
        />

        <Text style={styles.fontMenu}>Gender</Text>
        <View
          style={{
            alignContent: 'space-around',
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <RadioButton
            value="Male"
            status={gender === 'Male' ? 'checked' : 'unchecked'}
            onPress={() => setGender('Male')}
            theme={{colors: {primary: 'white'}}}
          />
          <Text style={{alignSelf: 'center', color: 'white', paddingRight: 50}}>
            Male
          </Text>
          <RadioButton
            value="Female"
            status={gender === 'Female' ? 'checked' : 'unchecked'}
            onPress={() => setGender('Female')}
            theme={{colors: {primary: 'white'}}}
          
          />
          <Text style={{alignSelf: 'center', color: 'white'}}>Female</Text>
        </View>
        <Text style={styles.fontMenu}>Date Of Birth</Text>
        <View>
          <TouchableOpacity onPress={() => setOpen(true)}
              style={[styles.inputDate,{alignSelf:'center'}]}>
              <Text style={{color: 'black', alignSelf: 'center',paddingTop:15}}>{date.toDateString()}</Text>
              <DatePicker
                modal
                mode="date"
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
                onDateChange={date => setDate(date)}
                value={date}
              />
            </TouchableOpacity>
            
        </View>
        <Button
            style={{marginTop: 50,width:'80%',alignSelf:'center'}}
            buttonColor='#EC8C32'
            mode="contained"
            onPress={() => updateProfile()}
            icon= "account-edit"
          
            
        >
            Update Profile
        </Button>

        
        <Button
            style={{marginTop: 10,width:'80%',alignSelf:'center'}}
            mode="contained"
            onPress={() => logout()}
            buttonColor='#2D52'
            icon="logout"
          
        >
            Sign Out
        </Button>

        
      </View>
      </ScrollView>     
    </SafeAreaView>
  );
}