import React, {Component,useRef} from 'react';
import { View, StyleSheet, TouchableOpacity,Dimensions, ImageBackground} from "react-native";
import { Container, Icon, Text} from 'native-base';
import MainStyle,{graylight} from './MainStyle';
import Carousel from 'react-native-anchor-carousel';


export default MyCarousel=(props)=>{

    data=props.data;

    renderItem = ({item, index}) => {
        return (
            <ImageBackground source={{uri:item.image}} resizeMode="cover" style={[styles.item]}>
                <TouchableOpacity activeOpacity={0,9} onPress={()=>props.Play(item.id)} style={{flex:1,width:'100%',justifyContent:'flex-end'}}>
                    <Text style={[MainStyle.font,{color:'#fff'}]}>{item.title}</Text>
                    {/* <Text style={[MainStyle.font,{fontSize:12,color:'#fff'}]}>{item.singer}</Text> */}
                </TouchableOpacity>
            </ImageBackground>
        )
    };


    let width=Dimensions.get('screen').width; 
    return (
        <View style={styles.carouselContainer}>
            <Carousel  
                style={styles.carousel}
                data={data}
                renderItem={this.renderItem}
                itemWidth={width-30}
                containerWidth={width} 
                separatorWidth={-25}
                initialIndex={1}
                inActiveScale={0.82}
                itemContainerStyle={{}}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    carouselContainer: {
        height:200  
    },
    carousel: {
        flex:1,
        alignSelf:'center',
        marginVertical:10,
    },
    item:{
        flex:1,
        width:'100%',
        backgroundColor:graylight,
        borderRadius:10,
        overflow:'hidden',
        justifyContent:'flex-end',
        alignItems:'flex-start',
        padding:10
    }
});
