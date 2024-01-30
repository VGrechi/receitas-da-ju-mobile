import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

import RecipeList from '../pages/RecipeList';
import IngredientList from '../pages/IngredientList';
import RecipeStack from './RecipeStack';
import { colors, fonts } from '../assets/themes/theme';

const { Navigator, Screen } = createBottomTabNavigator();

export default function AppTabs() {
    return (
      <NavigationContainer>
        <Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Screen 
            name="RecipeStack" 
            component={RecipeStack}
            options={{
              tabBarLabel: 'Receitas',
              tabBarIcon: ({ color, size, focused }) => 
                <MaterialIcons name="restaurant"  size={size} color={focused ? colors.colorPrimary : color} />
            }} 
          />

          <Screen 
            name="IngredientList" 
            component={IngredientList}
            options={{
              tabBarLabel: 'Ingredientes',
              tabBarIcon: ({ color, size, focused }) =>
                <SimpleLineIcons name="cup" size={size} color={focused ? colors.colorPrimary : color} />
            }} 
          />
        </Navigator>
      </NavigationContainer>
    ); 
}