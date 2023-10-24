import React from 'react';
import { FlatList, Modal, ScrollView, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { TipoServicioModalProps } from '../../Interfaces/DOMInterfaces';
import { Icon } from '../Shared/IconComponents';
import { mainColors } from '../../Constants/Values';
import { TextComponent } from '../Shared/SharedComponents';
import { ButtonGlobal } from '../Shared/FormsComponents';
import { modalStyles } from '../../Styles/AlertStyles';
import { CategoriaServicio } from '../../Interfaces/Servicio';
import { Divider, List } from 'react-native-paper';


export const TipoServicioModalSelector = (props: TipoServicioModalProps) => {

    const handleCloseModal = async (categorySelected?: CategoriaServicio) => {
        props.OnHideModal ? props.OnHideModal(categorySelected) : {}
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
                        <TextComponent style={modalStyles.modalTitle} text='Seleccione el tipo de servicio' />
                        <FlatList
                            data={props.categoriesList}
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
                                            title={item.nombre}
                                            left={p => <Icon name="work" library='material' />}
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