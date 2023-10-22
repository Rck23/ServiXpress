import { StyleProp, TextStyle } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ZocialIcon from 'react-native-vector-icons/Zocial'
import { mainColors } from '../../Constants/Values';


export type IconProps = {
    name: string
    library: 'material' | 'ion' | 'zocial' | 'antDesign' | 'entypo' | 'evil' | 'fontAwesome' | 'foundation' | 'materialCommunity'
    size?: number
    color?: string
    style?: StyleProp<TextStyle>
}
export const Icon = (props: IconProps) => {
    switch (props.library) {
        case "material":
            return <MaterialIcon name={props.name} color={props.color ?? mainColors.textColor} size={props.size ?? 18} style={props.style} />
        case "antDesign":
            return <AntDesignIcon name={props.name} color={props.color ?? mainColors.textColor} size={props.size ?? 18} style={props.style} />
        case "entypo":
            return <EntypoIcon name={props.name} color={props.color ?? mainColors.textColor} size={props.size ?? 18} style={props.style} />
        case "evil":
            return <EvilIcon name={props.name} color={props.color ?? mainColors.textColor} size={props.size ?? 18} style={props.style} />
        case "fontAwesome":
            return <FontAwesomeIcon name={props.name} color={props.color ?? mainColors.textColor} size={props.size ?? 18} style={props.style} />
        case "foundation":
            return <FoundationIcon name={props.name} color={props.color ?? mainColors.textColor} size={props.size ?? 18} style={props.style} />
        case "materialCommunity":
            return <MaterialCommunityIcon name={props.name} color={props.color ?? mainColors.textColor} size={props.size ?? 18} style={props.style} />
        case "ion":
            return <IonIcon name={props.name} color={props.color ?? mainColors.textColor} size={props.size ?? 18} style={props.style} />
        case "zocial":
            return <ZocialIcon name={props.name} color={props.color ?? mainColors.textColor} size={props.size ?? 18} style={props.style} />
    }
}