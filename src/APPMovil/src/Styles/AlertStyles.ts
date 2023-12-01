import { Dimensions, Platform, StyleSheet } from "react-native";
import { GlobalStyles } from "./SharedStyles";
import { mainColors } from "../Constants/Values";

const heightScreen = Dimensions.get('window').height
const widthScreen = Dimensions.get('window').width

export const modalStyles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: '#00000046',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContent: {
        backgroundColor: mainColors.white,
        borderRadius: 10,
        width: widthScreen > 400 ? 370 : widthScreen - 10,
        padding: 10,
        alignItems: 'center',
        position: 'relative',
        ...GlobalStyles.boxShadow
    },
    modalBottom: {
        justifyContent: 'flex-end',
    },
    modalBottomContent: {
        borderRadius: 10,
        borderBottomEndRadius: 0,
        borderBottomLeftRadius: 0
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    modalText: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center'
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '100%'
    },
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5
    },
    btnText: {
        fontWeight: '700',
        fontSize: 14
    },
    btnCloseModal: {
        backgroundColor: '#ffe6e6',
        paddingLeft: 5
    }
})
