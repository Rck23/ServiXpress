import { StyleProp, Image, TextStyle, ImageStyle, Text, TouchableOpacity, ImageBackground, View, ViewStyle, ScrollView } from 'react-native';
import { mainColors, systemImages } from '../../Constants/Values';
import { GlobalStyles } from '../../Styles/SharedStyles';
import { Icon, IconProps } from './IconComponents';
import { Usuario } from '../../Interfaces/Usuario';
import { Avatar } from 'react-native-paper';
import { StrIsNullOrEmpty } from '../../Helpers/GlobalFunctions';
import { Servicio } from '../../Interfaces/Servicio';

type ButtonPrincipalProps = {
    onClick?: () => void
    text: string
    icon: IconProps
}

type TextProps = {
    text?: string | null
    style?: StyleProp<TextStyle>
}

type TextAndIconProps = {
    icon?: IconProps
    text?: string
    style?: StyleProp<TextStyle>
    textStyle?: StyleProp<TextStyle>
    iconStyle?: StyleProp<TextStyle>
}

export const ButtonPrincipalGlobal = (props: ButtonPrincipalProps) => {
    return (
        <TouchableOpacity
            style={GlobalStyles.GlobalButtonPrincipal}
            activeOpacity={0.6}
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

export const TextAndIcon = (props: TextAndIconProps) => {
    return (
        <View style={[{ flexDirection: 'row', alignItems: 'center' }, props.style]}>
            {
                props.icon &&
                <Icon
                    name={props.icon.name}
                    library={props.icon.library}
                    style={[props.iconStyle]}
                />
            }
            <TextComponent text={props.text} style={[]} />
        </View>
    )
}

type UserItemProps = {
    user: Usuario
    onPress: () => void;
}


type ServiceItemProps = {
    service: Servicio
    onPress: () => void;
}

export const UserListItem = (props: UserItemProps) => {
    const user = props.user
    const styleTextInfo: StyleProp<TextStyle> = { color: mainColors.pink2, fontSize: 9, fontWeight: '600', textAlign: 'right' }

    return (
        <TouchableOpacity
            style={GlobalStyles.GlobalItem}
            onPress={() => props.onPress ? props.onPress() : {}}
        >
            <Row>
                <Col size={0.4}>
                    <Avatar.Image
                        size={30}
                        source={!StrIsNullOrEmpty(user?.avatarUrl) ? { uri: user?.avatarUrl } : systemImages.personIcon}
                    />
                </Col>
                <Col size={3}>
                    <TextComponent
                        style={GlobalStyles.GlobalItemText}
                        text={`${user.nombre} ${user.apellidos}`} />
                </Col>
                <Col size={1}>
                    <TextComponent style={styleTextInfo} text={user.roles.toString()} />
                </Col>
            </Row>
            <View>
                <TextComponent text={user.email} />
                <TextComponent text={user.telefono} />
                <TextComponent text={`Estado de la cuenta: ${user.estatus}`} />
            </View>

        </TouchableOpacity>
    )
}



export const ServiceListItem = (props: ServiceItemProps) => {
    const service = props.service
    const styleTextInfo: StyleProp<TextStyle> = { color: mainColors.pink2, fontSize: 9, fontWeight: '600', textAlign: 'right' }

    return (
        <TouchableOpacity
            style={GlobalStyles.GlobalItem}
            onPress={() => props.onPress ? props.onPress() : {}}
        >
            <Row>
                <Col size={0.4}>
                    <Avatar.Image
                        size={30}
                        source={!StrIsNullOrEmpty(props.service.usuario?.avatarUrl) ? { uri: service.usuario?.avatarUrl } : systemImages.personIcon}
                    />
                </Col>
                <Col size={3}>
                    <TextComponent
                        style={GlobalStyles.GlobalItemText}
                        text={`${props.service.usuario.nombre} ${props.service.usuario.apellidos}`} />
                </Col>
                <Col size={1}>
                    <TextComponent style={styleTextInfo} text={service.categoriaServicio.nombre} />
                </Col>
            </Row>
            <View>
                <TextComponent text={service.descripcion} />
                <Row>
                    <Col>
                        <TextComponent text={`${service.estado}`} />
                        <TextComponent text={`${service.tipoServicio.tipo}`} />
                    </Col>
                    <Col>
                        <TextComponent text={`${service.municipio}`} />
                        <TextComponent text={`${service.precio}`} />
                    </Col>
                </Row>
            </View>

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


export const ScrollViewComponent = ({ children, style }: any) => {
    return (
        <ScrollView style={style} showsVerticalScrollIndicator={false}>
            {children}
        </ScrollView>
    )
}


type ListEmptyComponentProps = {
    text?: string
}
export const ListEmptyComponent = (props: ListEmptyComponentProps) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50
        }}>
            <Image
                resizeMode='contain'
                style={{ maxWidth: 350, marginBottom: 0 }}
                source={require('../../Images/noDataFound.png')}
            />
            <TextComponent
                style={{ marginTop: 0, color: mainColors.purpule3 }}
                text={props.text ?? 'No se han encontrado resultados...'}
            />
        </View>
    )
}

type ButtonRoundedIconProps = {
    icon: IconProps
    onPress: () => void
    size?: number,
    bgColor?: string
    iconColor?: string
}
export const ButtonRoundedIcon = (props: ButtonRoundedIconProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => props.onPress ? props.onPress() : null}
            style={{
                width: props.size ?? 60,
                height: props.size ?? 60,
                backgroundColor: props.bgColor ?? mainColors.purpule3,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10
            }}
        >
            <Icon
                name={props.icon.name}
                color={props.iconColor ?? mainColors.white}
                library={props.icon.library}
            />
        </TouchableOpacity>
    )
}