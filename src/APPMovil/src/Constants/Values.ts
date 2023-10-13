export const mainColors = {
    purpule: '#5503A6',
    purpule2: '#51168C',
    purpule3: '#331859',
    black: '#616161',
    white: '#FFF',
    light: '#E8E8E8',
    gray: '#A3A3A3',
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
    }
}




export const apiEnpoints = {
    authenticate: "/Usuario/Login",
    registerUser: "/Usuario/Register",
    sendEmailUser: "/Usuario/ForgotPassword"
}