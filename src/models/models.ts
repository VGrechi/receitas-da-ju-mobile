export interface Recipe {
    id: number;
    name: string;
    ingredients: Ingredients[];
    preparationTime: string;
    difficulty: string;
}

export interface Ingredients {
    single: SingleIngredient;
    percentage: number;
    value: number;
}

export interface SingleIngredient {
    id: number;
    name: string;
}