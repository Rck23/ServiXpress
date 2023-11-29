import { StyleProp, TextStyle, Text, TextInput, TouchableOpacity, ViewStyle, View, KeyboardType, KeyboardAvoidingView, ScrollView } from 'react-native';
import { mainColors } from '../../Constants/Values';
import { GlobalStyles } from '../../Styles/SharedStyles';
import { Icon, IconProps } from './IconComponents';
import { TextComponent } from './SharedComponents';
import { useState } from 'react';

type CalificationProps = {
    onClick?: () => void
    icon: IconProps
}

type InputProps = {
    value: string
    onChange?: (Text: string) => void
    style?: StyleProp<TextStyle>
    styleContainer?: StyleProp<ViewStyle>
    labelStyle?: StyleProp<TextStyle>
    placeholder: string
    keyboardType?: KeyboardType
    secureText?: boolean
    showLabel?: boolean
    disabled?: boolean
    rightButton?: boolean
    rightIcon?: IconProps
    onPressIn?: () => void
    OnRightButtonPress?: () => void
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
    text?: string
    icon: IconProps
    type?: 'normal' | 'big' | 'small'
    color?: string
    disabled?: boolean
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
            activeOpacity={0.5}
            style={[GlobalStyles.globalInputContainer, props.styleContainer]}
            onPress={props.onPressIn}
        >
            <TextComponent text={props.placeholder} style={[{ fontWeight: '500', marginBottom: 0, color: mainColors.purpule3, display: props.showLabel ? 'flex' : 'none' }, props.labelStyle]} />
            <TextInput
                style={GlobalStyles.GlobalInput}
                keyboardType={props.keyboardType}
                secureTextEntry={props.secureText}
                placeholder={props.placeholder}
                placeholderTextColor={mainColors.textColor}
                onChangeText={(text) => props.onChange ? props.onChange(text) : null}
                value={props.value}
                editable={!props.disabled}
            />
            <TouchableOpacity
                activeOpacity={0.5}
                style={GlobalStyles.globalInputRightItem}
                onPress={props.OnRightButtonPress}
            >
                {props.rightIcon && <Icon style={GlobalStyles.globalInputRightItemIcon} {...props.rightIcon} />}
            </TouchableOpacity>
        </TouchableOpacity >
    )
}

export const TextAreaGlobal = (props: TextAreaProps) => {
    return (
        <View style={[GlobalStyles.globalInputContainer, props.styleContainer]}>
            <TextComponent text={props.placeholder} style={[{ fontWeight: '500', marginBottom: 0, color: mainColors.purpule3, display: props.showLabel ? 'flex' : 'none' }, props.labelStyle]} />
            <TextInput
                style={GlobalStyles.GlobalInput}
                placeholder={props.placeholder}
                placeholderTextColor={mainColors.textColor}
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
            disabled={props.disabled}
        >
            <Icon name={props.icon.name} library={props.icon.library} style={[GlobalStyles.GlobalButtonIcon, { color: props.textColor ?? mainColors.white }, props.type == 'small' ? GlobalStyles.globalButtonIconSmall : {}]} />

            {
                props.text &&
                <Text style={[GlobalStyles.GlobalButtonText, { color: props.textColor ?? mainColors.white }, props.type == 'small' ? GlobalStyles.globalButtonTextSmall : {}]}>
                    {props.text}
                </Text>
            }
        </TouchableOpacity>
    )
}

export const ButtonCalif = (props: CalificationProps) => {
    return (
        <TouchableOpacity
            style={[GlobalStyles.ButonCal]}
            onPress={() => props.onClick ? props.onClick() : {}}
            activeOpacity={0.7}
        >
            <Icon name={props.icon.name} library={props.icon.library} style={[GlobalStyles.ButonCalIcon]} />
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


export const FormScrollContainer = ({ children }: any) => {
    return (
        <KeyboardAvoidingView>
            <ScrollView showsVerticalScrollIndicator={false}>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}



export const useTogglePasswordVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('visibility');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'visibility') setRightIcon('visibility-off')
        else if (rightIcon === 'visibility-off') setRightIcon('visibility');

        setPasswordVisibility(!passwordVisibility);
    };

    return {
        passwordVisibility,
        rightIcon,
        handlePasswordVisibility
    };
};