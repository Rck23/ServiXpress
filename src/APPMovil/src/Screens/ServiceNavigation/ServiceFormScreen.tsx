import { View, Image, ScrollView } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from "../../Navigation/HomeNavigator";
import { GlobalStyles } from "../../Styles/SharedStyles";
import { ButtonPrincipalGlobal, LogoImage } from '../../Components/Shared/SharedComponents';
import { ServiceStackParams } from '../../Navigation/ServiceNavigator';
import { ButtonGlobal, HipervinculoGlobal, InputGlobal, TextAreaGlobal } from "../../Components/Shared/FormsComponents";
import { useState } from 'react';

interface Props extends StackScreenProps<ServiceStackParams, 'serviceFormScreen'> { }

export const ServiceFormScreen = ({ navigation, route }: Props) => {
    const [name, setName] = useState('');
    const [residencia, setResidencia] = useState('');
    const [servicio, setServicio] = useState('');
    const [contacto, setContacto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [referencias, setReferencias] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [precio, setPrecio] = useState('');

    return (
        <ScrollView style={GlobalStyles.Scrollview}>
            <View style={GlobalStyles.Globalcontainerdad}>
                <LogoImage />

                <InputGlobal
                    placeholder="Nombre(s)"
                    value={name}
                    onChange={setName} />
                <InputGlobal
                    placeholder="Residencia"
                    value={residencia}
                    onChange={setResidencia} />
                <InputGlobal
                    placeholder="Servicio"
                    value={servicio}
                    onChange={setServicio} />
                <InputGlobal
                    placeholder="Numero de telefono o correo electrónico"
                    value={contacto}
                    onChange={setContacto} />
                <InputGlobal
                    placeholder="Domicilio"
                    value={domicilio}
                    onChange={setDomicilio} />

                <TextAreaGlobal
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={setDescripcion}
                    numberOfLines={5}
                    maxLength={300}
                    multiline={true} />

                <InputGlobal
                    placeholder="Referencia"
                    value={referencias}
                    onChange={setReferencias} />
                <InputGlobal
                    placeholder="Precio opcional"
                    value={precio}
                    onChange={setPrecio} />

                <ButtonGlobal
                    text='Enviar'
                    icon={{ name: 'send', library: 'fontAwesome' }} />

                <HipervinculoGlobal
                    text='Cancelar'
                    onClick={() => navigation.navigate("homeScreen")} />
            </View>
        </ScrollView>
    )
}