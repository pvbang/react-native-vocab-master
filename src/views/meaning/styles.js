import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    back: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.back,
        borderRadius: 100,
        marginRight: 1,
        marginLeft: 3,
        zIndex: 100,
    },
    backImg: {
        width: 20,
        height: 20,
        zIndex: 99
    },

    textTop: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
    },

    bookmarkView: {
        right: 20,
        position: 'absolute'
    },
    bookmarkImage: {
        width: 25,
        height: 25,
    },

    scrollView: {
        backgroundColor: colors.white,
        padding: 15,
    },

    top: {
        flex: 0.08,
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    content: {
        flex: 0.92,
    },

    row: {
        flexDirection: 'row', 
        alignItems: 'center',
        // marginBottom: 10,
    },

    textContentBlackBold: {
        color: colors.primary_black,
        fontSize: 18,
        fontWeight: 'bold',
        marginEnd: 10,
    },
    textContentBlack: {
        color: colors.black,
        fontSize: 17,
    },
    textContentGreen: {
        color: colors.green,
        fontSize: 17,
    },
    textContentGreenBold: {
        color: colors.green,
        fontSize: 17,
        fontWeight: 'bold',
    },
    textContentBlue: {
        color: colors.blue,
        fontSize: 17,
    },
    textContentGray: {
        color: colors.gray_dark,
        fontSize: 15,
        marginEnd: 10
    },

    audio: {
        position: 'absolute',
        right: 0,
    },
    sound: {
        width: 16,
        height: 16,
    },

    row2: {
        paddingEnd: 15,
        flexDirection: 'row', 
        marginBottom: 10,
    },
    imageRow2: {
        width: 16,
        height: 16,
        marginTop: 4,
        marginEnd: 3
    },

    marginTop10: {
        marginTop: 10
    },
    marginVertical10: {
        marginVertical: 10,
    },

});

export default styles;
