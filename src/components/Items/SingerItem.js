import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native";
import { Container, Content, Spinner, Button, Body, Icon, Text} from 'native-base';
import MainStyle, { primaryColor, graylight } from '../MainStyle';
import CustomIcon from '../CustomIcon';


export default SingerItem=(props)=>{

    goToArtist=(id,name)=>{
        props.press(id,name)
    }

    let data=props.data;

    return ( 
        <View style={styles.frame}>
            <TouchableOpacity activeOpacity={0.9} onPress={()=>goToArtist(data.id,data.name)}>
                {/* <Image source={{uri:data.image}*} defaultSource={require('../../../assets/images/placeholder.png')} */}
                <Image source={require('../../../assets/images/placeholder.png')} defaultSource={require('../../../assets/images/placeholder.png')}
                    resizeMode="stretch" style={styles.image} 
                />
                <View style={styles.namebox}>
                    <Text numberOfLines={1} style={[MainStyle.font,,{fontSize:15}]}>{data.name}</Text>
                    <View style={[styles.bottom]}>
                        <Text numberOfLines={1} style={[MainStyle.font,{fontSize:12}]}>{data.music_count} Song's</Text>
                        <CustomIcon size={20} name="more" style={[MainStyle.font]}/>
                    </View>
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
        width: width/3,
    },
    image:{
        width:width/3,
        height:width/3,
        borderRadius:width/6,

    },
    namebox:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:3
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
