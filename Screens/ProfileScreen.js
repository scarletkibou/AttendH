import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import FormButton from '../components/FormButton';
import {TextInput, RadioButton, Button} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';


const ProfileScreen = ({navigation})=>{
  const {user, logout} = useContext(AuthContext);
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [gender, setGender] = useState('');
  const [studentID, setStudentID] = useState('');
  const [open, setOpen] = useState(false);
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
            setGender(documentSnapshot.data().gender);
            setStudentID(documentSnapshot.data().studentID);
          }
        });
    } else {
      console.log('User is signed out!');
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.userName}>{Fname} {Lname}</Text>
        <Text style={styles.aboutUser}>
        {gender}
        </Text>
        <Text style={styles.aboutUser}>
        {studentID}
        </Text>
        <View style={styles.userBtnWrapper}>
        </View>
        <Button style={{marginTop: 10,width:'80%',alignSelf:'center'}}
            mode="contained"
            onPress={() => logout()}
            buttonColor='#2D52'
            icon="logout" title="Logout"
        
        > Sign Out</Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A7F5F1',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
