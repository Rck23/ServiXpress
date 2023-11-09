import React, { useState, useEffect } from 'react';
import { Modal, ScrollView, TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import { AlertModalProps } from '../../Interfaces/DOMInterfaces';
import { Icon } from '../Shared/IconComponents';
import { mainColors } from '../../Constants/Values';
import { TextComponent } from '../Shared/SharedComponents';
import { ButtonGlobal } from '../Shared/FormsComponents';
import { modalStyles } from '../../Styles/AlertStyles';

const screenDimentions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export const AlertModal = (props: AlertModalProps) => {
    const [heightModalBody, setHeightModalBody] = useState(0)
    const [heightModal, setHeightModal] = useState<any>()
    const [icon, setIcon] = useState('gear')

    useEffect(() => {
        const targetHeight = (screenDimentions.height / 2)
        const targetModalHeight = screenDimentions.height > 400 ? 360 : '97%'

        setHeightModal(targetModalHeight)
        setHeightModalBody(targetHeight)
        setIcon(iconName())
    }, [props.visible])


    const handleCloseAlert = async () => {
        props.OnHideAlert ? props.OnHideAlert() : {}
    }

    const HandleConfirmAction = async () => {
        props.OnConfirmAction ? props.OnConfirmAction() : {}
    }


    function iconName() {
        switch (props.icon) {
            case 'success': return 'check-circle'
            case 'question': return 'question-circle'
            case 'error': return 'times-circle'
            case 'info': return 'info-circle'
            case 'warning': return 'warning'
            default: return 'info-circle'
        }
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
                    <View style={[modalStyles.modalContent, { maxHeight: heightModal }]}>
                        <Icon
                            library='fontAwesome'
                            name={icon}
                            size={70}
                            color={mainColors.purpule}
                            style={{ marginBottom: 10 }}
                        />
                        <TextComponent style={modalStyles.modalTitle} text={props.title ?? ''} />
                        <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: heightModalBody }}>
                            <TextComponent style={[modalStyles.modalText, { lineHeight: 20 }]} text={props.message ?? ''} />
                        </ScrollView>
                        <View style={modalStyles.modalFooter}>
                            <ButtonGlobal textColor={mainColors.purpule3} color={mainColors.blackLight} type='small' onClick={handleCloseAlert} text='Cerrar' icon={{ name: 'chevron-down', library: 'ion' }} />
                            {
                                props.icon === 'question' ?
                                    <ButtonGlobal type='small' onClick={HandleConfirmAction} text='Aceptar' icon={{ name: 'checkmark', library: 'ion' }} />
                                    : <></>
                            }
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </Modal>
    )
}