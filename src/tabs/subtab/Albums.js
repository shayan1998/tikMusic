import React, {Component} from 'react';
import { View, StyleSheet, FlatList, } from "react-native";
import { Container} from 'native-base';
import MainStyle, { primaryColor, baseUrl, accentColor } from '../../components/MainStyle';
import AlbumItem from '../../components/Items/AlbumItem'


export default class Albums extends Component{

    constructor(props){
        super(props);
        this.state={
            Musics:[]
        }
    }
 
    goToAlbum=(id,name)=>{
        this.props.navigation.navigate('Album',{id,name})
    }

	render() {
		return ( 
            <Container style={MainStyle.bg}>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={this.state.Musics}
                    style={{backgroundColor:'transparent'}}
                    renderItem={({item})=>
                        <AlbumItem data={item} press={this.goToAlbum}/>
                    }
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={
                        <View style={{height:20}}/>
                    }
                />

            </Container>
		);
	}
}

