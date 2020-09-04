import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native";
import { Container, Content, Spinner, Button, Body, Icon, Text} from 'native-base';
import MainStyle, { primaryColor, graylight } from '../MainStyle';
import Selected from './Selected'


export default MusicItem=(props)=>{

    let data=props.data; 

    return (
        <View style={styles.frame}>
            <Selected id={props.data.id}/>
            <TouchableOpacity activeOpacity={0.9} onPress={()=>props.press(props.data.id)}>
                <Image source={{uri:data.image}} defaultSource={require('../../../assets/images/placeholder.png')} 
                    resizeMode="stretch" style={styles.image} 
                />
                <View style={styles.namebox}>
                    <Text numberOfLines={1} style={[MainStyle.font]}>{data.title}</Text>
                    {/* <Text numberOfLines={1} style={[MainStyle.font,{color:wlight}]}>{data.singer}</Text> */}
                </View>
            </TouchableOpacity>
        </View>
    );
	
}


const width=Dimensions.get('window').width-40;
const styles = StyleSheet.create({
    frame:{
        marginHorizontal:7, 
        marginTop:15,
        flex:1/3,
        borderRadius: 5,
        width:width/3,
    },
    image:{
        width:width/3,
        height:width/3,
        borderRadius:10,

    },
    namebox:{
        justifyContent:'center',
        marginVertical:2
    },
    bottom:{
        width:width/2,
        marginTop:5,
        backgroundColor:'rgba(0,0,0,0.3)',//graylight,
        paddingHorizontal:12,
        paddingVertical:2,
        borderRadius:25,
        color:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    }
});

