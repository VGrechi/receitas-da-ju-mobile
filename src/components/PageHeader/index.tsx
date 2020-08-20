import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './styles';
import { colors } from '../../assets/themes/theme';
import { saveBackUp } from '../../services/BackUpService';

interface PageHeaderProps {
    title: string;
    backDestination?: string;
    backUpOption?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, backDestination, backUpOption }) => {

    const navigation = useNavigation();

    function handleGoBack() {
        if (backDestination) {
            navigation.navigate(backDestination);
        }
    }

    function handleBackUP() {
        console.log('backup')
        saveBackUp();
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                {backDestination &&
                    <BorderlessButton onPress={handleGoBack}>
                        <Ionicons name="md-arrow-back" size={24} color={colors.textInPrimary} />
                    </BorderlessButton>
                }

                <Text style={styles.title}>{title}</Text>

                {backUpOption &&
                    <View style={styles.iconsContainer}>

                        <BorderlessButton onPress={handleBackUP} style={{ marginRight: 10 }}>
                            <MaterialCommunityIcons name="file-restore" size={24} color={colors.textInPrimary} />
                        </BorderlessButton>

                        <BorderlessButton onPress={handleBackUP}>
                            <MaterialIcons name="backup" size={24} color={colors.textInPrimary} />
                        </BorderlessButton>

                    </View>
                }


            </View>
        </View>
    );
}

export default PageHeader;