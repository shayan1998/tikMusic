import React, {Component} from 'react';
import { View, StyleSheet, FlatList, TextInput, } from "react-native";
import { Container,} from 'native-base';
import MainStyle, { primaryColor, accentColor } from '../../components/MainStyle';
import PlayListItem from '../../components/Items/PlayListItem'
import {connect} from 'react-redux';


class PlayLists extends Component{

    constructor(props){
        super(props);
        this.state={
        }
    }

    goToPlayList=(id,name)=>{
        this.props.navigation.navigate('PlayList',{id,name})
    }


	render() {
		return (
            <Container style={{backgroundColor:'transparent'}}>
 
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={this.props.UserPlaylists}
                    style={{backgroundColor:'transparent'}}
                    renderItem={({item})=>
                        <PlayListItem data={item} press={this.goToPlayList}/>
                    }
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={
                        <View style={{height:20}}/>
                    }
                />

            </Container>
		);
	}
}


const mapStateToProps=(state)=>{
	return{
		PlayList: state.PlayList,
        UserPlaylists:state.UserPlaylists
	}
};
const mapDispatchToProps=(dispatch)=>{
	return{
        AddPlayList: (PlayList)=>{dispatch({type:'ADD_PlayList', PlayList:PlayList,Shuffle:false})},
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(PlayLists);