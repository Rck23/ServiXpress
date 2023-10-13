import React from 'react'
import { View } from 'react-native';
import { mainColors } from '../../Constants/Values';
import { TextComponent } from './SharedComponents';
import { ActivityIndicator } from 'react-native-paper';

type loadingScreenProps = {
    visible: boolean
}
export const LoadingScreen = (props: loadingScreenProps) => {
    return (!props.visible ? <></>
        :
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: mainColors.white,
        }}>
            <ActivityIndicator
                size={'large'}
                color={mainColors.purpule3}
                style={{ marginBottom: 10 }}
            />
            <TextComponent text='Cargando...' style={{ fontWeight: '700' }} />
        </View>
    )
}
