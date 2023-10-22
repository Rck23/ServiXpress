import React from 'react'
import { View } from 'react-native';
import { mainColors } from '../../Constants/Values';
import { TextComponent } from './SharedComponents';
import { ActivityIndicator } from 'react-native-paper';
import { GlobalStyles } from '../../Styles/SharedStyles';

type BlockUIProps = {
    message?: string
    visible?: boolean
}
export const BlockUI = (props: BlockUIProps) => {
    return (
        !props.visible ? <></>
            :
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#0000001e',
                zIndex: 100,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}>
                <View style={{
                    backgroundColor: mainColors.white,
                    borderRadius: 10,
                    padding: 20,
                    paddingHorizontal: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...GlobalStyles.boxShadow
                }}>
                    <ActivityIndicator
                        size={'large'}
                        color={mainColors.purpule3}
                        style={{ marginBottom: 10 }}
                    />
                    <TextComponent text={props.message ?? 'Cargando...'} style={{ fontWeight: '700' }} />
                </View>
            </View>
    )
}
