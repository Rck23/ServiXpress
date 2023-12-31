import { KeyValue } from "../Interfaces/DOMInterfaces"
import { NavigationStyles } from "../Styles/NavigationStyles"

export const mainColors = {
    purpule: '#5503A6',
    purpule2: '#51168C',
    purpule3: '#331859',
    lightpurple: '#9D5EDB',
    black: '#616161',
    dark: '#242424',
    white: '#FFF',
    light: '#E8E8E8',
    gray: '#A3A3A3',
    ligtgray: '#DEDEDE',
    green: '#00CA12',
    greenBlue: '#00E0B4',
    red: '#CA0000',
    yellow: '#FCE309',
    blue: '#07B0FF',
    pink: '#E107FF',
    pink2: '#FF0783',
    orange: '#FC9109',
    blackLight: '#DEDEDE',
    textColor: '#545454'
}



export const alertStr = {
    response200: {
        title: 'Solicutud procesada con éxito',
        message: 'Se ha completado la acción solicitada.'
    },
    response500: {
        title: 'Error de servidor',
        message: 'La solcitud no se ha procesado correctamente debido a un error en nuestros servicios.'
    },
    response400: {
        title: 'Recurso no encontrado',
        message: 'El recurso solicitado no se ha encontrado o no se ha completado correctamente.'
    },
    response401: {
        title: 'Sesión finalizada',
        message: 'Su sesión ha expirado, vuelva a iniciar sesión.'
    },
    lostConn: {
        title: '¡Se ha perdido la conexión con el servidor!',
        message: 'Vuelva a cargar para verificar su el estatus de la solicitud o intente más tarde.'
    },
    internalError: {
        title: '¡Ha ocurrido un error!',
        message: 'Por favor vuelva a intentar.\nSi el error continua, reporte el error para brindar una pronta solución.'
    },
    permissionsDenied: {
        title: 'Se han rechazado los permisos para esta funcionalidad',
        message: 'Ingrese a ajustes del dispositivo para otorgar los permisos solicitados a la app (ServiXpress).'
    },
    tokenNotFound: {
        title: 'No se ha podido encontrar la información de la sesión.',
        message: 'Vuelva a intentar o vuelva a iniciar sesión para continuar.'
    },
    emptyFieldsLogin: {
        title: 'Usuario y contraseña requeridos',
        message: 'Llene todos los campos solicitados para continuar.'
    },
    emptyFieldsSendEmail: {
        title: 'Correo requerido',
        message: 'Ingrese su correo elecrtónico con el que ha registrado su cuenta.'
    },
    resetPasswordIssue: {
        title: 'Información incorrecta',
        message: 'Las contraseñas no coninciden o no ha completado los campos.'
    }
}


export const userRoles: KeyValue[] = [
    { value: 0, key: "Ofrecer servicios", name: "Ofrecer servicios" },
    { value: 1, key: "Solicitar servicios", name: "Solicitar servicios" }
]

export const userStatus: KeyValue[] = [
    { value: 0, key: "Alta", name: "Alta" },
    { value: 1, key: "Verificado", name: "Verificado" },
    { value: 2, key: "Bloqueado", name: "Bloqueado" }
]


export const apiEnpoints = {
    authenticate: "/Usuario/Login",
    registerUser: "/Usuario/Register",
    updateUser: "/Usuario/Update",
    sendEmailUser: "/Usuario/ForgotPassword",
    getCategories: "/Category/GetCategoriesServices",
    getServices: "/Servicio/GetAllServices",
    createService: "/Servicio/create",
    getUsers: "/Usuario/All",
    getUserDetail: "/Usuario/",
    getServiceDetails: "/Servicio/getServiceById/",
    resetPassword: '/Usuario/ResetPassword',
    searchServices: '/Servicio/servicesByParameters?text=',
    searchUsers: '/Usuario/userByParameters?text=',
    changeUserStatus: '/Usuario/changeStatusUser',
    reviewUserSend: '/Review/create'
}


export const systemImages = {
    personIcon: require('../Images/personIcon.png')
}