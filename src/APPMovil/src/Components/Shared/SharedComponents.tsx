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

type ItemProps = {
    name: string
    onPress: () => void;
    icon: IconProps
}

export default function UserListItem(props: ItemProps) {
    return (
        <TouchableOpacity
            style={GlobalStyles.GlobalItem}
            onPress={() => props.onPress ? props.onPress() : {}}
        >
            <Icon name={props.icon.name} library={props.icon.library} style={GlobalStyles.Globalitemicon} />
            <Text style={GlobalStyles.GlobalItemText}>{props.name}</Text>
        </TouchableOpacity>
    )
}

type InputProps = {
    value: string
    onChange?: (Text: string) => void
    style?: StyleProp<TextStyle>
    placeholder: string
}

export const InputEditable = (props: InputProps) => {
    return (
        <TextInput
            style={GlobalStyles.InputEditable}
            placeholder={props.placeholder}
            placeholderTextColor={mainColors.purpule}
            onChangeText={(text) => props.onChange ? props.onChange(text) : null}
            value={props.value}
        />
    )
}