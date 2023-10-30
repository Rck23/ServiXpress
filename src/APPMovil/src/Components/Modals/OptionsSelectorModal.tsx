import React from 'react';
import { FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { KeyValue, ModalOptionsSelectorProps } from '../../Interfaces/DOMInterfaces';
import { Icon } from '../Shared/IconComponents';
import { TextComponent } from '../Shared/SharedComponents';
import { ButtonGlobal } from '../Shared/FormsComponents';
import { modalStyles } from '../../Styles/AlertStyles';
import { Divider, List } from 'react-native-paper';


export const OptionsSelectorModal = (props: ModalOptionsSelectorProps) => {

    const handleCloseModal = async (value?: KeyValue) => {
        props.OnHideModal ? props.OnHideModal(value) : {}
    }

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={props.visible == true}
            onRequestClose={() => handleCloseModal()}>
            <TouchableWithoutFeedback
                onPress={(event) => { if (event.target === event.currentTarget) handleCloseModal() }}
            >
                <View style={[modalStyles.modal, modalStyles.modalBottom]}>
                    <View style={[modalStyles.modalContent]}>
                        <TextComponent style={modalStyles.modalTitle} text={props.title ?? 'Seleccione la opcion requerida'} />
                        <FlatList
                            data={props.options}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            style={{ maxHeight: 250, width: '100%' }}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleCloseModal(item)}
                                    activeOpacity={0.5}
                                >
                                    <View>
                                        <List.Item
                                            title={item.name}
                                            left={p => <Icon name="circle" library='fontAwesome' />}
                                        />
                                        <Divider />
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                        <View style={modalStyles.modalFooter}>
                            <ButtonGlobal type='small' onClick={handleCloseModal} text='Cerrar' icon={{ name: 'expand-more', library: 'material' }} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </Modal >
    )
}