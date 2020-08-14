import { SingleIngredient } from "../models/models";

const ingredients: SingleIngredient[] = [
    {   id: 1, name: 'Farinha' },
    {   id: 2, name: 'Leite' },
    {   id: 3, name: 'Ovo' },
    {   id: 4, name: 'Açucar' },
]

export function loadIngredients(): Promise<SingleIngredient[]>{
    ingredients.sort((a, b) => (a.name > b.name) ? 1 : -1);
    return Promise.resolve(ingredients);
}

export function saveIngredient(ingredient: string): Promise<void>{
    const index = ingredients.findIndex(i => i.name === ingredient);
    if(index >= 0){
        return Promise.reject();
    }
    ingredients.sort((a, b) => (a.id < b.id) ? 1 : -1);
    ingredients.push({ id: (ingredients[0].id + 1), name: ingredient });
    return Promise.resolve();
}

export function updateIngredient(ingredient: SingleIngredient): Promise<void> {
    const index = ingredients.findIndex(i => i.id === ingredient.id);
    ingredients.splice(index, 1);
    ingredients.push(ingredient);
    return Promise.resolve();
}