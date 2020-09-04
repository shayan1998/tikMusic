import React, { Component } from 'react';
import { Container, Title,View } from 'native-base';
import { StatusBar,Dimensions, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import ViewPager from '@react-native-community/viewpager';
import styles from '../style/FullPlayer';
import Tab1 from '../tabs/FullPlayer/Tab1'
import Tab2 from '../tabs/FullPlayer/Tab2'
import Tab3 from '../tabs/FullPlayer/Tab3'
import { graylight, primaryColor } from '../components/MainStyle';

class FullPlayer extends Component {
	constructor(props){
        super(props)
        this.state={
            activeTab:1
        }     
    }
    

    componentWillUnmount(){
        this.props.DoFullPlayer();
    }

    changePage=(e)=>{
        this.setState({activeTab:e.nativeEvent.position})
    }

	render() {
        let widthBox=Dimensions.get('window').width;
        let activeTab=this.state.activeTab;

		return (
            <ImageBackground source={{uri:this.props.PlaySong.cover}} blurRadius={5} style={styles.frame}>
                <View style={{flexDirection:'row',alignSelf:'center',position:'absolute',top:20+StatusBar.currentHeight}}>
                    <View style={[styles.dot,activeTab==0 && styles.dotActive]}/>
                    <View style={[styles.dot,activeTab==1 && styles.dotActive]}/>
                    <View style={[styles.dot,activeTab==2 && styles.dotActive]}/>
                </View>

                <ViewPager style={styles.viewPager} initialPage={this.state.activeTab} onPageSelected={this.changePage}>


                    {/* tab1 */}
                    <View style={{width:widthBox}} key="1">
                        <Tab1 />
                    </View>
                    
                    <View style={{width:widthBox}} key="2">
                        <Tab2 /> 
                    </View>
                    
                    <View style={{width:widthBox}} key="3">
                        <Tab3 />
                    </View>

                </ViewPager> 
            </ImageBackground>
		);
	}
}


const mapStateToProps=(state)=>{
	return{
        PlayList:state.PlayList,
        SubPlayer: state.SubPlayer,
        Stop: state.Stop,
        PlaySong: state.PlaySong,
        PlaySongNumber: state.PlaySongNumber,
        Loop: state.Loop,
        Shuffle: state.Shuffle,

        currentTime:state.currentTime,
        duration:state.duration,
        isLoad:state.isLoad,
        Musics:state.Musics,
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
        
        PlayShuffle: (Shuffle)=>{dispatch({type:'Shuffle_Next',Shuffle})},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(FullPlayer);
