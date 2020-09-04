import React, {Component} from 'react';
import { StyleSheet,  View, Platform, TouchableOpacity, Dimensions} from 'react-native';
import MainStyle,{primaryColor} from '../../components/MainStyle'
import {Text} from 'native-base'
import posed from "react-native-pose";

let Width=Dimensions.get('window').width*0.85;
const tabWidth = Width / 2;
const SpotLight = posed.View({
    option1: { x: 0 ,transition: { ease: 'easeOut' }},
    option2: { x: tabWidth ,transition: { ease: 'easeOut' }},
    // option3: { x: tabWidth*2 ,transition: { ease: 'easeOut',duration:250}},
});

export default  Selector = (props) => {

    let style=props.style || {};
    let items=props.items || [];
    let selected=props.selected || '';


    return (
        <View style={[styles.container,style]}>
            <View style={[styles.frame]}> 
                <SpotLight style={[styles.spotLight]} pose={selected}>
                <View style={styles.spotLightInner} />
                </SpotLight>
            </View>


            <View style={styles.items}>
                {
                    items.map(element => {
                        return(
                        <TouchableOpacity
                        style={[styles.tabButton]}
                        onPress={()=>props.press(element.key)}
                        key={element.key}
                        >
                            <View>
                                <Text style={[MainStyle.font, element.key==selected &&{color:'#fff'} ]}>{element.value}</Text>
                            </View>
                        </TouchableOpacity>
                        )
                    })
                }
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 55,
        elevation: 2,
        zIndex:1,
        alignItems: "center",
        justifyContent:'center',
        marginVertical:5,
        backgroundColor:'transparent',
    },
    frame:{
        alignSelf:'center',
        width:Width,
        borderRadius:40,
        borderWidth:1,
        borderColor:'rgba(255,255,255,0.2)'
    },
    spotLight: {
        width: tabWidth,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    spotLightInner: {
        width:'90%',
        alignItems: 'center',
        justifyContent:'center',
        zIndex:1,
        backgroundColor:primaryColor,
        borderRadius:30,
        height: 38,
    },
    items:{
        flexDirection:'row',
        position:'absolute',
        height:'100%',
    },
    tabButton: { 
        flex: 1,
        width:tabWidth,
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
});



/*
Usage=>

    this.state={
        select:'option1',
        items:[
            {key:'option1',value:'یک'},
            {key:'option2',value:'دو'},
            {key:'option3',value:'سه'}
        ]
    }

    go=(e)=>{
        this.setState({select:e});
    }

    <Selector press={this.go} selected={this.state.select} items={this.state.items}/>

*/