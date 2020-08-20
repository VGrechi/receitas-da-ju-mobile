import React, { useState } from 'react';
import { Text, TextInput, View} from 'react-native';

import styles from './styles';
import { useLinkProps } from '@react-navigation/native';

interface CustomInputProps {
    placeholder: string;
    value: string;
    callback: Function;
    errorMessage: any;
}

export const CustomInput: React.FC<CustomInputProps> = (props) => {

    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState(undefined);

    function handleTextChange(text: string){
        props.callback(text);
    }

    return (
        <View>
            <TextInput
                style={[styles.input, (props.errorMessage ? styles.inputError : {})]}
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={text => handleTextChange(text)} />
                {props.errorMessage && 
                    <Text style={styles.inputLabelError}>{props.errorMessage}</Text>
                }
        </View>
    )
}

export default CustomInput;