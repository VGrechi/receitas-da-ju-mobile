import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './styles';
import { colors } from '../../assets/themes/theme';

interface CalculatorItemProps {
    label: string,
    percentage: number,
    value: number,
    callback: Function
}

export const CalculatorItem: React.FC<CalculatorItemProps> = (props) => {

    const [value, setValue] = useState(props.value.toString());

    function handleClick(){
        props.callback(props.label, value);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <View style={styles.inputBlock}>
                <Text style={styles.porcentageLabel}>{`${props.percentage * 100}%`}</Text>
                <TextInput
                    style={styles.input}
                    keyboardType={'numeric'}
                    value={value}
                    onChangeText={text => setValue(text)}
                />
                <Text>{' g'}</Text>
                <BorderlessButton onPress={handleClick} style={styles.calculateButton}>
                    <MaterialCommunityIcons name="calculator-variant" size={24} color={colors.colorPrimaryDark} />
                </BorderlessButton>
            </View>
        </View>
    )
}

export default CalculatorItem;