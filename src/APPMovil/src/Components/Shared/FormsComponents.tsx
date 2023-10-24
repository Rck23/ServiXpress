import { StyleProp, TextStyle, Text, TextInput, TouchableOpacity, ViewStyle, View, KeyboardType } from 'react-native';
import { mainColors } from '../../Constants/Values';
import { GlobalStyles } from '../../Styles/SharedStyles';
import { Icon, IconProps } from './IconComponents';
import { TextComponent } from './SharedComponents';

type InputProps = {
    value: string
    onChange?: (Text: string) => void
    style?: StyleProp<TextStyle>
    styleContainer?: StyleProp<ViewStyle>
    labelStyle?: StyleProp<TextStyle>
    placeholder: string
    keyboardType?: KeyboardType
    showLabel?: boolean
    disabled?: boolean
    onPressIn?: () => void
}

type TextAreaProps = {
    value: string
    onChange?: (Text: string) => void
    style?: StyleProp<TextStyle>
    styleContainer?: StyleProp<ViewStyle>
    labelStyle?: StyleProp<TextStyle>
    placeholder: string
    numberOfLines?: number
    maxLength: number
    multiline: boolean
    showLabel?: boolean
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
        <TouchableOpacity
            activeOpacity={1}
            style={[GlobalStyles.globalInputContainer, props.styleContainer]}
            onPress={props.onPressIn}
        >
            <TextComponent text={props.placeholder} style={[{ marginBottom: 0, display: props.showLabel ? 'flex' : 'none' }, props.labelStyle]} />
            <TextInput
                style={GlobalStyles.GlobalInput}
                keyboardType={props.keyboardType}
                placeholder={props.placeholder}
                placeholderTextColor={mainColors.purpule}
                onChangeText={(text) => props.onChange ? props.onChange(text) : null}
                value={props.value}
                editable={!props.disabled}
            />
        </TouchableOpacity >
    )
}

export const TextAreaGlobal = (props: TextAreaProps) => {
    return (
        <View style={[GlobalStyles.globalInputContainer, props.styleContainer]}>
            <TextComponent text={props.placeholder} style={[{ marginBottom: 0, display: props.showLabel ? 'flex' : 'none' }, props.labelStyle]} />
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
        </View>
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
            style={GlobalStyles.GlobalButton}
            onPress={() => props.onClick ? props.onClick() : null}
            activeOpacity={.7}
        >
            <Text style={GlobalStyles.GlobalHipervinculoText}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}