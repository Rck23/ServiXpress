import { AlertModalProps, TipoServicioModalProps } from "./DOMInterfaces";
import { CategoriaServicio, Servicio, TipoServicio } from "./Servicio";
import { RegisterUser, Usuario } from "./Usuario";

export const alertModalInitState: AlertModalProps = {
    title: '',
    icon: 'info',
}

export const tipoServicioModalInitState: TipoServicioModalProps = {
    visible: false,
    categoriesList: []
}

export const usuarioInitState: Usuario = {
    Id: '',
    Nombre: '',
    Apellidos: '',
    Email: '',
    Estatus: '',
    FechaHoraRegistro: new Date(),
    Rol: 0,
    RolNombre: ''
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
    tipoServicio: ''
}