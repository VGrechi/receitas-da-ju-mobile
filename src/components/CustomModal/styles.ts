import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../assets/themes/theme';

import globalStyles from '../../assets/styles/global';

const styles = StyleSheet.create({
    ...globalStyles,

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
        minHeight: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    footer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
    },
});

export default styles;