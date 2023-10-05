import { StyleSheet } from 'react-native';
import { mainColors } from '../Constants/Values';

export const GlobalStyles = StyleSheet.create({
    boxShadow: {
        shadowColor: mainColors.black,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3
    }
})