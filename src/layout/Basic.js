import React, {Component} from 'react';
import { View, Text, ScrollView,} from 'react-native';
import { Container,  Spinner,Icon, Content } from 'native-base';
import {Header,Loader} from '../components/ui';
import MainStyle from '../components/MainStyle';


export default Basic =(props)=> {
    deRefresh=props.deRefresh || null;
    loading=props.loading!=null? props.loading:true;

    return (
        <Container style={MainStyle.bg}>
            <Header title={props.title} height={props.height}/> 
            <View style={{flex:1}}>
                {loading? 
                    props.children
                    :
                    <View style={{flex:1}}>
                        <Loader refresh={props.refresh} doRefresh={deRefresh}/>
                    </View>
                }
            </View>
        </Container>
    )
}

  



/*
Usage=>
    <Basic
        loading={this.state.load}
        refresh={this.state.refresh}
        title="اسم صفحه"
        deRefresh={()=>alert('fff')}
    >
    ...
    </Basic>
*/