import { View, ScrollView } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { GlobalStyles } from "../../Styles/SharedStyles";
import { Col, LogoImage, Row } from '../../Components/Shared/SharedComponents';
import { ServiceStackParams } from '../../Navigation/ServiceNavigator';
import { ButtonGlobal, HipervinculoGlobal, InputGlobal, TextAreaGlobal } from "../../Components/Shared/FormsComponents";
import { UseForm } from "../../Hooks/UseForm";
import { CategoriaServicio, ServiceCreate } from "../../Interfaces/Servicio";
import { optionSelectorModalInitState, servicioInitState } from "../../Interfaces/InterfacesInitState";
import { ScreenContainer } from "../../Components/Shared/NavigationComponents";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/Auth/Context";
import { ServicesContext } from "../../Context/Services/Context";
import { OptionsSelectorModal } from "../../Components/Modals/OptionsSelectorModal";
import { KeyValue, ModalOptionsSelectorProps } from "../../Interfaces/DOMInterfaces";
import { ConvertToKeyValueList } from "../../Helpers/InterfaceConverter";

interface Props extends StackScreenProps<ServiceStackParams, 'serviceFormScreen'> { }

export const ServiceFormScreen = ({ navigation, route }: Props) => {
    const { user } = useContext(AuthContext)
    const { serviceCategories, CreateService } = useContext(ServicesContext)
    const { descripcion, estado, otrosMediosContacto, municipio, telefonos, correos, precio, onChange, form } = UseForm<ServiceCreate>(servicioInitState)
    const [categoriaServicio, setCategoriaServicio] = useState<CategoriaServicio>()
    const [selectorCategoriaModal, setSelectorCategoriaModal] = useState<ModalOptionsSelectorProps>(optionSelectorModalInitState)
    const optionsList = ConvertToKeyValueList(serviceCategories)

    useEffect(() => {
        onChange(user?.estado ?? '', 'estado')
        onChange(user?.municipio ?? '', 'municipio')
        onChange(user?.telefono ?? '', 'telefonos')
    }, [])



    const OnHideModal = (value?: KeyValue) => {
        if (value) {
            var category: CategoriaServicio = { id: value.value, nombre: value.name }
            setCategoriaServicio(category)
        }
        setSelectorCategoriaModal(optionSelectorModalInitState)
    }


    const TriggerCreateService = async () => {
        form.categoriaId = categoriaServicio?.id ?? 0
        form.nombreCategoria = categoriaServicio?.nombre ?? ''
        form.tipo = route.params.tipoServicio
        await CreateService(form)
    }


    return (
        <>
            <OptionsSelectorModal {...selectorCategoriaModal} OnHideModal={(value) => OnHideModal(value)} />
            <ScreenContainer>
                <ScrollView showsVerticalScrollIndicator={false} style={GlobalStyles.Scrollview}>
                    <View style={GlobalStyles.Globalcontainerdad}>
                        <LogoImage />

                        <TextAreaGlobal
                            placeholder="Descripción"
                            showLabel
                            value={descripcion}
                            onChange={(val) => onChange(val, 'descripcion')}
                            numberOfLines={3}
                            maxLength={300}
                            multiline={true} />

                        <InputGlobal
                            placeholder="Estado"
                            showLabel
                            value={estado}
                            onChange={(val) => onChange(val, 'estado')} />

                        <InputGlobal
                            placeholder="Municipio"
                            showLabel
                            value={municipio}
                            onChange={(val) => onChange(val, 'municipio')} />

                        <TextAreaGlobal
                            placeholder="Correos de contacto"
                            showLabel
                            value={correos}
                            onChange={(val) => onChange(val, 'correos')}
                            maxLength={300}
                            multiline={true} />

                        <TextAreaGlobal
                            placeholder="Telefonos de contacto"
                            showLabel
                            value={telefonos}
                            onChange={(val) => onChange(val, 'telefonos')}
                            maxLength={300}
                            multiline={true} />

                        <TextAreaGlobal
                            placeholder="Otros medios de contacto"
                            showLabel
                            value={otrosMediosContacto}
                            onChange={(val) => onChange(val, 'otrosMediosContacto')}
                            maxLength={300}
                            multiline={true} />

                        <Row>
                            <Col>
                                <InputGlobal
                                    placeholder="Precio ofertado"
                                    showLabel
                                    keyboardType='number-pad'
                                    value={precio?.toString()}
                                    onChange={(val) => onChange(val, 'precio')} />
                            </Col>
                            <Col>
                                <InputGlobal
                                    placeholder="Tipo de servicio"
                                    showLabel
                                    disabled
                                    onPressIn={() => setSelectorCategoriaModal({ ...selectorCategoriaModal, visible: true, options: optionsList })}
                                    value={categoriaServicio?.nombre ?? ''} />
                            </Col>
                        </Row>


                        <ButtonGlobal
                            text='Enviar'
                            icon={{ name: 'send', library: 'fontAwesome' }}
                            onClick={TriggerCreateService}
                        />

                        <HipervinculoGlobal
                            text='Cancelar'
                            onClick={() => navigation.goBack()} />
                    </View>
                </ScrollView>
            </ScreenContainer>
        </>
    )
}