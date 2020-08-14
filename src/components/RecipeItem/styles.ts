import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../assets/themes/theme';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 8,
        backgroundColor: colors.colorCard,
        borderRadius: 8,
        marginBottom: 8
    },
    infoContainer: {
        flex: 4,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    name: {
        fontFamily: fonts.archivoBold,
        fontSize: 20,
        lineHeight: 20,
    },
    ingredients: {
        fontFamily: fonts.poppinsRegular,
        fontSize: 14,
        lineHeight: 24
    },
    labelsContainer: {
        flexDirection: 'row',
    },
    primaryLabel: {
        borderColor: colors.colorPrimary,
        borderWidth: 1,
        padding: 4,
        borderRadius: 5,
        marginRight: 10
    },
    secondaryLabel: {
        borderColor: colors.colorPrimary,
        borderWidth: 1,
        padding: 4,
        borderRadius: 5
    },
    labelText: {
        fontFamily: fonts.poppinsSemiBold,
        color: colors.textInSecondary,
        fontSize: 14,
        lineHeight: 18,
    },
    options: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 2
    }
});

export default styles;