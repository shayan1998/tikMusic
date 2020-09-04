import React, {Component} from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity,Dimensions} from "react-native";
import {Content, Text} from 'native-base';
import MainStyle, { primaryColor, baseUrl, gray, graylight } from '../components/MainStyle';
import {ActiveHeader} from '../layout';
import MusicListItem from '../components/Items/MusicListItem';
import CustomIcon from '../components/CustomIcon'; 



export default class Album extends Component{

    constructor(props){
        super(props);
        this.state={
            id:this.props.navigation.getParam('id','-'),
            name:this.props.navigation.getParam('name','-'),
            load:true,
            Musics:[]
        }
    }

    componentDidMount(){
    }

    press=()=>{}
    pressMusic=(id,name)=>{
        alert(id+'==>'+name)
    }



	render() {
		return (
            <ActiveHeader
                loading={this.state.load}
                refresh={this.state.refresh}
                title={this.state.name}
                deRefresh={this.fetch}
            >
                <Content>

                    <Image source={require('../../assets/images/placeholder.png')} style={styles.image}/>
                    <View style={{flexDirection:'row',alignSelf:'center',marginVertical:10}}>
                        <View style={{flexDirection:'row',alignItems:'center',marginRight:2}}>
                            <CustomIcon size={20} name="calendar" style={[MainStyle.font,{marginHorizontal:8}]}/>
                            <Text style={[MainStyle.font,{fontSize:10}]}>Published in 17th March 2009</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',marginLeft:2}}>
                            <CustomIcon size={20} name="playlist" style={[MainStyle.font,{marginHorizontal:8}]}/>
                            <Text style={[MainStyle.font,{fontSize:10}]}>12 Track's</Text>
                        </View>
                    </View>

                    
                    <TouchableOpacity activeOpacity={0.85} style={styles.btn} onPress={this.press}>
                        <CustomIcon size={20} name="headphones1" style={[MainStyle.font,{marginHorizontal:8}]}/>
                        <Text style={[MainStyle.fontCaurgette,{color:'#fff'}]}>Listen New</Text>
                    </TouchableOpacity>


                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={this.state.Musics}
                        style={{backgroundColor:'transparent'}}
                        renderItem={({item})=>
                            <MusicListItem data={item} press={this.pressMusic}/>
                        }
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={
                            <View style={{height:20}}/>
                        }
                    />

                </Content>
            </ActiveHeader>
		);
	}
}


const width=Dimensions.get('window').width-80;
const styles = StyleSheet.create({
    image:{
        width:width,
        height:width,
        borderRadius:10,
        alignSelf:'center'
    },
    btn:{
        width:'80%',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:primaryColor,
        flexDirection:'row',
        borderRadius:30,
        marginVertical:10,
        height:45
    },
});
