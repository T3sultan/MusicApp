
import React, { useEffect,Component } from 'react';
import { StyleSheet, Text, View,ScrollView} from 'react-native';
import { AudioContext } from '../context/AudioProvider';
//import*as MediaLibrary from 'expo-media-library';

export class AudioList extends Component{
    static contextType = AudioContext
    render(){
        return (
            <ScrollView>
            {this.context.audioFiles.map(item=> <Text
            style={{padding:10,borderBottomColor:'red',borderBottomWidth:2}}
             key={item.id}>{item.filename}</Text>)}
               
    
            </ScrollView>
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