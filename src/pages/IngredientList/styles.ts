import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../assets/themes/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.colorBackground
    },
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
        /* shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5 */
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
        color: colors.colorPrimary
    },
    buttonText: {
        color: colors.colorPrimaryDark
    }
})

export default styles;