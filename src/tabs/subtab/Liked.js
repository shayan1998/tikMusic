import React, {Component} from 'react';
import { View, StyleSheet, Image, FlatList, AsyncStorage, Keyboard, TouchableOpacity, Animated, Easing,Dimensions} from "react-native";
import { Container, Content, Spinner, Button, Body, Icon, Text} from 'native-base';
import MainStyle, { primaryColor, baseUrl, gray, graylight } from '../../components/MainStyle';
import MusicListItem from '../../components/Items/MusicListItem';
import CustomIcon from '../../components/CustomIcon';
import {connect} from 'react-redux';
import {RouterHelper} from '../../Util/RouterHelper';



class Liked extends Component{

    constructor(props){
        super(props);
        this.state={
            load:false,
        }
    }

    

    press=(id,name)=>{
        let index = this.props.Musics.findIndex(x => x.id ===id);
        //alert(id+'=>'+name)
        this.props.AddPlayList(this.props.Musics,index);
        RouterHelper.FullPlayer();
    }



	render() {
		return (
            <View style={[{flex:1,backgroundColor:'transparent'}]}>
                <View activeOpacity={0.85} style={styles.btn}>
                    <Text style={[MainStyle.font,{color:'#fff'}]}>{this.props.Musics.length} Song's</Text>
                    <CustomIcon size={20} name="more" style={[MainStyle.font,{marginHorizontal:8}]}/>
                </View>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={this.props.Musics}
                    style={{backgroundColor:'transparent'}}
                    renderItem={({item})=>
                        <MusicListItem data={item} press={this.press}/>
                    }
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={
                        <View style={{height:20}}/>
                    }
                />
            </View>
		);
	}
}

const styles = StyleSheet.create({
    btn:{
        width:'80%',
        alignSelf:'center',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.3)',//graylight,
        flexDirection:'row',
        borderRadius:10,
        marginVertical:10,
        paddingHorizontal:15,
        height:45
    },
});





const mapStateToProps=(state)=>{
	return{
		PlayList: state.PlayList,
        PlaySong: state.PlaySong
	}
};

const mapDispatchToProps=(dispatch)=>{
	return{
        AddPlayList: (PlayList,PlaySongNum)=>{dispatch({type:'ADD_PlayList', PlayList,PlaySongNum})},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Liked);