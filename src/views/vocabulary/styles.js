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

    searchView : {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: colors.gray_white, 
        paddingHorizontal: 20, 
        borderRadius: 50,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10
    },
    search : {
        flex: 1, 
        marginLeft: 10,
        fontSize: 16,
    },
    imgSearch: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    imgVoice: {
        width: 20,
        height: 20,
    },
    imgReject : {
        width: 20,
        height: 20,
        marginHorizontal: 10,
    },
    imgTopLeft: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        right: 0
    },
    resultsView : {
        height: '87%'
    },
    searchResults : {
        backgroundColor: colors.gray_search,
        marginHorizontal: 20,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 3,
    },
    viewTextResults : {
        flexDirection: 'row', 
        marginVertical: 7
    },
    textResults : {
        marginVertical: 10,
        color: colors.primary,
        fontSize: 16,
        marginHorizontal: 14
    },
    hr : {
        backgroundColor: colors.white,
        height: 2,
        borderRadius: 50
    },

    center: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    bottom: {
        position: 'absolute',
        bottom: 5,
        alignSelf: 'center'
    },

    row: {
        flexDirection: 'row', 
        alignItems: 'center',
    },

    column: {
        flexDirection: 'column', 
        alignItems: 'center',
        margin: 9,
    },

    text: {
        color: colors.primary_black, 
        fontSize: 14, 
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },

    image: {
        height: 50, 
        width: 50
    }


});

export default styles;
