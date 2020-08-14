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
            <Navigator tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 64,
                },
                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: 20,
                },
                labelStyle: {
                    fontFamily: fonts.archivoBold,
                    fontSize: 13,
                    marginLeft: 16
                },
                inactiveBackgroundColor: colors.colorCard,
                activeBackgroundColor: colors.colorCard,
                inactiveTintColor: colors.colorInactive,
                activeTintColor: colors.colorPrimary
            }}>

            <Screen 
                name="RecipeStack" 
                component={RecipeStack}
                options={{
                    tabBarLabel: 'Receitas',
                    tabBarIcon: ({ color, size, focused }) => {
                        return <MaterialIcons name="restaurant"  size={size} color={focused ? colors.colorPrimary : color} />
                    }
                }} />

            <Screen 
                name="IngredientList" 
                component={IngredientList}
                options={{
                    tabBarLabel: 'Ingredientes',
                    tabBarIcon: ({ color, size, focused }) => {
                        return <SimpleLineIcons name="cup" size={size} color={focused ? colors.colorPrimary : color} />
                    }
                }} />
               
            </Navigator>
        </NavigationContainer>
    ); 
}