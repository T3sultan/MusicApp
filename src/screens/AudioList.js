
import React, { useEffect, Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
//import*as MediaLibrary from 'expo-media-library';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview'
import AudioListItem from '../components/AudioListItem';
import Screen from './../components/Screen';
import OptionModal from '../components/OptionModal';

export class AudioList extends Component {
    static contextType = AudioContext;
    constructor(props){
        super(props);
        this.state={
            optionModalVisible:false
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

    })
    rowRenderer = (type, item) => {
        return <AudioListItem 
        title={item.filename}
         duration={item.duration}
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