import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from "react-native";
import { Picker } from '@react-native-community/picker';
import { ItemValue } from '@react-native-community/picker/typings/Picker';

import PageHeader from '../../components/PageHeader';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RecipeStackParamList } from '../../routes/RecipeStack';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import { difficultyLabels, timeLabels, proportionLabels } from '../../services/Constants';

import styles from './styles';
import { saveRecipe, updateRecipe } from '../../services/RecipeService';
import { Recipe } from '../../models/models';

type RecipePageRouteProp = RouteProp<RecipeStackParamList, 'RecipePage'>;

type RecipePageProps = {
    route: RecipePageRouteProp;
}

interface IngredientInput {
    percentage: string;
    name: string;
    value: string;
}

export const RecipePage: React.FC<RecipePageProps> = ({ route }) => {

    const { goBack } = useNavigation();

    const [recipe, setRecipe] = useState(route.params.recipe);
    const [name, setName] = useState(route.params.recipe ? route.params.recipe.name : '');
    const [difficulty, setDifficulty] = useState(route.params.recipe ? route.params.recipe.difficulty : difficultyLabels[0].label);
    const [preparationTime, setPreparationTime] = useState(route.params.recipe ? route.params.recipe.preparationTime : timeLabels[0].label);
    const [ingredients, setIngredients] = useState<IngredientInput[]>([]);
    const [preparation, setPreparation] = useState(route.params.recipe ? route.params.recipe.preparation : '');

    useEffect(() => {
        if (!recipe) {
            setIngredients([{ percentage: '1', name: '', value: '' }])
        }
    }, [])


    function handleIngredientInput(index: number, field: string, value: string) {
        ingredients[index] = { ...ingredients[index], [field]: value };
        setIngredients(ingredients);
    }

    function addNewIngredient() {
        ingredients.push({ percentage: '0', name: '', value: '' })
        setIngredients(ingredients);
        console.log('new Ingrediente', ingredients)
    }

    function handleCancel() {
        goBack();
    }

    async function handleSave() {
        const aux: Recipe = {
            id: recipe ? recipe.id : 0,
            name,
            difficulty,
            preparationTime,
            preparation,
            ingredients: []
        }
        if(recipe){
            await updateRecipe(aux);
        }else{
            await saveRecipe(aux);
        }
        goBack();
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
                            selectedValue={difficulty}
                            style={styles.input}
                            onValueChange={(itemValue: ItemValue) => setDifficulty(itemValue.toString())}>
                            {difficultyLabels.map(d => <Picker.Item key={d.id} label={d.label} value={d.value} />)}
                        </Picker>

                        <Picker
                            selectedValue={preparationTime}
                            style={styles.input}
                            onValueChange={(itemValue: ItemValue) => setPreparationTime(itemValue.toString())}>
                            {timeLabels.map(t => <Picker.Item key={t.id} label={t.label} value={t.value} />)}
                        </Picker>
                    </View>

                </View>

                {/* <View style={styles.ingredientsContainer}>
                    {ingredients.map((i, index) => {
                        return (
                            <View key={new Date().toTimeString()} style={styles.ingredientBlock}>
                                <Picker
                                    selectedValue={i.percentage}
                                    style={styles.input}
                                    onValueChange={(itemValue: ItemValue) => handleIngredientInput(index, 'percentage', itemValue.toString())}>
                                    {proportionLabels().map(p => <Picker.Item key={p.id} label={p.label} value={p.value} />)}
                                </Picker>

                                <TextInput style={[styles.input, styles.inputPercentage]}
                                    placeholder={'Ingrediente'}
                                    value={i.name}
                                    onChangeText={text => handleIngredientInput(index, 'name', text)} />

                                <TextInput style={[styles.input, styles.inputPercentage]}
                                    placeholder={'Massa'}
                                    value={i.value}
                                    onChangeText={text => handleIngredientInput(index, 'value', text)} keyboardType={'numeric'} />
                            </View>
                        )
                    })}
                    <RectButton onPress={addNewIngredient} style={styles.buttonNewIngredient}>
                        <Text style={styles.buttonNewIngredientText}>NOVO INGREDIENTE</Text>
                    </RectButton>
                </View> */}

                <View style={styles.preparationContainer}>
                    <TextInput style={[styles.input, styles.inputPreparation]}
                        placeholder={'Modo de Preparo'}
                        value={preparation}
                        onChangeText={text => setPreparation(text)}
                        multiline={true} />
                </View>

                <View style={styles.buttonsContainer}>
                    <RectButton onPress={handleCancel} style={styles.button}>
                        <Text style={styles.buttonText}>CANCELAR</Text>
                    </RectButton>

                    <RectButton onPress={handleSave} style={styles.button}>
                        <Text style={styles.buttonText}>SALVAR</Text>
                    </RectButton>
                </View>
            </ScrollView>


        </View>
    )
}

export default RecipePage;