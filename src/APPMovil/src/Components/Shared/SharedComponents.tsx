import { StyleProp, TextStyle, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { mainColors } from '../../Constants/Values';
import { GlobalStyles } from '../../Styles/SharedStyles';
import { Icon, IconProps } from './IconComponents';

type ButtonPrincipalProps = {
    onClick?: () => void
    text: string
    icon: IconProps
}

type TextProps = {
    text?: string
    style?: StyleProp<TextStyle>
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



export const TextComponent = (props: TextProps) => {
    return (
        <Text style={[{ color: mainColors.textColor, fontWeight: '400', fontSize: 13 }, props.style]}>{props.text ?? ''}</Text>
    )
}