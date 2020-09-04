import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native";
import {Text} from 'native-base';
import MainStyle, { primaryColor, graylight } from '../MainStyle';
import CustomIcon from '../CustomIcon';


export default MusicListItem=(props)=>{
    let data=props.data;


    play=()=>{
        props.press(props.data.id,props.data.title)
    }
    play2=()=>{
        props.pressIcon(props.data.id,props.data.title,props.data.artist,props.data.cover)
    }

    return (
        <View style={styles.frame}>
            <TouchableOpacity activeOpacity={0.9} style={styles.namebox} onPress={this.play}>
                <Text numberOfLines={1} style={[MainStyle.font,{fontSize:20}]}>{data.title}</Text>
                <CustomIcon size={20} name="more" style={[MainStyle.font]} onPress={this.play2}/>
            </TouchableOpacity>
        </View>
    );
	
}


const styles = StyleSheet.create({
    frame:{
        flex:1,
        width:'85%',
        backgroundColor:'transparent',
        alignSelf:'center',
        paddingHorizontal:10,
        paddingVertical:20,
        borderBottomColor:'rgba(0,0,0,0.3)',//graylight,
        borderBottomWidth:2,
    },
    namebox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
});