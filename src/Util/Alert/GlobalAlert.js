import React, {Component} from 'react';
import { View,Dimensions,TouchableOpacity,StyleSheet,Image } from "react-native";
import {Text} from 'native-base'
import MainStyle,{graylight, primaryColor,graylighter} from '../../components/MainStyle'
import * as Animatable from 'react-native-animatable';
import CustomIcon from '../../components/CustomIcon'


export default class GlobalAlert extends Component{
    constructor(props){
        super(props)
        this.state={
            show:false,
            title:'',
            name:'',
            image:'',
            trueFun:null,
            falseFun:null,
            type:'success',
            anim:'zoomIn',
        }
    }

    makeAlert=(type,title,name,image,trueFun=null,falseFun=null)=>{
       
        this.setState({
            type,
            title,
            name,
            image,
            trueFun,
            falseFun,
            show:true,
        },()=>console.log('this.state', this.state))
    }

    removeAlert=()=>{
        this.setState({anim:'zoomOut'});
        setTimeout(() => {
            this.setState({
                show:false,
                title:'',
                name:'',
                image:'',
                trueFun:null,
                falseFun:null,
                anim:'zoomIn'
            })
        }, 500);
    }

    render() { 

        return (
            <View>
                {this.state.show?

                <TouchableOpacity style={styles.frame} onPress={this.removeAlert}>
                    <Animatable.View animation={this.state.anim} duration={600} easing="ease-out-back" style={[styles.alertBox]}>
                        <View style={styles.header}>
                            <Image source={this.state.image} defaultSource={require('../../../assets/images/placeholder.png')} style={styles.image}/>
                            <View style={{justifyContent:'center',paddingLeft:10}}>
                                <Text style={MainStyle.font}>{this.state.title}</Text>
                                <Text style={MainStyle.font}>{this.state.name}</Text>
                            </View>
                        </View>

                        {/* <TouchableOpacity style={styles.btn} onPress={this.state.trueFun}>
                            <CustomIcon size={15} name="music-player-buttons" style={{color:'#fff',marginRight:5}}/>
                            <Text style={MainStyle.font}>add to playlist</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={[styles.btn,styles.btn2]} onPress={this.state.falseFun}>
                            <CustomIcon size={15} name="music-player-buttons" style={{color:'#fff',marginRight:5}}/>
                            <Text style={MainStyle.font}>play next</Text>
                        </TouchableOpacity>

                    </Animatable.View>
                </TouchableOpacity>

                :
                null
                }
            </View>
        );
    }
}




Width=Dimensions.get('window').width;
Height=Dimensions.get('window').height;
const styles = StyleSheet.create({ 
    frame:{
        backgroundColor:'rgba(0,0,0,0.3)',
        position:'absolute',
        top:-Height,
        left:0,
        zIndex:2000,
        width:Width,
        height:Height,
        alignItems:'center',
        justifyContent:'center'
    },
    alertBox:{
        width:'80%',
        borderRadius:10,
        padding:20,
        paddingVertical:25,
        backgroundColor:graylight,
    },
    image:{
        width:60,
        height:60,
        borderRadius:30,
        marginRight:10
    },
    header:{
        flexDirection:'row',
        borderBottomColor:'rgba(255,255,255,0.3)',
        paddingBottom:8,
        borderBottomWidth:1,
    },
    btn:{
        width:'85%',
        height:38,
        borderRadius:20,
        backgroundColor:primaryColor,
        alignItems:'center',
        justifyContent:'center',
        marginTop:12,
        alignSelf:'center',
        flexDirection:'row'
    },
    btn2:{
        backgroundColor:'#747372',
    }
});





/*
Usage=>
    
    import {AlertHelper} from '../util/AlertHelper'

    AlertHelper.show(
        'warning',                    
        'ghome be hagh rafte',        
        'mohsen chavoshi',
        require('../../../assets/images/cover1.jpg'),
        ()=>alert('fff'),                     
        ()=>AlertHelper.close()      
    )

    //closing the alert
    AlertHelper.close()
*/