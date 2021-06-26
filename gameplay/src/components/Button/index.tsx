import React from 'react';
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

type Props = RectButtonProps & {
  title: string;
  enabled?: boolean
}

export function Button({ title, enabled, ...rest } : Props){
  return(
    <RectButton enabled
      style={[
        styles.container, 
        { backgroundColor: enabled ? theme.colors.primary : theme.colors.disable }]
      } 
      {...rest }
    >
      <Text style={styles.title}>
        { title }
      </Text>
    </RectButton>
  );
}