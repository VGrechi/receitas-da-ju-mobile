import { StyleSheet } from 'react-native';
import { fonts, colors } from '../../assets/themes/theme';

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    ingredientContainer: {
        backgroundColor: colors.colorCard,
        borderRadius: 8,
        padding: 8,
        marginBottom: 8
    },
    label: {
        fontFamily: fonts.poppinsRegular
    },
    inputBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.colorPrimary
    },
    porcentageLabel: {
        flex: 1,
        fontFamily: fonts.archivoBold,
        fontSize: 14,
        lineHeight: 20
    },
    input: {
        flex: 5,
        height: 34,
        backgroundColor: colors.colorInactive,
        borderRadius: 8,
        justifyContent: "center",
        color: colors.colorPrimary
    },
    calculateButton: {
        flex: 1,
        alignItems: "center"
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
        borderWidth: 5,
        borderColor: colors.colorPrimary,
    },
    buttonText: {
        color: colors.textInSecondary,
        textAlign: 'center'
    },
})

export default styles;