import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { Recipe, Ingredients } from '../../models/models';

import styles from './styles';
import { colors } from '../../assets/themes/theme';

interface RecipeItemProps {
    recipe: Recipe;
}

const RecipeItem: React.FC<RecipeItemProps> = ({recipe}) => {

    const { navigate } = useNavigation();

    function generateIngredientsInline(ingredients: Ingredients[]): string{
        let inline: string = '';
        ingredients.map((i, index) => {
            if(index == 0){
                inline += i.single.name;
            }else{
                inline += `, ${i.single.name}`
            }
        });
        return inline;
    }

    function handleRecipeCalculationPageNavigation(){
        navigate('RecipeCalculationPage', { recipe });
    }

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{recipe.name}</Text>
                <Text style={styles.ingredients} numberOfLines={1}>{generateIngredientsInline(recipe.ingredients)}</Text>
                
                <View style={styles.labelsContainer}>
                    <View style={styles.primaryLabel}>
                        <Text style={styles.labelText}>{recipe.difficulty}</Text>
                    </View>

                    <View style={styles.secondaryLabel}>
                        <Text style={styles.labelText}>{recipe.preparationTime}</Text>
                    </View>
                </View>
            </View>
            <BorderlessButton onPress={handleRecipeCalculationPageNavigation} style={styles.options}>
                <FontAwesome name="ellipsis-v" size={20} color={colors.textInSecondary} />
            </BorderlessButton>
        </View>
    );
}

export default RecipeItem;