import React, { useState, useEffect } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

import {
  ImageBackground,
  Text,
  View,
  Alert,
  FlatList,
  Share,
  Platform
} from 'react-native';

import BannerImg from '../../assets/banner.png';

import { theme } from '../../global/styles/theme';
import { api } from '../../services/api';
import { styles } from './styles';

import { AppointmentProps } from '../../components/Appointment';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { Load } from '../../components/Load';

import { runTranslate } from '../../hooks/translate'

type Params = {
  guildSelected: AppointmentProps
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function AppointmentDetails() {
  const [showwidget, setShowwidget] = useState(true);
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { guildSelected } = route.params as Params;

  const labelListHeaderTitle = runTranslate("screens.AppointmentDetails.ListHeader.title")
  const labelListHeadersubtitle = runTranslate("screens.AppointmentDetails.ListHeader.subtitle")
  const labelmessagewidget = runTranslate("screens.AppointmentDetails.messagewidget")
  const labelmessagenoplayeronline = runTranslate("screens.AppointmentDetails.messagenoplayeronline")

  async function fetchGuildWidget() {
    try {
      //const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      await api.get(`/guilds/${guildSelected.guild.id}/widget.json`)
        .then((res) => {
          const response = res;
          setWidget(response.data);
          setShowwidget(true);
        })
        .catch(() => {
          setShowwidget(false);
        })
    } catch {
      /* 
        UPDATE 5# 
        Observa????o: Al??m de ativar o widget do servidor, escolha um canal pra convite pois por padr??o 
        estava como sem canal e, dessa forma, o instant_invite pode vir como null mesmo para o servidor. 
        Setando um canal qualquer e resetando a aplica????o resolve o problema do instant_invite ir como null.
      */
      Alert.alert('Verifique as configura????es do servidor. Ser?? que o Widget est?? habilitado?');
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {
    const message = Platform.OS === 'ios'
      ? `Junte-se a ${guildSelected.guild.name}`
      : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite
    });
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);
  return (
    <Background>
      <Header
        title={runTranslate("screens.AppointmentDetails.Header.title")}
        action={
          guildSelected.guild.owner &&
          <BorderlessButton onPress={handleShareInvitation}>
            <Fontisto
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }
      />

      <ImageBackground
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            {guildSelected.guild.name}
          </Text>

          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>

      {
        loading ? <Load /> :
        showwidget ?
          <>
            <ListHeader
              title={labelListHeaderTitle}
              subtitle={`${labelListHeadersubtitle} ${widget.members.length ? widget.members.length : 0}`}
            />
            {
              <FlatList
                data={widget.members ? widget.members : []} // UPDATE 1# Bom cuidar aqui, caso n??o encontre um Widget automaticamente n??o haver?? membros.
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <Member data={item} />
                )}
                ItemSeparatorComponent={() => <ListDivider isCentered />}
                style={styles.members}
                ListEmptyComponent={() => ( // UPDATE 2#  Um propriedade para renderizar algo quando a lista e v??zia.
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      {labelmessagenoplayeronline}
                    </Text>
                  </View>
                )}
              />
            }
          </>
          :
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {labelmessagewidget}
            </Text>
          </View>
      }

      {
        guildSelected.guild.owner &&
        <View style={styles.footer}>
          <ButtonIcon
            title="Entrar na partida"
            onPress={handleOpenGuild}
          />
        </View>
      }
    </Background>
  );
}