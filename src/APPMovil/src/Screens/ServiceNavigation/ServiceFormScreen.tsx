import { View, ScrollView } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { GlobalStyles } from "../../Styles/SharedStyles";
import { Col, LogoImage, Row } from '../../Components/Shared/SharedComponents';
import { ServiceStackParams } from '../../Navigation/ServiceNavigator';
import { ButtonGlobal, HipervinculoGlobal, InputGlobal, TextAreaGlobal } from "../../Components/Shared/FormsComponents";
import { UseForm } from "../../Hooks/UseForm";
import { CategoriaServicio, Servicio } from "../../Interfaces/Servicio";
import { servicioInitState, tipoServicioModalInitState } from "../../Interfaces/InterfacesInitState";
import { ScreenContainer } from "../../Components/Shared/NavigationComponents";
import { useContext, useState } from "react";
import { TipoServicioModalSelector } from "../../Components/Modals/TipoServicioModalSelector";
import { TipoServicioModalProps } from "../../Interfaces/DOMInterfaces";
import { AuthContext } from "../../Context/Auth/Context";
import { ServicesContext } from "../../Context/Services/Context";

interface Props extends StackScreenProps<ServiceStackParams, 'serviceFormScreen'> { }

export const ServiceFormScreen = ({ navigation, route }: Props) => {
    const { user } = useContext(AuthContext)
    const { serviceCategories } = useContext(ServicesContext)
    const { descripcion, estado, otrosMediosContacto, municipio, telefonos, correos, precio, onChange } = UseForm<Servicio>(servicioInitState)
    const [categoriaServicio, setCategoriaServicio] = useState<CategoriaServicio>()
    const [tipoServicioModal, setTipoServicioModal] = useState<TipoServicioModalProps>(tipoServicioModalInitState)



    const OnHideModal = (category?: CategoriaServicio) => {
        if (category) setCategoriaServicio(category)
        setTipoServicioModal(tipoServicioModalInitState)
    }
    return (
        <>
            <TipoServicioModalSelector {...tipoServicioModal} OnHideModal={(catSelected) => OnHideModal(catSelected)} />
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
                                    value={precio.toString()}
                                    onChange={(val) => onChange(val, 'precio')} />
                            </Col>
                            <Col>
                                <InputGlobal
                                    placeholder="Tipo de servicio"
                                    showLabel
                                    disabled
                                    onPressIn={() => setTipoServicioModal({ ...tipoServicioModal, visible: true, categoriesList: serviceCategories })}
                                    value={categoriaServicio?.nombre ?? ''} />
                            </Col>
                        </Row>


                        <ButtonGlobal
                            text='Enviar'
                            icon={{ name: 'send', library: 'fontAwesome' }} />

                        <HipervinculoGlobal
                            text='Cancelar'
                            onClick={() => navigation.goBack()} />
                    </View>
                </ScrollView>
            </ScreenContainer>
        </>
    )
}