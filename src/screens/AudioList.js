
import React, { useEffect, Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
//import*as MediaLibrary from 'expo-media-library';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview'
import AudioListItem from '../components/AudioListItem';
import Screen from './../components/Screen';
import OptionModal from '../components/OptionModal';
import {Audio} from 'expo-av';

export class AudioList extends Component {
    static contextType = AudioContext;
    constructor(props){
        super(props);
        this.state={
            optionModalVisible:false,
            playBackOj:null,
            soundObj:null,
            currentAudio:{}
        }
        this.currentItem={}
    }

    layoutProvider = new LayoutProvider((i) => 'audio', (type, dim) => {
        switch (type) {
            case "audio":
                dim.width = Dimensions.get('window').width;
                dim.height = 70;
                break;
            default:
                dim.width = 0;
                dim.height = 0;

        }

    });
    handleAudioPress= async audio =>{
        //playing audio for the first time
        if(this.state.soundObj===null){
            const playBackOj = new Audio.Sound();
           const status = await playBackOj.loadAsync({uri:audio.uri},{shouldPlay:true});
           
          return this.setState({...this.state,currentAudio:audio, playBackOj:playBackOj, soundObj:status})

        }
        //pause the audio
        if(this.state.soundObj.isLoaded && this.state.soundObj.isPlaying){
         const status =   await this.state.playBackOj.setStatusAsync({shouldPlay:false});
         return this.setState({...this.state,soundObj:status})
        }
        //resume audio
        if(this.state.soundObj.isLoaded && 
          !this.state.soundObj.isPlaying &&
          this.state.currentAudio.id ===audio.id){
           const status = await this.state.playBackOj.playAsync()
           return this.setState({...this.state,soundObj:status})

        }

    };


    rowRenderer = (type, item) => {
        return <AudioListItem 
        title={item.filename}
         duration={item.duration}
            onAudioPress={()=>this.handleAudioPress(item)}
             onOptionPress = {()=>{
                 this.currentItem=item
                 this.setState({...this.state,optionModalVisible:true})
             }}
         />

    }

    render() {
        return (
            <AudioContext.Consumer>
                {({ dataProvider }) => {
                    return (
                        <Screen >
                        <RecyclerListView
                            dataProvider={dataProvider}
                            layoutProvider={this.layoutProvider}
                            rowRenderer={this.rowRenderer}
                        />
                        <OptionModal 
                        onPlayPress ={()=>console.log('Playing Audio')}
                        onPlayListPress={()=>console.log('Play List to Play')}
                        currentItem={this.currentItem}
                        onClose ={()=>this.setState({...this.state,optionModalVisible:false})} 
                        visible={this.state.optionModalVisible}/>

                    </Screen>
                    )


                }}
            </AudioContext.Consumer>
        )

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",


    },
});
export default AudioList;