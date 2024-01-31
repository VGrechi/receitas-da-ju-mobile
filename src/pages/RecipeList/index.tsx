import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ScrollView, TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';
import RecipeItem from '../../components/RecipeItem';

import { loadRecipes } from '../../services/RecipeService';
import { Recipe } from '../../models/models';

import styles from './styles';

export default function RecipeList() {

    const { navigate } = useNavigation();

    const [ recipeList, setRecipeList ] = useState<Recipe[]>([])

    useFocusEffect(() => {
        loadRecipes().then(recipes => {
            setRecipeList(recipes);
        });
    })

    function handleRecipePageNavigation(editMode: boolean, recipe?: Recipe){
        navigate('RecipePage', { originPage: 'RecipeList', editMode, recipe });
    }

    return (
        <View style={styles.container}>
            <PageHeader title="Receitas" backUpOption />
            
            <ScrollView style={styles.listContainer}
                contentContainerStyle={{
                    paddingHorizontal: 8,
                    paddingBottom: 16
                }}>
                {recipeList.map((recipe: Recipe) => {
                    return <RecipeItem key={recipe.id} recipe={recipe} />
                })}
            </ScrollView>

            <View style={styles.fabButtonContainer}>
                <TouchableOpacity onPress={() => handleRecipePageNavigation(true)} style={styles.fabButton}>
                    <Ionicons name="add" style={styles.fabButtonIcon}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}