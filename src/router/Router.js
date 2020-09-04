import { createAppContainer, createDrawerNavigator } from "react-navigation";
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Splash from '../pages/Splash';
import MainTabs from '../pages/MainTabs';
import Login from '../pages/Login';
import Artist from '../pages/Artist';
import Album from '../pages/Album';
import Search from '../pages/Search';
import PlayList from '../pages/PlayList';
import FullPlayer from '../pages/FullPlayer'



//This is the stack navigator
const AppNavigator = createStackNavigator(
	{
        Splash: {screen: Splash}, 
		MainTabs: {screen: MainTabs},
		Login: {screen: Login},
		Artist: {screen: Artist},
		Album: {screen: Album},
		Search: {screen: Search},
		PlayList: {screen: PlayList},
		FullPlayer: {screen: FullPlayer},

	},  
	{
		initialRouteName: "Splash",
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}
);


//main navigator
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;



