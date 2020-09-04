import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity} from "react-native";
import { Container, Content, Spinner, Button, Body, Icon, Text} from 'native-base';
import axios from 'axios';
import MainStyle, { primaryColor, baseUrl, accentColor } from '../components/MainStyle';
import CustomIcon from '../components/CustomIcon';


export default PlayerBtn=(props)=>{


    let size=props.size;
    let color=props.color;
    let backgroundColor=props.bg;

    return (
        <TouchableOpacity activeOpacity={0.85} onPress={props.fun} style={[styles.btn,{width:size,height:size,borderRadius:size/2,backgroundColor}]}>
            <CustomIcon size={15} name={props.icon} style={[MainStyle.font]}/>
        </TouchableOpacity>
    );
	
}



const styles = StyleSheet.create({
    btn:{
        backgroundColor:'#fff',
        marginHorizontal:4,
        alignItems:'center',
        justifyContent:'center'
    },
});
