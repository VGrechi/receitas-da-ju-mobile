import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { Feather, Ionicons } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';

import { loadIngredients, saveIngredient, updateIngredient } from '../../services/IngredientService';

import { SingleIngredient } from '../../models/models';

import styles from './styles';
import { colors } from '../../assets/themes/theme';

export default function IngredientList() {

    const [ingredients, setIngredients] = useState<SingleIngredient[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
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
    }

    function handleShowModalForEdit(ingredient: SingleIngredient){
        setIngredient(ingredient);
        setInputValue(ingredient.name);
        setModalVisible(true);
    }

    async function save() {
        if(ingredient){
            await updateIngredient({ ...ingredient, name: inputValue });
        }else{
            await saveIngredient(inputValue);
        }
        loadIngredients().then(ingredients => {
            setIngredients(ingredients);
            setIngredient(undefined);
            setInputValue('');
            setModalVisible(false);
        });
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
                    <Ionicons name="ios-add" style={styles.fabButtonIcon} />
                </TouchableOpacity>
            </View>

            {modalVisible &&
                <Modal isVisible={modalVisible} onBackButtonPress={handleHideModal} coverScreen={true}>
                    <View style={styles.modal}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Novo Ingrediente</Text>
                        </View>

                        <View style={styles.content}>
                            <TextInput
                                style={styles.input}
                                placeholder="Ingrediente"
                                value={inputValue}
                                onChangeText={text => setInputValue(text)} />
                        </View>

                        <View style={styles.footer}>
                            <View style={styles.button}>
                                <TouchableOpacity onPress={handleHideModal}>
                                    <Text style={styles.buttonText}>CANCELAR</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.button}>
                                <TouchableOpacity onPress={save}>
                                    <Text style={styles.buttonText}>SALVAR</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            }

        </View>
    );
}