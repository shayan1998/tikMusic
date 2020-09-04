const initState={
    PlayList:[],
    PlaySong:{},
    PlayListId:'',
    PlaySongNumber:0, 
    SubPlayer:false,
    FullPlayer:false,
    NotifPlayer:false,
    Shuffle:false,
    Stop:true,
    Loop:false,
    Token:'',
    subplayerHeight:52,

    
    currentTime:1,
    duration:1,
    isLoad:true,
    UserPlaylists:[],
    CashPlaylists:[],
};


const RootReducer=(state=initState, action)=>{

    //select item to play make item defrent from others
    if(action.type=='Select_To_Play'){
        return{
            ...state,
            PlayListId:action.id,
        }
    }

    //Stop the music and kill the player
    if(action.type=="Close_Play"){
        return{
            ...state,
            PlayList:[],
            PlaySong:{},
            SubPlayer:false,
            Stop:true,
            PlayListId:'',
        }
    }
    
    //setup a list of music for play
    if(action.type=="ADD_PlayList"){
        let addToCash= action.id!=undefined? [{id:action.id,PlayList:action.PlayList}]:[] ;
        return{
            ...state,
            PlayList:action.PlayList,
            PlaySong:action.PlayList[action.PlaySongNum | 0],
            // SubPlayer:true,
            FullPlayer:true,
            SubPlayer:false,

            //testing cash
            CashPlaylists:[...state.CashPlaylists,...addToCash],

            Stop:false,
            // Shuffle:action.Shuffle,
            //FullPlayer:action.PlayList.length==1 ? true : false
        }
    }

    //play or pause the song
    if(action.type=="Play_Stop"){
        return{
            ...state,
            Stop:action.Play,
        }
    }

    //setup a single song for play
    if(action.type=="ADD_Song"){
        return{
            ...state,
            //PlayList:[...state.PlayList,action.Song],
            PlaySong:action.Song,
            SubPlayer:true,
            Stop:false,
        }
    }

    //go to next song =>2 condition ==>1)just one song  2)have a playlist
    if(action.type=="Play_Next"){
        //if we are not in the end of the our list
        if(state.PlaySongNumber!=state.PlayList.length-1){
            if(state.PlayList.length==1){
                return{
                    ...state,
                    PlaySong:state.PlayList[state.PlaySongNumber],
                    currentTime:1,
                    isLoad:false,
                }
            }else{
                return{
                    ...state,
                    // PlaySongNumber:state.Shuffle ? action.RandomNum : state.PlaySongNumber+1,
                    // PlaySong:state.PlayList[state.Shuffle ? action.RandomNum : state.PlaySongNumber+1],

                    PlaySongNumber:state.PlaySongNumber+1,
                    PlaySong:state.PlayList[state.PlaySongNumber+1],
                    currentTime:1,
                    isLoad:true,
                }
            }
        }
        //if we are in the end of the our list and loop is true
        else if(state.Loop==true && state.PlaySongNumber==state.PlayList.length-1){
            return{
                ...state,
                PlaySongNumber:0,
                PlaySong:state.PlayList[0],
                currentTime:1,
                isLoad:true,
            }
        }
    }

    //shuffle the next song
    if(action.type=="Shuffle_Next"){
        return{
            ...state,
            PlaySongNumber:action.Shuffle,
            PlaySong:state.PlayList[action.Shuffle],
            currentTime:1,
            isLoad:true,
        }
    }


    //go to previus song
    if(action.type=="Play_Prev"){
        if(state.PlaySongNumber!=0){
            return{
                ...state,
                PlaySongNumber:state.PlaySongNumber-1,
                PlaySong:state.PlayList[state.PlaySongNumber-1],
                currentTime:1,
                isLoad:true,
            }
        }
    }

    //do loop in list
    if(action.type=="Do_Loop"){
        return{
            ...state,
            Loop:action.Loop,
        }
    }

    //set the current time of player
    if(action.type=="Do_currentTime"){
        return{
            ...state,
            currentTime:action.currentTime,
        }
    }

    //set the song duration
    if(action.type=="Do_duration"){
        return{
            ...state,
            duration:action.duration,
            isLoad:action.isLoad,
            //currentTime:action.currentTime,
        }
    }

    //end of the music
    if(action.type=="End_Music"){
        return{
            ...state,
            currentTime:1,
            isLoad:false,
            Stop:false,
        }
    }

    //change the fullPlayer mode
    if(action.type=="Full_Player"){
        return{
            ...state,
            FullPlayer:!state.FullPlayer,
            SubPlayer:true
        }
    }

    //set next song ready
    if(action.type=="Set_Next_Song"){
        return{
            ...state,
            PlaySongNumber:action.id-1
        }
    }

    //set user token
    if(action.type=="ADD_Token"){
        return{
            ...state,
            Token:action.token
        }
    }

    //set user playlists
    if(action.type=="ADD_User_Playlist"){
        return{
            ...state,
            UserPlaylists:action.UserPlaylists
        }
    }


    //set subPlayer height
    if(action.type=="subPlayer_Height"){
        let NewsubplayerHeight=state.subplayerHeight==52 ? 0:52;
        return{
            ...state,
            subplayerHeight:NewsubplayerHeight
        }
    }


    return state;
};


export default RootReducer;