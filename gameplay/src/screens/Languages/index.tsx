import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, FlatList } from 'react-native';

import { Language, LanguageProps } from '../../components/Language';
import { Load } from '../../components/Load';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './styles';
import { api } from '../../services/api';

type Props = {
  handleLanguageSelect: (Language: LanguageProps) => void;
}

export function Languages({ handleLanguageSelect }: Props){
  const [Languages, setLanguages] = useState<LanguageProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchLanguages(){
    //const response = await api.get('/users/@me/Languages');

    //setLanguages(response.data);

    const listLanguages = [
      {
        id: 'en',
        name: 'Inglês',
        icon: 'image.png',
        owner: true
      },
      {
        id: 'pt',
        name: 'português',
        icon: 'image.png',
        owner: true
      }
    ];
    setLanguages(listLanguages);
    setLoading(false);
  }

  useEffect(() => {
    fetchLanguages();
  },[]);


  return (
    <View style={styles.container}>
      {
        loading ? <Load /> :
        <FlatList 
          data={Languages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Language 
              data={item} 
              onPress={() => handleLanguageSelect(item)}
            />
          )}    
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListDivider isCentered />}
          ListHeaderComponent={() => <ListDivider isCentered />}
          contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
          style={styles.languages}
        />
      }
    </View>
  );
}