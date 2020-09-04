import React, {Component} from 'react';
import { StyleSheet, View,TouchableOpacity} from 'react-native';
import { Container,  Spinner, Icon} from 'native-base';
//import {WaveIndicator,SkypeIndicator} from 'react-native-indicators';
import MainStyle,{primaryColor } from './MainStyle';



export default Loader=(props)=>{
    
    return (
        <View style={styles.frame}>
            {props.refresh?
                <TouchableOpacity 
                    onPress={props.doRefresh} style={styles.refresh}  
                    hitSlop={{top:15,bottom:15,left:15,right:15}}
                >
                    <Icon name='refresh' style={{color:'#fff',alignSelf:'center'}}/>
                </TouchableOpacity>
                :
                <Spinner color={primaryColor}/>
            }
        </View> 
    );
    
}

const styles = StyleSheet.create({
    frame:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
    },
    refresh:{
        backgroundColor:primaryColor,
        width:40,
        height:40,
        borderRadius:20,
        alignSelf:'center',
        justifyContent:'center',
        alignContent:'center'
    }
});
