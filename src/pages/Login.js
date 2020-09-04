import React, {Component,} from 'react';
import { View, StyleSheet, AsyncStorage, Keyboard, TouchableOpacity, Animated, Easing,Dimensions} from "react-native";
import { Container, Content, Spinner, Body, Icon, Text} from 'native-base';
import MainStyle, { primaryColor, baseUrl, gray, graylight } from '../components/MainStyle';
import Input from '../components/Input';
import {ActiveHeader} from '../layout';
import {Button,Selector} from '../components/ui'
import {register,login} from '../api/auth'
import { Transitioning, Transition } from 'react-native-reanimated';
import {NotifHelper} from '../Util/Notification/NotifHelper'
import {connect} from 'react-redux';
import {userPlaylists} from '../api/user/index'


class Login extends Component{

    constructor(props){
        super(props);
        this.state={
			animatedValue : new Animated.Value(0),
            login:true,
            load:false,
            Password:'', 
            RetypePassword:'',
            Email:'',
            Name:'',
            type:0,

            select:'option2',
            items:[
                {key:'option1',value:'Register'},
                {key:'option2',value:'Login'},
            ],
        }
        this.ref=React.createRef();
    }

    componentDidMount(){
        this.props.subPlayerHeight();
    }
    componentWillUnmount(){
        this.props.subPlayerHeight();
    }

    getText=(name, value)=>{   
        this.setState(() => ({ [name]: value }));
    }
    go=(e)=>{
        this.setState({select:e});
        this.ref.current.animateNextTransition();
    }
    transition=(
        <Transition.Together>
            <Transition.In interpolation="easeInOut" type="scale"/> 
            <Transition.Out interpolation="easeInOut" type="fade"/> 
            {/* <Transition.In interpolation="easeInOut" type="slide-left"/>
            <Transition.Out interpolation="easeInOut" type="slide-left"/> */}
        </Transition.Together>
    )



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
            this.props.navigation.replace('MainTabs');
        })
        .catch(error=>{
            this.setState({load:false});
            NotifHelper.show('danger','Sorry, There is some problem',4000)
        }); 
    }
    Register=async()=>{
        Keyboard.dismiss();
        this.setState({load:true});
        data={
            name: this.state.Name,
            email: this.state.Email,
            password: this.state.Password,
            password_confirmation: this.state.RetypePassword
        }        
        console.log(data)
        await register(data)
        .then(response=> {
            console.log(response);
            this.setState({load:false});
            AsyncStorage.setItem('token',response.data.data.token);
            this.props.ADDToken(response.data.data.token);
            this.props.navigation.replace('MainTabs');
        })
        .catch(error=>{
            //error.response.data.errors.///
            NotifHelper.show('danger','Sorry, There is some problem',4000)
            this.setState({load:false});
            console.log(error.response);
        });
    }
    Guest=()=>{
        this.props.navigation.replace('MainTabs')
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
            <ActiveHeader
                title="GeevSound"
            >
                <Content>

                    <Selector press={this.go} selected={this.state.select} items={this.state.items}/>

                    {this.state.select=='option2'?
                        <Transitioning.View style={styles.InputBox}
                            ref={this.ref} transition={this.transition} 
                        >
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
                            <Button press={this.Guest} title="Login As Guest"
                                backgroundColor={graylight} borderRadius={50} width="100%"
                            />
                        </Transitioning.View>
                    :
                        <Transitioning.View style={styles.InputBox}
                            ref={this.ref} transition={this.transition}
                        >
                            <Input 
                                placeholder="Name" name='Name'
                                width={'100%'} getText={this.getText}
                                bg={'rgba(0,0,0,0.3)'} color={'#fff'} icon=""
                            />

                            <Input 
                                placeholder="Email" name='Email'
                                width={'100%'} getText={this.getText}
                                bg={'rgba(0,0,0,0.3)'} color={'#fff'} icon=""
                            />

                            <Input 
                                placeholder='Password(at least 8 characters)' name="Password"
                                width={'100%'} getText={this.getText}
                                bg={'rgba(0,0,0,0.3)'} color={'#fff'} icon=""
                            />

                            <Input 
                                placeholder="Retype Password" name='RetypePassword'
                                width={'100%'} getText={this.getText}
                                bg={'rgba(0,0,0,0.3)'} color={'#fff'} icon=""
                                iconPress={this.Register}
                            />
                            <Button press={this.Register} title="Create Account" 
                                backgroundColor="#248f24" borderRadius={50} loading={this.state.load} width="100%"
                            />
                            <Button press={this.Guest} title="Login As Guest" 
                                backgroundColor={graylight} borderRadius={50} width="100%"
                            />
                        </Transitioning.View>
                    }


                    
                    {/* <View style={{marginVertical:20}}>
                        <View style={{width:'80%',alignSelf:'center',height:1,backgroundColor:graylight}}/>
                        <Text style={[styles.or,MainStyle.font]}>or</Text>
                    </View>
                    <View style={styles.bottomBox}>
                        <Button press={this.Register} title="login with google" icon="logo-google" style={{marginRight:5,flex:1,height:40}}
                            backgroundColor="#fff" borderRadius={50} width="50%" fontSize={10} color="#000"
                        />
                        <Button press={this.Register} title="login with facebook" icon="logo-facebook" style={{marginLeft:5,flex:1,height:40}}
                            backgroundColor="#fff" borderRadius={50} width="50%" fontSize={10} color="#000"
                        />
                    </View> */}

                </Content>
            </ActiveHeader>
		);
	}
}

const styles = StyleSheet.create({
    InputBox:{
        paddingVertical:20,
        textAlign:'center',
        width:'85%',
        alignSelf:'center',
    },   
    bottomBox:{
        flexDirection:'row',
        width:'80%',
        alignSelf:'center',
        marginBottom:20,
    },
    or:{
        backgroundColor:'gray',
        position:'absolute',
        top:-10,
        alignSelf:'center',
        paddingHorizontal:20,
        borderRadius:10
    }
});





const mapStateToProps=(state)=>{
	return{}
};
const mapDispatchToProps=(dispatch)=>{
	return{
        ADDToken: (token)=>{dispatch({type:'ADD_Token', token})},
        AddUserPlaylists: (UserPlaylists)=>{dispatch({type:'ADD_User_Playlist', UserPlaylists})},
        subPlayerHeight: ()=>{dispatch({type:'subPlayer_Height'})},
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
