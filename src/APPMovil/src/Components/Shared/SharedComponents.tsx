import { StyleProp, Image, TextStyle, ImageStyle, Text, TouchableOpacity, ImageBackground, View, ViewStyle, ScrollView } from 'react-native';
import { mainColors } from '../../Constants/Values';
import { GlobalStyles } from '../../Styles/SharedStyles';
import { Icon, IconProps } from './IconComponents';

type ButtonPrincipalProps = {
    onClick?: () => void
    text: string
    icon: IconProps
}

type TextProps = {
    text?: string | null
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



type ImageLogoProps = {
    style?: StyleProp<ImageStyle>
}
export const LogoImage = (props: ImageLogoProps) => {
    return (
        <Image
            source={require('../../Images/Logo.png')}
            style={[GlobalStyles.GlobalLogo, props.style]}
            resizeMode='contain'
        />
    )
}



export const BackgroudImage = ({ children }: any) => {
    return (
        <ImageBackground
            source={require('../../Images/Background.jpg')}
            style={GlobalStyles.GlobalBackground}
        >
            {children}
        </ImageBackground>
    )
}


export const Row = ({ children }: any) => {
    return (
        <View style={GlobalStyles.row}>
            {children}
        </View>
    )
}


type ColProps = {
    style?: StyleProp<ViewStyle>
    children?: any
    size?: number
}
export const Col = (props: ColProps) => {
    return (
        <View style={[{ justifyContent: 'center', flex: props.size || 1, margin: 2 }, props.style]}>
            {props.children}
        </View>
    )
}


export const ScrollViewComponent = ({ children }: any) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {children}
        </ScrollView>
    )
}


type ListEmptyComponentProps = {
    text?: string
}
export const ListEmptyComponent = (props: ListEmptyComponentProps) => {
    return (
        <View>
            <Image source={require('../../Images/noDataFound.png')} />
            <TextComponent text={props.text ?? 'No se han encontrado resultados...'} />
        </View>
    )
}