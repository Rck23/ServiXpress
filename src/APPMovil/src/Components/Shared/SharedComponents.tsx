import { StyleProp, TextStyle, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { mainColors } from '../../Constants/Values';
import { GlobalStyles } from '../../Styles/SharedStyles';
import { Icon, IconProps } from './IconComponents';

type ButtonPrincipalProps = {
    onClick?: () => void
    text: string
    icon: IconProps
}

export const ButtonPrincipalGlobal = (props: ButtonPrincipalProps) => {
    return (
        <TouchableOpacity
            style={GlobalStyles.GlobalButtonPrincipal}
            onPress={() => props.onClick ? props.onClick() : null}
        >
            <Icon name={props.icon.name} library={props.icon.library} style={GlobalStyles.GlobalButtonIconPrincipal} />
            <Text style={GlobalStyles.GlobalButtonTextPrincipal}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}