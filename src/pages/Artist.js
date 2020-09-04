import React, {Component} from 'react';
import { View, StyleSheet, Image, FlatList,TouchableOpacity,Dimensions} from "react-native";
import { Container, Content, Spinner, Button, Body, Icon, Text} from 'native-base';
import MainStyle, { primaryColor, baseUrl, gray, graylight } from '../components/MainStyle';
import {Basic, ActiveHeader} from '../layout';
import MusicListItem from '../components/Items/MusicListItem';
import AlbumItem from '../components/Items/AlbumItem';
import CustomIcon from '../components/CustomIcon';
import {connect} from 'react-redux';
import {artist} from '../api/artist'
import {RouterHelper} from '../Util/RouterHelper';

 

class Artist extends Component{

    constructor(props){
        super(props);
        this.state={
            load:false,
            refresh:false,
            id:this.props.navigation.getParam('id','-'),
            name:this.props.navigation.getParam('name','-'),
            image:'',
            Musics:[],
            // Albums:[]
        }
    }

    
    componentDidMount(){
        this.props.subPlayerHeight();
        this.fetch()
    }
    componentWillUnmount(){
        this.props.subPlayerHeight();
    }

    fetch=async()=>{
        await artist(this.state.id)
            .then(res=>{
                console.log('res artist', res)
                this.setState({
                    Musics:res.data.data.music,
                    image:res.data.data.artist.image,
                    load:true,
                })
            })
            .catch(error=>{
                console.log('error', error.response)
            })
    }

    pressAll=()=>{
        this.props.AddPlayList(this.state.Musics);
        RouterHelper.FullPlayer();
    } 
    pressMusics=(id,name)=>{
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
                deRefresh={this.fetch} 
            >
                <Content>

                    <Image source={{uri:this.state.image}} defaultSource={require('../../assets/images/placeholder.png')} style={styles.image}/>
                    <View style={{flexDirection:'row',alignSelf:'center',marginVertical:10}}>
                        <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
                            <CustomIcon size={20} name="microphone" style={[MainStyle.font,{marginHorizontal:8}]}/>
                            <Text style={MainStyle.font}>Pop song</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                            <CustomIcon size={20} name="playlist" style={[MainStyle.font,{marginHorizontal:8}]}/>
                            <Text style={MainStyle.font}>{this.state.Musics.length} Track's</Text>
                        </View>
                    </View>

                    
                    <TouchableOpacity activeOpacity={0.85} style={styles.btn} onPress={this.pressAll}>
                        <CustomIcon size={20} name="headphones1" style={[MainStyle.font,{marginHorizontal:8}]}/>
                        <Text style={[MainStyle.fontCaurgette,{color:'#fff'}]}>Play Song's</Text>
                    </TouchableOpacity>


                    {/* <View style={styles.header}>
                        <Text style={[MainStyle.font,{textAlign:'center'}]}>Album's</Text>
                    </View>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.Albums}
                        style={{backgroundColor:'transparent'}}
                        renderItem={({item})=>
                            <AlbumItem data={item} press={this.press}/>
                        }
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={
                            <View style={{height:20}}/>
                        }
                    /> */}

                    <FlatList
                        ListHeaderComponent={
                            <View style={styles.header}>
                                <Text style={[MainStyle.font,{textAlign:'center'}]}>Single Track's</Text>
                            </View>
                        }
                        data={this.state.Musics}
                        style={{backgroundColor:'transparent'}}
                        renderItem={({item})=>
                            <MusicListItem data={item} press={this.pressMusics} pressIcon={this.pressMusics}/>
                        }
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={
                            <View style={{height:50}}/>
                        }
                    />

                </Content>
            </ActiveHeader>
        )
	}
}


const width=Dimensions.get('window').width-80;
const styles = StyleSheet.create({
    image:{
        width:width,
        height:width,
        borderRadius:width/2,
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
    header:{
        borderBottomColor:graylight,
        borderBottomWidth:1,
        width:'90%',
        alignSelf:'center',
        padding:15
    }
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
        subPlayerHeight: ()=>{dispatch({type:'subPlayer_Height'})},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Artist);