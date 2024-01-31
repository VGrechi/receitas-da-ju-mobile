import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import { Feather, Ionicons } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';

import { loadIngredients, saveIngredient, updateIngredient } from '../../services/IngredientService';

import { SingleIngredient } from '../../models/models';

import styles from './styles';
import { colors } from '../../assets/themes/theme';
import CustomModal from '../../components/CustomModal';
import CustomInput from '../../components/CustomInput';

export default function IngredientList() {

    const [ingredients, setIngredients] = useState<SingleIngredient[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState();
    const [ingredient, setIngredient] = useState<SingleIngredient>();

    useEffect(() => {
        loadIngredients().then(ingredients => {
            setIngredients(ingredients);
        })
    });

    function handleShowModal() {
        setModalVisible(true);
    }

    function handleHideModal() {
        setIngredient(undefined);
        setInputValue('');
        setModalVisible(false);
        setInputError(undefined);
    }

    function handleShowModalForEdit(ingredient: SingleIngredient) {
        setIngredient(ingredient);
        setInputValue(ingredient.name);
        setModalVisible(true);
    }

    async function save() {
        try{
            let response = [];
            if (ingredient) {
                response = await updateIngredient({ ...ingredient, name: inputValue });
            } else {
                response = await saveIngredient(inputValue);
            }
            setModalVisible(false);
            setIngredients(response);
            setIngredient(undefined);
            setInputValue('');
            setInputError(undefined);
        } catch (err) {
            setInputError(err);
        }
    }

    return (
        <View style={styles.container}>
            <PageHeader title="Ingredientes" />

            <ScrollView style={styles.listContainer}
                contentContainerStyle={{
                    paddingHorizontal: 8,
                    paddingBottom: 16
                }}>
                {ingredients.map(ingredient => {
                    return (
                        <View style={styles.listItem} key={ingredient.id}>
                            <Text style={styles.listItemLabel}>{ingredient.name}</Text>
                            <BorderlessButton onPress={() => handleShowModalForEdit(ingredient)} style={styles.listItemIcon}>
                                <Feather name="edit" size={14} color={colors.colorPrimaryDark} />
                            </BorderlessButton>
                        </View>
                    )
                })}
            </ScrollView>


            <View style={styles.fabButtonContainer}>
                <TouchableOpacity onPress={handleShowModal} style={styles.fabButton}>
                    <Ionicons name="add" style={styles.fabButtonIcon} />
                </TouchableOpacity>
            </View>

            {modalVisible &&
                <CustomModal isVisible={modalVisible} 
                    title="Novo Ingrediente"
                    cancelCallback={handleHideModal} 
                    confirmCallback={save}
                    cancelText="CANCELAR"
                    confirmText="SALVAR">
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, (inputError ? styles.inputError : {})]}
                            placeholder="Ingrediente"
                            value={inputValue}
                            onChangeText={text => setInputValue(text)} />
                    </View>
                        {inputError && 
                            <Text style={styles.inputLabelError}>{inputError}</Text>
                        } 
                </CustomModal>
            }
            


        </View>
    );
}