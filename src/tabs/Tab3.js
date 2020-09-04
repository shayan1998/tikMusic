import React, {Component} from 'react';
import { View, StyleSheet, FlatList,} from "react-native";
import SingerItem from '../components/Items/SingerItem';
import {connect} from 'react-redux';
import Input from '../components/Input'
import { ScrollView } from 'react-native-gesture-handler';
import {ActiveHeader} from '../layout';
import {artists,artist} from '../api/artist';
import {Button} from '../components/ui'


class Tab3 extends Component{

    constructor(props){
        super(props);
        this.state={
            page:1,
            refresh:false,
            load:false,
            search:'',
            Singers:[],
            lastPage:'',
            currentPage:''
        }
    }

    componentDidMount(){
        this.fetch()
    }
    fetch=async()=>{
        this.setState({refresh:false})
        await artists(this.state.page)
            .then(res=>{console.log('response', res)
                this.setState({
                    Singers:[...this.state.Singers,...res.data.data.artists],
                    lastPage:res.data.meta.last_page,
                    currentPage:res.data.meta.current_page,
                    load:true,
                })
            })
            .catch(error=>{
                console.log('error.response', error)
                this.setState({refresh:true})
            })
    }
    more=()=>{
        this.setState({page:this.state.page+1},this.fetch)
    }


    getText=(name, value)=>{   
        this.setState(() => ({ [name]: value }));
    }

    press=(id,name)=>{
        this.props.navigation.navigate('Artist',{id,name})
    }


	render() {
		return (
            <ActiveHeader
                loading={this.state.load}
                refresh={this.state.refresh}
                title="Artists"
                deRefresh={this.fetch}
            >
                    <ScrollView style={{flex:1}}>
 
                        <Input 
                            placeholder="Search for artists, song or leyric" name='search'
                            width={'90%'} getText={this.getText} style={{borderRadius:25}}
                            bg={'rgba(0,0,0,0.3)'} color={'#fff'} icon="search" 
                            iconPress={()=>this.props.navigation.navigate('Search',{search:this.state.search})}
                            iconPress={this.fetch}
                        />

                        <FlatList
                            data={this.state.Singers}
                            renderItem={({item})=>
                                <SingerItem data={item} press={this.press}/>
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

                    </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Tab3);