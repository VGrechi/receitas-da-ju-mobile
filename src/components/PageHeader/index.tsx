import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';
import { colors } from '../../assets/themes/theme';

interface PageHeaderProps {
    title: string;
    backDestination?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({title, backDestination}) => {

    const navigation = useNavigation();

    function handleGoBack(){
        if(backDestination){
            navigation.navigate(backDestination);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                { backDestination &&
                    <BorderlessButton onPress={handleGoBack}>
                        <Ionicons name="md-arrow-back" size={24} color={colors.textInPrimary} />
                    </BorderlessButton> 
                }
                <Text style={styles.title}>{title}</Text>

                
            </View>
        </View>
    );
}

export default PageHeader;