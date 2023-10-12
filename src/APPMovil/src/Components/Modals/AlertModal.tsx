import React from 'react';
import { Modal, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { AlertModalProps } from '../../Interfaces/DOMInterfaces';
import { Icon } from '../Shared/IconComponents';
import { mainColors } from '../../Constants/Values';
import { TextComponent } from '../Shared/SharedComponents';
import { ButtonGlobal } from '../Shared/FormsComponents';
import { modalStyles } from '../../Styles/AlertStyles';


export const AlertModal = (props: AlertModalProps) => {

    const iconName = () => {
        switch (props.icon) {
            case 'success': return 'check-circle'
            case 'question': 'question-circle'
            case 'error': return 'times-circle'
            case 'info': return 'info-circle'
            case 'warning': return 'warning'
            default: return 'info-circle'
        }
    }


    const handleCloseAlert = async () => {
        props.OnHideAlert ? props.OnHideAlert() : {}
    }

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.visible == true}
            onRequestClose={() => handleCloseAlert()}>
            <TouchableWithoutFeedback
                onPress={(event) => { if (event.target === event.currentTarget) handleCloseAlert() }}
            >
                <View style={modalStyles.modal}>
                    <View style={modalStyles.modalContent}>
                        <Icon
                            library='fontAwesome'
                            name={iconName()}
                            size={70}
                            color={mainColors.purpule}
                            style={{ marginBottom: 10 }}
                        />
                        <TextComponent style={modalStyles.modalTitle} text={props.title ?? ''} />
                        <ScrollView style={{ maxHeight: 400 }}>
                            <TextComponent style={[modalStyles.modalText, { lineHeight: 20 }]} text={props.message ?? ''} />
                        </ScrollView>
                        <View style={modalStyles.modalFooter}>
                            <ButtonGlobal type='small' onClick={handleCloseAlert} text='Cerrar' icon={{ name: 'expand-more', library: 'material' }} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </Modal>
    )
}