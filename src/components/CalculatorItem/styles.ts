import { StyleSheet } from 'react-native';
import { fonts, colors } from '../../assets/themes/theme';

const styles = StyleSheet.create({
    container: {
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
        justifyContent: 'space-between',
        borderColor: colors.colorPrimary
    },
    porcentageLabel: {
        flex: 1,
        fontFamily: fonts.archivoBold,
        fontSize: 14,
        lineHeight: 20
    },
    input: {
        flex: 1,
        height: 34,
        backgroundColor: colors.colorInactive,
        borderRadius: 8,
        justifyContent: "center",
        textAlign: 'center',
        color: colors.colorPrimary
    },
    calculateButton: {
        flex: 1,
        alignItems: "flex-end"
    }
})

export default styles;


