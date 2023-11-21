import { AlertModalProps, ImageSelectorModalProps, ModalEditProfileProps, ModalOptionsSelectorProps } from "./DOMInterfaces";
import { ResultData } from "./DataResponse";
import { CategoriaServicio, Servicio, TipoServicio } from "./Servicio";
import { RegisterUser, Usuario } from "./Usuario";

export const alertModalInitState: AlertModalProps = {
    title: '',
    icon: 'info',
}

export const optionSelectorModalInitState: ModalOptionsSelectorProps = {
    visible: false,
    options: []
}

export const imageSelectorModalInitState: ImageSelectorModalProps = {
    visible: false
}

export const usuarioInitState: Usuario = {
    id: '',
    nombre: '',
    apellidos: '',
    email: '',
    estatus: '',
    fechaHoraRegistro: new Date(),
    rol: 0,
    rolNombre: ''
}

export const newUsuarioInitState: RegisterUser = {
    Nombre: '',
    Apellidos: '',
    Email: '',
    Rol: 0,
    Password: '',
    Telefono: '',
}


export const categoriaServicioInitState: CategoriaServicio = {
    id: 0,
    nombre: '',
    fechaHoraRegistro: new Date()
}


export const servicioInitState: Servicio = {
    id: 0,
    estado: '',
    municipio: '',
    telefonos: '',
    correos: '',
    otrosMediosContacto: '',
    descripcion: '',
    ubicacionMaps: '',
    precio: 0,
    fechaHoraRegistro: new Date(),
    usuarioId: '',
    usuario: usuarioInitState,
    categoriaId: 0,
    categoriaServicio: categoriaServicioInitState,
    tipo: '',
    tipoServicio: { tipo: '' },
    nombreCategoria: ''
}

export const editProfileModalInitState: ModalEditProfileProps = {
    data: usuarioInitState
}