import React, {Component} from 'react';
import { View, StyleSheet, Keyboard, AsyncStorage, TouchableOpacity} from "react-native";
import { Container, Content, Spinner, Body, Icon, Text} from 'native-base';
import MainStyle, { wlight, graylight } from '../MainStyle';
import Input from '../Input';
import {Button} from '../ui'
import {NotifHelper} from '../../Util/Notification/NotifHelper'
import {connect} from 'react-redux';
import {userPlaylists} from '../../api/user/index'
import {login} from '../../api/auth'


class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            load:false,
            Email:'',
            Password:'',
        }
    }
    getText=(name, value)=>{   
        this.setState(() => ({ [name]: value }));
    }

    doLogin=async()=>{
        Keyboard.dismiss();
        this.setState({load:true});
        data={
            email: this.state.Email,
            password: this.state.Password,
        }        
        await login(data)
        .then(response=> {
            console.log(response);
            this.setState({load:false});
            AsyncStorage.setItem('token',response.data.data.token);
            this.props.ADDToken(response.data.data.token);
            this.fetchUserPlaylists(response.data.data.token);
            // this.props.navigation.replace('MainTabs');
            this.props.done();
        })
        .catch(error=>{
            this.setState({load:false});
            NotifHelper.show('danger','Sorry, There is some problem',4000)
        }); 
    }

    fetchUserPlaylists=async(token)=>{
        await userPlaylists(token)
            .then(response=> {
                console.log('userPlaylists',response);//response.data.data
                this.props.AddUserPlaylists(response.data.data.playlist)
                this.props.navigation.navigate('MainTabs');
            })
            .catch(error=>{
                console.log('userPlaylists',error.response);
                this.props.navigation.navigate('MainTabs');
            });
    }

    Register=()=>{
        this.props.navigation.navigate('Login')
    }

	render() {
        return (
            <View style={styles.frame}>
                <Input 
                    placeholder="Email" name='Email'
                    width={'100%'} getText={this.getText}
                    bg={'rgba(0,0,0,0.3)'} color={'#fff'} icon=""
                />

                <Input 
                    placeholder="Password" name='Password'
                    width={'100%'} getText={this.getText}
                    bg={'rgba(0,0,0,0.3)'} color={'#fff'} icon=""
                    iconPress={this.doLogin}
                />
                <Button press={this.doLogin} title="Login"  
                    backgroundColor="#248f24" borderRadius={50} loading={this.state.load} width="100%"
                />
                <Button press={this.Register} title="Register"
                    backgroundColor={graylight} borderRadius={50} width="100%"
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    frame:{
        paddingVertical:20,
        textAlign:'center',
        width:'85%',
        alignSelf:'center',
    },
});

const mapStateToProps=(state)=>{
	return{}
};
const mapDispatchToProps=(dispatch)=>{
	return{
        ADDToken: (token)=>{dispatch({type:'ADD_Token', token})},
        AddUserPlaylists: (UserPlaylists)=>{dispatch({type:'ADD_User_Playlist', UserPlaylists})},
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
