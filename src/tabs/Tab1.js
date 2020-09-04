import React, {Component} from 'react';
import { View, Dimensions, PermissionsAndroid,Text} from "react-native";
import MainStyle, { primaryColor, accentColor } from '../components/MainStyle';
import Input from '../components/Input';
import MyCarousel from '../components/MyCarousel';
import Trands from '../tabs/subtab/Trands';
import NewAlbums from '../tabs/subtab/NewAlbums';
import {connect} from 'react-redux';
import {Basic,ActiveHeader} from '../layout'; 
import {slider,playlist} from '../api/home';
import {NotifHelper} from '../Util/Notification/NotifHelper';
import {RouterHelper} from '../Util/RouterHelper';
import {Tabs} from '../components/ui';
import ViewPager from '@react-native-community/viewpager';


class Tab1 extends Component{

    constructor(props){
        super(props);
        this.state={
            refresh:false,
            load:false,
            search:'',
            token:'',
            slider:[], 

            activeTab:0,
            select:'option1',
            items:[
                {key:'option1',value:'Trands'},
                {key:'option2',value:'latest'},
            ],
        }
        this.viewpager=null;
    }
    go=(e)=>{
        this.setState({select:e});
        this.viewpager.setPage(e=='option1'? 0:1);
    }
    goScroll=(e)=>{
        this.setState({
            select:e.nativeEvent.position==0 ? 'option1':'option2',
        });
    }

    componentDidMount(){
        this.fetch()
		this.pickerAttacment();
    }
	pickerAttacment() {
		PermissionsAndroid.requestMultiple(
		  [
			PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
			PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
		  ], {
			title: 'Permission',
			message: 'We need your permission.',
		  },
		)
		.then((permRes) => {
			console.log('Permission granted');
		})
	}

    fetch=async()=>{
        await slider(this.state.token)
            .then(response=> {
                console.log(response);
                this.setState({
                    slider:response.data.data.slider,
                    load:true
                });
            })
            .catch(error=>{
                this.setState({refresh:true});
                console.log(error.response);
            });
    }

    makePlayList=async(id)=>{
        this.props.StPlay(id);
        console.log('cash', this.props.CashPlaylists)
        let find = this.props.CashPlaylists.findIndex(x => x.id ===id);
        if(find!=-1){
            this.props.AddPlayList(this.props.CashPlaylists[find].PlayList);
            RouterHelper.FullPlayer();
            console.log('fromCash', this.props.CashPlaylists[find].PlayList)
            return;
        }
        await playlist(id)
            .then(response=> {
                console.log(response);
                this.props.AddPlayList(response.data.data.musics,id);
                RouterHelper.FullPlayer();
            })
            .catch(error=>{ 
                NotifHelper.show('danger','Sorry, There is some problem',4000)
            });
    }

    getText=(name, value)=>{   
        this.setState(() => ({ [name]: value })); 
    }


    
	render() { 
        let widthBox=Dimensions.get('window').width;

		return (
            <ActiveHeader
                loading={this.state.load}
                refresh={this.state.refresh}
                title="Home"
                deRefresh={this.fetch}
            >

                <MyCarousel Play={this.makePlayList} data={this.state.slider}/>
                
                <Input  
                    placeholder="Search for artists, song or leyric"  name='search'
                    width={'90%'} getText={this.getText} style={{borderRadius:25}}
                    bg={'rgba(0,0,0,0.3)'} color={'#fff'} icon="search"
                    iconPress={()=>this.props.navigation.navigate('Search',{search:this.state.search})}
                />

                <Tabs press={this.go} selected={this.state.select} items={this.state.items}/>
                <ViewPager style={{minHeight:Dimensions.get('screen').height,width:'96%',alignSelf:'center'}} 
                    initialPage={this.state.activeTab} onPageSelected={this.goScroll}
                    ref={(viewpager) => {this.viewpager = viewpager}}
                >
                    <View style={{width:widthBox,}} key="1">
                        <Trands/>
                    </View>
                    <View style={{width:widthBox}} key="2">
                        <NewAlbums navigation={this.props.navigation}/>
                    </View>
                </ViewPager> 

            </ActiveHeader>
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
        AddPlayList: (PlayList,id)=>{dispatch({type:'ADD_PlayList', PlayList:PlayList,id,Shuffle:false})},
        DoFullPlayer: ()=>{dispatch({type:'Full_Player'})},
        StPlay: (id)=>{dispatch({type:'Select_To_Play',id})}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Tab1);










