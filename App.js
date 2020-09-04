import React, {Component} from 'react';
import { StatusBar} from 'react-native';
import { Container} from 'native-base';
import Router from './src/router/Router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import RootReducer from './src/reducer/RootReducer';
import Player from './src/Util/Player';
import GlobalAlert from './src/Util/Alert/GlobalAlert';
import {AlertHelper} from './src/Util/Alert/AlertHelper';
import {RouterHelper} from './src/Util/RouterHelper';
import GlobalNotif from './src/Util/Notification/GlobalNotif';
import {NotifHelper} from './src/Util/Notification/NotifHelper';



const store=createStore(RootReducer);

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    
    render() {
        return (
			<Provider store={store}>
		        <Container>
                <GlobalNotif ref={ref => NotifHelper.setNotif(ref)}/>
                    
                    <StatusBar backgroundColor={'transparent'} barStyle="light-content" translucent/>
				    <Router ref={ref => RouterHelper.setRouter(ref)}/>
                    <Player />
                    
                </Container>
                <GlobalAlert ref={ref => AlertHelper.setAlert(ref)}/>
			</Provider>
        );
    }
}
