import React, {Component} from 'react';
import { View, StyleSheet, StatusBar, Image, TouchableOpacity, TextInput } from "react-native";
import {  Icon} from 'native-base';
import MainStyle,{primaryColor,grayLight, gray ,graylighter} from '../components/MainStyle';


export default Input=(props)=>{

    let data=props;
    let bg=props.bg;
    let color=props.color;
    let style=props.style || {};

    return (
        <View style={[styles.body,{width:data.width,backgroundColor: bg},style]}>
            <View style={styles.input}>
                <TextInput 
                    keyboardType={data.keyboard} 
                    placeholderTextColor='rgba(255,255,255,0.5)'//"gray" 
                    placeholder={data.placeholder} 
                    //onChangeText={props.getText}  
                    onChangeText={(txt) => props.getText(props.name, txt)}
                    maxLength={props.max}
                    style={[MainStyle.font,{height:50,paddingHorizontal:10,flex:1,color},]}
                    value={props.value} defaultValue={props.value}

                    returnKeyType='done' onSubmitEditing={props.iconPress}
                />
            </View>

            {data.icon!='' &&
                <TouchableOpacity activeOpacity={0.7} onPress={props.iconPress} style={styles.iconBox}>
                    <Icon style={[styles.icon]} name={data.icon}/>
                </TouchableOpacity>
            }

        </View>
    );
}    


const styles = StyleSheet.create({
    body:{
        height:48,
        alignSelf:'center',
        flexDirection:'row',
        //backgroundColor: graylighter,
        borderRadius:8,
        marginTop: 8,
        marginBottom:5,
        overflow:'hidden',
        padding:5,
    },
    title:{
        textAlignVertical:'center',
        alignSelf:'center',
        paddingHorizontal: 3,
        //borderLeftWidth: 1,
        flex:1,
        color:grayLight
    },
    icon:{
        textAlignVertical:'center',
        alignSelf:'center',
        paddingHorizontal: 3,
        flex:1,
        color:'rgba(255,255,255,0.5)'//'gray'
    },
    input:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        //backgroundColor:'red',
        overflow:'hidden',
        flexDirection:'row'
    },
    text:{
        alignItems:'center',
        paddingHorizontal:15,
        height:20
    },
    iconBox:{
        alignItems:'center',
        paddingHorizontal:10,
    }
});



/*
Usage:

    <Input placeholder="Email" name="موبایل" width={'80%'} keyboard="number-pad" getText={this.getMobile}  icon=""/>
    <Input placeholder="Name" name="موبایل" width={'80%'} getText={this.getMobile}/>
    <Input placeholder="New Password" name="موبایل" icon="eye" width={'80%'} getText={this.getMobile}/>
    <Input placeholder="09*********" name="موبایل" icon="camera" width={'80%'} keyboard="number-pad" getText={this.getMobile}/>

*/