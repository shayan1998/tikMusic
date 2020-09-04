import { StyleSheet,Dimensions,StatusBar} from 'react-native';
import { primaryColor, graylighter, graylight,gray} from '../components/MainStyle';

const width=Dimensions.get('window').width-100;



export default styles = StyleSheet.create({
    frame:{
        flex:1,width:'100%',height:'100%',backgroundColor:gray
    },
    viewPager: {
        flex: 1,
        marginTop:20+StatusBar.currentHeight,
    },
    wrapper:{
        alignItems:'flex-end',
    },
    dotActive:{
        width:25,
        backgroundColor:'#fff',
    },
    dot:{
        width:15,
        height:8,
        borderRadius:10,
        backgroundColor:graylighter,
        marginHorizontal:3
    },
    image:{
        width:width,
        height:width,
        borderRadius:width/2,
        alignSelf:'center',
        //marginVertical:20,
    },
    modalImage:{
        width:80,
        height:80,
        borderRadius:40,
        alignSelf:'center',
    },
    progress:{
        alignSelf:'center',
        marginVertical:20,
    },
    btn:{
        backgroundColor:'#fff',
        width:50,
        height:50,
        borderRadius:25,
        marginHorizontal:15,
        alignItems:'center',
        justifyContent:'center'
    },
    btn2:{
        backgroundColor:'transparent',
        width:50,
        height:50,
        borderRadius:25,
        marginHorizontal:15,
        alignItems:'center',
        justifyContent:'center'
    },
    header:{
        width:'90%',
        alignSelf:'center',
        padding:15,
        flexDirection:'row'
    },
    modal:{
        backgroundColor:graylight,
        width:'90%',
        alignSelf:'center',
        padding:15,
        borderRadius:15,
        overflow:'hidden'
    },
    btnModal:{
        width:'90%',
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:primaryColor,
        borderRadius:20,
        marginTop:10,
        padding:8
    },
    btnModal2:{
        width:'90%',
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'gray',
        borderRadius:20,
        marginTop:10,
        padding:8
    },


    //modal add song to playlist
    modal:{
        backgroundColor:'rgba(0,0,0,0.6)',
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    modalFrame:{
        width:'90%',
        height:'75%',
        backgroundColor:graylight,
        padding:15,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center'
    },
    modalItem:{
        width:'45%',
        margin:5,
        height:100,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"rgba(255,255,255,0.2)"
    }
});