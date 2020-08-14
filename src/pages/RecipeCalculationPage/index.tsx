import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { AppLoading } from 'expo';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { RecipeStackParamList } from '../../routes/RecipeStack';
import PageHeader from '../../components/PageHeader';
import CalculatorItem from '../../components/CalculatorItem';

import styles from './styles';
import { Recipe } from '../../models/models';
import { RectButton } from 'react-native-gesture-handler';

type RecipeCalculationPageRouteProp = RouteProp<RecipeStackParamList, 'RecipeCalculationPage'>; 

type RecipeCalculationPageProps = {
    route: RecipeCalculationPageRouteProp;
}

export const RecipeCalculationPage: React.FC<RecipeCalculationPageProps> = ({ route }) => {

    const { navigate } = useNavigation();

    const [recipe, setRecipe] = useState<Recipe>(route.params.recipe);
    const [loading, setLoading] = useState(false);

    function handleCalculation(field: string, value: number){
        setLoading(true);

        let ingredients = recipe.ingredients || [];
        recipe.ingredients = [];

        const index = ingredients.findIndex(i => i.single.name == field);
        const ingredient = ingredients[index] || {};

        ingredient['value'] = Number(Number(value).toPrecision(3));

        ingredients.forEach((i, indexArray) => {
            if(ingredient){
                if(indexArray == index){
                    recipe.ingredients.push(ingredient);
                }else{
                    i['value'] = (ingredient.value * i.percentage) / ingredient.percentage;
                    recipe.ingredients.push(i);
                }
            }
        });
        
        setRecipe(recipe);
        setTimeout(() => setLoading(false), 1000); 
    }

    function handleDeleteButton(){
        //Show MOdal
    }

    function handleEditButton(){
        navigate('RecipePage', { editMode: true, recipe });
    }

    if(loading){
        return <AppLoading  />
    }else{
        return (
            <View>
                <PageHeader title={recipe.name} backDestination="RecipeList"/>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={{
                            paddingHorizontal: 8,
                            paddingBottom: 16
                        }}>
                            {recipe.ingredients.map(i => {
                                return (
                                    <CalculatorItem
                                        key={i.single.id}
                                        label={i.single.name}
                                        value={i.value}
                                        percentage={i.percentage}
                                        callback={handleCalculation} />
                                )
                            })}
                    </ScrollView>

                    <View style={styles.buttonsContainer}>
                        <RectButton onPress={handleDeleteButton} style={styles.button}>
                            <Text style={styles.buttonText}>DELETAR RECEITA</Text>
                        </RectButton>

                        <RectButton onPress={handleEditButton} style={styles.button}>
                            <Text style={styles.buttonText}>EDITAR RECEITA</Text>
                        </RectButton>
                    </View>
                </View>
            </View>
        );
    }

    /* 
    VISUALIZAÇÂO
    Ingredient                                      Calculate

    ----
    Calcula e mostra as quantidades

    Ingredient                              100g    Calculate
    */

    /* 
    EDIÇÂO
    Ingedient   % em relação ao peso da farinha     Edit
    
    */

    {/* <CalculatorItem 
                            key={`${i.id}-${i.value}`}
                            label={i.name} 
                            porcentage={i.percentage} 
                            value={i.value}
                            onC={text => handleChangeText(text)}
                            callback={handleCalculation} /> */}
}

export default RecipeCalculationPage;