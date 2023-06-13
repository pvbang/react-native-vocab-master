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
        marginHorizontal: 20,
        marginTop: 10,
    },

    inputView : {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: colors.gray_form, 
        paddingHorizontal: 10, 
        borderRadius: 17,
        marginTop: 15,
        height: 60
    },
    textInput : {
        flex: 1, 
        marginLeft: 10,
        fontSize: 16,
    },

    buttonView: {
        marginTop: 20,
        borderRadius: 17,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary
    },
    textButton: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold'
    },

    logoutView: {
        marginTop: 20,
        borderRadius: 17,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: 2,
    },
    textLogout: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default styles;
