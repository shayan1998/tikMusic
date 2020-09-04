import React, {Component} from 'react';
import { StyleSheet,  View, Text, TouchableOpacity, Dimensions} from 'react-native';
import MainStyle from '../MainStyle'
import * as Animatable from 'react-native-animatable';


export default class Modal extends Component{
    constructor(props){
        super(props)
        this.state={
            show:false,
            anim:'zoomIn'
        }
    }

    show=()=>{
        this.setState({show:true},()=>{console.log(this.state)})
    }

    close=()=>{
        this.setState({
            anim:'zoomOut'
        },
        ()=>{
            setTimeout(() => {
                this.setState({show:false,anim:'zoomIn'})
            }, 600);
            }
        );
    }

    render(){
        return (
            <View style={styles.container}>
                {this.state.show?

                <View style={styles.frame}>
                    <Animatable.View animation={this.state.anim}  duration={600} easing="ease-out-back" style={styles.alertBox}>
                        {this.props.children}
                    </Animatable.View>
                </View>

                :
                null
                }
            </View>
        );
    }
}


let Width=Dimensions.get('window').width;
let Height=Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        top:0,
        zIndex:300,
    },
    frame:{
        backgroundColor:'rgba(0,0,0,0.3)',  
        width:Width,
        height:Height,
        alignItems:'center',
        justifyContent:'center'
    },
    alertBox:{
        backgroundColor:'#fff',
        width:'90%',
        borderRadius:10,
        padding:10
    },
});


/*
Usage=>

    <Modal ref={ref=>this.Modal=ref}>
        ...
    </Modal>


    static Modal;
    if (this.Modal) {
		this.Modal.show();   //or close()
	}
*/