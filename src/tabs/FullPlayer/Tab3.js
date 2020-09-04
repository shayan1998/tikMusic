import React, { Component } from 'react';
import { Container, Title, Text,View, Spinner } from 'native-base';
import { StyleSheet,TouchableOpacity, FlatList, Image, Dimensions,ImageBackground,Modal} from 'react-native';
import MainStyle, { primaryColor, gray, graylight} from '../../components/MainStyle';
import PlayListItem2 from '../../components/PlayListItem2';//use PlayListItem2 to delete the images
import {connect} from 'react-redux';
import CustomIcon from '../../components/CustomIcon';
import styles from '../../style/FullPlayer';
import Input from '../../components/Input';
import {Button} from '../../components/ui'
import {createPlaylist,userPlaylists} from '../../api/user'
import {userPlaylist} from '../../api/user';
import {NotifHelper} from '../../Util/Notification/NotifHelper'


class Tab3 extends Component{
    constructor(props){
        super(props);
        this.state={
            modal:false,
            load:false,
            text:'',
        }
    }
    getText=(name, value)=>{   
        this.setState(() => ({ [name]: value }));
    }
    create=async()=>{
        data={
            name: this.state.text
        }
        this.setState({load:true})
        await createPlaylist(data,this.props.Token)
            .then(response=> {
                console.log('create',response);
                this.fetchUserPlaylists();
                this.setState({load:false,modal:false})
            })
            .catch(error=>{
                console.log('create',error.response);
                this.setState({load:false,modal:false})
            });
    }   
    
    
    fetchUserPlaylists=async()=>{
        await userPlaylists(this.props.Token)
            .then(response=> {
                console.log('userPlaylists',response);
                this.props.AddUserPlaylists(response.data.data.playlist)
            })
            .catch(error=>{
                console.log('userPlaylists',error.response);
            });
    }


    makePlayList=async(id,name,count)=>{
        if(count==0){
            NotifHelper.show('danger',`Sorry, ${name} is empty`,4000);
            return;
        }
        this.props.StPlay(id);
        await userPlaylist(id,this.props.Token)
            .then(response=> { 
                console.log(response);
                this.props.AddPlayList(response.data.data.playlist.musics);
            })
            .catch(error=>{ 
                NotifHelper.show('danger','Sorry, There is some problem',4000)
                console.log(error.response);
            });
    }

    
	render() { 
        return (    
            <View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={this.props.UserPlaylists}
                    style={{backgroundColor:'transparent'}}
                    renderItem={({item})=>
                        <PlayListItem2 data={item} press={this.makePlayList}/>
                    }
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={
                        <View style={styles.header}>
                            <View style={{flex:1}}/>
                            <Text style={[MainStyle.fontBold,{textAlign:'center',flex:3}]}>Play List's</Text>
                            <View style={{flex:1}}>
                                <CustomIcon size={20} name="plus1" style={{color:'#fff',alignSelf:'flex-end'}} onPress={()=>this.setState({modal:true})}/>
                            </View>
                        </View>
                    }
                    ListFooterComponent={
                        <View style={{height:20}}/>
                    } 
                />

                <Modal
                    animationType="slide" transparent={true} visible={this.state.modal}
                    onRequestClose={() => {this.setState({modal:false})}}
                    >
                    <View style={styles.modal}>
                        <View style={{width:'80%',height:200,backgroundColor:gray,padding:15,borderRadius:15,alignItems:'center',justifyContent:'center'}}>
                            <Text style={[MainStyle.font]}>Make your own playlist</Text>
                            <View style={{marginVertical:10}}>
                                <Input 
                                    placeholder="playlist name" name='text'
                                    width={'100%'} getText={this.getText}
                                    bg={graylight} color={'#fff'} icon=""
                                />
                            </View>
                            <Button press={this.create} title="create"  
                                backgroundColor={primaryColor} borderRadius={50} loading={this.state.load} width="100%"
                            />
                        </View>    
                    </View>
                    
                </Modal>
                
            </View>
        );
    }
	
}

const mapStateToProps=(state)=>{
	return{
        Musics:state.Musics,
        Token:state.Token,
        UserPlaylists:state.UserPlaylists
	}
};
const mapDispatchToProps=(dispatch)=>{
	return{
        AddPlayList: (PlayList)=>{dispatch({type:'ADD_PlayList', PlayList:PlayList})},
        AddUserPlaylists: (UserPlaylists)=>{dispatch({type:'ADD_User_Playlist', UserPlaylists})},
        StPlay: (id)=>{dispatch({type:'Select_To_Play',id})}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Tab3);
