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
        backgroundColor: colors.back,
        borderRadius: 100,
        marginHorizontal: 14,
        marginTop: 11,
        position: 'absolute',
        zIndex: 100,
    },
    backImg: {
        width: 20, 
        height: 20, 
        zIndex: 99
    },

    loading: {
        marginTop: 20,
        marginBottom: 13
    },

    scrollView: {
        // backgroundColor: colors.black,
    },

    text: {
        color: colors.primary_black,
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
    detectionView: {
        marginHorizontal: 13,
        marginTop: 10,
        borderWidth: 13, 
        borderColor: colors.white, 
        borderRadius: 1,
        elevation: 5,
        shadowColor: colors.primary_black, 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.5, 
        shadowRadius: 10,
    },
    detectionViewNoti: {
        marginHorizontal: 13,
        marginVertical: 15,
        borderWidth: 13, 
        borderColor: colors.white, 
        borderRadius: 1,
        elevation: 5,
        shadowColor: colors.primary_black, 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.5, 
        shadowRadius: 10,
    },
    detectionTextNoti: {
        color: colors.primary,
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        alignSelf: 'center', 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    detectionButton: {
        backgroundColor: colors.primary,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center', 
        borderRadius: 50,
        marginLeft: 13,
        marginBottom: 10
    },
    detectionText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        top: -1,
        marginHorizontal: 22
    },
    noDetectionText: {
        color: colors.primary,
        // alignSelf: 'center', 
        // justifyContent: 'center', 
        // alignItems: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },

    bottom: {
        flexDirection: 'row',
        backgroundColor: colors.absolute,
        position: 'absolute',
        width: '100%',
        bottom: 5,
    },

    viewLibrary: {
        alignSelf: 'center', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginStart: 10
    },
    buttonLibrary: {
        // backgroundColor: colors.white_absolute,
        padding: 15,
        margin: 15,
        marginStart: 10,
        borderRadius: 100
    },
    imageLibrary: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    viewCamrera: {
        alignSelf: 'center', 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'absolute', 
        right: 100, 
        left: 100,
    },
    buttonCamera: {
        backgroundColor: colors.white_absolute,
        position: 'absolute',
        padding: 17,
        margin: 10,
        borderRadius: 100,
        alignSelf: 'center'
    },
    imageCamera: {
        height: 50,
        width: 50,
        top: -1
    },

    viewReject: {
        alignSelf: 'center', 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'absolute', 
        right: 0,
        marginEnd: 10
    },
    buttonReject: {
        backgroundColor: colors.white_absolute,
        padding: 10,
        margin: 15,
        marginEnd: 20,
        borderRadius: 100
    },
    imageReject: {
        height: 33,
        width: 33,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    
});

export default styles;
