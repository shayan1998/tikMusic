import React, {Component} from 'react';
import { View, StyleSheet, AsyncStorage, Keyboard, TouchableOpacity} from "react-native";
import { Container, Content, Spinner, Button, Body, Icon, Text} from 'native-base';
import axios from 'axios';
import MainStyle, { primaryColor, baseUrl, graylight } from '../components/MainStyle';
import ToggleSwitch from 'toggle-switch-react-native'
import {ActiveHeader} from '../layout';


export default class Tab5 extends Component{

    constructor(props){
        super(props);
        this.state={
            load:true,
            Quality:false,
            background:false,
            Slider:false,
            Download:false,
        }
    }

    componentDidMount(){
    }

    
    //save the token or user id in AsyncStorage
    //AsyncStorage.setItem('user_token',response.data.data.access_token);
    // logout=async()=>{
    //     try {
    //         await AsyncStorage.removeItem('user_token');
    //         this.props.navigation.navigate('Login');
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


	render() {
		return (
            <ActiveHeader
                loading={this.state.load}
                refresh={this.state.refresh}
                title="Setting's"
                deRefresh={this.fetch}
            >
                <Content>

                    <View style={styles.frame}>
                        <TouchableOpacity activeOpacity={0.9} style={styles.namebox}>
                            <Text numberOfLines={1} style={[MainStyle.font,{fontSize:20}]}>Use low Quality for Listen</Text>
                            <ToggleSwitch
                                isOn={this.state.Quality}
                                onColor="green"
                                offColor="gray"
                                label=""
                                labelStyle={{ flex:1,backgroundColor:'red',paddingTop:25,marginHorizontal:10,alignSelf:'center'}}
                                size="medium"
                                onToggle={()=>this.setState({Quality:!this.state.Quality})}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.frame}>
                        <TouchableOpacity activeOpacity={0.9} style={styles.namebox}>
                            <Text numberOfLines={1} style={[MainStyle.font,{fontSize:20}]}>Plat in background</Text>
                            <ToggleSwitch
                                isOn={this.state.background}
                                onColor="green"
                                offColor="gray"
                                label=""
                                labelStyle={{ flex:1,backgroundColor:'red',paddingTop:25,marginHorizontal:10,alignSelf:'center'}}
                                size="medium"
                                onToggle={()=>this.setState({background:!this.state.background})}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.frame}>
                        <TouchableOpacity activeOpacity={0.9} style={styles.namebox}>
                            <Text numberOfLines={1} style={[MainStyle.font,{fontSize:20}]}>View home page Slider</Text>
                            <ToggleSwitch
                                isOn={this.state.Slider}
                                onColor="green"
                                offColor="gray"
                                label=""
                                labelStyle={{ flex:1,backgroundColor:'red',paddingTop:25,marginHorizontal:10,alignSelf:'center'}}
                                size="medium"
                                onToggle={()=>this.setState({Slider:!this.state.Slider})}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.frame}>
                        <TouchableOpacity activeOpacity={0.9} style={styles.namebox}>
                            <Text numberOfLines={1} style={[MainStyle.font,{fontSize:20}]}>Download hight quality</Text>
                            <ToggleSwitch
                                isOn={this.state.Download}
                                onColor="green"
                                offColor="gray"
                                label=""
                                labelStyle={{ flex:1,backgroundColor:'red',paddingTop:25,marginHorizontal:10,alignSelf:'center'}}
                                size="medium"
                                onToggle={()=>this.setState({Download:!this.state.Download})}
                            />
                        </TouchableOpacity>
                    </View>

                </Content>
            </ActiveHeader>
		);
	}
}



const styles = StyleSheet.create({
    frame:{
        flex:1,
        width:'85%',
        backgroundColor:'transparent',
        alignSelf:'center',
        borderBottomColor:graylight,
        borderBottomWidth:2,
    },
    namebox:{
        height:80,
        paddingHorizontal:10,
        paddingVertical:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

    },
});
