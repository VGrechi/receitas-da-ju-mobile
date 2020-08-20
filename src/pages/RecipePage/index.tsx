import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from "react-native";
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';
import { ItemValue } from '@react-native-community/picker/typings/Picker';
import { RectButton, ScrollView, BorderlessButton } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';


import { RecipeStackParamList } from '../../routes/RecipeStack';
import PageHeader from '../../components/PageHeader';
import { Recipe, SingleIngredient } from '../../models/models';

import { difficultyLabels, timeLabels } from '../../services/Constants';
import { saveRecipe, updateRecipe } from '../../services/RecipeService';
import { loadIngredientById, loadIngredients } from '../../services/IngredientService';

import styles from './styles';
import { colors } from '../../assets/themes/theme';
import CustomModal from '../../components/CustomModal';
import { AppLoading } from 'expo';

type RecipePageRouteProp = RouteProp<RecipeStackParamList, 'RecipePage'>;

type RecipePageProps = {
    route: RecipePageRouteProp;
}

export const RecipePage: React.FC<RecipePageProps> = ({ route }) => {

    const { navigate, goBack } = useNavigation();

    const [recipe, setRecipe] = useState(route.params.recipe);

    const [name, setName] = useState(route.params.recipe ? route.params.recipe.name : '');
    const [nameError, setNameError] = useState<string>();
    const [difficulty, setDifficulty] = useState(route.params.recipe ? route.params.recipe.difficulty : difficultyLabels[0].label);
    const [preparationTime, setPreparationTime] = useState(route.params.recipe ? route.params.recipe.preparationTime : timeLabels[0].label);

    const [allIngredients, setAllIngredients] = useState<SingleIngredient[]>([]);
    const [ingredients, setIngredients] = useState(route.params.recipe ? route.params.recipe.ingredients : []);
    const [ingredientId, setIngredientId] = useState(0);
    const [ingredientIdError, setIngredientIdError] = useState<string>();
    const [ingredientPercentage, setIngredientPercentage] = useState('');
    const [ingredientPercentageError, setIngredientPercentageError] = useState<string>();
    const [ingredientValue, setIngredientValue] = useState('');
    const [ingredientValueError, setIngredientValueError] = useState<string>();

    const [preparation, setPreparation] = useState(route.params.recipe ? route.params.recipe.preparation : '');

    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        loadIngredients().then(response => {
            setAllIngredients(response);
            if(response.length > 0) setIngredientId(response[0].id);
        });
    }, []);

    function handleShowModal() {
        setModalVisible(true);
    }

    function handleCloseModal() {
        setModalVisible(false);
    }

    async function handleSaveIngredient() {
        const index = ingredients.findIndex(i => i.single.id == ingredientId);
        if(index >= 0){
            setIngredientIdError('Ingrediente já cadastrado na receita!');
            return
        } else {
            setIngredientIdError(undefined);
        }

        if (!ingredientPercentage || ingredientPercentage === '') {
            setIngredientPercentageError('Proporção é um campo obrigatório!');
            return;
        } else {
            setIngredientPercentageError(undefined);
        }

        if (!ingredientValue || ingredientValue === '') {
            setIngredientValueError('Massa é um campo obrigatório!');
            return;
        } else {
            setIngredientValueError(undefined);
        }

        const singleIngredient = await loadIngredientById(ingredientId);
        const ingredient = {
            single: singleIngredient,
            percentage: (Number(ingredientPercentage) / 100),
            value: Number(ingredientValue)
        }
        ingredients.push(ingredient);
        setIngredients(ingredients);
        setModalVisible(false);
        setIngredientId(allIngredients[0].id);
        setIngredientPercentage('');
        setIngredientValue('');
    }

    function handleIngredientDeletion(index: number){
        setLoading(true);

        ingredients.splice(index, 1);
        setIngredients(ingredients);

        setLoading(false);
    }

    function handleCancelRecipe() {
        goBack();
    }

    async function handleSaveRecipe() {
        setLoading(true);

        if (!name || name === '') {
            setNameError('Nome é um campo obrigatório!');
            return;
        }

        const aux: Recipe = {
            id: recipe ? recipe.id : 0,
            name,
            difficulty,
            preparationTime,
            preparation,
            ingredients
        }
        if (recipe) {
            await updateRecipe(aux);
            navigate('CalculationPage', { recipeId: recipe ? recipe.id : undefined });
        } else {
            await saveRecipe(aux);
            navigate('RecipeList');
        }
    }

    if(loading){
        return <AppLoading  />
    }else{
        return (
            <View style={styles.container}>
                <PageHeader title={recipe ? recipe.name : 'Nova Receita'}
                    backDestination={route.params.originPage} />

                <ScrollView style={styles.scroll}
                    contentContainerStyle={{
                        paddingHorizontal: 8,
                        paddingBottom: 16
                    }}>
                    <View style={styles.generalContainer}>
                        <TextInput
                            style={[styles.input, (nameError ? styles.inputError : {})]}
                            placeholder={'Nome'}
                            value={name}
                            onChangeText={text => setName(text)} />
                        {nameError &&
                            <Text style={styles.inputLabelError}>{nameError}</Text>
                        }

                        <View style={styles.classificationContainer}>

                            <Picker
                                style={[styles.select, { flex: 5 }]}
                                itemStyle={{ color: '#000' }}
                                selectedValue={difficulty}
                                onValueChange={(itemValue: ItemValue) => setDifficulty(itemValue.toString())}>
                                {difficultyLabels.map(d => {
                                    return <Picker.Item key={d.id} label={d.label} value={d.value} />
                                })}
                            </Picker>

                            <View style={{ flex: 1 }} />

                            <Picker
                                style={[styles.select, { flex: 5 }]}
                                selectedValue={preparationTime}
                                onValueChange={(itemValue: ItemValue) => setPreparationTime(itemValue.toString())}>
                                {timeLabels.map(t => {
                                    return <Picker.Item key={t.id} label={t.label} value={t.value} />
                                })}
                            </Picker>
                        </View>

                    </View>

                    <View style={styles.ingredientsContainer}>
                        {ingredients.map((i, index) => {
                            return (
                                <View key={i.single.id} style={styles.ingredientBlock}>
                                    <Text style={styles.textPercentage}>{`${i.percentage * 100}%`}</Text>
                                    <Text style={styles.textValue}>{`${i.value} g`}</Text>
                                    <Text style={styles.textName} numberOfLines={1}>{i.single.name}</Text>
                                    <BorderlessButton onPress={() => handleIngredientDeletion(index)} style={styles.listItemIcon}>
                                        <AntDesign name="delete" size={14} color={colors.colorPrimaryDark} />
                                    </BorderlessButton>
                                </View>
                            )
                        })}
                        <RectButton onPress={handleShowModal} style={styles.buttonPrimary}>
                            <Text style={styles.buttonPrimaryText}>NOVO INGREDIENTE</Text>
                        </RectButton>
                    </View>

                    <View style={styles.preparationContainer}>
                        <TextInput style={[styles.input, styles.inputPreparation]}
                            placeholder={'Modo de Preparo'}
                            value={preparation}
                            onChangeText={text => setPreparation(text)}
                            multiline={true} />
                    </View>

                    <View style={styles.buttonsContainer}>
                        <RectButton onPress={handleCancelRecipe} style={styles.buttonSecondary}>
                            <Text style={styles.buttonSecondaryText}>CANCELAR</Text>
                        </RectButton>

                        <RectButton onPress={handleSaveRecipe} style={styles.buttonSecondary}>
                            <Text style={styles.buttonSecondaryText}>SALVAR</Text>
                        </RectButton>
                    </View>
                </ScrollView>

                {modalVisible &&
                    <CustomModal isVisible={modalVisible}
                        title="Adicionar Ingrediente"
                        cancelCallback={handleCloseModal}
                        confirmCallback={handleSaveIngredient}
                        cancelText="CANCELAR"
                        confirmText="ADICIONAR">

                        <View style={styles.modalNameContainer}>
                            <Picker
                                style={[styles.select, (ingredientIdError ? styles.inputError : {})]}
                                selectedValue={ingredientId}
                                onValueChange={(itemValue: ItemValue) => setIngredientId(Number(itemValue.toString()))}>
                                {allIngredients.map(i => {
                                    return <Picker.Item key={i.id} label={i.name} value={i.id} />
                                })}
                            </Picker>
                        </View>

                        <View>
                        {ingredientIdError &&
                                <Text style={styles.inputLabelError}>{ingredientIdError}</Text>
                            }
                        </View>

                        <View style={[styles.modalValuesContainer, {  }]}>
                            <TextInput style={[styles.input, (ingredientPercentageError ? styles.inputError : {}), { flex: 5 }]}
                                placeholder={'Proporção %'}
                                keyboardType={'numeric'}
                                value={ingredientPercentage}
                                onChangeText={text => setIngredientPercentage(text)} />

                            <View style={{ flex: 1 }} />

                            <TextInput style={[styles.input, (ingredientValueError ? styles.inputError : {}), { flex: 5 }]}
                                placeholder={'Massa em gramas'}
                                keyboardType={'numeric'}
                                value={ingredientValue}
                                onChangeText={text => setIngredientValue(text)} />

                        </View>
                        <View>
                            {ingredientPercentageError &&
                                <Text style={styles.inputLabelError}>{ingredientPercentageError}</Text>
                            }

                            {ingredientValueError &&
                                <Text style={styles.inputLabelError}>{ingredientValueError}</Text>
                            }
                        </View>

                    </CustomModal>
                }


            </View>
        )
    }
}

export default RecipePage;