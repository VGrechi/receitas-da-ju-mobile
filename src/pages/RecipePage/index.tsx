import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from "react-native";
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';
import { ItemValue } from '@react-native-community/picker/typings/Picker';
import { RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


import { RecipeStackParamList } from '../../routes/RecipeStack';
import PageHeader from '../../components/PageHeader';
import { Recipe, SingleIngredient } from '../../models/models';

import { difficultyLabels, timeLabels } from '../../services/Constants';
import { saveRecipe, updateRecipe } from '../../services/RecipeService';
import { loadIngredientById, saveIngredient, loadIngredients } from '../../services/IngredientService';

import styles from './styles';
import CustomModal from '../../components/CustomModal';

type RecipePageRouteProp = RouteProp<RecipeStackParamList, 'RecipePage'>;

type RecipePageProps = {
    route: RecipePageRouteProp;
}

export const RecipePage: React.FC<RecipePageProps> = ({ route }) => {

    const { navigate, goBack } = useNavigation();

    const [recipe, setRecipe] = useState(route.params.recipe);
    
    const [name, setName] = useState(route.params.recipe ? route.params.recipe.name : '');
    const [difficulty, setDifficulty] = useState(route.params.recipe ? route.params.recipe.difficulty : difficultyLabels[0].label);
    const [preparationTime, setPreparationTime] = useState(route.params.recipe ? route.params.recipe.preparationTime : timeLabels[0].label);
    
    const [ingredients, setIngredients] = useState(route.params.recipe ? route.params.recipe.ingredients : []);
    const [allIngredients, setAllIngredients] = useState<SingleIngredient[]>([]);
    const [ingredientPercentage, setIngredientPercentage] = useState('');
    const [ingredientId, setIngredientId] = useState(0);
    const [ingredientValue, setIngredientValue] = useState('');
    
    const [preparation, setPreparation] = useState(route.params.recipe ? route.params.recipe.preparation : '');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        loadIngredients().then(response => {
            setAllIngredients(response);
            setIngredientId(response[0].id);
        });
    }, []);

    function handleShowModal() {
        setModalVisible(true);
    }

    function handleCloseModal() {
        setModalVisible(false);
    }

    async function handleSaveIngredient() {
        console.log(ingredientId);
        const singleIngredient = await loadIngredientById(ingredientId);
        console.log(singleIngredient);
        const ingredient = {
            single: singleIngredient,
            percentage: (Number(ingredientPercentage) / 100),
            value: Number(ingredientValue)
        }
        console.log(ingredient);
        ingredients.push(ingredient);
        setIngredients(ingredients);
        setModalVisible(false);
    }    

    function handleCancelRecipe() {
        goBack();
    }

    async function handleSaveRecipe() {
        const aux: Recipe = {
            id: recipe ? recipe.id : 0,
            name,
            difficulty,
            preparationTime,
            preparation,
            ingredients
        }
        if(recipe){
            await updateRecipe(aux);
            navigate('CalculationPage', { recipeId: recipe ? recipe.id : undefined});
        }else{
            await saveRecipe(aux);
            navigate('RecipeList');
        }
    }

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
                    <TextInput style={styles.input}
                        placeholder={'Nome'}
                        value={name}
                        onChangeText={text => setName(text)} />

                    <View style={styles.classificationContainer}>
                        
                        <Picker
                            style={[styles.select, { flex: 5 }]}
                            itemStyle={{color: '#000'}}
                            selectedValue={difficulty}
                            onValueChange={(itemValue: ItemValue) => setDifficulty(itemValue.toString())}>
                            {difficultyLabels.map(d => {
                                return <Picker.Item key={d.id} label={d.label} value={d.value} />
                            })}
                        </Picker>
                    
                        <View style={{ flex: 1 }}/>

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
                    {ingredients.map(i => { 
                        return (
                            <View key={new Date().toTimeString()} style={styles.ingredientBlock}>
                                <Text style={styles.textPercentage}>{`${i.percentage * 100}%`}</Text>
                                <Text style={styles.textName}>{i.single.name}</Text>
                                <Text style={styles.textValue}>{`${i.value} g`}</Text>
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
                            style={[styles.select, { flex: 5 }]}
                            selectedValue={ingredientId}
                            onValueChange={(itemValue: ItemValue) => setIngredientId(Number(itemValue.toString()))}>
                            {allIngredients.map(i => {
                                return <Picker.Item key={i.id} label={i.name} value={i.id} />
                            })}
                        </Picker>
                        </View>

                        <View style={styles.modalValuesContainer}>
                            <TextInput style={[styles.input, { flex: 5 }]}
                                placeholder={'Proporção'}
                                keyboardType={'numeric'}
                                value={ingredientPercentage}
                                onChangeText={text => setIngredientPercentage(text)} />

                            <View style={{ flex: 1 }}/>

                            <TextInput style={[styles.input, { flex: 5 }]}
                                placeholder={'Massa'}
                                keyboardType={'numeric'}
                                value={ingredientValue}
                                onChangeText={text => setIngredientValue(text)} />
                        </View>
                    
                </CustomModal>
            }


        </View>
    )
}

export default RecipePage;