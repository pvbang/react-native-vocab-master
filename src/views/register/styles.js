import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    imageLogoView: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },  
    textImageLogo: {
        color: colors.blue, 
        fontSize: 27, 
        marginTop: 10,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    image: {
        // top: -30,
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },

    formView: {
        flex: 1,
        // bottom: 40,
        marginTop: 30,
        margin: 20,
        justifyContent: 'center',
    },

    textForm: {
        marginLeft: 10,
        color: colors.gray_text,
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 10,
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
        backgroundColor: colors.blue
    },
    textButton: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold'
    },

    registerView: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        marginVertical: 50,
    },
    textGray: {
        fontSize: 17,
        color: colors.gray_text_form
    },
    textRegister: {
        marginStart: 5,
        fontSize: 17,
        color: colors.blue,
        fontWeight: 'bold'
    },

    scrollView: {
        backgroundColor: colors.white,
        padding: 15,
    },

});

export default styles;
