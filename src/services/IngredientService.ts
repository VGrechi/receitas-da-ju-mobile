import { AsyncStorage } from 'react-native';
import { SingleIngredient } from "../models/models";

export async function loadIngredients(): Promise<SingleIngredient[]>{
    const response = await AsyncStorage.getItem('ingredients');
    let ingredients: SingleIngredient[] = [];
    if(response) ingredients = JSON.parse(response);

    ingredients.sort((a, b) => (a.name > b.name) ? 1 : -1);
    return Promise.resolve(ingredients);
}

export async function loadIngredientById(ingredientId: number): Promise<SingleIngredient>{
    const response = await AsyncStorage.getItem('ingredients');
    let ingredients: SingleIngredient[] = [];
    if(response) ingredients = JSON.parse(response);

    ingredients = ingredients.filter(i => i.id === ingredientId);
    return Promise.resolve(ingredients[0]);
}

export async function saveIngredient(ingredient: string): Promise<SingleIngredient[]>{
    const response = await AsyncStorage.getItem('ingredients');
    let ingredients: SingleIngredient[] = [];
    if(response) ingredients = JSON.parse(response)

    const index = ingredients.findIndex(i => i.name === ingredient);
    if(index >= 0){
        return Promise.reject();
    }

    ingredients.sort((a, b) => (a.id < b.id) ? 1 : -1);
    const nextId = (ingredients.length == 0) ? 1 : (ingredients[0].id + 1);
    ingredients.push({ id: nextId, name: ingredient });
    await AsyncStorage.setItem('ingredients', JSON.stringify(ingredients));

    ingredients.sort((a, b) => (a.name > b.name) ? 1 : -1);
    return Promise.resolve(ingredients);
}

export async function updateIngredient(ingredient: SingleIngredient): Promise<SingleIngredient[]> {
    const response = await AsyncStorage.getItem('ingredients');
    let ingredients: SingleIngredient[] = [];
    if(response) ingredients = JSON.parse(response);
    
    const index = ingredients.findIndex(i => i.id === ingredient.id);
    ingredients.splice(index, 1);
    ingredients.push(ingredient);
    await AsyncStorage.setItem('ingredients', JSON.stringify(ingredients));

    ingredients.sort((a, b) => (a.name > b.name) ? 1 : -1);
    return Promise.resolve(ingredients);
}