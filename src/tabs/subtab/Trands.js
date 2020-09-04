import React, {Component} from 'react';
import { View, StyleSheet, FlatList} from "react-native";
import { Container,} from 'native-base';
import MainStyle, { primaryColor, accentColor } from '../../components/MainStyle';
import MusicItem from '../../components/Items/MusicItem';
import {connect} from 'react-redux';
import {NotifHelper} from '../../Util/Notification/NotifHelper'
import {trends,playlist} from '../../api/home';
import {RouterHelper} from '../../Util/RouterHelper'
import {Button} from '../../components/ui'


class Trands extends Component{

    constructor(props){ 
        super(props);
        this.state={
            Musics:[],
            lastPage:'',
            currentPage:'',
            page:1,
        }
    }
    componentDidMount(){
        this.fetch();
    }
    fetch=async()=>{
        await trends(this.state.page)
            .then(response=> {
                console.log(response);
                this.setState({
                    Musics:[...this.state.Musics,...response.data.data.trends],
                    lastPage:response.data.meta.last_page,
                    currentPage:response.data.meta.current_page,
                    load:true,
                });
            })
            .catch(error=> {
                console.log(error);
            })
    }
    more=()=>{
        this.setState({page:this.state.page+1},this.fetch)
    }


    press=async(id)=>{
        this.props.StPlay(id);
        console.log('cash', this.props.CashPlaylists)
        let find = this.props.CashPlaylists.findIndex(x => x.id ===id);
        if(find!=-1){
            this.props.AddPlayList(this.props.CashPlaylists[find].PlayList);
            RouterHelper.FullPlayer();
            return;
        }
        await playlist(id)
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
            <Container style={{backgroundColor:'transparent'}} >

                <FlatList 
                    showsHorizontalScrollIndicator={false}
                    data={this.state.Musics}
                    style={{backgroundColor:'transparent'}}
                    renderItem={({item})=>
                        <MusicItem data={item} press={this.press}/>
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
        PlaySong: state.PlaySong,
        CashPlaylists: state.CashPlaylists,
	}
};

const mapDispatchToProps=(dispatch)=>{
	return{
        AddPlayList: (PlayList,id)=>{dispatch({type:'ADD_PlayList', PlayList,id})},
        AddSong: (Song)=>{dispatch({type:'ADD_Song', Song})},
        StPlay: (id)=>{dispatch({type:'Select_To_Play',id})}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Trands);