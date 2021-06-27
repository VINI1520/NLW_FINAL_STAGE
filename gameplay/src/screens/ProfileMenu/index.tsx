import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { RectButton } from 'react-native-gesture-handler';
import { styles } from './styles';
import { View, Text } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Languages } from '../Languages';

import { runTranslate, getAtualLanguage, useTranslate } from '../../hooks/translate'

import { useAuth } from '../../hooks/auth';

export type LanguageProps = {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
  }

export function ProfileMenu() {
    const [openLanguagesModal, setOpenLanguagesModal] = useState(false);
    const [Language, setLanguage] = useState<LanguageProps>({} as LanguageProps);
    const {changeLanguage} = useTranslate();
    const { signOut } = useAuth();
    const navigation = useNavigation();

    function handleOpenLanguages(){
        setOpenLanguagesModal(true);
    }
    
    function handleCloseLanguages(){
        setOpenLanguagesModal(false);
    }
    
    function handleLanguageSelect(LanguageSelect: LanguageProps){
        setLanguage(LanguageSelect);
        setOpenLanguagesModal(false);
        changeLanguage(LanguageSelect.id);
    }

    function handleOpenLogout() {
        signOut();
        navigation.navigate('Home');
    }

    return (
        <Background> 
            <Header 
                title={runTranslate("screens.ProfileMenu.title")}
            />
            <View style={styles.container}>
                <View style={styles.form}>
                    <RectButton onPress={handleOpenLanguages}>
                        <View style={styles.select}>
                            {
                            <View style={styles.image} />
                            }

                            <View style={styles.selectBody}>
                            <Text style={styles.label}>
                                { 
                                getAtualLanguage() 
                                }
                            </Text>
                            </View>

                            <Feather 
                            name="chevron-right"
                            color={theme.colors.heading}
                            size={18}
                            />
                        </View>
                    </RectButton>
                </View>
            </View>
            <View style={styles.footer}>
                <Button 
                    title={runTranslate("screens.ProfileMenu.quit")} 
                    onPress={handleOpenLogout}
                    enabled
                />
            </View>
            <ModalView visible={openLanguagesModal} closeModal={handleCloseLanguages}>
                <Languages handleLanguageSelect={handleLanguageSelect}/>
            </ModalView>
        </Background>
    )
} 