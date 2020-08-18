import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../assets/themes/theme';

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5
    },
    modal: {
        backgroundColor: colors.colorCard,
        borderRadius: 5,
        padding: 8,
        alignItems: "center",
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    title: {
        alignSelf: 'flex-start',
        fontFamily: fonts.archivoBold,
        fontSize: 20,
        lineHeight: 28,
    },
    content: {
        width: '100%',
        minHeight: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: '90%',
        height: 34,
        marginVertical: 4,
        backgroundColor: colors.colorInactive,
        borderRadius: 8,
        justifyContent: "center",
        textAlign: 'center',
        color: colors.colorBase
    },
    footer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: '25%',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 4,
        margin: 2,
        backgroundColor: colors.colorSecondary,
        borderColor: colors.colorSecondary,
    },
    buttonText: {
        color: colors.colorPrimaryDark
    }
});

export default styles;