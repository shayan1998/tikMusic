import React, {Component} from 'react';
import { StyleSheet, View, Dimensions, Text, FlatList} from 'react-native';
import { Container, Icon} from 'native-base';
import MainStyle,{ primaryColor } from '../MainStyle';
import {Loader} from './'


export default List=(props)=>{

    lastPage=props.lastPage || 0;
    currentPage=props.currentPage || 0;
    horizontal=props.horizontal ? true : false;
    inverted=props.inverted ? true : false;
    listEmpty=props.listEmpty || null;
    listHeader=props.listHeader || null;
    numColumns=props.numColumns || 1;
    
    return (
        <FlatList
            ListEmptyComponent={listEmpty}
            ListHeaderComponent={listHeader}
            numColumns={numColumns}
            showsHorizontalScrollIndicator={false}
            inverted={inverted}
            horizontal={horizontal}
            data={props.data}
            style={{backgroundColor:'transparent'}}
            renderItem={({item})=>
                props.children(item)
            }
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={!horizontal &&
                <View>
                    {lastPage==currentPage ?
                        <View style={{height:20}}/>
                        :
                        <Loader box/>
                    }
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
});


/*
Usage=>
    <List 
        data={this.state.item}
        children={(item)=><Test item={item}/>}
        lastPage={3}
        currentPage={1}
        horizontal
        inverted
        listEmpty={<View />}
        listHeader={<View>}
        fetchMore={this.fetchMore}
        onEnd={() => {alert('go'); this.onEnd = false; }}
    />
*/