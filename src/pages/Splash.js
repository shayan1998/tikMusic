import React, {Component} from 'react';
import { StyleSheet,  View, AsyncStorage, Image} from 'react-native';
import { Container, Header,  Text, Spinner } from 'native-base';
import MainStyle,{primeryColor,accentColor} from '../components/MainStyle';
import {connect} from 'react-redux';
import {userPlaylists} from '../api/user/index'


class Splash extends Component{

    constructor(props){
        super(props);
        this.state={
        }
    }

   
    componentDidMount(){
        this.user();
    } 
    user=async()=>{
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                this.props.ADDToken(value);
                this.fetchUserPlaylists(value)
            }else{
                setTimeout(() => {
                    this.props.navigation.replace('Login');
                }, 1000);
            }
        } catch (error) {} 
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
    
    
    render() {
        return (
            <Container style={[MainStyle.bg]}>      
                <View style={styles.frame}>       	
                    <Text style={[MainStyle.font,{fontSize:80,textDecorationLine:'underline'}]}>Music</Text>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    frame:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:primeryColor,

    },
});


const mapStateToProps=(state)=>{
	return{
        Token:state.Token,
    }
};
const mapDispatchToProps=(dispatch)=>{
	return{
        ADDToken: (token)=>{dispatch({type:'ADD_Token', token})},
        AddUserPlaylists: (UserPlaylists)=>{dispatch({type:'ADD_User_Playlist', UserPlaylists})},
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
