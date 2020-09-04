import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native";
import { Container, Content, Spinner, Button, Body, Icon, Text} from 'native-base';
import MainStyle, { primaryColor, graylight } from '../MainStyle';
import {connect} from 'react-redux';
import CustomIcon from '../CustomIcon'


Selectod=(props)=>{
    return (
        <View>
            {props.id==props.PlayListId &&
                <CustomIcon size={20} name="music-player-buttons" style={{color:primaryColor,position:'absolute',top:10,left:10,zIndex:10}}/>
            }
        </View>
    );
	
}
const mapStateToProps=(state)=>{
	return{PlayListId: state.PlayListId}
};
const mapDispatchToProps=(dispatch)=>{return{}};
export default connect(mapStateToProps, mapDispatchToProps)(Selectod);

const styles = StyleSheet.create({
});

