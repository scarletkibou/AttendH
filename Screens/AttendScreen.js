import React, {useState, useEffect,useContext} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../navigation/AuthProvider';
import {TextInput, RadioButton, Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker';
import Geolocation from '@react-native-community/geolocation';
import {getDistance, getPreciseDistance} from 'geolib';
  const AttendScreen = ({navigation})=>{
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
    const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [date, setDate] = useState(new Date);
  const [studentID, setStudentID] = useState('');
  const [open, setOpen] = useState(false);
  const[Course,setCourse]=useState('');
  const[Enroll,setEnroll]=useState('');
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);
  function onAuthStateChanged(user) {
    if (user) {
      console.log('User is signed in!');
      console.log('UserID : ' + auth().currentUser.uid);
      firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            console.log('User Data', documentSnapshot.data());
            setFname(documentSnapshot.data().fname);
            setLname(documentSnapshot.data().lname);
            setStudentID(documentSnapshot.data().studentID);
            setDate(documentSnapshot.data().date.toDate());
            setEnroll(documentSnapshot.data().Enroll);
          }
          console.log('date => ', date)
        });
    } else {
      console.log('User is signed out!');
    }
  }

    const CheckAttendance = () => {
        firestore()
        .collection('Attendance')
        .add({
            UID:auth().currentUser.uid,
            fname: Fname,
            lname: Lname,
            studentID : studentID,
            time,
            currentLatitude,
            currentLongitude,
            Course,

        })
        .then(() => {
            console.log('Attendance Check!!!');
            alert('Attendance Check!!!');
        });
    }

    const calculateDistance = () => {
      var dis = getDistance(
        {latitude: 7.9833, longitude: 98.3662},
        {latitude: 8.6446, longitude: 99.8984},
      );
      alert(
        `Distance\n\n${dis} Meter\nOR\n${dis / 100000} KM`
      );
    };



    const calculatePreciseDistance = () => {
      var pdis = getPreciseDistance(
        {latitude: 7.9833, longitude: 98.3662},
        {latitude: 8.6446, longitude: 99.8984},
      );
      firestore()
        .collection('AttendanceReport')
        .add({
            UID:auth().currentUser.uid,
            fname: Fname,
            lname: Lname,
            studentID : studentID,
            time,
            Course,
            Status: "Out of boundary",
          }).then(() => {
            console.log('Attendance Check!!!');
            alert(
              `Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 100000} KM`
            );
        });
    };
    /*      <Text> {currentLatitude}
      {currentLongitude}
      {time}
      
      </Text> */
    return(
<SafeAreaView style={styles.container}>
<ScrollView >
<View style={styles.headContainer}>
  <View style={styles.imageContainer}>
  </View>
</View>
    <Text style={styles.fontMenu} > Type your course:</Text>

    <View style={styles.container}>
    <TextInput
          style={[styles.input,{alignSelf:'center'}]}
          label="Enter course"
          value={Course}
          onChangeText={text => setCourse(text)}
        />
    </View>
    <Button
      style={{marginTop: 50,width:'80%',alignSelf:'center'}}
      buttonColor='#EC8C32'
      mode="contained"
      onPress={() => getOneTimeLocation()}
      icon= "account-edit"
  >
      Confirmed course?
  </Button>
  <Button
      style={{marginTop: 50,width:'80%',alignSelf:'center'}}
      buttonColor='#EC8C32'
      mode="contained"
      onPress={() => CheckAttendance()}
      icon= "account-edit"
  >
      CheckAttendance
  </Button>
  <Button
      style={{marginTop: 50,width:'80%',alignSelf:'center'}}
      buttonColor='#EC8C32'
      mode="contained"
      onPress={() => calculatePreciseDistance()}
      icon= "account-edit"
  >
      Check Integrity
  </Button>
</ScrollView>     
</SafeAreaView>
);
}


  export default AttendScreen;


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4CD3E8',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    boldText: {
      fontSize: 25,
      color: 'red',
      marginVertical: 16,
      textAlign: 'center'
    },  container: {
      flex: 1,
      width: '100%',
      maxWidth: 430,
      paddingBottom: 200,
      backgroundColor: '#fff',
    },
    headContainer: {
      backgroundColor: '#fff',
      alignSelf: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: 17,
    },
    imageContainer: {
      alignSelf: 'center',
      justifyContent: 'center',
    },
    functioncalbmi: {
      marginTop: 15,
      marginBottom: 1,
      height: '100%',
    },
  
    button: {
      textTransform: 'uppercase',
      color: '#FFF',
      fontSize: 20,
    },
    fontMenu: {
      alignItems:'center',
      fontFamily: 'verdana',
      fontSize: 18,
      paddingLeft: 40,
      paddingTop: 10,
      color: '#EC8C32',
      fontWeight: 'bold',
      fontStyle: 'italic',
      // alignSelf: 'flex-start',
    },
    buttonContainer: {
      backgroundColor: '#EC8C32',
      alignSelf: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: 17,
      marginTop: 15,
    },
    bannerContainer: {
      width: '100%',
      height: 150,
      resizeMode: 'stretch',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginBottom: 10,
      marginTop: 10,
      alignSelf: 'center',
    },
    input: {
      paddingBottom: 1,
      width: '80%',
      alignSelf: 'flex-start',
      margin: 10,
    },
    inputDate: {
      width: '80%',
      alignSelf: "flex-start",
      margin : 10,
      backgroundColor: "#FFFFFF",
      height: 50,
    },
    
  });
  



  
