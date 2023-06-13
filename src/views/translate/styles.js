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

    translateInput : {
        borderRadius: 10,
        padding: 10,
        textAlignVertical: "top",
        fontSize: 19,
        color: colors.primary
    },

    textTrans: {
        fontSize: 20,
        color: colors.black,
        marginStart: 22,
        fontWeight: 'bold',
    },

    row: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: 20
    },
    sound: {
        width: 24,
        height: 24,
        position: 'absolute',
        right: 20,
    },

    transView: {
        marginVertical: 20,
        borderWidth: 13, 
        borderColor: colors.white, 
        borderRadius: 1,
        elevation: 5,
        shadowColor: colors.primary_black, 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.5, 
        shadowRadius: 10,
    },

    bottom: {
        position: 'absolute',
        bottom: 5,
        alignSelf: 'center',
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: 20
    },
    inputLanguage: {
        backgroundColor: colors.primary,
        paddingHorizontal: 30,
        paddingVertical: 16,
        borderRadius: 10,
        margin: 15,
    },
    imageReverse: {
        height: 25,
        width: 25
    },
    outputLanguage: {
        backgroundColor: colors.primary,
        paddingHorizontal: 30,
        paddingVertical: 16,
        borderRadius: 10,
        margin: 15,
    },
    textLanguage: {
        color: colors.white,
        fontSize: 15,
        fontWeight: 'bold',
    }
    
});

export default styles;
