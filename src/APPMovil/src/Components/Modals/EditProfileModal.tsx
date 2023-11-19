import React from 'react';
import { FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { KeyValue, ModalEditProfileProps, ModalOptionsSelectorProps } from '../../Interfaces/DOMInterfaces';
import { Icon } from '../Shared/IconComponents';
import { TextComponent } from '../Shared/SharedComponents';
import { ButtonGlobal, InputGlobal } from '../Shared/FormsComponents';
import { modalStyles } from '../../Styles/AlertStyles';
import { Divider, List } from 'react-native-paper';


export const EditProfileModal = (props: ModalEditProfileProps) => {

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={props.visible == true}
            onRequestClose={() => props.visible = false}>
            <TouchableWithoutFeedback
                onPress={(event) => { if (event.target === event.currentTarget) props.visible = false }}
            >
                <View style={[modalStyles.modal, modalStyles.modalBottom]}>
                    <View style={[modalStyles.modalContent]}>
                        <TextComponent style={modalStyles.modalTitle} text={props.title ?? 'Edita tu perfil'} />

                        <InputGlobal
                            placeholder='Nombre de usuario'
                            value={props.data?.nombre ?? ''} />
                        
                        <View style={modalStyles.modalFooter}>
                            <ButtonGlobal type='small' onClick={() => props.visible = false} text='Cerrar' icon={{ name: 'expand-more', library: 'material' }} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </Modal >
    )
}