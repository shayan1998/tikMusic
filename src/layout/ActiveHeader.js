import React, {Component} from 'react';
import { View, ScrollView, StatusBar, Dimensions, ImageBackground} from 'react-native';
import { Container } from 'native-base';
import Headroom from 'react-native-headroom';
import {Header,Loader} from '../components/ui';
import MainStyle from '../components/MainStyle'

export default ActiveHeader =(props)=> {

    deRefresh=props.deRefresh || null;
    loading=props.loading!=null?  props.loading: true;
    let height=props.height || 60;
    
    return (
        <Container style={MainStyle.bg}>
            <ImageBackground source={require('../../assets/images/bg3.png')} blurRadius={7} style={{flex:1}}>
                <Headroom
                    //style={[styles.container]}
                    ScrollableComponent={ScrollView}
                    headerHeight={ height+StatusBar.currentHeight }
                    scrollEventThrottle={ 150 } slideDuration={200}
                    headerComponent={ 
                        <Header title={props.title}  height={height}/> 
                    }
                >
                    
                <View style={{flex:1}}>
                        {loading?
                            props.children
                            :
                            <View style={{height:Dimensions.get('screen').height-70}}>
                                <Loader refresh={props.refresh} doRefresh={deRefresh}/>
                            </View>
                        }
                    </View>
                </Headroom>
            </ImageBackground>
        </Container>
    )
}

  



/*
Usage=>
    <ActiveHeader
        loading={this.state.load}
        refresh={this.state.refresh}
        title="اسم صفحه"
        leftFun={()=>alert('gh')}
        eft="home"
        rightFun={()=>alert('ghdfvfd')}
        right="home"
        deRefresh={()=>alert('fff')}
    >
    ...
    </ActiveHeader>
*/