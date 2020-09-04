import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native";
import { Container, Content, Spinner, Button, Body, Icon, Text} from 'native-base';
import * as Animatable from 'react-native-animatable';
import MainStyle, { primaryColor, graylight } from './MainStyle';
import CustomIcon from '../components/CustomIcon';
import Selected from './Items/Selected'


 
export default PlayListItem2=(props)=>{ 


    let data=props.data; 

    return (
        <View style={styles.frame}>
            <Selected id={props.data.id}/>
            <TouchableOpacity activeOpacity={0.9} onPress={()=>props.press(data.id,data.name,data.count_musics)}>                    
                <View style={styles.namebox}>
                    <Image source={require('../../assets/images/placeholder.png')} defaultSource={require('../../assets/images/placeholder.png')} 
                        resizeMode="stretch" style={styles.image} 
                    />
                    <Text numberOfLines={1} style={[MainStyle.font]}>{data.name}</Text>
                    <View style={[styles.bottom]}>
                        <Text numberOfLines={1} style={[MainStyle.font,{fontSize:12}]}>{data.count_musics} Song's</Text>
                        <CustomIcon size={20} name="more" style={{color:'#fff'}}/>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
	
}

const width=Dimensions.get('window').width-40;
const styles = StyleSheet.create({
    frame:{
        marginHorizontal:10, 
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
    },
    bottom:{
        width:width/3,
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
