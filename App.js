
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import AudioProvider from './src/context/AudioProvider';
import { View } from 'react-native';
import AudioListItem from './src/components/AudioListItem';

export default function App() {
  // return (
  //   <AudioProvider>
  //     <NavigationContainer>
  //       <AppNavigator />
  //     </NavigationContainer>

  //   </AudioProvider>

  // )
  return(
    <View style={{marginTop:50}}>
      <AudioListItem/>
    </View>
  )

}