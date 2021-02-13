import React from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import color from '../misc/color';


const AudioListItem = () => {
    return (
        <>
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View style={styles.thumbnail}>
                    <Text style={styles.thumbnailText}>A</Text>
                </View>
                <View style={styles.TitleContainer}>
                    <Text numberOfLines={1} style={styles.title}>This will be some long song title,more some song!</Text>
                    <Text style={styles.titleTime}> 03:56</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Entypo name="dots-three-vertical" size={24} color={color.FONT_MEDIUM} />
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