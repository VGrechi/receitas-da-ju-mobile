import { Recipe } from "../models/models";

const recipes: Recipe[] = [
    {
        id: 1,
        name: 'Pão',
        ingredients: [
            { 
                single: { id: 1, name: 'Farinha' },
                value: 100,
                percentage: 1
            },
            { 
                single: { id: 2, name: 'Água' },
                value: 60,
                percentage: 0.6
            },
            { 
                single: { id: 3, name: 'Sal' },
                value: 2,
                percentage: 0.02
            },
            { 
                single: { id: 4, name: 'Fermento' },
                value: 30,
                percentage: 0.3
            },
        ],
        preparationTime: 'Indeterminado',
        difficulty: 'Fácil'
    },
    {
        id: 2,
        name: 'Bolo de Cenoura',
        ingredients: [
            { 
                single: { id: 1, name: 'Farinha' },
                value: 100,
                percentage: 1
            },
            { 
                single: { id: 5, name: 'Cenoura' },
                value: 100,
                percentage: 1
            },
            { 
                single: { id: 6, name: 'Ovo' },
                value: 100,
                percentage: 1
            },
            { 
                single: { id: 7, name: 'Óleo' },
                value: 100,
                percentage: 1
            },
            { 
                single: { id: 8, name: 'Açucar' },
                value: 100,
                percentage: 1
            },
        ],
        preparationTime: '40 min',
        difficulty: 'Médio'
    },
]

export function loadRecipes(): Promise<Recipe[]>{
    return Promise.resolve(recipes);
}

export function saveRecipe(recipe: Recipe): Promise<void> {
    const index = recipes.findIndex(r => r.name === recipe.name);
    if(index >= 0){
        return Promise.reject();
    }
    recipes.sort((a, b) => (a.id < b.id) ? 1 : -1);
    recipes.push({ ...recipe, id: (recipes[0].id + 1)});
    return Promise.resolve();
}

export function countRecipesByIngredient(ingredientId: number): Promise<number> {
    const filtered = recipes.filter(r => {
        return r.ingredients.find(i => i.single.id == ingredientId);
    });
    return Promise.resolve(filtered.length);
}