import { createBottomTabNavigator } from "react-navigation-tabs";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { Component } from 'react';
import { Icon } from "native-base";
import Tab1 from '../tabs/Tab1'; 
import Tab2 from '../tabs/Tab2';
import Tab3 from '../tabs/Tab3';
import Tab4 from '../tabs/Tab4';
// import Tab5 from '../tabs/Tab5';
import * as Animatable from 'react-native-animatable';
import CustomIcon from '../components/CustomIcon'
import {TabBar} from '../components/ui';
import { primaryColor } from "../components/MainStyle";


export default createBottomTabNavigator(
	{
		Tab1: {
            screen: Tab1,
            navigationOptions:{
                tabBarIcon:({tintColor,focused })=>(
                    <CustomIcon size={25} name="home-1" color={tintColor} style={styles.icon}/>
                )
            }
        },
        Tab2: {
            screen: Tab2,
            navigationOptions:{
                tabBarIcon:({tintColor,focused })=>(
                    <CustomIcon size={25} name="Page-1" color={tintColor} style={styles.icon}/>
                )
            }
        },
        Tab3: {
            screen: Tab3,
            navigationOptions:{
                tabBarIcon:({tintColor,focused })=>(
                    <CustomIcon size={25} name="Icon---Event---Filled" color={tintColor} style={styles.icon}/>  
                )
            }
        },
        Tab4: {
            screen: Tab4,
            navigationOptions:{
                tabBarIcon:({tintColor,focused })=>(
                    <CustomIcon size={25} name="Icon---Search---Filled" color={tintColor} style={styles.icon}/>   
                )
            }
        },
        // Tab5: {
        //     screen: Tab5,
        //     navigationOptions:{
        //         tabBarIcon:({tintColor,focused })=>(!focused?
        //             <CustomIcon size={25} name="Icon---Thumbs-Up---Dark" color={tintColor} style={styles.icon}/>
        //             :
        //             <View  style={styles.tab2}>
        //                 <CustomIcon size={25} name="Icon---Thumbs-Up---Dark" color={tintColor} style={styles.icon}/>
        //                 <Text style={styles.text}>Setting</Text>
        //             </View>
        //         )
        //     }
        // },
	}, 
	{
        tabBarComponent:TabBar,
        initialRouteName :'Tab1',
        tabBarOptions: {
            showLabel:false,
            activeTintColor: primaryColor,
            inactiveTintColor: '#fff',
        },
    }
);


const styles = StyleSheet.create({
    tab2:{
        width:'60%',
        alignItems: 'center',
        justifyContent:'center',
        zIndex:1,
        marginBottom:2,
        borderRadius:4,
        padding:5,
    },
    text:{
        color:primaryColor,
        fontSize:10
    }
});
