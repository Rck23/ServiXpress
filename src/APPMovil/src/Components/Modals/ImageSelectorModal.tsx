import React, { useEffect, useState } from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import { AlertModalProps, ImageRequestFormData, ImageSelectorModalProps } from '../../Interfaces/DOMInterfaces';
import { TextComponent } from '../Shared/SharedComponents';
import { ButtonGlobal } from '../Shared/FormsComponents';
import { modalStyles } from '../../Styles/AlertStyles';
import { ImagePickerResponse } from 'react-native-image-picker';
import { TakeImageFromGallery, TakePhoto } from '../Shared/ImagePickerComponent';
import { AlertModal } from './AlertModal';
import { alertModalInitState } from '../../Interfaces/InterfacesInitState';
import { ShootAlertOnResult, StrIsNullOrEmpty } from '../../Helpers/GlobalFunctions';
import { mainColors, systemImages } from '../../Constants/Values';
import { Avatar } from 'react-native-paper';
import { ConvertImgPickerToImageRequest } from '../../Helpers/InterfaceConverter';


export const ImageSelectorModal = (props: ImageSelectorModalProps) => {
    const [alertModal, setAlertModal] = useState<AlertModalProps>(alertModalInitState)
    const [imageSelected, setImageSelected] = useState<ImagePickerResponse>()

    useEffect(() => {
        setImageSelected(undefined)
    }, [props.visible])


    const handleCloseModal = async (save = false) => {
        const resultImage = ConvertImgPickerToImageRequest(imageSelected)
        props.OnHideModal && props.OnHideModal(save ? resultImage : undefined)
    }

    const OnHideAlert = () => setAlertModal(alertModalInitState)

    const HandleTakeImage = async (from: 'camera' | 'gallery') => {
        const result = from == 'camera' ? await TakePhoto() : await TakeImageFromGallery();
        const imageResult = (result.data as ImagePickerResponse) || undefined;

        if (!result.ok) return setAlertModal(ShootAlertOnResult(result, OnHideAlert))
        setImageSelected(imageResult)
    }

    const OnConfirmSelection = () => {
        setImageSelected(imageSelected)
        handleCloseModal(true)
    }

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={props.visible == true}
            onRequestClose={() => handleCloseModal()}>
            <AlertModal {...alertModal} OnHideAlert={OnHideAlert} />
            <TouchableWithoutFeedback
                onPress={(event) => { if (event.target === event.currentTarget) handleCloseModal() }}
            >
                <View style={[modalStyles.modal, modalStyles.modalBottom]}>
                    <View style={[modalStyles.modalContent]}>
                        <TextComponent style={modalStyles.modalTitle} text={props.title ?? 'Seleccione desde su biblioteca o desde su cámara'} />

                        <Avatar.Image style={{ marginVertical: 10 }}
                            size={100}
                            source={imageSelected && imageSelected.assets && imageSelected.assets.length > 0
                                ? { uri: imageSelected.assets[0].uri }
                                : props.imageUrl ? { uri: props.imageUrl }
                                    : systemImages.personIcon
                            }
                        />

                        <ButtonGlobal color={mainColors.dark} onClick={() => HandleTakeImage('camera')} text="Tomar foto" icon={{ name: 'camera', library: 'entypo' }} />
                        <ButtonGlobal color={mainColors.dark} onClick={() => HandleTakeImage('gallery')} text="Seleccionar imagen" icon={{ name: 'images', library: 'entypo' }} />

                        <View style={modalStyles.modalFooter}>
                            <ButtonGlobal textColor={mainColors.textColor} color={mainColors.light} type='small' onClick={handleCloseModal} text='Cerrar' icon={{ name: 'expand-more', library: 'material' }} />
                            <ButtonGlobal color={mainColors.purpule3} type='small' onClick={OnConfirmSelection} text='Aceptar' icon={{ name: 'check', library: 'fontAwesome' }} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </Modal >
    )
}