import { Recipe } from "../models/models";
import { AsyncStorage } from "react-native";

export async function loadRecipes(): Promise<Recipe[]>{
    const response = await AsyncStorage.getItem('recipes');
    let recipes: Recipe[] = [];
    if(response) recipes = JSON.parse(response);

    recipes.sort((a, b) => (a.name > b.name) ? 1 : -1);
    return Promise.resolve(recipes);
}

export async function loadRecipeById(recipeId: number): Promise<Recipe>{
    const response = await AsyncStorage.getItem('recipes');
    let recipes: Recipe[] = [];
    if(response) recipes = JSON.parse(response);

    recipes = recipes.filter(r => r.id === recipeId);
    return Promise.resolve(recipes[0]);
}

export async function saveRecipe(recipe: any): Promise<void> {
    const response = await AsyncStorage.getItem('recipes');
    let recipes: Recipe[] = [];
    if(response) recipes = JSON.parse(response);

    const index = recipes.findIndex(r => r.name === recipe.name);
    if(index >= 0){
        return Promise.reject();
    }

    recipes.sort((a, b) => (a.id < b.id) ? 1 : -1);
    const nextId = (recipes.length == 0) ? 1 : (recipes[0].id + 1);
    recipes.push({ ...recipe, id: nextId });
    await AsyncStorage.setItem('recipes', JSON.stringify(recipes));
    return Promise.resolve();
}

export async function updateRecipe(recipe: Recipe): Promise<void> {
    const response = await AsyncStorage.getItem('recipes');
    let recipes: Recipe[] = [];
    if(response) recipes = JSON.parse(response);

    const index = recipes.findIndex(r => r.id === recipe.id);
    recipes.splice(index, 1);
    recipes.push(recipe);

    await AsyncStorage.setItem('recipes', JSON.stringify(recipes));
    return Promise.resolve();
}

export async function deleteRecipe(recipeId: number): Promise<void> {
    const response = await AsyncStorage.getItem('recipes');
    let recipes: Recipe[] = [];
    if(response) recipes = JSON.parse(response);

    const index = recipes.findIndex(r => r.id === recipeId);
    recipes.splice(index, 1);

    await AsyncStorage.setItem('recipes', JSON.stringify(recipes));
    return Promise.resolve();
}

export async function countRecipesByIngredient(ingredientId: number): Promise<number> {
    const response = await AsyncStorage.getItem('recipes');
    let recipes: Recipe[] = []; 
    if(response) recipes = JSON.parse(response);

    const filtered = recipes.filter(r => {
        return r.ingredients.find(i => i.single.id == ingredientId);
    });
    return Promise.resolve(filtered.length);
}