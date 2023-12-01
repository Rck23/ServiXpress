import React, { useCallback, useContext, useEffect } from 'react';
import { Modal, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { ModalEditProfileProps } from '../../Interfaces/DOMInterfaces';
import { TextComponent } from '../Shared/SharedComponents';
import { ButtonGlobal, FormScrollContainer, InputGlobal } from '../Shared/FormsComponents';
import { modalStyles } from '../../Styles/AlertStyles';
import { UseForm } from '../../Hooks/UseForm';
import { Usuario } from '../../Interfaces/Usuario';
import { usuarioInitState } from '../../Interfaces/InterfacesInitState';
import { mainColors } from '../../Constants/Values';
import { AuthContext } from '../../Context/Auth/Context';


export const EditProfileModal = (props: ModalEditProfileProps) => {
    const { user, UpdateProfile } = useContext(AuthContext)
    const { form, onChange, nombre, telefono, municipio, apellidos, email, password, estado, codigoPostal, calle, coloniaFraccionamiento, numExterior, numInterior } = UseForm<Usuario>(user ?? usuarioInitState)


    const HandleCloseModal = () => {
        props.OnHideModal && props.OnHideModal()
    }

    const HandleSaveChanges = async () => {
        await UpdateProfile(form)
        HandleCloseModal()
    }

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={props.visible == true}
            onRequestClose={HandleCloseModal}>
            <TouchableWithoutFeedback
                onPress={(event) => { if (event.target === event.currentTarget) HandleCloseModal() }}
            >
                <View style={[modalStyles.modal, modalStyles.modalBottom]}>
                    <View style={[modalStyles.modalContent, modalStyles.modalBottomContent]}>
                        <TextComponent style={modalStyles.modalTitle} text={props.title ?? 'Edita tu perfil'} />
                        <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400, width: '100%' }}>
                            <InputGlobal
                                placeholder='Nombre'
                                showLabel
                                onChange={(value) => onChange(value, 'nombre')}
                                value={nombre} />
                            <InputGlobal
                                placeholder='Apellidos'
                                showLabel
                                onChange={(value) => onChange(value, 'apellidos')}
                                value={apellidos} />
                            <InputGlobal
                                placeholder={'Estado'}
                                showLabel
                                onChange={(value) => onChange(value, 'estado')}
                                value={estado ?? ''} />
                            <InputGlobal
                                placeholder='Municipio'
                                showLabel
                                onChange={(value) => onChange(value, 'municipio')}
                                value={municipio ?? ''} />
                            <InputGlobal
                                placeholder='Telefono'
                                showLabel
                                onChange={(value) => onChange(value, 'telefono')}
                                value={telefono ?? ''} />
                            <InputGlobal
                                placeholder='Correo electrónico'
                                showLabel
                                onChange={(value) => onChange(value, 'email')}
                                value={email} />
                            <InputGlobal
                                placeholder='Código postal'
                                showLabel
                                onChange={(value) => onChange(value, 'codigoPostal')}
                                value={codigoPostal ?? ''} />
                            <InputGlobal
                                placeholder='Colonia o Fraccionnamiento'
                                showLabel
                                onChange={(value) => onChange(value, 'coloniaFraccionamiento')}
                                value={coloniaFraccionamiento ?? ''} />
                            <InputGlobal
                                placeholder='Calle'
                                showLabel
                                onChange={(value) => onChange(value, 'calle')}
                                value={calle ?? ''} />
                            <InputGlobal
                                placeholder='Número exterior'
                                showLabel
                                keyboardType='number-pad'
                                onChange={(value) => onChange(value, 'numExterior')}
                                value={numExterior?.toString() ?? '0'} />
                            <InputGlobal
                                placeholder='Número interior'
                                showLabel
                                onChange={(value) => onChange(value, 'numInterior')}
                                value={numInterior?.toString() ?? '0'} />
                        </ScrollView>



                        <View style={modalStyles.modalFooter}>
                            <ButtonGlobal textColor={mainColors.black} color={mainColors.blackLight} type='small' onClick={HandleCloseModal} text='Cerrar' icon={{ name: 'expand-more', library: 'material' }} />
                            <ButtonGlobal type='small' onClick={HandleSaveChanges} text='Guardar' icon={{ name: 'check', library: 'fontAwesome' }} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </Modal >
    )
}