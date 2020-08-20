import { StyleSheet, Button } from 'react-native';
import { colors, fonts } from '../../assets/themes/theme';

const globalStyles = StyleSheet.create({
    // DIV
    container: {
        flex: 1,
        backgroundColor: colors.colorBackground
    },

    // INPUT
    input: {
        width: '100%',
        height: 34,
        marginVertical: 4,
        backgroundColor: colors.colorInactive,
        borderRadius: 8,
        justifyContent: "center",
        textAlign: 'center',
        color: colors.colorBase
    },
    inputError: {
        borderColor: colors.colorError,
        borderWidth: 1
    },
    inputLabelError: {
        textAlign: 'left',
        color: colors.colorError,
        fontFamily: fonts.poppinsRegular
    },

    // SELECT
    select: {
        width: '100%',
        height: 34,
        marginVertical: 4,
        backgroundColor: colors.colorInactive,
        borderRadius: 8,
        justifyContent: "center",
        textAlign: 'center',
        color: colors.colorBase
    },

    // BUTTONS
    buttonPrimary: {
        padding: 8,
        width: '48%',
        backgroundColor: colors.colorPrimary,
        borderColor: colors.colorPrimary,
        borderWidth: 2,
    },
    buttonPrimaryText: {
        color: colors.textInPrimary,
        textAlign: 'center',
        fontFamily: fonts.archivoBold
    },
    buttonSecondary: {
        padding: 8,
        width: '48%',
        backgroundColor: colors.colorSecondary,
        borderColor: colors.colorSecondary,
        borderWidth: 2,
    },
    buttonSecondaryText: {
        color: colors.textInSecondary,
        textAlign: 'center',
        fontFamily: fonts.archivoBold
    },
    
    // FAB BUTTON
    fabButtonContainer: {
        position: 'absolute',
        right: 30,
        bottom: 30
    },
    fabButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.colorSecondary,
    },
    fabButtonIcon: {
        fontSize: 30,
        color: colors.textInSecondary
    },

});

export default globalStyles;