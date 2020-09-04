import React, {Component} from 'react';
import { View, StyleSheet, Image, FlatList, AsyncStorage, Keyboard, TouchableOpacity, Animated, Easing,Dimensions} from "react-native";
import { Container, Content, Spinner, Button, Body, Icon, Text} from 'native-base';
import MainStyle, { primaryColor, baseUrl, gray, graylight } from '../components/MainStyle';
import {ActiveHeader} from '../layout';
import MusicListItem from '../components/Items/MusicListItem';
import CustomIcon from '../components/CustomIcon';
import {userPlaylist} from '../api/user'
import {connect} from 'react-redux';
import {RouterHelper} from '../Util/RouterHelper';


class Playlist extends Component{

    constructor(props){
        super(props);
        this.state={
            id:this.props.navigation.getParam('id','-'),
            name:this.props.navigation.getParam('name','-'),
            load:false,
            Musics:[]
        }
    }

    componentDidMount(){
        this.props.subPlayerHeight();
        this.fetchUserPlaylist()
    }
    componentWillUnmount(){
        this.props.subPlayerHeight();
    }
    
    fetchUserPlaylist=async()=>{
        await userPlaylist(this.state.id,this.props.Token)
            .then(response=> {
                console.log('userPlaylist',response);//response.data.data
                this.setState({
                    Musics:response.data.data.playlist.musics,
                    load:true
                })
            })
            .catch(error=>{
                console.log('userPlaylist',error.response);
                this.setState({refresh:true})
            });
    }



    press=(id,name)=>{
        let index = this.state.Musics.findIndex(x => x.id ===id);
        this.props.AddPlayList(this.state.Musics,index);
        RouterHelper.FullPlayer();
    }



	render() {
		return (
            <ActiveHeader
                loading={this.state.load}
                refresh={this.state.refresh}
                title={this.state.name}
                deRefresh={this.fetchUserPlaylist}
            >
                <Content>
                    <View activeOpacity={0.85} style={styles.btn}>
                        <Text style={[MainStyle.font,{color:'#fff'}]}>{this.state.Musics.length} Song's</Text>
                        <CustomIcon size={20} name="more" style={[MainStyle.font,{marginHorizontal:8}]}/>
                    </View>

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={this.state.Musics}
                        style={{backgroundColor:'transparent'}}
                        renderItem={({item})=>
                            <MusicListItem data={item} press={this.press}/>
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
        Token:state.Token,
        UserPlaylists:state.UserPlaylists
	}
};
const mapDispatchToProps=(dispatch)=>{
	return{
        AddPlayList: (PlayList,PlaySongNum)=>{dispatch({type:'ADD_PlayList', PlayList,PlaySongNum,Shuffle:false})},
        subPlayerHeight: ()=>{dispatch({type:'subPlayer_Height'})},
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(Playlist);