export interface Recipe {
    id: number;
    name: string;
    ingredients: Ingredient[];
    preparationTime: string;
    difficulty: string;
    preparation: string;
}

export interface Ingredient {
    single: SingleIngredient;
    percentage: number;
    value: number;
}

export interface SingleIngredient {
    id: number;
    name: string;
}