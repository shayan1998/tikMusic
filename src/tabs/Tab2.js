import React, {Component} from 'react';
import { View, Dimensions, FlatList, AsyncStorage, TouchableOpacity} from "react-native";
import MainStyle, { primaryColor, baseUrl, accentColor } from '../components/MainStyle';
import Albums from '../tabs/subtab/Albums';
import PlayLists from '../tabs/subtab/PlayLists';
import Liked from '../tabs/subtab/Liked';
import {connect} from 'react-redux';
import {Basic,ActiveHeader} from '../layout';
import {likes} from '../api/user'
import Login from '../components/Items/Login';
import ViewPager from '@react-native-community/viewpager';
import {Tabs} from '../components/ui';


class Tab2 extends Component{

    constructor(props){
        super(props);
        this.state={
            refresh:false,
            load:false,
            Musics:[],
            user:true,
            activeTab:0,
            select:'option1',
            items:[
                {key:'option1',value:"PlayList's"},
                {key:'option2',value:'Liked'},
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
        this.props.navigation.addListener('didFocus', () => {
            this.user()
        });
        //this.fetch()
    }
    user=()=>{
        if(this.props.Token==''){
            this.setState({user:false,load:true})
        }else{
            this.fetchlikes();
        }
    }

    fetchlikes=()=>{
        likes(this.props.Token)
            .then(response=> {
                console.log(response);
                this.setState({
                    Musics:response.data.errors.musics,
                    load:true
                });
            })
            .catch(error=>{
                console.log(error.response);
                this.setState({refresh:false})
            });
    }
    
    loginDone=()=>{
        this.setState({
            user:true,load:false
        })
        this.user()
    }


	render() {
		return (
            <ActiveHeader
                loading={this.state.load}
                refresh={this.state.refresh}
                title="Library's"
                deRefresh={this.fetch}
                height={130}
            >
                {this.state.user?
                
                <View>
                    <Tabs press={this.go} selected={this.state.select} items={this.state.items}/>
                    <ViewPager style={{minHeight:Dimensions.get('screen').height,width:'96%',alignSelf:'center'}} 
                        initialPage={this.state.activeTab} onPageSelected={this.goScroll}
                        ref={(viewpager) => {this.viewpager = viewpager}}
                    >
                        <View  key="1">
                            <PlayLists navigation={this.props.navigation}/>
                        </View>
                        <View  key="2">
                            <Liked Musics={this.state.Musics}/>
                        </View>
                    </ViewPager>
                </View> 
                // <View style={{width:'95%',alignSelf:'center',flex:1}}>
                //     <Tabs underlineStyle={{backgroundColor:'blue',}} renderTabBar={()=> <ScrollableTab style={{ borderWidth: 0}} underlineStyle={{height:3,backgroundColor:'#ff1a75'}}/>} tabBarBackgroundColor="transparent">

                //         <Tab heading="PlayList's" activeTabStyle={MainStyle.tab} tabStyle={MainStyle.tab} 
                //             activeTextStyle={{color:primaryColor}} textStyle={MainStyle.font}
                //         >
                //             <PlayLists navigation={this.props.navigation}/>
                //         </Tab>
                //         {/* <Tab heading="Album's" activeTabStyle={MainStyle.tab} tabStyle={MainStyle.tab} 
                //             activeTextStyle={{color:primaryColor}} textStyle={MainStyle.font}
                //         >
                //             <Albums navigation={this.props.navigation}/>
                //         </Tab> */}
                //         <Tab heading="Liked" activeTabStyle={MainStyle.tab} tabStyle={MainStyle.tab} 
                //             activeTextStyle={{color:primaryColor}} textStyle={MainStyle.font}
                //         >
                //             <Liked Musics={this.state.Musics}/>
                //         </Tab>

                //     </Tabs>
                // </View>
                :

                <Login done={this.loginDone} navigation={this.props.navigation}/>
                }
            </ActiveHeader>
		);
	}
}







const mapStateToProps=(state)=>{
	return{
		PlayList: state.PlayList,
        PlaySong: state.PlaySong,
        Token:state.Token
	}
};

const mapDispatchToProps=(dispatch)=>{
	return{
        AddPlayList: (PlayList)=>{dispatch({type:'ADD_PlayList', PlayList:PlayList})},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Tab2);