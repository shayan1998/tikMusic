import React, {Component} from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity} from "react-native";
import { Button, Body, Icon, Text, Badge} from 'native-base';
import MainStyle,{primaryColor,gray} from '../MainStyle';

export default Header=(props)=>{

    let height=props.height || 60;
    return (
        <View style={[styles.body,{height:height+StatusBar.currentHeight}]}>
            
            <View style={{flex: 4,alignItems:'center',justifyContent:'flex-end'}}>
                <Text numberOfLines={1} style={[MainStyle.font,styles.mainText]}>{props.title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body:{
        paddingTop:StatusBar.currentHeight,
        flexDirection: 'row',
        backgroundColor: 'transparent'//gray,
    },
    mainText:{
        textAlignVertical:'center',
        fontSize: 25,
        marginBottom: 12,
    },
});
