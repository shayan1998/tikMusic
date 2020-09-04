import React, {Component} from 'react';
import { View, StyleSheet, Image, Alert, AsyncStorage, Keyboard, TouchableOpacity} from "react-native";
import { Container, Content, Spinner, Text} from 'native-base';
import MainStyle, { primaryColor, baseUrl, gray, graylight } from '../components/MainStyle';
import Input from '../components/Input';
import Login from '../components/Items/Login';
import {ActiveHeader} from '../layout';
import {chengePassword} from '../api/auth'
import {NotifHelper} from '../Util/Notification/NotifHelper'
import {connect} from 'react-redux';



class Tab4 extends Component{

    constructor(props){
        super(props);
        this.state={
            refresh:false,
            btn:true,
            load:true,
            oldPassword:'',
            Password:'',
            retypePassword:'',
        }
    }
    componentDidMount(){
        this.user()
    }
    user=()=>{
        if(this.props.Token==''){
            this.setState({load:false})
        }
    }
    getText=(name, value)=>{   
        this.setState(() => ({ [name]: value }));
    }



    Update=async()=>{
        if(this.state.Password=='' || this.state.retypePassword=='' || this.state.oldPassword==''){
            return;
        }
        Keyboard.dismiss();
        this.setState({btn:false});
        data={
            old_password: this.state.oldPassword,
            password: this.state.Password,
            password_confirmation: this.state.retypePassword
        }        
        await chengePassword(data,this.props.Token)
        .then(response=> {
            console.log(response);
            this.setState({btn:true});
            NotifHelper.show('success','Great, Your password is change',4000)
        })
        .catch(error=>{
            console.log(error.response);
            this.setState({btn:true});
            NotifHelper.show('danger','Sorry, There is some problem',4000)
        }); 
        
    }


    ask=()=>{
        Alert.alert(
            'Alert',
            'Did you want to exit?',
            [
              {text: 'Yes',onPress: this.logout},
              {text: 'No',},
            ],
            {cancelable: false},
        );
    }
    logout=async()=>{
        try {
            await AsyncStorage.removeItem('token');
            this.props.ADDToken("");
            this.props.navigation.replace('Login');
        } catch (error) {
            console.log(error)
        }
    }
    loginDone=()=>{
        this.setState({load:true})
    }

	render() {
		return (
            <ActiveHeader
                title="You Account"
                deRefresh={this.fetch}
            >
                <Content>

                    {/* <View style={styles.box}>
                        <View>
                            <Image source={require('../../assets/images/cover1.jpg')} style={styles.image} />
                        </View>
                        <View style={{alignItems:'center',width:'70%'}}>
                            <Text style={[MainStyle.font,]}>shayan m</Text>
                        </View>
                    </View> */}

                    {this.state.load?
                    <View>
                        <Text style={[MainStyle.font,styles.text]}>Change Password</Text>


                        <View style={styles.InputBox}>
                            <Input 
                                placeholder="Old Password" name='oldPassword' 
                                width={'100%'} getText={this.getText}
                                bg={'rgba(0,0,0,0.3)'} color={'#fff'} icon="eye"
                            />
                            <Input 
                                placeholder="New Password" name='Password' 
                                width={'100%'} getText={this.getText}
                                bg={'rgba(0,0,0,0.3)'} color={'#fff'} icon="eye"
                            />
                            <Input 
                                placeholder="Retype New Password" name='retypePassword' 
                                width={'100%'} getText={this.getText}
                                bg={'rgba(0,0,0,0.3)'} color={'#fff'} icon="eye-off"
                                iconPress={this.Update}
                            />
                            {this.state.btn?
                                <TouchableOpacity activeOpacity={0.85} style={styles.btn} onPress={this.Update}>
                                    <Text style={[MainStyle.font]}>Change Password</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity activeOpacity={0.85} style={styles.btn}>
                                    <Spinner color={'#fff'}/>
                                </TouchableOpacity>
                            }
                        </View>

                        <TouchableOpacity activeOpacity={0.85} style={styles.logoutbtn} onPress={this.ask}>
                            <Text style={[MainStyle.font]}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                    :

                    <Login done={this.loginDone} navigation={this.props.navigation}/>
                    }

                </Content>
            </ActiveHeader>
		);
	}
}



const styles = StyleSheet.create({
    box:{
        marginVertical:10,
        flexDirection:'row',
        width:'85%',
        borderRadius:40,
        height:50,
        backgroundColor:graylight,
        alignSelf:'center',
        alignItems:'center',
    },
    image:{
        width:60,
        height:60,
        borderRadius:30,
    },
    text:{
        paddingVertical:20,
        textAlign:'center',
        width:'85%',
        alignSelf:'center',
        borderBottomColor:graylight,
        borderBottomWidth:2
    },
    InputBox:{
        paddingVertical:20,
        textAlign:'center',
        width:'85%',
        alignSelf:'center',
        borderBottomColor:graylight,
        borderBottomWidth:2,
    },
    btn:{
        width:'100%',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:primaryColor,
        borderRadius:30,
        marginTop:10,
        height:45
    },
    logoutbtn:{
        width:'85%',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:graylight,
        borderRadius:30,
        marginTop:20,
        height:45
    },
});




const mapStateToProps=(state)=>{
	return{
        Token:state.Token
    }
};
const mapDispatchToProps=(dispatch)=>{
	return{
        ADDToken: (token)=>{dispatch({type:'ADD_Token', token})},
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(Tab4);