import 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Avatar,Title,Caption,Paragraph,Drawer,Text,Switch } from 'react-native-paper'
import { createDrawerNavigator } from '@react-navigation/drawer';
import  Icon  from 'react-native-vector-icons/Ionicons';
import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';




export function DrawerContent(props){
    <View style={{flex:1}}>
        <DrawerContentScrollView {...props}>
        <View>
            <Text>Main Content</Text>
        </View>
        </DrawerContentScrollView>
        <Drawer.section style={styles.bottomDrawerSection}>
            <DrawerItemList 
                icon={({color,size})=>(
                    <Icon name='ios-exit'
                    color={color}
                    size={size}/>
                )}
                
                label="Sign out"

            />
        </Drawer.section>

    </View>
}


const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });