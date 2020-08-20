import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../assets/themes/theme';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: colors.colorPrimary
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        flexGrow: 1,
        fontFamily: fonts.archivoBold,
        color: colors.textInPrimary,
        fontSize: 24,
        lineHeight: 24,
        marginHorizontal: 16,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    }
});

export default styles;