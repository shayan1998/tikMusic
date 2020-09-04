import React, {Component} from 'react';
import { View, StyleSheet, FlatList, } from "react-native";
import { Container} from 'native-base';
import MainStyle, { primaryColor, baseUrl, accentColor } from '../../components/MainStyle';
import AlbumItem from '../../components/Items/AlbumItem'
import {playlist,latest} from '../../api/home';
import {connect} from 'react-redux';
import {RouterHelper} from '../../Util/RouterHelper'
import {NotifHelper} from '../../Util/Notification/NotifHelper'


class NewAlbums extends Component{

    constructor(props){
        super(props);
        this.state={
            Musics:[],
            lastPage:'',
            currentPage:'',
            page:1,
        }
        this.fetch();
    }
    fetch=async()=>{
        await latest(this.state.page)
            .then(response=> {
                console.log(response);
                this.setState({
                    Musics:[...this.state.Musics,...response.data.data.playlist],
                    lastPage:response.data.meta.last_page,
                    currentPage:response.data.meta.current_page,
                    load:true,
                });
            })
    }
    more=()=>{
        this.setState({page:this.state.page+1},this.fetch)
    }


    press=(id)=>{
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
            <Container style={{backgroundColor:'transparent'}}>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={this.state.Musics}
                    style={{backgroundColor:'transparent'}}
                    renderItem={({item})=>
                        <AlbumItem data={item} press={this.press}/>
                    }
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={
                        this.state.lastPage==this.state.currentPage?
                        <View style={{height:20}}/>
                        :
                        <Button press={this.more} title="more" 
                            backgroundColor={'rgba(0,0,0,0.3)'} borderRadius={50} width="20%" fontSize={15} style={{height:30,marginVertical:20}}
                        />
                    }
                />

            </Container>
		);
	}
}


const mapStateToProps=(state)=>{
	return{
		PlayList: state.PlayList,
        CashPlaylists: state.CashPlaylists,
	}
};

const mapDispatchToProps=(dispatch)=>{
	return{
        AddPlayList: (PlayList,id)=>{dispatch({type:'ADD_PlayList', PlayList:PlayList,id})},
        DoFullPlayer: ()=>{dispatch({type:'Full_Player'})},
        StPlay: (id)=>{dispatch({type:'Select_To_Play',id})}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAlbums);

