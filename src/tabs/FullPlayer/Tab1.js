import React, { Component } from 'react';
import {View } from 'native-base'; 
import { FlatList} from 'react-native';
import {connect} from 'react-redux';
import MusicListItem from '../../components/Items/MusicListItem'
import {AlertHelper} from '../../Util/Alert/AlertHelper'

Tab1=(props)=>{

    pressIcon=(id,name,artist,cover)=>{
        AlertHelper.show(
            'warning',                    
            name,        
            artist,
            cover,//require('../../../assets/images/placeholder.png'),
            ()=>alert('remove'),                     
            ()=>this.playNext(id),    
        )
    }

    playNext=(id)=>{
        let index = props.PlayList.findIndex(x => x.id ===id);
        props.setNextSong(index);
        AlertHelper.close();
    }

    press=(id,)=>{
        let index = props.PlayList.findIndex(x => x.id ===id);
        props.setNextSong(index);
        props.PlayNext();
    }
    
    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            data={props.PlayList}
            style={{backgroundColor:'transparent'}}
            renderItem={({item})=>
                <MusicListItem data={item} press={this.press} pressIcon={this.pressIcon}/>
            }
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={
                <View style={{height:20}}/>
            }
        />
    );
}


const mapStateToProps=(state)=>{
	return{
        PlayList:state.PlayList,
	}
};

const mapDispatchToProps=(dispatch)=>{
	return{
        AddPlayList: (PlayList)=>{dispatch({type:'ADD_PlayList', PlayList:PlayList})},
        setNextSong: (id)=>{dispatch({type:'Set_Next_Song', id})},
        PlayNext: ()=>{dispatch({type:'Play_Next'})},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Tab1);
