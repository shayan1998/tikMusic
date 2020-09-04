import React, {Component} from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import { Container, Text, Icon, Spinner} from 'native-base';
// import {WaveIndicator,SkypeIndicator} from 'react-native-indicators';
import MainStyle,{ primaryColor } from '../MainStyle';



export default Loader=(props)=>{
    
    box=props.box?true:false;

    return (
        <View style={box? styles.box : styles.full}>
            {props.refresh?
                <TouchableOpacity onPress={props.doRefresh} style={styles.refresh}  hitSlop={{top:15,bottom:15,left:15,right:15}}>
                    <Icon name='refresh' style={{color:'#fff',alignSelf:'center'}}/>
                </TouchableOpacity>
                :
                <Spinner color={primaryColor}/>
            }
        </View> 
    );
}

const styles = StyleSheet.create({
    full:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        //marginTop:Dimensions.get('window').height/3
    },
    box:{
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
