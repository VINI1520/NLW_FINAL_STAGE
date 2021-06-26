import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { useFonts } from 'expo-font'
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani'
import AppLoading from 'expo-app-loading';

LogBox.ignoreLogs(['You are not currently signed in to Expo on your development machine.']);

import { AuthProvider } from './src/hooks/auth';
import { TranslateProvider } from './src/hooks/translate';

import { Background } from './src/components/Background';
import { Routes } from './src/routes';
import { COLLECTION_APPOINTMENTS, COLLECTION_USERS } from './src/configs/database';

export default function App(){
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  })

  if (!fontsLoaded){
    return <AppLoading />
  }

  return (
    <Background>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <TranslateProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </TranslateProvider>
    </Background>
  )
}