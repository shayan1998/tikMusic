import React, {Component} from 'react';
import { StyleSheet,  View, Platform, Text, TouchableOpacity, Dimensions} from 'react-native';
import MainStyle from '../MainStyle'
import {Spinner, Icon} from 'native-base';


//Usage => <Button title=? backgroundColor=? borderRadius=?  press={?}/>
export default  Button = (props) => {
    let backgroundColor=props.backgroundColor || 'black';
    let color=props.color || 'white';
    let width=props.width;
    let borderRadius=props.borderRadius || 10;
    let loading=props.loading || false;
    let icon=props.icon || null;
    let fontSize=props.fontSize || 17;
    let style=props.style || {};

    return (
        <TouchableOpacity activeOpacity={0.85} onPress={props.press} 
            style={[styles.frame, {backgroundColor,width,borderRadius},style]}
        >
            {loading?
                <Spinner color={color}/>
                :
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    {icon!=null &&
                        <Icon name={icon} style={{marginHorizontal:5,color}}/>
                    }
                    <Text style={[MainStyle.font,styles.btnText,{fontSize,color}]}>{props.title}</Text>
                </View>
            }    
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    frame:{
        height:45,
        //padding:12,
        alignItems:'center',
        justifyContent:'center',
        marginVertical:5,
        alignSelf:'center',
    },
    btnText:{
        color:'#fff',
    }
});