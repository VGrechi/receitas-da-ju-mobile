import { StyleSheet, ColorPropType } from 'react-native';
import { colors } from '../../assets/themes/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.colorBackground
    },
    scroll: {
        marginTop: -10,
    },
    generalContainer: {
        backgroundColor: colors.colorCard,
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
        justifyContent: 'center'
    },
    classificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
    },
    input: {
        height: 34,
        marginVertical: 4,
        backgroundColor: colors.colorInactive,
        borderRadius: 8,
        justifyContent: "center",
        textAlign: 'center',
        color: colors.colorBase
    },
    ingredientsContainer: {
        backgroundColor: colors.colorCard,
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ingredientBlock: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 4,
        marginBottom: 4,
        borderColor: colors.colorPrimaryDark,
        borderLeftColor: colors.colorPrimaryDark,
        borderWidth: 1,
        borderRadius: 8,
    },
    inputPercentage: {
        flex: 1,
    },
    inputName: {
        flex: 2,
    },
    inputValue: {
        flex: 1,
    },
    buttonNewIngredient: {
        padding: 8,
        width: '48%',
        backgroundColor: colors.colorPrimary,
        borderColor: colors.colorPrimary,
        borderWidth: 2,
    },
    buttonNewIngredientText: {
        color: colors.textInPrimary,
        textAlign: 'center'
    },
    preparationContainer: {
        backgroundColor: colors.colorCard,
        padding: 8,
        borderRadius: 8,
        marginBottom: 8
    },
    inputPreparation: {
        minHeight: 100
    },
    buttonsContainer: {
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        padding: 8,
        width: '48%',
        backgroundColor: colors.colorSecondary,
        borderWidth: 2,
        borderColor: colors.colorPrimary,
    },
    buttonText: {
        color: colors.textInSecondary,
        textAlign: 'center'
    },
})

export default styles;