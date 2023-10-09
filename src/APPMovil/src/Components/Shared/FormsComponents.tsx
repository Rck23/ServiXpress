import { StyleProp, TextStyle, Text, TextInput, TouchableOpacity } from 'react-native';
import { mainColors } from '../../Constants/Values';
import { GlobalStyles } from '../../Styles/SharedStyles';
import { Icon, IconProps } from './IconComponents';

type InputProps = {
    value: string
    onChange?: (Text: string) => void
    style?: StyleProp<TextStyle>
    placeholder: string
}

type ButtonProps = {
    onClick?: () => void
    text: string
    icon: IconProps
    type?: 'normal' | 'big' | 'small'
    color?: string
    textColor?: string
}

type HipervinculoProps = {
    onClick?: () => void
    text: string
}

export const InputGlobal = (props: InputProps) => {
    return (
        <TextInput
            style={GlobalStyles.GlobalInput}
            placeholder={props.placeholder}
            placeholderTextColor={mainColors.purpule}
            onChangeText={(text) => props.onChange ? props.onChange(text) : null}
            value={props.value}
        />
    )
}

export const ButtonGlobal = (props: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[GlobalStyles.GlobalButton, { backgroundColor: props.color ?? mainColors.purpule }]}
            onPress={() => props.onClick ? props.onClick() : {}}
            activeOpacity={0.7}
        >
            <Icon name={props.icon.name} library={props.icon.library} style={[GlobalStyles.GlobalButtonIcon, { color: props.color ?? mainColors.white }, props.type == 'small' ? GlobalStyles.globalButtonIconSmall : {}]} />
            <Text style={[GlobalStyles.GlobalButtonText, { color: props.color ?? mainColors.white }, props.type == 'small' ? GlobalStyles.globalButtonTextSmall : {}]}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}

export const HipervinculoGlobal = (props: HipervinculoProps) => {
    return (
        <TouchableOpacity
            style={GlobalStyles.GlobalHipervinculo}
            onPress={() => props.onClick ? props.onClick() : null}
        >
            <Text style={GlobalStyles.GlobalHipervinculoText}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}