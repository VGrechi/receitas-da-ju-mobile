import { StyleSheet, ColorPropType } from 'react-native';
import { colors } from '../../assets/themes/theme';

import globalStyles from '../../assets/styles/global';

const styles = StyleSheet.create({
    ...globalStyles,

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
    classificationSelect: {
        flex: 5,
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textPercentage: {
        flex: 1,
    },
    textName: {
        flex: 2,
    },
    textValue: {
        flex: 1,
    },
    preparationContainer: {
        minHeight: 124,
        backgroundColor: colors.colorCard,
        padding: 8,
        borderRadius: 8,
        marginBottom: 8
    },
    inputPreparation: {
        minHeight: 100
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    modalNameContainer: {
        flex: 1,
        padding: 8,
        width: '100%'
    },
    modalValuesContainer: {
        flex: 1,
        padding: 8,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})

export default styles;