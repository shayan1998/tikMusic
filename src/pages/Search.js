import React, {Component} from 'react';
import { View, StyleSheet, FlatList, } from "react-native";
import { Text} from 'native-base';
import MainStyle, { primaryColor, baseUrl, accentColor, graylight } from '../components/MainStyle';
import SingerItem from '../components/Items/SingerItem';
import AlbumItem from '../components/Items/AlbumItem';
import {ActiveHeader} from '../layout';
import {connect} from 'react-redux';
import Input from '../components/Input'
import { ScrollView } from 'react-native-gesture-handler';
import {search,playlist} from '../api/home'
import {NotifHelper} from '../Util/Notification/NotifHelper'
import {RouterHelper} from '../Util/RouterHelper'

 
class Search extends Component{

    constructor(props){
        super(props);
        this.state={
            search:this.props.navigation.getParam('search',''),
            refresh:false,
            load:false,
            Singers:[],
            Albums:[],
            Single:[]
        }
    }

    componentDidMount(){
        this.props.subPlayerHeight();
        if(this.state.search!=''){
            this.fetch()
        }else{
            this.setState({load:true})
        }
    }
    componentWillUnmount(){
        this.props.subPlayerHeight();
    }

    fetch=async()=>{
        await search({search:this.state.search},this.state.token)
            .then(res=>{
                console.log('res search', res)
                this.setState({
                    //Singers:res.data.data.musics,
                    Single:res.data.data.playlists,//playlists
                    Single:res.data.data.musics,
                    load:true,
                })
            })
            .catch(error=>{
                NotifHelper.show('danger','Sorry, There is some problem',4000)
            })
    }

    getText=(name, value)=>{   
        this.setState(() => ({ [name]: value }));
    }
    press=(id)=>{
        this.makePlayList(id)
    }
    pressSinger=(id,name)=>{
        alert(name+" "+id)
    }


    makePlayList=(id)=>{
        this.props.StPlay(id);
        console.log('cash', this.props.CashPlaylists)
        let find = this.props.CashPlaylists.findIndex(x => x.id ===id);
        if(find!=-1){
            this.props.AddPlayList(this.props.CashPlaylists[find].PlayList);
            RouterHelper.FullPlayer();
            console.log('fromCash', this.props.CashPlaylists[find].PlayList)
            return;
        }
        playlist(id)
            .then(response=> {
                console.log(response);
                this.props.AddPlayList(response.data.data.musics,id);
                RouterHelper.FullPlayer();
            })
            .catch(error=>{
                console.log(error.response);
                NotifHelper.show('danger','Sorry, There is some problem',4000)
            });
    }

	render() {
		return ( 
            <ActiveHeader
                loading={this.state.load}
                refresh={this.state.refresh}
                deRefresh={this.fetch}
                title="GeevSound"
            >
                <ScrollView style={{flex:1}}>
                    <Input value={this.state.search}
                        placeholder="Search for artists, song or leyric" name="search"
                        width={'90%'} getText={this.getText} style={{borderRadius:25}}
                        bg={'rgba(0,0,0,0.3)'} color={'#fff'} icon="search" iconPress={this.fetch}
                    />

                    {this.state.Singers.length!=0 &&   
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={this.state.Singers}
                        style={{backgroundColor:'transparent'}}
                        renderItem={({item})=>
                            <SingerItem data={item} press={this.props.pressSinger}/>
                        }
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={
                            <View style={styles.header}>
                                <Text style={[MainStyle.font,{textAlign:'center'}]}>Artists</Text>
                            </View>
                        }
                        ListFooterComponent={
                            <View style={{height:20}}/>
                        }
                    />
                    }

                    {/* {this.state.Albums.length!=0 &&   
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={this.state.Albums}
                        style={{backgroundColor:'transparent'}}
                        renderItem={({item})=>
                            <AlbumItem data={item} navigation={this.props.navigation}/>
                        }
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={
                            <View style={styles.header}>
                                <Text style={[MainStyle.font,{textAlign:'center'}]}>Albums</Text>
                            </View>
                        }
                        ListFooterComponent={
                            <View style={{height:20}}/>
                        }
                    />
                    }    */}

                    {this.state.Single.length!=0 &&  
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={this.state.Single}
                        style={{backgroundColor:'transparent'}}
                        renderItem={({item})=>
                            <AlbumItem data={item} press={this.press}/>
                        }
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={
                            <View style={styles.header}>
                                <Text style={[MainStyle.font,{textAlign:'center'}]}>Single Track's</Text>
                            </View>
                        }
                        ListFooterComponent={
                            <View style={{height:20}}/>
                        }
                    />
                    }

                </ScrollView>
            </ActiveHeader>
		);
	}
}



const styles = StyleSheet.create({
    header:{
        borderBottomColor:graylight,
        borderBottomWidth:1,
        width:'90%'
        ,alignSelf:'center',
        padding:15
    }
});





const mapStateToProps=(state)=>{
	return{
		PlayList: state.PlayList,
        CashPlaylists: state.CashPlaylists,
	}
};

const mapDispatchToProps=(dispatch)=>{
	return{
        AddPlayList: (PlayList,id)=>{dispatch({type:'ADD_PlayList', PlayList:PlayList,id,Shuffle:false})},
        DoFullPlayer: ()=>{dispatch({type:'Full_Player'})},
        StPlay: (id)=>{dispatch({type:'Select_To_Play',id})},
        subPlayerHeight: ()=>{dispatch({type:'subPlayer_Height'})},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);