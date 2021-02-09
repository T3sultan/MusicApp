import React, { Component,createContext } from 'react';
import { Text, View ,Alert} from 'react-native';
import *as MediaLibrary from 'expo-media-library';

export const AudioContext = createContext()
export class AudioProvider extends Component {


    constructor(props) {

        super(props);
        this.state={
            audioFiles:[],
            permissionError:false
        }
    }
    permissionAllert=()=>{
        Alert.alert("Permission Required","This app needs to read audio files!",[{
            text:"I am ready",
            onPress:()=>this.getPermission()
        },{
            text:"cancle",
            onPress:()=>this.permissionAllert()
        }] )
}
    getAudioFiles = async ()=>{
      let media = await MediaLibrary.getAssetsAsync({
            mediaType:'audio'
        })
        media = await MediaLibrary.getAssetsAsync({
            mediaType:'audio',
            first:media.totalCount,
        })
        //console.log(media)
        this.setState({...this.state,audioFiles:media.assets})

    }


    getPermission = async () => {
        // Object {
        //     "canAskAgain": true,
        //     "expires": "never",
        //     "granted": false,
        //     "status": "undetermined",
        //   }



        const permission = await MediaLibrary.getPermissionsAsync();
        if (permission.granted) {
            //than all the audio files
            this.getAudioFiles()
        }
        if(!permission.canAskAgain && !permission.granted){
            this.setState({...this.state,permissionError:true})


        }

        if (!permission.granted && permission.canAskAgain) {

            const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
            if (status === 'denied' && canAskAgain) {
                //display allow alert that user must  allow this permission for my app
                this.permissionAllert()

            }
            if (status === 'granted') {
                //show  all the audio files
                this.getAudioFiles()

            }
            if (status === 'denied' && !canAskAgain) {
                //display some error to the user
                this.setState({...this.state,permissionError:true})


            }
        }
    }


    componentDidMount() {
       this.getPermission();
    }

    render() {
        if(this.state.permissionError) return <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        }}>
            <Text style={{fontSize:20,textAlign:"center",color:'red'}}>Its looks like you haven't accpet the permission.</Text>
        </View>

        return <AudioContext.Provider value={{audioFiles:this.state.audioFiles}}>
            {this.props.children}
        </AudioContext.Provider>
    }
}
export default AudioProvider;