import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RecipeList from '../pages/RecipeList';
import RecipeCalculationPage from '../pages/RecipeCalculationPage';
import RecipePage from '../pages/RecipePage';

import { Recipe } from '../models/models';

export type RecipeStackParamList = {
    RecipeList: undefined;
    RecipeCalculationPage: {
        recipe: Recipe;
    }
    RecipePage: {
        editMode: boolean;
        recipe: Recipe;
    }
}

const { Navigator, Screen } = createStackNavigator<RecipeStackParamList>();


export default function RecipeStack() {

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="RecipeList" component={RecipeList} />
            <Screen name="RecipePage" component={RecipePage} />
            <Screen name="RecipeCalculationPage" component={RecipeCalculationPage} />
        </Navigator>
    );
}