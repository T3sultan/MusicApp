import React from 'react';
import { View, Text, StyleSheet,Dimensions,TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import color from '../misc/color';
//import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const getThumbnailText =(filename)=>filename[0];

//convertTime
const convertTime=minutes =>{
    if(minutes){
        const hrs=minutes/60;
        const minute =hrs.toString().split('.')[0];
        const percent = parseInt(hrs.toString().split('.')[1].slice(0,2));
        const sec = Math.ceil((60*percent)/100);

        if(parseInt(minute)<10 && sec< 10){
            return `0${minute}:0${sec}`;

        }
        if(parseInt(minute)<10){
            return `0${minute}:${sec}`;

        }
        if(sec<10){
            return `${minute}:0${sec}`;
        }
        return `${minute}:${sec}`;
    }
};


const AudioListItem = ({title,duration,onOptionPress,onAudioPress}) => {
    return (
        <>
        <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onAudioPress}>
            <View style={styles.leftContainer}>
                <View style={styles.thumbnail}>
                    <Text style={styles.thumbnailText}>{getThumbnailText(title)}</Text>
                </View>
                <View style={styles.TitleContainer}>
                    <Text numberOfLines={1} style={styles.title}>{title}</Text>
                    <Text style={styles.titleTime}> {convertTime(duration)}</Text>
                </View>
            </View>
            </TouchableWithoutFeedback>
            <View style={styles.rightContainer}>
                <Entypo
                onPress={onOptionPress}
                name="dots-three-vertical" 
                size={24}
                color={color.FONT_MEDIUM}
                style={{padding:10}}
                
                 />
            </View>
        </View>
        <View style={styles.separtor}/>
        </>
    )
};
const {width} =Dimensions.get("window")
const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        alignSelf:"center",
        width:width-80,


    },
    leftContainer:
    {
        flexDirection:"row",
        alignItems:"center",
        flex:1,

    },
    rightContainer: {
        flexBasis:50,
        height:50,
        alignItems:"center",
        justifyContent:"center"
     

    },
    thumbnail:{
        height:50,
        flexBasis:50,
        backgroundColor:color.FONT_LIGHT,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:25
    },
    thumbnailText:{
        fontSize:22,
        fontWeight:'bold',
        color:color.FONT
    },
    TitleContainer:{
        width:width-180,
        paddingLeft:10,

    },
    title:{
        fontSize:16,
        color:color.FONT
    },
    separtor:{
        width:width-80,
        backgroundColor:"#333",
        opacity:0.3,
        height:0.5,
        alignSelf:"center",
        marginTop:10
    },
    titleTime:{
        fontSize:14,
        color:color.FONT_LIGHT,
        
    }

})


export default AudioListItem;