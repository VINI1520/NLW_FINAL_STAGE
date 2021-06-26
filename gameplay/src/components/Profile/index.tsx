import React from 'react';
import { View, Text, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import { Avatar } from '../Avatar';
import { styles } from './styles';

import { runTranslate } from '../../hooks/translate'

export function Profile() {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  function handleSignOut() {
    Alert.alert('Logout', 'Deseja sair do GamePlay?',
    [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => signOut()
      }
    ])
  }

  function handleProfileMenu() {
    navigation.navigate('ProfileMenu');
  } 

  return (
    <View style={styles.container}>
    
      <RectButton onPress={handleProfileMenu}>
        <Avatar urlImage={user.avatar} />
      </RectButton>

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>
            {runTranslate('components.Profile.greeting')}
          </Text>
          
          <Text style={styles.username}>
            { user.firstName }
          </Text>
        </View>

        <Text style={styles.message}>
        {runTranslate('components.Profile.message')}
        </Text>
      </View>

    </View>
  )

}