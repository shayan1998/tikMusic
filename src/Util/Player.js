import React, { Component } from 'react';
import {Icon, Text,View, Spinner } from 'native-base';
import { StyleSheet,TouchableOpacity, Image, ImageBackground, Animated} from 'react-native';
import MainStyle, { primaryColor, graylighter, graylight} from '../components/MainStyle';
import Video from 'react-native-video';
import {connect} from 'react-redux';
import Slider from 'react-native-slider';
import PlayerBtn from '../components/PlayerBtn';
import * as Animatable from 'react-native-animatable';
import FullPlayer from '../pages/FullPlayer';
import CustomIcon from '../components/CustomIcon';
import MusicControl from 'react-native-music-control';
import {Swipeable} from "react-native-gesture-handler";
import {RouterHelper} from '../Util/RouterHelper'
import RNBackgroundDownloader from 'react-native-background-downloader';
import {NotifHelper} from '../Util/Notification/NotifHelper'


class Player extends Component {
	constructor(props){
        super(props)
        this.state={
            load:true,
            loadMusic:false,
            FullPlayerModal:false,
            loading:false
        }     
	}


	componentDidMount(){        
        MusicControl.enableControl('play', true)
        MusicControl.enableControl('nextTrack', true)
        MusicControl.enableControl('previousTrack', true)
        MusicControl.enableControl('closeNotification', true, {when: 'always'})

        MusicControl.on('nextTrack', ()=> {
            this.next();
        })
        MusicControl.on('previousTrack', ()=> {
            this.prev();
        })
        MusicControl.on('play', ()=> {
            this.play();
        })
    }

	play=()=>{
        this.props.PlayStop(!this.props.Stop);
        // MusicControl.enableControl('pause', true)
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
        if(this.props.PlayList.length!=1){
            this.props.DoLoop(!this.props.Loop);
        }
	}




    getTime=(time)=>{
        const digit=n=>n<10?`0${n}`:`${n}`;
        const sec=digit(Math.floor(time%60));
        const min=digit(Math.floor((time/60)%60));
        return min+':'+sec;
    }

    onLoadEnd=(data)=>{
        this.props.Doduration(data.duration,false);
        MusicControl.setNowPlaying({
            title: this.props.PlaySong.title,
            artwork: this.props.PlaySong.cover, 
            artist: this.props.PlaySong.artist,
            color: 0x484746,//0xFFFFFF,
        })
    }
    onProgress=(data)=>{
        // this.setState({currentTime: data.currentTime,});
        this.props.DocurrentTime(data.currentTime);
    }
    onEnd=()=>{
        //this.setState({currentTime:0, paused: true});
        this.props.EndMusic();
        this.player.seek(0);
        this.next();
    }
    onSlide=(slide)=>{
        this.player.seek(slide*this.props.duration);
    }

    onClose=()=>{
        this.props.ClosePlay();
        MusicControl.resetNowPlaying()
    }

    goFullPlayer=()=>{
        this.props.DoFullPlayer();
        RouterHelper.FullPlayer();
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
			console.log(`Going to download ${expectedBytes} bytes!`);
		}).progress((percent) => {
			console.log(`Downloaded: ${percent * 100}%`);
		}).done(() => {
            this.setState({loading:false});
			console.log('Download is done!');
            NotifHelper.show('success',`Great, ${name} downloaded successfuly`,4000)
		}).error((error) => {
            NotifHelper.show('danger','Sorry, There is some problem',4000)
		});
    }

	render() {
		return (
		<View>

            {!this.props.FullPlayer &&

            <View>
                {this.props.SubPlayer &&
                <TouchableOpacity activeOpacity={0.9} onPress={this.goFullPlayer} style={[styles.subPlayer,{bottom:this.props.subplayerHeight}]}>
                
                    <ImageBackground source={require('../../assets/images/bg3.png')} blurRadius={7} style={{width:'100%'}}>
                        <Slider style={{flex:1,backgroundColor:'transparent',height:4}} 
                            value={this.props.isLoad ?0 :this.props.currentTime/this.props.duration} 
                            onValueChange={this.onSlide} 
                            minimumTrackTintColor={primaryColor}
                            maximumTrackTintColor={'rgba(0,0,0,0.3)'} 
                            thumbTintColor={primaryColor}
                            trackStyle={{height:8,borderRadius:4}}
                            thumbStyle={{width:8,height:8,borderRadius:4}}
                        />
                        <View style={styles.bottomBox}>
                            
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="close" style={{fontSize:17,color:'#fff',marginRight:3,padding:9}} onPress={this.onClose}/>
                                <Image source={{uri:this.props.PlaySong.cover}} defaultSource={require('../../assets/images/placeholder.png')} style={styles.songAvatar}/>
                                <View>
                                    <Text style={MainStyle.font} numberOfLines={1}>{this.props.PlaySong.title}</Text>
                                    <Text style={[MainStyle.font,{fontSize:12}]} numberOfLines={1}>{this.props.PlaySong.artist}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                
                                <CustomIcon size={17} name="Next1" style={{color:'#fff',padding:7}} onPress={this.prev}/>
                                    {this.props.isLoad?
                                        <Spinner color={primaryColor} size="small" style={{height:20,marginHorizontal:12}}/>
                                        :
                                        <View>
                                            {this.props.Stop?
                                            <CustomIcon size={17} name="music-player-buttons" onPress={this.play} style={styles.playPause}/>
                                            :
                                            <CustomIcon size={17} name="Pause" onPress={this.play} style={styles.playPause}/>
                                            }
                                        </View>
                                    }
                                <CustomIcon size={17} name="Next3" style={{color:'#fff',padding:7}} onPress={this.next}/>
                            </View>
                        </View>
                    
                    
                    </ImageBackground>
                </TouchableOpacity>
                }
            </View>
            }
            

			{this.props.PlaySong.id!=undefined &&
                <Video 
                    source={{uri: this.props.PlaySong.path }}
                    ref={(ref)=>{this.player=ref}}                                 
                    onError={this.videoError}   
                    // onLoad={this.onLoad}
                    style={styles.backgroundVideo}
                    paused={this.props.Stop}
                    playInBackground={true}
                    onProgress={this.onProgress}
                    onSeek={this.onSeek}
                    onEnd={this.onEnd}
                    onLoad={this.onLoadEnd}
                />
            }
		</View>
		);
	}
}

const styles = StyleSheet.create({
    subPlayerBox:{
        flex:1,
        width:'100%',
        height:'100%',
    },
	subPlayer:{
        overflow:'hidden',
        width:'100%',
        backgroundColor:'rgba(0,0,0,0.3)',
		alignSelf:'center',
		zIndex:10,
		position:'absolute',
		//bottom:52,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    btn:{
        backgroundColor:'#fff',
        width:40,
        height:40,
        borderRadius:20,
        marginHorizontal:10,
        alignItems:'center',
        justifyContent:'center'
    },
    bottomBox:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:8,
        paddingHorizontal:10,
        //backgroundColor:'rgba(0,0,0,0.3)',
        width:'100%'
    },
    songAvatar:{
        width:40,
        height:40,
        borderRadius:4,
        marginRight:5
    },
    playPause:{
        color:primaryColor,
        marginHorizontal:3,
        padding:10,
        paddingHorizontal:8
    }
});





const mapStateToProps=(state)=>{
	return{
        PlayList:state.PlayList,
        SubPlayer: state.SubPlayer,
        Stop: state.Stop,
        PlaySong: state.PlaySong,
        PlaySongNumber: state.PlaySongNumber,
        Loop: state.Loop,
        FullPlayer: state.FullPlayer,
        Shuffle: state.Shuffle,
        subplayerHeight:state.subplayerHeight,

        currentTime:state.currentTime,
        duration:state.duration,
        isLoad:state.isLoad,
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
        ClosePlay: ()=>{dispatch({type:'Close_Play'})},
        DoFullPlayer: ()=>{dispatch({type:'Full_Player'})},
        
        PlayShuffle: (Shuffle)=>{dispatch({type:'Shuffle_Next',Shuffle})},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
