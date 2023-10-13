import { StyleProp, TextStyle, Text, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
import { mainColors } from '../../Constants/Values';
import { GlobalStyles } from '../../Styles/SharedStyles';
import { Icon, IconProps } from './IconComponents';

type InputProps = {
    value: string
    onChange?: (Text: string) => void
    style?: StyleProp<TextStyle>
    placeholder: string
}

type TextAreaProps = {
    value: string
    onChange?: (Text: string) => void
    style?: StyleProp<TextStyle>
    placeholder: string
    numberOfLines: number
    maxLength: number
    multiline: boolean
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
    style?: StyleProp<ViewStyle>
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

export const TextAreaGlobal = (props: TextAreaProps) => {
    return (
        <TextInput
            style={GlobalStyles.GlobalInput}
            placeholder={props.placeholder}
            placeholderTextColor={mainColors.purpule}
            onChangeText={(text) => props.onChange ? props.onChange(text) : null}
            value={props.value}
            numberOfLines={props.numberOfLines}
            maxLength={props.maxLength}
            multiline={props.multiline}
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
            style={[GlobalStyles.GlobalHipervinculo, props.style]}
            onPress={() => props.onClick ? props.onClick() : null}
            activeOpacity={.7}
        >
            <Text style={GlobalStyles.GlobalHipervinculoText}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}