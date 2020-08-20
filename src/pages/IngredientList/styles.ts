import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../assets/themes/theme';

import globalStyles from '../../assets/styles/global';

const styles = StyleSheet.create({
    ...globalStyles,

    listContainer: {
        marginTop: -10,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        backgroundColor: colors.colorCard,
        borderLeftColor: colors.colorPrimary,
        borderLeftWidth: 3,
        borderRadius: 8,
        marginBottom: 8
    },
    listItemLabel: {
        fontFamily: fonts.archivoRegular,
        fontSize: 14,
        lineHeight: 24
    },
    listItemIcon: {
        marginRight: 2,
        alignSelf: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        maxWidth: '90%'
    }
})

export default styles;