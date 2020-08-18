import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { AppLoading } from 'expo';
import { RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import { RecipeStackParamList } from '../../routes/RecipeStack';
import PageHeader from '../../components/PageHeader';
import CalculatorItem from '../../components/CalculatorItem';
import CustomModal from '../../components/CustomModal';

import styles from './styles';
import { Recipe } from '../../models/models';
import { deleteRecipe, loadRecipeById } from '../../services/RecipeService';

type CalculationPageRouteProp = RouteProp<RecipeStackParamList, 'CalculationPage'>; 

type CalculationPageProps = {
    route: CalculationPageRouteProp;
}

export const CalculationPage: React.FC<CalculationPageProps> = ({ route }) => {

    const { navigate, goBack } = useNavigation();

    const [recipe, setRecipe] = useState<Recipe>();
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useFocusEffect(() => {
        loadRecipeById(route.params.recipe.id).then((response) => setRecipe(response));
    });

    function handleCalculation(field: string, value: number){
        setLoading(true);

        if(recipe){
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
        }
        
        setRecipe(recipe);
        setTimeout(() => setLoading(false), 1000); 
    }

    function handleRecipeDeletion(){
        deleteRecipe(recipe.id).then(() => goBack());
    }

    function handleDeleteButton(){
        setModalVisible(true);
    }

    function handleEditButton(){
        navigate('RecipePage', { originPage: 'CalculationPage', editMode: true, recipe });
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
                            {recipe.ingredients && recipe.ingredients.map(i => {
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

                {modalVisible &&
                    <CustomModal 
                        isVisible={modalVisible}
                        title={'Atenção!'}
                        cancelText={'Não'}
                        cancelCallback={() => setModalVisible(false)}
                        confirmText={'Sim'}
                        confirmCallback={handleRecipeDeletion}
                        children={(
                            <Text>Deseja realmente excluir a receita?</Text>
                        )}/>
                }
            </View>
        );
    }

}

export default CalculationPage;