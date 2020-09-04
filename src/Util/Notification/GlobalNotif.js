import React, {Component} from 'react';
import { View,Text,Dimensions,StyleSheet,StatusBar } from "react-native";
import MainStyle, { primaryColor,gray } from '../../components/MainStyle'
import * as Animatable from 'react-native-animatable';
import { Icon } from 'native-base';
import Animated,{Easing} from 'react-native-reanimated'

const {Value,timing}=Animated
let Width=Dimensions.get('screen').width/1.5

export default class GlobalNotif extends Component{
    constructor(props){
        super(props)
        this.state={
            show:true,
            title:'',
            message:'',
            duration:0,
            type:'success',
        }
        this._transX = new Value(Width);
    }

    Animate(To,clean=false){
        this._config = {
            duration: (this.state.duration)/2,//2000,
            toValue: To,
            easing: Easing.inOut(Easing.cubic),
        };
        this._anim = timing(this._transX, this._config);
        this._anim.start(()=>{
            if(clean){
                this.setState({
                    show:false,
                    title:'',
                    message:'',
                })
            }
        });
    }

    makeNotif=(type,message,duration=4000)=>{
        this.setState({
            show:true,
            type,
            message,
            duration
        },()=>{
            this.Animate(0);
            if(this.state.duration!=0){
                setTimeout(() => {
                    this.Animate(Width,true);
                }, (Number(this.state.duration)/2)+1000);
            }
        })
    }

    render() { 
        let icon,theme;
        switch (this.state.type) {
            case 'success':
                icon='checkmark';
                theme='rgba(38,231,8,0.87)';
                break;
            case 'danger':
                icon='close';
                theme='rgba(231,31,8,0.87)';
                break;
            case 'warning':
                icon='alert';
                theme='rgba(231,148,8,0.92)';
                break;
        }
        return (
            <View>
                {this.state.show?

                <Animated.View duration={600} easing="ease-out-back" 
                    style={[styles.alertBox,
                        {transform : [{translateX : this._transX,}]}
                    ]}
                >
                    <View style={[{backgroundColor:'#fff'}]}>
                        <View style={[{backgroundColor:theme},styles.iconBox]}>
                            <Icon style={{color:'#fff'}} name={icon}/>
                        </View>
                    </View>
                    <View style={[styles.text,{borderColor:theme}]}>
                        {/* <Text style={[,MainStyle.fontBold]}>{this.state.title}</Text> */}
                        <Text style={[styles.message,MainStyle.font]}>{this.state.message}</Text>
                    </View>
                    
                </Animated.View>

                :
                null
                }
            </View>
        );
    }
}





Height=Dimensions.get('window').height;
const styles = StyleSheet.create({
    alertBox:{
        width:Width,
        position:'absolute',
        top:StatusBar.currentHeight+20,//Height-20,
        right:0,
        zIndex:2000,
        flexDirection:'row-reverse',
    },
    text:{
        padding:10,
        padding:12,
        paddingHorizontal:11,
        justifyContent:'center',
        backgroundColor:gray,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        //width:'100%',
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        borderWidth:1,
    },
    iconBox:{
        width:'100%',
        paddingHorizontal:12,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    message:{
        fontSize:12
    }
});





/*
Usage=>
    
    import {NotifHelper} from '../util/NotifHelper'

    NotifHelper.show(
        'danger',                       //type: success/danger/warning
        'توجه'                          //title
        ,'خرید شما با موفقیت انجام شد'   //message
        ,3000                          //duration
    )


    //closing the Notification
    NotifHelper.close()
*/
