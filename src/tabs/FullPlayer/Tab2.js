import React, { Component } from 'react';
import { Container, Title, Text,View, Spinner } from 'native-base';
import { TouchableOpacity, Image, Dimensions, Modal,FlatList} from 'react-native';
import MainStyle, { primaryColor, gray, graylight} from '../../components/MainStyle';
import {connect} from 'react-redux';
import PlayerBtn from '../../components/PlayerBtn';
import CustomIcon from '../../components/CustomIcon';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import styles from '../../style/FullPlayer';
import {like} from '../../api/user'
import {getToken} from '../../api'
import RNBackgroundDownloader from 'react-native-background-downloader';
import {NotifHelper} from '../../Util/Notification/NotifHelper'
import * as Animatable from 'react-native-animatable';
import {addToPlaylist,userPlaylists} from '../../api/user'



const width=Dimensions.get('window').width-100;

class Tab2 extends Component {
	constructor(props){
        super(props)
        this.state={
            load:false,
            loadMusic:false,
            FullPlayerModal:false,
            PlayListModal:false,
            btn:true,
            token:'',
            loading:false,
            likeAnim:'',
            modal:false,
        }     
    }
    componentDidMount(){
        this.user()
    }
    user=async()=>{
        await getToken().then(token=>{
            this.setState({token:token})
        })
    }

    
    onLoad=()=>{
        this.setState({load:false});
    }
	play=()=>{
        //this.setState({paused:this.props.Stop})
        this.props.PlayStop(!this.props.Stop);
    }
    next=()=>{
        if(this.props.Shuffle==true){
            let number;
            do {
                number=Math.floor(Math.random() * this.props.PlayList.length);
            } while (number==this.props.PlaySongNumber);
            this.props.PlayShuffle(number);
        }else{
        this.props.PlayNext();
        }
        if(this.props.PlaySongNumber!=this.props.PlayList.length-1){
            this.setState({load:true});
        }
    }
    prev=()=>{
        this.props.PlayPrev();
        if(this.props.PlaySongNumber!=0){
            this.setState({load:true});
        }
	}
    loop=()=>{
        this.props.DoLoop(!this.props.Loop);
    } 
    getTime=(time)=>{
        const digit=n=>n<10?`0${n}`:`${n}`;
        const sec=digit(Math.floor(time%60));
        const min=digit(Math.floor((time/60)%60));

        return min+':'+sec;
    }




    doLike=async(id)=>{
        if(this.props.Token==''){
            NotifHelper.show('danger','Sorry, You must login/register first',4000)
            return;
        }
        this.setState({likeAnim:'bounce'});
        await like(id,this.state.token)
            .then(response=> {
                console.log('like',response);
                if(response.data.data.liked){
                    NotifHelper.show('success',`Great, Liked successfuly`,4000)
                }else{
                    NotifHelper.show('danger',`Great, Removed from liked`,4000)
                }
                
                this.setState({likeAnim:''});
            })
            .catch(error=>{
                console.log('like',error.response);
                NotifHelper.show('danger','Sorry, There is some problem',4000)
                this.setState({likeAnim:''});
            });
    }
    download=(id,link,name)=>{
        if(this.props.Token==''){
            NotifHelper.show('danger','Sorry, You must login/register first',4000)
            return;
        }
        this.setState({loading:true});
		RNBackgroundDownloader.download({
			id: id,
			url: link,
			//destination: `${RNBackgroundDownloader.directories.documents}/music.mp3`
			destination: `/storage/emulated/0/GeevMusic/${name}.mp3`
		}).begin((expectedBytes) => {
			//console.log(`Going to download ${expectedBytes} bytes!`);
		}).progress((percent) => {
			//console.log(`Downloaded: ${percent * 100}%`);
		}).done(() => {
            this.setState({loading:false});
            NotifHelper.show('success',`Great, ${name} downloaded successfuly`,4000)
			//console.log('Download is done!');
		}).error((error) => {
            NotifHelper.show('danger','Sorry, There is some problem',4000)
			//console.log('Download canceled due to error: ', error);
		});
    }
    addToUserPlaylist=async(playlistId)=>{
        data={
            playlist_id: playlistId,
            music_id: this.props.PlaySong.id
        }
        await addToPlaylist(data,this.props.Token)
            .then(response=> {
                NotifHelper.show('success',`Great, Song added to playlist`,4000)
                this.fetchUserPlaylists();
                console.log('addToPlaylist',response);
                this.setState({modal:false})
            })
            .catch(error=>{
                NotifHelper.show('danger','Sorry, There is some problem',4000)
                console.log('addToPlaylist',error.response);
                this.setState({modal:false})
            });
    }

    fetchUserPlaylists=async()=>{
        await userPlaylists(this.props.Token)
            .then(response=> {
                console.log('userPlaylists',response);
                this.props.AddUserPlaylists(response.data.data.playlist)
            })
    }




	render() {
        let widthBox=Dimensions.get('window').width;
        let index = this.props.PlayList.findIndex(x => x.id ===this.props.PlaySong.id);
        let nextSong='last song is playing';
        if(this.props.PlayList.length-1!=index){
            nextSong=this.props.PlayList[index+1].title;
        }
        if(this.props.PlayList.length-1==index && this.props.Loop){
            nextSong=this.props.PlayList[0].title;
        }


		return (
            <View style={{flex:1,justifyContent:'center'}}>
                <View style={{width:widthBox,justifyContent:'flex-end',marginBottom:30}}>
                    <View style={{flexDirection:'row',justifyContent:'center',paddingHorizontal:40}}> 
                        <Text style={[MainStyle.fontBold,{paddingHorizontal:10}]}>{this.props.PlaySong.artist}</Text>
                        <Text style={[MainStyle.font,{paddingHorizontal:10}]}>{this.props.PlaySong.title}</Text>
                    </View>
                    <AnimatedCircularProgress
                        style={styles.progress}
                        size={width}
                        rotation={0}
                        width={8}
                        lineCap="round"
                        duration={500}
                        fill={Math.round(this.props.currentTime)/Math.round(this.props.duration)*100}
                        tintColor={primaryColor}
                        //onAnimationComplete={}
                        backgroundColor="rgba(255,255,255,0.2)" 
                    >
                        {
                            (fill) => (
                                <Image source={{uri:this.props.PlaySong.cover}} defaultSource={require('../../../assets/images/placeholder.png')} style={styles.image}/>
                            )
                        } 
                    </AnimatedCircularProgress>
                    
                    
                    <View style={{flexDirection:'row',justifyContent:'center',marginVertical:25}}>
                        <Text style={MainStyle.fontBold}>{this.getTime(this.props.currentTime)}/{this.getTime(this.props.duration)}</Text>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'center',marginVertical:25}}>
                        <Animatable.View animation={this.state.likeAnim}>
                            <CustomIcon size={20} name="favorite" style={{color:'#fff',paddingHorizontal:8}} onPress={()=>this.doLike(this.props.PlaySong.id)}/>
                        </Animatable.View>
                        <CustomIcon size={20} name="plus1" onPress={()=>this.setState({PlayListModal:true})} style={{color:'#fff',paddingHorizontal:8}}
                            onPress={()=>this.setState({modal:true})}
                        />
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
                        <PlayerBtn icon='Repeat' size={35} fun={this.loop} bg={this.props.Loop?primaryColor:'rgba(72, 71, 70,0.4)'} color={'#fff'}/>
                        {this.state.loading?
                            <TouchableOpacity style={{width:35,height:35,marginHorizontal:4}}>
                                <Spinner color={primaryColor}  style={{position:'absolute',top:-21}}/>
                            </TouchableOpacity>
                            :
                            <PlayerBtn icon='download-arrow1' size={35}  bg={primaryColor} color={'#fff'}
                                fun={()=>this.download(this.props.PlaySong.id,this.props.PlaySong.path,this.props.PlaySong.title)}
                            />
                        }

                        
                            {this.props.isLoad?
                                <TouchableOpacity activeOpacity={0.85} style={styles.btn2}>
                                    <Spinner color={primaryColor} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity activeOpacity={0.85} onPress={this.play} style={styles.btn}>
                                    {this.props.Stop?
                                    <CustomIcon size={20} name="music-player-buttons" style={{color:primaryColor}}/>
                                    :
                                    <CustomIcon size={20} name="Pause" style={{color:primaryColor}}/>
                                    }
                                </TouchableOpacity>
                            }
                        
                        
                        <PlayerBtn icon='Next1' size={35} fun={this.prev} bg={'rgba(72, 71, 70,0.4)'} color={'#fff'} />
                        <PlayerBtn icon='Next3' size={35} fun={this.next} bg={'rgba(72, 71, 70,0.4)'} color={'#fff'} />
                    </View>

                </View>

                <View style={{position:'absolute',bottom:0,width:'100%'}}>
                    <View style={{paddingHorizontal:25,paddingVertical:8,flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                    <Text style={MainStyle.font}>{nextSong}</Text>
                    <CustomIcon size={20} name="more" style={[MainStyle.font]}/>
                </View>
                </View>
                


                

                <Modal
                    animationType="slide" transparent={true} visible={this.state.modal}
                    onRequestClose={() => {this.setState({modal:false})}}
                    >
                    <View style={styles.modal}>
                        <View style={styles.modalFrame}>
                            <Text style={[MainStyle.font,{marginVertical:10}]}>Choose the playlist to add the song</Text>
                            <FlatList
                                data={this.props.UserPlaylists}
                                renderItem={({item})=>
                                    <TouchableOpacity onPress={()=>this.addToUserPlaylist(item.id)} activeOpacity={0.9} style={styles.modalItem}>
                                        <Text style={MainStyle.font}>{item.name}</Text>
                                    </TouchableOpacity>
                                }
                                numColumns={2}
                                keyExtractor={(item, index) => index.toString()}
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
        PlayList:state.PlayList,
        Stop: state.Stop,
        PlaySong: state.PlaySong,
        PlaySongNumber: state.PlaySongNumber,
        Loop: state.Loop,
        Shuffle: state.Shuffle,

        currentTime:state.currentTime,
        duration:state.duration,
        isLoad:state.isLoad,
        UserPlaylists:state.UserPlaylists,
        Token:state.Token,
	}
};

const mapDispatchToProps=(dispatch)=>{
	return{
        AddPlayList: (PlayList)=>{dispatch({type:'ADD_PlayList', PlayList:PlayList})},
        PlayStop: (Play)=>{dispatch({type:'Play_Stop', Play:Play})},
        PlayNext: ()=>{dispatch({type:'Play_Next'})},
        PlayPrev: ()=>{dispatch({type:'Play_Prev'})},
        DoLoop: (Loop)=>{dispatch({type:'Do_Loop', Loop:Loop})},
        DocurrentTime: (currentTime)=>{dispatch({type:'Do_currentTime', currentTime:currentTime})},
        Doduration: (duration,isLoad)=>{dispatch({type:'Do_duration', duration,isLoad})},
        EndMusic: ()=>{dispatch({type:'End_Music'})},
        DoFullPlayer: ()=>{dispatch({type:'Full_Player'})},
        AddUserPlaylists: (UserPlaylists)=>{dispatch({type:'ADD_User_Playlist', UserPlaylists})},
        
        PlayShuffle: (Shuffle)=>{dispatch({type:'Shuffle_Next',Shuffle})},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Tab2);
