import React from 'react';
import { 
  TouchableOpacity, 
  TouchableOpacityProps, 
  Text, 
  View 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import { LanguageIcon } from '../LanguageIcon';

export type LanguageProps = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
}

type Props = TouchableOpacityProps & {
  data: LanguageProps;
}

export function Language({data, ...rest}: Props){
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      {...rest}
    >
        <LanguageIcon LanguageId={data.id} iconId={data.icon} />

        <View style={styles.content}>
          <View>
            <Text style={styles.title}>
              {data.name}
            </Text>
          </View>
        </View>

        <Feather 
          name="chevron-right"
          color={theme.colors.heading}
          size={24}        
        />
    </TouchableOpacity>
  );
}