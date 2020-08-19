import { StyleSheet, Button } from 'react-native';
import { colors } from '../../assets/themes/theme';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.colorBackground
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
    buttonPrimary: {
        padding: 8,
        width: '48%',
        backgroundColor: colors.colorPrimary,
        borderColor: colors.colorPrimary,
        borderWidth: 2,
    },
    buttonPrimaryText: {
        color: colors.textInPrimary,
        textAlign: 'center'
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
        textAlign: 'center'
    },
    

});

export default globalStyles;